const EMBEDDING_MODEL = "models/gemini-embedding-001";
const CHAT_MODEL = "gemini-2.5-flash";
export const EMBEDDING_DIMENSION = 768;

export const SYSTEM_PROMPT = `You are Travel with Moiz official website assistant.
Answer only from the provided context.
If the answer is not available in the context, say:
"I don't have this information in the uploaded Travel with Moiz data. Please contact the team on WhatsApp."
Do not invent prices, dates, hotels, availability, or itinerary details.
Keep answers short, friendly, and helpful.
For booking, guide users to WhatsApp/contact number if present in context.`;

export async function embedText(
  apiKey: string,
  text: string,
): Promise<number[]> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${encodeURIComponent(apiKey)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      content: {
        parts: [{ text }],
      },
      outputDimensionality: EMBEDDING_DIMENSION,
    }),
  });

  const raw = await res.text();
  if (!res.ok) {
    throw new Error(`Gemini embedding failed (${res.status}): ${raw}`);
  }

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error("Gemini embedding returned invalid JSON");
  }

  const obj = data as {
    embedding?: { values?: number[] };
    error?: { message?: string };
  };

  const values = obj.embedding?.values;
  if (!values?.length) {
    throw new Error(
      obj.error?.message ?? "Gemini embedding response missing values",
    );
  }

  if (values.length !== EMBEDDING_DIMENSION) {
    throw new Error(
      `Unexpected embedding length ${values.length}, expected ${EMBEDDING_DIMENSION}`,
    );
  }

  return values;
}

export async function generateAnswer(
  apiKey: string,
  context: string,
  question: string,
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${CHAT_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const body = {
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Use only the context below when answering.\n\n--- CONTEXT START ---\n${context}\n--- CONTEXT END ---\n\nQuestion: ${question}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 1024,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const raw = await res.text();
  if (!res.ok) {
    throw new Error(`Gemini chat failed (${res.status}): ${raw}`);
  }

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error("Gemini chat returned invalid JSON");
  }

  const obj = data as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
    }>;
    error?: { message?: string };
  };

  const text =
    obj.candidates?.[0]?.content?.parts
      ?.map((p) => p.text ?? "")
      .join("") ?? "";

  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error(obj.error?.message ?? "Gemini returned an empty answer");
  }

  return trimmed;
}
