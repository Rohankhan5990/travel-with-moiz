"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  GitCompareArrows,
  Heart,
  Mic,
  MicOff,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { TourCard } from "@/components/TourCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { tours } from "@/lib/tours";
import type { Tour } from "@/lib/tour-types";
import { getTourCardImage } from "@/lib/tour-card-images";
import { formatTourDurationBadge } from "@/lib/tour-duration";
import {
  formatRs,
  getTourBasePrice,
  getTourDifficulty,
  getTourRegions,
  parseDays,
  type Region,
} from "@/lib/tour-meta";
import { searchTours } from "@/lib/trip-match";
import { useWishlist } from "@/lib/traveler-prefs";
import { cn } from "@/lib/utils";

const regionFilters: Region[] = [
  "Hunza",
  "Skardu",
  "Kashmir",
  "Naran",
  "Swat",
  "Kumrat",
  "Fairy Meadows",
];

const durationFilters = [
  { label: "Any length", min: 0, max: 99 },
  { label: "Weekend (2–3 days)", min: 2, max: 3 },
  { label: "4–5 days", min: 4, max: 5 },
  { label: "6+ days", min: 6, max: 99 },
];

const BUDGET_MAX = 60000;
const COMPARE_LIMIT = 3;
const travelTypeFilters = ["Family", "Couple", "Group", "Custom"] as const;
type TravelTypeFilter = (typeof travelTypeFilters)[number];
const subscribeToBrowserCapabilities = () => () => {};

/** Minimal typing for the Web Speech API (Chrome/Edge/Safari). */
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null) as
    | (new () => SpeechRecognitionLike)
    | null;
}

