import { useState } from "react";

export default function RegistrarOperadorView({ onCancel, onSaveSuccess }) {
  const [currentStep, setCurrentStep] = useState(1);

  // Estado unificado del formulario
  const [formData, setFormData] = useState({
    // 1. Personales
    codigo: "P-345039",
    nombres: "Carlos Eduardo",
    apellidos: "Quispe Mamani",
    dni: "72849102",
    telefono: "987 654 321",
    email: "carlos.quispe@velion.pe",
    contactoEmergencia: "María Mamani (912 345 678)",
    telefonoEmergencia: "912 345 678",

    // 2. Laborales (Perfil Operativo y Asignación)
    fechaIngreso: "2026-01-15",
    empresa: "Consorcio Minero Sur",
    tipoOperador: "Acarreo",
    equipoPrincipal: "Camión Minero CAT 797F (400 Tn)",
    turnoTrabajo: "Turno A - Día (7x7)",
    estadoRegistro: "Pendiente de Documentos",
    guardiaAsignada: "Guardia 2 - Puma",

    // 3. Documentos y Certificaciones
    categoriaLicencia: "A-IIIb",
    nroLicencia: "Q-72849102",
    vencimientoLicencia: "2026-12-11",
    archivoLicencia: "Licencia_MTC_Quispe.pdf (1.4 MB)",

    fechaEmisionEmo: "2026-01-10",
    fechaVencimientoEmo: "2027-01-10",

    certificaciones: [
      {
        id: 1,
        nombre: "Operación de Camión Minero CAT 797F",
        centro: "Tecsup / Ferreyros",
        fechaFin: "2025-11-20",
      },
    ],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleAddCertificacion = () => {
    const nuevaCert = {
      id: Date.now(),
      nombre: "",
      centro: "",
      fechaFin: "",
    };
    setFormData((prev) => ({
      ...prev,
      certificaciones: [...prev.certificaciones, nuevaCert],
    }));
  };

  const handleRemoveCertificacion = (id) => {
    setFormData((prev) => ({
      ...prev,
      certificaciones: prev.certificaciones.filter((c) => c.id !== id),
    }));
  };

  const handleUpdateCertificacion = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      certificaciones: prev.certificaciones.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      ),
    }));
  };

  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.nombres.trim()) errs.nombres = "El nombre es obligatorio";
      if (!formData.apellidos.trim()) errs.apellidos = "El apellido es obligatorio";
      if (!formData.dni || formData.dni.length !== 8)
        errs.dni = "El DNI debe tener 8 dígitos";
      if (!formData.telefono.trim()) errs.telefono = "El teléfono es obligatorio";
    }

    if (step === 2) {
      if (!formData.codigo.trim()) errs.codigo = "El código es obligatorio";
      if (!formData.fechaIngreso) errs.fechaIngreso = "La fecha de ingreso es obligatoria";
      if (!formData.empresa.trim()) errs.empresa = "La empresa es obligatoria";
      if (!formData.tipoOperador) errs.tipoOperador = "Seleccione el tipo de operador";
      if (!formData.equipoPrincipal) errs.equipoPrincipal = "Seleccione el equipo principal";
      if (!formData.turnoTrabajo) errs.turnoTrabajo = "Seleccione el turno";
    }

    if (step === 3) {
      if (!formData.nroLicencia.trim()) errs.nroLicencia = "El N.º de licencia es obligatorio";
      if (!formData.vencimientoLicencia)
        errs.vencimientoLicencia = "Ingrese fecha de vencimiento de licencia";
      if (!formData.fechaEmisionEmo) errs.fechaEmisionEmo = "Ingrese emisión de EMO";
      if (!formData.fechaVencimientoEmo)
        errs.fechaVencimientoEmo = "Ingrese vencimiento de EMO";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      if (onCancel) onCancel();
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleFinalizar = () => {
    const nuevoOperador = {
      nin: formData.dni,
      codigo: formData.codigo,
      nombre: `${formData.nombres} ${formData.apellidos}`,
      turno: formData.turnoTrabajo.includes("Día") ? "Turno Día" : "Turno Noche",
      equipo: formData.equipoPrincipal.split(" ")[0] || "ECV-145",
      tipoEquipo: formData.tipoOperador,
      estado: formData.estadoRegistro === "Habilitado" ? "Operando" : "Pendiente de Documentos",
      telefono: formData.telefono,
      licencia: formData.categoriaLicencia,
      guardia: formData.guardiaAsignada,
      detalles: formData,
    };

    if (onSaveSuccess) onSaveSuccess(nuevoOperador);
  };

  return (
    <div className="registro-operador-container">
      {/* 1. CABECERA CELESTE / CYAN COMO EN LAS IMÁGENES */}
      <div className="registro-header-pill">
        <h2>Registrar operador</h2>
      </div>

      {/* 2. STEPPER DE 4 ETAPAS */}
      <div className="registro-stepper">
        <button
          type="button"
          className={`step-pill ${currentStep > 1 ? "completed" : currentStep === 1 ? "active" : ""}`}
          onClick={() => currentStep > 1 && setCurrentStep(1)}
        >
          <span className="step-circle">1</span>
          <span className="step-label">Personales</span>
        </button>

        <button
          type="button"
          className={`step-pill ${currentStep > 2 ? "completed" : currentStep === 2 ? "active" : ""}`}
          onClick={() => currentStep > 2 && setCurrentStep(2)}
        >
          <span className="step-circle">2</span>
          <span className="step-label">Laborales</span>
        </button>

        <button
          type="button"
          className={`step-pill ${currentStep > 3 ? "completed" : currentStep === 3 ? "active" : ""}`}
          onClick={() => currentStep > 3 && setCurrentStep(3)}
        >
          <span className="step-circle">3</span>
          <span className="step-label">Documentos</span>
        </button>

        <button
          type="button"
          className={`step-pill ${currentStep === 4 ? "active" : ""}`}
          onClick={() => validateStep(1) && validateStep(2) && validateStep(3) && setCurrentStep(4)}
        >
          <span className="step-circle">4</span>
          <span className="step-label">Resumen</span>
        </button>
      </div>

      {/* 3. CONTENIDO SEGÚN LA ETAPA ACTUAL */}
      <div className="registro-card-body">
        {/* ETAPA 1: DATOS PERSONALES */}
        {currentStep === 1 && (
          <div className="form-step-content">
            <div className="step-title-row">
              <h3>Datos Personales del Trabajador</h3>
            </div>

            <div className="form-grid-three">
              <div className="form-field">
                <label>Código del operador *</label>
                <input
                  type="text"
                  value={formData.codigo}
                  onChange={(e) => handleChange("codigo", e.target.value)}
                  placeholder="Ej. P-345039"
                />
                {errors.codigo && <span className="field-error">{errors.codigo}</span>}
              </div>

              <div className="form-field">
                <label>Nombres *</label>
                <input
                  type="text"
                  value={formData.nombres}
                  onChange={(e) => handleChange("nombres", e.target.value)}
                  placeholder="Nombres completos"
                />
                {errors.nombres && <span className="field-error">{errors.nombres}</span>}
              </div>

              <div className="form-field">
                <label>Apellidos *</label>
                <input
                  type="text"
                  value={formData.apellidos}
                  onChange={(e) => handleChange("apellidos", e.target.value)}
                  placeholder="Apellidos completos"
                />
                {errors.apellidos && <span className="field-error">{errors.apellidos}</span>}
              </div>

              <div className="form-field">
                <label>DNI / Documento de Identidad *</label>
                <input
                  type="text"
                  maxLength={8}
                  value={formData.dni}
                  onChange={(e) =>
                    handleChange("dni", e.target.value.replace(/\D/g, "").slice(0, 8))
                  }
                  placeholder="8 dígitos"
                />
                {errors.dni && <span className="field-error">{errors.dni}</span>}
              </div>

              <div className="form-field">
                <label>N.º de celular *</label>
                <input
                  type="text"
                  value={formData.telefono}
                  onChange={(e) => handleChange("telefono", e.target.value)}
                  placeholder="Ej. 987 654 321"
                />
                {errors.telefono && <span className="field-error">{errors.telefono}</span>}
              </div>

              <div className="form-field">
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div className="form-field full-row">
                <label>Contacto de Emergencia (Nombre y Teléfono)</label>
                <input
                  type="text"
                  value={formData.contactoEmergencia}
                  onChange={(e) => handleChange("contactoEmergencia", e.target.value)}
                  placeholder="Ej. María Mamani (912 345 678)"
                />
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 2: LABORALES (IMAGEN 1) */}
        {currentStep === 2 && (
          <div className="form-step-content">
            <div className="step-title-row">
              <h3>Perfil Operativo y Asignación de Equipo</h3>
            </div>

            <div className="form-grid-three">
              <div className="form-field">
                <label>Código del operador *</label>
                <input
                  type="text"
                  value={formData.codigo}
                  onChange={(e) => handleChange("codigo", e.target.value)}
                  placeholder="P-345039"
                />
                {errors.codigo && <span className="field-error">{errors.codigo}</span>}
              </div>

              <div className="form-field">
                <label>Fecha de ingreso *</label>
                <div className="input-with-icon">
                  <input
                    type="date"
                    value={formData.fechaIngreso}
                    onChange={(e) => handleChange("fechaIngreso", e.target.value)}
                  />
                </div>
                {errors.fechaIngreso && (
                  <span className="field-error">{errors.fechaIngreso}</span>
                )}
              </div>

              <div className="form-field">
                <label>Empresa / Contratista *</label>
                <input
                  type="text"
                  value={formData.empresa}
                  onChange={(e) => handleChange("empresa", e.target.value)}
                  placeholder="Nombre de empresa"
                />
                {errors.empresa && <span className="field-error">{errors.empresa}</span>}
              </div>

              <div className="form-field">
                <label>Tipo de Operador *</label>
                <select
                  value={formData.tipoOperador}
                  onChange={(e) => handleChange("tipoOperador", e.target.value)}
                >
                  <option value="Acarreo">Acarreo (Camión / Volquete)</option>
                  <option value="Carguío">Carguío (Excavadora / Pala)</option>
                  <option value="Perforación">Perforación</option>
                  <option value="Auxiliar">Equipo Auxiliar (Tractor / Cisterna)</option>
                </select>
              </div>

              <div className="form-field">
                <label>Equipo Principal *</label>
                <select
                  value={formData.equipoPrincipal}
                  onChange={(e) => handleChange("equipoPrincipal", e.target.value)}
                >
                  <option value="Camión Minero CAT 797F (400 Tn)">
                    Camión Minero CAT 797F (400 Tn)
                  </option>
                  <option value="ECV-141 (Volquete 20m³)">ECV-141 (Volquete 20m³)</option>
                  <option value="ECV-142 (Volquete 17m³)">ECV-142 (Volquete 17m³)</option>
                  <option value="ECV-143 (Volquete 17m³)">ECV-143 (Volquete 17m³)</option>
                  <option value="EEX-043 (Excavadora Cat 349)">
                    EEX-043 (Excavadora Cat 349)
                  </option>
                  <option value="EEX-042 (Excavadora Komatsu PC350)">
                    EEX-042 (Excavadora Komatsu PC350)
                  </option>
                </select>
              </div>

              <div className="form-field">
                <label>Turno de Trabajo *</label>
                <select
                  value={formData.turnoTrabajo}
                  onChange={(e) => handleChange("turnoTrabajo", e.target.value)}
                >
                  <option value="Turno A - Día (7x7)">Turno A - Día (7x7)</option>
                  <option value="Turno B - Noche (7x7)">Turno B - Noche (7x7)</option>
                  <option value="Turno Rotativo (14x7)">Turno Rotativo (14x7)</option>
                </select>
              </div>

              <div className="form-field">
                <label>Estado Inicial del Registro</label>
                <select
                  value={formData.estadoRegistro}
                  onChange={(e) => handleChange("estadoRegistro", e.target.value)}
                >
                  <option value="Pendiente de Documentos">Pendiente de Documentos</option>
                  <option value="Habilitado">Habilitado</option>
                  <option value="En Inducción">En Inducción</option>
                </select>
              </div>

              <div className="form-field">
                <label>Guardia Asignada</label>
                <select
                  value={formData.guardiaAsignada}
                  onChange={(e) => handleChange("guardiaAsignada", e.target.value)}
                >
                  <option value="Guardia 2 - Puma">Guardia 2 - Puma</option>
                  <option value="Guardia 1 - Cóndor">Guardia 1 - Cóndor</option>
                  <option value="Guardia 3 - Huáscar">Guardia 3 - Huáscar</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 3: DOCUMENTOS (IMÁGENES 2 Y 3) */}
        {currentStep === 3 && (
          <div className="form-step-content">
            <div className="step-title-row">
              <h3>Licencias y Certificaciones Técnicas</h3>
            </div>

            <div className="documentos-subseccion">
              <span className="subseccion-label">Licencia MTC (Conducir / MPT)</span>

              <div className="form-grid-three">
                <div className="form-field">
                  <label>Categoría de licencia *</label>
                  <select
                    value={formData.categoriaLicencia}
                    onChange={(e) => handleChange("categoriaLicencia", e.target.value)}
                  >
                    <option value="A-IIIb">A-IIIb (Camión / Volquete pesado)</option>
                    <option value="A-IIIc">A-IIIc (Semirremolques)</option>
                    <option value="A-IIb">A-IIb</option>
                    <option value="Especial MPT">Especial MPT</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Nº de licencia *</label>
                  <input
                    type="text"
                    value={formData.nroLicencia}
                    onChange={(e) => handleChange("nroLicencia", e.target.value)}
                    placeholder="Q-72849102"
                  />
                  {errors.nroLicencia && (
                    <span className="field-error">{errors.nroLicencia}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>Fecha de vencimiento *</label>
                  <input
                    type="date"
                    value={formData.vencimientoLicencia}
                    onChange={(e) => handleChange("vencimientoLicencia", e.target.value)}
                  />
                  {errors.vencimientoLicencia && (
                    <span className="field-error">{errors.vencimientoLicencia}</span>
                  )}
                </div>
              </div>

              <div className="archivo-adjunto-box">
                <div className="adjunto-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </div>
                <div className="adjunto-info">
                  <span>
                    Archivo Adjuntado Correctamente:{" "}
                    <button
                      type="button"
                      className="link-btn"
                      onClick={() => alert(`Previsualizando: ${formData.archivoLicencia}`)}
                    >
                      Click para verificar
                    </button>
                  </span>
                  <small>Archivo cargado: {formData.archivoLicencia}</small>
                </div>
              </div>
            </div>

            <div className="documentos-subseccion">
              <span className="subseccion-label">Examen Médico Ocupacional (EMO)</span>

              <div className="form-grid-two">
                <div className="form-field">
                  <label>Fecha emisión EMO *</label>
                  <input
                    type="date"
                    value={formData.fechaEmisionEmo}
                    onChange={(e) => handleChange("fechaEmisionEmo", e.target.value)}
                  />
                  {errors.fechaEmisionEmo && (
                    <span className="field-error">{errors.fechaEmisionEmo}</span>
                  )}
                </div>

                <div className="form-field">
                  <label>Fecha de vencimiento EMO *</label>
                  <input
                    type="date"
                    value={formData.fechaVencimientoEmo}
                    onChange={(e) => handleChange("fechaVencimientoEmo", e.target.value)}
                  />
                  {errors.fechaVencimientoEmo && (
                    <span className="field-error">{errors.fechaVencimientoEmo}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="documentos-subseccion">
              <div className="certificaciones-header-bar">
                <span className="subseccion-label">
                  Certificaciones de Operación de Equipo
                </span>
                <button
                  type="button"
                  className="btn-add-certificacion"
                  onClick={handleAddCertificacion}
                >
                  + Agregar certificación
                </button>
              </div>

              <div className="certificaciones-list">
                {formData.certificaciones.map((cert) => (
                  <div key={cert.id} className="certificacion-row-item">
                    <div className="cert-field">
                      <input
                        type="text"
                        placeholder="Nombre de certificación"
                        value={cert.nombre}
                        onChange={(e) =>
                          handleUpdateCertificacion(cert.id, "nombre", e.target.value)
                        }
                      />
                    </div>

                    <div className="cert-field">
                      <input
                        type="text"
                        placeholder="Centro de Capacitación"
                        value={cert.centro}
                        onChange={(e) =>
                          handleUpdateCertificacion(cert.id, "centro", e.target.value)
                        }
                      />
                    </div>

                    <div className="cert-field">
                      <input
                        type="date"
                        placeholder="Fecha de finalización"
                        value={cert.fechaFin}
                        onChange={(e) =>
                          handleUpdateCertificacion(cert.id, "fechaFin", e.target.value)
                        }
                      />
                    </div>

                    <button
                      type="button"
                      className="btn-remove-cert"
                      onClick={() => handleRemoveCertificacion(cert.id)}
                      title="Eliminar certificación"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {formData.certificaciones.length === 0 && (
                  <p className="no-cert-msg">
                    No hay certificaciones adicionales agregadas. Puedes continuar o presionar
                    &quot;+ Agregar certificación&quot;.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 4: RESUMEN (IMAGEN 4) */}
        {currentStep === 4 && (
          <div className="form-step-content resumen-layout-grid">
            <div className="resumen-operator-card">
              <div className="resumen-avatar-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>

              <h3 className="resumen-card-name">
                {formData.nombres} {formData.apellidos}
              </h3>
              <span className="resumen-card-role">Operador de {formData.tipoOperador}</span>

              <div className="resumen-card-divider"></div>

              <div className="resumen-meta-list">
                <div className="resumen-meta-row">
                  <span className="meta-label">Código:</span>
                  <strong className="meta-val">{formData.codigo}</strong>
                </div>
                <div className="resumen-meta-row">
                  <span className="meta-label">DNI:</span>
                  <strong className="meta-val">{formData.dni}</strong>
                </div>
                <div className="resumen-meta-row">
                  <span className="meta-label">Equipo:</span>
                  <strong className="meta-val">
                    {formData.equipoPrincipal.split(" ")[0]} {formData.equipoPrincipal.split(" ")[1] || ""}
                  </strong>
                </div>
                <div className="resumen-meta-row">
                  <span className="meta-label">Licencia:</span>
                  <strong className="meta-val">{formData.categoriaLicencia}</strong>
                </div>
              </div>

              <div className="resumen-status-pill-btn">
                <span>{formData.estadoRegistro.toUpperCase()}</span>
              </div>
            </div>

            <div className="resumen-details-stack">
              <div className="resumen-block-card">
                <div className="block-card-header">
                  <h4>Datos Personales</h4>
                  <button
                    type="button"
                    className="btn-edit-link"
                    onClick={() => setCurrentStep(1)}
                  >
                    Editar
                  </button>
                </div>

                <div className="block-card-grid">
                  <div>
                    <span className="info-lbl">Nombre Completo:</span>
                    <strong className="info-data">
                      {formData.nombres} {formData.apellidos}
                    </strong>
                  </div>
                  <div>
                    <span className="info-lbl">DNI:</span>
                    <strong className="info-data">{formData.dni}</strong>
                  </div>
                  <div>
                    <span className="info-lbl">N.º de celular:</span>
                    <strong className="info-data">{formData.telefono}</strong>
                  </div>
                  <div>
                    <span className="info-lbl">Contacto de emergencia:</span>
                    <strong className="info-data">{formData.contactoEmergencia}</strong>
                  </div>
                </div>
              </div>

              <div className="resumen-block-card">
                <div className="block-card-header">
                  <h4>Datos Operativos</h4>
                  <button
                    type="button"
                    className="btn-edit-link"
                    onClick={() => setCurrentStep(2)}
                  >
                    Editar
                  </button>
                </div>

                <div className="block-card-grid">
                  <div>
                    <span className="info-lbl">Tipo de operador:</span>
                    <strong className="info-data">{formData.tipoOperador}</strong>
                  </div>
                  <div>
                    <span className="info-lbl">Equipo:</span>
                    <strong className="info-data">{formData.equipoPrincipal}</strong>
                  </div>
                  <div>
                    <span className="info-lbl">Turno:</span>
                    <strong className="info-data">{formData.turnoTrabajo}</strong>
                  </div>
                  <div>
                    <span className="info-lbl">Guardia:</span>
                    <strong className="info-data">{formData.guardiaAsignada}</strong>
                  </div>
                </div>
              </div>

              <div className="resumen-block-card">
                <div className="block-card-header">
                  <h4>Habilitación & Licencias</h4>
                  <button
                    type="button"
                    className="btn-edit-link"
                    onClick={() => setCurrentStep(3)}
                  >
                    Editar
                  </button>
                </div>

                <div className="block-card-grid">
                  <div>
                    <span className="info-lbl">Licencia MTC:</span>
                    <strong className="info-data">{formData.categoriaLicencia}</strong>
                  </div>
                  <div>
                    <span className="info-lbl">Nº de licencia:</span>
                    <strong className="info-data">{formData.nroLicencia}</strong>
                  </div>
                  <div>
                    <span className="info-lbl">Fecha de vencimiento:</span>
                    <strong className="info-data">{formData.vencimientoLicencia}</strong>
                  </div>
                  <div>
                    <span className="info-lbl">Certificaciones Registradas:</span>
                    <strong className="info-data">
                      {formData.certificaciones.length} Certificación(es) Registrada(s)
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. BOTONES DE ACCIÓN */}
      <div className="registro-footer-actions">
        <button type="button" className="btn-wizard-back" onClick={handleBack}>
          {currentStep === 1 ? "Cancelar" : "Atrás"}
        </button>

        {currentStep < 4 ? (
          <button type="button" className="btn-wizard-next" onClick={handleNext}>
            Siguiente
          </button>
        ) : (
          <button type="button" className="btn-wizard-finish" onClick={handleFinalizar}>
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
}
