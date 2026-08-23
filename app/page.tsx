"use client";

import { useState } from "react";

const steps = [
  { label: "Incidente recibido", detail: "Hoy, 10:14", done: true },
  { label: "Datos de plataforma verificados", detail: "GPS, hora y pedido coinciden", done: true },
  { label: "Reparación en proceso", detail: "Respuesta antes del 26 de agosto", done: false },
];

export default function Home() {
  const [started, setStarted] = useState(false);
  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="REPARA, inicio"><span className="brand-mark">R</span><span>REPARA</span></a>
        <span className="demo-pill">DEMO · DATOS FICTICIOS</span>
      </header>
      <section className="hero" id="inicio">
        <div>
          <p className="eyebrow">REPARACIÓN PARA REPARTIDORES</p>
          <h1>Si sufriste una lesión trabajando, el proceso no termina en un rechazo.</h1>
          <p className="hero-copy">Verificamos el incidente con datos que la plataforma ya registró y te mostramos una ruta clara, con fecha límite y revisión humana cuando sea necesaria.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => setStarted(true)}>Reportar una lesión</button>
            <a className="text-link" href="#caso">Ver caso de ejemplo <span aria-hidden="true">→</span></a>
          </div>
          <p className="privacy-note"><span aria-hidden="true">◉</span> Tu reporte nunca afecta tu calificación ni antigüedad.</p>
        </div>
        <aside className="case-card" id="caso" aria-label="Caso ficticio de Víctor">
          <div className="case-card-head"><div><p className="small-label">CASO FICTICIO</p><h2>Víctor M.</h2></div><span className="status">EN PROCESO</span></div>
          <p className="case-summary">Lesión durante una entrega · CDMX</p>
          <div className="timeline">
            {steps.map((step) => <div className="timeline-row" key={step.label}><span className={step.done ? "dot done" : "dot"}>{step.done ? "✓" : "3"}</span><div><strong>{step.label}</strong><p>{step.detail}</p></div></div>)}
          </div>
          <div className="deadline"><span>Tiempo restante para respuesta</span><strong>2 días, 14 horas</strong></div>
        </aside>
      </section>
      <section className="principles" aria-label="Condiciones de REPARA">
        <article><span>01</span><h3>Solo datos existentes</h3><p>GPS, hora y estado del pedido. Sin vigilancia nueva.</p></article>
        <article><span>02</span><h3>Plazo fijo</h3><p>El silencio nunca funciona como una negativa.</p></article>
        <article><span>03</span><h3>Revisión con límites</h3><p>Solo casos no resueltos y con criterios registrados.</p></article>
      </section>
      {started && <div className="modal-backdrop" role="presentation" onMouseDown={() => setStarted(false)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(e) => e.stopPropagation()}><button className="close-button" onClick={() => setStarted(false)} aria-label="Cerrar">×</button><p className="eyebrow">NUEVO REPORTE</p><h2 id="modal-title">Cuéntanos qué pasó</h2><p>El formulario guiado estará disponible en la siguiente versión.</p><button className="primary-button" onClick={() => setStarted(false)}>Entendido</button></section></div>}
    </main>
  );
}
