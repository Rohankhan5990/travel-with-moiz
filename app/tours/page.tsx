import type { Metadata } from "next";
import { Suspense } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { TourExplorer } from "@/components/tours/TourExplorer";

export const metadata: Metadata = {
  title: "Pakistan Tour Packages",
  description:
    "Browse Travel With Moiz flyer packages — Shogran, Kumrat, Fairy Meadows, Swat, Naran, Kashmir, Hunza & Skardu — with smart search, filters, comparison, and WhatsApp booking.",
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

function ExplorerSkeleton() {
  return (
    <div aria-hidden>
      <div className="skeleton mx-auto h-14 max-w-3xl rounded-full" />
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton h-9 w-24 rounded-full" />
        ))}
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-[28rem] rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export default function ToursPage() {
  return (
    <section className="section-surface-night min-h-screen px-4 pb-32 pt-28 text-white sm:pb-36 sm:pt-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Tour packages"
          title="Choose your next Pakistan adventure"
          text="Search by destination, filter by days and budget, compare side by side — then book in one WhatsApp message."
        />
        <div className="mt-10 sm:mt-12">
          <Suspense fallback={<ExplorerSkeleton />}>
            <TourExplorer />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
