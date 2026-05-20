import type { Metadata } from "next";
import { DestinationGallery } from "@/components/DestinationGallery";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore Travel With Moiz destination gallery for Hunza, Skardu, Kashmir, Deosai, Attabad Lake, and Passu Cones.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Destination Gallery | Travel With Moiz",
    description: "Hunza, Skardu, Kashmir, Deosai, Attabad Lake, Passu Cones, and more.",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <section className="min-h-screen section-surface-dark px-4 pb-24 pt-32 text-white sm:pt-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Gallery"
          title="Mountain frames, valley roads, and lake reflections"
          text="Explore real destination visuals from Hunza, Skardu, Kashmir, Deosai, Khunjerab, Neelum Valley, Fairy Meadows, and more."
        />
        <div className="mt-12">
          <DestinationGallery />
        </div>
      </div>
    </section>
  );
}
