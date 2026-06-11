import { faqs } from "@/lib/tours";
import { getSiteUrl } from "@/lib/site";

export function HomepageJsonLd() {
  const siteUrl = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "WebSite",
        name: "Travel With Moiz",
        url: siteUrl,
        description:
          "Book Pakistan tours to Hunza, Skardu, Kashmir, and northern Pakistan. Group and custom packages with WhatsApp support.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
