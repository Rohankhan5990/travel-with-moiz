import type { Tour } from "@/lib/tour-types";

/** "Rs. 11,000" -> 11000. Returns null when the price is text-only ("On request"). */
export function parsePriceRs(price: string | undefined): number | null {
  if (!price) return null;
  const digits = price.replace(/[^\d]/g, "");
  if (!digits) return null;
  return Number(digits);
}

/** "5 Days - 4 Nights (...)" -> 5 */
export function parseDays(duration: string): number {
  const match = duration.match(/(\d+)\s*Day/i);
  return match ? Number(match[1]) : 1;
}

export type Difficulty = "Easy" | "Moderate" | "Challenging";

/** Editorial difficulty per package — long jeep routes and treks rank higher. */
const difficultyBySlug: Record<string, Difficulty> = {
  "shogran-siri-paye-khanpur": "Easy",
  "kumrat-4-days": "Moderate",
  "fairy-meadows-5-days": "Challenging",
  "swat-bahrain-malam-kalam": "Easy",
  "naran-valley-saif-malook": "Easy",
  "azad-kashmir-taobat": "Moderate",
  "hunza-skardu-deosai-8-days": "Moderate",
  "hunza-naltar-china-border-5-days-besham": "Moderate",
  "hunza-naltar-china-border-5-days-naran": "Moderate",
  "kashmir-neelum-sharda-arang-kel-3-days": "Easy",
  "skardu-manthoka-deosai-basho-6-days": "Moderate",
};

export function getTourDifficulty(tour: Tour): Difficulty {
  return difficultyBySlug[tour.slug] ?? "Moderate";
}

export type Region =
  | "Hunza"
  | "Skardu"
  | "Kashmir"
  | "Naran"
  | "Swat"
  | "Kumrat"
  | "Fairy Meadows"
  | "Shogran";

const regionKeywords: Record<Region, RegExp> = {
  Hunza: /hunza|khunjerab|naltar|attabad|passu/i,
  Skardu: /skardu|deosai|manthoka|basho|shangrila/i,
  Kashmir: /kashmir|neelum|sharda|arang|taobat|keran/i,
  Naran: /naran|kaghan|saif|babusar|shogran|siri paye/i,
  Swat: /swat|kalam|malam|bahrain/i,
  Kumrat: /kumrat|jahaz banda|katora/i,
  "Fairy Meadows": /fairy meadows|nanga parbat/i,
  Shogran: /shogran|siri paye/i,
};

/** Regions a tour touches, matched against title, location, and attractions. */
export function getTourRegions(tour: Tour): Region[] {
  const haystack = `${tour.title} ${tour.location} ${tour.attractions.join(" ")}`;
  return (Object.keys(regionKeywords) as Region[]).filter((region) =>
    regionKeywords[region].test(haystack),
  );
}

export function formatRs(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

/** Cheapest numeric per-head price (standard tier). */
export function getTourBasePrice(tour: Tour): number | null {
  return parsePriceRs(tour.pricePerHead);
}
