import { MessageCircle } from "lucide-react";
import { brand, createWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

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
        "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 px-5 py-3 text-sm font-bold text-white shadow-2xl shadow-cyan-950/40 transition hover:-translate-y-0.5 hover:shadow-cyan-500/25",
        className,
      )}
    >
      <MessageCircle className="h-4 w-4" />
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
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-950/40 transition hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
