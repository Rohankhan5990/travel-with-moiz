import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { PackagesShowcase } from "@/components/PackagesShowcase";
import { tours } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Pakistan Tour Packages",
  description:
    "Browse Travel With Moiz flyer packages — Shogran, Kumrat, Fairy Meadows, Swat, Naran, Kashmir, Hunza & Skardu — with WhatsApp booking.",
  alternates: {
    canonical: "/tours",
  },
  openGraph: {
    title: "Pakistan Tour Packages | Travel With Moiz",
    description:
      "Browse flyer packages for Shogran, Kumrat, Fairy Meadows, Swat, Naran, Kashmir, Hunza & Skardu — WhatsApp booking.",
    url: "/tours",
  },
};

export default function ToursPage() {
  const filters = ["All", "Skardu", "Hunza", "Kashmir", "Couple", "Family", "Custom"];

  return (
    <section className="min-h-screen bg-slate-950 px-4 pb-24 pt-36 text-white">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Tour packages"
          title="Choose your next Pakistan adventure"
          text="Transparent package highlights, prices, itineraries, and one-click WhatsApp booking."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {filters.map((filter) => (
            <span
              key={filter}
              className="rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-bold text-slate-200"
            >
              {filter}
            </span>
          ))}
        </div>
        <div className="mt-12">
          <PackagesShowcase tours={tours} variant="onDark" />
        </div>
      </div>
    </section>
  );
}
