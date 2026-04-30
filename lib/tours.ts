import { tourBookingMessage } from "@/lib/whatsapp";

export type Tour = {
  title: string;
  slug: string;
  duration: string;
  location: string;
  pricePerHead: string;
  couplePrice: string;
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
};

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

export const tours: Tour[] = [
  {
    title: "Skardu 06 Days",
    slug: "skardu-6-days",
    duration: "6 Days",
    location: "Skardu, Deosai, Shigar",
    pricePerHead: "PKR 31,000",
    couplePrice: "PKR 75,000",
    summary:
      "A cinematic north Pakistan escape through lakes, waterfalls, cold desert, valleys, and Deosai plains.",
    heroImage: placeImages.skardu,
    gallery: [
      placeImages.shangrila,
      placeImages.skarduDeosai,
      placeImages.deosai,
    ],
    attractions: [
      "Hazara Expressway",
      "Babusar Top",
      "Naran",
      "Nanga Parbat View Point",
      "3 Mountain Junction",
      "Shangrila Resort",
      "Upper Kachura Lake",
      "Lower Kachura Lake",
      "Shiger Desert",
      "Shiger Fort",
      "Manthoka Waterfall",
      "Basho Valley",
      "Sadpara Lake",
      "Deosai Plains",
      "Sheosar Lake",
      "Kala Pani",
      "Bada Pani",
      "Skardu Bazar",
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Islamabad to Chilas/Naran route",
        details:
          "Departure via Hazara Expressway with stops around Naran, Babusar Top, and mountain viewpoints.",
      },
      {
        day: "Day 02",
        title: "Arrival in Skardu",
        details:
          "Drive through the Indus route, check in, relax, and explore Skardu Bazar in the evening.",
      },
      {
        day: "Day 03",
        title: "Shangrila and Kachura lakes",
        details:
          "Visit Shangrila Resort, Upper Kachura, Lower Kachura, and nearby scenic lake points.",
      },
      {
        day: "Day 04",
        title: "Shigar and Manthoka Waterfall",
        details:
          "Explore Shigar Desert, Shigar Fort, and the powerful Manthoka Waterfall valley route.",
      },
      {
        day: "Day 05",
        title: "Deosai National Park",
        details:
          "Full-day excursion to Deosai Plains, Sheosar Lake, Kala Pani, and Bada Pani where accessible.",
      },
      {
        day: "Day 06",
        title: "Return journey",
        details:
          "Breakfast, checkout, and guided return drive with comfort stops along the mountain route.",
      },
    ],
    included: ["Hotel stay", "Transport", "Basic breakfast", "Tour guide", "Toll taxes"],
    excluded: ["Personal shopping", "Jeep charges where required", "Entry tickets", "Lunch and dinner"],
    departureInfo: "Departures from Lahore and Islamabad on selected group tour dates.",
    category: ["Skardu", "Family", "Group", "Couple"],
    whatsappMessage: tourBookingMessage("6 Days Skardu Tour"),
  },
  {
    title: "Hunza 05 Days",
    slug: "hunza-5-days",
    duration: "5 Days",
    location: "Hunza, Attabad, Khunjerab",
    pricePerHead: "PKR 27,000",
    couplePrice: "PKR 65,000",
    summary:
      "A crisp Hunza adventure through forts, lakes, Passu Cones, Karakoram Highway, and China Border.",
    heroImage: placeImages.hunza,
    gallery: [
      placeImages.passu,
      placeImages.khunjerab,
      placeImages.chinaBorder,
    ],
    attractions: [
      "Hazara Expressway",
      "Naran",
      "Babusar Top",
      "River Indus",
      "Chilas",
      "Naltar Valley",
      "Old Silk Route",
      "Gilgit",
      "Rakaposhi View Point",
      "Baltit Fort",
      "Karimabad Bazar",
      "Attabad Lake",
      "Hussaini Bridge",
      "Passu Cones",
      "Attabad Tunnels",
      "Karakoram Highway",
      "Khunjerab Pass",
      "China Border",
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Departure for Chilas",
        details:
          "Travel through Hazara Expressway, Naran, Babusar Top, River Indus, and Chilas.",
      },
      {
        day: "Day 02",
        title: "Naltar and Gilgit",
        details:
          "Visit Naltar Valley where accessible, then continue toward Gilgit and Hunza.",
      },
      {
        day: "Day 03",
        title: "Karimabad heritage",
        details:
          "Explore Rakaposhi viewpoint, Baltit Fort, Karimabad Bazar, and local Hunza viewpoints.",
      },
      {
        day: "Day 04",
        title: "Attabad to Khunjerab",
        details:
          "Visit Attabad Lake, Hussaini Bridge, Passu Cones, Attabad Tunnels, and Khunjerab Pass.",
      },
      {
        day: "Day 05",
        title: "Return journey",
        details:
          "Checkout and drive back through the Karakoram Highway with scenic comfort stops.",
      },
    ],
    included: ["Transport", "Hotel stay", "Breakfast", "Driver and guide", "Basic first aid"],
    excluded: ["Boating", "Fort tickets", "Jeep charges", "Personal meals and expenses"],
    departureInfo: "Best for friends, families, and couples joining from major cities.",
    category: ["Hunza", "Family", "Couple", "Group"],
    whatsappMessage: tourBookingMessage("5 Days Hunza Tour"),
  },
  {
    title: "Hunza + Skardu 08 Days",
    slug: "hunza-skardu-8-days",
    duration: "8 Days / 7 Nights",
    location: "Hunza, Skardu, Deosai",
    pricePerHead: "Ask for latest price",
    couplePrice: "Custom quote",
    summary:
      "The signature grand northern route combining Hunza heritage, Karakoram drama, Skardu lakes, and Deosai.",
    heroImage: placeImages.skarduDeosai,
    gallery: [
      placeImages.hunza,
      placeImages.skardu,
      placeImages.passu,
    ],
    attractions: [
      "Hunza",
      "Naltar",
      "Altit Fort",
      "Baltit Fort",
      "Attabad Lake",
      "Gulmit",
      "Passu",
      "Khunjerab Pass",
      "Deosai National Park",
      "Shigar Valley",
      "Sarfaranga Cold Desert",
      "Manthoka Waterfall",
      "Shangrila Lake",
      "Upper Kachura Lake",
    ],
    itinerary: [
      {
        day: "Days 01-02",
        title: "Karakoram route to Hunza",
        details:
          "Travel north with scenic highway stops, then settle into Hunza for heritage exploration.",
      },
      {
        day: "Days 03-04",
        title: "Hunza, Passu, and Khunjerab",
        details:
          "Cover forts, Attabad Lake, Gulmit, Passu Cones, and Khunjerab Pass where road conditions allow.",
      },
      {
        day: "Days 05-06",
        title: "Journey to Skardu",
        details:
          "Drive toward Skardu for Shangrila Lake, Upper Kachura, Shigar Valley, and Sarfaranga Cold Desert.",
      },
      {
        day: "Day 07",
        title: "Deosai and Manthoka",
        details:
          "Explore Deosai National Park or Manthoka Waterfall based on season and accessibility.",
      },
      {
        day: "Day 08",
        title: "Checkout and return",
        details:
          "Breakfast, final photos, and return journey with planned stops along the way.",
      },
    ],
    included: ["Hotel accommodation", "Private/group transport", "Breakfast", "Route planning", "Guide support"],
    excluded: ["Air tickets", "Jeep transfers", "Adventure activities", "Personal shopping"],
    departureInfo: "Available as a custom private tour or seasonal group departure.",
    category: ["Hunza", "Skardu", "Family", "Custom"],
    whatsappMessage: tourBookingMessage("8 Days Hunza + Skardu Tour"),
  },
  {
    title: "Kashmir Valley 03 Days",
    slug: "kashmir-3-days",
    duration: "3 Days",
    location: "Neelum Valley, Keran, Upper Neelum",
    pricePerHead: "PKR 16,000",
    couplePrice: "PKR 40,000",
    summary:
      "A refreshing short escape into waterfalls, riverside views, Keran, Upper Neelum, and lush valley roads.",
    heroImage: placeImages.kashmir,
    gallery: [
      placeImages.neelum,
      placeImages.keran,
      placeImages.kutton,
    ],
    attractions: [
      "Neelum Valley",
      "Dhani Waterfall",
      "Kutton Waterfall",
      "LOC",
      "Upper Neelum",
      "Keran",
      "Baboon Valley",
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Departure to Kashmir",
        details:
          "Drive toward Muzaffarabad and Neelum Valley with stops at Dhani Waterfall and riverside viewpoints.",
      },
      {
        day: "Day 02",
        title: "Keran and Upper Neelum",
        details:
          "Explore Keran, Upper Neelum, LOC viewpoints, and optional local routes depending on conditions.",
      },
      {
        day: "Day 03",
        title: "Kutton Waterfall and return",
        details:
          "Visit Kutton Waterfall and begin the return journey after lunch and final valley photos.",
      },
    ],
    included: ["Hotel stay", "Transport", "Breakfast", "Tour coordinator", "Basic route support"],
    excluded: ["Jeep ride to Baboon Valley", "Entry tickets", "Lunch and dinner", "Personal expenses"],
    departureInfo: "A compact weekend-friendly plan for families, couples, and friends.",
    category: ["Kashmir", "Family", "Couple", "Weekend"],
    whatsappMessage: tourBookingMessage("3 Days Kashmir Valley Tour"),
  },
];

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
  /** Short label for context (e.g. package or trip type). */
  trip?: string;
};

export const reviews: Review[] = [
  {
    name: "Ayesha R.",
    location: "Lahore",
    trip: "Skardu · 6 days",
    text: "The Skardu tour felt premium and safe. Hotels, route planning, and photography stops were handled so well.",
  },
  {
    name: "Hamza K.",
    location: "Islamabad",
    trip: "Hunza · 5 days",
    text: "Hunza with Travel With Moiz was smooth from booking to return. The WhatsApp support was quick.",
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
    answer: "Most group tours depart from Lahore and Islamabad. Custom pickup can be discussed on WhatsApp.",
  },
  {
    question: "Is advance payment required?",
    answer: "Yes, seat confirmation usually requires an advance payment. Exact amount depends on package and dates.",
  },
  {
    question: "Are hotels shared?",
    answer: "Group packages commonly use sharing rooms. Couple and family room upgrades are available on request.",
  },
  {
    question: "Is food included?",
    answer: "Breakfast is included in most packages. Lunch, dinner, and personal snacks are usually excluded.",
  },
  {
    question: "Do I need CNIC?",
    answer: "Yes, every traveler should carry original CNIC for hotel check-in and route checkpoints.",
  },
];

export function getTourBySlug(slug: string) {
  return tours.find((tour) => tour.slug === slug);
}
