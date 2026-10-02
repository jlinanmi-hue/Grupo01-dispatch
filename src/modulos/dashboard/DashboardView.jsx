import { useState } from "react";

export default function DashboardView({ onNavigate }) {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("semana");
  const [filtroPeriodoVersus, setFiltroPeriodoVersus] = useState("mes");
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoveredSlice, setHoveredSlice] = useState(null);

  // Cargar órdenes para estadísticas en tiempo real
  const [ordenes] = useState(() => {
    try {
      const stored = localStorage.getItem("ordenes_mantenimiento_dispatch");
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [
      { id: "OT-PREV-101", tipo: "preventivo", estado: "En Taller" },
      { id: "OT-PREV-102", tipo: "preventivo", estado: "Programado" },
      { id: "OT-PREV-103", tipo: "preventivo", estado: "Programado" },
      { id: "OT-PREV-104", tipo: "preventivo", estado: "Completado" },
      { id: "OT-PREV-105", tipo: "preventivo", estado: "Completado" },
      { id: "OT-PREV-106", tipo: "preventivo", estado: "Programado" },
      { id: "OT-CORR-141", tipo: "correctivo", estado: "En Reparación" },
      { id: "OT-CORR-112", tipo: "correctivo", estado: "En Taller" },
      { id: "OT-CORR-091", tipo: "correctivo", estado: "Completado" },
    ];
  });

  const totalPreventivos = ordenes.filter((o) => o.tipo === "preventivo").length;
  const totalCorrectivos = ordenes.filter((o) => o.tipo === "correctivo").length;
  const totalOrdenes = ordenes.length || 1;
  const porcentajePreventivo = Math.round((totalPreventivos / totalOrdenes) * 100);
  const porcentajeCorrectivo = Math.round((totalCorrectivos / totalOrdenes) * 100);
  const equiposEnTaller = ordenes.filter((o) => o.estado === "En Taller" || o.estado === "En Reparación").length;

  // Datos para Gráfico de Barras: Registros de Despacho por Día
  const datosBarras = [
    { dia: "Lun", registros: 118, volumen: "710 m³", esHoy: false },
    { dia: "Mar", registros: 125, volumen: "750 m³", esHoy: false },
    { dia: "Mié", registros: 142, volumen: "850 m³", esHoy: true }, // Hoy
    { dia: "Jue", registros: 135, volumen: "810 m³", esHoy: false },
    { dia: "Vie", registros: 154, volumen: "920 m³", esHoy: false },
    { dia: "Sáb", registros: 130, volumen: "780 m³", esHoy: false },
    { dia: "Dom", registros: 98, volumen: "590 m³", esHoy: false },
  ];

  const maxRegistros = 160;

  // Datos para Gráfico Pastel / Donut: Distribución de Material Transportado
  const datosPastel = [
    {
      label: "02.23.23 - RELLENO MURO",
      porcentaje: 42,
      volumen: "357 m³",
      color: "#2563EB", // Azul
      strokeDasharray: "42 58",
      strokeDashoffset: "25",
    },
    {
      label: "02.01.09 - INADECUADO",
      porcentaje: 31,
      volumen: "263 m³",
      color: "#F97316", // Naranja
      strokeDasharray: "31 69",
      strokeDashoffset: "-17",
    },
    {
      label: "02.02.01 - RELLENO PLAT.",
      porcentaje: 18,
      volumen: "153 m³",
      color: "#F59E0B", // Ámbar
      strokeDasharray: "18 82",
      strokeDashoffset: "-48",
    },
    {
      label: "02.23.03 - INCOMPETENTE",
      porcentaje: 9,
      volumen: "77 m³",
      color: "#10B981", // Verde
      strokeDasharray: "9 91",
      strokeDashoffset: "-66",
    },
  ];

  return (
    <div className="dashboard-view-container">
      {/* CABECERA */}
      <div className="view-header">
        <div>
          <h2 className="view-title">Dashboard Operativo y Estadísticas Generales</h2>
          <p className="view-subtitle">
            Monitoreo en tiempo real de despacho, frentes activos y confiabilidad de flota
          </p>
        </div>

        {/* SELECTOR DE PERÍODO */}
        <div className="dashboard-periodo-pills">
          <button
            type="button"
            className={`period-btn ${periodoSeleccionado === "hoy" ? "active" : ""}`}
            onClick={() => setPeriodoSeleccionado("hoy")}
          >
            Hoy
          </button>
          <button
            type="button"
            className={`period-btn ${periodoSeleccionado === "semana" ? "active" : ""}`}
            onClick={() => setPeriodoSeleccionado("semana")}
          >
            Esta Semana
          </button>
          <button
            type="button"
            className={`period-btn ${periodoSeleccionado === "mes" ? "active" : ""}`}
            onClick={() => setPeriodoSeleccionado("mes")}
          >
            Mensual
          </button>
        </div>
      </div>

      {/* FILA DE INDICADORES CLAVE (KPIS) */}
      <div className="dashboard-metrics-grid">
        {/* 1.1 CONTEO IMPORTANTE: USUARIOS CONECTADOS DIARIOS */}
        <div className="dash-card featured-user-card">
          <div className="dash-card-icon blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="dash-card-info">
            <div className="card-top-badge">
              <span className="live-dot-pulse"></span>
              <span className="card-lbl">1.1 Usuarios Conectados Diarios</span>
            </div>
            <strong className="card-num big-accent">38 Usuarios</strong>
            <div className="users-breakdown-chips">
              <span className="chip-turno dia">
                ☀️ Turno Día: <strong>26</strong>
              </span>
              <span className="chip-turno noche">
                🌙 Turno Noche: <strong>12</strong>
              </span>
            </div>
            <span className="card-trend positive">
              Pico hoy: 42 activos a las 11:30 AM
            </span>
          </div>
        </div>

        {/* TOTAL DE REGISTROS POR DÍA */}
        <div className="dash-card">
          <div className="dash-card-icon orange">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </div>
          <div className="dash-card-info">
            <span className="card-lbl">Total Registros por Día</span>
            <strong className="card-num">142 Registros</strong>
            <span className="card-trend positive">↑ +18% vs. promedio diario</span>
            <span className="card-subdetail">94 Acarreo · 28 Carguío · 20 Servicios</span>
          </div>
        </div>

        {/* PRODUCCIÓN TOTAL */}
        <div className="dash-card">
          <div className="dash-card-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>
          <div className="dash-card-info">
            <span className="card-lbl">Producción Volumétrica</span>
            <strong className="card-num">850 m³</strong>
            <span className="card-trend positive">48 Viajes despachados</span>
            <span className="card-subdetail">Meta turno: 800 m³ (Cumplido 106%)</span>
          </div>
        </div>

        {/* TIEMPO MEDIO DE CICLO */}
        <div className="dash-card">
          <div className="dash-card-icon amber">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="dash-card-info">
            <span className="card-lbl">Tiempo Medio de Ciclo</span>
            <strong className="card-num">24.5 min</strong>
            <span className="card-trend">Óptimo (Meta &lt; 28 min)</span>
            <span className="card-subdetail">Carga: 3.2m · Ruta: 18m · Vaciado: 3.3m</span>
          </div>
        </div>
      </div>

      {/* FILA DE GRÁFICOS: GRÁFICO DE BARRAS & GRÁFICO PASTEL */}
      <div className="dashboard-charts-row">
        {/* ========================================================
            1. GRÁFICO DE BARRAS: TOTAL DE REGISTROS POR DÍA
        ======================================================== */}
        <div className="dash-chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Total de Registros por Día</h3>
              <p className="chart-subtitle">
                Frecuencia diaria de ciclos de acarreo y reportes operacionales
              </p>
            </div>
            <div className="chart-legend-box">
              <span className="legend-indicator hoy"></span> Hoy (Miércoles)
              <span className="legend-indicator normal"></span> Días Anteriores
            </div>
          </div>

          <div className="bar-chart-visual">
            <div className="chart-bars-container">
              {datosBarras.map((item, idx) => {
                const heightPercent = (item.registros / maxRegistros) * 100;
                const isHovered = hoveredBar === idx;

                return (
                  <div
                    key={item.dia}
                    className="bar-column-item"
                    onMouseEnter={() => setHoveredBar(idx)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {isHovered && (
                      <div className="bar-tooltip">
                        <strong>{item.registros} registros</strong>
                        <span>{item.volumen}</span>
                      </div>
                    )}

                    <div className="bar-track-wrapper">
                      <div
                        className={`bar-pillar ${item.esHoy ? "highlight-today" : ""}`}
                        style={{ height: `${heightPercent}%` }}
                      >
                        <span className="bar-count-label">{item.registros}</span>
                      </div>
                    </div>

                    <span className={`bar-day-label ${item.esHoy ? "today-label" : ""}`}>
                      {item.dia}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="chart-footer-metrics">
            <div className="footer-metric-pill">
              <span>Promedio Semanal:</span>
              <strong>128.8 reg/día</strong>
            </div>
            <div className="footer-metric-pill">
              <span>Total Acumulado Semana:</span>
              <strong>902 registros</strong>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. GRÁFICO PASTEL / DONUT: DISTRIBUCIÓN DE MATERIAL
        ======================================================== */}
        <div className="dash-chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Distribución de Material (Gráfico Pastel)</h3>
              <p className="chart-subtitle">
                Proporción de material acarreado y fases de trabajo
              </p>
            </div>
          </div>

          <div className="donut-chart-wrapper">
            <div className="donut-svg-box">
              <svg viewBox="0 0 42 42" className="donut-svg">
                <circle
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#F1F5F9"
                  strokeWidth="6"
                />

                <circle
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#2563EB"
                  strokeWidth="6"
                  strokeDasharray="42 58"
                  strokeDashoffset="25"
                  className={`donut-segment ${hoveredSlice === 0 ? "hovered" : ""}`}
                  onMouseEnter={() => setHoveredSlice(0)}
                  onMouseLeave={() => setHoveredSlice(null)}
                />

                <circle
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#F97316"
                  strokeWidth="6"
                  strokeDasharray="31 69"
                  strokeDashoffset="-17"
                  className={`donut-segment ${hoveredSlice === 1 ? "hovered" : ""}`}
                  onMouseEnter={() => setHoveredSlice(1)}
                  onMouseLeave={() => setHoveredSlice(null)}
                />

                <circle
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#F59E0B"
                  strokeWidth="6"
                  strokeDasharray="18 82"
                  strokeDashoffset="-48"
                  className={`donut-segment ${hoveredSlice === 2 ? "hovered" : ""}`}
                  onMouseEnter={() => setHoveredSlice(2)}
                  onMouseLeave={() => setHoveredSlice(null)}
                />

                <circle
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke="#10B981"
                  strokeWidth="6"
                  strokeDasharray="9 91"
                  strokeDashoffset="-66"
                  className={`donut-segment ${hoveredSlice === 3 ? "hovered" : ""}`}
                  onMouseEnter={() => setHoveredSlice(3)}
                  onMouseLeave={() => setHoveredSlice(null)}
                />
              </svg>

              <div className="donut-center-info">
                <strong>850 m³</strong>
                <span>Total Hoy</span>
              </div>
            </div>

            <div className="donut-legend-list">
              {datosPastel.map((item, idx) => (
                <div
                  key={item.label}
                  className={`donut-legend-item ${hoveredSlice === idx ? "active" : ""}`}
                  onMouseEnter={() => setHoveredSlice(idx)}
                  onMouseLeave={() => setHoveredSlice(null)}
                >
                  <div className="legend-name-group">
                    <span
                      className="legend-color-dot"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="legend-text">{item.label}</span>
                  </div>
                  <div className="legend-values">
                    <strong>{item.porcentaje}%</strong>
                    <small>{item.volumen}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          SECCIÓN DE ESTADÍSTICAS DE FLOTA & CONTROL DE MANTENIMIENTO
          (Las estadísticas solicitadas van en Dashboard)
      ======================================================== */}
      <div className="dashboard-maintenance-section" style={{ marginTop: "32px" }}>
        <div className="section-title-bar-mantenimiento" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#0F172A" }}>
                Estadísticas de Flota y Control de Mantenimiento
              </h3>
              <span className="badge-live-alert">⚠️ Telemetría de Flota</span>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: "12.5px", color: "#64748B" }}>
              Disponibilidad mecánica, órdenes activas por horómetro y balance técnico de confiabilidad
            </p>
          </div>

          <button
            type="button"
            className="btn-view-module-link"
            onClick={() => onNavigate("mantenimiento")}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#EFF6FF", border: "1.5px solid #BFDBFE", color: "#1A3BBD", padding: "8px 16px", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}
          >
            <span>Ver Tabla de Mantenimiento</span>
            <span>→</span>
          </button>
        </div>

        {/* 1. LAS 5 CARDS KPI SOLICITADAS POR EL USUARIO */}
        <div className="mantenimiento-kpi-grid" style={{ marginBottom: "20px" }}>
          <div className="mant-kpi-card">
            <div className="mant-kpi-header">
              <span className="mant-kpi-lbl">Total Órdenes</span>
              <span className="mant-kpi-icon blue">📋</span>
            </div>
            <div className="mant-kpi-value">{ordenes.length}</div>
            <span className="mant-kpi-desc">Gestión integral de flota</span>
          </div>

          <div className="mant-kpi-card highlight-preventive">
            <div className="mant-kpi-header">
              <span className="mant-kpi-lbl">Preventivos Programados</span>
              <span className="mant-kpi-badge ok">{porcentajePreventivo}% del total</span>
            </div>
            <div className="mant-kpi-value text-blue">{totalPreventivos}</div>
            <span className="mant-kpi-desc">Planificación proactiva por horómetro</span>
          </div>

          <div className="mant-kpi-card highlight-corrective">
            <div className="mant-kpi-header">
              <span className="mant-kpi-lbl">Incidentes Correctivos</span>
              <span className="mant-kpi-badge warning">{porcentajeCorrectivo}% del total</span>
            </div>
            <div className="mant-kpi-value text-orange">{totalCorrectivos}</div>
            <span className="mant-kpi-desc">Fallas no programadas reportadas</span>
          </div>

          <div className="mant-kpi-card">
            <div className="mant-kpi-header">
              <span className="mant-kpi-lbl">Equipos en Taller</span>
              <span className="mant-kpi-icon orange">🔧</span>
            </div>
            <div className="mant-kpi-value text-dark">{equiposEnTaller}</div>
            <span className="mant-kpi-desc">Unidades con intervención activa</span>
          </div>

          <div className="mant-kpi-card">
            <div className="mant-kpi-header">
              <span className="mant-kpi-lbl">Disponibilidad Flota</span>
              <span className="mant-kpi-badge ok">Optimo</span>
            </div>
            <div className="mant-kpi-value text-green">91.8%</div>
            <span className="mant-kpi-desc">Disponibilidad mecánica activa</span>
          </div>
        </div>

        {/* 2. EL BALANCE OPERATIVO: PREVENTIVO VS. CORRECTIVO */}
        <div className="mantenimiento-versus-panel">
          <div className="versus-header-row">
            <div>
              <h3 className="versus-title">
                Balance Operativo: Preventivo vs. Correctivo
              </h3>
              <p className="versus-subtitle">
                Comparativa de confiabilidad técnica de flota para el control de despacho
              </p>
            </div>

            <div className="versus-period-selector">
              <button
                type="button"
                className={`period-toggle-btn ${filtroPeriodoVersus === "mes" ? "active" : ""}`}
                onClick={() => setFiltroPeriodoVersus("mes")}
              >
                Mes Actual
              </button>
              <button
                type="button"
                className={`period-toggle-btn ${filtroPeriodoVersus === "semana" ? "active" : ""}`}
                onClick={() => setFiltroPeriodoVersus("semana")}
              >
                Esta Semana
              </button>
            </div>
          </div>

          <div className="versus-bar-container">
            <div className="versus-stats-row">
              <div className="versus-side preventive">
                <span className="versus-badge-icon">📅 Preventivo</span>
                <strong className="versus-count">{totalPreventivos} órdenes ({porcentajePreventivo}%)</strong>
              </div>
              <div className="versus-indicator-target">
                <span>Meta Minera: &gt; 70% Preventivo</span>
              </div>
              <div className="versus-side corrective">
                <strong className="versus-count">{totalCorrectivos} incidentes ({porcentajeCorrectivo}%)</strong>
                <span className="versus-badge-icon">⚡ Correctivo</span>
              </div>
            </div>

            <div className="versus-progress-track">
              <div
                className="versus-bar-fill preventive-fill"
                style={{ width: `${porcentajePreventivo}%` }}
                title={`Preventivo: ${porcentajePreventivo}%`}
              >
                {porcentajePreventivo > 15 && `${porcentajePreventivo}%`}
              </div>
              <div
                className="versus-bar-fill corrective-fill"
                style={{ width: `${porcentajeCorrectivo}%` }}
                title={`Correctivo: ${porcentajeCorrectivo}%`}
              >
                {porcentajeCorrectivo > 15 && `${porcentajeCorrectivo}%`}
              </div>
            </div>

            <div className="versus-footer-diagnosis">
              <div className="diagnosis-pill">
                <span className="diag-dot"></span>
                <strong>Diagnóstico de Confiabilidad: </strong>
                <span>
                  {porcentajePreventivo >= 70
                    ? "Flota bajo control preventivo eficiente. Baja tasa de paradas imprevistas en tajo."
                    : "Alerta: Alto índice de correctivos. Se recomienda adelantar inspecciones periódicas de neumáticos y mangueras."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACCESO RÁPIDO Y TELEMETRÍA DE FRENTES */}
      <div className="dashboard-split-row" style={{ marginTop: "24px" }}>
        <div className="dash-panel">
          <div className="panel-title-bar">
            <h3>Frentes de Carguío & Acopios Activos</h3>
            <span className="badge-live">GPS Conectado</span>
          </div>

          <div className="frentes-list">
            <div className="frente-item">
              <div className="frente-info">
                <strong>ACOPIO FILTRO 2</strong>
                <span>Cargadora: EEX-043 · 2 Volquetes en cola</span>
              </div>
              <span className="status-pill ok">Activo</span>
            </div>

            <div className="frente-item">
              <div className="frente-info">
                <strong>ACOPIO RAMPA 10</strong>
                <span>Cargadora: EEX-042 · 1 Volquete en cola</span>
              </div>
              <span className="status-pill ok">Activo</span>
            </div>

            <div className="frente-item">
              <div className="frente-info">
                <strong>PLATAFORMA SUR</strong>
                <span>Tractor D8 nivelando · Descarga de Inadecuado</span>
              </div>
              <span className="status-pill warning">Precaución</span>
            </div>
          </div>
        </div>

        <div className="dash-panel">
          <div className="panel-title-bar">
            <h3>Accesos Rápidos de Gestión</h3>
          </div>

          <div className="quick-access-buttons-grid">
            <button
              type="button"
              className="quick-card-btn blue"
              onClick={() => onNavigate("operaciones", "ciclo")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <div>
                <strong>Registrar Ciclo de Acarreo</strong>
                <span>Mapeo Origen → Carga → Destino</span>
              </div>
            </button>

            <button
              type="button"
              className="quick-card-btn orange"
              onClick={() => onNavigate("mantenimiento")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <div>
                <strong>Gestión de Mantenimiento</strong>
                <span>Tabla de OTs e incidentes en mina</span>
              </div>
            </button>

            <button
              type="button"
              className="quick-card-btn green"
              onClick={() => onNavigate("operadores")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
              <div>
                <strong>Nuevo Operador</strong>
                <span>Asistente de registro en 4 etapas</span>
              </div>
            </button>

            <button
              type="button"
              className="quick-card-btn orange"
              onClick={() => onNavigate("reportes")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
              <div>
                <strong>Exportar Reportes a Excel</strong>
                <span>Descarga consolidada del día</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
