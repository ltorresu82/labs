import {
  env,
  pipeline,
  type TextGenerationPipeline
} from "@huggingface/transformers";

const MODEL_ID = "onnx-community/Qwen2.5-0.5B-Instruct";
const CATEGORIES = [
  "soporte_tecnico",
  "facturacion",
  "consulta_comercial",
  "seguridad",
  "otro"
] as const;
const PRIORITIES = ["alta", "media", "baja"] as const;

type Category = (typeof CATEGORIES)[number];
type Priority = (typeof PRIORITIES)[number];

interface Classification {
  categoria: Category;
  prioridad: Priority;
  requiere_revision: boolean;
  resumen: string;
}

interface ClassificationResult {
  payload: Classification;
  contractStatus: "direct" | "recovered";
}

let generator: TextGenerationPipeline | null = null;
let loading: Promise<void> | null = null;

env.allowLocalModels = false;

self.addEventListener("message", async (event: MessageEvent) => {
  const message = event.data;

  try {
    if (message.type === "load") {
      await loadModel();
      self.postMessage({ type: "ready" });
      return;
    }

    if (message.type === "classify") {
      await loadModel();
      const startedAt = performance.now();
      const result = await classify(String(message.text ?? ""));
      self.postMessage({
        type: "result",
        ...result,
        elapsedMs: performance.now() - startedAt
      });
    }
  } catch (error) {
    self.postMessage({
      type: "error",
      message: describeError(error)
    });
  }
});

async function loadModel() {
  if (generator) return;
  if (loading) return loading;

  loading = (async () => {
    generator = await pipeline("text-generation", MODEL_ID, {
      device: "webgpu",
      dtype: "q4f16",
      progress_callback: (event: { progress?: number; status?: string; file?: string }) => {
        const rawProgress = typeof event.progress === "number" ? event.progress : 0;
        const progress = rawProgress <= 1 ? rawProgress * 100 : rawProgress;
        self.postMessage({
          type: "progress",
          progress,
          status: progressLabel(event.status, event.file)
        });
      }
    });
  })();

  try {
    await loading;
  } finally {
    loading = null;
  }
}

async function classify(text: string): Promise<ClassificationResult> {
  if (!generator) throw new Error("El modelo no está preparado.");
  if (!text.trim()) throw new Error("La solicitud está vacía.");

  const instructions = [
    "Eres una función de clasificación, no un asistente conversacional.",
    "Devuelve exactamente una línea JSON y nada más.",
    `categoria: ${CATEGORIES.join(" | ")}.`,
    `prioridad: ${PRIORITIES.join(" | ")}.`,
    "requiere_revision: true o false.",
    "resumen: una oración breve en español.",
    'Formato exacto: {"categoria":"soporte_tecnico","prioridad":"alta","requiere_revision":false,"resumen":"Incidente de acceso a una API."}'
  ].join(" ");
  const userPrompt = [
    'Ejemplo de entrada: "No puedo entrar al portal y el equipo está bloqueado."',
    'Ejemplo de salida: {"categoria":"soporte_tecnico","prioridad":"alta","requiere_revision":false,"resumen":"Bloqueo de acceso al portal."}',
    `Entrada real: ${JSON.stringify(text)}`,
    "Salida JSON:"
  ].join("\n");
  const prompt = [
    "<|im_start|>system",
    instructions,
    "<|im_end|>",
    "<|im_start|>user",
    userPrompt,
    "<|im_end|>",
    "<|im_start|>assistant"
  ].join("\n");

  const result = await generator(prompt, {
    max_new_tokens: 96,
    do_sample: false,
    repetition_penalty: 1.1,
    no_repeat_ngram_size: 4,
    return_full_text: false
  });

  const generated = readGeneratedText(result);
  try {
    return {
      payload: validateClassification(parseJsonObject(generated)),
      contractStatus: "direct"
    };
  } catch {
    return {
      payload: recoverClassification(text),
      contractStatus: "recovered"
    };
  }
}

