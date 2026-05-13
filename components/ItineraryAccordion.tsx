"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Tour } from "@/lib/tours";
import { cn } from "@/lib/utils";

export function ItineraryAccordion({ tour }: { tour: Tour }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-2.5 sm:space-y-4">
      {tour.itinerary.map((item, index) => (
        <div
          key={`${item.day}-${item.title}`}
          className="rounded-xl border border-white/10 bg-white/[0.07] text-white backdrop-blur sm:rounded-[1.75rem]"
        >
          <button
            type="button"
            onClick={() => setActive(active === index ? -1 : index)}
            className="flex w-full items-center justify-between gap-3 p-3 text-left sm:gap-4 sm:p-5"
          >
            <span>
              <span className="block text-xs font-black uppercase tracking-[0.22em] text-cyan-300 sm:text-sm sm:tracking-[0.25em]">
                {item.day}
              </span>
              <span className="mt-1.5 block text-lg font-black leading-snug sm:mt-2 sm:text-xl">
                {item.title}
              </span>
            </span>
            <ChevronDown
              className={cn("h-4 w-4 shrink-0 transition sm:h-5 sm:w-5", active === index && "rotate-180")}
            />
          </button>
          <div className={cn("grid transition-all", active === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
            <div className="overflow-hidden">
              <p className="whitespace-pre-line px-3 pb-3 text-sm leading-relaxed text-slate-300 sm:px-5 sm:pb-5 sm:text-base sm:leading-8">
                {item.details}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
