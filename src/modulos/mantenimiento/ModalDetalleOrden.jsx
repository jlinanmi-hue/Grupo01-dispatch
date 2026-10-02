import { useState } from "react";

function DetalleOrdenContent({ orden, onClose, onActualizarEstado }) {
  const [nuevoEstado, setNuevoEstado] = useState(orden.estado);
  const [notaCierre, setNotaCierre] = useState(
    orden.notaCierre || ""
  );

  const handleGuardarCambios = (e) => {
    e.preventDefault();
    onActualizarEstado({
      ...orden,
      estado: nuevoEstado,
      notaCierre: notaCierre.trim(),
    });
    onClose();
  };

  const isPreventivo = orden.tipo === "preventivo";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card-detail modal-detalle-orden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CABECERA */}
        <div className="modal-header-row">
          <div className="modal-title-with-icon">
            <div
              className={`modal-header-icon-box ${
                isPreventivo ? "preventive-box" : "corrective-box"
              }`}
            >
              {isPreventivo ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              )}
            </div>
            <div>
              <div className="header-tags-inline">
                <span className={`ot-type-badge ${orden.tipo}`}>
                  {isPreventivo ? "📅 Mantenimiento Preventivo" : "⚡ Incidente Correctivo"}
                </span>
                <span
                  className={`status-pill-corporate ${
                    orden.estado === "Completado"
                      ? "ok"
                      : orden.estado === "Programado"
                      ? "pending"
                      : "warning"
                  }`}
                >
                  <span className="pill-dot"></span>
                  {orden.estado}
                </span>
              </div>
              <h3 className="modal-equipo-title">{orden.id}</h3>
              <p className="modal-equipo-subtitle">
                Equipo: <strong>{orden.equipoCodigo}</strong> · {orden.equipoModelo}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn-modal-close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* CONTENIDO TÉCNICO */}
        <div className="modal-specs-view">
          <div className="specs-highlight-card">
            <div className="spec-item">
              <span className="spec-lbl">Rutina o Falla Reportada:</span>
              <strong className="spec-val-highlight">{orden.rutina}</strong>
            </div>
            <div className="spec-item">
              <span className="spec-lbl">Horómetro Registrado:</span>
              <strong className="spec-val-mono">{orden.horometro}</strong>
            </div>
          </div>

          <div className="specs-details-grid">
            <div className="detail-box">
              <span className="lbl">Fecha y Horario:</span>
              <strong>{orden.fecha} ({orden.horario})</strong>
            </div>

            <div className="detail-box">
              <span className="lbl">Ubicación / Taller:</span>
              <strong>{orden.ubicacion}</strong>
            </div>

            <div className="detail-box">
              <span className="lbl">Técnico / Cuadrilla:</span>
              <strong>{orden.tecnico}</strong>
            </div>

            <div className="detail-box">
              <span className="lbl">Severidad / Prioridad:</span>
              <strong className={!isPreventivo ? "text-orange" : "text-blue"}>
                {orden.severidad}
              </strong>
            </div>

            <div className="detail-box full">
              <span className="lbl">Detalle de Tareas o Incidente:</span>
              <p className="ot-detail-description">{orden.descripcion}</p>
            </div>

            {orden.accion && (
              <div className="detail-box full">
                <span className="lbl">Acción Inmediata Aplicada:</span>
                <p className="ot-detail-description text-muted">{orden.accion}</p>
              </div>
            )}
          </div>

          {/* FORMULARIO DE ACTUALIZACIÓN DE ESTADO */}
          <form onSubmit={handleGuardarCambios} className="ot-status-update-box">
            <div className="status-change-row">
              <label>Cambiar Estado de la Orden:</label>
              <select
                value={nuevoEstado}
                onChange={(e) => setNuevoEstado(e.target.value)}
                className="select-field"
              >
                <option value="Programado">Programado</option>
                <option value="En Taller">En Taller / En Reparación</option>
                <option value="Completado">Completado / Alta de Equipo</option>
              </select>
            </div>

            <div className="form-group-item full-width" style={{ marginTop: "10px" }}>
              <label>Notas de Cierre o Avance Técnico</label>
              <input
                type="text"
                placeholder="Ej. Cambio de neumático finalizado, torque verificado a 450 lb-ft."
                value={notaCierre}
                onChange={(e) => setNotaCierre(e.target.value)}
              />
            </div>

            <div className="modal-footer-row" style={{ marginTop: "16px" }}>
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={onClose}
              >
                Cerrar
              </button>
              <button type="submit" className="btn-modal-submit">
                Guardar Actualización
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ModalDetalleOrden({
  orden,
  isOpen,
  onClose,
  onActualizarEstado,
}) {
  if (!isOpen || !orden) return null;

  return (
    <DetalleOrdenContent
      key={orden.id}
      orden={orden}
      onClose={onClose}
      onActualizarEstado={onActualizarEstado}
    />
  );
}
