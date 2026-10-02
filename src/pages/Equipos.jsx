import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// Icono SVG de volquete
function IconoVolquete() {
  return (
    <svg viewBox="0 0 64 64" fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="32" height="32">
      <path d="M6 44h36v-9H10z" />
      <path d="M10 35V18h20l6 8v9" />
      <path d="M36 35h22v9" />
      <path d="M36 24h12l10 11" />
      <circle cx="16" cy="48" r="4" />
      <circle cx="44" cy="48" r="4" />
      <circle cx="52" cy="48" r="4" />
    </svg>
  );
}

// Icono SVG de excavadora
function IconoExcavadora() {
  return (
    <svg viewBox="0 0 64 64" fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="32" height="32">
      <path d="M8 44h24v-8H8z" />
      <path d="M8 36v-6h16v6" />
      <path d="M24 32l12-14" />
      <path d="M36 18l6 6-8 8" />
      <path d="M34 32l4 6" />
      <circle cx="14" cy="48" r="4" />
      <circle cx="26" cy="48" r="4" />
    </svg>
  );
}

export default function Equipos() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tipo = searchParams.get("tipo") || "volquete";

  const [equipos, setEquipos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    cargarEquipos();
  }, [tipo]);

  const cargarEquipos = async () => {
    setLoading(true);
    try {
      // === BACKEND REAL (cuando esté listo) ===
      // const res = await api.get(`/equipos?tipo=${tipo}&disponibles=true`);
      // setEquipos(res.data);

      // === MODO PRUEBA ===
      const datosPrueba = {
        volquete: [
          { codigo: "EOV-140", disponible: true },
          { codigo: "EOV-141", disponible: true },
          { codigo: "EOV-142", disponible: true },
          { codigo: "EOV-143", disponible: true },
          { codigo: "EOV-144", disponible: true },
          { codigo: "EOV-145", disponible: true },
          { codigo: "EOV-146", disponible: true },
          { codigo: "EOV-147", disponible: true },
          { codigo: "EOV-148", disponible: true },
        ],
        excavadora: [
          { codigo: "EEX-040", disponible: true },
          { codigo: "EEX-041", disponible: true },
          { codigo: "EEX-042", disponible: true },
          { codigo: "EEX-043", disponible: true },
        ],
      };
      setEquipos(datosPrueba[tipo] || []);
    } finally {
      setLoading(false);
    }
  };

  const seleccionarEquipo = (codigo) => {
    // Alterna la selección (click de nuevo deselecciona)
    setSeleccionado((prev) => (prev === codigo ? null : codigo));
  };

  const confirmarSeleccion = () => {
    if (!seleccionado) return;

    // Guardar en localStorage para que se sepa qué equipo está usando
    localStorage.setItem("equipoSeleccionado", seleccionado);
    localStorage.setItem("tipoEquipoSeleccionado", tipo);

    // Aquí luego llamarías al backend para bloquear el equipo:
    // await api.post(`/equipos/${seleccionado}/bloquear`, { operador: operador.nin });

    navigate("/menu-equipo"); // o donde corresponda
  };

  const volver = () => navigate("/tipo-equipo");
  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/login");
  };

  const titulo = tipo === "excavadora" ? "Excavadoras" : "Volquetes";

  return (
    <div className="equipos-container">

      <div className="equipos-background-decoration"></div>

      {/* BARRA SUPERIOR */}
      <header className="equipos-header">

        <div className="equipos-user-left">
          <div className="equipos-user-avatar">
            {operador.nombre ? operador.nombre.charAt(0).toUpperCase() : "O"}
          </div>
          <div className="equipos-user-info">
            <span className="equipos-user-label">OPERADOR</span>
            <strong>{operador.nombre || "Operador"}</strong>
            <span className="equipos-user-shift">
              <span className="status-dot"></span>
              Turno {operador.turno || "—"}
            </span>
          </div>
        </div>

        <div className="equipos-brand">
          <div className="equipos-brand-icon">
            <svg viewBox="0 0 64 52" fill="none">
              <path d="M4 46L24 8L31 17L15 46H4Z" fill="#F59E0B" />
              <path d="M25 46L43 15L60 46H48L42 34L35 46H25Z" fill="#F97316" />
              <path d="M24 8L31 17L36 10" stroke="#FDBA74" strokeWidth="4" />
            </svg>
          </div>
          <div className="equipos-brand-text">
            <h1>DISPATCH</h1>
            <span>SISTEMA DE GESTIÓN</span>
          </div>
        </div>

        <div className="equipos-datetime">
          <span className="equipos-datetime-date">{fechaActual}</span>
          <strong className="equipos-datetime-time">{horaActual}</strong>
        </div>

      </header>

      {/* CONTENIDO */}
      <main className="equipos-content">

        <div className="equipos-heading">
    
          <h2>
        <span className="equipos-icono-tipo">
        {tipo === "excavadora" ? <IconoExcavadora /> : <IconoVolquete />}
          </span>
         {titulo} <span>disponibles</span>
          </h2>
          <p>
            Selecciona el código del equipo que vas a utilizar.
            Al elegirlo, quedará bloqueado para otros operadores.
          </p>
        </div>

        {loading ? (
          <p className="equipos-loading">Cargando equipos...</p>
        ) : (
          <div className="equipos-grid">
            {equipos.map((eq) => (
              <button
                key={eq.codigo}
                className={`equipo-card ${
                  seleccionado === eq.codigo ? "is-selected" : ""
                } ${!eq.disponible ? "is-disabled" : ""}`}
                onClick={() => eq.disponible && seleccionarEquipo(eq.codigo)}
                disabled={!eq.disponible}
              >
                <span className="equipo-card-code">{eq.codigo}</span>
                {seleccionado === eq.codigo && (
                  <span className="equipo-card-check">✓</span>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="equipos-info">
          <div className="equipos-info-line"></div>
          <p>SOLO SE MUESTRAN EQUIPOS DISPONIBLES</p>
          <div className="equipos-info-line"></div>
        </div>

      </main>

      {/* PIE */}
      <footer className="equipos-footer">

        <button className="equipos-back" onClick={volver}>
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

        <button
          className="equipos-choose"
          onClick={confirmarSeleccion}
          disabled={!seleccionado}
        >
          <span>ESCOGER EQUIPO</span>
          <svg viewBox="0 0 24 24" fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </button>

      </footer>

    </div>
  );
}
