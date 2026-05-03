"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { reviews } from "@/lib/tours";
import { videoReviewSrc, videoReviews } from "@/lib/video-reviews";
import { Play, Quote, Star, Video } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

function reviewerInitials(name: string) {
  const parts = name.split(/[\s.]+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]);
  return letters.join("").toUpperCase();
}

function ClientReviewVideos() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  const setRef = useCallback((id: string, el: HTMLVideoElement | null) => {
    if (el) videoRefs.current.set(id, el);
    else videoRefs.current.delete(id);
  }, []);

  useEffect(() => {
    if (!playingId) return;
    videoRefs.current.forEach((video, key) => {
      if (key !== playingId) video.pause();
    });
  }, [playingId]);

  const handlePlayClick = (id: string) => {
    const v = videoRefs.current.get(id);
    if (v) {
      void v.play();
      setPlayingId(id);
    }
  };

  if (videoReviews.length === 0) return null;

  return (
    <>
      <div className="mx-auto mt-20 max-w-2xl">
        <div className="h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" aria-hidden />
        <p className="mt-14 text-center text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
          Video reviews
        </p>
        <p className="mx-auto mt-3 max-w-xl text-center text-base leading-7 text-slate-300">
          Tap play to hear guests describe their trip—no script, just real reactions from the road.
        </p>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videoReviews.map((review) => {
          const isActive = playingId === review.id;
          return (
            <li key={review.id}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-b from-white/[0.16] to-white/[0.07] text-white shadow-[0_24px_50px_-14px_rgba(0,0,0,0.45)] ring-1 ring-white/10 backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-cyan-300/40 hover:shadow-[0_32px_64px_-16px_rgba(6,182,212,0.22)] hover:ring-cyan-400/20">
                <div className="relative h-60 w-full shrink-0 overflow-hidden bg-gradient-to-br from-[#062a1f] via-[#073b2c] to-[#09251d] sm:h-64 md:h-72">
                  <video
                    ref={(el) => setRef(review.id, el)}
                    className="absolute inset-0 h-full w-full object-cover"
                    preload="metadata"
                    playsInline
                    controls={isActive}
                    onPlay={() => setPlayingId(review.id)}
                    onPause={() => {
                      setPlayingId((current) =>
                        current === review.id ? null : current,
                      );
                    }}
                    onEnded={() => {
                      setPlayingId((current) =>
                        current === review.id ? null : current,
                      );
                    }}
                  >
                    <source src={videoReviewSrc(review)} type="video/mp4" />
                  </video>

                  <button
                    type="button"
                    aria-label={`Play video: ${review.title}`}
                    onClick={() => handlePlayClick(review.id)}
                    className={`absolute inset-0 flex items-center justify-center bg-emerald-950/40 transition duration-300 ${
                      isActive
                        ? "pointer-events-none opacity-0"
                        : "opacity-100 backdrop-blur-[2px] group-hover:bg-emerald-950/30"
                    }`}
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#073b2c] shadow-xl shadow-black/40 ring-4 ring-cyan-400/35 transition duration-300 group-hover:scale-105 group-hover:ring-cyan-300/55 sm:h-16 sm:w-16">
                      <Play className="ml-1 h-6 w-6 fill-current sm:h-7 sm:w-7" aria-hidden />
                    </span>
                  </button>

                  <div
                    className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/95 backdrop-blur-sm"
                    aria-hidden
                  >
                    <Video className="h-3.5 w-3.5 text-cyan-200" />
                    Guest video
                  </div>
                </div>

                <div className="flex flex-1 flex-col border-t border-white/12 p-6 md:p-7">
                  <h3 className="text-lg font-black leading-snug tracking-tight text-white md:text-xl">
                    {review.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {isActive
                      ? "Playing — use controls for sound and fullscreen."
                      : "Tap the play button to watch this review."}
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export function ClientReviewsSection() {
  return (
    <section
      id="client-reviews"
      className="scroll-mt-28 relative overflow-hidden bg-gradient-to-b from-[#073b2c] via-[#062a1f] to-[#09251d] px-4 py-24 md:scroll-mt-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_45%_at_50%_0%,rgba(45,212,191,0.14),transparent_55%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Client reviews"
          title="Proof from travelers who journeyed with us"
          text="Written words and video messages from real guests—honest feedback on planning, support, and routes built around Pakistan’s best views."
        />

        <p className="mt-14 text-center text-sm font-bold uppercase tracking-[0.35em] text-cyan-300">
          Written testimonials
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-b from-white/[0.16] to-white/[0.07] p-8 text-white shadow-[0_24px_50px_-14px_rgba(0,0,0,0.45)] ring-1 ring-white/10 backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:border-cyan-300/40 hover:shadow-[0_32px_64px_-16px_rgba(6,182,212,0.22)] hover:ring-cyan-400/20"
            >
              <Quote
                className="absolute right-5 top-5 h-11 w-11 text-cyan-300/20 transition duration-300 group-hover:text-cyan-200/35"
                strokeWidth={1.25}
                aria-hidden
              />

              <div className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300" aria-hidden />
                ))}
              </div>

              <blockquote className="relative mt-5 flex-1">
                <p className="text-[1.05rem] font-medium leading-8 tracking-tight text-slate-100">
                  <span className="text-cyan-200/90">&ldquo;</span>
                  {review.text}
                  <span className="text-cyan-200/90">&rdquo;</span>
                </p>
              </blockquote>

              <footer className="mt-8 flex items-center gap-4 border-t border-white/15 pt-6">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-300 via-cyan-400 to-emerald-600 text-[0.8rem] font-black tracking-tight text-slate-950 shadow-lg shadow-emerald-950/30"
                  aria-hidden
                >
                  {reviewerInitials(review.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-black text-white">{review.name}</p>
                  <p className="mt-0.5 text-sm font-semibold text-cyan-200">{review.location}</p>
                  {review.trip ? (
                    <p className="mt-2 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/85">
                      {review.trip}
                    </p>
                  ) : null}
                </div>
              </footer>
            </article>
          ))}
        </div>

        <ClientReviewVideos />
      </div>
    </section>
  );
}
