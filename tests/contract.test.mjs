import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const workerSource = await readFile(
  new URL("../src/scripts/slm.worker.ts", import.meta.url),
  "utf8"
);

test("the worker pins the public model and WebGPU runtime", () => {
  assert.match(workerSource, /onnx-community\/Qwen2\.5-0\.5B-Instruct/);
  assert.match(workerSource, /device:\s*"webgpu"/);
  assert.match(workerSource, /dtype:\s*"q4f16"/);
});

test("the output contract keeps bounded categories and priorities", () => {
  for (const value of [
    "soporte_tecnico",
    "facturacion",
    "consulta_comercial",
    "seguridad",
    "otro",
    "alta",
    "media",
    "baja"
  ]) {
    assert.match(workerSource, new RegExp(`"${value}"`));
  }
});

test("the worker validates direct output and recovers malformed output safely", () => {
  assert.match(workerSource, /validateClassification\(parseJsonObject\(generated\)\)/);
  assert.match(workerSource, /recoverClassification\(text\)/);
  assert.match(workerSource, /contractStatus: "recovered"/);
  assert.match(workerSource, /requiere_revision: true/);
  assert.match(workerSource, /La categoría está fuera del contrato/);
  assert.match(workerSource, /requiere_revision debe ser booleano/);
});
