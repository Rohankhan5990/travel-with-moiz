import Image from "next/image";
import Link from "next/link";
import { Camera, MapPin, Phone } from "lucide-react";
import { brand } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-4 py-14 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full shadow-lg shadow-black/40 ring-2 ring-amber-400/35">
              <Image
                src={brand.logoSrc}
                alt=""
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </span>
            <h2 className="text-3xl font-black">{brand.name}</h2>
          </div>
          <p className="mt-4 max-w-xl leading-8 text-slate-300">
            Premium Pakistan travel experiences for Hunza, Skardu, Kashmir, and
            custom northern-area adventures with simple WhatsApp booking.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppButton>Chat on WhatsApp</WhatsAppButton>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 font-bold hover:bg-white/10"
            >
              <Camera className="h-4 w-4" />
              Instagram
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-black uppercase tracking-[0.25em] text-cyan-300">Quick links</h3>
          <div className="mt-5 grid gap-3 text-slate-300">
            {[
              ["Home", "/"],
              ["Tours", "/tours"],
              ["Gallery", "/gallery"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-black uppercase tracking-[0.25em] text-cyan-300">Contact</h3>
          <div className="mt-5 space-y-4 text-slate-300">
            <a href={brand.phoneHref} className="flex items-center gap-3 hover:text-white">
              <Phone className="h-4 w-4 text-cyan-300" />
              {brand.phoneDisplay}
            </a>
            <a href={brand.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white">
              <Camera className="h-4 w-4 text-cyan-300" />
              @{brand.instagram}
            </a>
            <p className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 text-cyan-300" />
              Lahore, Islamabad, and custom Pakistan departures
            </p>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-sm text-slate-500">
        © {new Date().getFullYear()} Travel With Moiz. Designed for fast, modern Pakistan tour booking.
      </p>
    </footer>
  );
}
