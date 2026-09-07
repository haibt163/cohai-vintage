import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "Cô Hai Vintage", template: "%s — Cô Hai Vintage" },
  description: "Vintage fashion, luxury, jewellery, objects and stories from Cô Hai Vintage.",
  keywords: ["Cô Hai Vintage", "vintage fashion", "Saigon vintage", "vintage handbags", "luxury vintage"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
