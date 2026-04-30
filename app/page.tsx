import { AnimatedSection } from "@/components/AnimatedSection";
import { DestinationGallery } from "@/components/DestinationGallery";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { TourCard } from "@/components/TourCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { featuredTours, reviews } from "@/lib/tours";
import { Car, HeartHandshake, Map, ShieldCheck, Users, WandSparkles } from "lucide-react";

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

      <section className="noise bg-slate-950 px-4 py-24">
        <div className="relative mx-auto max-w-7xl">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Featured tours"
              title="Pakistan’s most loved northern routes"
              text="Book fast through WhatsApp, then travel with a planned route, scenic stops, and friendly support."
            />
          </AnimatedSection>
          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {featuredTours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-slate-950 to-[#083344] px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Why choose us"
              title="Designed for comfort, trust, and unforgettable views"
            />
          </AnimatedSection>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map(({ Icon, title, text }) => (
              <div key={title} className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 text-white backdrop-blur">
                <Icon className="h-9 w-9 text-cyan-300" />
                <h3 className="mt-6 text-2xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#083344] px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Gallery"
            title="Cinematic destinations across Pakistan"
            text="Skardu lakes, Hunza peaks, Kashmir valleys, Deosai plains, and famous adventure stops."
          />
          <div className="mt-12">
            <DestinationGallery />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#083344] to-slate-950 px-4 py-24">
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

      <section className="bg-slate-950 px-4 py-24">
        <SectionHeading eyebrow="FAQ" title="Before you book" />
        <div className="mt-12">
          <FAQ />
        </div>
        <div className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-cyan-300/20 bg-cyan-400/10 p-8 text-center text-white">
          <h3 className="text-3xl font-black">Ready for Hunza, Skardu or Kashmir?</h3>
          <p className="mt-3 text-slate-300">Send one message and get package details, dates, and booking guidance.</p>
          <WhatsAppButton className="mt-6 px-8 py-4">Get Tour Details</WhatsAppButton>
        </div>
      </section>
    </>
  );
}