function CompareModal({ selected, onClose }: { selected: Tour[]; onClose: () => void }) {
  const rows: { label: string; value: (tour: Tour) => React.ReactNode }[] = [
    { label: "Duration", value: (t) => formatTourDurationBadge(t.duration) },
    { label: "Price / head", value: (t) => t.pricePerHead },
    { label: "Couple price", value: (t) => t.couplePrice },
    {
      label: "Deluxe / head",
      value: (t) => t.deluxePricePerHead ?? "—",
    },
    { label: "Difficulty", value: (t) => getTourDifficulty(t) },
    { label: "Regions", value: (t) => getTourRegions(t).join(", ") },
    {
      label: "Top attractions",
      value: (t) => t.attractions.slice(0, 5).join(" · "),
    },
    { label: "Included", value: (t) => `${t.included.length} services` },
    { label: "Departure", value: (t) => t.departureInfo },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Compare tours"
      className="fixed inset-0 z-[70] flex items-end justify-center bg-brand-night/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="glass scrollbar-luxe max-h-[88vh] w-full max-w-5xl overflow-auto rounded-t-3xl bg-brand-forest-dark/95 p-5 sm:rounded-3xl sm:p-8"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Compare packages
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close comparison"
            className="glass-soft flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/15"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 text-sm"
          style={{ gridTemplateColumns: `8rem repeat(${selected.length}, minmax(0, 1fr))` }}
        >
          <div className="bg-brand-forest-dark p-3" />
          {selected.map((tour) => (
            <div key={tour.slug} className="bg-brand-forest-dark p-3">
              <div className="relative h-24 overflow-hidden rounded-xl sm:h-28">
                <Image
                  src={getTourCardImage(tour)}
                  alt=""
                  fill
                  sizes="20rem"
                  className="object-cover"
                />
              </div>
              <p className="mt-2.5 line-clamp-2 font-semibold leading-snug text-white">
                {tour.title}
              </p>
            </div>
          ))}

          {rows.map((row) => (
            <div key={row.label} className="contents">
              <div className="bg-brand-forest-dark p-3 text-xs font-semibold uppercase tracking-wide text-white/55">
                {row.label}
              </div>
              {selected.map((tour) => (
                <div key={tour.slug} className="bg-brand-forest-dark p-3 leading-6 text-white/85">
                  {row.value(tour)}
                </div>
              ))}
            </div>
          ))}

          <div className="bg-brand-forest-dark p-3" />
          {selected.map((tour) => (
            <div key={tour.slug} className="bg-brand-forest-dark p-3">
              <WhatsAppButton message={tour.whatsappMessage} className="w-full px-3 py-2.5 text-xs">
                Book this one
              </WhatsAppButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Filters carried over from the hero trip-finder / destination links. */
function filtersFromParams(params: URLSearchParams) {
  const regionParam = params.get("region");
  const daysParam = Number(params.get("days"));
  const budgetParam = Number(params.get("budget"));
  return {
    region:
      regionParam && regionFilters.includes(regionParam as Region)
        ? (regionParam as Region)
        : null,
    duration:
      durationFilters.find((d) => daysParam && daysParam >= d.min && daysParam <= d.max) ??
      durationFilters[0],
    budget: budgetParam >= 10000 && budgetParam <= BUDGET_MAX ? budgetParam : BUDGET_MAX,
    query: params.get("q") ?? "",
  };
}

export function TourExplorer() {
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();
  const { slugs: wishlist } = useWishlist();

  const initial = useMemo(() => filtersFromParams(searchParams), [searchParams]);
  const [query, setQuery] = useState(initial.query);
  const [region, setRegion] = useState<Region | null>(initial.region);
  const [duration, setDuration] = useState(initial.duration);
  const [budget, setBudget] = useState(initial.budget);
  const [travelType, setTravelType] = useState<TravelTypeFilter | null>(null);
  const [savedOnly, setSavedOnly] = useState(false);
  const [compare, setCompare] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const speechSupported = useSyncExternalStore(
    subscribeToBrowserCapabilities,
    () => getSpeechRecognition() !== null,
    () => false,
  );

  // Re-apply when the URL params change in place (e.g. footer destination links
  // clicked while already on /tours). Render-phase adjustment, not an effect.
  const [appliedParams, setAppliedParams] = useState(searchParams.toString());
  if (searchParams.toString() !== appliedParams) {
    setAppliedParams(searchParams.toString());
    setRegion(initial.region);
    setDuration(initial.duration);
    setBudget(initial.budget);
    if (initial.query) setQuery(initial.query);
  }

  const toggleVoice = () => {
    const Recognition = getSpeechRecognition();
    if (!Recognition) return;
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const recognition = new Recognition();
    recognition.lang = "en-PK";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) setQuery(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  const filtered = useMemo(() => {
    let result = searchTours(query, tours);
    if (region) result = result.filter((tour) => getTourRegions(tour).includes(region));
    result = result.filter((tour) => {
      const days = parseDays(tour.duration);
      return days >= duration.min && days <= duration.max;
    });
    if (budget < BUDGET_MAX) {
      result = result.filter((tour) => {
        const price = getTourBasePrice(tour);
        return price === null || price <= budget;
      });
    }
    if (travelType) {
      result =
        travelType === "Custom"
          ? []
          : result.filter((tour) => tour.category.includes(travelType));
    }
    if (savedOnly) result = result.filter((tour) => wishlist.includes(tour.slug));
    return result;
  }, [query, region, duration, budget, travelType, savedOnly, wishlist]);

  const compareTours = compare
    .map((slug) => tours.find((tour) => tour.slug === slug))
    .filter((tour): tour is Tour => Boolean(tour));

  const toggleCompare = (slug: string) => {
    setCompare((current) =>
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : current.length >= COMPARE_LIMIT
          ? current
          : [...current, slug],
    );
  };

  const hasActiveFilters =
    query ||
    region ||
    duration !== durationFilters[0] ||
    budget < BUDGET_MAX ||
    travelType ||
    savedOnly;

  return (
    <div id="explorer">
      {/* Search bar */}
      <div className="glass mx-auto flex max-w-3xl items-center gap-2 rounded-full p-2 pl-5">
        <Search className="h-5 w-5 shrink-0 text-brand-gold-light" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Try "Hunza 5 days" or "lakes family"…'
          aria-label="Search tours"
          className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-white/40 outline-none sm:text-base"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/60 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {speechSupported && (
          <button
            type="button"
            onClick={toggleVoice}
            aria-label={listening ? "Stop voice search" : "Search by voice"}
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition",
              listening
                ? "animate-pulse bg-rose-500 text-white"
                : "bg-white/10 text-white hover:bg-white/20",
            )}
          >
            {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mt-7 space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setRegion(null)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm",
              region === null
                ? "border border-brand-gold/50 bg-brand-gold/15 text-brand-gold-light"
                : "border border-white/10 bg-white/5 text-white/65 hover:bg-white/10",
            )}
          >
            All regions
          </button>
          {regionFilters.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRegion(region === option ? null : option)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm",
                region === option
                  ? "border border-brand-gold/50 bg-brand-gold/15 text-brand-gold-light"
                  : "border border-white/10 bg-white/5 text-white/65 hover:bg-white/10",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
            Travel type
          </span>
          {travelTypeFilters.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setTravelType(travelType === option ? null : option)}
              aria-pressed={travelType === option}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm",
                travelType === option
                  ? "border-brand-gold/50 bg-brand-gold/15 text-brand-gold-light"
                  : "border-white/10 bg-white/5 text-white/65 hover:bg-white/10",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-white/50" />
            {durationFilters.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setDuration(option)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition",
                  duration === option
                    ? "bg-white text-brand-forest-deep"
                    : "text-white/60 hover:text-white",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-3 text-xs text-white/70">
            <span className="font-semibold uppercase tracking-wide">Budget</span>
            <input
              type="range"
              min={10000}
              max={BUDGET_MAX}
              step={2500}
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
              className="w-36 accent-[#f0c96a]"
            />
            <span className="w-24 font-bold text-brand-gold-light">
              {budget >= BUDGET_MAX ? "Any" : `≤ ${formatRs(budget)}`}
            </span>
          </label>

          <button
            type="button"
            onClick={() => setSavedOnly((value) => !value)}
            aria-pressed={savedOnly}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition",
              savedOnly
                ? "bg-rose-500/20 text-rose-300 ring-1 ring-rose-400/40"
                : "bg-white/5 text-white/65 hover:bg-white/10",
            )}
          >
            <Heart className={cn("h-3.5 w-3.5", savedOnly && "fill-current")} />
            Saved {wishlist.length > 0 && `(${wishlist.length})`}
          </button>
        </div>
      </div>

      {/* Result count */}
      <p className="mt-8 text-center text-sm text-white/55" aria-live="polite">
        {filtered.length === tours.length
          ? `All ${tours.length} packages`
          : `${filtered.length} of ${tours.length} packages match`}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setRegion(null);
              setDuration(durationFilters[0]);
              setBudget(BUDGET_MAX);
              setTravelType(null);
              setSavedOnly(false);
            }}
            className="ml-3 font-semibold text-brand-gold-light underline-offset-4 hover:underline"
          >
            Reset
          </button>
        )}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="glass-soft mx-auto mt-10 max-w-xl rounded-3xl p-10 text-center">
          <p className="font-display text-2xl font-semibold text-white">No exact match — yet</p>
          <p className="mt-2 text-sm leading-6 text-white/65">
            We run custom departures all season. Tell us your plan on WhatsApp and we will build
            the route around it.
          </p>
          <WhatsAppButton
            message="Hi Travel With Moiz, I'm looking for a custom tour. Here's my plan:"
            className="mt-6"
          >
            Plan a custom trip
          </WhatsAppButton>
        </div>
      ) : (
        <motion.div layout={!reduceMotion} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((tour, index) => {
              const comparing = compare.includes(tour.slug);
              return (
                <motion.div
                  key={tour.slug}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="relative"
                >
                  <TourCard tour={tour} priority={index === 0} />
                  <button
                    type="button"
                    onClick={() => toggleCompare(tour.slug)}
                    aria-pressed={comparing}
                    className={cn(
                      "absolute right-3 top-14 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold backdrop-blur-md transition",
                      comparing
                        ? "bg-brand-gold text-brand-forest-deep shadow-lg"
                        : "bg-black/35 text-white hover:bg-black/50",
                    )}
                  >
                    {comparing ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <GitCompareArrows className="h-3.5 w-3.5" />
                    )}
                    Compare
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Compare tray */}
      <AnimatePresence>
        {compareTours.length > 0 && (
          <motion.div
            initial={reduceMotion ? false : { y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? undefined : { y: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4"
          >
            <div className="glass mx-auto flex max-w-2xl items-center justify-between gap-4 rounded-2xl bg-brand-forest-dark/90 p-3 pl-5 sm:rounded-full">
              <p className="text-sm font-semibold text-white">
                {compareTours.length}/{COMPARE_LIMIT} selected
                <span className="ml-2 hidden text-white/55 sm:inline">
                  {compareTours.map((tour) => getTourRegions(tour)[0] ?? tour.title).join(" · ")}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCompare([])}
                  className="rounded-full px-4 py-2.5 text-xs font-semibold text-white/65 transition hover:text-white"
                >
                  Clear
                </button>
                <button
                  type="button"
                  disabled={compareTours.length < 2}
                  onClick={() => setShowCompare(true)}
                  className="gold-glow rounded-full bg-gradient-to-r from-brand-gold-light to-brand-gold px-5 py-2.5 text-xs font-bold text-brand-forest-deep transition enabled:hover:brightness-105 disabled:opacity-50 sm:text-sm"
                >
                  Compare now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showCompare && compareTours.length >= 2 && (
        <CompareModal selected={compareTours} onClose={() => setShowCompare(false)} />
      )}
    </div>
  );
}
