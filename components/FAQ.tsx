"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/tours";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={faq.question}
          className="overflow-hidden rounded-3xl border border-emerald-900/10 bg-white text-[#12392f] shadow-lg shadow-emerald-950/5"
        >
          <button
            type="button"
            onClick={() => setActive(active === index ? -1 : index)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-bold"
          >
            {faq.question}
            <ChevronDown
              className={cn(
                "h-5 w-5 shrink-0 transition",
                active === index ? "rotate-180 text-emerald-700" : "text-slate-400",
              )}
            />
          </button>
          <div
            className={cn(
              "grid transition-all",
              active === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div className="overflow-hidden">
              <p className="px-6 pb-5 leading-7 text-slate-600">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
