import type { Tour } from "@/lib/tour-types";
import { getSiteUrl } from "@/lib/site";

type Props = { tour: Tour; slug: string };

export function TourJsonLd({ tour, slug }: Props) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/tours/${slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.summary,
    url,
    image: `${siteUrl}${tour.heroImage}`,
    touristType: ["Adventure", "Sightseeing"],
    itinerary: {
      "@type": "ItemList",
      numberOfItems: tour.itinerary.length,
      itemListElement: tour.itinerary.map((day, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${day.day}: ${day.title}`,
        description: day.details,
      })),
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "PKR",
      description: `${tour.pricePerHead} · Couple ${tour.couplePrice}`,
      url,
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
