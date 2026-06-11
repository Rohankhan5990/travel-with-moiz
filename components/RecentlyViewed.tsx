"use client";

import Image from "next/image";
import Link from "next/link";
import { History } from "lucide-react";
import { tours } from "@/lib/tours";
import { getTourCardImage } from "@/lib/tour-card-images";
import { formatTourDurationBadge } from "@/lib/tour-duration";
import { useRecentlyViewed } from "@/lib/traveler-prefs";

/** Compact rail of recently opened tours. Renders nothing until there is history. */
export function RecentlyViewed() {
  const slugs = useRecentlyViewed();
  const recent = slugs
    .map((slug) => tours.find((tour) => tour.slug === slug))
    .filter((tour): tour is NonNullable<typeof tour> => Boolean(tour))
    .slice(0, 4);

  if (recent.length === 0) return null;

  return (
    <section className="section-surface-night px-4 pb-4 pt-16 sm:pt-20">
      <div className="mx-auto max-w-7xl">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold-light">
          <History className="h-4 w-4" /> Continue planning
        </p>
        <div className="no-scrollbar mt-5 flex snap-x gap-4 overflow-x-auto pb-2">
          {recent.map((tour) => (
            <Link
              key={tour.slug}
              href={`/tours/${tour.slug}`}
              className="glass-soft group flex w-72 shrink-0 snap-start items-center gap-3.5 rounded-2xl p-3 transition hover:bg-white/12"
            >
              <span className="relative block h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={getTourCardImage(tour)}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="5rem"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </span>
              <span className="min-w-0">
                <span className="line-clamp-2 text-sm font-semibold leading-snug text-white">
                  {tour.title}
                </span>
                <span className="mt-1 block text-xs text-white/55">
                  {formatTourDurationBadge(tour.duration)} · {tour.pricePerHead}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
