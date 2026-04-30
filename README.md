# Travel With Moiz

A premium, cinematic Pakistan travel website for Hunza, Skardu, Kashmir, Deosai, Attabad Lake, Passu Cones, and custom northern-area tours.

The site is designed for fast browsing, strong visual impact, SEO-friendly tour pages, and one-click WhatsApp booking.

## Highlights

- Modern adventure-luxury design with deep navy, travel teal, cyan, gold, and glassmorphism.
- Animated 3D hero built with React Three Fiber and Drei.
- Responsive pages for Home, Tours, Tour Details, Gallery, About, and Contact.
- Reusable tour data in `lib/tours.ts`.
- WhatsApp deep links with pre-filled booking messages.
- SEO metadata for Pakistan, Hunza, Skardu, and Kashmir tour searches.
- Render-ready deployment config in `render.yaml`.

## Pages

- `/` - cinematic homepage with 3D hero, featured tours, gallery, reviews, FAQ, and CTA.
- `/tours` - all tour packages with category chips.
- `/tours/skardu-6-days` - Skardu 06 Days package.
- `/tours/hunza-5-days` - Hunza 05 Days package.
- `/tours/hunza-skardu-8-days` - Hunza + Skardu 08 Days package.
- `/tours/kashmir-3-days` - Kashmir Valley 03 Days package.
- `/gallery` - destination gallery.
- `/about` - brand story and trust points.
- `/contact` - WhatsApp, phone, Instagram, and service areas.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- React Three Fiber
- Drei
- Lucide React
- Next Image optimization

## Brand Details

- Brand: Travel With Moiz
- WhatsApp: `+92 318 4280414`
- Instagram: [`@travelwithmoiz__`](https://www.instagram.com/travelwithmoiz__/)

## Local Development

Use Node.js 22 for best compatibility with the current Next.js version.

```bash
nvm use 22.22.1
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run build
```

## Deploy To Render

Recommended deployment type: Render Web Service. This keeps Next.js image handling and future server features available.

Render settings:

- Runtime: `Node`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Node version: `22.22.1`

You can also use the included `render.yaml` as a Render Blueprint.

## Content Notes

The current gallery uses high-quality remote placeholder photography. For launch, replace those image URLs with original Travel With Moiz trip photos compressed as WebP/AVIF for stronger trust and faster loading.
