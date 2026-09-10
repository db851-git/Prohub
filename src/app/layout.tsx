import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/site-chrome";
import { getProducts } from "@/lib/data";
import { BRAND } from "@/lib/constants";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.short}`,
  },
  description:
    "Premium mobile accessories and electronic gadgets — charging cables, GaN chargers, power banks, audio and smart accessories. UK-based, 2-year warranty, 30-day returns.",
  keywords: [
    "mobile accessories",
    "charging cables",
    "power banks",
    "USB-C chargers",
    "ProHub Technologies",
  ],
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: "Premium tech accessories, everyday ready. UK-based support.",
    url: siteUrl,
    siteName: BRAND.name,
    locale: "en_GB",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getProducts();
  return (
    <html lang="en-GB" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans">
        <SiteChrome products={products}>{children}</SiteChrome>
        <SpeedInsights />
      </body>
    </html>
  );
}
