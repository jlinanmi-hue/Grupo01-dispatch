import { useState, useMemo } from "react";
import RegistrarOperadorView from "./RegistrarOperadorView";

export default function OperadoresView() {
  const [modoRegistro, setModoRegistro] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtroTurno, setFiltroTurno] = useState("todos");
  const [filtroEquipo, setFiltroEquipo] = useState("todos");
  const [operadorSeleccionado, setOperadorSeleccionado] = useState(null);
  const [mensajeExito, setMensajeExito] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Base de datos Mock completa de Operadores Mineros
  const [operadores, setOperadores] = useState([
    {
      codigo: "OP-345039",
      nin: "72849102",
      nombre: "Carlos Eduardo Quispe Mamani",
      turno: "Turno A - Día (7x7)",
      equipo: "Camión Minero CAT 797F",
      tipoEquipo: "Acarreo Pesado",
      estado: "Pendiente de Documentos",
      telefono: "987 654 321",
      licencia: "A-IIIb (MTC)",
      guardia: "Guardia 2 - Puma",
      fechaIngreso: "15/01/2026",
    },
    {
      codigo: "OP-345012",
      nin: "70528452",
      nombre: "Néstor Alejandro Arroyo Velásquez",
      turno: "Turno Día",
      equipo: "EEX-043 (Excavadora Cat 349)",
      tipoEquipo: "Carguío Frente A",
      estado: "Operando",
      telefono: "951 842 103",
      licencia: "Especial MPT",
      guardia: "Guardia 1 - Cóndor",
      fechaIngreso: "04/03/2024",
    },
    {
      codigo: "OP-345015",
      nin: "72149581",
      nombre: "Alejandro Arroyo",
      turno: "Turno Día",
      equipo: "ECV-141 (Volquete 20m³)",
      tipoEquipo: "Acarreo",
      estado: "Operando",
      telefono: "964 125 890",
      licencia: "A-IIIb (MTC)",
      guardia: "Guardia 1 - Cóndor",
      fechaIngreso: "12/08/2023",
    },
    {
      codigo: "OP-345018",
      nin: "71842093",
      nombre: "Bruno Arroyo",
      turno: "Turno Día",
      equipo: "ECV-142 (Volquete 17m³)",
      tipoEquipo: "Acarreo",
      estado: "Operando",
      telefono: "981 742 301",
      licencia: "A-IIIb (MTC)",
      guardia: "Guardia 2 - Puma",
      fechaIngreso: "19/11/2023",
    },
    {
      codigo: "OP-345022",
      nin: "73920184",
      nombre: "Jhon Leturne",
      turno: "Turno Noche",
      equipo: "ECV-143 (Volquete 17m³)",
      tipoEquipo: "Acarreo",
      estado: "Relevo",
      telefono: "945 812 369",
      licencia: "A-IIIb (MTC)",
      guardia: "Guardia 3 - Huáscar",
      fechaIngreso: "05/02/2024",
    },
    {
      codigo: "OP-345026",
      nin: "74019284",
      nombre: "Hector Casanova",
      turno: "Turno Noche",
      equipo: "ECV-144 (Volquete 20m³)",
      tipoEquipo: "Acarreo",
      estado: "En Espera",
      telefono: "912 654 789",
      licencia: "A-IIIb (MTC)",
      guardia: "Guardia 3 - Huáscar",
      fechaIngreso: "22/04/2024",
    },
    {
      codigo: "OP-345030",
      nin: "71294851",
      nombre: "Marco Antonio Paredes Saldaña",
      turno: "Turno Día",
      equipo: "ECV-145 (Volquete 20m³)",
      tipoEquipo: "Acarreo",
      estado: "Operando",
      telefono: "931 754 112",
      licencia: "A-IIIb (MTC)",
      guardia: "Guardia 1 - Cóndor",
      fechaIngreso: "10/05/2024",
    },
    {
      codigo: "OP-345033",
      nin: "75819230",
      nombre: "Guillermo Farfán Rivas",
      turno: "Turno Noche",
      equipo: "EEX-041 (Excavadora Cat 336)",
      tipoEquipo: "Carguío",
      estado: "Operando",
      telefono: "972 319 804",
      licencia: "Especial MPT",
      guardia: "Guardia 2 - Puma",
      fechaIngreso: "18/06/2024",
    },
    {
      codigo: "OP-345037",
      nin: "70921844",
      nombre: "Ricardo Palma Benítez",
      turno: "Turno A - Día (7x7)",
      equipo: "EEX-042 (Excavadora Komatsu)",
      tipoEquipo: "Carguío Frente B",
      estado: "En Espera",
      telefono: "983 451 229",
      licencia: "Especial MPT",
      guardia: "Guardia 1 - Cóndor",
      fechaIngreso: "02/09/2024",
    },
    {
      codigo: "OP-345041",
      nin: "73110295",
      nombre: "David Alva Valdivia",
      turno: "Turno Noche",
      equipo: "ECV-146 (Volquete 20m³)",
      tipoEquipo: "Acarreo",
      estado: "Operando",
      telefono: "956 718 203",
      licencia: "A-IIIb (MTC)",
      guardia: "Guardia 3 - Huáscar",
      fechaIngreso: "14/10/2024",
    },
    {
      codigo: "OP-345045",
      nin: "74820194",
      nombre: "Víctor Raúl Mendoza Huamán",
      turno: "Turno Día",
      equipo: "ECV-147 (Volquete 17m³)",
      tipoEquipo: "Acarreo",
      estado: "Pendiente de Documentos",
      telefono: "941 290 853",
      licencia: "A-IIIa",
      guardia: "Guardia 2 - Puma",
      fechaIngreso: "03/12/2024",
    },
    {
      codigo: "OP-345048",
      nin: "76192840",
      nombre: "Julio César Morales Cruz",
      turno: "Turno A - Día (7x7)",
      equipo: "Camión Minero CAT 797F",
      tipoEquipo: "Acarreo Pesado",
      estado: "Operando",
      telefono: "928 340 192",
      licencia: "A-IIIb (MTC)",
      guardia: "Guardia 1 - Cóndor",
      fechaIngreso: "11/01/2025",
    },
  ]);

  // Manejo de nuevo operador creado desde el Wizard
  const handleGuardarNuevo = (nuevo) => {
    setOperadores((prev) => [nuevo, ...prev]);
    setModoRegistro(false);
    setCurrentPage(1);
    setMensajeExito(`¡Operador ${nuevo.nombre} registrado con éxito en el sistema!`);
    setTimeout(() => setMensajeExito(""), 5000);
  };

  // Exportar padrón a formato CSV
  const exportarPadron = () => {
    const encabezados = [
      "CODIGO",
      "DNI_NIN",
      "NOMBRE_COMPLETO",
      "TURNO",
      "EQUIPO_ASIGNADO",
      "TIPO_OPERACION",
      "ESTADO",
      "TELEFONO",
      "LICENCIA",
      "GUARDIA",
    ];
    const filas = operadores.map((op) => [
      op.codigo,
      op.nin,
      `"${op.nombre}"`,
      `"${op.turno}"`,
      `"${op.equipo}"`,
      op.tipoEquipo,
      op.estado,
      op.telefono,
      op.licencia,
      op.guardia || "N/A",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [encabezados.join(","), ...filas.map((e) => e.join(","))].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `Padron_Operadores_Dispatch_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  // Filtrado multi-criterio: DNI, nombre, turno, equipo asignado + selectores
  const operadoresFiltrados = useMemo(() => {
    return operadores.filter((op) => {
      const q = busqueda.toLowerCase().trim();
      const matchBusqueda =
        !q ||
        op.nombre.toLowerCase().includes(q) ||
        op.nin.includes(q) ||
        op.codigo.toLowerCase().includes(q) ||
        op.turno.toLowerCase().includes(q) ||
        op.equipo.toLowerCase().includes(q) ||
        op.tipoEquipo.toLowerCase().includes(q);

      const matchTurno =
        filtroTurno === "todos" ||
        (filtroTurno === "dia" && op.turno.toLowerCase().includes("día")) ||
        (filtroTurno === "noche" && op.turno.toLowerCase().includes("noche")) ||
        (filtroTurno === "7x7" && op.turno.includes("7x7"));

      const matchEquipo =
        filtroEquipo === "todos" ||
        (filtroEquipo === "volquetes" && op.equipo.toLowerCase().includes("volquete")) ||
        (filtroEquipo === "excavadoras" && op.equipo.toLowerCase().includes("excavadora")) ||
        (filtroEquipo === "camion" && op.equipo.toLowerCase().includes("camión"));

      return matchBusqueda && matchTurno && matchEquipo;
    });
  }, [operadores, busqueda, filtroTurno, filtroEquipo]);

  // Cálculos de Paginación
  const totalItems = operadoresFiltrados.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const pageSeguro = Math.min(currentPage, totalPages);

  const startIndex = (pageSeguro - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const operadoresPaginados = operadoresFiltrados.slice(startIndex, endIndex);

  // Manejar cambio de búsqueda o filtros (resetea página a 1)
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
    setCurrentPage(1);
  };

  const handleTurnoChange = (e) => {
    setFiltroTurno(e.target.value);
    setCurrentPage(1);
  };

  const handleEquipoChange = (e) => {
    setFiltroEquipo(e.target.value);
    setCurrentPage(1);
  };

  // Si estamos en modo de registro, mostramos el Wizard de 4 pasos
  if (modoRegistro) {
    return (
      <RegistrarOperadorView
        onCancel={() => setModoRegistro(false)}
        onSaveSuccess={handleGuardarNuevo}
      />
    );
  }

  return (
    <div className="operadores-view-container">
      {/* MENSAJE DE ÉXITO */}
      {mensajeExito && (
        <div className="toast-success-banner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{mensajeExito}</span>
        </div>
      )}

      {/* CABECERA CORPORATIVA CON 2 BOTONES DE ACCIÓN */}
      <div className="view-header">
        <div>
          <h2 className="view-title">Gestión de Personal y Operadores</h2>
          <p className="view-subtitle">
            Padrón oficial de conductores, operadores de carguío y certificaciones de mina
          </p>
        </div>

        {/* 2 BOTONES DE ACCIÓN */}
        <div className="operadores-header-actions">
          {/* BOTÓN 1: REGISTRAR OPERADOR */}
          <button
            type="button"
            className="btn-action-primary"
            onClick={() => setModoRegistro(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Registrar operador
          </button>

          {/* BOTÓN 2: EXPORTAR PADRÓN */}
          <button
            type="button"
            className="btn-action-secondary"
            onClick={exportarPadron}
            title="Descargar padrón en formato Excel/CSV"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Exportar Padrón
          </button>
        </div>
      </div>

      {/* BARRA DE BÚSQUEDA Y SEPARADORES DE FILTRO (CON ESPACIADO ELEGANTE) */}
      <div className="operadores-controls-bar">
        {/* BUSCADOR MULTI-CRITERIO */}
        <div className="search-multi-input">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por DNI, nombre, turno o equipo asignado..."
            value={busqueda}
            onChange={handleBusquedaChange}
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

        {/* SEPARADOR VERTICAL */}
        <div className="controls-separator"></div>

        {/* FILTRO 1: TURNOS */}
        <div className="filter-dropdown-wrap">
          <span className="filter-dropdown-label">Turno:</span>
          <select
            value={filtroTurno}
            onChange={handleTurnoChange}
            className="filter-select"
          >
            <option value="todos">Todos los Turnos</option>
            <option value="dia">Turno Día</option>
            <option value="noche">Turno Noche</option>
            <option value="7x7">Turno 7x7 (A / B)</option>
          </select>
        </div>

        {/* FILTRO 2: EQUIPO ASIGNADO / CATEGORÍA */}
        <div className="filter-dropdown-wrap">
          <span className="filter-dropdown-label">Equipo / Categoría:</span>
          <select
            value={filtroEquipo}
            onChange={handleEquipoChange}
            className="filter-select"
          >
            <option value="todos">Todos los Equipos</option>
            <option value="volquetes">Volquetes (Acarreo)</option>
            <option value="excavadoras">Excavadoras (Carguío)</option>
            <option value="camion">Camión Minero CAT 797F</option>
          </select>
        </div>
      </div>

      {/* TABLA CORPORATIVA DE OPERADORES */}
      <div className="table-wrapper corporate-theme">
        <table className="dispatch-table">
          <thead>
            <tr>
              <th>CÓDIGO</th>
              <th>DNI / NIN</th>
              <th>NOMBRE COMPLETO</th>
              <th>TURNO</th>
              <th>EQUIPO ASIGNADO</th>
              <th>TIPO / ROL</th>
              <th>LICENCIA</th>
              <th>ESTADO</th>
              <th style={{ textAlign: "right", paddingRight: "20px" }}>ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {operadoresPaginados.map((op) => (
              <tr key={op.nin}>
                <td>
                  <span className="badge-codigo-corporate">{op.codigo}</span>
                </td>
                <td className="cell-nin-corporate">{op.nin}</td>
                <td>
                  <div className="operador-name-cell">
                    <span className="name-primary">{op.nombre}</span>
                    <span className="phone-muted">{op.telefono}</span>
                  </div>
                </td>
                <td>
                  <span
                    className={`badge-turno-corporate ${
                      op.turno.toLowerCase().includes("día") ? "dia" : "noche"
                    }`}
                  >
                    {op.turno}
                  </span>
                </td>
                <td>
                  <span className="cell-equipo-corporate">{op.equipo}</span>
                </td>
                <td className="cell-rol-corporate">{op.tipoEquipo}</td>
                <td>
                  <span className="badge-licencia-corporate">{op.licencia}</span>
                </td>
                <td>
                  <span
                    className={`status-pill-corporate ${
                      op.estado === "Operando"
                        ? "ok"
                        : op.estado === "Pendiente de Documentos"
                        ? "pending"
                        : "warning"
                    }`}
                  >
                    <span className="pill-dot"></span>
                    {op.estado}
                  </span>
                </td>
                <td style={{ textAlign: "right", paddingRight: "16px" }}>
                  <button
                    type="button"
                    className="btn-view-profile-corporate"
                    onClick={() => setOperadorSeleccionado(op)}
                    title="Ver ficha técnica del trabajador"
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

            {operadoresFiltrados.length === 0 && (
              <tr>
                <td colSpan={9} className="table-empty-row">
                  <div className="empty-state-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <p>No se encontraron operadores registrados con los filtros seleccionados.</p>
                    <small>Prueba ajustando el término de búsqueda o seleccionando "Todos los Equipos".</small>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* BARRA DE PAGINACIÓN INTERACTIVA */}
        {operadoresFiltrados.length > 0 && (
          <div className="table-pagination-bar">
            {/* IZQUIERDA: RESUMEN DE FILAS */}
            <div className="pagination-info">
              Mostrando <strong>{startIndex + 1}</strong> a <strong>{endIndex}</strong> de <strong>{totalItems}</strong> operadores
            </div>

            {/* CENTRO: SELECTOR DE FILAS POR PÁGINA */}
            <div className="pagination-page-size">
              <span>Filas por pág:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="select-page-size"
              >
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
              </select>
            </div>

            {/* DERECHA: BOTONES DE NAVEGACIÓN */}
            <div className="pagination-nav">
              <button
                type="button"
                className="page-nav-btn"
                disabled={pageSeguro <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                aria-label="Página anterior"
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
                aria-label="Página siguiente"
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

      {/* MODAL DETALLE DE OPERADOR */}
      {operadorSeleccionado && (
        <div className="modal-backdrop" onClick={() => setOperadorSeleccionado(null)}>
          <div className="modal-card-detail" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3>Ficha Técnica del Operador</h3>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setOperadorSeleccionado(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-detail-content">
              <div className="modal-avatar-area">
                <div className="large-avatar-circle">
                  {operadorSeleccionado.nombre.charAt(0)}
                </div>
                <h4>{operadorSeleccionado.nombre}</h4>
                <span>{operadorSeleccionado.tipoEquipo} · {operadorSeleccionado.codigo}</span>
              </div>

              <div className="modal-data-grid">
                <div>
                  <span className="lbl">DNI / NIN:</span>
                  <strong>{operadorSeleccionado.nin}</strong>
                </div>
                <div>
                  <span className="lbl">Turno:</span>
                  <strong>{operadorSeleccionado.turno}</strong>
                </div>
                <div>
                  <span className="lbl">Equipo Asignado:</span>
                  <strong>{operadorSeleccionado.equipo}</strong>
                </div>
                <div>
                  <span className="lbl">Licencia de Conducir:</span>
                  <strong>{operadorSeleccionado.licencia}</strong>
                </div>
                <div>
                  <span className="lbl">Teléfono de Contacto:</span>
                  <strong>{operadorSeleccionado.telefono}</strong>
                </div>
                <div>
                  <span className="lbl">Guardia Asignada:</span>
                  <strong>{operadorSeleccionado.guardia}</strong>
                </div>
                <div>
                  <span className="lbl">Fecha Ingreso:</span>
                  <strong>{operadorSeleccionado.fechaIngreso || "15/01/2026"}</strong>
                </div>
                <div>
                  <span className="lbl">Estado en el Sistema:</span>
                  <strong className="text-blue">{operadorSeleccionado.estado}</strong>
                </div>
              </div>
            </div>

            <div className="modal-footer-row">
              <button
                type="button"
                className="btn-wizard-next"
                onClick={() => setOperadorSeleccionado(null)}
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
