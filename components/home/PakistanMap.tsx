"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Mountain } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { tours } from "@/lib/tours";
import { getTourRegions, type Region } from "@/lib/tour-meta";
import { cn } from "@/lib/utils";

type MapStop = {
  name: string;
  region: Region;
  x: number;
  y: number;
  image: string;
  blurb: string;
};

/**
 * Stylised relative positions (viewBox 0 0 800 620) — editorial, not survey
 * geography. Islamabad anchors the routes at the bottom.
 */
const HUB = { x: 395, y: 545 };

const stops: MapStop[] = [
  {
    name: "Hunza Valley",
    region: "Hunza",
    x: 470,
    y: 115,
    image: "/images/pakistan-places-images/huzan.webp",
    blurb: "Karimabad's forts, Attabad Lake, and the Khunjerab Pass at 4,693m.",
  },
  {
    name: "Skardu",
    region: "Skardu",
    x: 625,
    y: 205,
    image: "/images/pakistan-places-images/skardu.webp",
    blurb: "Shangrila, Manthoka falls, and the rolling Deosai plains.",
  },
  {
    name: "Fairy Meadows",
    region: "Fairy Meadows",
    x: 480,
    y: 255,
    image: "/images/pakistan-places-images/Fairy-Meadows-trek.webp",
    blurb: "Jeep track and trek to the grandstand view of Nanga Parbat.",
  },
  {
    name: "Naran & Shogran",
    region: "Naran",
    x: 455,
    y: 360,
    image: "/images/card-images/naran.webp",
    blurb: "Saif-ul-Malook, Siri Paye meadows, and Babusar Top.",
  },
  {
    name: "Kumrat",
    region: "Kumrat",
    x: 255,
    y: 290,
    image: "/images/card-images/kumrat.webp",
    blurb: "Deodar forests, river camps, and the Jahaz Banda meadows.",
  },
  {
    name: "Swat & Kalam",
    region: "Swat",
    x: 310,
    y: 380,
    image: "/images/card-images/swat.webp",
    blurb: "Malam Jabba, Bahrain bazaars, and Kalam's green valley.",
  },
  {
    name: "Kashmir & Neelum",
    region: "Kashmir",
    x: 545,
    y: 440,
    image: "/images/pakistan-places-images/kashmir-valley1.webp",
    blurb: "Sharda, Keran, Arang Kel, and the turquoise Neelum river.",
  },
];

function routePath(stop: MapStop) {
  const midX = (HUB.x + stop.x) / 2 + (stop.x > HUB.x ? 40 : -40);
  const midY = (HUB.y + stop.y) / 2;
  return `M ${HUB.x} ${HUB.y} Q ${midX} ${midY} ${stop.x} ${stop.y}`;
}

export function PakistanMap() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<MapStop>(stops[0]);

  const tourCountByRegion = useMemo(() => {
    const counts = new Map<Region, number>();
    for (const tour of tours) {
      for (const region of getTourRegions(tour)) {
        counts.set(region, (counts.get(region) ?? 0) + 1);
      }
    }
    return counts;
  }, []);

  const activeCount = tourCountByRegion.get(active.region) ?? 0;

  return (
    <section className="section-surface-night px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Routes"
          title="One map. Every road north."
          text="Tap a destination to see what runs there — all routes depart via Islamabad and Lahore."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          {/* Map: scrollable horizontally on mobile so pins are readable */}
          <div className="glass-soft relative overflow-x-auto overflow-y-hidden rounded-3xl p-2 sm:overflow-hidden sm:p-4">
            <svg
              viewBox="0 0 800 620"
              role="group"
              aria-label="Interactive map of northern Pakistan destinations"
              className="h-auto min-w-[560px] w-full sm:min-w-0"
            >
              {/* Contour backdrop */}
              {[90, 150, 210, 270, 330].map((r, i) => (
                <circle
                  key={r}
                  cx={440}
                  cy={250}
                  r={r}
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth={1}
                  strokeDasharray={i % 2 ? "4 6" : undefined}
                />
              ))}
              <circle cx={170} cy={480} r={120} fill="none" stroke="rgba(255,255,255,0.04)" />
              <circle cx={680} cy={480} r={150} fill="none" stroke="rgba(255,255,255,0.04)" />

              {/* Routes */}
              {stops.map((stop) => (
                <path
                  key={stop.name}
                  d={routePath(stop)}
                  fill="none"
                  strokeWidth={stop.name === active.name ? 2.5 : 1.5}
                  stroke={
                    stop.name === active.name ? "rgba(240,201,106,0.9)" : "rgba(255,255,255,0.18)"
                  }
                  className={cn(!reduceMotion && stop.name === active.name && "route-dash")}
                  strokeDasharray={stop.name === active.name ? undefined : "3 9"}
                />
              ))}

              {/* Islamabad hub */}
              <g>
                <circle cx={HUB.x} cy={HUB.y} r={7} fill="#f0c96a" />
                <circle cx={HUB.x} cy={HUB.y} r={14} fill="none" stroke="rgba(240,201,106,0.4)" />
                <text
                  x={HUB.x}
                  y={HUB.y + 34}
                  textAnchor="middle"
                  className="fill-white/70"
                  fontSize={18}
                  fontWeight={600}
                >
                  Islamabad
                </text>
              </g>

              {/* Destination markers */}
              {stops.map((stop) => {
                const isActive = stop.name === active.name;
                return (
                  <g
                    key={stop.name}
                    role="button"
                    tabIndex={0}
                    aria-label={`Show ${stop.name}`}
                    aria-pressed={isActive}
                    onClick={() => setActive(stop)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActive(stop);
                      }
                    }}
                    className="cursor-pointer outline-none focus-visible:opacity-80"
                  >
                    <circle
                      cx={stop.x}
                      cy={stop.y}
                      r={26}
                      fill="transparent"
                    />
                    <circle
                      cx={stop.x}
                      cy={stop.y}
                      r={isActive ? 10 : 7}
                      fill={isActive ? "#f0c96a" : "rgba(255,255,255,0.85)"}
                      stroke={isActive ? "rgba(240,201,106,0.45)" : "rgba(255,255,255,0.25)"}
                      strokeWidth={isActive ? 10 : 6}
                      className="transition-all duration-300"
                    />
                    <text
                      x={stop.x}
                      y={stop.y - 24}
                      textAnchor="middle"
                      fontSize={18}
                      fontWeight={isActive ? 700 : 500}
                      className={isActive ? "fill-brand-gold-light" : "fill-white/80"}
                    >
                      {stop.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Destination detail card */}
          <div className="relative min-h-[24rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="glass absolute inset-0 flex flex-col overflow-hidden rounded-3xl"
              >
                <div className="relative h-48 shrink-0 sm:h-56">
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-night/90 to-transparent" />
                  <p className="absolute bottom-4 left-5 flex items-center gap-2 font-display text-3xl font-semibold text-white">
                    <Mountain className="h-6 w-6 text-brand-gold-light" strokeWidth={1.5} />
                    {active.name}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="leading-7 text-white/75">{active.blurb}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold-light">
                    <MapPin className="h-4 w-4" />
                    {activeCount} {activeCount === 1 ? "package runs" : "packages run"} this route
                  </p>
                  <Link
                    href={`/tours?region=${encodeURIComponent(active.region)}#explorer`}
                    className="gold-glow mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-gold-light to-brand-gold px-6 py-3.5 text-sm font-bold text-brand-forest-deep transition hover:-translate-y-0.5 hover:brightness-105"
                  >
                    See {active.name} tours <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
