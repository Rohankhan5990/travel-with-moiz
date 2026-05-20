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

const categoryTags = ["All packages", "Skardu", "Hunza", "Kashmir", "Family", "Couple"];

export default function ToursPage() {
  return (
    <section className="min-h-screen section-surface-dark px-4 pb-16 pt-28 text-white sm:pb-24 sm:pt-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Tour packages"
          title="Choose your next Pakistan adventure"
          text="Transparent package highlights, prices, itineraries, and one-click WhatsApp booking."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:mt-12 sm:gap-2.5">
          {categoryTags.map((tag, index) => (
            <span
              key={tag}
              className={
                index === 0
                  ? "rounded-full border border-brand-gold/40 bg-brand-gold/15 px-4 py-2 text-xs font-semibold text-brand-gold-light sm:text-sm"
                  : "rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium text-slate-400 sm:text-sm"
              }
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-8 sm:mt-12">
          <PackagesShowcase tours={tours} variant="onDark" />
        </div>
      </div>
    </section>
  );
}
