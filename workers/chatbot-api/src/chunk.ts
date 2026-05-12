/** Target chunk size and overlap between consecutive chunks (words). */
const DEFAULT_CHUNK_WORDS = 700;
const DEFAULT_OVERLAP_WORDS = 120;

export function cleanText(input: string): string {
  return input
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export function splitParagraphs(text: string): string[] {
  const cleaned = cleanText(text);
  if (!cleaned) return [];

  return cleaned
    .split(/\n\s*\n/)
    .map((p) => cleanText(p))
    .filter(Boolean);
}

function splitWords(text: string): string[] {
  const w = cleanText(text).split(/\s+/).filter(Boolean);
  return w;
}

/**
 * Split paragraphs into overlapping word windows (~700 words, ~120 overlap).
 */
export function chunkParagraphsToWords(
  paragraphs: string[],
  chunkWords = DEFAULT_CHUNK_WORDS,
  overlapWords = DEFAULT_OVERLAP_WORDS,
): string[] {
  if (!paragraphs.length) return [];

  const body = paragraphs.join("\n\n");
  const words = splitWords(body);
  if (!words.length) return [];

  const chunks: string[] = [];
  let start = 0;

  while (start < words.length) {
    const end = Math.min(start + chunkWords, words.length);
    const slice = words.slice(start, end);
    chunks.push(slice.join(" "));

    if (end >= words.length) break;

    const nextStart = Math.max(end - overlapWords, start + 1);
    start = nextStart;
  }

  return chunks;
}

export function chunkDocumentContent(rawContent: string): string[] {
  const paragraphs = splitParagraphs(rawContent);
  return chunkParagraphsToWords(paragraphs);
}
