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
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-900/15 bg-white text-emerald-900 shadow-md shadow-emerald-950/10 transition active:scale-95 hover:border-emerald-700/30 hover:bg-emerald-50 disabled:pointer-events-none disabled:opacity-30 sm:h-11 sm:w-11 md:h-12 md:w-12";

function CarouselNavPair({
  className,
  canPrev,
  canNext,
  onPrev,
  onNext,
}: {
  className?: string;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <button
        type="button"
        aria-label="Previous packages"
        onClick={onPrev}
        disabled={!canPrev}
        className={arrowBtnClass}
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Next packages"
        onClick={onNext}
        disabled={!canNext}
        className={arrowBtnClass}
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} aria-hidden />
      </button>
    </div>
  );
}

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
    const gap = window.matchMedia("(min-width: 640px)").matches ? 20 : 12;
    el.scrollBy({ left: dir * (w + gap), behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-emerald-900/10 bg-white/95 p-2.5 shadow-xl shadow-emerald-950/10 sm:rounded-[2rem] sm:p-4 md:p-5",
      )}
    >
      <CarouselNavPair
        className="mb-2 gap-3 sm:hidden"
        canPrev={canPrev}
        canNext={canNext}
        onPrev={() => scrollByDir(-1)}
        onNext={() => scrollByDir(1)}
      />

      <div className="grid items-stretch gap-2 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-3 md:gap-4">
        <div className="hidden min-w-[3rem] place-self-center sm:flex sm:justify-end">
          <button
            type="button"
            aria-label="Previous packages"
            onClick={() => scrollByDir(-1)}
            disabled={!canPrev}
            className={arrowBtnClass}
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} aria-hidden />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex min-w-0 items-stretch snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-visible scroll-smooth pb-3 pt-0 sm:gap-5 sm:pb-4 [scrollbar-width:thin]"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {tours.map((tour, index) => (
            <div
              key={tour.slug}
              data-package-card
              className={cn(
                "flex w-[min(calc(100vw-2.5rem),18.5rem)] shrink-0 snap-start sm:w-[22rem] md:w-96 lg:w-[24rem] xl:w-[25rem]",
              )}
            >
              <TourCard tour={tour} layout="carousel" priority={index < 2} />
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
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
