/** Prefer WebP when the build script has generated an optimized sibling file. */
export function preferWebp(src: string): string {
  return src.replace(/\.(png|jpe?g)$/i, ".webp");
}

/** Return a generated responsive WebP sibling such as image-480.webp. */
export function getImageVariant(src: string, width: number): string {
  return src.replace(/\.webp$/i, `-${width}.webp`);
}
