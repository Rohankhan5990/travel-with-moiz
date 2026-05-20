import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { HomeResourceHints } from "@/components/HomeResourceHints";
import { HomepageJsonLd } from "@/components/HomepageJsonLd";
import { DestinationGallery } from "@/components/DestinationGallery";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { ClientReviewsSection } from "@/components/ClientReviewsSection";
import { SectionHeading } from "@/components/SectionHeading";
import { PackagesCarousel } from "@/components/PackagesCarousel";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { featuredTours, popularDestinations } from "@/lib/tours";
import { ArrowRight, Car, HeartHandshake, Map, ShieldCheck, Users, WandSparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const trustPoints = [
  { Icon: Users, title: "Group tours", text: "Social departures with clear plans and easy coordination." },
  { Icon: WandSparkles, title: "Custom tours", text: "Private routes for families, couples, and corporate groups." },
  { Icon: HeartHandshake, title: "Family friendly", text: "Balanced itineraries for comfort, safety, and memories." },
  { Icon: Map, title: "Local route support", text: "Practical guidance for northern Pakistan road conditions." },
  { Icon: Car, title: "Safe transport", text: "Comfortable vehicles planned around group size and terrain." },
  { Icon: ShieldCheck, title: "Simple booking", text: "Confirm package details directly on WhatsApp before travel." },
];

export default function Home() {
  return (
    <>
      <HomeResourceHints />
      <HomepageJsonLd />
      <Hero />

      <section className="section-surface-light px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Destinations"
                title="Popular places across Pakistan"
                text="From Hunza peaks to Skardu lakes — explore the routes we know best."
                tone="light"
                align="left"
                className="mx-0 max-w-2xl text-left"
              />
              <Link
                href="/gallery"
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-emerald-900/10 bg-white px-5 py-3 text-sm font-semibold text-brand-forest shadow-md shadow-emerald-950/5 transition hover:border-emerald-700/25 hover:bg-emerald-50 sm:self-auto"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-5">
            {popularDestinations.map((destination) => (
              <Link key={destination.title} href="/gallery" className="group">
                <div className="relative h-40 overflow-hidden rounded-2xl shadow-lg shadow-emerald-950/10 ring-1 ring-emerald-900/8 sm:h-36">
                  <Image
                    src={destination.src}
                    alt={destination.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 768px) 20vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest-deep/90 via-brand-forest/20 to-transparent" />
                  <p className="absolute bottom-3 left-3 font-display text-lg font-semibold text-white">
                    {destination.title}
                  </p>
                </div>
                <p className="mt-2.5 text-sm text-slate-600">{destination.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="noise section-surface-light px-4 py-16 sm:py-24">
        <div className="relative mx-auto max-w-7xl">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Tour packages"
              title="Browse every departure in one swipe"
              text="Swipe through packages or use the arrows — open any card for the full flyer and WhatsApp booking."
              tone="light"
            />
          </AnimatedSection>
          <div className="mt-8 sm:mt-12">
            <PackagesCarousel tours={featuredTours} />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Why choose us"
              title="Designed for comfort, trust, and unforgettable views"
              tone="light"
            />
          </AnimatedSection>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map(({ Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-emerald-900/8 bg-brand-cream p-7 text-brand-ink shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-950/8"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-forest shadow-sm ring-1 ring-emerald-900/8">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-brand-forest">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-surface-dark px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Gallery"
            title="Cinematic destinations across Pakistan"
            text="Skardu lakes, Hunza peaks, Kashmir valleys, Deosai plains, and famous adventure stops."
          />
          <div className="mt-12">
            <DestinationGallery limit={8} />
          </div>
        </div>
      </section>

      <ClientReviewsSection />

      <section className="section-surface-light px-4 py-20 sm:py-24">
        <SectionHeading eyebrow="FAQ" title="Before you book" tone="light" />
        <div className="mt-12">
          <FAQ />
        </div>
        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-emerald-900/8 bg-white p-8 text-center text-brand-ink shadow-xl shadow-emerald-950/8 sm:p-10">
          <h3 className="font-display text-3xl font-semibold text-brand-forest">
            Ready for Hunza, Skardu or Kashmir?
          </h3>
          <p className="mt-3 text-slate-600">
            Send one message and get package details, dates, and booking guidance.
          </p>
          <WhatsAppButton className="mt-7 px-8 py-4">Get Tour Details</WhatsAppButton>
        </div>
      </section>
    </>
  );
}
