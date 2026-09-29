import type { Metadata } from "next";
import { getLocale, ui } from "@/lib/i18n";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const labels = ui[await getLocale()];
  return { title: labels.contact, description: labels.contactLead, alternates: { canonical: "/contact" } };
}

export default async function Contact() {
  const locale = await getLocale();
  const labels = ui[locale];
  return (
    <div className="page-shell">
      <section className="page-hero reveal">
        <p className="eyebrow">{labels.contact}</p>
        <h1>{labels.contactTitle}</h1>
      </section>
      <section className="contact-grid section-narrow reveal">
        <div>
          <p className="lead">{labels.contactLead}</p>
          <p>Email: <a href="mailto:cohaivintage@gmail.com">cohaivintage@gmail.com</a></p>
          <p>{labels.instagram} <span className="muted">@vintagebycohai</span></p>
          <div className="contact-note"><span>CHV / 01</span><span>SAIGON · VIETNAM</span></div>
        </div>
        <ContactForm locale={locale} />
      </section>
    </div>
  );
}
