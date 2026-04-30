import type { Metadata } from "next";
import { DestinationGallery } from "@/components/DestinationGallery";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore Travel With Moiz destination gallery for Hunza, Skardu, Kashmir, Deosai, Attabad Lake, and Passu Cones.",
};

export default function GalleryPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 to-[#083344] px-4 pb-24 pt-36 text-white">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Gallery"
          title="Mountain frames, valley roads, and lake reflections"
          text="A modern visual moodboard for Pakistan tours. Replace these licensed placeholders with original Travel With Moiz trip photos for maximum trust."
        />
        <div className="mt-12">
          <DestinationGallery />
        </div>
      </div>
    </section>
  );
}
