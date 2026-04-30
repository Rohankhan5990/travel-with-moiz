import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users } from "lucide-react";
import { whatsappIcon } from "@/components/WhatsAppButton";
import type { Tour } from "@/lib/tours";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-emerald-900/10 bg-white text-[#12392f] shadow-xl shadow-emerald-950/10 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-950/20">
      <Link href={`/tours/${tour.slug}`} className="block">
        <div className="relative h-72 overflow-hidden">
          <Image
            src={tour.heroImage}
            alt={`${tour.title} Pakistan tour package`}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/10 to-transparent" />
          <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-sm font-black text-emerald-800 shadow-lg">
            {tour.duration}
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <h3 className="text-2xl font-black">{tour.title}</h3>
            <p className="mt-2 flex items-center gap-2 text-sm text-white/85">
              <MapPin className="h-4 w-4 text-lime-300" />
              {tour.location}
            </p>
          </div>
        </div>
      </Link>

      <div className="p-6">
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
          <Users className="h-4 w-4 text-emerald-700" />
          Group, family, couple and custom options
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={createWhatsAppUrl(tour.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-700 to-green-600 px-5 py-3 text-sm font-bold text-white transition hover:shadow-lg hover:shadow-emerald-500/20"
          >
            <Image src={whatsappIcon} alt="" width={18} height={18} className="h-5 w-5" />
            Book on WhatsApp
          </a>
          <Link
            href={`/tours/${tour.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-emerald-900/10 px-5 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
          >
            <Clock className="h-4 w-4" />
            Itinerary
          </Link>
        </div>
      </div>
    </article>
  );
}
