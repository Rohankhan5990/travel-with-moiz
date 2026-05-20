/** Prefer WebP when the build script has generated an optimized sibling file. */
export function preferWebp(src: string): string {
  return src.replace(/\.(png|jpe?g)$/i, ".webp");
}

/** Above-the-fold homepage images to preload in document head. */
export const homepagePreloadImages = [
  "/images/brand/hero-banner.webp",
  "/images/card-images/shogran.webp",
  "/images/card-images/kumrat.webp",
] as const;
