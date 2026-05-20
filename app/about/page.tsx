import type { Metadata } from "next";
import { Camera, Mountain, ShieldCheck, Users } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Travel With Moiz, a Pakistan travel brand for premium Hunza, Skardu, Kashmir, family, group, and custom tours.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Travel With Moiz",
    description:
      "Pakistan travel brand for Hunza, Skardu, Kashmir, family, group, and custom northern Pakistan tours.",
    url: "/about",
  },
};

const brandValues = [
  { Icon: Mountain, title: "Northern routes", text: "Hunza, Skardu, Kashmir, Deosai, Naran, and more." },
  { Icon: ShieldCheck, title: "Trust focused", text: "Clear package details before confirmation." },
  { Icon: Users, title: "Group friendly", text: "Designed for families, couples, and group departures." },
  { Icon: Camera, title: "Photo-first trips", text: "Stops chosen for memories, views, and comfort." },
];

export default function AboutPage() {
  return (
    <section className="min-h-screen section-surface-dark px-4 pb-24 pt-32 text-white sm:pt-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About us"
          title="Modern Pakistan tours with a personal booking experience"
          text="Travel With Moiz helps travelers explore northern Pakistan with cinematic routes, reliable coordination, and direct WhatsApp communication."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-sm">
            <h2 className="font-display text-3xl font-semibold">Adventure-luxury, made simple</h2>
            <p className="mt-5 leading-8 text-slate-300">
              The brand focuses on beautiful routes, clean planning, and clear
              communication for families, couples, students, friend groups, and
              custom private travelers. The website keeps booking lightweight:
              choose a package, open WhatsApp, and confirm the latest plan.
            </p>
            <WhatsAppButton className="mt-7">Discuss Custom Tour</WhatsAppButton>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {brandValues.map(({ Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
                <Icon className="h-8 w-8 text-brand-gold-light" strokeWidth={1.75} />
                <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
