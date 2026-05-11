export type Tour = {
  title: string;
  slug: string;
  duration: string;
  location: string;
  pricePerHead: string;
  couplePrice: string;
  /** Optional deluxe tier — shown on cards and detail when set. */
  deluxePricePerHead?: string;
  deluxeCouplePrice?: string;
  summary: string;
  heroImage: string;
  gallery: string[];
  attractions: string[];
  itinerary: { day: string; title: string; details: string }[];
  included: string[];
  excluded: string[];
  departureInfo: string;
  category: string[];
  whatsappMessage: string;
  /** Optional structured blocks shown on the detail page */
  packageDetail?: string[];
  pickupPoints?: string[];
  mealInfo?: string[];
  bookingContact?: string;
  childrenPolicy?: string[];
  seatPolicy?: string[];
  equipment?: string[];
  registration?: string[];
  terms?: string[];
  notes?: string[];
};
