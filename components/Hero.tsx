"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Mouse,
  Mountain,
  ShieldCheck,
} from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const heroImage =
  "/images/brand/hero-banner.png";

const thumbnails = [
  "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1562979314-bee7453e911c?auto=format&fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=240&q=80",
];

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
          alt="Pakistan mountain lake hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#031b24]/88 via-[#052c32]/42 to-[#031b24]/8" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_50%,transparent_0,rgba(2,6,23,0.04)_36%,rgba(2,6,23,0.68)_100%)]" />

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
          <h1 className="text-5xl font-black uppercase leading-[1.08] tracking-wide drop-shadow-2xl md:text-7xl">
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

          <div className="mt-9 flex flex-wrap gap-4">
            {thumbnails.map((thumb, index) => (
              <div
                key={thumb}
                className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white bg-white shadow-xl shadow-black/20 md:h-20 md:w-20"
              >
                <Image
                  src={thumb}
                  alt={`Pakistan destination preview ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 z-30 hidden -translate-x-1/2 text-center text-white/80 md:block">
          <Mouse className="mx-auto h-8 w-8" />
          <p className="mt-2 text-sm">Scroll Down</p>
        </div>
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
