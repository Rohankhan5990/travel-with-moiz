import { AnimatedSection } from "@/components/AnimatedSection";
import { DestinationGallery } from "@/components/DestinationGallery";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { TourCard } from "@/components/TourCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { featuredTours, popularDestinations, reviews } from "@/lib/tours";
import { ArrowRight, Car, HeartHandshake, Map, ShieldCheck, Users, WandSparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
      <Hero />

      <section className="bg-[#f8fbf6] px-4 pb-10 pt-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-[#073b2c]">Popular Destinations</h2>
              <div className="mt-3 h-1 w-24 rounded-full bg-emerald-700" />
            </div>
            <Link
              href="/gallery"
              className="hidden items-center gap-2 rounded-full border border-emerald-900/10 bg-white px-5 py-3 text-sm font-black text-emerald-800 shadow-lg shadow-emerald-950/5 transition hover:bg-emerald-50 sm:inline-flex"
            >
              View All Destinations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-5">
            {popularDestinations.map((destination) => (
              <Link key={destination.title} href="/gallery" className="group">
                <div className="relative h-36 overflow-hidden rounded-xl shadow-xl shadow-emerald-950/10">
                  <Image
                    src={destination.src}
                    alt={destination.alt}
                    fill
                    sizes="(min-width: 768px) 20vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-3 font-black text-white">
                    {destination.title}
                  </p>
                </div>
                <p className="mt-2 text-sm text-slate-600">{destination.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="noise bg-[#f8fbf6] px-4 py-24">
        <div className="relative mx-auto max-w-7xl">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Featured tours"
              title="Pakistan’s most loved northern routes"
              text="Book fast through WhatsApp, then travel with a planned route, scenic stops, and friendly support."
              tone="light"
            />
          </AnimatedSection>
          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {featuredTours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24">
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
              <div key={title} className="rounded-[2rem] border border-emerald-900/10 bg-[#f8fbf6] p-7 text-[#12392f] shadow-lg shadow-emerald-950/5">
                <Icon className="h-9 w-9 text-emerald-700" />
                <h3 className="mt-6 text-2xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#073b2c] px-4 py-24">
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

      <section className="bg-gradient-to-b from-[#073b2c] to-[#09251d] px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Reviews" title="Travelers remember the details" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-7 text-white backdrop-blur">
                <p className="text-lg leading-8 text-slate-200">“{review.text}”</p>
                <div className="mt-6">
                  <p className="font-black">{review.name}</p>
                  <p className="text-sm text-cyan-300">{review.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8fbf6] px-4 py-24">
        <SectionHeading eyebrow="FAQ" title="Before you book" tone="light" />
        <div className="mt-12">
          <FAQ />
        </div>
        <div className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-emerald-900/10 bg-white p-8 text-center text-[#12392f] shadow-2xl shadow-emerald-950/10">
          <h3 className="text-3xl font-black">Ready for Hunza, Skardu or Kashmir?</h3>
          <p className="mt-3 text-slate-600">Send one message and get package details, dates, and booking guidance.</p>
          <WhatsAppButton className="mt-6 px-8 py-4">Get Tour Details</WhatsAppButton>
        </div>
      </section>
    </>
  );
}
