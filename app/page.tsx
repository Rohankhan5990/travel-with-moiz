import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { HomepageJsonLd } from "@/components/HomepageJsonLd";
import { DestinationGallery } from "@/components/DestinationGallery";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { ClientReviewsSection } from "@/components/ClientReviewsSection";
import { SectionHeading } from "@/components/SectionHeading";
import { PackagesCarousel } from "@/components/PackagesCarousel";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { DestinationShowcase } from "@/components/home/DestinationShowcase";
import { PakistanMap } from "@/components/home/PakistanMap";
import { TripPlanner } from "@/components/home/TripPlanner";
import { WhatsAppCtaSection } from "@/components/home/WhatsAppCtaSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { featuredTours } from "@/lib/tours";
import { Car, HeartHandshake, Map, ShieldCheck, Users, WandSparkles } from "lucide-react";

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
      <HomepageJsonLd />
      <Hero />

      <RecentlyViewed />

      <DestinationShowcase />

      <TripPlanner />

      <section className="noise section-surface-light overflow-x-hidden px-4 py-16 sm:py-24">
        <div className="relative mx-auto max-w-7xl min-w-0">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Signature packages"
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

      <PakistanMap />

      <section className="section-surface-dark px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Gallery"
            title="Cinematic destinations across Pakistan"
            text="Skardu lakes, Hunza peaks, Kashmir valleys, Deosai plains, and famous adventure stops — tap any frame for fullscreen."
          />
          <div className="mt-12">
            <DestinationGallery limit={8} />
          </div>
        </div>
      </section>

      <ClientReviewsSection />

      <WhatsAppCtaSection />

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