function readGeneratedText(result: unknown): string {
  if (!Array.isArray(result) || result.length === 0) {
    throw new Error("El modelo no produjo una respuesta.");
  }

  const generatedText = (result[0] as { generated_text?: unknown }).generated_text;

  if (typeof generatedText === "string") return generatedText;

  if (Array.isArray(generatedText)) {
    const assistant = [...generatedText]
      .reverse()
      .find((item) => item && typeof item === "object" && (item as { role?: string }).role === "assistant");
    const content = assistant && (assistant as { content?: unknown }).content;
    if (typeof content === "string") return content;
  }

  throw new Error("La respuesta del modelo no tiene un formato reconocible.");
}

function parseJsonObject(text: string): unknown {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("El modelo no devolvió JSON válido.");
  return JSON.parse(text.slice(start, end + 1));
}

function validateClassification(value: unknown): Classification {
  if (!value || typeof value !== "object") throw new Error("La salida no es un objeto.");

  const candidate = value as Record<string, unknown>;
  if (!CATEGORIES.includes(candidate.categoria as Category)) {
    throw new Error("La categoría está fuera del contrato.");
  }
  if (!PRIORITIES.includes(candidate.prioridad as Priority)) {
    throw new Error("La prioridad está fuera del contrato.");
  }
  if (typeof candidate.requiere_revision !== "boolean") {
    throw new Error("requiere_revision debe ser booleano.");
  }
  if (typeof candidate.resumen !== "string" || !candidate.resumen.trim()) {
    throw new Error("El resumen está vacío.");
  }

  return {
    categoria: candidate.categoria as Category,
    prioridad: candidate.prioridad as Priority,
    requiere_revision: candidate.requiere_revision,
    resumen: candidate.resumen.trim().slice(0, 220)
  };
}

function recoverClassification(text: string): Classification {
  const normalized = text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

  const categoria: Category = includesAny(normalized, [
    "seguridad",
    "phishing",
    "brecha",
    "credencial",
    "ransomware",
    "vulnerabilidad"
  ])
    ? "seguridad"
    : includesAny(normalized, [
          "factura",
          "facturacion",
          "cobro",
          "razon social"
        ])
      ? "facturacion"
      : includesAny(normalized, [
            "planes",
            "cotizacion",
            "propuesta",
            "comercial",
            "precio"
          ])
        ? "consulta_comercial"
        : includesAny(normalized, [
              "api",
              "error",
              "portal",
              "acceso",
              "integracion",
              "401",
              "500",
              "caida"
            ])
          ? "soporte_tecnico"
          : "otro";

  const prioridad: Priority = includesAny(normalized, [
    "bloqueado",
    "bloqueados",
    "sin servicio",
    "urgente",
    "brecha",
    "401",
    "caida"
  ])
    ? "alta"
    : includesAny(normalized, ["error", "problema", "no puedo", "falla"])
      ? "media"
      : "baja";

  const summaries: Record<Category, string> = {
    soporte_tecnico: "Solicitud técnica relacionada con acceso, integración o disponibilidad.",
    facturacion: "Solicitud relacionada con facturación, cobros o datos tributarios.",
    consulta_comercial: "Consulta comercial sobre planes, precios o una posible integración.",
    seguridad: "Solicitud sensible relacionada con seguridad o credenciales.",
    otro: "Solicitud sin una categoría concluyente dentro del contrato."
  };

  return {
    categoria,
    prioridad,
    requiere_revision: true,
    resumen: summaries[categoria]
  };
}

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function progressLabel(status?: string, file?: string) {
  if (status === "ready") return "Preparando el runtime local…";
  if (status === "progress" && file) return `Descargando ${shortFileName(file)}…`;
  if (status === "done" && file) return `${shortFileName(file)} listo.`;
  return "Preparando los pesos del modelo…";
}

function shortFileName(file: string) {
  const name = file.split("/").pop() || "archivo";
  return name.length > 42 ? `${name.slice(0, 39)}…` : name;
}

function describeError(error: unknown) {
  const message = error instanceof Error ? error.message : "Error desconocido";
  if (/webgpu|gpu|adapter|device/i.test(message)) {
    return "WebGPU no pudo iniciar el modelo en este dispositivo. Revisa el navegador y la GPU.";
  }
  if (/fetch|network|download/i.test(message)) {
    return "No se pudieron descargar los pesos. Revisa la conexión e inténtalo nuevamente.";
  }
  return message;
}
