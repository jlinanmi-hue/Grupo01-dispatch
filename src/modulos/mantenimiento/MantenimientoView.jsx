import { useState, useMemo } from "react";
import ModalPreventivo from "./ModalPreventivo";
import ModalCorrectivo from "./ModalCorrectivo";
import ModalDetalleOrden from "./ModalDetalleOrden";

export default function MantenimientoView({ isEmbeddedSection = false }) {
  // 1. Catálogo de equipos disponibles (de localStorage o fallback)
  const equiposDisponibles = useMemo(() => {
    try {
      const stored = localStorage.getItem("catalogo_equipos_dispatch");
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [
      { codigo: "ECV-140", marcaModelo: "Volvo FMX 480 8x4", categoria: "Volquete", horometro: 520, estado: "disponible" },
      { codigo: "ECV-141", marcaModelo: "Volvo FMX 480 8x4", categoria: "Volquete", horometro: 550, estado: "bloqueado" },
      { codigo: "ECV-142", marcaModelo: "Scania G440 XT Heavy", categoria: "Volquete", horometro: 610, estado: "bloqueado" },
      { codigo: "ECV-143", marcaModelo: "Scania G440 XT Heavy", categoria: "Volquete", horometro: 490, estado: "bloqueado" },
      { codigo: "ECV-144", marcaModelo: "Volvo FMX 500 8x4", categoria: "Volquete", horometro: 720, estado: "mantenimiento" },
      { codigo: "ECV-145", marcaModelo: "Volvo FMX 500 8x4", categoria: "Volquete", horometro: 430, estado: "disponible" },
      { codigo: "EEX-040", marcaModelo: "Caterpillar 336D2 L", categoria: "Excavadora", horometro: 1250, estado: "disponible" },
      { codigo: "EEX-042", marcaModelo: "Komatsu PC350LC-8", categoria: "Excavadora", horometro: 980, estado: "bloqueado" },
      { codigo: "EEX-043", marcaModelo: "Caterpillar 349D2 L", categoria: "Excavadora", horometro: 1420, estado: "bloqueado" },
      { codigo: "CAT-797F", marcaModelo: "Caterpillar 797F Ultra", categoria: "Camión Minero", horometro: 320, estado: "bloqueado" },
    ];
  }, []);

  // 2. Base de datos Mock de Órdenes de Mantenimiento
  const [ordenes, setOrdenes] = useState(() => {
    try {
      const stored = localStorage.getItem("ordenes_mantenimiento_dispatch");
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [
      // PREVENTIVOS
      {
        id: "OT-PREV-101",
        tipo: "preventivo",
        equipoCodigo: "ECV-144",
        equipoModelo: "Volvo FMX 500 8x4",
        equipoCategoria: "Volquete",
        rutina: "PM-2 (500 Horas) - Cambio Aceite y Filtros",
        fecha: "2026-10-02",
        horario: "08:00 - 14:00",
        ubicacion: "Taller Central - Bahía 1",
        tecnico: "Ing. Marcos Valdivia",
        horometro: "720h",
        descripcion: "Cambio de aceite motor 15W40, reemplazo de filtros de combustible y aire, lubricación de suspensión y crucetas.",
        severidad: "Programada",
        estado: "En Taller",
        fechaRegistro: "01/10/2026",
      },
      {
        id: "OT-PREV-102",
        tipo: "preventivo",
        equipoCodigo: "EEX-042",
        equipoModelo: "Komatsu PC350LC-8",
        equipoCategoria: "Excavadora",
        rutina: "PM-3 (1000 Horas) - Mantenimiento Mayor",
        fecha: "2026-10-05",
        horario: "07:00 - 15:00",
        ubicacion: "Taller Central - Bahía 2",
        tecnico: "Mec. Especialista Carlos Neyra",
        horometro: "980h",
        descripcion: "Calibración de válvulas, análisis de fluidos hidráulicos, ajuste de tensión de orugas y cambio de mandos finales.",
        severidad: "Programada",
        estado: "Programado",
        fechaRegistro: "01/10/2026",
      },
      {
        id: "OT-PREV-103",
        tipo: "preventivo",
        equipoCodigo: "ECV-140",
        equipoModelo: "Volvo FMX 480 8x4",
        equipoCategoria: "Volquete",
        rutina: "PM-1 (250 Horas) - Inspección y Lubricación",
        fecha: "2026-10-07",
        horario: "09:00 - 12:00",
        ubicacion: "Taller Mina Norte - Bahía Rápida",
        tecnico: "Téc. Jorge Huamán",
        horometro: "520h",
        descripcion: "Engrase integral por puntos de inyección, revisión de pernos de cardán y chequeo de luces mineras.",
        severidad: "Programada",
        estado: "Programado",
        fechaRegistro: "30/09/2026",
      },
      {
        id: "OT-PREV-104",
        tipo: "preventivo",
        equipoCodigo: "CAT-797F",
        equipoModelo: "Caterpillar 797F Ultra",
        equipoCategoria: "Camión Minero",
        rutina: "PM-1 (250 Horas) - Sistema de Frenos y Tolva",
        fecha: "2026-09-28",
        horario: "08:00 - 14:00",
        ubicacion: "Taller Central - Bahía 1",
        tecnico: "Ing. Marcos Valdivia",
        horometro: "320h",
        descripcion: "Inspección de zapatas y retardador dinámico. Prueba de presión de frenado completada satisfactoriamente.",
        severidad: "Programada",
        estado: "Completado",
        notaCierre: "Mantenimiento preventivo completado al 100%. Equipo retornado a operación en tajo.",
        fechaRegistro: "28/09/2026",
      },
      {
        id: "OT-PREV-105",
        tipo: "preventivo",
        equipoCodigo: "ECV-145",
        equipoModelo: "Volvo FMX 500 8x4",
        equipoCategoria: "Volquete",
        rutina: "Inspección de Muelles y Suspensión Posterior",
        fecha: "2026-09-25",
        horario: "08:00 - 11:30",
        ubicacion: "Taller Central - Bahía 1",
        tecnico: "Mec. Raúl Soto",
        horometro: "430h",
        descripcion: "Torque de abrazaderas de muelles y revisión de amortiguadores.",
        severidad: "Programada",
        estado: "Completado",
        notaCierre: "Inspección aprobada sin observaciones.",
        fechaRegistro: "25/09/2026",
      },

      // CORRECTIVOS (INCIDENTES INMEDIATOS)
      {
        id: "OT-CORR-089",
        tipo: "correctivo",
        equipoCodigo: "ECV-141",
        equipoModelo: "Volvo FMX 480 8x4",
        equipoCategoria: "Volquete",
        rutina: "Falla en Neumáticos y Llantas",
        fecha: "2026-10-01",
        horario: "14:20 (Inmediato)",
        ubicacion: "Rampa Principal - Km 3.2",
        componente: "Neumáticos y Llantas",
        tecnico: "Unidad de Auxilio Mecánico 02",
        horometro: "550h",
        descripcion: "Se bajó la llanta posterior izquierda (pérdida súbita de presión por piedra cortante en ruta de acarreo).",
        accion: "Máquina detenida a un costado de la rampa con tacos y conos. Camión llantero en ruta para cambio.",
        severidad: "Crítica (Equipo Inoperativo)",
        estado: "En Taller",
        fechaRegistro: "01/10/2026",
      },
      {
        id: "OT-CORR-090",
        tipo: "correctivo",
        equipoCodigo: "EEX-043",
        equipoModelo: "Caterpillar 349D2 L",
        equipoCategoria: "Excavadora",
        rutina: "Falla en Sistema Hidráulico",
        fecha: "2026-10-01",
        horario: "11:05 (Inmediato)",
        ubicacion: "Acopio Filtro 2 - Frente de Carguío",
        componente: "Sistema Hidráulico",
        tecnico: "Cuadrilla Hidráulica Tajo",
        horometro: "1420h",
        descripcion: "Fuga de aceite hidráulico en manguera de alta presión del cilindro de levante de pluma.",
        accion: "Carguío detenido por seguridad ambiental. Reemplazo de manguera y recarga de aceite ISO 68.",
        severidad: "Alta (Operación Restringida)",
        estado: "En Taller",
        fechaRegistro: "01/10/2026",
      },
      {
        id: "OT-CORR-091",
        tipo: "correctivo",
        equipoCodigo: "ECV-142",
        equipoModelo: "Scania G440 XT Heavy",
        equipoCategoria: "Volquete",
        rutina: "Falla en Sistema Eléctrico",
        fecha: "2026-09-29",
        horario: "16:45 (Inmediato)",
        ubicacion: "Botadero Norte - Rampa 2",
        componente: "Sistema Eléctrico y Baterías",
        tecnico: "Electromecánico Julio Ramos",
        horometro: "605h",
        descripcion: "Falso contacto en terminal de alternador provocó alerta en tablero de cabina.",
        accion: "Limpieza y ajuste de bornes. Prueba de carga 28V correcta.",
        severidad: "Media",
        estado: "Completado",
        notaCierre: "Terminal reemplazado. Equipo habilitado para continuar acarreo.",
        fechaRegistro: "29/09/2026",
      },
    ];
  });

  // Filtros de navegación
  const [tabFiltro, setTabFiltro] = useState("todos"); // todos | preventivo | correctivo | taller | completado
  const [busqueda, setBusqueda] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modales
  const [modalPreventivoOpen, setModalPreventivoOpen] = useState(false);
  const [modalCorrectivoOpen, setModalCorrectivoOpen] = useState(false);
  const [modalDetalleOpen, setModalDetalleOpen] = useState(false);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [toastMensaje, setToastMensaje] = useState("");

  const guardarStorage = (nuevas) => {
    setOrdenes(nuevas);
    try {
      localStorage.setItem("ordenes_mantenimiento_dispatch", JSON.stringify(nuevas));
    } catch {
      // storage
    }
  };

  const mostrarToast = (msg) => {
    setToastMensaje(msg);
    setTimeout(() => setToastMensaje(""), 4500);
  };

  // Guardar nueva orden preventiva
  const handleGuardarPreventivo = (nueva) => {
    const actualizadas = [nueva, ...ordenes];
    guardarStorage(actualizadas);
    setModalPreventivoOpen(false);
    setCurrentPage(1);
    mostrarToast(`¡Mantenimiento preventivo ${nueva.id} programado para ${nueva.equipoCodigo}!`);
  };

  // Guardar nueva orden correctiva
  const handleGuardarCorrectivo = (nueva) => {
    const actualizadas = [nueva, ...ordenes];
    guardarStorage(actualizadas);
    setModalCorrectivoOpen(false);
    setCurrentPage(1);
    mostrarToast(`¡Incidente correctivo ${nueva.id} registrado de inmediato para ${nueva.equipoCodigo}!`);
  };

  // Actualizar estado de orden
  const handleActualizarEstadoOrden = (ordenActualizada) => {
    const actualizadas = ordenes.map((o) =>
      o.id === ordenActualizada.id ? ordenActualizada : o
    );
    guardarStorage(actualizadas);
    setOrdenSeleccionada(ordenActualizada);
    mostrarToast(`¡Orden ${ordenActualizada.id} actualizada a: ${ordenActualizada.estado}!`);
  };

  // MÉTRICAS Y CÁLCULOS
  const totalPreventivos = ordenes.filter((o) => o.tipo === "preventivo").length;
  const totalCorrectivos = ordenes.filter((o) => o.tipo === "correctivo").length;
  const equiposEnTaller = ordenes.filter((o) => o.estado === "En Taller").length;
  const ordenesCompletadas = ordenes.filter((o) => o.estado === "Completado").length;

  // Filtrado de la tabla
  const ordenesFiltradas = useMemo(() => {
    return ordenes.filter((ord) => {
      const q = busqueda.toLowerCase().trim();
      const matchBusqueda =
        !q ||
        ord.id.toLowerCase().includes(q) ||
        ord.equipoCodigo.toLowerCase().includes(q) ||
        ord.equipoModelo.toLowerCase().includes(q) ||
        ord.rutina.toLowerCase().includes(q) ||
        ord.tecnico.toLowerCase().includes(q) ||
        ord.ubicacion.toLowerCase().includes(q) ||
        ord.descripcion.toLowerCase().includes(q);

      const matchTab =
        tabFiltro === "todos" ||
        (tabFiltro === "preventivo" && ord.tipo === "preventivo") ||
        (tabFiltro === "correctivo" && ord.tipo === "correctivo") ||
        (tabFiltro === "taller" && ord.estado === "En Taller") ||
        (tabFiltro === "completado" && ord.estado === "Completado");

      return matchBusqueda && matchTab;
    });
  }, [ordenes, busqueda, tabFiltro]);

  // Cálculos de Paginación
  const totalPages = Math.max(1, Math.ceil(ordenesFiltradas.length / itemsPerPage));
  const pageSeguro = Math.min(currentPage, totalPages);
  const startIndex = (pageSeguro - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, ordenesFiltradas.length);
  const ordenesPaginadas = ordenesFiltradas.slice(startIndex, endIndex);

  return (
    <div className="mantenimiento-view-container">
      {/* TOAST DE CONFIRMACIÓN */}
      {toastMensaje && (
        <div className="toast-success-banner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{toastMensaje}</span>
        </div>
      )}

      {/* CABECERA PRINCIPAL CON 2 BOTONES DE ACCIÓN */}
      <div className="view-header">
        <div>
          <h2 className="view-title">Control de Mantenimiento y Confiabilidad de Flota</h2>
          <p className="view-subtitle">
            Monitoreo técnico de servicios preventivos e incidentes correctivos en tiempo real
          </p>
        </div>

        {/* 2 BOTONES DE ACCIÓN PRINCIPALES */}
        <div className="mantenimiento-header-actions">
          {/* BOTÓN 1: PROGRAMAR PREVENTIVO */}
          <button
            type="button"
            className="btn-action-primary"
            onClick={() => setModalPreventivoOpen(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="12" y1="11" x2="12" y2="17" />
              <line x1="9" y1="14" x2="15" y2="14" />
            </svg>
            + Programar Preventivo
          </button>

          {/* BOTÓN 2: REPORTAR INCIDENTE CORRECTIVO */}
          <button
            type="button"
            className="btn-action-corrective-emergency"
            onClick={() => setModalCorrectivoOpen(true)}
            title="Reportar incidente o falla mecánica inmediata"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            ⚠️ Reportar Incidente (Correctivo)
          </button>
        </div>
      </div>

      {/* BARRA DE CONTROLES Y PESTAÑAS RÁPIDAS */}
      <div className="mantenimiento-controls-row">
        {/* PESTAÑAS DE FILTRO */}
        <div className="mantenimiento-tab-pills">
          <button
            type="button"
            className={`mant-tab-btn ${tabFiltro === "todos" ? "active" : ""}`}
            onClick={() => {
              setTabFiltro("todos");
              setCurrentPage(1);
            }}
          >
            Todos ({ordenes.length})
          </button>
          <button
            type="button"
            className={`mant-tab-btn ${tabFiltro === "preventivo" ? "active" : ""}`}
            onClick={() => {
              setTabFiltro("preventivo");
              setCurrentPage(1);
            }}
          >
            📅 Preventivos ({totalPreventivos})
          </button>
          <button
            type="button"
            className={`mant-tab-btn ${tabFiltro === "correctivo" ? "active" : ""}`}
            onClick={() => {
              setTabFiltro("correctivo");
              setCurrentPage(1);
            }}
          >
            ⚡ Correctivos ({totalCorrectivos})
          </button>
          <button
            type="button"
            className={`mant-tab-btn ${tabFiltro === "taller" ? "active" : ""}`}
            onClick={() => {
              setTabFiltro("taller");
              setCurrentPage(1);
            }}
          >
            🔧 En Taller ({equiposEnTaller})
          </button>
          <button
            type="button"
            className={`mant-tab-btn ${tabFiltro === "completado" ? "active" : ""}`}
            onClick={() => {
              setTabFiltro("completado");
              setCurrentPage(1);
            }}
          >
            ✓ Completados ({ordenesCompletadas})
          </button>
        </div>

        {/* BUSCADOR */}
        <div className="search-multi-input mant-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por OT, equipo (ECV-144), rutina o falla..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setCurrentPage(1);
            }}
          />
          {busqueda && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => {
                setBusqueda("");
                setCurrentPage(1);
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* TABLA CORPORATIVA DE ÓRDENES DE TRABAJO */}
      <div className="table-wrapper corporate-theme">
        <table className="dispatch-table">
          <thead>
            <tr>
              <th>CÓDIGO OT</th>
              <th>EQUIPO</th>
              <th>TIPO MANTENIMIENTO</th>
              <th>DETALLE / RUTINA / FALLA</th>
              <th>FECHA Y HORARIO</th>
              <th>UBICACIÓN / TALLER</th>
              <th>SEVERIDAD</th>
              <th>ESTADO</th>
              <th style={{ textAlign: "right", paddingRight: "18px" }}>ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {ordenesPaginadas.map((ord) => (
              <tr key={ord.id}>
                <td>
                  <span className="badge-codigo-corporate">{ord.id}</span>
                </td>
                <td>
                  <div className="operador-name-cell">
                    <span className="name-primary">{ord.equipoCodigo}</span>
                    <span className="phone-muted">{ord.equipoModelo}</span>
                  </div>
                </td>
                <td>
                  <span className={`badge-mant-tipo ${ord.tipo}`}>
                    {ord.tipo === "preventivo" ? "📅 Preventivo" : "⚡ Correctivo"}
                  </span>
                </td>
                <td>
                  <div className="mant-rutina-cell">
                    <strong>{ord.rutina}</strong>
                    <small>{ord.tecnico}</small>
                  </div>
                </td>
                <td>
                  <span className="cell-fecha-horario">
                    {ord.fecha} <br />
                    <small>{ord.horario}</small>
                  </span>
                </td>
                <td>
                  <span className="cell-ubicacion">{ord.ubicacion}</span>
                </td>
                <td>
                  <span
                    className={`badge-severidad ${
                      ord.severidad.toLowerCase().includes("crítica")
                        ? "critica"
                        : ord.severidad.toLowerCase().includes("alta")
                        ? "alta"
                        : "normal"
                    }`}
                  >
                    {ord.severidad}
                  </span>
                </td>
                <td>
                  <span
                    className={`status-pill-corporate ${
                      ord.estado === "Completado"
                        ? "ok"
                        : ord.estado === "Programado"
                        ? "pending"
                        : "warning"
                    }`}
                  >
                    <span className="pill-dot"></span>
                    {ord.estado}
                  </span>
                </td>
                <td style={{ textAlign: "right", paddingRight: "16px" }}>
                  <button
                    type="button"
                    className="btn-view-profile-corporate"
                    onClick={() => {
                      setOrdenSeleccionada(ord);
                      setModalDetalleOpen(true);
                    }}
                    title="Ver detalles de la orden"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Ficha
                  </button>
                </td>
              </tr>
            ))}

            {ordenesFiltradas.length === 0 && (
              <tr>
                <td colSpan={9} className="table-empty-row">
                  <div className="empty-state-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <p>No se encontraron órdenes de mantenimiento registradas.</p>
                    <small>Prueba cambiando de pestaña o registrando un nuevo preventivo/correctivo.</small>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* BARRA DE PAGINACIÓN */}
        {ordenesFiltradas.length > 0 && (
          <div className="table-pagination-bar">
            <div className="pagination-info">
              Mostrando <strong>{startIndex + 1}</strong> a <strong>{endIndex}</strong> de <strong>{ordenesFiltradas.length}</strong> órdenes
            </div>

            <div className="pagination-nav">
              <button
                type="button"
                className="page-nav-btn"
                disabled={pageSeguro <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Anterior
              </button>

              <div className="page-numbers-list">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`page-num-pill ${num === pageSeguro ? "active" : ""}`}
                    onClick={() => setCurrentPage(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="page-nav-btn"
                disabled={pageSeguro >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Siguiente
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: PREVENTIVO */}
      <ModalPreventivo
        isOpen={modalPreventivoOpen}
        onClose={() => setModalPreventivoOpen(false)}
        onGuardar={handleGuardarPreventivo}
        equiposDisponibles={equiposDisponibles}
      />

      {/* MODAL 2: CORRECTIVO */}
      <ModalCorrectivo
        isOpen={modalCorrectivoOpen}
        onClose={() => setModalCorrectivoOpen(false)}
        onGuardar={handleGuardarCorrectivo}
        equiposDisponibles={equiposDisponibles}
      />

      {/* MODAL 3: DETALLE DE ORDEN */}
      <ModalDetalleOrden
        isOpen={modalDetalleOpen}
        orden={ordenSeleccionada}
        onClose={() => {
          setModalDetalleOpen(false);
          setOrdenSeleccionada(null);
        }}
        onActualizarEstado={handleActualizarEstadoOrden}
      />
    </div>
  );
}
