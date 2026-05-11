import type { MetadataRoute } from "next";
import { tours } from "@/lib/tours";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tours`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const tourRoutes: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${base}/tours/${tour.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...tourRoutes];
}
