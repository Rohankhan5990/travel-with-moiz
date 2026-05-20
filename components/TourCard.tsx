import Image from "next/image";
import Link from "next/link";
import { Clock, Crown, MapPin, Sparkles, Users } from "lucide-react";
import { whatsappIcon } from "@/components/WhatsAppButton";
import type { Tour } from "@/lib/tour-types";
import { getTourCardImage } from "@/lib/tour-card-images";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { formatTourDurationBadge } from "@/lib/tour-duration";

type TourCardLayout = "default" | "carousel";

export function TourCard({
  tour,
  layout = "default",
  priority = false,
}: {
  tour: Tour;
  layout?: TourCardLayout;
  priority?: boolean;
}) {
  const isCarousel = layout === "carousel";
  const hasDeluxe = Boolean(tour.deluxePricePerHead && tour.deluxeCouplePrice);
  const cardImage = getTourCardImage(tour);

  const imageBlock = (
    <Link href={`/tours/${tour.slug}`} className="block overflow-hidden">
      <div
        className={cn(
          "relative overflow-hidden bg-brand-cream",
          isCarousel ? "aspect-[5/4]" : "aspect-[4/3] sm:aspect-[16/10]",
        )}
      >
        <Image
          src={cardImage}
          alt={`${tour.title} destination`}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(min-width: 1536px) 28rem, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover object-center transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
        <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-brand-forest shadow-md sm:text-xs">
          {formatTourDurationBadge(tour.duration)}
        </div>
      </div>
    </Link>
  );

  const body = (
    <div className={cn("flex min-h-0 flex-1 flex-col", "p-4 sm:p-5")}>
      <div className="shrink-0">
        <Link href={`/tours/${tour.slug}`} className="group/title block">
          <h3
            title={tour.title}
            className="font-display line-clamp-2 text-lg font-semibold leading-snug text-brand-forest transition group-hover/title:text-emerald-800 sm:text-xl"
          >
            {tour.title}
          </h3>
        </Link>
        <p className="mt-2 flex items-start gap-1.5 text-xs text-slate-600 sm:text-sm">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-gold" aria-hidden />
          <span className={isCarousel ? "line-clamp-2" : "line-clamp-2 sm:line-clamp-3"}>
            {tour.location}
          </span>
        </p>
      </div>

      <p className="mt-3 line-clamp-2 shrink-0 text-xs leading-relaxed text-slate-600 sm:line-clamp-3 sm:text-sm sm:leading-6">
        {tour.summary}
      </p>

      <div className="mt-auto flex shrink-0 flex-col gap-3 pt-4 sm:gap-4 sm:pt-5">
        <div className="space-y-2 sm:space-y-3">
          <div
            className={cn(
              hasDeluxe
                ? "rounded-xl border border-slate-200/90 bg-slate-50/50 p-3 sm:rounded-2xl sm:p-3.5"
                : "",
            )}
          >
            {hasDeluxe && (
              <p className="mb-2.5 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                <span className="h-px max-w-[2.5rem] flex-1 bg-gradient-to-r from-transparent to-slate-300" aria-hidden />
                Standard
                <span className="h-px max-w-[2.5rem] flex-1 bg-gradient-to-l from-transparent to-slate-300" aria-hidden />
              </p>
            )}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="flex min-h-[4rem] flex-col justify-center rounded-xl border border-emerald-100 bg-emerald-50/90 px-2.5 py-2 sm:min-h-[4.75rem] sm:px-3 sm:py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-800/80 sm:text-xs">
                  Per head
                </p>
                <p className="mt-0.5 line-clamp-2 text-sm font-bold leading-tight text-emerald-950">
                  {tour.pricePerHead}
                </p>
              </div>
              <div className="flex min-h-[4rem] flex-col justify-center rounded-xl border border-amber-100 bg-amber-50/90 px-2.5 py-2 sm:min-h-[4.75rem] sm:px-3 sm:py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-900/70 sm:text-xs">
                  Couple
                </p>
                <p className="mt-0.5 line-clamp-2 text-sm font-bold leading-tight text-amber-950">
                  {tour.couplePrice}
                </p>
              </div>
            </div>
          </div>

          {hasDeluxe && (
            <div className="relative overflow-hidden rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50/80 via-white to-emerald-50/50 p-3 sm:rounded-2xl sm:p-3.5">
              <p className="mb-2.5 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-forest">
                <Sparkles className="h-3.5 w-3.5 text-brand-gold" aria-hidden />
                Deluxe
                <Crown className="h-3.5 w-3.5 text-brand-gold" aria-hidden />
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="flex min-h-[4rem] flex-col justify-center rounded-xl border border-emerald-200/70 bg-white px-2.5 py-2 sm:min-h-[4.75rem] sm:px-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-forest sm:text-xs">
                    Per head
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-sm font-bold leading-tight text-brand-forest-deep">
                    {tour.deluxePricePerHead}
                  </p>
                </div>
                <div className="flex min-h-[4rem] flex-col justify-center rounded-xl border border-amber-200/80 bg-white px-2.5 py-2 sm:min-h-[4.75rem] sm:px-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-900/85 sm:text-xs">
                    Couple
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-sm font-bold leading-tight text-amber-950">
                    {tour.deluxeCouplePrice}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 sm:text-xs">
          <Users className="h-3.5 w-3.5 shrink-0 text-emerald-700" aria-hidden />
          <span>Group, family, couple & custom options</span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <a
            href={createWhatsAppUrl(tour.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-brand-forest px-2 text-[11px] font-semibold text-white shadow-md transition hover:bg-brand-forest-deep sm:min-h-11 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <Image src={whatsappIcon} alt="" width={18} height={18} className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
            Book Now
          </a>
          <Link
            href={`/tours/${tour.slug}`}
            className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-emerald-900/10 bg-white px-2 text-[11px] font-semibold text-brand-forest transition hover:border-emerald-700/25 hover:bg-emerald-50 sm:min-h-11 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <Clock className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
            View Flyer
          </Link>
        </div>
      </div>
    </div>
  );

  const shellClass =
    "group flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-emerald-900/8 bg-white text-brand-ink shadow-lg shadow-emerald-950/8 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/12";

  if (isCarousel) {
    return (
      <article className={shellClass}>
        <div className="shrink-0 overflow-hidden rounded-t-2xl">{imageBlock}</div>
        <div className="flex min-h-0 flex-1 flex-col">{body}</div>
      </article>
    );
  }

  return (
    <article className={shellClass}>
      <div className="shrink-0">{imageBlock}</div>
      <div className="flex min-h-0 flex-1 flex-col">{body}</div>
    </article>
  );
}
