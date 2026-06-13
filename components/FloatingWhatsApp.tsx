"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { whatsappIcon } from "@/components/WhatsAppButton";
import { brand } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const pathname = usePathname();

  if (pathname.startsWith("/tours/")) return null;

  return (
    <a
      href={brand.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Travel With Moiz on WhatsApp"
      className="fixed bottom-5 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xl shadow-emerald-950/40 transition hover:scale-105 max-[480px]:bottom-[5.75rem] sm:right-5 sm:h-14 sm:w-14"
    >
      <Image src={whatsappIcon} alt="" width={34} height={34} className="h-8 w-8 sm:h-9 sm:w-9" />
    </a>
  );
}
