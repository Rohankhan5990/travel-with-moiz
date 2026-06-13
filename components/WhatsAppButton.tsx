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
