import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({
  activeTab,
  setActiveTab,
  subOption,
  onSelectSubOption,
  operador,
  onLogout,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
  fechaHora,
  children,
}) {
  return (
    <div className={`velion-layout-root ${isCollapsed ? "sidebar-is-collapsed" : ""}`}>
      {/* 1. MENÚ LATERAL DESPLEGABLE EN EL LAYOUT */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        operador={operador}
        onLogout={onLogout}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onSelectSubOption={onSelectSubOption}
      />

      {/* 2. CONTENEDOR PRINCIPAL CON SCROLL INDEPENDIENTE */}
      <div className="velion-main-wrapper">
        <Navbar
          activeTab={activeTab}
          subOption={subOption}
          fechaHora={fechaHora}
          setMobileOpen={setMobileOpen}
        />

        <main className="velion-main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
