"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Mountain, X } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/15 bg-slate-950/55 px-4 py-3 text-white shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-slate-950">
            <Mountain className="h-5 w-5" />
          </span>
          <span className="font-black tracking-tight">Travel With Moiz</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <WhatsAppButton className="px-4 py-2.5">WhatsApp</WhatsAppButton>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-white/15 p-2 lg:hidden"
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
          <WhatsAppButton className="mt-2 w-full" />
        </div>
      </div>
    </header>
  );
}
