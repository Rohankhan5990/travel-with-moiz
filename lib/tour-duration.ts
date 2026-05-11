/**
 * Shapes tour duration for badges (e.g. top-left on cards). Data should use
 * `X Days - Y Nights`; this normalizes legacy `·` or trailing notes in parentheses.
 */
export function formatTourDurationBadge(duration: string): string {
  return duration
    .replace(/\s*·\s*/g, " - ")
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}
