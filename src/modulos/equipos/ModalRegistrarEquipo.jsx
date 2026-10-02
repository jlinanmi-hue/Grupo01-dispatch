import { useState } from "react";

const CURRENT_YEAR = new Date().getFullYear();

export default function ModalRegistrarEquipo({
  isOpen,
  onClose,
  onGuardar,
  categoriasExistentes,
}) {
  const [formData, setFormData] = useState({
    codigo: "",
    categoria: "Volquete",
    otraCategoria: "",
    marcaModelo: "",
    vin: "",
    capacidad: "",
    anio: CURRENT_YEAR.toString(),
    horometro: "",
    estado: "disponible",
    motivo: "",
  });

  const [errores, setErrores] = useState({});

  if (!isOpen) return null;

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

    if (!formData.codigo.trim()) {
      nuevosErrores.codigo = "El código es obligatorio (ej. ECV-152).";
    }
    if (!formData.marcaModelo.trim()) {
      nuevosErrores.marcaModelo = "Ingresa la marca y modelo real (ej. Caterpillar 336D2).";
    }
    if (!formData.vin.trim()) {
      nuevosErrores.vin = "El número de serie / chasis (VIN) es requerido.";
    }
    if (!formData.capacidad.trim()) {
      nuevosErrores.capacidad = "Ingresa la capacidad de balde o tonelaje.";
    }
    if (!formData.horometro || Number(formData.horometro) < 0) {
      nuevosErrores.horometro = "Ingresa un horómetro válido en horas.";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const categoriaFinal =
      formData.categoria === "OTRA" && formData.otraCategoria.trim()
        ? formData.otraCategoria.trim()
        : formData.categoria;

    const nuevoEquipo = {
      codigo: formData.codigo.trim().toUpperCase(),
      categoria: categoriaFinal,
      marcaModelo: formData.marcaModelo.trim(),
      vin: formData.vin.trim().toUpperCase(),
      capacidad: formData.capacidad.trim(),
      anio: Number(formData.anio) || CURRENT_YEAR,
      horometro: Number(formData.horometro) || 0,
      estado: formData.estado,
      motivo: formData.estado === "mantenimiento" ? formData.motivo || "Mantenimiento Preventivo" : "",
    };

    onGuardar(nuevoEquipo);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card-detail modal-registrar-equipo"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CABECERA DEL MODAL */}
        <div className="modal-header-row">
          <div className="modal-title-with-icon">
            <div className="modal-header-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <div>
              <h3>Registrar Nuevo Equipo Minero</h3>
              <p className="modal-subtext">
                Gestión técnica del parque de maquinaria para el catálogo de flota
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn-modal-close"
            onClick={onClose}
            aria-label="Cerrar ventana"
          >
            ✕
          </button>
        </div>

        {/* FORMULARIO DE REGISTRO */}
        <form onSubmit={handleSubmit} className="modal-form-body">
          <div className="modal-form-grid">
            {/* CÓDIGO INTERNO */}
            <div className="form-group-item">
              <label>
                Código del Equipo <span className="req">*</span>
              </label>
              <input
                type="text"
                name="codigo"
                placeholder="Ej. ECV-152 o EEX-048"
                value={formData.codigo}
                onChange={handleChange}
                className={errores.codigo ? "input-error" : ""}
              />
              {errores.codigo && <span className="err-msg">{errores.codigo}</span>}
            </div>

            {/* CATEGORÍA / TIPO (DINÁMICA) */}
            <div className="form-group-item">
              <label>
                Categoría / Tipo de Equipo <span className="req">*</span>
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="select-field"
              >
                {categoriasExistentes.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="OTRA">+ Nueva Categoría</option>
              </select>
            </div>

            {/* OTRA CATEGORÍA EN CASO DE NUEVA */}
            {formData.categoria === "OTRA" && (
              <div className="form-group-item full-width">
                <label>
                  Nombre de la Nueva Categoría <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="otraCategoria"
                  placeholder="Ej. Camión Minero, Cargador Frontal, Tractor de Oruga"
                  value={formData.otraCategoria}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* MARCA Y MODELO REAL (ANCHO COMPLETO) */}
            <div className="form-group-item full-width">
              <label>
                Marca y Modelo Real <span className="req">*</span>
              </label>
              <input
                type="text"
                name="marcaModelo"
                placeholder="Ej. Caterpillar 336D2, Komatsu PC350LC, Volvo FMX 480"
                value={formData.marcaModelo}
                onChange={handleChange}
                className={errores.marcaModelo ? "input-error" : ""}
              />
              {errores.marcaModelo && (
                <span className="err-msg">{errores.marcaModelo}</span>
              )}
            </div>

            {/* NÚMERO DE SERIE / CHASIS (VIN) */}
            <div className="form-group-item">
              <label>
                N° de Serie / Chasis (VIN) <span className="req">*</span>
              </label>
              <input
                type="text"
                name="vin"
                placeholder="Ej. CAT0336D2K89201"
                value={formData.vin}
                onChange={handleChange}
                className={errores.vin ? "input-error" : ""}
              />
              {errores.vin && <span className="err-msg">{errores.vin}</span>}
            </div>

            {/* CAPACIDAD DE BALDE O TONELAJE */}
            <div className="form-group-item">
              <label>
                Capacidad de Balde / Tonelaje <span className="req">*</span>
              </label>
              <input
                type="text"
                name="capacidad"
                placeholder="Ej. 20 m³ (32 Tn) o 2.4 m³ (Balde HD)"
                value={formData.capacidad}
                onChange={handleChange}
                className={errores.capacidad ? "input-error" : ""}
              />
              {errores.capacidad && (
                <span className="err-msg">{errores.capacidad}</span>
              )}
            </div>

            {/* AÑO DE FABRICACIÓN */}
            <div className="form-group-item">
              <label>
                Año de Fabricación <span className="req">*</span>
              </label>
              <input
                type="number"
                name="anio"
                min="1990"
                max={CURRENT_YEAR + 1}
                placeholder="Ej. 2024"
                value={formData.anio}
                onChange={handleChange}
              />
            </div>

            {/* HORÓMETRO INICIAL */}
            <div className="form-group-item">
              <label>
                Horómetro Actual (Horas) <span className="req">*</span>
              </label>
              <input
                type="number"
                name="horometro"
                placeholder="Ej. 520"
                value={formData.horometro}
                onChange={handleChange}
                className={errores.horometro ? "input-error" : ""}
              />
              {errores.horometro && (
                <span className="err-msg">{errores.horometro}</span>
              )}
            </div>

            {/* ESTADO OPERATIVO */}
            <div className={`form-group-item ${formData.estado === "mantenimiento" ? "" : "full-width"}`}>
              <label>Estado Operativo</label>
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

            {/* MOTIVO DE MANTENIMIENTO SI APLICA */}
            {formData.estado === "mantenimiento" && (
              <div className="form-group-item">
                <label>Motivo de Mantenimiento</label>
                <input
                  type="text"
                  name="motivo"
                  placeholder="Ej. Cambio de orugas, filtros 500h"
                  value={formData.motivo}
                  onChange={handleChange}
                />
              </div>
            )}
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
            <button type="submit" className="btn-modal-submit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Guardar en Catálogo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
