"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TourCard } from "@/components/TourCard";
import type { Tour } from "@/lib/tour-types";
import { cn } from "@/lib/utils";

type PackagesCarouselProps = {
  tours: Tour[];
};

const arrowBtnClass =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-900/15 bg-white text-emerald-900 shadow-md shadow-emerald-950/10 transition active:scale-95 hover:border-emerald-700/30 hover:bg-emerald-50 disabled:pointer-events-none disabled:opacity-30 sm:h-12 sm:w-12";

export function PackagesCarousel({ tours }: PackagesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

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
  }, [updateScrollState, tours.length]);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-package-card]");
    const w = card?.offsetWidth ?? 320;
    const gap = 20;
    el.scrollBy({ left: dir * (w + gap), behavior: "smooth" });
  };

  const NavPair = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <button
        type="button"
        aria-label="Previous packages"
        onClick={() => scrollByDir(-1)}
        disabled={!canPrev}
        className={arrowBtnClass}
      >
        <ChevronLeft className="h-6 w-6" strokeWidth={2.25} aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Next packages"
        onClick={() => scrollByDir(1)}
        disabled={!canNext}
        className={arrowBtnClass}
      >
        <ChevronRight className="h-6 w-6" strokeWidth={2.25} aria-hidden />
      </button>
    </div>
  );

  return (
    <div
      className={cn(
        "rounded-2xl border border-emerald-900/10 bg-white/95 p-3 shadow-xl shadow-emerald-950/10 sm:rounded-[2rem] sm:p-4 md:p-5",
      )}
    >
      <NavPair className="mb-3 sm:hidden" />

      <div className="grid items-stretch gap-2 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-3 md:gap-4">
        <div className="hidden min-w-[3rem] place-self-center sm:flex sm:justify-end">
          <button
            type="button"
            aria-label="Previous packages"
            onClick={() => scrollByDir(-1)}
            disabled={!canPrev}
            className={arrowBtnClass}
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2.25} aria-hidden />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex min-w-0 items-stretch snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-visible scroll-smooth pb-4 pt-0 [scrollbar-width:thin]"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {tours.map((tour) => (
            <div
              key={tour.slug}
              data-package-card
              className={cn(
                "flex w-[min(100%,20rem)] shrink-0 snap-start sm:w-[22rem] md:w-96 lg:w-[24rem] xl:w-[25rem]",
              )}
            >
              <TourCard tour={tour} layout="carousel" />
            </div>
          ))}
        </div>

        <div className="hidden min-w-[3rem] place-self-center sm:flex sm:justify-start">
          <button
            type="button"
            aria-label="Next packages"
            onClick={() => scrollByDir(1)}
            disabled={!canNext}
            className={arrowBtnClass}
          >
            <ChevronRight className="h-6 w-6" strokeWidth={2.25} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
