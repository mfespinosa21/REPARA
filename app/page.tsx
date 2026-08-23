"use client";

import { FormEvent, useState } from "react";
import { evaluateFictionalReport } from "../lib/repair-engine";

type Screen = "home" | "form" | "checking" | "result";
type Report = { order: string; date: string; injury: string; details: string; consent: boolean };

const initialReport: Report = { order: "MX-48291", date: "2026-08-21", injury: "", details: "", consent: false };
const repairSteps = [
  { label: "Incidente recibido", detail: "21 ago · 10:14", state: "done" },
  { label: "Datos verificados", detail: "GPS, hora y pedido coinciden", state: "done" },
  { label: "Reparación propuesta", detail: "Apoyo inmediato y seguimiento", state: "active" },
  { label: "Cierre o revisión", detail: "Tú decides si necesitas escalar", state: "next" },
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [report, setReport] = useState<Report>(initialReport);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const outcome = evaluateFictionalReport(report.order);

  function update<K extends keyof Report>(key: K, value: Report[K]) {
    setReport((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  function submitReport(event: FormEvent) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!/^MX-\d{5}$/.test(report.order)) next.order = "Usa el formato MX-12345.";
    if (!report.date) next.date = "Selecciona la fecha del incidente.";
    if (!report.injury) next.injury = "Selecciona el tipo de lesión.";
    if (report.details.trim().length < 20) next.details = "Escribe al menos 20 caracteres.";
    if (report.details.length > 300) next.details = "El máximo es 300 caracteres.";
    if (!report.consent) next.consent = "Confirma el uso de los datos existentes.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setScreen("checking");
    window.setTimeout(() => setScreen("result"), 1200);
  }

  return (
    <main className="app-shell">
      <header className="topbar"><button className="brand brand-button" onClick={() => setScreen("home")} aria-label="REPARA, inicio"><span className="brand-mark">R</span><span>REPARA</span></button><span className="demo-pill">DEMO · DATOS FICTICIOS</span></header>

      {screen === "home" && <>
        <section className="hero" id="inicio">
          <div><p className="eyebrow">REPARACIÓN PARA REPARTIDORES</p><h1>Si sufriste una lesión trabajando, el proceso no termina en un rechazo.</h1><p className="hero-copy">Verificamos el incidente con datos que la plataforma ya registró y te mostramos una ruta clara, con fecha límite y revisión humana cuando sea necesaria.</p><div className="hero-actions"><button className="primary-button" onClick={() => setScreen("form")}>Reportar una lesión</button><a className="text-link" href="#caso">Ver caso de ejemplo <span aria-hidden="true">→</span></a></div><p className="privacy-note"><span aria-hidden="true">◉</span> Tu reporte nunca afecta tu calificación ni antigüedad.</p></div>
          <aside className="case-card" id="caso" aria-label="Caso ficticio de Víctor"><div className="case-card-head"><div><p className="small-label">CASO FICTICIO</p><h2>Víctor M.</h2></div><span className="status">EN PROCESO</span></div><p className="case-summary">Lesión durante una entrega · CDMX</p><div className="timeline">{repairSteps.slice(0,3).map((step, index) => <div className="timeline-row" key={step.label}><span className={index < 2 ? "dot done" : "dot"}>{index < 2 ? "✓" : "3"}</span><div><strong>{step.label}</strong><p>{step.detail}</p></div></div>)}</div><div className="deadline"><span>Tiempo restante para respuesta</span><strong>2 días, 14 horas</strong></div></aside>
        </section>
        <section className="principles" aria-label="Condiciones de REPARA"><article><span>01</span><h3>Solo datos existentes</h3><p>GPS, hora y estado del pedido. Sin vigilancia nueva.</p></article><article><span>02</span><h3>Plazo fijo</h3><p>El silencio nunca funciona como una negativa.</p></article><article><span>03</span><h3>Revisión con límites</h3><p>Solo casos no resueltos y con criterios registrados.</p></article></section>
      </>}

      {screen === "form" && <section className="flow-page"><button className="back-link" onClick={() => setScreen("home")}>← Regresar</button><div className="flow-grid"><div><p className="eyebrow">PASO 1 DE 3</p><h1 className="flow-title">Reporta tu lesión</h1><p className="flow-copy">Usaremos únicamente datos que la plataforma ya tiene para comprobar que estabas realizando una entrega.</p><div className="shield-box"><strong>Este proceso está separado de tu perfil.</strong><p>Nada de lo que escribas puede modificar tu rating, antigüedad o acceso a pedidos.</p></div></div><form className="report-form" onSubmit={submitReport} noValidate><label>Número de pedido<span>Ejemplo: MX-48291</span><input value={report.order} onChange={(e) => update("order", e.target.value.toUpperCase().slice(0,8))} maxLength={8} aria-invalid={!!errors.order}/>{errors.order && <em>{errors.order}</em>}</label><label>Fecha del incidente<input type="date" value={report.date} max="2026-08-23" onChange={(e) => update("date", e.target.value)} aria-invalid={!!errors.date}/>{errors.date && <em>{errors.date}</em>}</label><label>Tipo de lesión<select value={report.injury} onChange={(e) => update("injury", e.target.value)} aria-invalid={!!errors.injury}><option value="">Selecciona una opción</option><option>Caída o golpe</option><option>Accidente vial</option><option>Lesión por carga</option><option>Otra lesión</option></select>{errors.injury && <em>{errors.injury}</em>}</label><label>¿Qué pasó?<span>{report.details.length}/300</span><textarea rows={4} maxLength={300} placeholder="Describe brevemente el incidente..." value={report.details} onChange={(e) => update("details", e.target.value)} aria-invalid={!!errors.details}/>{errors.details && <em>{errors.details}</em>}</label><label className="check-label"><input type="checkbox" checked={report.consent} onChange={(e) => update("consent", e.target.checked)}/><span>Autorizo verificar GPS, hora y estado de este pedido.</span></label>{errors.consent && <em>{errors.consent}</em>}<button className="primary-button" type="submit">Verificar incidente</button><p className="form-foot">No se guardan datos reales en esta demostración.</p></form></div></section>}

      {screen === "checking" && <section className="checking-screen" aria-live="polite"><div className="loader">R</div><p className="eyebrow">ANÁLISIS SIMULADO</p><h1 className="flow-title">Verificando datos existentes…</h1><p>Comparamos el pedido con GPS, hora y estado registrados por la plataforma.</p></section>}

      {screen === "result" && <section className="result-page"><div className="result-heading"><div><p className="eyebrow">CASO RP-2026-0842 · FICTICIO</p><h1 className="flow-title">{outcome.verified ? "Tu incidente fue verificado." : "Necesitamos revisar tu caso."}</h1><p className="flow-copy">{outcome.verified ? `Coincidieron ${outcome.matchedFacts.join(", ")}. Ya tienes una ruta de reparación y una fecha límite.` : "No encontramos suficientes datos automáticos. Tu caso pasa a revisión con criterios fijos."}</p></div><span className="verified-badge">{outcome.verified ? "✓ VERIFICADO" : "REVISIÓN"}</span></div><div className="result-grid"><article className="result-card"><p className="small-label">RESULTADO GENERADO POR IA · SIMULADO</p><h2>{outcome.verified ? "Reparación automática propuesta" : "Revisión humana acotada"}</h2><ul className="remedy-list"><li><span>1</span><div><strong>Apoyo inmediato</strong><p>Activación del protocolo de gastos médicos.</p></div></li><li><span>2</span><div><strong>Seguimiento del caso</strong><p>Confirmación dentro de un máximo de 72 horas.</p></div></li><li><span>3</span><div><strong>Protección de tu perfil</strong><p>El incidente queda aislado de rating y antigüedad.</p></div></li></ul><div className="result-actions"><button className="primary-button" onClick={() => alert("Reparación aceptada. Demo ficticia.")}>Aceptar reparación</button><button className="secondary-button" onClick={() => alert("Caso enviado a revisión con criterios fijos. Demo ficticia.")}>Solicitar revisión humana</button></div></article><aside className="case-card compact"><h2>Ruta del caso</h2><div className="timeline">{repairSteps.map((step, index) => <div className="timeline-row" key={step.label}><span className={step.state === "done" ? "dot done" : "dot"}>{step.state === "done" ? "✓" : index + 1}</span><div><strong>{step.label}</strong><p>{step.detail}</p></div></div>)}</div><div className="deadline"><span>Fecha límite</span><strong>{outcome.deadline}</strong></div></aside></div><button className="back-link final-back" onClick={() => { setReport(initialReport); setScreen("home"); }}>Iniciar de nuevo</button></section>}
    </main>
  );
}
