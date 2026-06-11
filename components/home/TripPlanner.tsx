"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Sparkles, Wand2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { tours } from "@/lib/tours";
import { getTourCardImage } from "@/lib/tour-card-images";
import { formatTourDurationBadge } from "@/lib/tour-duration";
import { matchTours, type TravelerType } from "@/lib/trip-match";
import { cn } from "@/lib/utils";

const travelerOptions: TravelerType[] = ["Family", "Couple", "Friends", "Solo", "Corporate"];

const vibeSuggestions = [
  "Lakes and easy walking",
  "Trekking adventure",
  "Snow and glaciers",
  "Hunza culture and forts",
  "Relaxed scenic drives",
];

export function TripPlanner() {
  const reduceMotion = useReducedMotion();
  const [travelers, setTravelers] = useState<TravelerType>("Couple");
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState(35000);
  const [vibe, setVibe] = useState("");
  const [planned, setPlanned] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(
    () => matchTours({ travelers, days, budget, vibe }, tours).slice(0, 3),
    [travelers, days, budget, vibe],
  );

  const handlePlan = () => {
    setPlanned(true);
    // On mobile the results panel is below the form — scroll to it after render
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <section id="trip-planner" className="aurora section-surface-night overflow-hidden px-4 py-20 sm:py-28">
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="AI Trip Planner"
          title="Describe the trip. Get the package."
          text="Tell us how you travel — our planner scores every live departure on-device and shows the closest fits instantly."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Brief panel */}
          <div className="glass rounded-3xl p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
              Who is travelling?
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {travelerOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTravelers(option)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition",
                    travelers === option
                      ? "bg-brand-gold text-brand-forest-deep shadow-lg shadow-black/20"
                      : "bg-white/8 text-white/75 hover:bg-white/15",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                  Trip length
                </p>
                <p className="text-sm font-bold text-brand-gold-light">{days} days</p>
              </div>
              <input
                type="range"
                min={2}
                max={8}
                value={days}
                onChange={(event) => setDays(Number(event.target.value))}
                aria-label="Trip length in days"
                className="mt-3 w-full accent-[#f0c96a]"
              />
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                  Budget per person
                </p>
                <p className="text-sm font-bold text-brand-gold-light">
                  Rs. {budget.toLocaleString("en-PK")}
                </p>
              </div>
              <input
                type="range"
                min={10000}
                max={60000}
                step={2500}
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value))}
                aria-label="Budget per person in rupees"
                className="mt-3 w-full accent-[#f0c96a]"
              />
            </div>

            <div className="mt-7">
              <label
                htmlFor="trip-vibe"
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55"
              >
                What should it feel like?
              </label>
              <input
                id="trip-vibe"
                type="text"
                value={vibe}
                onChange={(event) => setVibe(event.target.value)}
                placeholder="e.g. lakes, light trekking, Hunza culture…"
                className="mt-3 w-full rounded-2xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-brand-gold/50 focus:bg-white/12"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {vibeSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setVibe(suggestion)}
                    className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-white/65 transition hover:border-brand-gold/40 hover:text-brand-gold-light"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlan}
              className="gold-glow mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-gold-light to-brand-gold px-6 py-4 text-sm font-bold text-brand-forest-deep transition hover:-translate-y-0.5 hover:brightness-105"
            >
              <Wand2 className="h-4 w-4" />
              {planned ? "Refresh my matches" : "Plan my trip"}
            </button>
          </div>

          {/* Results panel */}
          <div ref={resultsRef} aria-live="polite" className="scroll-mt-24">
            {!planned ? (
              <div className="glass-soft flex h-full min-h-[20rem] flex-col items-center justify-center rounded-3xl p-10 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold-light ring-1 ring-brand-gold/35">
                  <Sparkles className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <p className="mt-5 font-display text-2xl font-semibold text-white">
                  Your matches appear here
                </p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/60">
                  Set your travellers, days, and budget — then press{" "}
                  <span className="font-semibold text-brand-gold-light">Plan my trip</span>. Every
                  suggestion is a real, bookable departure.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {matches.map(({ tour, reasons }, index) => (
                    <motion.article
                      key={tour.slug}
                      layout={!reduceMotion}
                      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      className={cn(
                        "glass relative overflow-hidden rounded-3xl p-4 sm:p-5",
                        index === 0 && "ring-1 ring-brand-gold/45",
                      )}
                    >
                      {index === 0 && (
                        <span className="absolute right-4 top-4 z-10 rounded-full bg-brand-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-forest-deep">
                          Best match
                        </span>
                      )}
                      <div className="flex gap-4 sm:gap-5">
                        <Link
                          href={`/tours/${tour.slug}`}
                          className="relative block h-28 w-28 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-40"
                        >
                          <Image
                            src={getTourCardImage(tour)}
                            alt={tour.title}
                            fill
                            loading="lazy"
                            sizes="(min-width: 640px) 10rem, 7rem"
                            className="object-cover transition duration-700 hover:scale-105"
                          />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <Link href={`/tours/${tour.slug}`}>
                            <h3 className="font-display line-clamp-2 pr-20 text-lg font-semibold leading-snug text-white transition hover:text-brand-gold-light sm:text-xl">
                              {tour.title}
                            </h3>
                          </Link>
                          <p className="mt-1.5 flex items-center gap-3 text-xs text-white/60">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-brand-gold-light" />
                              {formatTourDurationBadge(tour.duration)}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-brand-gold-light" />
                              {tour.pricePerHead} / head
                            </span>
                          </p>
                          <ul className="mt-3 hidden space-y-1 sm:block">
                            {reasons.map((reason) => (
                              <li
                                key={reason}
                                className="flex items-start gap-2 text-xs leading-5 text-white/70"
                              >
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-gold-light" />
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-2.5">
                        <WhatsAppButton
                          message={tour.whatsappMessage}
                          className="px-5 py-2.5 text-xs sm:text-sm"
                        >
                          Book this trip
                        </WhatsAppButton>
                        <Link
                          href={`/tours/${tour.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-xs font-semibold text-white/85 transition hover:border-brand-gold/40 hover:text-brand-gold-light sm:text-sm"
                        >
                          Full itinerary <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
                <p className="px-2 text-center text-xs text-white/45">
                  Matched from {tours.length} live packages · prices from the published flyers ·
                  confirm final details on WhatsApp.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
