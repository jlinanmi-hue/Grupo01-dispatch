import { useState, useEffect } from "react";
import MantenimientoView from "../mantenimiento/MantenimientoView";

export default function DashboardView({ onNavigate, initialSection = "operaciones" }) {
  const [seccionActiva, setSeccionActiva] = useState(initialSection || "operaciones");
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("semana");
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoveredSlice, setHoveredSlice] = useState(null);

  useEffect(() => {
    if (initialSection) {
      setSeccionActiva(initialSection);
    }
  }, [initialSection]);

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
      {/* SELECTOR DE SECCIONES DENTRO DEL DASHBOARD */}
      <div className="dashboard-section-tabs-bar">
        <button
          type="button"
          className={`dashboard-section-tab-btn ${seccionActiva === "operaciones" ? "active" : ""}`}
          onClick={() => setSeccionActiva("operaciones")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M3 3v18h18" />
            <path d="M18 9l-5 5-4-4-5 5" />
            <path d="M14 9h4v4" />
          </svg>
          <span>Operaciones & Despacho</span>
        </button>

        <button
          type="button"
          className={`dashboard-section-tab-btn ${seccionActiva === "mantenimiento" ? "active" : ""}`}
          onClick={() => setSeccionActiva("mantenimiento")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          <span>Mantenimiento & Confiabilidad de Flota</span>
          <span className="section-tab-badge">Preventivo vs. Correctivo</span>
        </button>
      </div>

      {seccionActiva === "mantenimiento" ? (
        <MantenimientoView isEmbeddedSection={true} />
      ) : (
        <>
          {/* CABECERA */}
          <div className="view-header">
            <div>
              <h2 className="view-title">Dashboard Operativo y Estadísticas</h2>
              <p className="view-subtitle">
                Monitoreo en tiempo real de registros diarios, concurrencia y distribución de carga
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

      {/* ALERTA Y VERSUS DE MANTENIMIENTO: PREVENTIVO VS CORRECTIVO */}
      <div className="dash-panel dashboard-maintenance-versus-card" style={{ marginTop: "24px" }}>
        <div className="panel-title-bar">
          <div className="panel-title-group">
            <h3>Mantenimiento de Flota: Preventivos vs. Correctivos (Mes Actual)</h3>
            <span className="badge-live-alert">⚠️ Alerta de Incidentes Activos</span>
          </div>
          <button
            type="button"
            className="btn-view-module-link"
            onClick={() => setSeccionActiva("mantenimiento")}
          >
            Ir a Sección de Mantenimiento de Flota →
          </button>
        </div>

        <div className="dash-mant-versus-content">
          <div className="dash-mant-summary-chips">
            <div className="mant-chip-metric prev">
              <span className="chip-icon">📅</span>
              <div>
                <strong>5 Preventivos (63%)</strong>
                <span>Rutinas programadas por horómetro</span>
              </div>
            </div>

            <div className="mant-chip-metric corr">
              <span className="chip-icon">⚡</span>
              <div>
                <strong>3 Correctivos (37%)</strong>
                <span>Fallas mecánicas reportadas</span>
              </div>
            </div>

            <div className="mant-chip-incident-alert">
              <span className="alert-pulse-circle"></span>
              <div>
                <strong>Incidente Activo en Mina:</strong>
                <span>ECV-141: Baja de presión de neumático en Rampa Principal</span>
              </div>
            </div>
          </div>

          <div className="dash-versus-progress-wrapper">
            <div className="dash-versus-bar">
              <div
                className="dash-bar-prev"
                style={{ width: "63%" }}
                title="63% Preventivo"
              >
                63% Preventivo (5)
              </div>
              <div
                className="dash-bar-corr"
                style={{ width: "37%" }}
                title="37% Correctivo"
              >
                37% Correctivo (3)
              </div>
            </div>
            <div className="dash-versus-labels">
              <span>Meta de Confiabilidad: &gt; 70% Preventivo</span>
              <span className="text-warning-bold">2 equipos en taller actualmente</span>
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
              onClick={() => setSeccionActiva("mantenimiento")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <div>
                <strong>Gestión de Mantenimiento</strong>
                <span>Preventivos & Incidentes Correctivos</span>
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
    </>
  )}
</div>
  );
}
