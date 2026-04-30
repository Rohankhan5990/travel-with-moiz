import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users } from "lucide-react";
import type { Tour } from "@/lib/tours";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] text-white shadow-2xl shadow-slate-950/25 backdrop-blur transition duration-300 hover:-translate-y-2 hover:bg-white/[0.1]">
      <Link href={`/tours/${tour.slug}`} className="block">
        <div className="relative h-72 overflow-hidden">
          <Image
            src={tour.heroImage}
            alt={`${tour.title} Pakistan tour package`}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
          <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-sm font-black text-teal-800">
            {tour.duration}
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <h3 className="text-2xl font-black">{tour.title}</h3>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-200">
              <MapPin className="h-4 w-4 text-cyan-300" />
              {tour.location}
            </p>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <p className="leading-7 text-slate-300">{tour.summary}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-slate-950/45 p-4">
            <p className="text-slate-400">Per head</p>
            <p className="mt-1 font-black text-cyan-200">{tour.pricePerHead}</p>
          </div>
          <div className="rounded-2xl bg-slate-950/45 p-4">
            <p className="text-slate-400">Couple</p>
            <p className="mt-1 font-black text-amber-200">{tour.couplePrice}</p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
          <Users className="h-4 w-4 text-cyan-300" />
          Group, family, couple and custom options
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={createWhatsAppUrl(tour.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 px-5 py-3 text-sm font-bold text-white transition hover:shadow-lg hover:shadow-cyan-500/20"
          >
            Book on WhatsApp
          </a>
          <Link
            href={`/tours/${tour.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold transition hover:bg-white/10"
          >
            <Clock className="h-4 w-4" />
            Itinerary
          </Link>
        </div>
      </div>
    </article>
  );
}
