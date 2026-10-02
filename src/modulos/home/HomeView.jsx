export default function HomeView({ operador, onNavigate }) {
  const nombreCompleto = operador?.nombre || "Juan";
  const primerNombre = nombreCompleto.split(" ")[0];

  return (
    <div className="home-view-container">
      {/* 1. BANNER DE BIENVENIDA CON ROBOT 3D */}
      <section className="velion-hero-banner">
        <div className="banner-content">
          <h1 className="banner-greeting">¡Hola, {primerNombre}!</h1>
          <h2 className="banner-subheading">Bienvenido a Velion Technology</h2>
          <p className="banner-description">
            Gestiona tus maquinarias y consulta sus reportes fácilmente.
          </p>

          <div className="banner-chips">
            <span className="banner-chip">
              <span className="chip-dot active"></span>
              Turno {operador?.turno || "Día"}
            </span>
            <span className="banner-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              En línea
            </span>
          </div>
        </div>

        <div className="banner-mascot-container">
          <img
            src="/robot-card-clean.png"
            alt="Asistente Velion"
            className="banner-mascot-img"
          />
        </div>
      </section>

      {/* 2. SECCIÓN DE REPORTES */}
      <section className="recent-reports-section">
        <div className="reports-section-header">
          <h3 className="reports-section-title">
            Consulta los últimos reportes registrados.
          </h3>
          <span className="reports-section-hint">
            Haz clic en una carpeta para abrir el módulo detallado
          </span>
        </div>

        <div className="folders-grid">
          {/* CARPETA 1: REPORTES DE VOLQUETES */}
          <article
            className="folder-card"
            onClick={() => onNavigate("reportes", "volquetes")}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onNavigate("reportes", "volquetes");
              }
            }}
          >
            <div className="folder-preview-box">
              <img
                src="/report-folder.png"
                alt="Carpeta Reportes Volquetes"
                className="folder-img"
              />
              <span className="folder-badge">48 Viajes</span>
            </div>
            <div className="folder-card-body">
              <h4 className="folder-card-title">Reporte de Volquetes</h4>
              <p className="folder-card-desc">
                Registro de ciclos de acarreo, fases de material (Relleno, Inadecuado) y tonelaje.
              </p>
              <div className="folder-card-footer">
                <span className="folder-tag">EOV-140 .. EOV-151</span>
                <span className="folder-action-link">
                  Abrir reporte
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </article>

          {/* CARPETA 2: REPORTES DE EXCAVADORAS */}
          <article
            className="folder-card"
            onClick={() => onNavigate("reportes", "excavadoras")}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onNavigate("reportes", "excavadoras");
              }
            }}
          >
            <div className="folder-preview-box">
              <img
                src="/report-folder.png"
                alt="Carpeta Reportes Excavadoras"
                className="folder-img"
              />
              <span className="folder-badge">8 Equipos</span>
            </div>
            <div className="folder-card-body">
              <h4 className="folder-card-title">Reporte de Excavadoras</h4>
              <p className="folder-card-desc">
                Control de carguío, horómetro inicial y final, y disponibilidad operativa de cargadoras.
              </p>
              <div className="folder-card-footer">
                <span className="folder-tag">EEX-040 .. EEX-047</span>
                <span className="folder-action-link">
                  Abrir reporte
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </article>

          {/* CARPETA 3: COMBUSTIBLE Y MANTENIMIENTO */}
          <article
            className="folder-card"
            onClick={() => onNavigate("reportes", "mantenimiento")}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onNavigate("reportes", "mantenimiento");
              }
            }}
          >
            <div className="folder-preview-box">
              <img
                src="/report-folder.png"
                alt="Carpeta Combustible y Mantenimiento"
                className="folder-img"
              />
              <span className="folder-badge warning">2 Alertas</span>
            </div>
            <div className="folder-card-body">
              <h4 className="folder-card-title">Combustible & Mant.</h4>
              <p className="folder-card-desc">
                Abastecimiento de galones por cisterna, alertas preventivas y correctivas en tiempo real.
              </p>
              <div className="folder-card-footer">
                <span className="folder-tag">1,450 Galones</span>
                <span className="folder-action-link">
                  Abrir reporte
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
