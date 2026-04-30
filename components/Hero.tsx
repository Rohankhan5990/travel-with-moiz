"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Mountain,
  ShieldCheck,
} from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const heroImage = "/images/brand/hero-banner.png";

const trustItems = [
  { Icon: Mountain, title: "Handpicked", text: "Destinations" },
  { Icon: ShieldCheck, title: "Safe &", text: "Secure Travel" },
  { Icon: Camera, title: "Unforgettable", text: "Memories" },
  { Icon: Headphones, title: "24/7 Travel", text: "Support" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white text-white">
      <div className="relative min-h-screen overflow-hidden bg-emerald-950 px-4 pt-28">
        <Image
          src={heroImage}
          alt="Pakistan mountain lake hero landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[1.08] contrast-[1.08] saturate-[1.18]"
        />
        {/* Left-weighted scrim for headline legibility; right stays lighter so the photo stays vivid */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#031b24]/85 via-[#031b24]/30 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_110%_80%_at_15%_45%,rgba(2,15,20,0.55)_0%,transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/35 via-transparent to-slate-950/25" />

        <button
          type="button"
          aria-label="Previous destination"
          className="absolute left-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 md:flex"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          type="button"
          aria-label="Next destination"
          className="absolute right-6 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 md:flex"
        >
          <ChevronRight className="h-8 w-8" />
        </button>

        <div className="absolute inset-x-0 bottom-0 z-20 h-24 bg-white [clip-path:polygon(0_66%,8%_70%,17%_63%,27%_71%,39%_62%,49%_70%,61%_64%,73%_73%,84%_63%,93%_70%,100%_64%,100%_100%,0_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center pb-28 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="mb-6 text-sm font-black uppercase tracking-[0.28em] text-amber-300">
            Explore Pakistan
          </div>
          <h1 className="text-5xl font-black uppercase leading-[1.08] tracking-wide drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] md:text-7xl">
            Journeys That
            <span className="block">Stay Forever</span>
          </h1>
          <p className="mt-5 max-w-md text-lg font-medium leading-8 text-white/92 md:text-xl">
            Mountains, Lakes, Adventures. Let&apos;s travel together.
          </p>

          <div className="mt-7">
            <WhatsAppButton className="bg-gradient-to-r from-amber-300 to-yellow-400 px-7 py-4 text-base text-emerald-950 shadow-amber-950/25 hover:shadow-amber-400/25">
              Plan Your Trip
            </WhatsAppButton>
          </div>
        </motion.div>
        </div>
      </div>

      <div className="relative z-30 bg-white px-4 pb-10 pt-8 text-[#102f27]">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-4">
          {trustItems.map(({ Icon, title, text }) => (
            <div key={title} className="flex items-center justify-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-emerald-900/15 text-emerald-700 shadow-lg shadow-emerald-950/5">
                <Icon className="h-7 w-7" />
              </span>
              <div>
                <p className="font-black">{title}</p>
                <p className="font-medium text-slate-600">{text}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
    </section>
  );
}
