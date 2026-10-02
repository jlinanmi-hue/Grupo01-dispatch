
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const [documento, setDocumento] = useState("");
  const [clave, setClave] = useState("");
  const [mostrarClave, setMostrarClave] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleDocumentoChange = (e) => {
    const valor = e.target.value.replace(/\D/g, "").slice(0, 8);
    setDocumento(valor);
  };

  const handleClaveChange = (e) => {
    const valor = e.target.value.replace(/\D/g, "").slice(0, 5);
    setClave(valor);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (documento.length !== 8) {
      setError("El documento debe tener 8 dígitos");
      return;
    }

    if (clave.length !== 5) {
      setError("La clave debe tener 5 dígitos");
      return;
    }

    setLoading(true);

    try {
      // MODO PRUEBA
      localStorage.setItem("token", "token-de-prueba");
      const nombreUsuario =
        documento === "70528452"
          ? "Néstor Alejandro Arroyo"
          : "Juan Guzmán";

      localStorage.setItem(
        "operador",
        JSON.stringify({
          nin: documento,
          nombre: nombreUsuario,
          rol: "Administrador",
          turno: "Día",
        })
      );

      navigate("/menu");

      // Cuando el backend esté listo, reemplazar
      // el modo prueba por el siguiente código:
      //
      // const res = await api.post("/auth/login", {
      //   documento,
      //   clave,
      // });
      //
      // localStorage.setItem("token", res.data.token);
      // localStorage.setItem(
      //   "operador",
      //   JSON.stringify(res.data.operador)
      // );
      // navigate("/menu");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Documento o clave incorrectos"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      {/* PANEL IZQUIERDO */}
      <section className="login-welcome">

        <div className="welcome-brand">
          <div className="brand-symbol">
            <svg viewBox="0 0 64 52" fill="none">
              <path
                d="M4 46L24 8L31 17L15 46H4Z"
                fill="#F59E0B"
              />
              <path
                d="M25 46L43 15L60 46H48L42 34L35 46H25Z"
                fill="#F97316"
              />
              <path
                d="M24 8L31 17L36 10"
                stroke="#FDBA74"
                strokeWidth="4"
              />
            </svg>
          </div>

          <div className="brand-text">
            <h1>DISPATCH</h1>
            <span>SISTEMA DE GESTIÓN</span>
          </div>
        </div>

        <div className="welcome-content">
          <span className="welcome-tag">
            PLATAFORMA OPERATIVA
          </span>

          <h2>
            Bienvenido
            <br />
            <span>de nuevo</span>
          </h2>

          <p className="welcome-description">
            
          </p>

          <div className="welcome-line"></div>

          <div className="welcome-features">

            <div className="feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h12v11H3z" />
                  <path d="M15 11h4l3 4v3h-7z" />
                  <circle cx="7" cy="19" r="2" />
                  <circle cx="18" cy="19" r="2" />
                  <path d="M5 7V4h8v3" />
                </svg>
              </div>
              <span>Control de<br />Equipos</span>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <rect x="6" y="12" width="3" height="6" rx="1" />
                  <rect x="11" y="8" width="3" height="10" rx="1" />
                  <rect x="16" y="4" width="3" height="14" rx="1" />
                </svg>
              </div>
              <span>Reportes<br />en Tiempo Real</span>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L20 5v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3Z" />
                  <path d="m8.5 12 2.3 2.3 4.8-5" />
                </svg>
              </div>
              <span>Mayor<br />Seguridad</span>
            </div>

          </div>
        </div>

        <div className="welcome-footer">
          <span></span>
  
        </div>

      </section>

      {/* PANEL DERECHO: LOGIN */}
      <section className="login-form-section">

        <div className="login-card">

          <div className="card-accent"></div>

          <div className="login-heading">
            <h2>Iniciar Sesión</h2>
            <p>Ingresa tus credenciales para continuar</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>

            {/* DNI */}
            <div className="login-field">
              <label htmlFor="documento">
                Documento de Identidad
              </label>

              <div className="login-input-wrap">
                <span className="login-input-icon">
                  <svg viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="7" r="4" />
                    <path d="M4 21v-2a8 8 0 0 1 16 0v2H4Z" />
                  </svg>
                </span>

                <input
                  id="documento"
                  type="text"
                  inputMode="numeric"
                  value={documento}
                  onChange={handleDocumentoChange}
                  placeholder="Ingresa tu documento"
                  maxLength={8}
                  required
                  autoComplete="username"
                />

                {documento.length === 8 && (
                  <span className="input-valid">✓</span>
                )}
              </div>
            </div>

            {/* CLAVE */}
            <div className="login-field">
              <label htmlFor="clave">
                Clave de Acceso
              </label>

              <div className="login-input-wrap">
                <span className="login-input-icon">
                  <svg viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="10" width="18" height="12" rx="2" />
                    <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                    <circle cx="12" cy="16" r="1.5" />
                  </svg>
                </span>

                <input
                  id="clave"
                  type={mostrarClave ? "text" : "password"}
                  inputMode="numeric"
                  value={clave}
                  onChange={handleClaveChange}
                  placeholder="Ingresa tu clave"
                  maxLength={5}
                  required
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="login-input-eye"
                  onClick={() => setMostrarClave(v => !v)}
                  title={mostrarClave ? "Ocultar clave" : "Mostrar clave"}
                  aria-label={mostrarClave ? "Ocultar clave" : "Mostrar clave"}
                >
                  {mostrarClave ? (
                    <svg viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.9 5.2A10 10 0 0 1 12 5c5.5 0 9 7 9 7a15 15 0 0 1-3.1 3.9" />
                      <path d="M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7a9 9 0 0 0 3-.5" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            <button
              className="login-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "INGRESANDO..." : "INGRESAR"}
              {!loading && <span>→</span>}
            </button>

          </form>

          <div className="login-help">
            <div className="help-title">
              <span></span>
              ¿Necesitas ayuda?
              <span></span>
            </div>

            <div className="help-content">
              <div className="help-icon">i</div>
              <p>
                En caso de no tener los datos,
                comuníquese con el administrador
                de la mina para que pueda habilitar
                su acceso.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}