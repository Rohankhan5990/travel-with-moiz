const UPSERT_BATCH = 50;

export async function upsertEmbeddings(
  index: VectorizeIndex,
  entries: Array<{
    id: string;
    values: number[];
    metadata?: Record<string, string | number | boolean>;
  }>,
): Promise<void> {
  for (let i = 0; i < entries.length; i += UPSERT_BATCH) {
    const batch = entries.slice(i, i + UPSERT_BATCH);
    await index.upsert(batch);
  }
}

export async function deleteVectorsByIds(
  index: VectorizeIndex,
  ids: string[],
): Promise<void> {
  const BATCH = 100;
  for (let i = 0; i < ids.length; i += BATCH) {
    const slice = ids.slice(i, i + BATCH);
    await index.deleteByIds(slice);
  }
}

export async function queryTopK(
  index: VectorizeIndex,
  vector: number[],
  topK: number,
): Promise<Array<{ id: string; score: number }>> {
  const matches = await index.query(vector, {
    topK,
    returnMetadata: "none",
  });

  const out: Array<{ id: string; score: number }> = [];
  for (const m of matches.matches ?? []) {
    out.push({ id: m.id, score: m.score });
  }
  return out;
}
