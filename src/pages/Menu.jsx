import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomeView from "../modulos/home/HomeView";
import DashboardView from "../modulos/dashboard/DashboardView";
import OperacionesView from "../modulos/operaciones/OperacionesView";
import MapasView from "../modulos/mapas/MapasView";
import OperadoresView from "../modulos/operadores/OperadoresView";
import EquiposView from "../modulos/equipos/EquiposView";
import MantenimientoView from "../modulos/mantenimiento/MantenimientoView";
import ReportesView from "../modulos/reportes/ReportesView";
import MiCuentaView from "../modulos/cuenta/MiCuentaView";
import "../styles/Menu.css";

export default function Menu() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab activo desde URL si existe o default 'home'
  const tabFromUrl = searchParams.get("tab") || "home";
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [subOption, setSubOption] = useState(searchParams.get("sub") || null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Datos del operador
  const [operador, setOperador] = useState(() => {
    try {
      const stored = localStorage.getItem("operador");
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return {
      nombre: "Juan Guzman",
      rol: "Administrador",
      turno: "Día",
      nin: "70528452",
      correo: "j.guzman@mina-dispatch.pe",
      telefono: "+51 987 654 321",
    };
  });

  // Reloj en tiempo real
  const [fechaHora, setFechaHora] = useState(() => ({
    fecha: new Date().toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    hora: new Date().toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setFechaHora({
        fecha: new Date().toLocaleDateString("es-PE", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        hora: new Date().toLocaleTimeString("es-PE", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sincronizar activeTab con URL
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("tab", activeTab);
    if (subOption) params.set("sub", subOption);
    setSearchParams(params, { replace: true });
  }, [activeTab, subOption, setSearchParams]);

  // Manejador de navegación fluida
  const handleNavigate = (tab, sub = null) => {
    setActiveTab(tab);
    setSubOption(sub);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <MainLayout
      activeTab={activeTab}
      setActiveTab={(tab) => {
        setActiveTab(tab);
        setSubOption(null);
      }}
      subOption={subOption}
      onSelectSubOption={(sub) => setSubOption(sub)}
      operador={operador}
      onLogout={handleLogout}
      isCollapsed={isCollapsed}
      setIsCollapsed={setIsCollapsed}
      mobileOpen={mobileOpen}
      setMobileOpen={setMobileOpen}
      fechaHora={fechaHora}
    >
      {/* VISTAS MODULARES */}
      {activeTab === "home" && (
        <HomeView operador={operador} onNavigate={handleNavigate} />
      )}

      {activeTab === "dashboard" && (
        <DashboardView onNavigate={handleNavigate} />
      )}

      {activeTab === "operaciones" && (
        <OperacionesView
          initialSubOption={subOption || "ciclo"}
          onCycleCompleted={() => {
            // Notificación opcional o actualización de contadores
          }}
        />
      )}

      {activeTab === "mapas" && <MapasView />}

      {activeTab === "operadores" && <OperadoresView />}

      {activeTab === "equipos" && (
        <EquiposView
          filterType={subOption || "todos"}
        />
      )}

      {activeTab === "mantenimiento" && <MantenimientoView />}

      {activeTab === "reportes" && (
        <ReportesView initialCategory={subOption || "todos"} />
      )}

      {activeTab === "cuenta" && (
        <MiCuentaView
          operador={operador}
          onUpdateOperador={setOperador}
        />
      )}
    </MainLayout>
  );
}