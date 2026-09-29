import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./motion.css";
import "./quality-motion.css";
import "./audit-fixes.css";
import "./a11y.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PointerAtmosphere } from "@/components/PointerAtmosphere";
import { RevealObserver } from "@/components/RevealObserver";
import { getLocale, ui } from "@/lib/i18n";
import { JsonLd } from "@/components/JsonLd";
import { contact, siteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const description = locale === "vi"
    ? "Thời trang vintage, những món đồ xa xỉ, trang sức và câu chuyện từ Cô Hai Vintage, Sài Gòn."
    : "Vintage fashion, luxury pieces, jewellery and stories from Cô Hai Vintage, Saigon.";
  return {
    metadataBase: new URL(siteUrl),
    title: { default: "Cô Hai Vintage", template: "%s — Cô Hai Vintage" },
    description,
    applicationName: "Cô Hai Vintage",
    keywords: ["Cô Hai Vintage", "vintage fashion", "Saigon vintage", "vintage handbags", "luxury vintage", "jewellery"],
    manifest: "/manifest.webmanifest",
    appleWebApp: { capable: true, title: "Cô Hai Vintage", statusBarStyle: "default" },
    openGraph: {
      title: "Cô Hai Vintage",
      description,
      type: "website",
      siteName: "Cô Hai Vintage",
      locale: locale === "vi" ? "vi_VN" : "en_US",
    },
    twitter: { card: "summary_large_image", title: "Cô Hai Vintage", description },
  };
}

export const viewport: Viewport = {
  themeColor: "#f3efe8",
  colorScheme: "light",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body>
        <a className="skip-link" href="#main">{ui[locale].skip}</a>
        <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: "Cô Hai Vintage", url: siteUrl, email: contact.email, sameAs: [contact.instagramUrl] }} />
        <PointerAtmosphere />
        <Header />
        <RevealObserver />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}