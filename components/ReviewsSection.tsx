import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { reviews } from "@/lib/tours";

function reviewerInitials(name: string) {
  const parts = name.split(/[\s.]+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]);
  return letters.join("").toUpperCase();
}

export function ReviewsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#073b2c] via-[#062a1f] to-[#09251d] px-4 py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_45%_at_50%_0%,rgba(45,212,191,0.14),transparent_55%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Reviews"
          title="Travelers remember the details"
          text="Stories from guests who traveled with us—clear planning, steady support, and routes built around the best views."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
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
      </div>
    </section>
  );
}
