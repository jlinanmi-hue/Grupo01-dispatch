import { useState, useMemo } from "react";
import ModalRegistrarEquipo from "./ModalRegistrarEquipo";
import ModalDetalleEquipo from "./ModalDetalleEquipo";

export default function EquiposView({ filterType = "todos" }) {
  // Catálogo completo de equipos mineros con VIN, Marca/Modelo, Capacidad, Año y Horómetro
  const [equipos, setEquipos] = useState(() => {
    try {
      const stored = localStorage.getItem("catalogo_equipos_dispatch");
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }

    return [
      // VOLQUETES DE ACARREO
      {
        codigo: "ECV-140",
        categoria: "Volquete",
        marcaModelo: "Volvo FMX 480 8x4 Tipper",
        vin: "YV2XZ40A5MA129384",
        capacidad: "20 m³ (32 Tn)",
        anio: 2022,
        horometro: 520,
        estado: "disponible",
      },
      {
        codigo: "ECV-141",
        categoria: "Volquete",
        marcaModelo: "Volvo FMX 480 8x4 Tipper",
        vin: "YV2XZ40A5MA129385",
        capacidad: "20 m³ (32 Tn)",
        anio: 2022,
        horometro: 550,
        estado: "bloqueado",
      },
      {
        codigo: "ECV-142",
        categoria: "Volquete",
        marcaModelo: "Scania G440 XT Heavy Tipper",
        vin: "YS2G440XT82910481",
        capacidad: "17 m³ (28 Tn)",
        anio: 2023,
        horometro: 610,
        estado: "bloqueado",
      },
      {
        codigo: "ECV-143",
        categoria: "Volquete",
        marcaModelo: "Scania G440 XT Heavy Tipper",
        vin: "YS2G440XT82910482",
        capacidad: "17 m³ (28 Tn)",
        anio: 2023,
        horometro: 490,
        estado: "bloqueado",
      },
      {
        codigo: "ECV-144",
        categoria: "Volquete",
        marcaModelo: "Volvo FMX 500 8x4",
        vin: "YV2XZ50A9MA140291",
        capacidad: "20 m³ (32 Tn)",
        anio: 2021,
        horometro: 720,
        estado: "mantenimiento",
        motivo: "Mant. Preventivo (PM-2) 750h",
      },
      {
        codigo: "ECV-145",
        categoria: "Volquete",
        marcaModelo: "Volvo FMX 500 8x4",
        vin: "YV2XZ50A9MA140292",
        capacidad: "20 m³ (32 Tn)",
        anio: 2021,
        horometro: 430,
        estado: "disponible",
      },
      {
        codigo: "ECV-146",
        categoria: "Volquete",
        marcaModelo: "Mercedes-Benz Actros 4144K",
        vin: "WDB9341441L892019",
        capacidad: "20 m³ (32 Tn)",
        anio: 2022,
        horometro: 395,
        estado: "disponible",
      },
      {
        codigo: "ECV-147",
        categoria: "Volquete",
        marcaModelo: "Mercedes-Benz Actros 4144K",
        vin: "WDB9341441L892020",
        capacidad: "17 m³ (28 Tn)",
        anio: 2022,
        horometro: 512,
        estado: "disponible",
      },
      {
        codigo: "ECV-148",
        categoria: "Volquete",
        marcaModelo: "Scania G440 XT Heavy Tipper",
        vin: "YS2G440XT82910499",
        capacidad: "17 m³ (28 Tn)",
        anio: 2023,
        horometro: 604,
        estado: "disponible",
      },
      {
        codigo: "ECV-149",
        categoria: "Volquete",
        marcaModelo: "Volvo FMX 480 8x4",
        vin: "YV2XZ40A5MA129400",
        capacidad: "20 m³ (32 Tn)",
        anio: 2022,
        horometro: 480,
        estado: "disponible",
      },
      {
        codigo: "ECV-150",
        categoria: "Volquete",
        marcaModelo: "Volvo FMX 480 8x4",
        vin: "YV2XZ40A5MA129401",
        capacidad: "20 m³ (32 Tn)",
        anio: 2022,
        horometro: 530,
        estado: "disponible",
      },
      {
        codigo: "ECV-151",
        categoria: "Volquete",
        marcaModelo: "Volvo FMX 480 8x4",
        vin: "YV2XZ40A5MA129402",
        capacidad: "20 m³ (32 Tn)",
        anio: 2022,
        horometro: 440,
        estado: "disponible",
      },

      // EXCAVADORAS DE CARGUÍO
      {
        codigo: "EEX-040",
        categoria: "Excavadora",
        marcaModelo: "Caterpillar 336D2 L",
        vin: "CAT0336D2L819203",
        capacidad: "2.4 m³ (Balde HD)",
        anio: 2023,
        horometro: 1250,
        estado: "disponible",
      },
      {
        codigo: "EEX-041",
        categoria: "Excavadora",
        marcaModelo: "Caterpillar 336D2 L",
        vin: "CAT0336D2L819204",
        capacidad: "2.4 m³ (Balde HD)",
        anio: 2023,
        horometro: 1180,
        estado: "disponible",
      },
      {
        codigo: "EEX-042",
        categoria: "Excavadora",
        marcaModelo: "Komatsu PC350LC-8",
        vin: "KMTPC350LC938210",
        capacidad: "2.2 m³ (Roca)",
        anio: 2022,
        horometro: 980,
        estado: "bloqueado",
      },
      {
        codigo: "EEX-043",
        categoria: "Excavadora",
        marcaModelo: "Caterpillar 349D2 L",
        vin: "CAT0349D2L902184",
        capacidad: "3.1 m³ (Servicio Pesado)",
        anio: 2023,
        horometro: 1420,
        estado: "bloqueado",
      },
      {
        codigo: "EEX-044",
        categoria: "Excavadora",
        marcaModelo: "Caterpillar 349D2 L",
        vin: "CAT0349D2L902185",
        capacidad: "3.1 m³ (Servicio Pesado)",
        anio: 2023,
        horometro: 890,
        estado: "disponible",
      },
      {
        codigo: "EEX-045",
        categoria: "Excavadora",
        marcaModelo: "Komatsu PC350LC-8",
        vin: "KMTPC350LC938211",
        capacidad: "2.2 m³ (Roca)",
        anio: 2022,
        horometro: 1100,
        estado: "disponible",
      },
      {
        codigo: "EEX-046",
        categoria: "Excavadora",
        marcaModelo: "Caterpillar 336D2 L",
        vin: "CAT0336D2L819205",
        capacidad: "2.4 m³ (Balde HD)",
        anio: 2023,
        horometro: 740,
        estado: "disponible",
      },
      {
        codigo: "EEX-047",
        categoria: "Excavadora",
        marcaModelo: "Caterpillar 336D2 L",
        vin: "CAT0336D2L819206",
        capacidad: "2.4 m³ (Balde HD)",
        anio: 2023,
        horometro: 690,
        estado: "disponible",
      },

      // CAMIÓN MINERO
      {
        codigo: "CAT-797F",
        categoria: "Camión Minero",
        marcaModelo: "Caterpillar 797F Ultra Class",
        vin: "CAT00797FDK829104",
        capacidad: "400 Toneladas (240 m³)",
        anio: 2024,
        horometro: 320,
        estado: "bloqueado",
      },
    ];
  });

  // Filtros interactivos
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState(
    filterType === "todos" ? "todos" : filterType
  );
  const [filtroEstado, setFiltroEstado] = useState("todos");

  // Modales
  const [modalRegistrarOpen, setModalRegistrarOpen] = useState(false);
  const [modalDetalleOpen, setModalDetalleOpen] = useState(false);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [modoEdicionModal, setModoEdicionModal] = useState(false);
  const [toastMensaje, setToastMensaje] = useState("");

  // Persistir en localStorage
  const guardarEquiposStorage = (nuevosEquipos) => {
    setEquipos(nuevosEquipos);
    try {
      localStorage.setItem(
        "catalogo_equipos_dispatch",
        JSON.stringify(nuevosEquipos)
      );
    } catch {
      // storage fallback
    }
  };

  // Notificación toast
  const mostrarToast = (msg) => {
    setToastMensaje(msg);
    setTimeout(() => setToastMensaje(""), 4500);
  };

  // Categorías dinámicas para el combobox
  const categoriasDisponibles = useMemo(() => {
    const setCats = new Set(equipos.map((e) => e.categoria).filter(Boolean));
    return ["todos", ...Array.from(setCats)];
  }, [equipos]);

  // Acción Ojito: Ver Ficha Técnica
  const handleVerDetalle = (eq) => {
    setEquipoSeleccionado(eq);
    setModoEdicionModal(false);
    setModalDetalleOpen(true);
  };

  // Acción Lapicito: Editar Equipo
  const handleEditarEquipo = (eq) => {
    setEquipoSeleccionado(eq);
    setModoEdicionModal(true);
    setModalDetalleOpen(true);
  };

  // Guardar nuevo equipo
  const handleGuardarNuevoEquipo = (nuevoEquipo) => {
    const actualizados = [nuevoEquipo, ...equipos];
    guardarEquiposStorage(actualizados);
    setModalRegistrarOpen(false);
    mostrarToast(
      `¡Equipo ${nuevoEquipo.codigo} (${nuevoEquipo.marcaModelo}) registrado en el catálogo!`
    );
  };

  // Guardar edición
  const handleGuardarEdicionEquipo = (equipoModificado) => {
    const actualizados = equipos.map((eq) =>
      eq.codigo === equipoModificado.codigo ? equipoModificado : eq
    );
    guardarEquiposStorage(actualizados);
    setEquipoSeleccionado(equipoModificado);
    mostrarToast(`¡Ficha técnica de ${equipoModificado.codigo} actualizada!`);
  };

  // Filtrado multi-criterio
  const listaFiltrada = useMemo(() => {
    return equipos.filter((eq) => {
      const q = busqueda.toLowerCase().trim();
      const matchBusqueda =
        !q ||
        eq.codigo.toLowerCase().includes(q) ||
        (eq.marcaModelo && eq.marcaModelo.toLowerCase().includes(q)) ||
        (eq.categoria && eq.categoria.toLowerCase().includes(q)) ||
        (eq.vin && eq.vin.toLowerCase().includes(q)) ||
        (eq.capacidad && eq.capacidad.toLowerCase().includes(q)) ||
        (eq.motivo && eq.motivo.toLowerCase().includes(q));

      const matchCategoria =
        filtroCategoria === "todos" ||
        eq.categoria?.toLowerCase() === filtroCategoria.toLowerCase();

      const matchEstado =
        filtroEstado === "todos" ||
        (filtroEstado === "disponible" && eq.estado === "disponible") ||
        (filtroEstado === "bloqueado" && eq.estado === "bloqueado") ||
        (filtroEstado === "mantenimiento" && eq.estado === "mantenimiento");

      return matchBusqueda && matchCategoria && matchEstado;
    });
  }, [equipos, busqueda, filtroCategoria, filtroEstado]);

  // Conteos para los estados
  const conteoDisponibles = equipos.filter((e) => e.estado === "disponible").length;
  const conteoOperando = equipos.filter((e) => e.estado === "bloqueado").length;
  const conteoMantenimiento = equipos.filter((e) => e.estado === "mantenimiento").length;

  return (
    <div className="equipos-view-container">
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

      {/* CABECERA PRINCIPAL CON BOTÓN AGREGAR EQUIPO */}
      <div className="view-header">
        <div>
          <h2 className="view-title">Gestión del Parque de Maquinaria</h2>
          <p className="view-subtitle">
            Catálogo técnico de flota pesada, especificaciones (VIN / Horómetro) y control operativo
          </p>
        </div>

        {/* BOTÓN AGREGAR EQUIPO */}
        <div className="equipos-header-actions">
          <button
            type="button"
            className="btn-action-primary"
            onClick={() => setModalRegistrarOpen(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Agregar Equipo
          </button>
        </div>
      </div>

      {/* BARRA DE BÚSQUEDA Y COMBOBOXES DE FILTRO */}
      <div className="operadores-controls-bar equipos-controls-bar">
        {/* BUSCADOR */}
        <div className="search-multi-input">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por código, modelo (Caterpillar, Komatsu), VIN, capacidad..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setBusqueda("")}
            >
              ✕
            </button>
          )}
        </div>

        {/* SEPARADOR */}
        <div className="controls-separator"></div>

        {/* COMBOBOX CATEGORÍAS */}
        <div className="filter-dropdown-wrap">
          <span className="filter-dropdown-label">Categoría:</span>
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="filter-select"
          >
            {categoriasDisponibles.map((cat) => {
              if (cat === "todos") {
                return (
                  <option key="todos" value="todos">
                    Todas las Categorías ({equipos.length})
                  </option>
                );
              }
              const count = equipos.filter(
                (e) => e.categoria?.toLowerCase() === cat.toLowerCase()
              ).length;
              return (
                <option key={cat} value={cat}>
                  {cat} ({count})
                </option>
              );
            })}
          </select>
        </div>

        {/* COMBOBOX ESTADOS */}
        <div className="filter-dropdown-wrap">
          <span className="filter-dropdown-label">Estado:</span>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="filter-select"
          >
            <option value="todos">Todos los Estados ({equipos.length})</option>
            <option value="disponible">Disponibles ({conteoDisponibles})</option>
            <option value="bloqueado">En Operación ({conteoOperando})</option>
            <option value="mantenimiento">En Mantenimiento ({conteoMantenimiento})</option>
          </select>
        </div>
      </div>

      {/* GRILLA DE EQUIPOS (CARDS TÉCNICAS CON OJITO Y LAPICITO) */}
      <div className="equipos-grid">
        {listaFiltrada.map((eq) => {
          return (
            <div
              key={eq.codigo}
              className={`equipo-tile ${eq.estado}`}
              onClick={() => handleVerDetalle(eq)}
            >
              {/* CABECERA DE LA TARJETA */}
              <div className="tile-header">
                <div className="tile-category-row">
                  <span className="categoria-tag">{eq.categoria}</span>
                  <span className={`status-badge ${eq.estado}`}>
                    {eq.estado === "disponible" && "Disponible"}
                    {eq.estado === "bloqueado" && "En Operación"}
                    {eq.estado === "mantenimiento" && "Mantenimiento"}
                  </span>
                </div>

                {/* BOTONES OJITO Y LAPICITO */}
                <div className="card-quick-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className="card-action-icon-btn eye-btn"
                    onClick={() => handleVerDetalle(eq)}
                    title="Ver ficha técnica completa (Ojito)"
                    aria-label="Ver ficha técnica"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="card-action-icon-btn pencil-btn"
                    onClick={() => handleEditarEquipo(eq)}
                    title="Editar datos del equipo (Lapicito)"
                    aria-label="Editar datos"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* CENTRO DE LA TARJETA */}
              <div className="tile-center">
                <div className="equipo-cod-icon">
                  {eq.categoria === "Excavadora" ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 17h18" />
                      <circle cx="7" cy="17" r="2" />
                      <circle cx="17" cy="17" r="2" />
                      <path d="M5 14l2-6h9l2 6" />
                    </svg>
                  ) : eq.categoria === "Camión Minero" ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="1" y="3" width="15" height="13" rx="2" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M2 7h12v11H2z" />
                      <path d="M14 11h4l4 4v3h-8z" />
                      <circle cx="6" cy="19" r="2" />
                      <circle cx="18" cy="19" r="2" />
                    </svg>
                  )}
                </div>

                <h3 className="tile-codigo">{eq.codigo}</h3>
                <span className="tile-marca-modelo">{eq.marcaModelo}</span>

                <div className="tile-specs-chips">
                  <span className="spec-chip">
                    {eq.capacidad}
                  </span>
                  <span className="spec-chip horometro">
                    ⏱ {eq.horometro}h
                  </span>
                  <span className="spec-chip">
                    Año {eq.anio}
                  </span>
                </div>

                <span className="tile-vin-text">VIN: {eq.vin}</span>

                {eq.motivo && (
                  <span className="tile-alert-text">⚠️ {eq.motivo}</span>
                )}
              </div>

              {/* PIE DE TARJETA: VER FICHA */}
              <div className="tile-footer-actions">
                <button
                  type="button"
                  className="tile-btn-detail"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVerDetalle(eq);
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Ficha Técnica
                </button>
              </div>
            </div>
          );
        })}

        {listaFiltrada.length === 0 && (
          <div className="equipos-empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <h3>No se encontraron equipos</h3>
            <p>
              No hay maquinaria que coincida con los criterios de búsqueda o filtros seleccionados.
            </p>
            <button
              type="button"
              className="btn-clear-filters"
              onClick={() => {
                setBusqueda("");
                setFiltroCategoria("todos");
                setFiltroEstado("todos");
              }}
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </div>

      {/* MODAL 1: REGISTRAR EQUIPO */}
      <ModalRegistrarEquipo
        isOpen={modalRegistrarOpen}
        onClose={() => setModalRegistrarOpen(false)}
        onGuardar={handleGuardarNuevoEquipo}
        categoriasExistentes={categoriasDisponibles.filter((c) => c !== "todos")}
      />

      {/* MODAL 2: DETALLE / EDICIÓN */}
      <ModalDetalleEquipo
        isOpen={modalDetalleOpen}
        equipo={equipoSeleccionado}
        isEditMode={modoEdicionModal}
        onClose={() => {
          setModalDetalleOpen(false);
          setEquipoSeleccionado(null);
        }}
        onGuardarEdicion={handleGuardarEdicionEquipo}
      />
    </div>
  );
}
