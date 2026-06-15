import type { Tour } from "./tour-types";
import { tourBookingMessage } from "@/lib/whatsapp";

const pkg = (filename: string) => `/images/packages/${filename.replace(/\.png$/i, ".webp")}`;

/** First digit group in `duration` (e.g. "4 Days - 3 Nights" → 4) for listing order. */
function durationDayOrder(duration: string): number {
  const m = /\d+/.exec(duration);
  return m ? Number(m[0]) : 999;
}

const packageToursData: Tour[] = [
  {
    title: "02 Days Shogran, Siri Paye & Khanpur",
    slug: "shogran-siri-paye-khanpur",
    duration: "2 Days - 1 Night",
    location: "Shogran · Siri Paye · Kiwai · Balakot · Khanpur Dam",
    pricePerHead: "Rs. 14,000",
    couplePrice: "Rs. 30,000",
    deluxePricePerHead: "Rs. 20,000",
    deluxeCouplePrice: "Rs. 40,000",
    summary:
      "Friday-night departure from Lahore with Shogran & Siri Paye jeep safari, Kiwai waterfall, Balakot River, and Khanpur Dam water activities.",
    heroImage: pkg("shogran.png"),
    gallery: [pkg("shogran.png")],
    attractions: [
      "Shogran",
      "Siri Paye",
      "Kiwai Waterfall",
      "Balakot River",
      "Khanpur Dam",
    ],
    itinerary: [
      {
        day: "Day 00",
        title: "Friday night — Departure",
        details:
          "Leave from Lahore at 10pm. Short stay where needed on the route.",
      },
      {
        day: "Day 1",
        title: "Balakot · Kiwai · Shogran & Siri Paye",
        details:
          "Sightseeing en route (Abbottabad, Mansehra, Balakot). Breakfast at Balakot. Coaster to Kiwai, then jeep to Shogran & Siri Paye. Photo session. Dinner at hotel, bonfire & music, overnight in Shogran.",
      },
      {
        day: "Day 2",
        title: "Kiwai Waterfall · Khanpur Dam · Return",
        details:
          "Wake-up call 7:30am, breakfast 8:30am. Short stay at Kiwai Waterfall with photos. Coaster to Khanpur Dam for water activities. Dinner break at any Shinwari (not included). Reach back safely — end of services.",
      },
    ],
    included: [
      "AC private transportation (Coaster or Toyota Grand Cabin)",
      "Quality hygienic food (2 breakfasts, 1 dinner — paratha, omelette, tea, chanay when available; dinner chicken dish or biryani on rotation)",
      "Fuel / diesel / toll expenses",
      "Bonfire",
      "Tour guide",
      "Basic first aid kit",
      "Hotel accommodation for 1 night (hotel & huts)",
    ],
    excluded: [
      "Mineral water, tea, snacks",
      "Jeep charges",
      "Boating",
      "Beverages, laundry, heater, phone calls & personal expenses",
    ],
    departureInfo:
      "Departure every Friday night. Pickups: Lahore — Siddique Trade Center; Gujranwala — Pindi Bypass Total pump; Islamabad/Rawalpindi — Faizabad.",
    category: ["Weekend", "Group", "Family", "Couple"],
    whatsappMessage: tourBookingMessage("02 Days Shogran, Siri Paye & Khanpur"),
    packageDetail: [
      "Standard: Solo Rs. 14,000/- · Couple Rs. 30,000/-",
      "Deluxe: Solo Rs. 20,000/- · Couple Rs. 40,000/-",
      "Duration: 2 Days, 1 Night — departure every Friday night",
    ],
    pickupPoints: [
      "Lahore: Siddique Trade Center",
      "Gujranwala: Pindi Bypass, Total Petrol pump",
      "Islamabad/Rawalpindi: Faizabad",
    ],
    childrenPolicy: [
      "Under 4 years — free (lap or folding seat if available)",
      "4–8 years — half charges (folding seat)",
      "8+ years — full charges",
    ],
    seatPolicy: [
      "Seats allotted before departure; may shuffle during the tour. Specific seat requests: Rs. 1,000/seat/day.",
    ],
    registration: [
      "50% advance 2 days before the trip.",
      "Send trip name & date, payment receipt, participant names, CNICs, contact numbers, and total seats via SMS/WhatsApp.",
    ],
    terms: [
      "Members shall not indulge in any act reflecting moral or character failing.",
      "Members must respect the authority of the organizer.",
      "Each participant should treat other members with respect.",
      "Special respect towards female members.",
      "Organizers may change the plan if necessary.",
      "Advance 50% on booking; balance on departure.",
      "Valid CNIC/passport required. Non-slip shoes and warm clothes advised. Drugs strictly prohibited.",
    ],
    notes: ["Tour ends with smiles — satisfied clients."],
  },
  {
    title: "4 Days Trip to Kumrat",
    slug: "kumrat-4-days",
    duration: "4 Days - 3 Nights",
    location: "Thal · Kumrat · Kala Chashma · Jahaz Banda · Katora Lake",
    pricePerHead: "Rs. 22,000",
    couplePrice: "Rs. 55,000",
    deluxePricePerHead: "Rs. 38,000",
    deluxeCouplePrice: "Rs. 95,000",
    summary:
      "Kumrat forest, Kala Chashma, waterfalls, Taki Top, Jahaz Banda, and Katora Lake with jeep transfers and adventurous nights in the valley.",
    heroImage: pkg("kumrat.png"),
    gallery: [pkg("kumrat.png")],
    attractions: [
      "Thal",
      "Kumrat",
      "Kumrat forest",
      "Kala Chashma",
      "Waterfall",
      "Kumrat river",
      "Taki Top",
      "Jahaz Banda",
      "Katora Lake",
    ],
    itinerary: [
      {
        day: "Day 00",
        title: "Departure",
        details:
          "Departure from Faisalabad, Lahore, Islamabad, Multan & Gujranwala.",
      },
      {
        day: "Day 1",
        title: "Thal · Jeep to Kumrat",
        details:
          "Breakfast at Temargara. Way to Thal, transfer to jeeps for Kumrat, sightseeing en route. Dinner & night stay at Kumrat.",
      },
      {
        day: "Day 2",
        title: "Kala Chashma · Forest · Jahaz Banda",
        details:
          "Breakfast at hotel. Kala Chashma & waterfall, Kumrat Forest, Taki Top, hiking to Jahaz Banda. Dinner & bonfire at Jahaz Banda.",
      },
      {
        day: "Day 3",
        title: "Katora Lake",
        details:
          "Breakfast at Jahaz Banda. Way to Katora Lake, mini Katora, explore and return to Jahaz Banda for night stay.",
      },
      {
        day: "Day 4",
        title: "Return",
        details:
          "Breakfast at Jahaz Banda, hiking to Taki Top, jeep to Thal, bus towards Lahore/Islamabad — end of services.",
      },
    ],
    included: [
      "Air-conditioned luxury transport",
      "Accommodation (4/5 sharing per tents)",
      "4 breakfasts & 3 dinners",
      "Professional tour guide",
      "Fuel, tolls & taxes",
    ],
    excluded: [
      "Hotel extras (hot/soft drinks, mineral water)",
      "Entry tickets",
      "Insurance & liability",
      "Any items not listed above",
      "Jeeps",
    ],
    departureInfo: "Multi-city departures — confirm timing on WhatsApp.",
    category: ["Kumrat", "Adventure", "Group", "Family"],
    whatsappMessage: tourBookingMessage("4 Days Trip to Kumrat"),
    mealInfo: [
      "Breakfast: egg, tea, paratha",
      "Dinner: chicken karahi, roti, salad",
      "Dinner 2: chicken BBQ, roti, salad, cold drink",
    ],
    bookingContact: "Call / WhatsApp: 0322 4294542",
    equipment: [
      "Day bag",
      "Raincoat",
      "Sun block & sunglasses",
      "Warm clothes",
      "Power bank",
      "CNIC for all participants",
    ],
    notes: ["Thank you — stay blessed & happy."],
  },
  {
    title: "5 Days Tour to Fairy Meadows (Nanga Parbat)",
    slug: "fairy-meadows-5-days",
    duration: "5 Days - 4 Nights",
    location: "Raikot · Fairy Meadows · Beyal · Base Camp · Chilas",
    pricePerHead: "Rs. 30,000",
    couplePrice: "Rs. 75,000",
    deluxePricePerHead: "Rs. 45,000",
    deluxeCouplePrice: "Rs. 105,000",
    summary:
      "Discounted Fairy Meadows & Nanga Parbat tour from Islamabad/Lahore with jeep safari, reflection lake, Beyal Camp, and base camp hiking.",
    heroImage: pkg("fairy.png"),
    gallery: [pkg("fairy.png")],
    attractions: [
      "Hazara Expressway",
      "Abbottabad & Hazara Tunnels",
      "Thakot · Besham · Dassu · Sumer Nala",
      "Diamer Basha Dam",
      "Raikot Bridge & jeep safari",
      "Fairy Meadows",
      "Reflection lake · Signal point · Fairy lake",
      "Beyal camp · Fairy Meadows forest",
      "Nanga Parbat view · Raikot Glacier · Base camp",
    ],
    itinerary: [
      {
        day: "Day 0",
        title: "Lahore pickup",
        details:
          "9:00pm — Thokar Niaz Baig near Daewoo stop.",
      },
      {
        day: "Day 1",
        title: "Towards Chilas",
        details:
          "2:00am — Rawalpindi Daewoo (26 no., near NUST EME). Travel via Hazara Expressway, Besham, Rainbow waterfall, Dassu, Sumer Nala, Diamer Basha dam site. Night in Chilas.",
      },
      {
        day: "Day 2",
        title: "Fairy Meadows",
        details:
          "Raikot jeep stop, Tattu village, ~3hr hike to Fairy Meadows. Reflection lake, signal point, fairy lake. Night in camps.",
      },
      {
        day: "Day 3",
        title: "Beyal & base camp",
        details:
          "Hike to Beyal camp, viewpoint, base camp visit, return to Fairy Meadows. BBQ & musical bonfire.",
      },
      {
        day: "Day 4",
        title: "Return to Chilas",
        details:
          "Explore around Fairy Meadows, hike back to jeep, Chilas night stay.",
      },
      {
        day: "Day 5",
        title: "Islamabad · Lahore",
        details:
          "Return to Islamabad (~7pm drop), continue to Lahore (~12am). Tour end.",
      },
    ],
    included: [
      "AC luxury transport",
      "Accommodation (4/5 sharing per room)",
      "5 breakfasts & 4 dinners",
      "Professional tour guide",
      "Fuel, tolls & taxes",
    ],
    excluded: [
      "Entry tickets",
      "Tea, mineral water, cold drinks",
      "Jeep charges",
      "Fort/boating/rafting/park tickets",
      "Personal insurance & extras",
    ],
    departureInfo: "Departure coming Friday — confirm latest slots on WhatsApp.",
    category: ["Fairy Meadows", "Trek", "Group", "Couple"],
    whatsappMessage: tourBookingMessage("5 Days Fairy Meadows Tour"),
    pickupPoints: [
      "Lahore: Daewoo Terminal, Thokar Niaz Baig",
      "Islamabad: No. 26 Daewoo, near NUST EME",
      "Faisalabad: Daewoo Terminal, near Allied Hospital",
    ],
    mealInfo: [
      "Breakfast: omelette, paratha, chanay, bread, tea",
      "Dinner: chicken karahi/BBQ, handi, biryani + raita (rotation)",
    ],
    childrenPolicy: [
      "Under 3 years — free (lap/folding seat if available)",
      "3–8 years — half charges",
      "8+ years — full charges",
    ],
    registration: ["Deposit Rs. 7,000", "Send proof — receive advance receipt."],
    equipment: [
      "Mask / sanitizer / gloves",
      "Casual or trekking shoes",
      "Cotton clothes, jacket/hoodie/raincoat",
      "Hat, sunglasses, umbrella · CNIC",
    ],
    terms: [
      "If unwell, do not join the tour.",
      "No drugs, weapons, or abusive behaviour — removal without refund.",
      "AC may cycle on mountain roads for vehicle safety.",
      "Itinerary may change for weather, politics, or safety.",
      "Cancellation: 48h or less — 100% of advance; >48h — 50%; 4+ days — no charge on advance (per operator policy).",
      "Environment-friendly travel — no littering.",
      "Trips are not insured; mountain risks are participant responsibility.",
    ],
    notes: [
      "Plan may adjust slightly for comfort or unforeseen circumstances.",
      "We travel like a family.",
    ],
    bookingContact: "0322 4294542",
  },
  {
    title: "3 Days Swat, Bahrain, Malam Jabba & Kalam",
    slug: "swat-bahrain-malam-kalam",
    duration: "3 Days - 2 Nights",
    location: "Swat · Malam Jabba · Bahrain · Kalam · Mahodand",
    pricePerHead: "Rs. 18,000",
    couplePrice: "Rs. 40,000",
    deluxePricePerHead: "Rs. 32,000",
    deluxeCouplePrice: "Rs. 75,000",
    summary:
      "Swat valley highlights: Malam Jabba, Kalam, Ushu Forest, Mahodand Lake, Bahrain bazaar, and Fizaghat — from Faisalabad, Lahore, Islamabad & Gujranwala.",
    heroImage: pkg("swat-bahrain.png"),
    gallery: [pkg("swat-bahrain.png"), pkg("swat.png")],
    attractions: [
      "Swat",
      "Malam Jabba",
      "Bahrain",
      "Kalam",
      "Ushu Forest",
      "Ushu View Point",
      "Mahodand Lake",
      "Swat River",
      "Fizaghat",
    ],
    itinerary: [
      {
        day: "Day 00",
        title: "Departure",
        details:
          "Departure from Faisalabad, Lahore, Islamabad, Multan & Gujranwala.",
      },
      {
        day: "Day 1",
        title: "Malam Jabba · Kalam",
        details:
          "Breakfast at Swat Inn Hotel. Malam Jabba exploration, travel to Kalam, check-in, dinner, bonfire, night stay.",
      },
      {
        day: "Day 2",
        title: "Ushu · Mahodand",
        details:
          "Breakfast at hotel. Ushu Forest & viewpoint, Mahodand Lake, return to Kalam, dinner & night stay.",
      },
      {
        day: "Day 3",
        title: "Bahrain · Return",
        details:
          "Breakfast, Bahrain bazaar, return to home cities — end of services.",
      },
    ],
    included: [
      "AC luxury transport (4C saloon coaster & Grand Cabin 2019–20)",
      "4-person room sharing",
      "3 breakfasts & 2 dinners",
      "Tour guide · fuel · tolls & taxes",
    ],
    excluded: [
      "Jeeps",
      "Hotel drinks & mineral water",
      "Tickets & insurance",
      "Anything not mentioned",
    ],
    departureInfo: "Fixed departures from major cities — book seats early.",
    category: ["Swat", "Family", "Group", "Couple"],
    whatsappMessage: tourBookingMessage("3 Days Swat Bahrain Malam Kalam"),
    mealInfo: [
      "Breakfast: egg, tea, paratha, chanay",
      "Dinner: chicken karahi + roti + cold drink + salad",
      "Dinner 2: BBQ + roti + salad + cold drink",
    ],
    bookingContact: "0322 4294542",
    equipment: [
      "Day bag, raincoat, sunblock, sunglasses",
      "Warm clothes, power bank, CNIC",
    ],
    notes: ["Thank you — stay blessed & happy."],
  },
  {
    title: "3 Days Naran Valley (Saif ul Malook · Lulusar · Babusar)",
    slug: "naran-valley-saif-malook",
    duration: "3 Days - 2 Nights",
    location: "Naran · Babusar · Lulusar · Saif ul Malook",
    pricePerHead: "Rs. 18,000",
    couplePrice: "Rs. 40,000",
    deluxePricePerHead: "Rs. 32,000",
    deluxeCouplePrice: "Rs. 75,000",
    summary:
      "Kaghan/Naran classic route: Kiwai, Babusar Top, Pyala & Lulusar Lakes, Saif ul Malook, and riverside nights — couples & families welcome.",
    heroImage: pkg("naran.png"),
    gallery: [pkg("naran.png")],
    attractions: [
      "Babusar Top",
      "Lulusar Lake",
      "Saif ul Malook",
      "Besar · Naran · Kaghan",
      "Balakot · Kunhar · Kiwai Waterfall",
      "Batakundi",
    ],
    itinerary: [
      {
        day: "Day 00",
        title: "Departure",
        details:
          "Departure from Faisalabad, Lahore, Islamabad, Multan & Gujranwala.",
      },
      {
        day: "Day 1",
        title: "Kiwai · Naran",
        details:
          "Breakfast at Balakot, Kiwai Waterfall, Naran check-in, dinner, bonfire, night stay.",
      },
      {
        day: "Day 2",
        title: "Babusar · Pyala · Lulusar",
        details:
          "Breakfast, Babusar Top, Pyala Lake, Lulusar Lake, back to Naran by 7pm, dinner & stay.",
      },
      {
        day: "Day 3",
        title: "Saif ul Malook · Return",
        details:
          "Breakfast, Saif ul Malook excursion, return journey — end of services.",
      },
    ],
    included: [
      "AC luxury transport (coaster & Grand Cabin 2019–20)",
      "5-person room sharing",
      "3 breakfasts & 2 dinners",
      "Tour guide · fuel · tolls & taxes",
    ],
    excluded: [
      "Hotel extras & mineral water",
      "Boating/tickets",
      "Insurance · personal items",
    ],
    departureInfo: "Families, females, bachelors & couples invited — Adventure Explorers style trip.",
    category: ["Naran", "Family", "Couple", "Weekend"],
    whatsappMessage: tourBookingMessage("3 Days Naran Valley"),
    mealInfo: [
      "Breakfast: egg, tea, paratha, chickpeas",
      "Dinner: BBQ + dal + roti + cold drink + salad (rotation with karahi)",
    ],
    bookingContact: "0322 4294542",
    equipment: [
      "Day bag, raincoat, sunblock, sunglasses",
      "Warm clothes, power bank, CNIC",
    ],
    notes: ["Thank you — stay blessed & happy."],
  },
  {
    title: "Azad Kashmir Taobat (By Road)",
    slug: "azad-kashmir-taobat",
    duration: "4 Days - 3 Nights",
    location: "Muzaffarabad · Keran · Sharda · Kel · Taobat · Arang Kel",
    pricePerHead: "Rs. 23,000",
    couplePrice: "Rs. 55,000",
    deluxePricePerHead: "Rs. 38,000",
    deluxeCouplePrice: "Rs. 95,000",
    summary:
      "Wednesday-night departure: Neelum gems from Muzaffarabad to Taobat with Sharda nights, Arang Kel hike, and bonfire evening.",
    heroImage: pkg("azad-kashmor-taobutt.png"),
    gallery: [pkg("azad-kashmor-taobutt.png")],
    attractions: [
      "Muzaffarabad",
      "Dhani & Kutton waterfalls",
      "LOC · Kundal Shahi · Keran",
      "Upper Neelum · Sharda · Kel",
      "Taobat · Arang Kel",
    ],
    itinerary: [
      {
        day: "Day 00",
        title: "Wednesday — Lahore",
        details:
          "10:00pm departure via GT Road/Motorway, short stays en route.",
      },
      {
        day: "Day 1",
        title: "Muzaffarabad · Sharda",
        details:
          "Mian G Restaurant stop, Muzaffarabad breakfast, Dhani & Kutton waterfalls, Keran lunch, dinner & night in Sharda.",
      },
      {
        day: "Day 2",
        title: "Taobat (4x4 self expense)",
        details:
          "Breakfast, Taobat journey via Margalla Waterfall, Kel, Halmat — night at Taobat.",
      },
      {
        day: "Day 3",
        title: "Arang Kel",
        details:
          "Breakfast, Kel jeep, ~40min hike to Arang Kel, sightseeing, back to Sharda/Keran for dinner & stay.",
      },
      {
        day: "Day 4",
        title: "Return to Lahore",
        details:
          "7:30am breakfast, departure for Lahore, optional Dhani stop, Islamabad dinner, midnight ETA (±2–3h buffer).",
      },
    ],
    included: [
      "Saloon coaster / Grand Cabin",
      "Fuel, chhalan, toll & taxes",
      "3 nights hotel · 4 breakfasts & 3 dinners",
      "Tour leader · BBQ & bonfire night",
    ],
    excluded: [
      "Entry tickets · tea/water/soft drinks",
      "Jeep/4x4 personal legs",
      "Heating/AC surcharges in rooms",
      "Insurance & adventure tickets",
    ],
    departureInfo: "Every Wednesday · Karachi/Multan guests can join from Lahore/Islamabad.",
    category: ["Kashmir", "Family", "Couple", "Group"],
    whatsappMessage: tourBookingMessage("Azad Kashmir Taobat"),
    pickupPoints: ["Lahore", "Islamabad", "Wazirabad", "Faisalabad"],
    mealInfo: [
      "Breakfast: omelette, paratha, tea, channy, aloo bhujia",
      "Dinner: karahi/BBQ/handi/biryani + raita (rotation)",
    ],
  },
  {
    title: "8 Days Hunza, Skardu, Deosai & Khunjerab (Summer)",
    slug: "hunza-skardu-deosai-8-days",
    duration: "8 Days - 7 Nights",
    location: "Hunza · Skardu · Deosai · Khunjerab · Naltar",
    pricePerHead: "Rs. 40,000",
    couplePrice: "Rs. 90,000",
    deluxePricePerHead: "Rs. 65,000",
    deluxeCouplePrice: "Rs. 160,000",
    summary:
      "Discounted summer mega route: Karakoram Highway, Skardu lakes, Deosai, Hunza, Attabad, Khunjerab, Shangrila, Mantokha & Naltar — travel like a family.",
    heroImage: pkg("hunza-skardu.png"),
    gallery: [pkg("hunza-skardu.png")],
    attractions: [
      "Hazara Expressway & tunnels",
      "Chilas · Nanga Parbat viewpoints",
      "Skardu · Shangrila · Kachura lakes",
      "Mantokha · Shigar · Sarfaranga",
      "Deosai · Sadpara",
      "Hunza · Attabad · Hussaini",
      "Khunjerab Pass & China Border",
      "Naltar Valley",
    ],
    itinerary: [
      {
        day: "Day 0",
        title: "Lahore",
        details: "9:00pm — Thokar Niaz Baig near Daewoo.",
      },
      {
        day: "Day 1",
        title: "Chilas",
        details:
          "3:00am Islamabad pickup (26 no. Daewoo). Besham breakfast, Jijal, Dassu Dam, Sumer Nala — night Chilas.",
      },
      {
        day: "Day 2",
        title: "Skardu",
        details:
          "Skardu road, Nanga Parbat viewpoint, Shangrila & Upper Kachura — Skardu hotel.",
      },
      {
        day: "Day 3",
        title: "Mantokha · Shigar",
        details:
          "Mantokha waterfall, Shigar valley, cold desert, Shigar fort, Skardu stay.",
      },
      {
        day: "Day 4",
        title: "Deosai or Kharpocho",
        details:
          "Jeep to Deosai via Sadpara, explore plains OR Kharpocho fort & Nansoq village (season/choice based).",
      },
      {
        day: "Day 5",
        title: "Hunza",
        details:
          "Travel Hunza via Astak Nala, Gilgit, Nagar, forts/bazar — night Hunza.",
      },
      {
        day: "Day 6",
        title: "Khunjerab",
        details:
          "Attabad, Hussaini, Passu, Gircha lunch, Sost, Khunjerab — return Hunza.",
      },
      {
        day: "Day 7",
        title: "Naltar · Chilas",
        details:
          "Naltar jeep safari, return to Chilas for night.",
      },
      {
        day: "Day 8",
        title: "Homebound",
        details:
          "Early return via KKH — ~9pm Islamabad, ~2am Lahore.",
      },
    ],
    included: [
      "Saloon coaster / Grand Cabin (up model)",
      "Fuel, chhalan & tolls",
      "7 nights hotel (4–5 sharing / couple rooms)",
      "7 dinners & 8 breakfasts · BBQ · bonfire",
      "Driver & professional guide",
    ],
    excluded: [
      "Tickets · tea/mineral/cold drinks",
      "Jeep & personal vehicle legs",
      "Room heating/AC extras",
      "Insurance & activities not listed",
    ],
    departureInfo: "Friday night departure · Karachi guests can coordinate train/bus joins.",
    category: ["Hunza", "Skardu", "Family", "Group"],
    whatsappMessage: tourBookingMessage("8 Days Hunza Skardu Summer"),
    bookingContact: "0322 4294542",
    pickupPoints: [
      "Faisalabad: Daewoo near Allied Hospital",
      "Lahore: Daewoo Thokar Niaz Baig",
      "Islamabad: No. 26 Daewoo near NUST EME",
    ],
    mealInfo: [
      "Breakfast: omelette, paratha, tea",
      "Dinner: karahi/BBQ/handi/biryani + raita (rotation)",
    ],
    childrenPolicy: [
      "Under 4 free · 4–9 half · 8+ full (confirm with desk for your child)",
    ],
    registration: ["50% deposit", "Send proof & receive receipt."],
    equipment: [
      "Mask/sanitizer/gloves",
      "Trekking-friendly shoes",
      "Warm layers & rain shell",
      "CNIC mandatory",
    ],
    terms: [
      "Respectful, mask-friendly travel; no weapons or drugs.",
      "AC may cycle on climbs; 4–5 sharing may include mattresses.",
      "Route changes for weather, politics, or safety without liability.",
      "Operator may cancel with full advance refund only.",
      "Adventure risk disclaimer applies; environment must be respected.",
      "Cancellation/ refund rules as per operator — confirm latest policy on WhatsApp.",
    ],
    notes: [
      "If Babusar/Naran route closes, follow KKH alternates.",
      "Extra day extension available (~Rs. 3000 pp) if slots allow.",
    ],
  },
  {
    title: "5 Days Hunza · Naltar · China Border (Besham route)",
    slug: "hunza-naltar-china-border-5-days-besham",
    duration: "5 Days - 4 Nights",
    location: "Lahore · Islamabad · Besham · Chilas · Hunza · Khunjerab · China Border",
    pricePerHead: "Rs. 30,000",
    couplePrice: "Rs. 75,000",
    deluxePricePerHead: "Rs. 45,000",
    deluxeCouplePrice: "Rs. 105,000",
    summary:
      "Besham & KKH route: Chilas nights, Hunza with Naltar, Attabad, Hussaini, Passu, Khunjerab Pass & China Border, BBQ/bonfire night — families, couples & groups.",
    heroImage: pkg("hunza-besham.png"),
    gallery: [pkg("hunza-besham.png")],
    attractions: [
      "Besham",
      "Hazara Expressway",
      "River Indus",
      "Hazara Motorway tunnels",
      "Chilas",
      "Junction point (mountain ranges)",
      "Nanga Parbat viewpoint",
      "Plate junction",
      "Naltar Valley",
      "Old Silk Route",
      "Gilgit",
      "Rakaposhi viewpoint",
      "Baltit Fort",
      "Karimabad Bazaar",
      "Attabad Lake",
      "Hussaini suspension / Rainbow Bridge",
      "Passu Bridge",
      "Passu Cones",
      "Attabad Tunnels",
      "Karakoram Highway",
      "Diran Peak view",
      "Altit Royal Garden",
      "Khunjerab Pass",
      "Khunjerab National Park",
      "China border",
    ],
    itinerary: [
      {
        day: "Day 00",
        title: "Lahore — night departure",
        details:
          "9:00pm pick-up Thokar Niaz Baig near Daewoo, Lahore; travel towards Islamabad.",
      },
      {
        day: "Day 1",
        title: "Besham · Chilas",
        details:
          "2:00am Rawalpindi pick-up at No. 26 Daewoo bus stop near NUST EME. Travel towards Gilgit via Hazara Expressway. Breakfast at Besham; reach Chilas — dinner & night stay at Chilas.",
      },
      {
        day: "Day 2",
        title: "Hunza",
        details:
          "8:00am breakfast at Chilas. Travel towards Hunza via Nanga Parbat viewpoint, mountain junction, Rakaposhi viewpoint, Naltar Valley, Baltit Fort, Karimabad Bazaar — night stay in Hunza.",
      },
      {
        day: "Day 3",
        title: "Attabad · Khunjerab · China border",
        details:
          "Breakfast. Attabad Tunnels & Attabad Lake; Hussaini suspension / Rainbow Bridge; Passu Glacier & Passu Cones; Khunjerab National Park & snow. Return to Hunza — BBQ / bonfire musical night.",
      },
      {
        day: "Day 4",
        title: "Chilas / Besham",
        details:
          "8:00am breakfast. Depart for Chilas / Besham; bazar visit — dinner & night stay at Chilas / Besham.",
      },
      {
        day: "Day 5",
        title: "Islamabad · Lahore",
        details:
          "Breakfast; return via KKH with sightseeing. Islamabad ~9:00pm, Lahore ~2:00am — tour ends.",
      },
    ],
    included: [
      "AC luxury transport (4C saloon coaster & Grand Cabin)",
      "Accommodation (4 persons sharing per room)",
      "5 breakfasts & 4 dinners",
      "Professional tour guide",
      "Fuel",
      "All tolls & taxes",
    ],
    excluded: [
      "Jeep charges",
      "Hotel extras (hot drinks, soft drinks, mineral water)",
      "Entry tickets · boating · fort/park tickets",
      "Heater surcharges in rooms (if needed)",
      "Road blockage / extra vehicle or expenses",
      "Insurance & liability",
      "Anything not listed above",
    ],
    departureInfo:
      "Families, female travelers, bachelors, groups & couples welcome. Route: outbound via Besham (not Babusar/Naran).",
    category: ["Hunza", "Khunjerab", "Naltar", "Family", "Group", "Couple"],
    whatsappMessage: tourBookingMessage("5 Days Hunza · Naltar · China Border (Besham route)"),
    bookingContact: "0318 4280414",
    packageDetail: [
      "Standard: Solo Rs. 30,000 · Couple Rs. 75,000",
      "Deluxe: Solo Rs. 45,000 · Couple Rs. 105,000",
      "Booking: Saif Ullah — confirm latest policy on WhatsApp",
    ],
    pickupPoints: [
      "Lahore: PSO pump near Daewoo Terminal, Thokar Niaz Baig",
      "Islamabad/Rawalpindi: No. 26 New Daewoo Terminal near NUST EME",
      "Gujranwala / Sialkot: on the way towards Islamabad (coordinate)",
    ],
    mealInfo: ["5 breakfasts · 4 dinners (rotation menu)"],
    equipment: [
      "Day bag, raincoat, sun block, sunglasses, warm clothes, power bank",
      "Joggers, slippers, jackets",
      "Original CNIC for all participants",
    ],
    terms: [
      "Drugs or intoxication on the bus or during the trip leads to immediate removal without refund.",
      "Organizer may cancel the trip; registered participants receive full refund in that case.",
      "Natural events, politics, or security — extra costs borne by the participant.",
      "Itinerary may change; group leader/guide will choose the best alternative.",
      "No smoking in transport. Valid CNIC or passport required.",
      "Punctuality required. Non-slip shoes only (no heels or dress shoes).",
      "AC on steep ascents may run intermittently to protect the vehicle.",
      "Per-head price may adjust if fuel prices change, including on booked tours.",
      "Operator not liable for injury, damage, or loss.",
    ],
    notes: [
      "Office: Attock Petroleum Chowk Chuburji, Lahore (opposite Suriya Azeem Hospital).",
      "Adventure Explorers — Hunza, Naltar & China border (Besham route).",
      "Thank you for choosing Travel With Moiz.",
    ],
  },
  {
    title: "5 Days Hunza · Naltar · China Border (Naran route)",
    slug: "hunza-naltar-china-border-5-days-naran",
    duration: "5 Days - 4 Nights",
    location: "Lahore · Islamabad · Naran · Babusar · Hunza · Khunjerab · China Border",
    pricePerHead: "Rs. 30,000",
    couplePrice: "Rs. 75,000",
    deluxePricePerHead: "Rs. 45,000",
    deluxeCouplePrice: "Rs. 105,000",
    summary:
      "Naran & Babusar route: Balakot breakfast, Chilas, Hunza with Naltar, Khunjerab & China border; return via Naran, Kiwai waterfall — same highlights, different road.",
    heroImage: pkg("hunza-naran.png"),
    gallery: [pkg("hunza-naran.png")],
    attractions: [
      "Hazara Expressway",
      "Balakot",
      "Naran",
      "Kiwai",
      "Lulusar Lake",
      "Katakpundi",
      "Babusar Top",
      "River Indus",
      "Hazara Motorway tunnels",
      "Chilas",
      "Junction point (mountain ranges)",
      "Nanga Parbat viewpoint",
      "Plate junction",
      "Naltar Valley",
      "Old Silk Route",
      "Gilgit",
      "Rakaposhi viewpoint",
      "Baltit Fort",
      "Karimabad Bazaar",
      "Attabad Lake",
      "Hussaini Bridge",
      "Passu Bridge",
      "Passu Cones",
      "Attabad Tunnels",
      "Karakoram Highway",
      "Khunjerab Pass",
      "Khunjerab National Park",
      "China border",
    ],
    itinerary: [
      {
        day: "Day 00",
        title: "Lahore — night departure",
        details:
          "9:00pm pick-up Thokar Niaz Baig near Daewoo, Lahore; travel towards Islamabad.",
      },
      {
        day: "Day 1",
        title: "Balakot · Chilas",
        details:
          "2:00am Rawalpindi pick-up at No. 26 Daewoo near NUST EME. Travel via Hazara Expressway. Breakfast at Balakot; reach Chilas — dinner & night stay at Chilas.",
      },
      {
        day: "Day 2",
        title: "Hunza",
        details:
          "8:00am breakfast at Chilas. Travel towards Hunza via Nanga Parbat viewpoint, mountain junction, Rakaposhi viewpoint, Naltar Valley, Baltit Fort, Karimabad Bazaar — night stay in Hunza.",
      },
      {
        day: "Day 3",
        title: "Attabad · Khunjerab · China border",
        details:
          "Breakfast. Attabad Tunnels & Attabad Lake; Hussaini / Rainbow Bridge; Passu Glacier & Passu Cones; Khunjerab National Park & snow. Return to Hunza — BBQ / bonfire musical night.",
      },
      {
        day: "Day 4",
        title: "Naran",
        details:
          "8:00am breakfast. Depart for Naran; bazar visit — dinner & night stay at Naran.",
      },
      {
        day: "Day 5",
        title: "Kiwai · Islamabad · Lahore",
        details:
          "Breakfast; Kiwai Waterfall; travel back to Islamabad / Lahore — tour ends.",
      },
    ],
    included: [
      "AC luxury transport (4C saloon coaster & Grand Cabin)",
      "Accommodation (4 persons sharing per room)",
      "5 breakfasts & 4 dinners",
      "Professional tour guide",
      "Fuel",
      "All tolls & taxes",
    ],
    excluded: [
      "Entry tickets",
      "Tea, mineral water & cold drinks",
      "Heater charges in rooms (if needed)",
      "Fort, boating & park tickets",
      "Jeep charges",
      "Acts of nature / politics — extra expenses",
      "Personal insurance",
      "Road blockage / extra vehicle use",
      "Anything not listed above",
    ],
    departureInfo:
      "Families, female travelers, bachelors, groups & couples welcome. Route: Babusar / Naran corridor on return leg (subject to road weather).",
    category: ["Hunza", "Khunjerab", "Naltar", "Family", "Group", "Couple"],
    whatsappMessage: tourBookingMessage("5 Days Hunza · Naltar · China Border (Naran route)"),
    bookingContact: "0318 4280414",
    packageDetail: [
      "Standard: Solo Rs. 30,000 · Couple Rs. 75,000",
      "Deluxe: Solo Rs. 45,000 · Couple Rs. 105,000",
      "Booking: Saif Ullah — confirm latest policy on WhatsApp",
    ],
    pickupPoints: [
      "Lahore: PSO pump near Daewoo Terminal, Thokar Niaz Baig",
      "Islamabad/Rawalpindi: No. 26 New Daewoo Terminal near NUST EME",
      "Gujranwala / Sialkot: on the way towards Islamabad (coordinate)",
    ],
    mealInfo: ["5 breakfasts · 4 dinners (rotation menu)"],
    equipment: [
      "Day bag, raincoat, sun block, sunglasses, warm clothes, power bank",
      "Joggers, slippers, jackets",
      "Original CNIC for all participants",
    ],
    terms: [
      "Drugs or intoxication on the bus or during the trip leads to immediate removal without refund.",
      "Organizer may cancel the trip; registered participants receive full refund in that case.",
      "Natural events, politics, or security — extra costs borne by the participant.",
      "Itinerary may change; group leader/guide will choose the best alternative.",
      "No smoking in transport. Valid CNIC or passport required.",
      "Punctuality required. Non-slip shoes only (no heels or dress shoes).",
      "AC on steep ascents may run intermittently to protect the vehicle.",
      "Per-head price may adjust if fuel prices change, including on booked tours.",
      "Operator not liable for injury, damage, or loss.",
    ],
    notes: [
      "Office: Attock Petroleum Chowk Chuburji, Lahore (opposite Suriya Azeem Hospital).",
      "Adventure Explorers — Hunza, Naltar & China border (Naran route).",
      "Thank you for choosing Travel With Moiz.",
    ],
  },
  {
    title: "3 Days Kashmir · Neelum Valley · Sharda · Arang Kel",
    slug: "kashmir-neelum-sharda-arang-kel-3-days",
    duration: "3 Days - 2 Nights",
    location: "Neelum Valley · Keran · Sharda · Arang Kel",
    pricePerHead: "Rs. 18,000",
    couplePrice: "Rs. 40,000",
    deluxePricePerHead: "Rs. 38,000",
    deluxeCouplePrice: "Rs. 95,000",
    summary:
      "Thursday-night departure from Faisalabad, Lahore, Islamabad, Multan & Gujranwala: Dhani & Kutton waterfalls, LOC, Keran, Sharda & Arang Kel with bonfire night.",
    heroImage: pkg("kashmir-3-days.png"),
    gallery: [pkg("kashmir-3-days.png")],
    attractions: [
      "Neelum Valley",
      "Dhani Waterfall",
      "Kutton Waterfall",
      "LOC",
      "Upper Neelum",
      "Keran",
      "Sharda",
      "Sharda Bridge",
      "Arang Kel",
    ],
    itinerary: [
      {
        day: "Day 00",
        title: "Departure",
        details:
          "Night departure from Faisalabad, Lahore, Islamabad, Multan & Gujranwala.",
      },
      {
        day: "Day 1",
        title: "Waterfalls · LOC · Keran",
        details:
          "Breakfast at Muzaffarabad. Dhani Waterfall & surroundings, Kutton Waterfall, LOC. Travel to Keran; hotel check-in, dinner & night stay.",
      },
      {
        day: "Day 2",
        title: "Arang Kel",
        details:
          "Breakfast at hotel. Day trip to Arang Kel & surroundings; evening back toward Sharda, return to Keran by ~9pm; dinner, bonfire & night stay.",
      },
      {
        day: "Day 3",
        title: "Upper Neelum · return",
        details:
          "Breakfast; departure for Lahore route; Upper Neelum & Kohala sightseeing; return to Faisalabad, Lahore, Islamabad, Multan & Gujranwala — end of services.",
      },
    ],
    included: [
      "AC luxury transport (4C saloon coaster & Grand Cabin, 2021–2022 models)",
      "Accommodation (4–5 persons sharing per room)",
      "Meals: 3 breakfasts & 2 dinners",
      "Professional tour guide",
      "Fuel",
      "All tolls & taxes",
    ],
    excluded: [
      "Hotel extras (hot & soft drinks, mineral water)",
      "Entry tickets",
      "Insurance & liability",
      "Jeep charges",
      "Any item not listed above",
    ],
    departureInfo:
      "Every Thursday night · pick-ups Faisalabad, Lahore, Islamabad, Multan & Gujranwala.",
    category: ["Kashmir", "Neelum", "Family", "Couple", "Group"],
    whatsappMessage: tourBookingMessage("3 Days Kashmir Neelum Sharda Arang Kel"),
    bookingContact: "0322 4294542",
    pickupPoints: [
      "Faisalabad",
      "Lahore",
      "Islamabad",
      "Multan",
      "Gujranwala",
    ],
    mealInfo: [
      "Breakfast: egg, tea, paratha, channay",
      "Dinner: chicken BBQ / karahi, dal, roti, cold drink, salad (rotation)",
    ],
    equipment: [
      "Day bag, raincoat, sun block, sunglasses, warm clothes, power bank",
      "Original CNIC for all participants",
    ],
    notes: ["Stay blessed & happy — Travel With Moiz."],
  },
  {
    title: "6 Days Skardu · Manthoka · Deosai · Basho Valley",
    slug: "skardu-manthoka-deosai-basho-6-days",
    duration: "6 Days - 5 Nights",
    location: "Skardu · Shangrila · Kachura · Manthoka · Basho · Deosai",
    pricePerHead: "Rs. 36,000",
    couplePrice: "Rs. 80,000",
    deluxePricePerHead: "Rs. 55,000",
    deluxeCouplePrice: "Rs. 130,000",
    summary:
      "Lahore/Islamabad/Karachi joins: Babusar & KKH to Skardu, Shangrila & Kachura lakes, Manthoka, Shigar desert & fort, Basho & Deosai/Sheosar (jeep not included), return via Chilas.",
    heroImage: pkg("skardu-6-days.png"),
    gallery: [pkg("skardu-6-days.png")],
    attractions: [
      "Hazara Expressway",
      "Babusar Top",
      "Naran",
      "Nanga Parbat viewpoint",
      "Three mountain junction",
      "Shangrila Resort",
      "Upper Kachura Lake",
      "Lower Kachura Lake",
      "Shigar cold desert",
      "Shigar Fort",
      "Manthoka Waterfall",
      "Basho Valley",
      "Sadpara Lake",
      "Deosai Plains",
      "Sheosar Lake",
      "Kala Pani · Bada Pani",
      "Skardu Bazaar",
    ],
    itinerary: [
      {
        day: "Day 00",
        title: "Night departure",
        details: "10:00pm departure from Lahore / Islamabad.",
      },
      {
        day: "Day 1",
        title: "Naran · Chilas",
        details:
          "4:00am Karachi & Islamabad pick-ups. Breakfast in Naran ~9:00am; Babusar Top sightseeing. Arrival Chilas ~7:00pm; dinner & overnight at Chilas.",
      },
      {
        day: "Day 2",
        title: "Skardu · Kachura",
        details:
          "8:00am depart for Skardu; Nanga Parbat viewpoint, three mountain junction, Skardu road. Upper & Lower Kachura lakes & Shangrila Resort. Dinner & overnight in Skardu.",
      },
      {
        day: "Day 3",
        title: "Manthoka · Shigar",
        details:
          "8:00am breakfast. Manthoka Waterfall; Shigar Valley, Sarfranga cold desert, Shigar Fort. Return to Skardu; dinner & overnight.",
      },
      {
        day: "Day 4",
        title: "Basho · Deosai · Sheosar",
        details:
          "8:00am breakfast. Basho Valley / Sadpara Lake, Deosai, Sheosar Lake (jeep charges not included). Return Skardu; bonfire night; dinner & overnight.",
      },
      {
        day: "Day 5",
        title: "Chilas",
        details:
          "8:00am breakfast. 9:00am towards Chilas; optional Shangrila if missed earlier. Arrival Chilas ~7:00pm; dinner & overnight.",
      },
      {
        day: "Day 6",
        title: "Islamabad · Lahore",
        details:
          "5:00am departure for Islamabad; breakfast ~10:00am at Naran; Babusar Top. Islamabad ~5:00pm; Lahore late night (~11:30pm ±2–3h). End of services.",
      },
    ],
    included: [
      "AC luxury transport (4C saloon coaster & Grand Cabin)",
      "Accommodation (4 persons sharing per room)",
      "Meals: 6 breakfasts & 5 dinners",
      "Professional tour guide",
      "Fuel",
      "All tolls & taxes",
    ],
    excluded: [
      "Jeep charges",
      "Hotel extras (hot drinks, soft drinks, mineral water)",
      "Entry tickets",
      "Insurance & liability",
      "Any item not listed above",
    ],
    departureInfo:
      "10:00pm departure from Lahore/Islamabad; Karachi guests coordinated at 4:00am Islamabad pick-up. Families · couples · groups welcome.",
    category: ["Skardu", "Deosai", "Family", "Group"],
    whatsappMessage: tourBookingMessage("6 Days Skardu Manthoka Deosai Basho"),
    bookingContact: "0322 4294542",
    mealInfo: ["6 breakfasts · 5 dinners (rotation menu)"],
    equipment: [
      "Day bag, raincoat, sun block, sunglasses, warm clothes, power bank",
      "Joggers, slippers, jackets",
      "Original CNIC for all participants",
    ],
    terms: [
      "Drugs or intoxication on the bus or during the trip leads to immediate removal without refund.",
      "Organizer may cancel the trip; in that case registered participants receive full refund.",
      "Unforeseen costs from natural events, politics, or security issues are borne by the participant.",
      "Itinerary may change for weather, transport, or local conditions; leaders will choose the best alternative.",
      "No smoking in transport. Valid CNIC or passport required.",
      "Punctuality required. Use non-slip shoes (no heels/dress shoes).",
      "AC on mountain ascents may run intermittently to protect the vehicle.",
      "Per-head price may adjust slightly if fuel prices change, including on already booked tours.",
      "Operator not liable for injury, damage, or loss.",
    ],
    notes: ["Thank you for choosing Travel With Moiz."],
  },
];

/** Shortest trips first (2-day, then 3-day, …); same length sorted A→Z by title. */
export const packageTours: Tour[] = [...packageToursData].sort((a, b) => {
  const byDays = durationDayOrder(a.duration) - durationDayOrder(b.duration);
  return byDays !== 0 ? byDays : a.title.localeCompare(b.title);
});
