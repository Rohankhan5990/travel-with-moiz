"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  Camera,
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
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-white text-white">
      <div className="relative min-h-screen overflow-hidden bg-brand-forest-deep px-4 pt-28">
        <Image
          src={heroImage}
          alt="Pakistan mountain lake hero landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[1.04] contrast-[1.04] saturate-[1.08]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-forest-deep/90 via-brand-forest-deep/35 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_110%_80%_at_15%_45%,rgba(2,15,20,0.5)_0%,transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/20" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-14 bg-gradient-to-t from-white from-20% to-transparent sm:h-16" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center pb-20 pt-12 sm:pb-24">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-brand-gold-light sm:text-sm">
              Explore Pakistan
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[1.1] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] md:text-7xl md:leading-[1.08]">
              Journeys That
              <span className="block italic text-brand-gold-light">Stay Forever</span>
            </h1>
            <p className="mt-6 max-w-md text-lg font-normal leading-8 text-white/90 md:text-xl">
              Mountains, lakes, and adventures across Hunza, Skardu, and Kashmir — planned with care, booked in one message.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <WhatsAppButton className="bg-gradient-to-r from-brand-gold-light to-brand-gold px-8 py-4 text-base font-bold text-brand-forest-deep shadow-lg shadow-black/20 hover:shadow-brand-gold/30">
                Plan Your Trip
              </WhatsAppButton>
              <a
                href="/tours"
                className="inline-flex items-center rounded-full border border-white/30 px-6 py-4 text-sm font-semibold text-white/95 backdrop-blur-sm transition hover:border-white/50 hover:bg-white/10"
              >
                View Packages
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-30 bg-white px-4 pb-12 pt-8 text-brand-ink">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-4">
          {trustItems.map(({ Icon, title, text }) => (
            <div key={title} className="flex items-center justify-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-900/10 bg-brand-cream text-brand-forest shadow-sm">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-semibold text-brand-forest">{title}</p>
                <p className="text-sm text-slate-600">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
