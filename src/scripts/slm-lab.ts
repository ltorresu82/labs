const webgpuState = document.querySelector<HTMLElement>("#webgpu-state");
const loadButton = document.querySelector<HTMLButtonElement>("#load-model");
const runButton = document.querySelector<HTMLButtonElement>("#run-classification");
const requestText = document.querySelector<HTMLTextAreaElement>("#request-text");
const modelStatus = document.querySelector<HTMLElement>("#model-status");
const progress = document.querySelector<HTMLProgressElement>("#model-progress");
const progressValue = document.querySelector<HTMLOutputElement>("#model-progress-value");
const output = document.querySelector<HTMLElement>("#classification-output code");
const outputState = document.querySelector<HTMLElement>("#output-state");
const runTime = document.querySelector<HTMLElement>("#run-time");
const sampleButtons = document.querySelectorAll<HTMLButtonElement>("[data-sample]");

type WorkerMessage =
  | { type: "progress"; progress: number; status: string }
  | { type: "ready" }
  | {
      type: "result";
      payload: unknown;
      elapsedMs: number;
      contractStatus: "direct" | "recovered";
    }
  | { type: "error"; message: string };

let worker: Worker | null = null;
let modelReady = false;

const hasWebGpu = "gpu" in navigator;

if (webgpuState && loadButton) {
  webgpuState.textContent = hasWebGpu ? "WebGPU disponible" : "WebGPU no disponible";
  webgpuState.dataset.state = hasWebGpu ? "ready" : "error";
  loadButton.disabled = !hasWebGpu;
}

for (const button of sampleButtons) {
  button.addEventListener("click", () => {
    if (requestText) requestText.value = button.dataset.sample ?? "";
  });
}

loadButton?.addEventListener("click", () => {
  if (modelReady) return;
  ensureWorker();
  setLoadingState("Solicitando los pesos del modelo…", 1);
  loadButton.disabled = true;
  worker?.postMessage({ type: "load" });
});

runButton?.addEventListener("click", () => {
  const text = requestText?.value.trim() ?? "";
  if (!worker || !modelReady || !text) return;

  runButton.disabled = true;
  runButton.textContent = "Clasificando…";
  setOutputState("neutral", "El modelo está generando una respuesta local.");
  worker.postMessage({ type: "classify", text });
});

function ensureWorker() {
  if (worker) return;
  worker = new Worker(new URL("./slm.worker.ts", import.meta.url), {
    type: "module"
  });
  worker.addEventListener("message", handleWorkerMessage);
  worker.addEventListener("error", () => {
    setFailure("El proceso local se detuvo. Recarga la página e inténtalo nuevamente.");
  });
}

function handleWorkerMessage(event: MessageEvent<WorkerMessage>) {
  const message = event.data;

  if (message.type === "progress") {
    setLoadingState(message.status, message.progress);
    return;
  }

  if (message.type === "ready") {
    modelReady = true;
    setLoadingState("Modelo preparado y conservado por el navegador.", 100);
    if (loadButton) {
      loadButton.textContent = "Modelo preparado";
      loadButton.disabled = true;
    }
    if (runButton) runButton.disabled = false;
    return;
  }

  if (message.type === "result") {
    if (output) output.textContent = JSON.stringify(message.payload, null, 2);
    if (runTime) runTime.textContent = `${Math.round(message.elapsedMs)} ms`;
    if (runButton) {
      runButton.disabled = false;
      runButton.textContent = "Ejecutar clasificación";
    }
    if (message.contractStatus === "direct") {
      setOutputState("success", "Contrato válido. El SLM respetó el esquema esperado.");
    } else {
      setOutputState(
        "warning",
        "Contrato recuperado. El SLM no respetó el formato y el adaptador aplicó reglas acotadas; requiere revisión."
      );
    }
    return;
  }

  setFailure(message.message);
}

function setLoadingState(status: string, value: number) {
  const normalized = Math.max(0, Math.min(100, Math.round(value)));
  if (modelStatus) modelStatus.textContent = status;
  if (progress) progress.value = normalized;
  if (progressValue) progressValue.textContent = `${normalized}%`;
}

function setOutputState(
  state: "neutral" | "success" | "warning" | "error",
  message: string
) {
  if (!outputState) return;
  outputState.className = `output-state ${state}`;
  outputState.textContent = message;
}

function setFailure(message: string) {
  if (loadButton && !modelReady) {
    loadButton.disabled = !hasWebGpu;
    loadButton.textContent = "Reintentar preparación";
  }
  if (runButton) {
    runButton.disabled = !modelReady;
    runButton.textContent = "Ejecutar clasificación";
  }
  setOutputState("error", message);
}
