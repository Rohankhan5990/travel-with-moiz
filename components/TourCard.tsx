import Image from "next/image";
import Link from "next/link";
import { Clock, Crown, MapPin, Sparkles, Users } from "lucide-react";
import { whatsappIcon } from "@/components/WhatsAppButton";
import type { Tour } from "@/lib/tour-types";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { formatTourDurationBadge } from "@/lib/tour-duration";

type TourCardLayout = "default" | "carousel";

export function TourCard({
  tour,
  layout = "default",
}: {
  tour: Tour;
  layout?: TourCardLayout;
}) {
  const isCarousel = layout === "carousel";
  const hasDeluxe = Boolean(tour.deluxePricePerHead && tour.deluxeCouplePrice);

  const imageBlock = (
    <Link href={`/tours/${tour.slug}`} className="block">
      <div className="relative h-52 overflow-hidden sm:h-60 md:h-64 lg:h-72 xl:h-80 2xl:h-[22rem]">
        <Image
          src={tour.heroImage}
          alt={`${tour.title} Pakistan tour package`}
          fill
          sizes="(min-width: 1536px) 28rem, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent" />
        <div className="absolute left-5 top-5 max-w-[min(92%,14rem)] rounded-full bg-white/95 px-3 py-2 text-xs font-black leading-tight text-emerald-800 shadow-lg sm:max-w-[16rem] sm:px-4 sm:text-sm">
          {formatTourDurationBadge(tour.duration)}
        </div>
        <div className="absolute bottom-6 left-5 right-5 rounded-2xl bg-slate-950/35 p-3 text-white backdrop-blur-[2px]">
          <h3
            title={tour.title}
            className="line-clamp-3 min-h-[2.5rem] text-base font-black leading-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)] sm:line-clamp-2 sm:text-lg xl:text-xl"
          >
            {tour.title}
          </h3>
          <p className="mt-2 flex items-start gap-2 text-sm !text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime-300" />
            <span className={isCarousel ? "line-clamp-2 lg:line-clamp-none" : ""}>{tour.location}</span>
          </p>
        </div>
      </div>
    </Link>
  );

  const body = (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col",
        isCarousel ? "p-5 sm:p-6" : "p-6",
      )}
    >
      {/* Fixed summary height + mt-auto footer so Standard/Deluxe blocks line up across cards in a row */}
      <p className="line-clamp-4 h-[7rem] shrink-0 overflow-hidden text-sm leading-7 text-slate-600 sm:h-[7.25rem] sm:text-base sm:leading-7">
        {tour.summary}
      </p>

      <div className="mt-auto flex shrink-0 flex-col gap-5 pt-5">
        <div className="space-y-3">
          <div
            className={cn(
              hasDeluxe
                ? "rounded-[1.25rem] border border-slate-200/95 bg-white p-3.5 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.04]"
                : "",
            )}
          >
          {hasDeluxe && (
            <p className="mb-2.5 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
              <span className="h-px flex-1 max-w-[2.5rem] bg-gradient-to-r from-transparent to-slate-300" aria-hidden />
              Standard
              <span className="h-px flex-1 max-w-[2.5rem] bg-gradient-to-l from-transparent to-slate-300" aria-hidden />
            </p>
          )}
          <div className="grid grid-cols-2 gap-2.5 text-sm sm:gap-3">
            <div className="flex min-h-[5.25rem] flex-col justify-center rounded-2xl border border-emerald-100/90 bg-emerald-50/95 px-3 py-2.5 ring-1 ring-emerald-900/[0.04] sm:min-h-[5.5rem] sm:px-4 sm:py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800/80 sm:text-xs">
                Per head
              </p>
              <p className="mt-1 line-clamp-2 break-words text-base font-black leading-tight text-emerald-950 sm:text-[1.05rem]">
                {tour.pricePerHead}
              </p>
            </div>
            <div className="flex min-h-[5.25rem] flex-col justify-center rounded-2xl border border-amber-100/90 bg-amber-50/95 px-3 py-2.5 ring-1 ring-amber-900/[0.05] sm:min-h-[5.5rem] sm:px-4 sm:py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-900/70 sm:text-xs">
                Couple
              </p>
              <p className="mt-1 line-clamp-2 break-words text-base font-black leading-tight text-amber-950 sm:text-[1.05rem]">
                {tour.couplePrice}
              </p>
            </div>
          </div>
        </div>

        {hasDeluxe && (
          <div className="relative overflow-hidden rounded-[1.25rem] border border-indigo-200/90 bg-gradient-to-br from-indigo-50 via-white to-amber-50/60 p-3.5 shadow-[0_4px_20px_-4px_rgba(49,46,129,0.18)] ring-1 ring-indigo-950/[0.06]">
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-400/15 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-amber-400/20 blur-2xl"
              aria-hidden
            />
            <p className="relative mb-2.5 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-900 sm:text-[11px]">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-indigo-500 sm:h-4 sm:w-4" aria-hidden />
              Deluxe
              <Crown className="h-3.5 w-3.5 shrink-0 text-amber-600 sm:h-4 sm:w-4" aria-hidden />
            </p>
            <div className="relative grid grid-cols-2 gap-2.5 text-sm sm:gap-3">
              <div className="flex min-h-[5.25rem] flex-col justify-center rounded-2xl border border-indigo-200/70 bg-white px-3 py-2.5 shadow-sm sm:min-h-[5.5rem] sm:px-4 sm:py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-700 sm:text-xs">
                  Per head
                </p>
                <p className="mt-1 line-clamp-2 break-words text-base font-black leading-tight text-indigo-950 sm:text-[1.05rem]">
                  {tour.deluxePricePerHead}
                </p>
              </div>
              <div className="flex min-h-[5.25rem] flex-col justify-center rounded-2xl border border-amber-200/80 bg-white px-3 py-2.5 shadow-sm sm:min-h-[5.5rem] sm:px-4 sm:py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-900/85 sm:text-xs">
                  Couple
                </p>
                <p className="mt-1 line-clamp-2 break-words text-base font-black leading-tight text-amber-950 sm:text-[1.05rem]">
                  {tour.deluxeCouplePrice}
                </p>
              </div>
            </div>
          </div>
        )}
        </div>

        <div className="flex h-[3.25rem] shrink-0 items-center gap-2 text-sm text-slate-600">
          <Users className="h-4 w-4 shrink-0 text-emerald-700" />
          <span className="line-clamp-2 leading-snug">Group, family, couple and custom options</span>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-3">
          <a
            href={createWhatsAppUrl(tour.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-700 via-green-600 to-lime-500 px-3 text-center text-xs font-black text-white shadow-lg shadow-emerald-950/15 ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/30 sm:px-4 sm:text-sm"
          >
            <Image src={whatsappIcon} alt="" width={18} height={18} className="h-5 w-5 shrink-0" />
            <span className="min-w-0 leading-tight">Book Now</span>
          </a>
          <Link
            href={`/tours/${tour.slug}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-900/10 bg-white px-3 text-xs font-black text-emerald-800 shadow-lg shadow-emerald-950/5 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-700/30 hover:bg-emerald-50 hover:shadow-emerald-950/10 sm:px-4 sm:text-sm"
          >
            <Clock className="h-4 w-4 shrink-0" />
            <span className="min-w-0 leading-tight">Itinerary</span>
          </Link>
        </div>
      </div>
    </div>
  );

  if (isCarousel) {
    return (
      <article className="group flex h-full min-h-0 w-full flex-col overflow-visible rounded-3xl border border-emerald-900/10 bg-white text-[#12392f] shadow-xl shadow-emerald-950/10 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-950/20">
        <div className="shrink-0 overflow-hidden rounded-t-3xl">{imageBlock}</div>
        <div className="flex min-h-0 flex-1 flex-col rounded-b-3xl bg-white">{body}</div>
      </article>
    );
  }

  return (
    <article className="group flex h-full min-h-0 w-full flex-col overflow-hidden rounded-3xl border border-emerald-900/10 bg-white text-[#12392f] shadow-xl shadow-emerald-950/10 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-950/20">
      <div className="shrink-0">{imageBlock}</div>
      <div className="flex min-h-0 flex-1 flex-col">{body}</div>
    </article>
  );
}
