import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./motion.css";
import "./quality-motion.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PointerAtmosphere } from "@/components/PointerAtmosphere";
import { RevealObserver } from "@/components/RevealObserver";
import { getLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: { default: "Cô Hai Vintage", template: "%s — Cô Hai Vintage" },
  description: "Vintage fashion, luxury pieces, jewellery and stories from Cô Hai Vintage, Saigon.",
  applicationName: "Cô Hai Vintage",
  keywords: ["Cô Hai Vintage", "vintage fashion", "Saigon vintage", "vintage handbags", "luxury vintage", "jewellery"],
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Cô Hai Vintage",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "Cô Hai Vintage",
    description: "Vintage fashion, luxury pieces, jewellery and stories from Saigon.",
    type: "website",
    siteName: "Cô Hai Vintage",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cô Hai Vintage",
    description: "Vintage fashion, luxury pieces, jewellery and stories from Saigon.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3efe8",
  colorScheme: "light",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body>
        <PointerAtmosphere />
        <Header />
        <RevealObserver />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
