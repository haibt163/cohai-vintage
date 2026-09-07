import { getLocale, ui } from "@/lib/i18n";

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
        <form className="contact-form">
          <label>{labels.name}<input name="name" autoComplete="name" /></label>
          <label>{labels.email}<input name="email" type="email" autoComplete="email" /></label>
          <label>{labels.message}<textarea name="message" rows={6} /></label>
          <button className="button button-dark" type="button">{labels.send}</button>
        </form>
      </section>
    </div>
  );
}
