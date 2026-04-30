const WHATSAPP_BOOKING_URL =
  "https://wa.me/923184280414?text=Hi%20Travel%20With%20Moiz,%20I%20want%20to%20book%20a%20tour";

export function createWhatsAppUrl(message?: string) {
  void message;
  return WHATSAPP_BOOKING_URL;
}

export function tourBookingMessage(tourTitle: string) {
  void tourTitle;
  return "Hi Travel With Moiz, I want to book a tour";
}

export const brand = {
  name: "Travel With Moiz",
  phoneDisplay: "+92 318 4280414",
  phoneHref: "tel:+923184280414",
  instagram: "travelwithmoiz__",
  instagramUrl: "https://www.instagram.com/travelwithmoiz__/",
  whatsapp: WHATSAPP_BOOKING_URL,
};
