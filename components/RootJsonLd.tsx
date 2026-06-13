import { brand } from "@/lib/whatsapp";
import { serializeJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site";

export function RootJsonLd() {
  const siteUrl = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: brand.name,
    url: siteUrl,
    logo: `${siteUrl}${brand.logoSrc}`,
    image: `${siteUrl}/images/brand/background.jpg`,
    description:
      "Premium Pakistan tour packages — Hunza, Skardu, Kashmir, Deosai, and northern valleys with WhatsApp booking.",
    telephone: "+923224294542",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
    areaServed: {
      "@type": "Country",
      name: "Pakistan",
    },
    priceRange: "Rs",
    sameAs: [brand.instagramUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
