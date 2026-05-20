import Link from "next/link";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center section-surface-dark px-4 py-32 text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold-light">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-slate-300">
        This route doesn&apos;t exist. Head back home or browse our tour packages.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
        >
          Back to home
        </Link>
        <WhatsAppButton>Chat on WhatsApp</WhatsAppButton>
      </div>
    </section>
  );
}
