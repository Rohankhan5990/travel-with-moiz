export type ChunkRow = {
  id: string;
  document_id: string;
  chunk_index: number;
  title: string | null;
  content: string;
  source: string | null;
};

export async function insertDocument(
  db: D1Database,
  id: string,
  title: string,
  source: string | null,
): Promise<void> {
  await db
    .prepare(`INSERT INTO documents (id, title, source) VALUES (?, ?, ?)`)
    .bind(id, title, source ?? null)
    .run();
}

export async function insertChunk(
  db: D1Database,
  row: ChunkRow,
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO chunks (id, document_id, chunk_index, title, content, source)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      row.id,
      row.document_id,
      row.chunk_index,
      row.title ?? null,
      row.content,
      row.source ?? null,
    )
    .run();
}

export async function getChunksByIds(
  db: D1Database,
  ids: string[],
): Promise<Map<string, ChunkRow>> {
  const map = new Map<string, ChunkRow>();
  if (!ids.length) return map;

  const placeholders = ids.map(() => "?").join(",");
  const stmt = db.prepare(
    `SELECT id, document_id, chunk_index, title, content, source FROM chunks WHERE id IN (${placeholders})`,
  );

  const bound = stmt.bind(...ids);
  const res = await bound.all<ChunkRow>();

  for (const row of res.results ?? []) {
    map.set(row.id, row);
  }

  return map;
}

export async function insertChatLog(
  db: D1Database,
  id: string,
  question: string,
  answer: string,
  sourcesJson: string,
): Promise<void> {
  await db
    .prepare(
      `INSERT INTO chat_logs (id, question, answer, sources) VALUES (?, ?, ?, ?)`,
    )
    .bind(id, question, answer, sourcesJson)
    .run();
}

export async function listChunkIds(db: D1Database): Promise<string[]> {
  const res = await db.prepare(`SELECT id FROM chunks`).all<{ id: string }>();
  return (res.results ?? []).map((r) => r.id);
}

export async function deleteAllKnowledgeRows(db: D1Database): Promise<void> {
  await db.prepare(`DELETE FROM chunks`).run();
  await db.prepare(`DELETE FROM documents`).run();
  await db.prepare(`DELETE FROM chat_logs`).run();
}
