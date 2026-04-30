"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Search,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";
import Link from "next/link";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const heroImage =
  "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=2400&q=90";

const searchItems = [
  { Icon: MapPin, title: "Destination", value: "Where to?" },
  { Icon: Tag, title: "Tour Type", value: "Select Type" },
  { Icon: Clock3, title: "Duration", value: "Select Duration" },
  { Icon: Users, title: "Guests", value: "Add Guests" },
];

const trustItems = [
  { Icon: MapPin, title: "Expert Guides", text: "Travel with experienced local guides." },
  { Icon: ShieldCheck, title: "Safe & Secure", text: "Your safety is our top priority." },
  { Icon: CalendarDays, title: "Best Itineraries", text: "Carefully planned tours for every route." },
  { Icon: Tag, title: "Best Price", text: "Affordable packages with strong value." },
];

export function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-emerald-950 px-4 pb-24 pt-32 text-white">
      <Image
        src={heroImage}
        alt="Pakistan mountain lake hero background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/78 via-emerald-950/32 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#f8fbf6] to-transparent" />
      <div className="absolute left-1/2 top-32 hidden h-72 w-72 -translate-x-1/2 rounded-full border border-white/25 bg-white/10 shadow-2xl shadow-white/20 backdrop-blur-md lg:block" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-12 py-14 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="mb-5 text-sm font-black uppercase tracking-[0.28em] text-lime-100">
            Explore the beauty of Pakistan
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-tight drop-shadow-2xl md:text-7xl">
            Travel With Moiz
            <span className="mt-3 block text-3xl md:text-5xl">
              Your Journey, Our Passion
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/90 md:text-xl">
            Discover breathtaking destinations with comfortable travel,
            carefully planned tours and unforgettable mountain memories.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton className="px-7 py-4 text-base">
              Plan My Tour
            </WhatsAppButton>
            <Link
              href="/tours"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/15 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white/25"
            >
              View Packages <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 12 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative hidden min-h-[500px] [perspective:1200px] lg:block"
        >
          <div className="absolute right-8 top-6 h-[28rem] w-[21rem] rotate-6 overflow-hidden rounded-[2.2rem] border-[10px] border-white bg-white shadow-2xl shadow-emerald-950/35">
            <Image
              src="https://images.unsplash.com/photo-1562979314-bee7453e911c?auto=format&fit=crop&w=1200&q=85"
              alt="Hunza mountain destination card"
              fill
              sizes="420px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-lime-200">
                Featured
              </p>
              <h2 className="mt-2 text-3xl font-black">Hunza Valley</h2>
            </div>
          </div>
          <div className="absolute left-16 top-24 h-56 w-44 -rotate-12 overflow-hidden rounded-[1.8rem] border-[8px] border-white bg-white shadow-2xl shadow-emerald-950/30">
            <Image
              src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85"
              alt="Pakistan valley travel card"
              fill
              sizes="220px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="relative z-20 mx-auto -mt-20 max-w-6xl"
      >
        <div className="rounded-2xl bg-white p-3 shadow-2xl shadow-emerald-950/20">
          <div className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            {searchItems.map(({ Icon, title, value }) => (
              <div key={title} className="flex items-center gap-3 border-emerald-950/10 px-4 py-4 md:border-r">
                <Icon className="h-5 w-5 text-emerald-700" />
                <div>
                  <p className="text-sm font-black text-[#133d31]">{title}</p>
                  <p className="text-sm text-slate-500">{value}</p>
                </div>
              </div>
            ))}
            <Link
              href="/tours"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-4 text-sm font-black text-white transition hover:bg-emerald-800"
            >
              <Search className="h-4 w-4" />
              Search Tours
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-4 grid max-w-5xl overflow-hidden rounded-2xl bg-emerald-950/86 text-white shadow-2xl shadow-emerald-950/20 backdrop-blur md:grid-cols-4">
          {trustItems.map(({ Icon, title, text }) => (
            <div key={title} className="flex gap-4 border-white/20 p-5 md:border-r last:border-r-0">
              <Icon className="h-9 w-9 shrink-0 text-lime-300" />
              <div>
                <p className="font-black">{title}</p>
                <p className="mt-1 text-sm leading-6 text-white/75">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
