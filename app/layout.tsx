"use client";

import { Cormorant_Garamond, Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useCart } from "@/hooks/useCart";

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

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { itemCount, toggleCart } = useCart();

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <title>My Sups+ | Premium Skincare Supplements</title>
        <meta
          name="description"
          content="Clear skin starts inside ✨ Premium skincare supplements for men & women."
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-sans">
        <Navbar cartItemCount={itemCount} onCartClick={toggleCart} />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutContent>{children}</LayoutContent>;
}
