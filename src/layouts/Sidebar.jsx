import { useState } from "react";

export default function Sidebar({
  activeTab,
  setActiveTab,
  operador,
  onLogout,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
  onSelectSubOption,
}) {
  const [openOperaciones, setOpenOperaciones] = useState(false);
  const [openEquipos, setOpenEquipos] = useState(false);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (setMobileOpen) setMobileOpen(false);

    if (tabId === "operaciones") {
      setOpenOperaciones((prev) => !prev);
    }
    if (tabId === "equipos") {
      setOpenEquipos((prev) => !prev);
    }
  };

  const handleSubOption = (tabId, subOption) => {
    setActiveTab(tabId);
    if (onSelectSubOption) onSelectSubOption(subOption);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* OVERLAY PARA MÓVIL */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`velion-sidebar ${isCollapsed ? "collapsed" : ""} ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        {/* LOGO & ENCABEZADO */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-logo-box">
              <svg
                className="sidebar-logo-svg"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M20 4L34 18L27 25L20 18L13 25L6 18L20 4Z"
                  fill="#FFFFFF"
                />
                <rect
                  x="16"
                  y="22"
                  width="8"
                  height="8"
                  transform="rotate(45 20 26)"
                  fill="#FFFFFF"
                />
              </svg>
            </div>
            {!isCollapsed && (
              <div className="sidebar-brand-text">
                <span className="brand-title">DISPATCH</span>
                <span className="brand-subtitle">VELION TECH</span>
              </div>
            )}
          </div>

          {/* BOTÓN COLAPSAR / EXPANDIR */}
          <button
            className="sidebar-toggle-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expandir menú" : "Colapsar menú"}
            aria-label="Toggle sidebar"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isCollapsed ? (
                <path d="M9 18l6-6-6-6" />
              ) : (
                <path d="M15 18l-6-6 6-6" />
              )}
            </svg>
          </button>
        </div>

        {/* LISTA DE NAVEGACIÓN */}
        <nav className="sidebar-nav">
          {/* 1. HOME */}
          <div className="sidebar-item-wrapper">
            <button
              className={`sidebar-nav-item ${
                activeTab === "home" ? "active" : ""
              }`}
              onClick={() => handleTabClick("home")}
              title="Home"
            >
              <span className="nav-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 10.5L12 3l9 7.5" />
                  <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
                </svg>
              </span>
              {!isCollapsed && <span className="nav-text">Home</span>}
            </button>
          </div>

          {/* 2. DASHBOARD */}
          <div className="sidebar-item-wrapper">
            <button
              className={`sidebar-nav-item ${
                activeTab === "dashboard" ? "active" : ""
              }`}
              onClick={() => handleTabClick("dashboard")}
              title="Dashboard"
            >
              <span className="nav-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 3v18h18" />
                  <path d="M18 9l-5 5-4-4-5 5" />
                  <path d="M14 9h4v4" />
                </svg>
              </span>
              {!isCollapsed && <span className="nav-text">Dashboard</span>}
            </button>
          </div>

          {/* 3. OPERACIONES (DESPLEGABLE) */}
          <div className="sidebar-item-wrapper">
            <button
              className={`sidebar-nav-item has-dropdown ${
                activeTab === "operaciones" ? "active" : ""
              }`}
              onClick={() => handleTabClick("operaciones")}
              title="Operaciones"
            >
              <span className="nav-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
              </span>
              {!isCollapsed && (
                <>
                  <span className="nav-text">Operaciones</span>
                  <span
                    className={`dropdown-chevron ${
                      openOperaciones ? "open" : ""
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </>
              )}
            </button>

            {/* SUBMENÚ DESPLEGABLE OPERACIONES */}
            {!isCollapsed && openOperaciones && (
              <div className="sidebar-submenu">
                <button
                  className="submenu-item"
                  onClick={() => handleSubOption("operaciones", "ciclo")}
                >
                  <span className="submenu-bullet"></span>
                  <span>Ciclos de Acarreo</span>
                </button>
                <button
                  className="submenu-item"
                  onClick={() => handleSubOption("operaciones", "horometro")}
                >
                  <span className="submenu-bullet"></span>
                  <span>Horómetro / Km</span>
                </button>
                <button
                  className="submenu-item"
                  onClick={() => handleSubOption("operaciones", "combustible")}
                >
                  <span className="submenu-bullet"></span>
                  <span>Combustible</span>
                </button>
                <button
                  className="submenu-item"
                  onClick={() => handleSubOption("operaciones", "mantenimiento")}
                >
                  <span className="submenu-bullet"></span>
                  <span>Mantenimiento</span>
                </button>
              </div>
            )}
          </div>

          {/* 4. MAPAS */}
          <div className="sidebar-item-wrapper">
            <button
              className={`sidebar-nav-item ${
                activeTab === "mapas" ? "active" : ""
              }`}
              onClick={() => handleTabClick("mapas")}
              title="Mapas"
            >
              <span className="nav-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              {!isCollapsed && <span className="nav-text">Mapas</span>}
            </button>
          </div>

          {/* 5. OPERADORES */}
          <div className="sidebar-item-wrapper">
            <button
              className={`sidebar-nav-item ${
                activeTab === "operadores" ? "active" : ""
              }`}
              onClick={() => handleTabClick("operadores")}
              title="Operadores"
            >
              <span className="nav-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              {!isCollapsed && <span className="nav-text">Operadores</span>}
            </button>
          </div>

          {/* 6. EQUIPOS (DESPLEGABLE) */}
          <div className="sidebar-item-wrapper">
            <button
              className={`sidebar-nav-item has-dropdown ${
                activeTab === "equipos" ? "active" : ""
              }`}
              onClick={() => handleTabClick("equipos")}
              title="Equipos"
            >
              <span className="nav-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 17h18" />
                  <circle cx="7" cy="17" r="2.5" />
                  <circle cx="17" cy="17" r="2.5" />
                  <path d="M5 14.5L7 8h10l2 6.5" />
                  <path d="M2 11h3" />
                  <path d="M17 8V5h3" />
                </svg>
              </span>
              {!isCollapsed && (
                <>
                  <span className="nav-text">Equipos</span>
                  <span
                    className={`dropdown-chevron ${openEquipos ? "open" : ""}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor" 
                      strokeWidth="2.5"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </>
              )}
            </button>
          </div>

          {/* 7. REPORTES */}
          <div className="sidebar-item-wrapper">
            <button
              className={`sidebar-nav-item ${
                activeTab === "reportes" ? "active" : ""
              }`}
              onClick={() => handleTabClick("reportes")}
              title="Reportes"
            >
              <span className="nav-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </span>
              {!isCollapsed && <span className="nav-text">Reportes</span>}
            </button>
          </div>
        </nav>

        {/* PIE DE PERFIL / USUARIO */}
        <div className="sidebar-profile-section">
          <div className="sidebar-user-card" title="Perfil de usuario">
            <div className="sidebar-user-avatar-wrapper">
              <img
                src="/user-avatar.png"
                alt="Avatar"
                className="sidebar-user-img"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="sidebar-avatar-fallback" style={{ display: "none" }}>
                {operador?.nombre ? operador.nombre.charAt(0).toUpperCase() : "J"}
              </div>
            </div>

            {!isCollapsed && (
              <div className="sidebar-user-meta">
                <strong className="sidebar-user-name">
                  {operador?.nombre || "Juan Guzman..."}
                </strong>
                <span className="sidebar-user-role">
                  {operador?.rol || "Administrador"}
                </span>
              </div>
            )}

            <button
              className="sidebar-logout-btn"
              onClick={onLogout}
              title="Cerrar sesión"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
