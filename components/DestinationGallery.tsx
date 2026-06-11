"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { galleryImages } from "@/lib/tours";

type DestinationGalleryProps = {
  limit?: number;
};

export function DestinationGallery({ limit }: DestinationGalleryProps) {
  const reduceMotion = useReducedMotion();
  const images = typeof limit === "number" ? galleryImages.slice(0, limit) : galleryImages;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const step = useCallback(
    (direction: 1 | -1) => {
      setOpenIndex((current) =>
        current === null ? null : (current + direction + images.length) % images.length,
      );
    },
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, step]);

  const active = openIndex !== null ? images[openIndex] : null;

  return (
    <>
      <div className="grid auto-rows-[240px] grid-cols-1 gap-4 md:grid-cols-4">
        {images.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Open ${item.title} fullscreen`}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left ring-1 ring-white/5 transition duration-500 hover:border-brand-gold/30 ${
              index === 0 || index === 3 || index === 10 ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              loading="lazy"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-forest-deep/90 via-brand-forest/20 to-transparent" />
            <span className="glass-soft absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-white opacity-0 transition duration-300 group-hover:opacity-100">
              <Expand className="h-4 w-4" />
            </span>
            <p className="absolute bottom-5 left-5 font-display text-xl font-semibold text-white">
              {item.title}
            </p>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && openIndex !== null && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} — fullscreen image`}
            className="fixed inset-0 z-[80] flex flex-col bg-brand-night/95 backdrop-blur-md"
            onClick={() => setOpenIndex(null)}
          >
            <div className="flex items-center justify-between p-4 sm:p-6">
              <p className="font-display text-xl font-semibold text-white sm:text-2xl">
                {active.title}
                <span className="ml-3 text-sm font-normal text-white/45">
                  {openIndex + 1} / {images.length}
                </span>
              </p>
              <button
                type="button"
                aria-label="Close fullscreen view"
                onClick={() => setOpenIndex(null)}
                className="glass-soft flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/15"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div
              className="relative mx-4 mb-4 flex-1 overflow-hidden rounded-3xl sm:mx-6 sm:mb-6"
              onClick={(event) => event.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.src}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                aria-label="Previous image"
                onClick={() => step(-1)}
                className="glass-soft absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => step(1)}
                className="glass-soft absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white transition hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
