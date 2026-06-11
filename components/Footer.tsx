import Image from "next/image";
import Link from "next/link";
import { Camera, MapPin, Phone, Sparkles } from "lucide-react";
import { brand } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const exploreLinks = [
  ["Home", "/"],
  ["Tour packages", "/tours"],
  ["Destinations", "/gallery"],
  ["Reviews", "/#client-reviews"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

const destinationLinks = [
  ["Hunza tours", "/tours?region=Hunza#explorer"],
  ["Skardu tours", "/tours?region=Skardu#explorer"],
  ["Kashmir tours", "/tours?region=Kashmir#explorer"],
  ["Naran tours", "/tours?region=Naran#explorer"],
  ["Swat tours", "/tours?region=Swat#explorer"],
  ["Fairy Meadows", "/tours?region=Fairy%20Meadows#explorer"],
] as const;

export function Footer() {
  return (
    <footer className="section-surface-night relative overflow-hidden border-t border-white/8 px-4 pb-10 pt-20 text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-full max-w-4xl -translate-x-1/2 rounded-full bg-brand-gold/6 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.6fr_0.6fr_0.6fr]">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full shadow-lg shadow-black/30 ring-2 ring-brand-gold/40">
                <Image
                  src={brand.logoSrc}
                  alt=""
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </span>
              <div>
                <h2 className="font-display text-3xl font-semibold">{brand.name}</h2>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-brand-gold-light">
                  Explore Pakistan
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md leading-8 text-slate-300">
              Premium northern Pakistan journeys — Hunza, Skardu, Kashmir, and the
              valleys in between — handcrafted itineraries with one-message
              WhatsApp booking.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <WhatsAppButton>Chat on WhatsApp</WhatsAppButton>
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="glass-soft inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition hover:border-brand-gold/40 hover:bg-white/10"
              >
                <Camera className="h-4 w-4" />
                Instagram
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold-light">
              Explore
            </h3>
            <div className="mt-5 grid gap-3 text-slate-300">
              {exploreLinks.map(([label, href]) => (
                <Link key={href} href={href} className="w-fit transition hover:text-brand-gold-light">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold-light">
              Destinations
            </h3>
            <div className="mt-5 grid gap-3 text-slate-300">
              {destinationLinks.map(([label, href]) => (
                <Link key={href} href={href} className="w-fit transition hover:text-brand-gold-light">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold-light">
              Contact
            </h3>
            <div className="mt-5 space-y-4 text-slate-300">
              <a href={brand.phoneHref} className="flex items-center gap-3 transition hover:text-white">
                <Phone className="h-4 w-4 text-brand-gold-light" />
                {brand.phoneDisplay}
              </a>
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Camera className="h-4 w-4 text-brand-gold-light" />
                @{brand.instagram}
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-gold-light" />
                Lahore, Islamabad, and custom Pakistan departures
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Travel With Moiz. Crafted for modern Pakistan tour booking.</p>
          <p className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold/70" />
            Designed for journeys that stay forever
          </p>
        </div>
      </div>
    </footer>
  );
}
