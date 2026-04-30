"use client";

import { motion } from "framer-motion";
import { ArrowRight, Compass, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { Hero3D } from "@/components/Hero3D";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#031f2d] px-4 pt-32 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.35),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(245,158,11,0.22),transparent_24%),linear-gradient(135deg,#031f2d_0%,#083344_45%,#020617_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <Hero3D />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100 backdrop-blur">
            <Sparkles className="h-4 w-4 text-amber-300" />
            Premium Pakistan tours with one-click WhatsApp booking
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            Explore Pakistan With Travel With Moiz
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
            Cinematic Hunza, Skardu and Kashmir journeys for groups, families,
            couples, and custom private escapes.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton className="px-7 py-4 text-base">
              Plan My Tour
            </WhatsAppButton>
            <Link
              href="/tours"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white/15"
            >
              View Packages <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Skardu", "Hunza", "Kashmir", "Family", "Couple", "Custom"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 backdrop-blur"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 12 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative hidden min-h-[520px] lg:block"
        >
          <div className="absolute bottom-10 right-0 w-[26rem] rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-4">
              {[
                ["4+", "Signature tours"],
                ["24/7", "WhatsApp help"],
                ["Family", "Friendly trips"],
                ["Local", "Route support"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl bg-slate-950/45 p-5">
                  <p className="text-3xl font-black text-cyan-200">{value}</p>
                  <p className="mt-1 text-sm text-slate-300">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-3xl bg-gradient-to-r from-teal-500/25 to-cyan-400/20 p-4">
              <ShieldCheck className="h-8 w-8 text-cyan-200" />
              <p className="text-sm font-semibold text-slate-100">
                Safe transport, planned stays, and flexible custom tours.
              </p>
            </div>
          </div>
          <div className="absolute left-0 top-16 rounded-full border border-white/15 bg-white/10 px-5 py-4 font-bold backdrop-blur-xl">
            <Compass className="mr-2 inline h-5 w-5 text-amber-300" />
            Northern Pakistan Specialist
          </div>
        </motion.div>
      </div>
    </section>
  );
}
