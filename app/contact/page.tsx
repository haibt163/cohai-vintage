import type { Metadata } from "next";
import { getProduct } from "@/lib/content";
import { getLocale, localizedProduct, ui } from "@/lib/i18n";
import { contact } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const labels = ui[await getLocale()];
  return { title: labels.contact, description: labels.contactLead, alternates: { canonical: "/contact" } };
}

export default async function Contact({ searchParams }: { searchParams: Promise<{ piece?: string | string[] }> }) {
  const locale = await getLocale();
  const labels = ui[locale];
  const { piece } = await searchParams;
  // Only known product slugs are accepted; anything else is ignored.
  const product = typeof piece === "string" ? getProduct(piece) : undefined;
  const defaultMessage = product ? labels.contactPiece.replace("{piece}", localizedProduct(product, locale).name) : "";

  return (
    <div className="page-shell">
      <section className="page-hero reveal">
        <p className="eyebrow">{labels.contact}</p>
        <h1>{labels.contactTitle}</h1>
      </section>
      <section className="contact-grid section-narrow reveal">
        <div>
          <p className="lead">{labels.contactLead}</p>
          <p>Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
          <p>{labels.instagram} <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">@{contact.instagramHandle}</a></p>
          <div className="contact-note"><span>CHV / 01</span><span>SAIGON · VIETNAM</span></div>
        </div>
        <ContactForm locale={locale} email={contact.email} defaultMessage={defaultMessage} />
      </section>
    </div>
  );
}
