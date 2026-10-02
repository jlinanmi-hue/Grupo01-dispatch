import { useState } from "react";

export default function OperacionesView({ initialSubOption = "ciclo", onCycleCompleted }) {
  const [subTab, setSubTab] = useState(initialSubOption);

  // Estados de Ciclo de Acarreo
  const [equipoActual, setEquipoActual] = useState("ECV-141");
  const [etapaCiclo, setEtapaCiclo] = useState("inicio"); // inicio o fin
  const [cicloData, setCicloData] = useState({
    origen: "",
    enColaOrigen: "",
    cargadora: "",
    fase: "",
    inicioCarga: "",
    finCarga: "",
    destino: "",
    enColaDestino: "",
    inicioDescarga: "",
    finDescarga: "",
    tonelaje: "20m3",
  });
  const [ciclosRegistrados, setCiclosRegistrados] = useState([]);

  // Estados de Horómetro
  const [tipoJornada, setTipoJornada] = useState("inicio"); // inicio o fin
  const [horometroValor, setHorometroValor] = useState("");
  const [kilometrajeValor, setKilometrajeValor] = useState("");
  const [horometroLogs, setHorometroLogs] = useState([
    { tipo: "Inicial", horometro: "542", km: "48,000", fecha: "Hoy 07:00 AM", equipo: "ECV-141" },
  ]);

  // Estados de Combustible
  const [galones, setGalones] = useState("");
  const [combustibleLogs, setCombustibleLogs] = useState([
    { galones: "45", equipo: "ECV-141", fecha: "Hoy 10:15 AM", cisterna: "CIS-01" },
  ]);

  // Estados de Mantenimiento
  const [tipoMantenimiento, setTipoMantenimiento] = useState("preventivo");
  const [observacionesMant, setObservacionesMant] = useState("");
  const [alertasMantenimiento, setAlertasMantenimiento] = useState([
    {
      equipo: "ECV-144",
      tipo: "Preventivo",
      observacion: "Cambio de aceite hidráulico y filtros programado.",
      fecha: "Hoy 08:30 AM",
    },
  ]);

  // Listas de datos según el PDF
  const origenes = [
    "DME",
    "ACOPIO FILTRO 2",
    "ACOPIO RAMPA 10",
    "ACOPIO RELLENO",
    "ACOPIO DAN",
    "ACOPIO PRINCIPAL",
  ];

  const destinos = [
    "PLATAFORMA 5",
    "PLATAFORMA NORTE",
    "PLATAFORMA ESTE",
    "PLATAFORMA SUR",
    "DME",
  ];

  const excavadoras = [
    "EEX-040",
    "EEX-041",
    "EEX-042",
    "EEX-043",
    "EEX-044",
    "EEX-045",
    "EEX-046",
    "EEX-047",
  ];

  const fases = [
    { codigo: "02.01.09", descripcion: "INADECUADO" },
    { codigo: "02.02.01", descripcion: "RELLENO" },
    { codigo: "02.23.03", descripcion: "RELLENO MURO" },
    { codigo: "03.23.03", descripcion: "RELLENO" },
    { codigo: "02.23.03", descripcion: "INCOMPETENTE" },
  ];

  // Helper timestamp
  const getHoraActual = () =>
    new Date().toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  // Manejo de botones de Ciclo
  const marcarEnColaOrigen = () => {
    setCicloData((prev) => ({ ...prev, enColaOrigen: getHoraActual() }));
  };

  const marcarInicioCarga = () => {
    setCicloData((prev) => ({ ...prev, inicioCarga: getHoraActual() }));
  };

  const marcarFinCarga = () => {
    const fin = getHoraActual();
    setCicloData((prev) => ({ ...prev, finCarga: fin }));
    // Pasa automáticamente a FIN DE CICLO DE ACARREO como indica el PDF
    setEtapaCiclo("fin");
  };

  const marcarEnColaDestino = () => {
    setCicloData((prev) => ({ ...prev, enColaDestino: getHoraActual() }));
  };

  const marcarInicioDescarga = () => {
    setCicloData((prev) => ({ ...prev, inicioDescarga: getHoraActual() }));
  };

  const marcarFinDescarga = () => {
    const finDesc = getHoraActual();
    const nuevoCiclo = {
      id: Date.now(),
      equipo: equipoActual,
      origen: cicloData.origen || "ACOPIO FILTRO 2",
      cargadora: cicloData.cargadora || "EEX-043",
      fase: cicloData.fase || "02.01.09 - INADECUADO",
      inicioCarga: cicloData.inicioCarga || "08:40",
      finCarga: cicloData.finCarga || "08:43",
      destino: cicloData.destino || "PLATAFORMA SUR",
      inicioDescarga: cicloData.inicioDescarga || "08:50",
      finDescarga: finDesc,
      tonelaje: cicloData.tonelaje || "20m3",
      horaRegistro: getHoraActual(),
    };

    setCiclosRegistrados((prev) => [nuevoCiclo, ...prev]);
    if (onCycleCompleted) onCycleCompleted(nuevoCiclo);

    // Reiniciar ciclo para el siguiente viaje
    setCicloData({
      origen: "",
      enColaOrigen: "",
      cargadora: "",
      fase: "",
      inicioCarga: "",
      finCarga: "",
      destino: "",
      enColaDestino: "",
      inicioDescarga: "",
      finDescarga: "",
      tonelaje: "20m3",
    });
    setEtapaCiclo("inicio");
    alert("¡Ciclo de acarreo completado y registrado exitosamente en la base de datos!");
  };

  // Guardar Horómetro
  const guardarHorometro = (e) => {
    e.preventDefault();
    if (!horometroValor && !kilometrajeValor) return;
    const nuevoLog = {
      tipo: tipoJornada === "inicio" ? "Inicial" : "Final",
      horometro: horometroValor || "—",
      km: kilometrajeValor || "—",
      fecha: `${getHoraActual()}`,
      equipo: equipoActual,
    };
    setHorometroLogs((prev) => [nuevoLog, ...prev]);
    setHorometroValor("");
    setKilometrajeValor("");
    alert(`Horómetro / Kilometraje (${nuevoLog.tipo}) guardado exitosamente.`);
  };

  // Guardar Combustible
  const guardarCombustible = (e) => {
    e.preventDefault();
    if (!galones) return;
    const nuevo = {
      galones,
      equipo: equipoActual,
      fecha: `Hoy ${getHoraActual()}`,
      cisterna: "CIS-01",
    };
    setCombustibleLogs((prev) => [nuevo, ...prev]);
    setGalones("");
    alert(`Abastecimiento de ${galones} Galones registrado.`);
  };

  // Guardar Mantenimiento
  const guardarMantenimiento = (e) => {
    e.preventDefault();
    if (!observacionesMant.trim()) return;
    const nuevaAlerta = {
      equipo: equipoActual,
      tipo: tipoMantenimiento === "preventivo" ? "Preventivo" : "Correctivo",
      observacion: observacionesMant,
      fecha: `Hoy ${getHoraActual()}`,
    };
    setAlertasMantenimiento((prev) => [nuevaAlerta, ...prev]);
    setObservacionesMant("");
    alert(
      `ALERTA ENVIADA A MONITOREO WEB: Equipo ${equipoActual} en Mantenimiento ${nuevaAlerta.tipo}.`
    );
  };

  return (
    <div className="operaciones-container">
      {/* HEADER DE OPERACIONES */}
      <div className="view-header">
        <div>
          <h2 className="view-title">Módulo de Operaciones</h2>
          <p className="view-subtitle">
            Flujo de trabajo de campo según especificación técnica (PDF)
          </p>
        </div>

        {/* SELECTOR DE EQUIPO OPERATIVO */}
        <div className="operaciones-equipo-selector">
          <span className="selector-label">Equipo Activo:</span>
          <select
            value={equipoActual}
            onChange={(e) => setEquipoActual(e.target.value)}
            className="equipo-dropdown"
          >
            <optgroup label="Volquetes">
              <option value="ECV-140">ECV-140 (Volquete)</option>
              <option value="ECV-141">ECV-141 (Volquete)</option>
              <option value="ECV-142">ECV-142 (Volquete)</option>
              <option value="ECV-143">ECV-143 (Volquete)</option>
              <option value="ECV-144">ECV-144 (Volquete)</option>
            </optgroup>
            <optgroup label="Excavadoras">
              <option value="EEX-040">EEX-040 (Excavadora)</option>
              <option value="EEX-041">EEX-041 (Excavadora)</option>
              <option value="EEX-042">EEX-042 (Excavadora)</option>
            </optgroup>
          </select>
        </div>
      </div>

      {/* PESTAÑAS SECUNDARIAS */}
      <div className="operaciones-tabs-bar">
        <button
          className={`op-tab-btn ${subTab === "ciclo" ? "active" : ""}`}
          onClick={() => setSubTab("ciclo")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          Ciclo de Acarreo / Despacho
        </button>

        <button
          className={`op-tab-btn ${subTab === "horometro" ? "active" : ""}`}
          onClick={() => setSubTab("horometro")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Horómetro / Kilometraje
        </button>

        <button
          className={`op-tab-btn ${subTab === "combustible" ? "active" : ""}`}
          onClick={() => setSubTab("combustible")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 2v20" />
            <path d="M19 13V7a2 2 0 0 0-2-2H7" />
            <path d="M7 15h12a2 2 0 0 0 2-2V9" />
          </svg>
          Combustible
        </button>

        <button
          className={`op-tab-btn ${subTab === "mantenimiento" ? "active" : ""}`}
          onClick={() => setSubTab("mantenimiento")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          Mantenimiento
        </button>
      </div>

      {/* CONTENIDO SEGÚN SUBTAB */}
      <div className="operaciones-body">
        {/* =========================================
            1. CICLO DE ACARREO / DESPACHO
        ========================================= */}
        {subTab === "ciclo" && (
          <div className="ciclo-workflow-card">
            <div className="ciclo-stage-indicator">
              <div className={`stage-step ${etapaCiclo === "inicio" ? "active" : "done"}`}>
                <span className="step-num">1</span>
                <div>
                  <strong>INICIO DE CICLO</strong>
                  <span>Origen y Carguío</span>
                </div>
              </div>
              <div className="stage-arrow">→</div>
              <div className={`stage-step ${etapaCiclo === "fin" ? "active" : ""}`}>
                <span className="step-num">2</span>
                <div>
                  <strong>FIN DE CICLO</strong>
                  <span>Destino y Descarga</span>
                </div>
              </div>
            </div>

            {/* ETAPA 1: INICIO DE CICLO */}
            {etapaCiclo === "inicio" ? (
              <div className="ciclo-panel">
                <h3 className="panel-title">Mapeo de Inicio de Ciclo de Acarreo</h3>
                <p className="panel-hint">
                  Selecciona origen, cargadora y fase. Registra timestamps de cola y carga.
                </p>

                <div className="ciclo-grid-actions">
                  {/* ORIGEN */}
                  <div className="action-box">
                    <label>1. ORIGEN (Acopio)</label>
                    <div className="chips-grid">
                      {origenes.map((orig) => (
                        <button
                          key={orig}
                          type="button"
                          className={`selection-chip ${
                            cicloData.origen === orig ? "selected" : ""
                          }`}
                          onClick={() => setCicloData({ ...cicloData, origen: orig })}
                        >
                          {orig}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* EN COLA */}
                  <div className="action-box">
                    <label>2. EN COLA (Tiempo Real)</label>
                    <button
                      type="button"
                      className={`btn-time-stamp ${cicloData.enColaOrigen ? "stamped" : ""}`}
                      onClick={marcarEnColaOrigen}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {cicloData.enColaOrigen
                        ? `Registrado: ${cicloData.enColaOrigen}`
                        : "Marcar EN COLA"}
                    </button>
                  </div>

                  {/* CARGADORA */}
                  <div className="action-box">
                    <label>3. CARGADORA (Excavadora)</label>
                    <div className="chips-grid">
                      {excavadoras.slice(0, 6).map((exc) => (
                        <button
                          key={exc}
                          type="button"
                          className={`selection-chip ${
                            cicloData.cargadora === exc ? "selected" : ""
                          }`}
                          onClick={() => setCicloData({ ...cicloData, cargadora: exc })}
                        >
                          {exc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* FASE Y MATERIAL */}
                  <div className="action-box">
                    <label>4. FASE & MATERIAL</label>
                    <div className="fases-list">
                      {fases.map((f) => (
                        <button
                          key={f.codigo + f.descripcion}
                          type="button"
                          className={`fase-btn ${
                            cicloData.fase === `${f.codigo} - ${f.descripcion}`
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            setCicloData({
                              ...cicloData,
                              fase: `${f.codigo} - ${f.descripcion}`,
                            })
                          }
                        >
                          <strong>{f.codigo}</strong>
                          <span>{f.descripcion}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* INICIO DE CARGA */}
                  <div className="action-box">
                    <label>5. INICIO DE CARGA</label>
                    <button
                      type="button"
                      className={`btn-time-stamp ${cicloData.inicioCarga ? "stamped" : ""}`}
                      onClick={marcarInicioCarga}
                    >
                      {cicloData.inicioCarga
                        ? `Registrado: ${cicloData.inicioCarga}`
                        : "Marcar INICIO DE CARGA"}
                    </button>
                  </div>

                  {/* FIN DE CARGA */}
                  <div className="action-box highlight">
                    <label>6. FIN DE CARGA (Pasa a Destino)</label>
                    <button
                      type="button"
                      className="btn-next-stage"
                      onClick={marcarFinCarga}
                      disabled={!cicloData.origen}
                    >
                      Marcar FIN DE CARGA y Continuar →
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* ETAPA 2: FIN DE CICLO */
              <div className="ciclo-panel">
                <h3 className="panel-title">Mapeo de Fin de Ciclo de Acarreo (Descarga)</h3>
                <p className="panel-hint">
                  Selecciona el destino y registra los tiempos de arribo y descarga.
                </p>

                <div className="ciclo-grid-actions">
                  {/* DESTINO */}
                  <div className="action-box">
                    <label>1. DESTINO (Plataforma)</label>
                    <div className="chips-grid">
                      {destinos.map((dest) => (
                        <button
                          key={dest}
                          type="button"
                          className={`selection-chip ${
                            cicloData.destino === dest ? "selected" : ""
                          }`}
                          onClick={() => setCicloData({ ...cicloData, destino: dest })}
                        >
                          {dest}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* EN COLA DESTINO */}
                  <div className="action-box">
                    <label>2. EN COLA (Descarga)</label>
                    <button
                      type="button"
                      className={`btn-time-stamp ${
                        cicloData.enColaDestino ? "stamped" : ""
                      }`}
                      onClick={marcarEnColaDestino}
                    >
                      {cicloData.enColaDestino
                        ? `Registrado: ${cicloData.enColaDestino}`
                        : "Marcar EN COLA"}
                    </button>
                  </div>

                  {/* INICIO DESCARGA */}
                  <div className="action-box">
                    <label>3. INICIO DE DESCARGA</label>
                    <button
                      type="button"
                      className={`btn-time-stamp ${
                        cicloData.inicioDescarga ? "stamped" : ""
                      }`}
                      onClick={marcarInicioDescarga}
                    >
                      {cicloData.inicioDescarga
                        ? `Registrado: ${cicloData.inicioDescarga}`
                        : "Marcar INICIO DE DESCARGA"}
                    </button>
                  </div>

                  {/* FIN DESCARGA Y GUARDAR */}
                  <div className="action-box highlight-orange">
                    <label>4. FIN DE DESCARGA (Cerrar Viaje)</label>
                    <button
                      type="button"
                      className="btn-complete-cycle"
                      onClick={marcarFinDescarga}
                      disabled={!cicloData.destino}
                    >
                      ✓ Finalizar Viaje y Guardar en Excel
                    </button>
                  </div>
                </div>

                <div className="volver-etapa-wrap">
                  <button
                    type="button"
                    className="btn-link"
                    onClick={() => setEtapaCiclo("inicio")}
                  >
                    ← Volver a etapa de inicio
                  </button>
                </div>
              </div>
            )}

            {/* REGISTRO DE VIAJES DE LA SESIÓN */}
            {ciclosRegistrados.length > 0 && (
              <div className="sesion-ciclos-box" style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #E2E8F0" }}>
                <h4 style={{ margin: "0 0 12px", color: "#0F172A", fontSize: "15px" }}>
                  Viajes Completados en Esta Sesión ({ciclosRegistrados.length})
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {ciclosRegistrados.map((c) => (
                    <div
                      key={c.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "#F8FAFC",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        fontSize: "12.5px",
                      }}
                    >
                      <span>
                        <strong>{c.equipo}</strong> · {c.origen} → {c.destino} ({c.fase})
                      </span>
                      <span style={{ color: "#059669", fontWeight: 700 }}>
                        {c.horaRegistro} · {c.tonelaje}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================
            2. HORÓMETRO / KILOMETRAJE
        ========================================= */}
        {subTab === "horometro" && (
          <div className="op-card-section">
            <div className="op-card-form">
              <h3>Registro de Horómetro y Kilometraje</h3>
              <p className="section-instruction">
                Este menú se utiliza 2 veces por sesión: Inicio de jornada y Fin de jornada.
              </p>

              <div className="jornada-toggle">
                <button
                  type="button"
                  className={`toggle-btn ${tipoJornada === "inicio" ? "active" : ""}`}
                  onClick={() => setTipoJornada("inicio")}
                >
                  Inicio de Jornada
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${tipoJornada === "fin" ? "active" : ""}`}
                  onClick={() => setTipoJornada("fin")}
                >
                  Fin de Jornada
                </button>
              </div>

              <form onSubmit={guardarHorometro} className="horometro-form">
                <div className="form-row">
                  <div className="input-group">
                    <label>Valor del Horómetro (Horas)</label>
                    <input
                      type="number"
                      placeholder="Ej. 550"
                      value={horometroValor}
                      onChange={(e) => setHorometroValor(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Valor del Kilometraje (Km)</label>
                    <input
                      type="number"
                      placeholder="Ej. 58000"
                      value={kilometrajeValor}
                      onChange={(e) => setKilometrajeValor(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary-orange">
                  Guardar Horómetro {tipoJornada === "inicio" ? "Inicial" : "Final"}
                </button>
              </form>
            </div>

            {/* TABLA DE REGISTROS RECIENTES */}
            <div className="op-card-history">
              <h4>Historial de la jornada</h4>
              <ul className="history-list">
                {horometroLogs.map((log, i) => (
                  <li key={i} className="history-item">
                    <div>
                      <strong>Horómetro {log.tipo}</strong>
                      <span>{log.equipo} · {log.fecha}</span>
                    </div>
                    <div className="history-values">
                      <span className="value-pill">{log.horometro} hrs</span>
                      <span className="value-pill">{log.km} km</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* =========================================
            3. COMBUSTIBLE
        ========================================= */}
        {subTab === "combustible" && (
          <div className="op-card-section">
            <div className="op-card-form">
              <h3>Abastecimiento de Combustible</h3>
              <p className="section-instruction">
                Se registra cada vez que la cisterna abastece al equipo. Se sincroniza con la web.
              </p>

              <form onSubmit={guardarCombustible} className="combustible-form">
                <div className="input-group">
                  <label>Cantidad en Galones (Gal)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ingrese galones..."
                    value={galones}
                    onChange={(e) => setGalones(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Cisterna Abastecedora</label>
                  <input type="text" defaultValue="CIS-01 (Cisterna Principal)" readOnly />
                </div>

                <button type="submit" className="btn-primary-orange">
                  Guardar Abastecimiento
                </button>
              </form>
            </div>

            <div className="op-card-history">
              <h4>Abastecimientos Recientes</h4>
              <ul className="history-list">
                {combustibleLogs.map((log, i) => (
                  <li key={i} className="history-item">
                    <div>
                      <strong>{log.equipo}</strong>
                      <span>{log.fecha} · {log.cisterna}</span>
                    </div>
                    <div className="history-values">
                      <span className="value-pill orange">{log.galones} Gal</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* =========================================
            4. MANTENIMIENTO
        ========================================= */}
        {subTab === "mantenimiento" && (
          <div className="op-card-section">
            <div className="op-card-form">
              <h3>Reporte de Mantenimiento</h3>
              <p className="section-instruction">
                Emite una alerta inmediata al centro de control web indicando que el equipo está en mantenimiento.
              </p>

              <div className="jornada-toggle">
                <button
                  type="button"
                  className={`toggle-btn ${
                    tipoMantenimiento === "preventivo" ? "active" : ""
                  }`}
                  onClick={() => setTipoMantenimiento("preventivo")}
                >
                  Preventivo
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${
                    tipoMantenimiento === "correctivo" ? "active" : ""
                  }`}
                  onClick={() => setTipoMantenimiento("correctivo")}
                >
                  Correctivo
                </button>
              </div>

              <form onSubmit={guardarMantenimiento} className="mantenimiento-form">
                <div className="input-group">
                  <label>Observaciones y motivo detallado</label>
                  <textarea
                    rows={4}
                    placeholder="Detalle el motivo por el cual están realizando el mantenimiento..."
                    value={observacionesMant}
                    onChange={(e) => setObservacionesMant(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary-orange">
                  Enviar Alerta a Monitoreo Web
                </button>
              </form>
            </div>

            <div className="op-card-history">
              <h4>Alertas de Mantenimiento Activas</h4>
              <ul className="history-list">
                {alertasMantenimiento.map((al, i) => (
                  <li key={i} className="history-item alert-border">
                    <div>
                      <strong className="alert-title">
                        {al.equipo} en Mant. {al.tipo}
                      </strong>
                      <p className="alert-desc">{al.observacion}</p>
                      <span className="alert-date">{al.fecha}</span>
                    </div>
                    <span className="badge-warning">Activo</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


