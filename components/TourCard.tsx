import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users } from "lucide-react";
import { whatsappIcon } from "@/components/WhatsAppButton";
import type { Tour } from "@/lib/tours";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-900/10 bg-white text-[#12392f] shadow-xl shadow-emerald-950/10 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-950/20">
      <Link href={`/tours/${tour.slug}`} className="block">
        <div className="relative h-80 overflow-hidden lg:h-96">
          <Image
            src={tour.heroImage}
            alt={`${tour.title} Pakistan tour package`}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent" />
          <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-sm font-black text-emerald-800 shadow-lg">
            {tour.duration}
          </div>
          <div className="absolute bottom-6 left-5 right-5 rounded-2xl bg-slate-950/35 p-3 text-white backdrop-blur-[2px]">
            <h3
              title={tour.title}
              className="truncate whitespace-nowrap text-lg font-black leading-tight drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)] xl:text-xl"
              style={{ color: "#ffffff" }}
            >
              {tour.title}
            </h3>
            <p className="mt-2 flex items-center gap-2 text-sm !text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              <MapPin className="h-4 w-4 text-lime-300" />
              {tour.location}
            </p>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="leading-7 text-slate-600">{tour.summary}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="text-slate-500">Per head</p>
            <p className="mt-1 font-black text-emerald-800">{tour.pricePerHead}</p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-4">
            <p className="text-slate-500">Couple</p>
            <p className="mt-1 font-black text-amber-700">{tour.couplePrice}</p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
          <Users className="h-4 w-4 shrink-0 text-emerald-700" />
          Group, family, couple and custom options
        </div>
        <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
          <a
            href={createWhatsAppUrl(tour.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-700 via-green-600 to-lime-500 px-4 text-center text-xs font-black text-white shadow-lg shadow-emerald-950/15 ring-1 ring-white/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/30 sm:text-sm"
          >
            <Image src={whatsappIcon} alt="" width={18} height={18} className="h-5 w-5 shrink-0" />
            <span className="whitespace-nowrap">Book Now</span>
          </a>
          <Link
            href={`/tours/${tour.slug}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-900/10 bg-white px-4 text-xs font-black text-emerald-800 shadow-lg shadow-emerald-950/5 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-700/30 hover:bg-emerald-50 hover:shadow-emerald-950/10 sm:text-sm"
          >
            <Clock className="h-4 w-4 shrink-0" />
            Itinerary
          </Link>
        </div>
      </div>
    </article>
  );
}
