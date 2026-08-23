import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("the repair flow labels simulated AI and protects worker worth", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /RESULTADO GENERADO POR IA · SIMULADO/);
  assert.match(page, /rating y antigüedad/);
  assert.match(page, /Solicitar revisión humana/);
  assert.match(page, /Fecha límite/);
});

test("the structured engine only checks existing platform facts", async () => {
  const engine = await readFile(new URL("../lib/repair-engine.ts", import.meta.url), "utf8");
  assert.match(engine, /gpsConfirmed/);
  assert.match(engine, /timestampConfirmed/);
  assert.match(engine, /activeDelivery/);
  assert.doesNotMatch(engine, /rating|creditScore|workerWorth/i);
});
