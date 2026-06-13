import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, XCircle } from "lucide-react";
import { ItineraryAccordion } from "@/components/ItineraryAccordion";
import { MobileTourBookingBar } from "@/components/MobileTourBookingBar";
import { RecordTourVisit } from "@/components/RecordTourVisit";
import { SectionHeading } from "@/components/SectionHeading";
import { TourCard } from "@/components/TourCard";
import { TourDetailExtras } from "@/components/TourDetailExtras";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { TourJsonLd } from "@/components/TourJsonLd";
import { getTourBySlug, tours } from "@/lib/tours";
import { formatTourDurationBadge } from "@/lib/tour-duration";
import { getTourRegions } from "@/lib/tour-meta";

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
  const tourRegions = getTourRegions(tour);
  const relatedTours = tours
    .filter(
      (candidate) =>
        candidate.slug !== tour.slug &&
        getTourRegions(candidate).some((region) => tourRegions.includes(region)),
    )
    .slice(0, 3);

  return (
    <article className="tour-detail-page bg-slate-950 pb-24 text-white md:pb-0">
      <TourJsonLd tour={tour} slug={slug} />
      <RecordTourVisit slug={slug} />
      <MobileTourBookingBar message={tour.whatsappMessage} price={tour.pricePerHead} />
      <section className="border-b border-white/10 px-4 pb-8 pt-[5.25rem] sm:pb-10 sm:pt-28 md:pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="relative mx-auto w-full overflow-hidden rounded-[1.15rem] border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/40 sm:rounded-[2rem]">
            <div className="relative aspect-[3/4] w-full max-h-[min(82vh,1200px)] min-h-[220px] sm:max-h-[min(92vh,1200px)] sm:aspect-[4/5] md:aspect-auto md:min-h-[min(88vh,1000px)]">
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
          <div className="mt-6 text-center sm:mt-10 md:text-left">
            <p className="inline-flex rounded-full bg-cyan-300 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-950 sm:px-4 sm:py-2 sm:text-sm sm:tracking-[0.25em]">
              {formatTourDurationBadge(tour.duration)}
            </p>
            <h1 className="mt-3 text-[1.65rem] font-black leading-tight tracking-tight sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl">
              {tour.title}
            </h1>
            <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-base text-slate-200 md:justify-start sm:mt-4 sm:text-lg">
              <MapPin className="h-4 w-4 shrink-0 text-cyan-300 sm:h-5 sm:w-5" />
              {tour.location}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-300 md:mx-0 sm:mt-5 sm:text-lg sm:leading-8">
              {tour.summary}
            </p>
            <div className="mt-6 flex w-full max-w-3xl flex-col gap-3 sm:mx-auto sm:mt-8 sm:gap-4 md:mx-0">
              <WhatsAppButton message={tour.whatsappMessage} className="w-full px-6 py-3 text-sm sm:w-auto sm:px-8 sm:py-4 sm:text-base sm:self-start">
                Book This Package
              </WhatsAppButton>
              {tour.deluxePricePerHead && tour.deluxeCouplePrice ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/15 to-lime-500/10 px-4 py-3 text-center shadow-lg shadow-black/10 backdrop-blur sm:rounded-2xl sm:px-5 sm:py-4 sm:text-left">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200/95 sm:text-xs">
                      Standard
                    </p>
                    <p className="mt-1.5 text-base font-black text-white sm:mt-2 sm:text-xl">
                      {tour.pricePerHead}
                      <span className="mx-2 text-white/35">·</span>
                      Couple {tour.couplePrice}
                    </p>
                  </div>
                  <div className="rounded-xl border border-indigo-400/40 bg-gradient-to-br from-indigo-600/35 via-violet-600/20 to-amber-500/15 px-4 py-3 text-center shadow-lg shadow-indigo-950/30 backdrop-blur sm:rounded-2xl sm:px-5 sm:py-4 sm:text-left">
                    <p className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-100/95 sm:justify-start sm:text-xs sm:tracking-[0.2em]">
                      <span
                        aria-hidden
                        className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-indigo-300 to-amber-300 shadow shadow-amber-500/40"
                      />
                      Deluxe
                    </p>
                    <p className="mt-1.5 text-base font-black text-white sm:mt-2 sm:text-xl">
                      {tour.deluxePricePerHead}
                      <span className="mx-2 text-white/35">·</span>
                      Couple {tour.deluxeCouplePrice}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-emerald-400/30 bg-gradient-to-r from-emerald-500/15 to-lime-500/10 px-4 py-3 text-center font-black shadow-lg shadow-black/10 backdrop-blur text-sm sm:rounded-2xl sm:px-6 sm:py-4 sm:text-left sm:text-base">
                  {tour.pricePerHead}
                  <span className="mx-2 text-white/35">·</span>
                  Couple {tour.couplePrice}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Itinerary"
              title="Day-by-day plan"
              className="text-left [&_*]:text-left"
            />
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:mt-6 sm:text-base sm:leading-8">
              {tour.departureInfo}
            </p>
          </div>
          <ItineraryAccordion tour={tour} />
        </div>
      </section>

      <section className="bg-[#083344] px-4 py-10 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Attractions" title="Places on this route" />
          <div className="mt-6 flex flex-wrap justify-center gap-2 md:mt-10 md:justify-start sm:gap-3">
            {tour.attractions.map((attraction) => (
              <span
                key={attraction}
                className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-bold text-slate-100 sm:px-4 sm:py-2 sm:text-sm"
              >
                {attraction}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2 md:gap-8">
          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-5 sm:rounded-[2rem] sm:p-8">
            <h2 className="text-2xl font-black sm:text-3xl">Included</h2>
            <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
              {tour.included.map((item) => (
                <p key={item} className="flex items-start gap-2 text-sm text-slate-200 sm:gap-3 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300 sm:h-5 sm:w-5" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.07] p-5 sm:rounded-[2rem] sm:p-8">
            <h2 className="text-2xl font-black sm:text-3xl">Not included</h2>
            <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
              {tour.excluded.map((item) => (
                <p key={item} className="flex items-start gap-2 text-sm text-slate-200 sm:gap-3 sm:text-base">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300 sm:h-5 sm:w-5" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TourDetailExtras tour={tour} />

      {extraGallery.length > 0 && (
        <section className="px-4 pb-16 pt-10 md:pb-24 md:pt-14">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Gallery" title="More from this trip" className="mb-6 md:mb-10" />
            <div className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {extraGallery.map((src, index) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 sm:rounded-[2rem]">
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

      {relatedTours.length > 0 && (
        <section className="bg-brand-cream px-4 py-16 text-brand-ink md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Related packages"
              title="More routes you may love"
              text="Compare nearby routes, trip lengths, and prices before choosing your departure."
              tone="light"
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTours.map((relatedTour) => (
                <TourCard key={relatedTour.slug} tour={relatedTour} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
