import type { Metadata } from "next";
import { Camera, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { brand } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Travel With Moiz on WhatsApp, phone, or Instagram to book Pakistan tours to Hunza, Skardu, and Kashmir.",
};

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 to-[#083344] px-4 pb-24 pt-36 text-white">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Send one message to start planning"
          text="Ask for group dates, couple prices, family plans, hotel options, departure cities, and custom tour quotes."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          <a
            href={brand.phoneHref}
            className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-7 text-center backdrop-blur transition hover:-translate-y-1"
          >
            <Phone className="mx-auto h-9 w-9 text-cyan-300" />
            <h2 className="mt-5 text-xl font-black">Phone</h2>
            <p className="mt-2 text-slate-300">{brand.phoneDisplay}</p>
          </a>
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-7 text-center backdrop-blur transition hover:-translate-y-1"
          >
            <Camera className="mx-auto h-9 w-9 text-cyan-300" />
            <h2 className="mt-5 text-xl font-black">Instagram</h2>
            <p className="mt-2 text-slate-300">@{brand.instagram}</p>
          </a>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-7 text-center backdrop-blur">
            <MapPin className="mx-auto h-9 w-9 text-cyan-300" />
            <h2 className="mt-5 text-xl font-black">Service areas</h2>
            <p className="mt-2 text-slate-300">Lahore, Islamabad, and custom departures</p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-cyan-300/20 bg-slate-950/50 p-8 text-center">
          <h2 className="text-3xl font-black">WhatsApp booking message</h2>
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
