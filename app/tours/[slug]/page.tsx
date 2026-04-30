import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, XCircle } from "lucide-react";
import { ItineraryAccordion } from "@/components/ItineraryAccordion";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getTourBySlug, tours } from "@/lib/tours";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return {};
  }

  return {
    title: `${tour.title} Package`,
    description: `${tour.title} by Travel With Moiz. ${tour.summary} Book by WhatsApp.`,
    openGraph: {
      title: `${tour.title} | Travel With Moiz`,
      description: tour.summary,
      images: [tour.heroImage],
    },
  };
}

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <article className="bg-slate-950 text-white">
      <section className="relative min-h-[78vh] overflow-hidden px-4 pt-36">
        <Image
          src={tour.heroImage}
          alt={`${tour.title} hero destination`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
        <div className="relative mx-auto flex min-h-[60vh] max-w-7xl items-end pb-16">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex rounded-full bg-cyan-300 px-4 py-2 text-sm font-black uppercase tracking-[0.25em] text-slate-950">
              {tour.duration}
            </p>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">{tour.title}</h1>
            <p className="mt-5 flex items-center gap-2 text-lg text-slate-200">
              <MapPin className="h-5 w-5 text-cyan-300" />
              {tour.location}
            </p>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-slate-200">{tour.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton message={tour.whatsappMessage} className="px-8 py-4 text-base">
                Book This Package
              </WhatsAppButton>
              <div className="rounded-full border border-white/15 bg-white/10 px-6 py-4 font-black backdrop-blur">
                {tour.pricePerHead} · Couple {tour.couplePrice}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Itinerary"
              title="A route planned around the best stops"
              className="text-left [&_*]:text-left"
            />
            <p className="mt-6 leading-8 text-slate-300">{tour.departureInfo}</p>
          </div>
          <ItineraryAccordion tour={tour} />
        </div>
      </section>

      <section className="bg-[#083344] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Attractions" title="What you will experience" />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {tour.attractions.map((attraction) => (
              <span
                key={attraction}
                className="rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-bold text-slate-100"
              >
                {attraction}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-8">
            <h2 className="text-3xl font-black">Included</h2>
            <div className="mt-6 space-y-4">
              {tour.included.map((item) => (
                <p key={item} className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-cyan-300" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-8">
            <h2 className="text-3xl font-black">Excluded</h2>
            <div className="mt-6 space-y-4">
              {tour.excluded.map((item) => (
                <p key={item} className="flex items-center gap-3 text-slate-200">
                  <XCircle className="h-5 w-5 text-amber-300" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {tour.gallery.map((src, index) => (
            <div key={src} className="relative h-80 overflow-hidden rounded-[2rem] border border-white/10">
              <Image
                src={src}
                alt={`${tour.title} gallery image ${index + 1}`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
