import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { FloatingWhatsApp } from "@/components/WhatsAppButton";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://travel-with-moiz.onrender.com"),
  title: {
    default: "Travel With Moiz | Hunza, Skardu & Kashmir Tours",
    template: "%s | Travel With Moiz",
  },
  description:
    "Book premium Pakistan tours to Hunza, Skardu, Kashmir, Deosai, Passu Cones, Attabad Lake, and northern valleys with Travel With Moiz.",
  keywords: [
    "Pakistan tours",
    "Hunza tour",
    "Skardu tour",
    "Kashmir tour",
    "Travel With Moiz",
    "Pakistan travel agency",
  ],
  openGraph: {
    title: "Travel With Moiz",
    description: "Premium Pakistan tour packages with WhatsApp booking.",
    url: "https://travel-with-moiz.onrender.com",
    siteName: "Travel With Moiz",
    locale: "en_PK",
    type: "website",
  },
  icons: {
    icon: brand.logoSrc,
    apple: brand.logoSrc,
  },
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
