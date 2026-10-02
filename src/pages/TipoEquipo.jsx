import { useNavigate } from "react-router-dom";
import "../styles/TipoEquipo.css";

export default function TipoEquipo() {
  const navigate = useNavigate();
  const operador = JSON.parse(localStorage.getItem("operador") || "{}");

  const fechaActual = new Date().toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const horaActual = new Date().toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const volverAlMenu = () => navigate("/menu");

  return (
    <div className="tipo-container">

      {/* DECORACIÓN DE FONDO */}
      <div className="tipo-background-decoration"></div>

      {/* BARRA SUPERIOR */}
      <header className="tipo-header">

        <div className="tipo-user-left">
          <div className="tipo-user-avatar">
            {operador.nombre
              ? operador.nombre.charAt(0).toUpperCase()
              : "O"}
          </div>
          <div className="tipo-user-info">
            <span className="tipo-user-label">OPERADOR</span>
            <strong>{operador.nombre || "Operador"}</strong>
            <span className="tipo-user-shift">
              <span className="status-dot"></span>
              Turno {operador.turno || "—"}
            </span>
          </div>
        </div>

        <div className="tipo-brand">
          <div className="tipo-brand-icon">
            <svg viewBox="0 0 64 52" fill="none">
              <path d="M4 46L24 8L31 17L15 46H4Z" fill="#F59E0B" />
              <path d="M25 46L43 15L60 46H48L42 34L35 46H25Z" fill="#F97316" />
              <path d="M24 8L31 17L36 10" stroke="#FDBA74" strokeWidth="4" />
            </svg>
          </div>
          <div className="tipo-brand-text">
            <h1>DISPATCH</h1>
            <span>SISTEMA DE GESTIÓN</span>
          </div>
        </div>

        <div className="tipo-datetime">
          <span className="tipo-datetime-date">{fechaActual}</span>
          <strong className="tipo-datetime-time">{horaActual}</strong>
        </div>

      </header>

      {/* CONTENIDO CENTRAL */}
      <main className="tipo-content">

        <div className="tipo-heading">
          <span className="tipo-eyebrow">MÓDULO EQUIPOS</span>
          <h2>Selecciona el <span>tipo de equipo</span></h2>
          <p>Elige la categoría que deseas consultar o registrar.</p>
        </div>

        {/* TARJETAS DE TIPO */}
        <div className="tipo-cards">

          {/* VOLQUETES */}
          <button
            className="tipo-card"
            onClick={() => navigate("/equipos?tipo=volquete")}
          >
            <div className="tipo-card-top">
              <span className="tipo-card-number">01</span>
              <span className="tipo-card-arrow">↗</span>
            </div>

            <div className="tipo-card-icon">
              <svg viewBox="0 0 64 64" fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                {/* Volquete */}
                <path d="M6 44h36v-9H10z" />
                <path d="M10 35V18h20l6 8v9" />
                <path d="M36 35h22v9" />
                <path d="M36 24h12l10 11" />
                <circle cx="16" cy="48" r="4" />
                <circle cx="44" cy="48" r="4" />
                <circle cx="52" cy="48" r="4" />
              </svg>
            </div>

            <div className="tipo-card-info">
              <h3>VOLQUETES</h3>
              <p>
                Equipos de acarreo para transporte
                de material dentro de la operación.
              </p>
            </div>

            <div className="tipo-card-action">
              <span>SELECCIONAR</span>
              <span className="tipo-action-arrow">→</span>
            </div>
          </button>

          {/* EXCAVADORAS */}
          <button
            className="tipo-card"
            onClick={() => navigate("/equipos?tipo=excavadora")}
          >
            <div className="tipo-card-top">
              <span className="tipo-card-number">02</span>
              <span className="tipo-card-arrow">↗</span>
            </div>

            <div className="tipo-card-icon">
              <svg viewBox="0 0 64 64" fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                {/* Excavadora */}
                <path d="M8 44h24v-8H8z" />
                <path d="M8 36v-6h16v6" />
                <path d="M24 32l12-14" />
                <path d="M36 18l6 6-8 8" />
                <path d="M34 32l4 6" />
                <circle cx="14" cy="48" r="4" />
                <circle cx="26" cy="48" r="4" />
              </svg>
            </div>

            <div className="tipo-card-info">
              <h3>EXCAVADORAS</h3>
              <p>
                Equipos de carguío para extracción
                y carga de material en frente.
              </p>
            </div>

            <div className="tipo-card-action">
              <span>SELECCIONAR</span>
              <span className="tipo-action-arrow">→</span>
            </div>
          </button>

        </div>

        {/* INFO INFERIOR */}
        <div className="tipo-info">
          <div className="tipo-info-line"></div>
          <p>SISTEMA DE DESPACHO Y CONTROL OPERATIVO</p>
          <div className="tipo-info-line"></div>
        </div>

      </main>

      {/* PIE DE PÁGINA */}
      <footer className="tipo-footer">

        <button
          className="tipo-back"
          onClick={volverAlMenu}
          title="Volver al menú"
        >
          <svg viewBox="0 0 24 24" fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          <span>REGRESAR</span>
        </button>

        <div className="tipo-footer-brand">
          <span className="footer-mark"></span>
          DISPATCH
          <span className="footer-separator">|</span>
          <span className="footer-copy">SISTEMA DE GESTIÓN</span>
        </div>

      </footer>
    </div>
  );
}