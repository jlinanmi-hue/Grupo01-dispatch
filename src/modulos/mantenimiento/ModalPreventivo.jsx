import { useState } from "react";

export default function ModalPreventivo({
  isOpen,
  onClose,
  onGuardar,
  equiposDisponibles = [],
}) {
  const [formData, setFormData] = useState({
    equipoCodigo: equiposDisponibles[0]?.codigo || "ECV-140",
    tipoRutina: "PM-2 (500 Horas) - Cambio Aceite y Filtros",
    fechaProgramada: "",
    horaInicio: "08:00",
    horaFin: "14:00",
    tallerBahia: "Taller Central - Bahía 1",
    tecnicoResponsable: "Ing. Marcos Valdivia (Mecánico Sr.)",
    horometroProyectado: "",
    tareas: "Cambio de aceite motor 15W40, reemplazo de filtros de combustible y aceite, engrase integral de puntos de articulación y revisión de mangueras hidráulicas.",
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

    if (!formData.fechaProgramada) {
      nuevosErrores.fechaProgramada = "Selecciona la fecha programada.";
    }
    if (!formData.horaInicio || !formData.horaFin) {
      nuevosErrores.horaInicio = "Indica el horario de inicio y fin.";
    }
    if (!formData.tecnicoResponsable.trim()) {
      nuevosErrores.tecnicoResponsable = "Asigna un técnico responsable.";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const nuevaOrden = {
      id: `OT-PREV-${Math.floor(100 + Math.random() * 900)}`,
      tipo: "preventivo",
      equipoCodigo: formData.equipoCodigo,
      equipoModelo: equipoSeleccionado?.marcaModelo || "Equipo Minero",
      equipoCategoria: equipoSeleccionado?.categoria || "Maquinaria",
      rutina: formData.tipoRutina,
      fecha: formData.fechaProgramada,
      horario: `${formData.horaInicio} - ${formData.horaFin}`,
      ubicacion: formData.tallerBahia,
      tecnico: formData.tecnicoResponsable.trim(),
      horometro: formData.horometroProyectado || `${equipoSeleccionado?.horometro || 500}h`,
      descripcion: formData.tareas,
      severidad: "Programada",
      estado: "Programado",
      fechaRegistro: new Date().toLocaleDateString("es-PE"),
    };

    onGuardar(nuevaOrden);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card-detail modal-registrar-equipo"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CABECERA */}
        <div className="modal-header-row">
          <div className="modal-title-with-icon">
            <div className="modal-header-icon-box preventive-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <h3>Programar Mantenimiento Preventivo</h3>
              <p className="modal-subtext">
                Planificación anticipada por horómetro y rutina periódica de taller
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

        {/* ALERTA DE VALIDACIÓN PREVENTIVA */}
        <div className="alert-notice-box preventive-notice">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>
            <strong>Control de Flota:</strong> Para la fecha y franja horaria programada, el equipo
            quedará inhabilitado para operaciones de despacho y reservado exclusivamente en taller.
          </span>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="modal-form-body">
          <div className="modal-form-grid">
            {/* SELECCIÓN DE EQUIPO */}
            <div className="form-group-item">
              <label>
                Seleccionar Máquina / Equipo <span className="req">*</span>
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
                <small className="field-hint-text">
                  Horómetro actual: <strong>{equipoSeleccionado.horometro}h</strong> · Estado: {equipoSeleccionado.estado}
                </small>
              )}
            </div>

            {/* TIPO DE RUTINA */}
            <div className="form-group-item">
              <label>
                Rutina / Servicio Preventivo <span className="req">*</span>
              </label>
              <select
                name="tipoRutina"
                value={formData.tipoRutina}
                onChange={handleChange}
                className="select-field"
              >
                <option value="PM-1 (250 Horas) - Inspección y Lubricación">
                  PM-1 (250 Horas) - Inspección y Lubricación
                </option>
                <option value="PM-2 (500 Horas) - Cambio Aceite y Filtros">
                  PM-2 (500 Horas) - Cambio Aceite y Filtros
                </option>
                <option value="PM-3 (1000 Horas) - Mantenimiento Mayor">
                  PM-3 (1000 Horas) - Mantenimiento Mayor
                </option>
                <option value="PM-4 (2000 Horas) - Sistema Hidráulico y Transmisión">
                  PM-4 (2000 Horas) - Sistema Hidráulico y Transmisión
                </option>
                <option value="Inspección de Orugas, Pines y Mandos Finales">
                  Inspección de Orugas, Pines y Mandos Finales
                </option>
                <option value="Overhaul Parcial Programado">
                  Overhaul Parcial Programado
                </option>
              </select>
            </div>

            {/* FECHA PROGRAMADA */}
            <div className="form-group-item">
              <label>
                Fecha Programada <span className="req">*</span>
              </label>
              <input
                type="date"
                name="fechaProgramada"
                value={formData.fechaProgramada}
                onChange={handleChange}
                className={errores.fechaProgramada ? "input-error" : ""}
              />
              {errores.fechaProgramada && (
                <span className="err-msg">{errores.fechaProgramada}</span>
              )}
            </div>

            {/* HORARIO (INICIO - FIN) */}
            <div className="form-group-item">
              <label>
                Franja Horaria de Parada <span className="req">*</span>
              </label>
              <div className="time-range-row">
                <input
                  type="time"
                  name="horaInicio"
                  value={formData.horaInicio}
                  onChange={handleChange}
                  title="Hora inicio"
                />
                <span className="time-sep">a</span>
                <input
                  type="time"
                  name="horaFin"
                  value={formData.horaFin}
                  onChange={handleChange}
                  title="Hora fin"
                />
              </div>
              {errores.horaInicio && (
                <span className="err-msg">{errores.horaInicio}</span>
              )}
            </div>

            {/* TALLER / BAHÍA ASIGNADA */}
            <div className="form-group-item">
              <label>Taller / Bahía de Trabajo</label>
              <select
                name="tallerBahia"
                value={formData.tallerBahia}
                onChange={handleChange}
                className="select-field"
              >
                <option value="Taller Central - Bahía 1">Taller Central - Bahía 1 (Acarreo)</option>
                <option value="Taller Central - Bahía 2">Taller Central - Bahía 2 (Carguío)</option>
                <option value="Taller Mina Norte - Bahía Rápida">Taller Mina Norte - Bahía Rápida</option>
                <option value="Patio de Mantenimiento Tajo">Patio de Mantenimiento Tajo</option>
              </select>
            </div>

            {/* TÉCNICO RESPONSABLE */}
            <div className="form-group-item">
              <label>
                Técnico Mecánico Responsable <span className="req">*</span>
              </label>
              <input
                type="text"
                name="tecnicoResponsable"
                placeholder="Ej. Ing. Marcos Valdivia"
                value={formData.tecnicoResponsable}
                onChange={handleChange}
                className={errores.tecnicoResponsable ? "input-error" : ""}
              />
              {errores.tecnicoResponsable && (
                <span className="err-msg">{errores.tecnicoResponsable}</span>
              )}
            </div>

            {/* HORÓMETRO PROYECTADO */}
            <div className="form-group-item full-width">
              <label>Horómetro Proyectado de Servicio (Opcional)</label>
              <input
                type="number"
                name="horometroProyectado"
                placeholder="Ej. 600 (estimado al momento de entrar al taller)"
                value={formData.horometroProyectado}
                onChange={handleChange}
              />
            </div>

            {/* TAREAS / DETALLE PROGRAMADO */}
            <div className="form-group-item full-width">
              <label>Lista de Tareas e Insumos Programados</label>
              <textarea
                name="tareas"
                rows={3}
                value={formData.tareas}
                onChange={handleChange}
                className="textarea-field"
                placeholder="Especifica los repuestos, filtros y procedimientos..."
              />
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
            <button type="submit" className="btn-modal-submit btn-submit-preventive">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Guardar y Programar Preventivo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
