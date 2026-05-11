/**
 * Canonical site origin for SEO (metadata, sitemap, JSON-LD).
 * Production: https://www.travelwithmoiz.com (Cloudflare Pages static build — no runtime env).
 */
const SITE_URL = "https://www.travelwithmoiz.com";

export function getSiteUrl(): string {
  return SITE_URL.replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
