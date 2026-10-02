import { useState } from "react";

function ModalDetalleContent({
  equipo,
  isEditMode,
  onClose,
  onGuardarEdicion,
}) {
  const [editing, setEditing] = useState(isEditMode);
  const [formData, setFormData] = useState(() => ({
    codigo: equipo.codigo || "",
    categoria: equipo.categoria || "Volquete",
    marcaModelo: equipo.marcaModelo || "",
    vin: equipo.vin || "",
    capacidad: equipo.capacidad || equipo.tipo || "",
    anio: equipo.anio || "2023",
    horometro: equipo.horometro ?? "",
    estado: equipo.estado || "disponible",
    motivo: equipo.motivo || "",
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...equipo,
      marcaModelo: formData.marcaModelo.trim(),
      vin: formData.vin.trim().toUpperCase(),
      capacidad: formData.capacidad.trim(),
      anio: Number(formData.anio) || equipo.anio,
      horometro: Number(formData.horometro) || equipo.horometro,
      estado: formData.estado,
      motivo: formData.estado === "mantenimiento" ? formData.motivo : "",
    };
    onGuardarEdicion(updated);
    setEditing(false);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card-detail modal-detalle-equipo"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CABECERA */}
        <div className="modal-header-row">
          <div className="modal-title-with-icon">
            <div className="modal-header-icon-box machine">
              {equipo.categoria === "Excavadora" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 17h18" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                  <path d="M5 14l2-6h9l2 6" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 7h12v11H2z" />
                  <path d="M14 11h4l4 4v3h-8z" />
                  <circle cx="6" cy="19" r="2" />
                  <circle cx="18" cy="19" r="2" />
                </svg>
              )}
            </div>
            <div>
              <div className="header-tags-inline">
                <span className="categoria-pill-small">{equipo.categoria}</span>
                <span
                  className={`status-pill-corporate ${
                    equipo.estado === "disponible"
                      ? "ok"
                      : equipo.estado === "bloqueado"
                      ? "pending"
                      : "warning"
                  }`}
                >
                  <span className="pill-dot"></span>
                  {equipo.estado === "disponible" && "Disponible"}
                  {equipo.estado === "bloqueado" && "En Operación"}
                  {equipo.estado === "mantenimiento" && "En Mantenimiento"}
                </span>
              </div>
              <h3 className="modal-equipo-title">{equipo.codigo}</h3>
              <p className="modal-equipo-subtitle">
                {equipo.marcaModelo || "Equipo Minero Pesado"}
              </p>
            </div>
          </div>

          <div className="modal-header-controls">
            {!editing && (
              <button
                type="button"
                className="btn-toggle-edit"
                onClick={() => setEditing(true)}
                title="Editar datos de este equipo"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Editar
              </button>
            )}
            <button
              type="button"
              className="btn-modal-close"
              onClick={onClose}
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* CONTENIDO: MODO VISTA O MODO EDICIÓN */}
        {!editing ? (
          <div className="modal-specs-view">
            <div className="specs-highlight-card">
              <div className="spec-item">
                <span className="spec-lbl">Marca y Modelo:</span>
                <strong className="spec-val-highlight">
                  {equipo.marcaModelo || "No especificado"}
                </strong>
              </div>
              <div className="spec-item">
                <span className="spec-lbl">N° Serie / Chasis (VIN):</span>
                <strong className="spec-val-mono">
                  {equipo.vin || "VIN-NO-REGISTRADO"}
                </strong>
              </div>
            </div>

            <div className="specs-details-grid">
              <div className="detail-box">
                <span className="lbl">Capacidad de Balde / Tonelaje:</span>
                <strong>{equipo.capacidad || equipo.tipo || "N/A"}</strong>
              </div>

              <div className="detail-box">
                <span className="lbl">Horómetro Registrado:</span>
                <strong className="text-blue">{equipo.horometro} horas</strong>
              </div>

              <div className="detail-box">
                <span className="lbl">Año de Fabricación:</span>
                <strong>{equipo.anio || "2023"}</strong>
              </div>

              <div className="detail-box">
                <span className="lbl">Estado Actual:</span>
                <strong className={equipo.estado === "disponible" ? "text-green" : "text-blue"}>
                  {equipo.estado === "disponible" && "Disponible"}
                  {equipo.estado === "bloqueado" && "En Operación"}
                  {equipo.estado === "mantenimiento" && "En Mantenimiento"}
                </strong>
              </div>

              {equipo.motivo && (
                <div className="detail-box full">
                  <span className="lbl">Diagnóstico de Mantenimiento:</span>
                  <div className="state-description-row">
                    <span className="motivo-tag">⚠️ {equipo.motivo}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer-row">
              <button
                type="button"
                className="btn-wizard-next"
                onClick={onClose}
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        ) : (
          /* FORMULARIO DE EDICIÓN */
          <form onSubmit={handleSave} className="modal-form-body">
            <div className="modal-form-grid">
              <div className="form-group-item full-width">
                <label>Marca y Modelo Real</label>
                <input
                  type="text"
                  name="marcaModelo"
                  value={formData.marcaModelo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group-item">
                <label>N° Serie / VIN</label>
                <input
                  type="text"
                  name="vin"
                  value={formData.vin}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group-item">
                <label>Capacidad / Tonelaje</label>
                <input
                  type="text"
                  name="capacidad"
                  value={formData.capacidad}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group-item">
                <label>Año Fabricación</label>
                <input
                  type="number"
                  name="anio"
                  value={formData.anio}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item">
                <label>Horómetro Actual (Horas)</label>
                <input
                  type="number"
                  name="horometro"
                  value={formData.horometro}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={`form-group-item ${formData.estado === "mantenimiento" ? "" : "full-width"}`}>
                <label>Estado del Equipo</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="select-field"
                >
                  <option value="disponible">Disponible</option>
                  <option value="bloqueado">En Operación</option>
                  <option value="mantenimiento">En Mantenimiento</option>
                </select>
              </div>

              {formData.estado === "mantenimiento" && (
                <div className="form-group-item">
                  <label>Motivo de Mantenimiento</label>
                  <input
                    type="text"
                    name="motivo"
                    value={formData.motivo}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            <div className="modal-form-actions">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setEditing(false)}
              >
                Cancelar Edición
              </button>
              <button type="submit" className="btn-modal-submit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Guardar Cambios
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ModalDetalleEquipo({
  equipo,
  isEditMode = false,
  isOpen,
  onClose,
  onGuardarEdicion,
}) {
  if (!isOpen || !equipo) return null;

  return (
    <ModalDetalleContent
      key={`${equipo.codigo}-${isEditMode}`}
      equipo={equipo}
      isEditMode={isEditMode}
      onClose={onClose}
      onGuardarEdicion={onGuardarEdicion}
    />
  );
}
