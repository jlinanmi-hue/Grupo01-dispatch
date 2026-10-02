import { useState } from "react";

export default function MapasView() {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const puntosMapa = [
    {
      id: "acopio-filtro2",
      nombre: "ACOPIO FILTRO 2",
      tipo: "acopio",
      coord: "Lat: -11.1515, Long: -100.0001",
      cargadora: "EEX-043",
      volquetesEnCola: 2,
      x: 30,
      y: 35,
    },
    {
      id: "acopio-rampa10",
      nombre: "ACOPIO RAMPA 10",
      tipo: "acopio",
      coord: "Lat: -11.1528, Long: -100.0015",
      cargadora: "EEX-042",
      volquetesEnCola: 1,
      x: 22,
      y: 65,
    },
    {
      id: "acopio-relleno",
      nombre: "ACOPIO RELLENO",
      tipo: "acopio",
      coord: "Lat: -11.1505, Long: -100.0009",
      cargadora: "EEX-044",
      volquetesEnCola: 0,
      x: 48,
      y: 20,
    },
    {
      id: "plataforma-sur",
      nombre: "PLATAFORMA SUR",
      tipo: "plataforma",
      coord: "Lat: -11.1580, Long: -100.0080",
      operacion: "Descarga de Inadecuado",
      x: 75,
      y: 70,
    },
    {
      id: "plataforma-norte",
      nombre: "PLATAFORMA NORTE",
      tipo: "plataforma",
      coord: "Lat: -11.1490, Long: -100.0040",
      operacion: "Descarga de Relleno",
      x: 82,
      y: 30,
    },
    {
      id: "dme-botadero",
      nombre: "DME BOTADERO",
      tipo: "plataforma",
      coord: "Lat: -11.1620, Long: -100.0120",
      operacion: "Depósito de Material Excedente",
      x: 65,
      y: 85,
    },
  ];

  return (
    <div className="mapas-view-container">
      <div className="view-header">
        <div>
          <h2 className="view-title">Monitoreo Satelital y GPS de Rutas</h2>
          <p className="view-subtitle">
            Localización de Acopios, Plataformas de Vaciado y Frentes de Carguío
          </p>
        </div>
        <div className="mapas-legend">
          <span className="legend-item">
            <span className="legend-dot blue"></span> Acopios / Carguío
          </span>
          <span className="legend-item">
            <span className="legend-dot orange"></span> Plataformas / Descarga
          </span>
        </div>
      </div>

      <div className="mapa-interactive-wrapper">
        <div className="mapa-surface">
          {/* LÍNEAS DE RUTA VECTORIALES */}
          <svg className="mapa-routes-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M30 35 L50 50 L75 70"
              stroke="#3B82F6"
              strokeWidth="0.8"
              strokeDasharray="2,2"
              fill="none"
            />
            <path
              d="M22 65 L45 75 L65 85"
              stroke="#F59E0B"
              strokeWidth="0.8"
              strokeDasharray="2,2"
              fill="none"
            />
            <path
              d="M48 20 L65 25 L82 30"
              stroke="#3B82F6"
              strokeWidth="0.8"
              strokeDasharray="2,2"
              fill="none"
            />
          </svg>

          {/* PUNTOS DE INTERÉS EN EL MAPA */}
          {puntosMapa.map((p) => (
            <button
              key={p.id}
              className={`map-marker ${p.tipo} ${
                selectedPoint?.id === p.id ? "active-marker" : ""
              }`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onClick={() => setSelectedPoint(p)}
              title={p.nombre}
            >
              <span className="marker-pin">
                {p.tipo === "acopio" ? "⛏" : "🚜"}
              </span>
              <span className="marker-label">{p.nombre}</span>
            </button>
          ))}
        </div>

        {/* PANEL LATERAL DE DETALLES DEL PUNTO */}
        <div className="mapa-detail-sidebar">
          {selectedPoint ? (
            <div className="point-card">
              <span className={`point-type-tag ${selectedPoint.tipo}`}>
                {selectedPoint.tipo === "acopio" ? "Frente de Carguío" : "Punto de Descarga"}
              </span>
              <h3 className="point-title">{selectedPoint.nombre}</h3>
              <p className="point-coord">{selectedPoint.coord}</p>

              <div className="point-meta-list">
                {selectedPoint.cargadora && (
                  <div className="meta-row">
                    <span>Cargadora Asignada:</span>
                    <strong>{selectedPoint.cargadora}</strong>
                  </div>
                )}
                {selectedPoint.volquetesEnCola !== undefined && (
                  <div className="meta-row">
                    <span>Volquetes en Cola:</span>
                    <strong>{selectedPoint.volquetesEnCola} unidades</strong>
                  </div>
                )}
                {selectedPoint.operacion && (
                  <div className="meta-row">
                    <span>Actividad:</span>
                    <strong>{selectedPoint.operacion}</strong>
                  </div>
                )}
                <div className="meta-row">
                  <span>Estado de Ruta:</span>
                  <strong className="text-green">Despejada (Vel. máx 35 km/h)</strong>
                </div>
              </div>

              <button
                className="btn-select-point"
                onClick={() =>
                  alert(`Punto ${selectedPoint.nombre} seleccionado como origen/destino activo.`)
                }
              >
                Asignar a Ciclo Activo
              </button>
            </div>
          ) : (
            <div className="empty-point-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p>Haz clic en cualquier acopio o plataforma del mapa para ver telemetría y estado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
