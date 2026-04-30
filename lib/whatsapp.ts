const WHATSAPP_NUMBER = "923184280414";

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function tourBookingMessage(tourTitle: string) {
  return `Hi Travel With Moiz, I want to book the ${tourTitle}. Please share details.`;
}

export const brand = {
  name: "Travel With Moiz",
  phoneDisplay: "+92 318 4280414",
  phoneHref: "tel:+923184280414",
  instagram: "travelwithmoiz__",
  instagramUrl: "https://www.instagram.com/travelwithmoiz__/",
  whatsapp: createWhatsAppUrl(
    "Hi Travel With Moiz, I want to plan a Pakistan tour. Please share details.",
  ),
};
