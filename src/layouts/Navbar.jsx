export default function Navbar({
  activeTab,
  subOption,
  fechaHora,
  setMobileOpen,
}) {
  return (
    <header className="velion-top-navbar">
      <div className="navbar-left">
        <button
          className="mobile-burger-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menú"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="navbar-breadcrumb">
          <span className="crumb-app">DISPATCH</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </span>
          {subOption && (
            <>
              <span className="crumb-sep">/</span>
              <span className="crumb-sub">
                {subOption.charAt(0).toUpperCase() + subOption.slice(1)}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="navbar-right">
        {/* ESTADO OPERATIVO */}
        <div className="system-status-indicator">
          <span className="status-pulse-dot"></span>
          <span className="status-label">Sistema en Línea</span>
        </div>

        {/* FECHA Y HORA */}
        <div className="navbar-clock">
          <span className="clock-date">{fechaHora.fecha}</span>
          <span className="clock-time">{fechaHora.hora}</span>
        </div>
      </div>
    </header>
  );
}
