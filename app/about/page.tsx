import type { Metadata } from "next";
import { Camera, Mountain, ShieldCheck, Users } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Travel With Moiz, a Pakistan travel brand for premium Hunza, Skardu, Kashmir, family, group, and custom tours.",
};

const brandValues = [
  { Icon: Mountain, title: "Northern routes", text: "Hunza, Skardu, Kashmir, Deosai, Naran, and more." },
  { Icon: ShieldCheck, title: "Trust focused", text: "Clear package details before confirmation." },
  { Icon: Users, title: "Group friendly", text: "Designed for families, couples, and group departures." },
  { Icon: Camera, title: "Photo-first trips", text: "Stops chosen for memories, views, and comfort." },
];

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-slate-950 px-4 pb-24 pt-36 text-white">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About us"
          title="Modern Pakistan tours with a personal booking experience"
          text="Travel With Moiz helps travelers explore northern Pakistan with cinematic routes, reliable coordination, and direct WhatsApp communication."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 backdrop-blur">
            <h2 className="text-3xl font-black">Adventure-luxury, made simple</h2>
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
              <div key={title} className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
                <Icon className="h-8 w-8 text-cyan-300" />
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
