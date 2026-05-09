import type { Tour } from "./tour-types";
import { tourBookingMessage } from "@/lib/whatsapp";

const pkg = (filename: string) => `/images/packages/${filename}`;

export const packageTours: Tour[] = [
  {
    title: "02 Days Shogran, Siri Paye & Khanpur",
    slug: "shogran-siri-paye-khanpur",
    duration: "2 Days · 1 Night",
    location: "Shogran · Siri Paye · Kiwai · Balakot · Khanpur Dam",
    pricePerHead: "Rs. 11,000",
    couplePrice: "Rs. 25,000",
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
      "Solo Rs. 11,000/- · Couple Rs. 25,000/-",
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
    duration: "4 Days",
    location: "Thal · Kumrat · Kala Chashma · Jahaz Banda · Katora Lake",
    pricePerHead: "Rs. 22,000",
    couplePrice: "Rs. 55,000",
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
    duration: "5 Days",
    location: "Raikot · Fairy Meadows · Beyal · Base Camp · Chilas",
    pricePerHead: "Rs. 23,000",
    couplePrice: "Rs. 47,999",
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
    duration: "3 Days",
    location: "Swat · Malam Jabba · Bahrain · Kalam · Mahodand",
    pricePerHead: "Rs. 18,000",
    couplePrice: "Rs. 40,000",
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
    duration: "3 Days",
    location: "Naran · Babusar · Lulusar · Saif ul Malook",
    pricePerHead: "Rs. 18,000",
    couplePrice: "Rs. 40,000",
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
    title: "3 Days Kumrat (Couples · Separate Rooms)",
    slug: "kumrat-3-days-couples",
    duration: "3 Days · 2 Nights",
    location: "Chakdara · Timergara · Thal · Kumrat Forest",
    pricePerHead: "Rs. 18,000",
    couplePrice: "Rs. 40,000",
    summary:
      "Adventure Hunters Kumrat getaway with forest BBQ, Kala Chashma, waterfalls, bonfire & musical nights — 4/5 sharing with couple room options.",
    heroImage: pkg("kumrat.png"),
    gallery: [pkg("kumrat.png")],
    attractions: [
      "Chakdara",
      "Timergara",
      "Kumrat forest",
      "Kala Chashma",
      "Thal",
      "Two waterfalls",
      "Historic masjid",
      "Valley viewpoints",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Thal · Kumrat Forest",
        details:
          "Islamabad 2:00am (Motorway Chowk / Daewoo near NUST) · Lahore 8pm Thursday. Timergara breakfast, Thal, jeep to Kumrat forest, BBQ, night at Kumrat.",
      },
      {
        day: "Day 2",
        title: "Waterfalls · Kala Chashma",
        details:
          "Breakfast 7:00am, two waterfalls & Kala Chashma + river, return ~5pm, bonfire & music, dinner & stay.",
      },
      {
        day: "Day 3",
        title: "Return",
        details:
          "Breakfast 6:00am at Kumrat Banda, departure from Thal to Islamabad & Lahore.",
      },
    ],
    included: [
      "AC coaster/Hiace transport",
      "3 breakfasts + 2 dinners (egg/chai paratha; chicken dishes)",
      "2 nights camping/rooms",
      "Bonfire + BBQ · photography · guide · first aid",
      "Tolls & taxes · jeep expenses",
      "Competition gifts & hospitality",
    ],
    excluded: [
      "Road block/Acts of nature extras",
      "Tickets/beverages",
      "Room upgrade (+3000) · porter charges",
      "Anything not listed",
    ],
    departureInfo: "Lahore Thursday 8pm · Islamabad 2:00am — confirm on call.",
    category: ["Kumrat", "Couple", "Family", "Group"],
    whatsappMessage: tourBookingMessage("3 Days Kumrat Couples"),
    registration: [
      "50% advance; cancellation policy applies (see terms on brochure).",
      "EasyPaisa 0322 4294542 — balance at starting point.",
    ],
    terms: [
      "Respectful conduct mandatory — drugs/expulsion with police handover & no refund.",
      "Kids: under 5 free, under 10 half (B-form required), 10+ full.",
      "Seats assigned by organizers; strict timings; no weapons.",
      "Trip subject to minimum slots (e.g. 20) — full refund if cancelled by operator.",
      "Mask, sanitiser & gloves mandatory.",
    ],
    notes: [
      "Visit office: Lahore Attock Petroleum Chuburji (opposite Suriya Azeem Hospital).",
      "Customised tours and groups — contact 0322 4294542.",
    ],
  },
  {
    title: "Azad Kashmir Taobat (By Road)",
    slug: "azad-kashmir-taobat",
    duration: "4 Days (Wed departure)",
    location: "Muzaffarabad · Keran · Sharda · Kel · Taobat · Arang Kel",
    pricePerHead: "Rs. 23,000",
    couplePrice: "Rs. 55,000",
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
    duration: "8 Days · 7 Nights",
    location: "Hunza · Skardu · Deosai · Khunjerab · Naltar",
    pricePerHead: "Rs. 40,000",
    couplePrice: "Rs. 90,000",
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
    title: "4 Days Jahaz Banda · Kumrat Valley (Wed night)",
    slug: "jahaz-banda-kumrat-4-days",
    duration: "4 Days · 3 Nights",
    location: "Dir · Thal · Kumrat · Jahaz Banda",
    pricePerHead: "Rs. 22,000",
    couplePrice: "Rs. 55,000",
    summary:
      "Wednesday-night Lahore departure: Kumrat jeep safari, Panjkora riverside, Jahaz Banda hike, optional Katora Lake trek, and bonfire night.",
    heroImage: pkg("jaazbanda-kumrat.png"),
    gallery: [pkg("jaazbanda-kumrat.png")],
    attractions: [
      "Kumrat Valley",
      "Panjkora riverside",
      "Jahaz Banda meadow",
      "Katora Lake (optional trek)",
      "Waterfalls & forest jeep safari",
    ],
    itinerary: [
      {
        day: "Day 00",
        title: "Lahore 10:30pm",
        details: "Departure from Lahore.",
      },
      {
        day: "Day 1",
        title: "Kumrat",
        details:
          "Mian Gee/Bhera stop, Islamabad pickups, breakfast Timergarah/Dir, jeep to Kumrat, Panjkora photography, camp/hotel, dinner & stay.",
      },
      {
        day: "Day 2",
        title: "Jahaz Banda",
        details:
          "Waterfall visit, forest jeep safari, Takki Banda hike to Jahaz Banda, camp/huts, dinner & overnight.",
      },
      {
        day: "Day 3",
        title: "Exploration / Katora",
        details:
          "Optional Kund Banda or Katora Lake hike (3–4hrs). Return to Jahaz Banda for dinner & stay.",
      },
      {
        day: "Day 4",
        title: "Return",
        details:
          "Trek/jeep to Thal, departure Islamabad & Lahore late night — end of services.",
      },
    ],
    included: [
      "AC Grand Cabin / coaster / Yutong",
      "Fuel, tolls & taxes",
      "3 nights camps/hotel",
      "4 breakfasts & 3 dinners (rotation chicken menu + cold drinks)",
      "BBQ + bonfire (once) · first aid · driver/guide",
    ],
    excluded: [
      "Hotel extras & heating",
      "Kumrat & Jahaz Banda jeep charges",
      "Boating/porters/tickets · insurance",
    ],
    departureInfo: "Females, families, couples & students welcome — family environment.",
    category: ["Kumrat", "Trek", "Family", "Group"],
    whatsappMessage: tourBookingMessage("4 Days Jahaz Banda Kumrat"),
    bookingContact: "0322 4294542",
    mealInfo: [
      "Breakfast: egg/chanay, paratha/bread & tea",
      "Dinner: one-dish chicken with raita/salad & cold drink (rotation)",
    ],
    registration: ["50% advance or full payment", "Balance at departure."],
    notes: [
      "Plan may change slightly for comfort or unforeseen circumstances.",
    ],
  },
];
