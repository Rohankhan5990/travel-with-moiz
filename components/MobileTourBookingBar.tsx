import Image from "next/image";
import { whatsappIcon } from "@/components/WhatsAppButton";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function MobileTourBookingBar({
  message,
  price,
}: {
  message: string;
  price: string;
}) {
  return (
    <aside className="fixed inset-x-0 bottom-0 z-[65] border-t border-white/15 bg-brand-night/95 px-4 py-3 shadow-2xl shadow-black/60 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
            Starting per head
          </p>
          <p className="truncate text-sm font-bold text-brand-gold-light">{price}</p>
        </div>
        <a
          href={createWhatsAppUrl(message)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 px-5 text-sm font-bold text-white shadow-lg shadow-emerald-950/40"
        >
          <Image src={whatsappIcon} alt="" width={20} height={20} className="h-5 w-5" />
          Book on WhatsApp
        </a>
      </div>
    </aside>
  );
}
