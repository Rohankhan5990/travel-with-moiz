/** Prefer WebP when the build script has generated an optimized sibling file. */
export function preferWebp(src: string): string {
  return src.replace(/\.(png|jpe?g)$/i, ".webp");
}
