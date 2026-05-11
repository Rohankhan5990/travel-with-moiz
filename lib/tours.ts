import { packageTours } from "@/lib/package-tours";

export type { Tour } from "@/lib/tour-types";

const placeImage = (filename: string) => `/images/pakistan-places-images/${filename}`;

const placeImages = {
  skardu: placeImage("skardu.webp"),
  shangrila: placeImage("1280px-Shangrila_resort_skardu.jpg"),
  skarduDeosai: placeImage("07-Days-Tour--Skardu-Deosai-National-Park-Pakistan-1606385403579.webp"),
  deosai: placeImage("migration-at-deosai-national-park-nadeem-khawar.jpg"),
  hunza: placeImage("huzan.jpg"),
  passu: placeImage("passu-8.jpg"),
  khunjerab: placeImage("Khunjerab-Pass-featured_image.jpg.jpg"),
  chinaBorder: placeImage("China_Border,_Pakistan_khunjrab.jpg"),
  kashmir: placeImage("kashmir-valley1.jpg"),
  kashmirWide: placeImage("kashmir.jpg"),
  kashmirAlt: placeImage("kashmir-vallry.jpg"),
  neelum: placeImage("Neelum_Valley,_Azad_Jammu_&_Kashmir,_Pakistan.jpg"),
  neelumRiver: placeImage("neulam.jpg"),
  keran: placeImage("Keran-e1580725792977.webp"),
  kutton: placeImage("Kutton_Waterfall_travelpakistani.jpg"),
  fairyMeadows: placeImage("Fairy-Meadows-trek.jpg"),
  fairyMeadowsView: placeImage("1588522856---FairyMeadows3.jpg"),
  lake: placeImage("lake.jpg"),
};

/** Public tour packages (flyer assets under /public/images/packages). */
export const tours = packageTours;

export const featuredTours = tours;

export const galleryImages = [
  { title: "Skardu", src: placeImages.skardu, alt: "Skardu mountain landscape" },
  { title: "Shangrila Resort", src: placeImages.shangrila, alt: "Shangrila Resort in Skardu" },
  { title: "Skardu Deosai Route", src: placeImages.skarduDeosai, alt: "Skardu and Deosai northern route" },
  { title: "Deosai National Park", src: placeImages.deosai, alt: "Deosai National Park plains" },
  { title: "Hunza Valley", src: placeImages.hunza, alt: "Hunza valley mountains and greenery" },
  { title: "Passu Cones", src: placeImages.passu, alt: "Passu Cones mountain peaks in Hunza" },
  { title: "Khunjerab Pass", src: placeImages.khunjerab, alt: "Khunjerab Pass mountain road" },
  { title: "China Border", src: placeImages.chinaBorder, alt: "China Border at Khunjerab in Pakistan" },
  { title: "Kashmir Valley", src: placeImages.kashmir, alt: "Kashmir valley mountain view" },
  { title: "Kashmir Hills", src: placeImages.kashmirWide, alt: "Wide Kashmir valley landscape" },
  { title: "Kashmir Viewpoint", src: placeImages.kashmirAlt, alt: "Kashmir viewpoint and green hills" },
  { title: "Neelum Valley", src: placeImages.neelum, alt: "Neelum Valley in Azad Kashmir" },
  { title: "Neelum River", src: placeImages.neelumRiver, alt: "Neelum Valley river and mountains" },
  { title: "Keran", src: placeImages.keran, alt: "Keran valley destination" },
  { title: "Kutton Waterfall", src: placeImages.kutton, alt: "Kutton Waterfall in Kashmir" },
  { title: "Fairy Meadows Trek", src: placeImages.fairyMeadows, alt: "Fairy Meadows trekking landscape" },
  { title: "Fairy Meadows", src: placeImages.fairyMeadowsView, alt: "Fairy Meadows mountain view" },
  { title: "Mountain Lake", src: placeImages.lake, alt: "Pakistan mountain lake landscape" },
];

export const popularDestinations = [
  {
    title: "Hunza Valley",
    subtitle: "The Heaven on Earth",
    src: placeImages.hunza,
    alt: "Hunza Valley mountains and greenery",
  },
  {
    title: "Skardu",
    subtitle: "Land of Mountains & Lakes",
    src: placeImages.skardu,
    alt: "Skardu lake and mountain view",
  },
  {
    title: "Kashmir Valley",
    subtitle: "Paradise on Earth",
    src: placeImages.kashmir,
    alt: "Kashmir valley blue lake and green hills",
  },
  {
    title: "Neelum Valley",
    subtitle: "Unspoiled Natural Beauty",
    src: placeImages.neelumRiver,
    alt: "Neelum Valley forest stream",
  },
  {
    title: "Fairy Meadows",
    subtitle: "At the foot of Nanga Parbat",
    src: placeImages.fairyMeadows,
    alt: "Fairy Meadows mountain camp landscape",
  },
];

export type Review = {
  name: string;
  location: string;
  text: string;
  trip?: string;
};

export const reviews: Review[] = [
  {
    name: "Ayesha R.",
    location: "Lahore",
    trip: "Northern Pakistan",
    text: "The trip felt premium and safe. Hotels, route planning, and photography stops were handled so well.",
  },
  {
    name: "Hamza K.",
    location: "Islamabad",
    trip: "Hunza · group tour",
    text: "Smooth from booking to return. WhatsApp support was quick and clear.",
  },
  {
    name: "Maham S.",
    location: "Karachi",
    trip: "Family tour",
    text: "Family friendly, comfortable, and beautifully managed. We loved the itinerary balance.",
  },
];

export const faqs = [
  {
    question: "Which cities do tours depart from?",
    answer: "Most group tours depart from Lahore and Islamabad. Faisalabad, Multan, and Gujranwala joins are mentioned per package. Custom pickup can be discussed on WhatsApp.",
  },
  {
    question: "Is advance payment required?",
    answer: "Yes, seat confirmation usually requires advance (often 50% unless stated otherwise). Exact amount depends on package and dates.",
  },
  {
    question: "Are hotels shared?",
    answer: "Group packages commonly use sharing rooms. Couple and private room upgrades are available on request where noted.",
  },
  {
    question: "Is food included?",
    answer: "Breakfast and selected dinners are included on most flyer packages. Read the Services Included list on each package page.",
  },
  {
    question: "Do I need CNIC?",
    answer: "Yes, every traveler should carry original CNIC for hotel check-in and route checkpoints.",
  },
];

export function getTourBySlug(slug: string) {
  return tours.find((tour) => tour.slug === slug);
}
