const WHATSAPP_NUMBER = "923224294542";

const DEFAULT_BOOKING_TEXT = "Hi Travel With Moiz, I want to book a tour";

export function createWhatsAppUrl(message?: string) {
  const text = message?.trim() ? message.trim() : DEFAULT_BOOKING_TEXT;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Pre-filled text when the user taps Book on a specific package card or detail page. */
export function tourBookingMessage(tourTitle: string) {
  return `Hi Travel With Moiz, I want the ${tourTitle} tour. Please share dates, seats, and booking details.`;
}

export const brand = {
  name: "Travel With Moiz",
  logoSrc: "/images/brand/travelwithmoiz.webp",
  logoUiSrc: "/images/brand/travelwithmoiz-128.webp",
  phoneDisplay: "0322 4294542",
  phoneHref: "tel:+923224294542",
  instagram: "travelwithmoiz__",
  instagramUrl: "https://www.instagram.com/travelwithmoiz__/",
  whatsapp: createWhatsAppUrl(),
};
