import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { FloatingWhatsApp } from "@/components/WhatsAppButton";
import { RootJsonLd } from "@/components/RootJsonLd";
import { getSiteUrl } from "@/lib/site";
import { brand } from "@/lib/whatsapp";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Travel With Moiz | Hunza, Skardu & Kashmir Tours",
    template: "%s | Travel With Moiz",
  },
  description:
    "Book premium Pakistan tours to Hunza, Skardu, Kashmir, Deosai, Passu Cones, Attabad Lake, and northern valleys with Travel With Moiz.",
  applicationName: "Travel With Moiz",
  authors: [{ name: "Travel With Moiz", url: siteUrl }],
  creator: "Travel With Moiz",
  keywords: [
    "Pakistan tours",
    "Hunza tour package",
    "Skardu tour",
    "Kashmir tour Pakistan",
    "Fairy Meadows tour",
    "Naran Kaghan tour",
    "Deosai National Park tour",
    "Neelum Valley tour",
    "Travel With Moiz",
    "Pakistan travel group tours",
    "northern Pakistan tour operator",
    "WhatsApp tour booking Pakistan",
  ],
  openGraph: {
    title: "Travel With Moiz | Pakistan Tour Packages",
    description:
      "Premium Hunza, Skardu, and Kashmir packages — group departures, family-friendly itineraries, WhatsApp booking.",
    url: siteUrl,
    siteName: "Travel With Moiz",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: "/images/brand/hero-banner.png",
        width: 1200,
        height: 630,
        alt: "Pakistan mountains and lakes — Travel With Moiz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel With Moiz | Hunza, Skardu & Kashmir Tours",
    description:
      "Premium Pakistan tour packages with WhatsApp booking — Hunza, Skardu, Kashmir, and more.",
    images: ["/images/brand/hero-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: brand.logoSrc,
    apple: brand.logoSrc,
  },
  ...(googleVerification
    ? {
        verification: {
          google: googleVerification,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-950">
        <RootJsonLd />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <ChatbotWidget />
      </body>
    </html>
  );
}
