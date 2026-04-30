"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, MessageCircle, Mountain, X } from "lucide-react";
import { brand } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Destinations", href: "/gallery" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-950/20 px-4 py-3 text-white backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-300/70 bg-emerald-950/70 text-amber-300 shadow-lg shadow-black/20">
            <Mountain className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-lg font-black tracking-tight">Travel With Moiz</span>
            <span className="block text-[0.62rem] font-black uppercase tracking-[0.45em] text-amber-300">
              Explore Pakistan
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-bold text-white/90 transition hover:text-amber-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <a
            href={brand.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-amber-300/70 px-5 py-3 text-sm font-black text-white transition hover:bg-amber-300 hover:text-emerald-950"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-white/20 p-2 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "mx-auto mt-3 max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 text-white shadow-2xl backdrop-blur-xl transition-all lg:hidden",
          open ? "max-h-96 p-4 opacity-100" : "max-h-0 p-0 opacity-0",
        )}
      >
        <div className="grid gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 font-semibold hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={brand.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-300 px-5 py-3 font-black text-emerald-950"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
