import { chunkDocumentContent } from "./chunk";
import { corsHeadersForOrigin } from "./cors";
import {
  deleteAllKnowledgeRows,
  getChunksByIds,
  insertChatLog,
  insertChunk,
  insertDocument,
  listChunkIds,
} from "./db";
import { embedText, generateAnswer } from "./gemini";
import { deleteVectorsByIds, queryTopK, upsertEmbeddings } from "./vector";

type UploadDocInput = {
  title: string;
  source?: string;
  content: string;
};

type ChatSource = {
  title: string;
  chunk_id: string;
  score: number;
};

function jsonResponse(
  body: unknown,
  cors: HeadersInit,
  status = 200,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...cors,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function readBearer(request: Request): string | null {
  const raw = request.headers.get("Authorization") ?? "";
  const m = /^Bearer\s+(.+)$/i.exec(raw.trim());
  return m?.[1]?.trim() ?? null;
}

function requireAdmin(request: Request, env: Env): Response | null {
  const token = readBearer(request);
  if (!token || token !== env.ADMIN_SECRET) {
    const cors = corsHeadersForOrigin(request.headers.get("Origin"));
    return jsonResponse({ error: "Unauthorized" }, cors, 401);
  }
  return null;
}

async function ingestDocument(
  env: Env,
  doc: UploadDocInput,
): Promise<{ document_id: string; chunks: number }> {
  const title = typeof doc.title === "string" ? doc.title.trim() : "";
  const content = typeof doc.content === "string" ? doc.content : "";
  const source =
    typeof doc.source === "string" ? doc.source.trim() || null : null;

  if (!title || !content.trim()) {
    throw new Error("Each document requires non-empty title and content");
  }

  const documentId = crypto.randomUUID();
  await insertDocument(env.DB, documentId, title, source);

  const textChunks = chunkDocumentContent(content);
  if (!textChunks.length) {
    throw new Error("No chunkable content after cleaning");
  }

  const vectors: Array<{ id: string; values: number[] }> = [];

  for (let i = 0; i < textChunks.length; i++) {
    const chunkId = crypto.randomUUID();
    const chunkText = textChunks[i];

    await insertChunk(env.DB, {
      id: chunkId,
      document_id: documentId,
      chunk_index: i,
      title,
      content: chunkText,
      source,
    });

    const values = await embedText(env.GEMINI_API_KEY, chunkText);
    vectors.push({ id: chunkId, values });
  }

  await upsertEmbeddings(env.VECTORIZE, vectors);

  return { document_id: documentId, chunks: textChunks.length };
}

async function handleUpload(request: Request, env: Env): Promise<Response> {
  const cors = corsHeadersForOrigin(request.headers.get("Origin"));
  const denied = requireAdmin(request, env);
  if (denied) return denied;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, cors, 400);
  }

  const obj = body as Record<string, unknown>;
  let docs: UploadDocInput[] = [];

  if (Array.isArray(obj.documents)) {
    docs = obj.documents as UploadDocInput[];
  } else if (typeof obj.title === "string" && typeof obj.content === "string") {
    docs = [
      {
        title: obj.title,
        source: typeof obj.source === "string" ? obj.source : undefined,
        content: obj.content,
      },
    ];
  } else {
    return jsonResponse(
      {
        error:
          'Expected { title, source?, content } or { documents: [...] }',
      },
      cors,
      400,
    );
  }

  if (!docs.length) {
    return jsonResponse({ error: "No documents provided" }, cors, 400);
  }

  try {
    const results: Array<{ document_id: string; chunks: number }> = [];
    for (const d of docs) {
      results.push(await ingestDocument(env, d));
    }
    return jsonResponse({ ok: true, ingested: results }, cors);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Upload failed";
    return jsonResponse({ error: msg }, cors, 400);
  }
}

async function handleChat(request: Request, env: Env): Promise<Response> {
  const cors = corsHeadersForOrigin(request.headers.get("Origin"));

  if (!env.GEMINI_API_KEY) {
    return jsonResponse({ error: "Server misconfigured" }, cors, 500);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, cors, 400);
  }

  const messageRaw = (body as { message?: unknown }).message;
  const message =
    typeof messageRaw === "string" ? messageRaw.trim().slice(0, 8000) : "";

  if (!message) {
    return jsonResponse({ error: 'Missing or empty "message"' }, cors, 400);
  }

  try {
    const queryVector = await embedText(env.GEMINI_API_KEY, message);
    const matches = await queryTopK(env.VECTORIZE, queryVector, 5);

    const ids = [...new Set(matches.map((m) => m.id))];
    const chunkMap = await getChunksByIds(env.DB, ids);

    const contextParts: string[] = [];
    const sources: ChatSource[] = [];

    for (const m of matches) {
      const row = chunkMap.get(m.id);
      if (!row) continue;

      contextParts.push(`[${row.title ?? "Untitled"}]\n${row.content}`);
      sources.push({
        title: row.title ?? "Untitled",
        chunk_id: row.id,
        score: Number.isFinite(m.score) ? Math.round(m.score * 1000) / 1000 : m.score,
      });
    }

    const uniqueSources: ChatSource[] = [];
    const seen = new Set<string>();
    for (const s of sources) {
      if (seen.has(s.chunk_id)) continue;
      seen.add(s.chunk_id);
      uniqueSources.push(s);
    }

    const context =
      contextParts.length > 0
        ? contextParts.join("\n\n---\n\n")
        : "(No retrieved context — answer using fallback instruction.)";

    const answer = await generateAnswer(env.GEMINI_API_KEY, context, message);

    const logId = crypto.randomUUID();
    await insertChatLog(
      env.DB,
      logId,
      message,
      answer,
      JSON.stringify(uniqueSources),
    );

    return jsonResponse({ answer, sources: uniqueSources }, cors);
  } catch (e) {
    const msg =
      e instanceof Error ? e.message : "Chat failed — please try again";
    return jsonResponse({ error: msg }, cors, 502);
  }
}

async function handleClear(request: Request, env: Env): Promise<Response> {
  const cors = corsHeadersForOrigin(request.headers.get("Origin"));
  const denied = requireAdmin(request, env);
  if (denied) return denied;

  try {
    const ids = await listChunkIds(env.DB);
    if (ids.length) {
      await deleteVectorsByIds(env.VECTORIZE, ids);
    }
    await deleteAllKnowledgeRows(env.DB);
    return jsonResponse({ ok: true, cleared_vectors: ids.length }, cors);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Clear failed";
    return jsonResponse({ error: msg }, cors, 500);
  }
}

const worker = {
  async fetch(
    request: Request,
    env: Env,
    executionCtx: ExecutionContext,
  ): Promise<Response> {
    void executionCtx;
    const cors = corsHeadersForOrigin(request.headers.get("Origin"));

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "") || "/";

    try {
      if (request.method === "GET" && path === "/health") {
        return jsonResponse({ ok: true }, cors);
      }

      if (request.method === "POST" && path === "/api/chat") {
        return handleChat(request, env);
      }

      if (request.method === "POST" && path === "/api/admin/upload") {
        return handleUpload(request, env);
      }

      if (request.method === "DELETE" && path === "/api/admin/clear") {
        return handleClear(request, env);
      }

      return jsonResponse({ error: "Not found" }, cors, 404);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unexpected error";
      return jsonResponse({ error: msg }, cors, 500);
    }
  },
};

export default worker;
