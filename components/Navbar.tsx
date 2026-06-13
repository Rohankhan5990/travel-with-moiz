"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { whatsappIcon } from "@/components/WhatsAppButton";
import { brand } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Destinations", href: "/gallery" },
  { label: "Reviews", href: "/#client-reviews" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full max-w-full overflow-x-hidden px-4 pt-4 sm:pt-5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/12 bg-slate-950/35 px-4 py-2.5 text-white shadow-lg shadow-black/10 backdrop-blur-xl sm:rounded-full sm:py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full shadow-md shadow-black/30 ring-1 ring-white/20 sm:h-12 sm:w-12">
            <Image
              src={brand.logoSrc}
              alt=""
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="hidden sm:block">
            <span className="block font-display text-lg font-semibold tracking-tight">Travel With Moiz</span>
            <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-brand-gold-light">
              Explore Pakistan
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  active
                    ? "bg-white/12 text-brand-gold-light"
                    : "text-white/85 hover:bg-white/8 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <a
            href={brand.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-brand-gold/60 bg-brand-gold/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-gold hover:text-brand-forest-deep"
          >
            <Image src={whatsappIcon} alt="" width={18} height={18} className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-white/20 p-2 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 text-white shadow-2xl backdrop-blur-xl transition-all lg:hidden",
          open ? "max-h-[28rem] p-4 opacity-100" : "max-h-0 p-0 opacity-0",
        )}
      >
        <div className="grid gap-1">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3 font-medium transition",
                  active ? "bg-white/12 text-brand-gold-light" : "hover:bg-white/8",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={brand.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-5 py-3 font-semibold text-brand-forest-deep"
          >
            <Image src={whatsappIcon} alt="" width={18} height={18} className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
