import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "My Sups+ | Premium Skincare Supplements",
    template: "%s | My Sups+",
  },
  description:
    "Clear skin starts inside ✨ Premium skincare supplements for men & women. Marine collagen, glow-boosting gummies, and more.",
  keywords: [
    "skincare supplements",
    "marine collagen",
    "glow gummies",
    "skincare",
    "wellness",
    "beauty supplements",
  ],
  openGraph: {
    title: "My Sups+ | Premium Skincare Supplements",
    description: "Clear skin starts inside ✨ Premium skincare supplements.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "My Sups+",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
