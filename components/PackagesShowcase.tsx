"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TourCard } from "@/components/TourCard";
import type { Tour } from "@/lib/tour-types";
import { cn } from "@/lib/utils";

const FEATURED_COUNT = 3;

type PackagesShowcaseProps = {
  tours: Tour[];
  variant?: "onLight" | "onDark";
};

export function PackagesShowcase({ tours, variant = "onLight" }: PackagesShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const featured = tours.slice(0, FEATURED_COUNT);
  const rest = tours.slice(FEATURED_COUNT);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 8);
    setCanNext(scrollLeft < scrollWidth - clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState, rest.length]);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-package-card]");
    const w = card?.offsetWidth ?? 320;
    const gap = 20;
    el.scrollBy({ left: dir * (w + gap), behavior: "smooth" });
  };

  const isDark = variant === "onDark";

  return (
    <div className="space-y-10 md:space-y-12">
      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((tour) => (
          <TourCard key={tour.slug} tour={tour} />
        ))}
      </div>

      {rest.length > 0 && (
        <div>
          <div
            className={cn(
              "mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center",
              isDark ? "text-white" : "text-[#073b2c]",
            )}
          >
            <div>
              <p
                className={cn(
                  "text-xs font-black uppercase tracking-[0.2em]",
                  isDark ? "text-cyan-300/90" : "text-emerald-700",
                )}
              >
                More packages
              </p>
              <h3 className="mt-1 text-2xl font-black sm:text-3xl">Swipe or use arrows</h3>
              <p
                className={cn(
                  "mt-1 max-w-xl text-sm sm:text-base",
                  isDark ? "text-slate-300" : "text-slate-600",
                )}
              >
                Scroll horizontally to compare the rest of our flyer tours — same card size as above, tuned for
                your screen.
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                aria-label="Scroll packages left"
                onClick={() => scrollByDir(-1)}
                disabled={!canPrev}
                className={cn(
                  "inline-flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition disabled:pointer-events-none disabled:opacity-35",
                  isDark
                    ? "border-white/20 bg-white/10 text-white hover:bg-white/15"
                    : "border-emerald-900/15 bg-white text-emerald-900 hover:bg-emerald-50",
                )}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Scroll packages right"
                onClick={() => scrollByDir(1)}
                disabled={!canNext}
                className={cn(
                  "inline-flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition disabled:pointer-events-none disabled:opacity-35",
                  isDark
                    ? "border-white/20 bg-white/10 text-white hover:bg-white/15"
                    : "border-emerald-900/15 bg-white text-emerald-900 hover:bg-emerald-50",
                )}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div
              ref={scrollRef}
              className={cn(
                "flex items-stretch snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-visible pb-4 pt-1 [-ms-overflow-style:none] [scrollbar-width:thin]",
                isDark ? "scrollbar-thumb-white/20 scrollbar-track-transparent" : "scrollbar-thumb-emerald-900/20",
              )}
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {rest.map((tour) => (
                <div
                  key={tour.slug}
                  data-package-card
                  className="flex w-[min(100%,22rem)] shrink-0 snap-start sm:w-96 lg:w-[26rem] xl:w-[28rem]"
                >
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
