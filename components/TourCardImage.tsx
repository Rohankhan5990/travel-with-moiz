"use client";

import { useEffect, useRef, useState } from "react";
import { getImageVariant } from "@/lib/optimized-image";

const CARD_IMAGE_SIZES =
  "(min-width: 1536px) 28rem, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw";

export function TourCardImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);

  useEffect(() => {
    if (shouldLoad) return;
    const host = hostRef.current;
    if (!host || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "500px" },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div
      ref={hostRef}
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url("${getImageVariant(src, 48)}")` }}
    >
      {shouldLoad && (
        // A native srcSet is required because this site is a static export and Next's image optimizer is disabled.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={getImageVariant(src, 720)}
          srcSet={`${getImageVariant(src, 480)} 480w, ${getImageVariant(src, 720)} 720w, ${src} 900w`}
          sizes={CARD_IMAGE_SIZES}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
        />
      )}
    </div>
  );
}
