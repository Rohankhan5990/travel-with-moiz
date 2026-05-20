import type { Metadata } from "next";
import { Camera, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { brand } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Travel With Moiz on WhatsApp, phone, or Instagram to book Pakistan tours to Hunza, Skardu, and Kashmir.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Travel With Moiz",
    description: "WhatsApp, phone, or Instagram — book Hunza, Skardu, and Kashmir tours.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="min-h-screen section-surface-dark px-4 pb-24 pt-32 text-white sm:pt-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Send one message to start planning"
          text="Ask for group dates, couple prices, family plans, hotel options, departure cities, and custom tour quotes."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          <a
            href={brand.phoneHref}
            className="rounded-2xl border border-white/10 bg-white/[0.06] p-7 text-center backdrop-blur-sm transition hover:-translate-y-1 hover:border-brand-gold/30"
          >
            <Phone className="mx-auto h-9 w-9 text-brand-gold-light" />
            <h2 className="mt-5 font-display text-xl font-semibold">Phone</h2>
            <p className="mt-2 text-slate-300">{brand.phoneDisplay}</p>
          </a>
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-white/10 bg-white/[0.06] p-7 text-center backdrop-blur-sm transition hover:-translate-y-1 hover:border-brand-gold/30"
          >
            <Camera className="mx-auto h-9 w-9 text-brand-gold-light" />
            <h2 className="mt-5 font-display text-xl font-semibold">Instagram</h2>
            <p className="mt-2 text-slate-300">@{brand.instagram}</p>
          </a>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-7 text-center backdrop-blur-sm">
            <MapPin className="mx-auto h-9 w-9 text-brand-gold-light" />
            <h2 className="mt-5 font-display text-xl font-semibold">Service areas</h2>
            <p className="mt-2 text-slate-300">Lahore, Islamabad, and custom departures</p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-brand-gold/25 bg-white/[0.04] p-8 text-center backdrop-blur-sm sm:p-10">
          <h2 className="font-display text-3xl font-semibold">WhatsApp booking message</h2>
          <p className="mt-3 leading-8 text-slate-300">
            Tap below and the message will open with the correct Travel With Moiz
            number: {brand.phoneDisplay}.
          </p>
          <WhatsAppButton className="mt-7 px-8 py-4 text-base">
            Open WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
