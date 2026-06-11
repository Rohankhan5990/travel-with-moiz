import Image from "next/image";
import { Clock3, MessageCircleHeart, Phone, ShieldCheck } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { whatsappIcon } from "@/components/WhatsAppButton";
import { brand, createWhatsAppUrl } from "@/lib/whatsapp";

const promises = [
  { Icon: Clock3, text: "Replies within minutes, 7 days a week" },
  { Icon: ShieldCheck, text: "Confirmed prices before you pay anything" },
  { Icon: MessageCircleHeart, text: "Real expert — not a bot — on the other side" },
];

export function WhatsAppCtaSection() {
  return (
    <section className="section-surface-night px-4 py-20 sm:py-24">
      <AnimatedSection className="mx-auto max-w-5xl">
        <div className="aurora glass relative overflow-hidden rounded-[2.5rem] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="relative z-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/40">
              <Image src={whatsappIcon} alt="" width={34} height={34} className="h-8 w-8" />
            </span>
            <h2 className="text-balance mt-6 font-display text-4xl font-semibold text-white sm:text-5xl">
              Need help planning?
            </h2>
            <p className="mt-3 text-lg text-white/75">
              Chat with our travel expert — dates, seats, and custom routes in one conversation.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={createWhatsAppUrl("Hi Travel With Moiz, I need help planning a trip")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-emerald-950/40 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30"
              >
                <Image src={whatsappIcon} alt="" width={22} height={22} className="h-5.5 w-5 sm:h-6 sm:w-6" />
                Chat on WhatsApp
              </a>
              <a
                href={brand.phoneHref}
                className="glass-soft inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white transition hover:bg-white/15"
              >
                <Phone className="h-5 w-5 text-brand-gold-light" />
                {brand.phoneDisplay}
              </a>
            </div>

            <div className="mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
              {promises.map(({ Icon, text }) => (
                <p
                  key={text}
                  className="glass-soft flex items-start gap-2.5 rounded-2xl px-4 py-3.5 text-sm leading-6 text-white/80"
                >
                  <Icon className="mt-0.5 h-4.5 w-4 shrink-0 text-brand-gold-light sm:h-5 sm:w-5" strokeWidth={1.75} />
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
