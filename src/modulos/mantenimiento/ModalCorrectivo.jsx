import { useState } from "react";

export default function ModalCorrectivo({
  isOpen,
  onClose,
  onGuardar,
  equiposDisponibles = [],
}) {
  const [formData, setFormData] = useState({
    equipoCodigo: equiposDisponibles[0]?.codigo || "ECV-141",
    fechaIncidente: new Date().toISOString().slice(0, 10),
    horaIncidente: new Date().toTimeString().slice(0, 5),
    ubicacionFalla: "Rampa Principal - Km 3.2",
    componenteAfectado: "Neumáticos y Llantas",
    severidad: "Crítica (Equipo Inoperativo)",
    descripcionFalla: "Pérdida súbita de presión en neumático posterior izquierdo por corte de roca en ruta.",
    cuadrillaAuxilio: "Unidad de Auxilio Mecánico 02 (Mec. Raúl Soto)",
    tiempoEstimado: "2 horas",
    accionInmediata: "Equipo detenido a un costado de la rampa con tacos y conos de señalización colocados.",
  });

  const [errores, setErrores] = useState({});

  if (!isOpen) return null;

  const equipoSeleccionado =
    equiposDisponibles.find((e) => e.codigo === formData.equipoCodigo) ||
    equiposDisponibles[0] ||
    null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!formData.descripcionFalla.trim()) {
      nuevosErrores.descripcionFalla = "Describe la falla o incidente ocurrido.";
    }
    if (!formData.ubicacionFalla.trim()) {
      nuevosErrores.ubicacionFalla = "Indica la ubicación en mina donde ocurrió.";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const nuevaOrden = {
      id: `OT-CORR-${Math.floor(100 + Math.random() * 900)}`,
      tipo: "correctivo",
      equipoCodigo: formData.equipoCodigo,
      equipoModelo: equipoSeleccionado?.marcaModelo || "Equipo Minero",
      equipoCategoria: equipoSeleccionado?.categoria || "Maquinaria",
      rutina: `Falla en ${formData.componenteAfectado}`,
      fecha: formData.fechaIncidente,
      horario: `${formData.horaIncidente} (Inmediato)`,
      ubicacion: formData.ubicacionFalla,
      componente: formData.componenteAfectado,
      tecnico: formData.cuadrillaAuxilio,
      horometro: `${equipoSeleccionado?.horometro || 550}h`,
      descripcion: formData.descripcionFalla,
      accion: formData.accionInmediata,
      tiempoEstimado: formData.tiempoEstimado,
      severidad: formData.severidad,
      estado: "En Reparación",
      fechaRegistro: new Date().toLocaleDateString("es-PE"),
    };

    onGuardar(nuevaOrden);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card-detail modal-correctivo-enhanced"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CABECERA CON ESTILO DE ALERTA CORRECTIVA */}
        <div className="modal-header-row">
          <div className="modal-title-with-icon">
            <div className="modal-header-icon-box corrective-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <h3>Reportar Mantenimiento Correctivo</h3>
              <p className="modal-subtext">
                Registro inmediato de incidentes, fallas mecánicas y auxilio de emergencia en mina
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

        {/* ALERTA DE INCIDENTE EN VIVO */}
        <div className="alert-notice-box corrective-notice">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span>
            <strong>Impacto en Despacho:</strong> Al registrar este correctivo se notificará
            la alerta al Dashboard y el equipo quedará fuera de ciclo hasta su reparación.
          </span>
        </div>

        {/* FORMULARIO ORGANIZADO */}
        <form onSubmit={handleSubmit} className="modal-form-body">
          {/* SECCIÓN 1: EQUIPO Y COMPONENTE AFECTADO */}
          <div className="modal-form-section">
            <div className="modal-section-header">
              <span className="section-step-num alert-step">1</span>
              <h4>Equipo Afectado y Falla Técnica</h4>
            </div>

            <div className="modal-form-grid">
              <div className="form-group-item">
                <label>
                  Equipo Afectado <span className="req">*</span>
                </label>
                <select
                  name="equipoCodigo"
                  value={formData.equipoCodigo}
                  onChange={handleChange}
                  className="select-field"
                >
                  {equiposDisponibles.map((eq) => (
                    <option key={eq.codigo} value={eq.codigo}>
                      {eq.codigo} · {eq.marcaModelo} ({eq.categoria})
                    </option>
                  ))}
                </select>
                {equipoSeleccionado && (
                  <div className="field-hint-chip">
                    <span>Horómetro: <strong>{equipoSeleccionado.horometro}h</strong></span>
                    <span>Categoría: <strong>{equipoSeleccionado.categoria}</strong></span>
                  </div>
                )}
              </div>

              <div className="form-group-item">
                <label>
                  Sistema / Componente con Falla <span className="req">*</span>
                </label>
                <select
                  name="componenteAfectado"
                  value={formData.componenteAfectado}
                  onChange={handleChange}
                  className="select-field"
                >
                  <option value="Neumáticos y Llantas">Neumáticos / Llantas (Baja de presión o rotura)</option>
                  <option value="Sistema Hidráulico">Sistema Hidráulico (Mangueras, cilindro, bomba)</option>
                  <option value="Motor Diesel">Motor Diesel (Temperatura, inyectores, aceite)</option>
                  <option value="Sistema de Frenos">Sistema de Frenos (Retardador, pastillas, aire)</option>
                  <option value="Transmisión y Diferencial">Transmisión / Convertidor / Diferencial</option>
                  <option value="Sistema Eléctrico y Baterías">Sistema Eléctrico / Alternador / Baterías</option>
                  <option value="Estructura y Tolva / Balde">Estructura / Tolva / Balde / Orugas</option>
                </select>
                <span className="field-hint-text">Subsistema crítico afectado</span>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: OCURRENCIA Y UBICACIÓN */}
          <div className="modal-form-section">
            <div className="modal-section-header">
              <span className="section-step-num alert-step">2</span>
              <h4>Lugar, Momento y Nivel de Urgencia</h4>
            </div>

            <div className="modal-form-grid">
              <div className="form-group-item">
                <label>
                  Fecha del Incidente <span className="req">*</span>
                </label>
                <input
                  type="date"
                  name="fechaIncidente"
                  value={formData.fechaIncidente}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item">
                <label>
                  Hora del Incidente <span className="req">*</span>
                </label>
                <input
                  type="time"
                  name="horaIncidente"
                  value={formData.horaIncidente}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-item">
                <label>
                  Nivel de Severidad <span className="req">*</span>
                </label>
                <select
                  name="severidad"
                  value={formData.severidad}
                  onChange={handleChange}
                  className="select-field"
                >
                  <option value="Crítica (Equipo Inoperativo)">
                    🔴 Crítica (Equipo Inoperativo / Parado)
                  </option>
                  <option value="Alta (Operación Restringida)">
                    🟠 Alta (Operación Restringida)
                  </option>
                  <option value="Media (Requiere Auxilio Pronto)">
                    🟡 Media (Requiere Auxilio Pronto)
                  </option>
                  <option value="Leve (Monitoreo)">
                    🟢 Leve (Monitoreo en Ruta)
                  </option>
                </select>
              </div>

              <div className="form-group-item">
                <label>Tiempo Estimado de Reparación</label>
                <input
                  type="text"
                  name="tiempoEstimado"
                  value={formData.tiempoEstimado}
                  onChange={handleChange}
                  placeholder="Ej. 1.5 horas, 2 horas, 1 turno"
                />
              </div>

              <div className="form-group-item full-width">
                <label>
                  Ubicación Exacta en Mina <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="ubicacionFalla"
                  placeholder="Ej. Rampa Principal Km 3.2, Frente Carguío B, Botadero 1..."
                  value={formData.ubicacionFalla}
                  onChange={handleChange}
                  className={errores.ubicacionFalla ? "input-error" : ""}
                />
                {errores.ubicacionFalla && (
                  <span className="err-msg">{errores.ubicacionFalla}</span>
                )}
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: AUXILIO MECÁNICO */}
          <div className="modal-form-section">
            <div className="modal-section-header">
              <span className="section-step-num alert-step">3</span>
              <h4>Despacho de Auxilio Mecánico</h4>
            </div>

            <div className="modal-form-grid">
              <div className="form-group-item full-width">
                <label>Cuadrilla / Mecánico de Auxilio en Mina</label>
                <input
                  type="text"
                  name="cuadrillaAuxilio"
                  value={formData.cuadrillaAuxilio}
                  onChange={handleChange}
                  placeholder="Ej. Unidad de Auxilio Mecánico 02 (Mec. Raúl Soto)"
                  className="input-prominent"
                />
                <span className="field-hint-text">Personal técnico desplazado al punto del incidente</span>
              </div>
            </div>
          </div>

          {/* SECCIÓN 4: DESCRIPCIÓN Y MEDIDAS DE SEGURIDAD */}
          <div className="modal-form-section">
            <div className="modal-section-header">
              <span className="section-step-num alert-step">4</span>
              <h4>Descripción Técnica y Protocolo de Seguridad</h4>
            </div>

            <div className="modal-form-grid">
              <div className="form-group-item full-width">
                <label>
                  Descripción del Incidente / Falla <span className="req">*</span>
                </label>
                <textarea
                  name="descripcionFalla"
                  rows={3}
                  value={formData.descripcionFalla}
                  onChange={handleChange}
                  className={`textarea-field ${errores.descripcionFalla ? "input-error" : ""}`}
                  placeholder="Detalla lo que ocurrió (ej. se bajó la llanta posterior, corte de roca en ruta, fuga de fluido hidráulico...)"
                />
                {errores.descripcionFalla && (
                  <span className="err-msg">{errores.descripcionFalla}</span>
                )}
              </div>

              <div className="form-group-item full-width">
                <label>Acción Inmediata de Seguridad Tomada</label>
                <textarea
                  name="accionInmediata"
                  rows={2}
                  value={formData.accionInmediata}
                  onChange={handleChange}
                  className="textarea-field"
                  placeholder="Ej. Máquina parqueada a un costado con tacos y conos de señalización colocados, personal seguro..."
                />
              </div>
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="modal-form-actions">
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-modal-submit btn-submit-corrective">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Registrar Incidente Correctivo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
