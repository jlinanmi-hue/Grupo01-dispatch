import { useState } from "react";

export default function ReportesView({ initialCategory = "todos" }) {
  const [filterCat, setFilterCat] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState("");

  // Datos reales basados en el Excel del PDF
  const reportesData = [
    {
      id: 1,
      equipo: "ECV-141",
      operador: "Alejandro Arroyo",
      fechaHora: "19/01/2026 08:33",
      origen: "ACOPIO B",
      latitud: "-11.151515",
      longitud: "-100.000000",
      enCola: "08:35",
      cargadora: "EEX-043",
      fase: "02.23.23",
      tipoMaterial: "RELLENO",
      inicioCarga: "08:40",
      finCarga: "08:43",
      destino: "PPO PLATAFORMA",
      inicioDescarga: "08:50",
      finDescarga: "08:52",
      tonelaje: "20 m³",
      horometroIni: "542",
      horometroFin: "550",
      kmIni: "48000",
      kmFin: "58000",
      combustible: "45 Gal",
      mantenimiento: "—",
      tipo: "volquetes",
    },
    {
      id: 2,
      equipo: "ECV-142",
      operador: "Bruno Arroyo",
      fechaHora: "19/01/2026 08:35",
      origen: "ACOPIO C",
      latitud: "-11.151520",
      longitud: "-100.000020",
      enCola: "08:43",
      cargadora: "EEX-042",
      fase: "02.01.09",
      tipoMaterial: "FUNDACIÓN",
      inicioCarga: "08:46",
      finCarga: "08:48",
      destino: "PLATAFORMA SUR",
      inicioDescarga: "08:55",
      finDescarga: "08:58",
      tonelaje: "17 m³",
      horometroIni: "605",
      horometroFin: "612",
      kmIni: "32000",
      kmFin: "32450",
      combustible: "—",
      mantenimiento: "—",
      tipo: "volquetes",
    },
    {
      id: 3,
      equipo: "ECV-143",
      operador: "Jhon Leturne",
      fechaHora: "19/01/2026 08:35",
      origen: "ACOPIO C",
      latitud: "-11.151520",
      longitud: "-100.000020",
      enCola: "08:43",
      cargadora: "EEX-042",
      fase: "02.01.09",
      tipoMaterial: "INADECUADO",
      inicioCarga: "08:46",
      finCarga: "08:48",
      destino: "DME",
      inicioDescarga: "08:59",
      finDescarga: "09:02",
      tonelaje: "17 m³",
      horometroIni: "485",
      horometroFin: "492",
      kmIni: "29000",
      kmFin: "29300",
      combustible: "—",
      mantenimiento: "—",
      tipo: "volquetes",
    },
    {
      id: 4,
      equipo: "ECV-144",
      operador: "Hector Casanova",
      fechaHora: "19/01/2026 08:35",
      origen: "ACOPIO C",
      latitud: "-11.151520",
      longitud: "-100.000020",
      enCola: "08:43",
      cargadora: "EEX-042",
      fase: "02.01.09",
      tipoMaterial: "FUNDACIÓN",
      inicioCarga: "08:46",
      finCarga: "08:48",
      destino: "PLATAFORMA 5",
      inicioDescarga: "08:56",
      finDescarga: "08:59",
      tonelaje: "17 m³",
      horometroIni: "715",
      horometroFin: "720",
      kmIni: "61000",
      kmFin: "61200",
      combustible: "50 Gal",
      mantenimiento: "PREVENTIVO",
      tipo: "mantenimiento",
    },
    {
      id: 5,
      equipo: "EEX-043",
      operador: "Néstor Alejandro Arroyo",
      fechaHora: "19/01/2026 08:30",
      origen: "ACOPIO FILTRO 2",
      latitud: "-11.151480",
      longitud: "-100.000010",
      enCola: "08:30",
      cargadora: "EEX-043 (Frente)",
      fase: "02.02.01",
      tipoMaterial: "RELLENO",
      inicioCarga: "08:35",
      finCarga: "08:39",
      destino: "FRENTE NORTE",
      inicioDescarga: "—",
      finDescarga: "—",
      tonelaje: "Despacho 20m³",
      horometroIni: "1418",
      horometroFin: "1424",
      kmIni: "—",
      kmFin: "—",
      combustible: "120 Gal",
      mantenimiento: "—",
      tipo: "excavadoras",
    },
  ];

  // Exportar reporte a archivo CSV / Excel
  const exportarAExcel = () => {
    const encabezados = [
      "EQUIPO",
      "OPERADOR",
      "FECHA/HORA",
      "ORIGEN",
      "LONGITUD",
      "LATITUD",
      "EN COLA",
      "CARGADORA",
      "FASE",
      "TIPO MATERIAL",
      "INICIO CARGA",
      "FIN CARGA",
      "DESTINO",
      "INICIO DESCARGA",
      "FIN DESCARGA",
      "TONELAJE",
      "HOROMETRO INICIAL",
      "HOROMETRO FINAL",
      "KILOMETRAJE INICIAL",
      "KILOMETRAJE FINAL",
      "COMBUSTIBLE",
      "MANTENIMIENTO",
    ];

    const filas = reportesData.map((r) => [
      r.equipo,
      `"${r.operador}"`,
      r.fechaHora,
      r.origen,
      r.longitud,
      r.latitud,
      r.enCola,
      r.cargadora,
      r.fase,
      r.tipoMaterial,
      r.inicioCarga,
      r.finCarga,
      r.destino,
      r.inicioDescarga,
      r.finDescarga,
      r.tonelaje,
      r.horometroIni,
      r.horometroFin,
      r.kmIni,
      r.kmFin,
      r.combustible,
      r.mantenimiento,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [encabezados.join(","), ...filas.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Reporte_Dispatch_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reportesFiltrados = reportesData.filter((r) => {
    const matchCat = filterCat === "todos" || r.tipo === filterCat;
    const matchSearch =
      r.equipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.operador.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.tipoMaterial.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="reportes-view-container">
      <div className="view-header">
        <div>
          <h2 className="view-title">Reportes Operativos en Tiempo Real</h2>
          <p className="view-subtitle">
            Base de datos sincronizada de acarreo, carguío y mantenimiento
          </p>
        </div>

        <div className="reportes-actions-top">
          <button className="btn-export-excel" onClick={exportarAExcel}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Exportar a Excel (.CSV)
          </button>
        </div>
      </div>

      {/* METRIC CARDS HEADER */}
      <div className="reportes-kpi-row">
        <div className="kpi-mini-card">
          <span className="kpi-label">Total Viajes</span>
          <strong className="kpi-val blue">48 Viajes</strong>
        </div>
        <div className="kpi-mini-card">
          <span className="kpi-label">Volumen Acumulado</span>
          <strong className="kpi-val orange">850 m³</strong>
        </div>
        <div className="kpi-mini-card">
          <span className="kpi-label">Combustible Despachado</span>
          <strong className="kpi-val">1,450 Gal</strong>
        </div>
        <div className="kpi-mini-card">
          <span className="kpi-label">Equipos Monitoreados</span>
          <strong className="kpi-val green">16 Activos</strong>
        </div>
      </div>

      {/* BARRA DE FILTROS */}
      <div className="reportes-filter-bar">
        <div className="filter-tabs">
          <button
            className={`filter-btn ${filterCat === "todos" ? "active" : ""}`}
            onClick={() => setFilterCat("todos")}
          >
            Todos los registros
          </button>
          <button
            className={`filter-btn ${filterCat === "volquetes" ? "active" : ""}`}
            onClick={() => setFilterCat("volquetes")}
          >
            Volquetes (Acarreo)
          </button>
          <button
            className={`filter-btn ${filterCat === "excavadoras" ? "active" : ""}`}
            onClick={() => setFilterCat("excavadoras")}
          >
            Excavadoras (Carguío)
          </button>
          <button
            className={`filter-btn ${filterCat === "mantenimiento" ? "active" : ""}`}
            onClick={() => setFilterCat("mantenimiento")}
          >
            Mantenimiento & Alertas
          </button>
        </div>

        <div className="search-input-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por equipo, operador, material..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABLA DE EXCEL DEL DISPATCH */}
      <div className="table-wrapper">
        <table className="dispatch-table">
          <thead>
            <tr>
              <th>EQUIPO</th>
              <th>OPERADOR</th>
              <th>FECHA/HORA</th>
              <th>ORIGEN</th>
              <th>EN COLA</th>
              <th>CARGADORA</th>
              <th>FASE</th>
              <th>MATERIAL</th>
              <th>CARGA</th>
              <th>DESTINO</th>
              <th>DESCARGA</th>
              <th>VOL.</th>
              <th>HORÓMETRO</th>
              <th>COMBUSTIBLE</th>
              <th>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {reportesFiltrados.map((item) => (
              <tr key={item.id}>
                <td>
                  <span className="badge-codigo">{item.equipo}</span>
                </td>
                <td className="cell-bold">{item.operador}</td>
                <td>{item.fechaHora}</td>
                <td>{item.origen}</td>
                <td>{item.enCola}</td>
                <td>
                  <span className="badge-cargadora">{item.cargadora}</span>
                </td>
                <td>{item.fase}</td>
                <td>
                  <span className={`badge-material ${item.tipoMaterial.toLowerCase()}`}>
                    {item.tipoMaterial}
                  </span>
                </td>
                <td>
                  {item.inicioCarga} - {item.finCarga}
                </td>
                <td>{item.destino}</td>
                <td>
                  {item.inicioDescarga} - {item.finDescarga}
                </td>
                <td>
                  <strong>{item.tonelaje}</strong>
                </td>
                <td>
                  {item.horometroIni} → {item.horometroFin}
                </td>
                <td>{item.combustible}</td>
                <td>
                  {item.mantenimiento !== "—" ? (
                    <span className="status-pill warning">{item.mantenimiento}</span>
                  ) : (
                    <span className="status-pill ok">OK</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


