import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users } from "lucide-react";
import { whatsappIcon } from "@/components/WhatsAppButton";
import type { Tour } from "@/lib/tour-types";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type TourCardLayout = "default" | "carousel";

export function TourCard({
  tour,
  layout = "default",
}: {
  tour: Tour;
  layout?: TourCardLayout;
}) {
  const isCarousel = layout === "carousel";

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
        <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-sm font-black text-emerald-800 shadow-lg">
          {tour.duration}
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
      {/* Fixed block heights + mt-auto on CTAs so every card lines up in a row */}
      <p
        className={cn(
          "line-clamp-4 h-[7rem] shrink-0 overflow-hidden text-sm leading-7 text-slate-600 sm:h-[7.5rem] sm:text-base sm:leading-7",
        )}
      >
        {tour.summary}
      </p>
      <div className="mt-5 grid shrink-0 grid-cols-2 gap-3 text-sm">
        <div className="flex h-[6.25rem] shrink-0 flex-col justify-center rounded-2xl bg-emerald-50 px-3 py-2 sm:h-[6.5rem] sm:px-4 sm:py-3">
          <p className="text-slate-500">Per head</p>
          <p className="mt-1 line-clamp-2 break-words font-black leading-tight text-emerald-800">
            {tour.pricePerHead}
          </p>
        </div>
        <div className="flex h-[6.25rem] shrink-0 flex-col justify-center rounded-2xl bg-amber-50 px-3 py-2 sm:h-[6.5rem] sm:px-4 sm:py-3">
          <p className="text-slate-500">Couple</p>
          <p className="mt-1 line-clamp-2 break-words font-black leading-tight text-amber-700">
            {tour.couplePrice}
          </p>
        </div>
      </div>
      <div className="mt-5 flex h-[3.25rem] shrink-0 items-center gap-2 text-sm text-slate-600">
        <Users className="h-4 w-4 shrink-0 text-emerald-700" />
        <span className="line-clamp-2 leading-snug">Group, family, couple and custom options</span>
      </div>
      <div className="mt-auto grid shrink-0 grid-cols-2 gap-3 pt-6">
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
