import type { Tour } from "@/lib/tour-types";
import { getTourBasePrice, getTourDifficulty, getTourRegions, parseDays } from "@/lib/tour-meta";

export type TravelerType = "Family" | "Couple" | "Friends" | "Solo" | "Corporate";

export type TripBrief = {
  travelers: TravelerType;
  days: number;
  /** Max budget per person in PKR. 0 / undefined means flexible. */
  budget?: number;
  /** Free-text wishes, e.g. "lakes and easy walking with kids". */
  vibe?: string;
};

export type TripMatch = {
  tour: Tour;
  score: number;
  reasons: string[];
};

const vibeSignals: { pattern: RegExp; regions?: RegExp; bonusFor: (tour: Tour) => boolean; reason: string }[] = [
  {
    pattern: /lake|water|reflection/i,
    bonusFor: (t) => /lake|saif|attabad|manthoka|shangrila|kachura/i.test(`${t.title} ${t.attractions.join(" ")}`),
    reason: "Built around lake stops you asked for",
  },
  {
    pattern: /trek|hik|adventure|camp/i,
    bonusFor: (t) => getTourDifficulty(t) !== "Easy",
    reason: "Has real trekking and adventure terrain",
  },
  {
    pattern: /relax|easy|comfort|chill|scenic/i,
    bonusFor: (t) => getTourDifficulty(t) === "Easy",
    reason: "Relaxed pace with easy walking",
  },
  {
    pattern: /snow|glacier|peak|mountain/i,
    bonusFor: (t) => /khunjerab|nanga parbat|deosai|babusar|malam/i.test(`${t.title} ${t.attractions.join(" ")}`),
    reason: "High-altitude peaks and glacier views",
  },
  {
    pattern: /history|culture|fort|village/i,
    bonusFor: (t) => /fort|altit|baltit|sharda|village/i.test(`${t.title} ${t.attractions.join(" ")}`),
    reason: "Includes forts and culture stops",
  },
];

/**
 * Deterministic on-device matcher: scores every package against the brief.
 * Runs instantly in the browser — no API round-trip, works on the static build.
 */
export function matchTours(brief: TripBrief, tours: Tour[]): TripMatch[] {
  const matches = tours.map((tour) => {
    let score = 0;
    const reasons: string[] = [];

    const days = parseDays(tour.duration);
    const dayGap = Math.abs(days - brief.days);
    if (dayGap === 0) {
      score += 40;
      reasons.push(`Exactly ${days} days, as planned`);
    } else if (dayGap === 1) {
      score += 28;
      reasons.push(`${days} days — within a day of your plan`);
    } else if (dayGap === 2) {
      score += 14;
    } else {
      score -= dayGap * 4;
    }

    const price = getTourBasePrice(tour);
    if (brief.budget && brief.budget > 0 && price) {
      if (price <= brief.budget) {
        score += 30;
        reasons.push("Fits inside your budget per person");
        const headroom = (brief.budget - price) / brief.budget;
        if (headroom > 0.25) score += 6;
      } else if (price <= brief.budget * 1.15) {
        score += 10;
        reasons.push("Slightly above budget — worth a WhatsApp ask");
      } else {
        score -= 25;
      }
    }

    const categories = tour.category.map((c) => c.toLowerCase());
    const travelerBonus: Record<TravelerType, () => boolean> = {
      Family: () => categories.includes("family"),
      Couple: () => categories.includes("couple") || Boolean(tour.couplePrice),
      Friends: () => categories.includes("group") || categories.includes("weekend"),
      Solo: () => categories.includes("group"),
      Corporate: () => categories.includes("group"),
    };
    if (travelerBonus[brief.travelers]()) {
      score += 16;
      reasons.push(
        brief.travelers === "Couple"
          ? "Couple pricing and room options available"
          : `Runs well for ${brief.travelers.toLowerCase()} groups`,
      );
    }

    if (brief.vibe?.trim()) {
      for (const signal of vibeSignals) {
        if (signal.pattern.test(brief.vibe) && signal.bonusFor(tour)) {
          score += 14;
          reasons.push(signal.reason);
        }
      }
      for (const region of getTourRegions(tour)) {
        if (new RegExp(region.replace(/\s+/g, "\\s*"), "i").test(brief.vibe)) {
          score += 22;
          reasons.push(`Covers ${region}, which you mentioned`);
        }
      }
    }

    return { tour, score, reasons: reasons.slice(0, 3) };
  });

  return matches.sort((a, b) => b.score - a.score);
}

/** Plain-text search across title, location, attractions, and regions. */
export function searchTours(query: string, tours: Tour[]): Tour[] {
  const q = query.trim().toLowerCase();
  if (!q) return tours;
  const terms = q.split(/\s+/).filter(Boolean);
  return tours.filter((tour) => {
    const haystack = [
      tour.title,
      tour.location,
      tour.duration,
      tour.attractions.join(" "),
      getTourRegions(tour).join(" "),
      tour.category.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
