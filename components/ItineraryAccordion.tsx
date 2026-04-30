"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Tour } from "@/lib/tours";
import { cn } from "@/lib/utils";

export function ItineraryAccordion({ tour }: { tour: Tour }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      {tour.itinerary.map((item, index) => (
        <div
          key={`${item.day}-${item.title}`}
          className="rounded-[1.75rem] border border-white/10 bg-white/[0.07] text-white backdrop-blur"
        >
          <button
            type="button"
            onClick={() => setActive(active === index ? -1 : index)}
            className="flex w-full items-center justify-between gap-4 p-5 text-left"
          >
            <span>
              <span className="block text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                {item.day}
              </span>
              <span className="mt-2 block text-xl font-black">{item.title}</span>
            </span>
            <ChevronDown
              className={cn("h-5 w-5 shrink-0 transition", active === index && "rotate-180")}
            />
          </button>
          <div className={cn("grid transition-all", active === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
            <div className="overflow-hidden">
              <p className="px-5 pb-5 leading-8 text-slate-300">{item.details}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
