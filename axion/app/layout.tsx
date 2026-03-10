import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OrganizationSchema, WebSiteSchema, LocalBusinessSchema } from "@/components/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://axion.ahsan-aleem.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Axion Critical Power Solutions",
    template: "%s | Axion Critical Power Solutions",
  },
  description:
    "Reliable battery solutions for mission-critical power systems. VRLA and wet cell batteries backed by technical expertise and responsive support.",
  keywords: [
    "battery solutions",
    "critical power",
    "VRLA batteries",
    "wet cell batteries",
    "UPS batteries",
    "mission-critical power",
    "Axion",
  ],
  authors: [{ name: "Axion Critical Power Solutions" }],
  creator: "Axion Critical Power Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Axion Critical Power Solutions",
    title: "Axion Critical Power Solutions",
    description:
      "Reliable battery solutions for mission-critical power systems. VRLA and wet cell batteries backed by technical expertise.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Axion Critical Power Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Axion Critical Power Solutions",
    description:
      "Reliable battery solutions for mission-critical power systems.",
    images: [`${SITE_URL}/og-image.jpg`],
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
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <OrganizationSchema />
        <WebSiteSchema />
        <LocalBusinessSchema />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
