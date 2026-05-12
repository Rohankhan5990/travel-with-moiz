# Travel with Moiz — RAG chatbot API (Cloudflare Worker)

Backend for the website chatbot: **Gemini embeddings** (`gemini-embedding-001`, 768 dims) + **Gemini chat** (`gemini-2.5-flash`), **Cloudflare Vectorize** for retrieval, **D1** for chunks + logs.

Secrets stay on the Worker (`GEMINI_API_KEY`, `ADMIN_SECRET`). The Next.js site only needs `NEXT_PUBLIC_CHAT_API_URL`.

## Prerequisites

- Cloudflare account (Workers + D1 + Vectorize enabled)
- Node.js 20+
- Gemini API key ([Google AI Studio](https://aistudio.google.com/apikey))

## One-time setup

```bash
cd workers/chatbot-api
npm install
```

### 1. Create D1 database

```bash
npx wrangler d1 create travel-with-moiz-chatbot
```

Copy the printed `database_id` into `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "travel-with-moiz-chatbot"
database_id = "<paste-id-here>"
migrations_dir = "migrations"
```

### 2. Create Vectorize index (768 dimensions, cosine)

```bash
npx wrangler vectorize create travel-with-moiz-rag --dimensions=768 --metric=cosine
```

The binding in `wrangler.toml` must match:

```toml
[[vectorize]]
binding = "VECTORIZE"
index_name = "travel-with-moiz-rag"
```

### 3. Secrets

```bash
npx wrangler secret put GEMINI_API_KEY
npx wrangler secret put ADMIN_SECRET
```

Pick a long random `ADMIN_SECRET` (password manager). Upload/clear endpoints require:

`Authorization: Bearer <ADMIN_SECRET>`

### 4. Apply migrations

Local:

```bash
npx wrangler d1 migrations apply travel-with-moiz-chatbot --local
```

Production:

```bash
npx wrangler d1 migrations apply travel-with-moiz-chatbot --remote
```

### 5. TypeScript types (optional)

After changing `wrangler.toml`:

```bash
npx wrangler types
```

## Deploy Worker

From `workers/chatbot-api`:

```bash
npx wrangler deploy
```

Note the Worker URL, e.g. `https://travel-with-moiz-chatbot-api.<subdomain>.workers.dev`.

## Frontend (main Next.js repo)

At the repo root, copy `.env.example` → `.env.local` and set:

```bash
NEXT_PUBLIC_CHAT_API_URL=https://travel-with-moiz-chatbot-api.<subdomain>.workers.dev
```

No trailing slash. Rebuild and redeploy the static site (`npm run build` / your Cloudflare flow).

### CORS

Allowed origins are defined in `src/cors.ts`:

- `https://www.travelwithmoiz.com`
- `https://travelwithmoiz.com`
- `http://localhost:3000`

Add more origins there if needed (then redeploy the Worker).

## API

### Health

```bash
curl -s "$WORKER_URL/health"
```

### Upload knowledge (admin)

Single document:

```bash
curl -X POST "$WORKER_URL/api/admin/upload" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_SECRET_VALUE" \
  -d '{
    "title": "Travel with Moiz FAQ",
    "source": "manual",
    "content": "Travel with Moiz offers family tours, couple tours, group tours, Hunza, Skardu, Kashmir, Naran, Swat and more."
  }'
```

Batch:

```bash
curl -X POST "$WORKER_URL/api/admin/upload" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_SECRET_VALUE" \
  -d '{
    "documents": [
      {
        "title": "Skardu Tour",
        "source": "manual",
        "content": "Full package details..."
      },
      {
        "title": "Hunza Tour Package",
        "source": "manual",
        "content": "Full package details..."
      }
    ]
  }'
```

Text is cleaned, split by paragraphs, chunked (~700 words with ~120-word overlap). Each chunk is stored in D1, embedded with Gemini, and upserted into Vectorize.

### Chat (public)

```bash
curl -X POST "$WORKER_URL/api/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Which tours do you offer?"
  }'
```

Response shape:

```json
{
  "answer": "Final answer here",
  "sources": [
    { "title": "Travel with Moiz FAQ", "chunk_id": "…", "score": 0.82 }
  ]
}
```

### Clear all knowledge + vectors + chat logs (admin)

```bash
curl -X DELETE "$WORKER_URL/api/admin/clear" \
  -H "Authorization: Bearer ADMIN_SECRET_VALUE"
```

This deletes vectors for all chunk IDs, then wipes `chunks`, `documents`, and `chat_logs`.

## Updating chatbot knowledge

1. **Add more**: call `POST /api/admin/upload` again with new titles/content (creates new documents/chunks/embeddings).
2. **Replace everything**: call `DELETE /api/admin/clear`, then upload fresh documents.
3. **Partial edits**: not implemented — clear + re-upload, or extend the Worker with DELETE-by-document-id later.

## Local development (`localhost`)

Vectorize does **not** run fully offline. This repo sets **`remote = true`** on the Vectorize binding so `wrangler dev` talks to your **real** Cloudflare index while D1 stays **local**.

1. **Log in** (once):

   ```bash
   cd workers/chatbot-api
   npx wrangler login
   ```

2. **Secrets on your machine only** — copy `.dev.vars.example` → `.dev.vars` (never commit `.dev.vars`; it is gitignored):

   ```
   GEMINI_API_KEY=<your key>
   ADMIN_SECRET=<any long random string for local admin curls>
   ```

3. **Local D1 schema**:

   ```bash
   npx wrangler d1 migrations apply travel-with-moiz-chatbot --local
   ```

4. **Run the Worker** (default URL `http://127.0.0.1:8787`):

   ```bash
   npx wrangler dev
   ```

5. **Smoke tests**:

   ```bash
   curl -s http://127.0.0.1:8787/health
   curl -s -X POST http://127.0.0.1:8787/api/admin/upload \
     -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
     -H "Content-Type: application/json" \
     -d '{"title":"FAQ","source":"manual","content":"We offer Hunza and Skardu tours."}'
   curl -s -X POST http://127.0.0.1:8787/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message":"Which tours?"}'
   ```

6. **Next.js widget against local Worker** — in repo root `.env.local`:

   ```
   NEXT_PUBLIC_CHAT_API_URL=http://127.0.0.1:8787
   ```

   Then `npm run dev` and open `http://localhost:3000` or `http://127.0.0.1:3000` (both allowed in `src/cors.ts`).

If `/api/chat` returns **`{"error":"Server misconfigured"}`**, Wrangler did not load `GEMINI_API_KEY` — fix `.dev.vars` and restart `wrangler dev`.

## Troubleshooting (deployed)


- **`401 Unauthorized` on admin routes**: Bearer token must exactly match `ADMIN_SECRET`.
- **Embedding/chat errors**: verify `GEMINI_API_KEY` and model availability for your Google project.
- **Vector dimension mismatch**: index must be created with `--dimensions=768` to match `outputDimensionality`.
- **Large uploads/timeouts**: very long documents produce many embeddings sequentially; split uploads or increase Worker limits/plan if needed.
