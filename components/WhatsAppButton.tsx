import Image from "next/image";
import { brand, createWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const whatsappIcon = "/icons/whatsapp.svg";

export function WhatsAppButton({
  message,
  className,
  children = "Book on WhatsApp",
}: {
  message?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={message ? createWhatsAppUrl(message) : brand.whatsapp}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-700 to-green-600 px-5 py-3 text-sm font-bold text-white shadow-2xl shadow-emerald-950/30 transition hover:-translate-y-0.5 hover:shadow-emerald-500/25",
        className,
      )}
    >
      <Image src={whatsappIcon} alt="" width={20} height={20} className="h-5 w-5" />
      {children}
    </a>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={brand.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Travel With Moiz on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xl shadow-emerald-950/40 transition hover:scale-105 max-[480px]:bottom-[5.75rem] max-[480px]:right-4 max-[480px]:h-12 max-[480px]:w-12 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14"
    >
      <Image src={whatsappIcon} alt="" width={34} height={34} className="h-8 w-8 sm:h-9 sm:w-9" />
    </a>
  );
}
