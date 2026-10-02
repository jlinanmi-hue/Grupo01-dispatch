import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Operadores() {
  const [operadores, setOperadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    cargarOperadores();
  }, []);

  const cargarOperadores = async () => {
    try {
      const res = await api.get("/operadores");
      setOperadores(res.data);
    } catch (err) {
      console.error("Error:", err);
      // Datos de prueba
      setOperadores([
        { nin: "12345678", nombre: "Néstor Arroyo", turno: "Día", tipo: "Volquete" },
        { nin: "87654321", nombre: "Alejandro Arroyo", turno: "Noche", tipo: "Excavadora" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>OPERADORES</h2>

      {loading ? (
        <p>Cargando operadores...</p>
      ) : (
        <table style={styles.tabla}>
          <thead>
            <tr>
              <th style={styles.th}>NIN</th>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Turno</th>
              <th style={styles.th}>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {operadores.map((op) => (
              <tr key={op.nin}>
                <td style={styles.td}>{op.nin}</td>
                <td style={styles.td}>{op.nombre}</td>
                <td style={styles.td}>{op.turno}</td>
                <td style={styles.td}>{op.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={() => navigate("/equipos")} style={styles.volver}>
        Volver a Equipos
      </button>
    </div>
  );
}

const styles = {
  container: { maxWidth: "600px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" },
  titulo: { textAlign: "center", marginBottom: "20px" },
  tabla: { width: "100%", borderCollapse: "collapse" },
  th: { backgroundColor: "#f1c40f", padding: "10px", textAlign: "left", fontSize: "13px" },
  td: { padding: "10px", borderBottom: "1px solid #ddd", fontSize: "13px" },
  volver: {
    marginTop: "20px",
    padding: "10px",
    width: "100%",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};