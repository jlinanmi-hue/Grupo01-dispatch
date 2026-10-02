import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import TipoEquipo from "./pages/TipoEquipo";
import Equipos from "./pages/Equipos";
import Operadores from "./pages/Operadores";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/tipo-equipo" element={<TipoEquipo />} />
        <Route path="/equipos" element={<Equipos />} />
        <Route path="/operadores" element={<Operadores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;