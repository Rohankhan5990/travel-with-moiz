import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, XCircle } from "lucide-react";
import { ItineraryAccordion } from "@/components/ItineraryAccordion";
import { SectionHeading } from "@/components/SectionHeading";
import { TourDetailExtras } from "@/components/TourDetailExtras";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { TourJsonLd } from "@/components/TourJsonLd";
import { getTourBySlug, tours } from "@/lib/tours";
import { formatTourDurationBadge } from "@/lib/tour-duration";

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

  const path = `/tours/${slug}`;
  return {
    title: `${tour.title} Package`,
    description: `${tour.title} by Travel With Moiz. ${tour.summary} Book by WhatsApp.`,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${tour.title} | Travel With Moiz`,
      description: tour.summary,
      url: path,
      type: "website",
      images: [
        {
          url: tour.heroImage,
          alt: `${tour.title} tour package`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
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

  const extraGallery = tour.gallery.filter((src) => src !== tour.heroImage);

  return (
    <article className="bg-slate-950 text-white">
      <TourJsonLd tour={tour} slug={slug} />
      <section className="border-b border-white/10 px-4 pb-10 pt-24 sm:pt-28 md:pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="relative mx-auto w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/40 sm:rounded-[2rem]">
            <div className="relative aspect-[3/4] w-full max-h-[min(92vh,1200px)] min-h-[280px] sm:aspect-[4/5] md:aspect-auto md:min-h-[min(88vh,1000px)]">
              <Image
                src={tour.heroImage}
                alt={`${tour.title} — full package flyer`}
                fill
                priority
                sizes="(min-width: 1024px) 48rem, 100vw"
                className="object-contain object-top md:object-center"
              />
            </div>
          </div>
          <div className="mt-10 text-center md:text-left">
            <p className="inline-flex rounded-full bg-cyan-300 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-slate-950 sm:text-sm">
              {formatTourDurationBadge(tour.duration)}
            </p>
            <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">{tour.title}</h1>
            <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-lg text-slate-200 md:justify-start">
              <MapPin className="h-5 w-5 shrink-0 text-cyan-300" />
              {tour.location}
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300 md:mx-0">{tour.summary}</p>
            <div className="mt-8 flex w-full max-w-3xl flex-col gap-4 sm:mx-auto md:mx-0">
              <WhatsAppButton message={tour.whatsappMessage} className="w-full px-8 py-4 text-base sm:w-auto sm:self-start">
                Book This Package
              </WhatsAppButton>
              {tour.deluxePricePerHead && tour.deluxeCouplePrice ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/15 to-lime-500/10 px-5 py-4 text-center shadow-lg shadow-black/10 backdrop-blur sm:text-left">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-200/95">Standard</p>
                    <p className="mt-2 text-lg font-black text-white sm:text-xl">
                      {tour.pricePerHead}
                      <span className="mx-2 text-white/35">·</span>
                      Couple {tour.couplePrice}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-indigo-400/40 bg-gradient-to-br from-indigo-600/35 via-violet-600/20 to-amber-500/15 px-5 py-4 text-center shadow-lg shadow-indigo-950/30 backdrop-blur sm:text-left">
                    <p className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-amber-100/95 sm:justify-start">
                      <span
                        aria-hidden
                        className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-indigo-300 to-amber-300 shadow shadow-amber-500/40"
                      />
                      Deluxe
                    </p>
                    <p className="mt-2 text-lg font-black text-white sm:text-xl">
                      {tour.deluxePricePerHead}
                      <span className="mx-2 text-white/35">·</span>
                      Couple {tour.deluxeCouplePrice}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-emerald-400/30 bg-gradient-to-r from-emerald-500/15 to-lime-500/10 px-6 py-4 text-center font-black shadow-lg shadow-black/10 backdrop-blur sm:text-left">
                  {tour.pricePerHead}
                  <span className="mx-2 text-white/35">·</span>
                  Couple {tour.couplePrice}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Itinerary"
              title="Day-by-day plan"
              className="text-left [&_*]:text-left"
            />
            <p className="mt-6 leading-8 text-slate-300">{tour.departureInfo}</p>
          </div>
          <ItineraryAccordion tour={tour} />
        </div>
      </section>

      <section className="bg-[#083344] px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Attractions" title="Places on this route" />
          <div className="mt-10 flex flex-wrap justify-center gap-3 md:justify-start">
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

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-8">
            <h2 className="text-3xl font-black">Included</h2>
            <div className="mt-6 space-y-4">
              {tour.included.map((item) => (
                <p key={item} className="flex items-start gap-3 text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-8">
            <h2 className="text-3xl font-black">Not included</h2>
            <div className="mt-6 space-y-4">
              {tour.excluded.map((item) => (
                <p key={item} className="flex items-start gap-3 text-slate-200">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TourDetailExtras tour={tour} />

      {extraGallery.length > 0 && (
        <section className="px-4 pb-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Gallery" title="More from this trip" className="mb-10" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {extraGallery.map((src, index) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10">
                  <Image
                    src={src}
                    alt={`${tour.title} gallery ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
