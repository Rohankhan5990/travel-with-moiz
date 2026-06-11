"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown, MapPin, Sparkles, Wallet } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { tours } from "@/lib/tours";
import { getTourRegions } from "@/lib/tour-meta";
import type { TravelerType } from "@/lib/trip-match";
import { preferWebp } from "@/lib/optimized-image";
import { cn } from "@/lib/utils";

const heroImage = preferWebp("/images/brand/background.jpg");

const regionCount = new Set(tours.flatMap((tour) => getTourRegions(tour))).size;

const stats = [
  { value: tours.length, suffix: "", label: "Signature tours" },
  { value: regionCount, suffix: "+", label: "Regions covered" },
  { value: 1, suffix: "", label: "Message to book" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduceMotion) {
      node.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, reduceMotion]);

  return (
    <span ref={ref} className="font-display text-3xl font-semibold text-white sm:text-4xl">
      0{suffix}
    </span>
  );
}

const travelerOptions: TravelerType[] = ["Family", "Couple", "Friends", "Corporate"];
const dayOptions = [2, 3, 4, 5, 6, 8];

function TripFinder() {
  const router = useRouter();
  const [travelers, setTravelers] = useState<TravelerType>("Family");
  const [days, setDays] = useState(4);
  const [budget, setBudget] = useState(30000);

  const submit = () => {
    const params = new URLSearchParams({
      group: travelers,
      days: String(days),
      budget: String(budget),
    });
    router.push(`/tours?${params.toString()}#explorer`);
  };

  return (
    <div className="glass relative w-full max-w-md rounded-3xl p-6 sm:p-7">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold-light ring-1 ring-brand-gold/40">
          <Sparkles className="h-4.5 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">Design your trip</p>
          <p className="text-xs text-white/65">Instant matches from real departures</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Travelling as
        </p>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {travelerOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setTravelers(option)}
              className={cn(
                "rounded-xl px-1 py-2 text-xs font-semibold transition",
                travelers === option
                  ? "bg-brand-gold text-brand-forest-deep shadow-md shadow-black/20"
                  : "bg-white/8 text-white/75 hover:bg-white/15",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Days</p>
        <div className="mt-2 grid grid-cols-6 gap-1.5">
          {dayOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setDays(option)}
              className={cn(
                "rounded-xl py-2 text-sm font-semibold transition",
                days === option
                  ? "bg-white text-brand-forest-deep shadow-md shadow-black/20"
                  : "bg-white/8 text-white/75 hover:bg-white/15",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            <Wallet className="h-3.5 w-3.5" /> Budget / person
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

      <button
        type="button"
        onClick={submit}
        className="gold-glow mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-gold-light to-brand-gold px-6 py-3.5 text-sm font-bold text-brand-forest-deep transition hover:-translate-y-0.5 hover:brightness-105"
      >
        <MapPin className="h-4 w-4" />
        Find my tour
      </button>
      <p className="mt-3 text-center text-[11px] text-white/55">
        Matched on-device from {tours.length} live packages — no signup needed.
      </p>
    </div>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.55]);

  return (
    <section ref={sectionRef} className="aurora relative isolate w-full max-w-full overflow-hidden bg-brand-night text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroImage}
          alt="Pakistan mountain lake hero landscape"
          fill
          priority
          sizes="100vw"
          className="object-contain object-center brightness-[1.02] contrast-[1.04] saturate-[1.08]"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-brand-night/92 via-brand-forest-dark/45 to-brand-night/35" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_20%_40%,rgba(2,18,13,0.55)_0%,transparent_60%)]" />
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="pointer-events-none absolute inset-0 -z-10 bg-brand-night"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-brand-night to-transparent" />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-24 pt-32 sm:pt-36"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.21, 0.65, 0.32, 1] }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-gold/35 bg-brand-gold/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-gold-light backdrop-blur-sm sm:text-xs">
              Northern Pakistan · Curated
            </p>
            <h1 className="text-balance mt-6 font-display text-5xl font-semibold leading-[1.06] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.55)] sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              Journeys That
              <span className="block bg-gradient-to-r from-brand-gold-light via-[#f7e3a8] to-brand-gold bg-clip-text italic text-transparent">
                Stay Forever
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/85 md:text-xl">
              Hunza, Skardu, Kashmir, and the valleys in between — handcrafted
              group and private tours, planned with care and booked in one
              WhatsApp message.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <WhatsAppButton className="gold-glow bg-gradient-to-r from-brand-gold-light to-brand-gold px-8 py-4 text-base font-bold text-brand-forest-deep shadow-xl shadow-black/25 hover:brightness-105">
                Plan Your Trip
              </WhatsAppButton>
              <a
                href="#trip-planner"
                className="glass-soft inline-flex items-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <Sparkles className="h-4 w-4 text-brand-gold-light" />
                Try the AI planner
              </a>
            </div>

            <div className="mt-12 flex max-w-md items-stretch justify-between gap-4 border-t border-white/12 pt-7">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <CountUp value={stat.value} suffix={stat.suffix} />
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-white/55">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.21, 0.65, 0.32, 1] }}
            className="hidden justify-self-end lg:flex"
          >
            <TripFinder />
          </motion.div>
        </div>
      </motion.div>

      <a
        href="#destinations"
        aria-label="Scroll to destinations"
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-white/60 transition hover:text-white"
      >
        <ChevronDown className={cn("h-6 w-6", !reduceMotion && "float-y")} />
      </a>
    </section>
  );
}
