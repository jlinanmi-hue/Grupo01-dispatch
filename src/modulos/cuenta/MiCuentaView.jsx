import { useState } from "react";

export default function MiCuentaView({ operador, onUpdateOperador }) {
  const [formData, setFormData] = useState({
    nombre: operador?.nombre || "Juan Guzman",
    rol: operador?.rol || "Administrador",
    turno: operador?.turno || "Día",
    nin: operador?.nin || "70528452",
    correo: operador?.correo || "j.guzman@mina-dispatch.pe",
    telefono: operador?.telefono || "+51 987 654 321",
    guardia: operador?.guardia || "Guardia A (Régimen 14x7)",
    area: operador?.area || "Supervisión y Control de Operaciones Mina",
    sede: "Unidad Minera Tajo Central - Plataforma Norte",
    licenciaConducir: "A-IIb Profesional Especial Mina",
    licenciaVencimiento: "15/11/2028",
    induccionSSOMA: "Aprobada - Certificación Vigente 2026",
  });

  const [activeSubTab, setActiveSubTab] = useState("perfil"); // perfil | permisos | seguridad | sesion
  const [modoEdicion, setModoEdicion] = useState(false);
  const [toastMensaje, setToastMensaje] = useState("");

  // Estado para cambio de contraseña
  const [passData, setPassData] = useState({
    actual: "",
    nueva: "",
    confirmar: "",
  });
  const [passError, setPassError] = useState("");

  const mostrarToast = (msg) => {
    setToastMensaje(msg);
    setTimeout(() => setToastMensaje(""), 4500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardarPerfil = (e) => {
    e.preventDefault();
    const actualizado = {
      ...operador,
      nombre: formData.nombre,
      rol: formData.rol,
      turno: formData.turno,
      nin: formData.nin,
      correo: formData.correo,
      telefono: formData.telefono,
      guardia: formData.guardia,
      area: formData.area,
    };

    try {
      localStorage.setItem("operador", JSON.stringify(actualizado));
    } catch {
      // fallback
    }

    if (onUpdateOperador) {
      onUpdateOperador(actualizado);
    }

    setModoEdicion(false);
    mostrarToast("¡Datos de perfil actualizados correctamente en el sistema!");
  };

  const handleCambiarPassword = (e) => {
    e.preventDefault();
    if (!passData.actual) {
      setPassError("Ingresa tu contraseña actual.");
      return;
    }
    if (passData.nueva.length < 6) {
      setPassError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (passData.nueva !== passData.confirmar) {
      setPassError("La confirmación de la contraseña no coincide.");
      return;
    }

    setPassError("");
    setPassData({ actual: "", nueva: "", confirmar: "" });
    mostrarToast("¡Contraseña actualizada con éxito por seguridad!");
  };

  return (
    <div className="cuenta-view-container">
      {/* TOAST DE NOTIFICACIÓN */}
      {toastMensaje && (
        <div className="toast-success-banner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{toastMensaje}</span>
        </div>
      )}

      {/* CABECERA PRINCIPAL */}
      <div className="view-header">
        <div>
          <h2 className="view-title">Mi Cuenta y Perfil de Usuario</h2>
          <p className="view-subtitle">
            Información del operador, credenciales de acceso, rol corporativo y permisos en el sistema
          </p>
        </div>
        <div>
          {!modoEdicion ? (
            <button
              type="button"
              className="btn-action-primary"
              onClick={() => setModoEdicion(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Editar Perfil
            </button>
          ) : (
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={() => setModoEdicion(false)}
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </div>

      {/* TARJETA HERO DEL PERFIL */}
      <div className="cuenta-hero-card">
        <div className="cuenta-hero-banner"></div>
        <div className="cuenta-hero-content">
          <div className="cuenta-avatar-box">
            <img
              src="/user-avatar.png"
              alt="Avatar de usuario"
              className="cuenta-avatar-img"
              onError={(e) => {
                e.target.style.display = "none";
                const fallback = e.target.nextElementSibling;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div className="cuenta-avatar-circle" style={{ display: "none" }}>
              {formData.nombre.charAt(0).toUpperCase()}
            </div>
            <span className="cuenta-avatar-badge-online" title="Sesión activa"></span>
          </div>

          <div className="cuenta-hero-info">
            <div className="cuenta-hero-name-row">
              <h3 className="cuenta-user-name">{formData.nombre}</h3>
              <span className="cuenta-role-badge">{formData.rol}</span>
              <span className="cuenta-status-chip">🟢 Sesión Activa</span>
            </div>
            <p className="cuenta-hero-subtitle">
              DNI: <strong>{formData.nin}</strong> · {formData.area} · Sede: {formData.sede}
            </p>
            <div className="cuenta-hero-meta-chips">
              <span className="hero-chip">
                ☀️ Turno: <strong>{formData.turno}</strong>
              </span>
              <span className="hero-chip">
                🏢 {formData.guardia}
              </span>
              <span className="hero-chip">
                📧 {formData.correo}
              </span>
            </div>
          </div>
        </div>

        {/* NAVEGACIÓN INTERNA DE PESTAÑAS */}
        <div className="cuenta-subtabs-bar">
          <button
            type="button"
            className={`cuenta-tab-item ${activeSubTab === "perfil" ? "active" : ""}`}
            onClick={() => setActiveSubTab("perfil")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Información Personal & Laboral</span>
          </button>

          <button
            type="button"
            className={`cuenta-tab-item ${activeSubTab === "permisos" ? "active" : ""}`}
            onClick={() => setActiveSubTab("permisos")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Rol y Matriz de Permisos</span>
          </button>

          <button
            type="button"
            className={`cuenta-tab-item ${activeSubTab === "seguridad" ? "active" : ""}`}
            onClick={() => setActiveSubTab("seguridad")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Seguridad & Contraseña</span>
          </button>

          <button
            type="button"
            className={`cuenta-tab-item ${activeSubTab === "sesion" ? "active" : ""}`}
            onClick={() => setActiveSubTab("sesion")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span>Dispositivo & Conexión</span>
          </button>
        </div>
      </div>

      {/* PESTAÑA 1: DATOS PERSONALES Y LABORALES */}
      {activeSubTab === "perfil" && (
        <form onSubmit={handleGuardarPerfil} className="cuenta-form-card">
          <div className="cuenta-section-title-bar">
            <div>
              <h4>Ficha del Trabajador y Datos Corporativos</h4>
              <p>Datos oficiales registrados en el Centro de Control de Despacho Minero</p>
            </div>
            {modoEdicion && (
              <span className="badge-edicion-activa">✏️ Modo Edición Activo</span>
            )}
          </div>

          <div className="cuenta-grid-fields">
            <div className="form-group-item">
              <label>Nombres y Apellidos Completos</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                disabled={!modoEdicion}
                required
              />
            </div>

            <div className="form-group-item">
              <label>Documento de Identidad (DNI / NIN)</label>
              <input
                type="text"
                name="nin"
                value={formData.nin}
                onChange={handleChange}
                disabled={!modoEdicion}
                required
              />
            </div>

            <div className="form-group-item">
              <label>Rol / Cargo en el Sistema</label>
              <input
                type="text"
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                disabled={!modoEdicion}
                required
              />
            </div>

            <div className="form-group-item">
              <label>Turno Asignado</label>
              <select
                name="turno"
                value={formData.turno}
                onChange={handleChange}
                disabled={!modoEdicion}
              >
                <option value="Día">☀️ Turno Día (07:00 a 19:00)</option>
                <option value="Noche">🌙 Turno Noche (19:00 a 07:00)</option>
                <option value="Mixto">🔄 Turno Rotativo</option>
              </select>
            </div>

            <div className="form-group-item">
              <label>Correo Electrónico Corporativo</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                disabled={!modoEdicion}
                required
              />
            </div>

            <div className="form-group-item">
              <label>Teléfono / Radio de Enlace</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                disabled={!modoEdicion}
              />
            </div>

            <div className="form-group-item">
              <label>Guardia Operativa</label>
              <input
                type="text"
                name="guardia"
                value={formData.guardia}
                onChange={handleChange}
                disabled={!modoEdicion}
              />
            </div>

            <div className="form-group-item">
              <label>Área o Departamento</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                disabled={!modoEdicion}
              />
            </div>
          </div>

          {/* DATOS DE SEGURIDAD INDUSTRIAL Y HABILITACIONES */}
          <div className="cuenta-subcard-certificaciones">
            <h5>Habilitaciones Técnicas y Certificaciones en Mina</h5>
            <div className="certificaciones-grid">
              <div className="cert-chip">
                <span className="cert-icon">🚗</span>
                <div>
                  <strong>Licencia Interna de Manejo:</strong>
                  <span>{formData.licenciaConducir} (Vence: {formData.licenciaVencimiento})</span>
                </div>
              </div>

              <div className="cert-chip">
                <span className="cert-icon">🦺</span>
                <div>
                  <strong>Inducción de Seguridad SSOMA:</strong>
                  <span>{formData.induccionSSOMA}</span>
                </div>
              </div>

              <div className="cert-chip">
                <span className="cert-icon">🏢</span>
                <div>
                  <strong>Ubicación Base:</strong>
                  <span>{formData.sede}</span>
                </div>
              </div>
            </div>
          </div>

          {modoEdicion && (
            <div className="cuenta-form-actions">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setModoEdicion(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-action-primary">
                Guardar Cambios de Perfil
              </button>
            </div>
          )}
        </form>
      )}

      {/* PESTAÑA 2: MATRIZ DE PERMISOS */}
      {activeSubTab === "permisos" && (
        <div className="cuenta-form-card">
          <div className="cuenta-section-title-bar">
            <div>
              <h4>Matriz de Accesos y Privilegios</h4>
              <p>Privilegios otorgados según el rol de <strong>{formData.rol}</strong></p>
            </div>
            <span className="badge-permisos-max">Acceso de Nivel Alto</span>
          </div>

          <div className="permisos-grid">
            <div className="permiso-card granted">
              <div className="permiso-icon">🚛</div>
              <div className="permiso-info">
                <strong>Gestión y Despacho en Tiempo Real</strong>
                <p>Creación y monitoreo de ciclos de acarreo, frentes de carguío y botaderos.</p>
                <span className="permiso-status">✅ Autorizado</span>
              </div>
            </div>

            <div className="permiso-card granted">
              <div className="permiso-icon">🚜</div>
              <div className="permiso-info">
                <strong>Catálogo de Flota y Maquinaria</strong>
                <p>Alta de equipos mineros, especificaciones de balde, VIN y horómetro.</p>
                <span className="permiso-status">✅ Autorizado</span>
              </div>
            </div>

            <div className="permiso-card granted">
              <div className="permiso-icon">🔧</div>
              <div className="permiso-info">
                <strong>Control de Mantenimiento</strong>
                <p>Programación de preventivos periódicos y reporte inmediato de incidentes correctivos.</p>
                <span className="permiso-status">✅ Autorizado</span>
              </div>
            </div>

            <div className="permiso-card granted">
              <div className="permiso-icon">👷</div>
              <div className="permiso-info">
                <strong>Administración de Operadores</strong>
                <p>Registro de trabajadores en 4 etapas, control de turnos y licencias técnicas.</p>
                <span className="permiso-status">✅ Autorizado</span>
              </div>
            </div>

            <div className="permiso-card granted">
              <div className="permiso-icon">📊</div>
              <div className="permiso-info">
                <strong>Dashboard y Telemetría Operativa</strong>
                <p>Visualización de balance versus, gráficos de barras, gráficos pastel y KPIs.</p>
                <span className="permiso-status">✅ Autorizado</span>
              </div>
            </div>

            <div className="permiso-card granted">
              <div className="permiso-icon">📁</div>
              <div className="permiso-info">
                <strong>Exportación de Auditoría y Reportes</strong>
                <p>Descarga de reportes en Excel de turnos diarios, semanales y mensuales.</p>
                <span className="permiso-status">✅ Autorizado</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 3: SEGURIDAD Y CONTRASEÑA */}
      {activeSubTab === "seguridad" && (
        <form onSubmit={handleCambiarPassword} className="cuenta-form-card">
          <div className="cuenta-section-title-bar">
            <div>
              <h4>Seguridad de la Cuenta y Cambio de Contraseña</h4>
              <p>Mantén tu cuenta protegida cumpliendo con los estándares de seguridad de la empresa</p>
            </div>
          </div>

          {passError && (
            <div className="alert-notice-box corrective-notice" style={{ marginBottom: "16px" }}>
              <span>⚠️ {passError}</span>
            </div>
          )}

          <div className="cuenta-grid-fields" style={{ maxWidth: "560px" }}>
            <div className="form-group-item full-width">
              <label>Contraseña Actual</label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña actual"
                value={passData.actual}
                onChange={(e) => setPassData({ ...passData, actual: e.target.value })}
                required
              />
            </div>

            <div className="form-group-item full-width">
              <label>Nueva Contraseña</label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={passData.nueva}
                onChange={(e) => setPassData({ ...passData, nueva: e.target.value })}
                required
              />
            </div>

            <div className="form-group-item full-width">
              <label>Confirmar Nueva Contraseña</label>
              <input
                type="password"
                placeholder="Vuelve a escribir la nueva contraseña"
                value={passData.confirmar}
                onChange={(e) => setPassData({ ...passData, confirmar: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="cuenta-form-actions" style={{ maxWidth: "560px" }}>
            <button type="submit" className="btn-action-primary">
              Actualizar Contraseña
            </button>
          </div>
        </form>
      )}

      {/* PESTAÑA 4: DISPOSITIVO Y CONEXIÓN */}
      {activeSubTab === "sesion" && (
        <div className="cuenta-form-card">
          <div className="cuenta-section-title-bar">
            <div>
              <h4>Historial de Sesión y Telemetría de Terminal</h4>
              <p>Información técnica del punto de acceso al sistema de despacho</p>
            </div>
          </div>

          <div className="sesion-telemetria-grid">
            <div className="telemetria-item-card">
              <span className="tel-lbl">Consola Asignada</span>
              <strong>Terminal Dispatch Central #01</strong>
              <small>Estación fija en Sala de Control</small>
            </div>

            <div className="telemetria-item-card">
              <span className="tel-lbl">Dirección IP en Mina</span>
              <strong>192.168.10.45</strong>
              <small>VLAN Operaciones Críticas (Segura)</small>
            </div>

            <div className="telemetria-item-card">
              <span className="tel-lbl">Hora de Ingreso al Sistema</span>
              <strong>Hoy a las 07:02 a. m.</strong>
              <small>Inicio de guardia registrado</small>
            </div>

            <div className="telemetria-item-card">
              <span className="tel-lbl">Nivel de Latencia de Red</span>
              <strong style={{ color: "#059669" }}>18 ms (Óptima)</strong>
              <small>Enlace fibra óptica directo a tajo</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
