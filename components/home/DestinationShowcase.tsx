import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

type Destination = {
  name: string;
  tagline: string;
  image: string;
  region: string;
  span?: string;
};

const destinations: Destination[] = [
  {
    name: "Hunza",
    tagline: "Ancient forts beneath 7,000m peaks",
    image: "/images/pakistan-places-images/huzan.webp",
    region: "Hunza",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    name: "Skardu",
    tagline: "Lakes, deserts, and the Deosai plains",
    image: "/images/pakistan-places-images/skardu.webp",
    region: "Skardu",
    span: "md:col-span-2",
  },
  {
    name: "Kashmir",
    tagline: "Neelum's rivers and pine valleys",
    image: "/images/pakistan-places-images/kashmir-valley1.webp",
    region: "Kashmir",
    span: "md:col-span-2",
  },
  {
    name: "Fairy Meadows",
    tagline: "Camp at the foot of Nanga Parbat",
    image: "/images/pakistan-places-images/Fairy-Meadows-trek.webp",
    region: "Fairy Meadows",
  },
  {
    name: "Naran",
    tagline: "Saif-ul-Malook and Babusar Top",
    image: "/images/pakistan-places-images/naran-kaghan-1.webp",
    region: "Naran",
  },
  {
    name: "Swat",
    tagline: "Kalam's meadows and Malam Jabba",
    image: "/images/pakistan-places-images/swat-mahodand.webp",
    region: "Swat",
  },
  {
    name: "Kumrat",
    tagline: "Untouched forests and river camps",
    image: "/images/pakistan-places-images/kumrat-valley.webp",
    region: "Kumrat",
  },
];

export function DestinationShowcase() {
  return (
    <section id="destinations" className="section-surface-night px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Destinations"
            title="Where will the mountains take you?"
            text="Seven regions we run every season — each with its own light, food, and silence."
          />
        </AnimatedSection>

        <div className="mt-12 grid auto-rows-[200px] grid-cols-1 gap-4 sm:auto-rows-[220px] sm:grid-cols-2 md:grid-cols-4">
          {destinations.map((destination) => (
            <AnimatedSection key={destination.name} className={cn("h-full", destination.span)}>
              <Link
                href={`/tours?region=${encodeURIComponent(destination.region)}#explorer`}
                className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 transition duration-500 hover:border-brand-gold/35 hover:shadow-brand-gold/10"
              >
                <Image
                  src={destination.image}
                  alt={`${destination.name} — ${destination.tagline}`}
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-night/95 via-brand-night/25 to-transparent transition duration-500 group-hover:via-brand-night/15" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                        {destination.name}
                      </h3>
                      <p className="mt-1 max-w-[16rem] text-sm leading-6 text-white/70 opacity-90 transition duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                        {destination.tagline}
                      </p>
                    </div>
                    <span className="glass-soft flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition duration-500 group-hover:bg-brand-gold group-hover:text-brand-forest-deep">
                      <ArrowUpRight className="h-4.5 w-4 sm:h-5 sm:w-5" />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
