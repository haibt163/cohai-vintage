import Image from "next/image";
import { getLocale, ui } from "@/lib/i18n";
import { ParallaxMedia } from "@/components/ParallaxMedia";

export default async function About() {
  const locale = await getLocale();
  const labels = ui[locale];
  return (
    <div className="page-shell">
      <section className="page-hero reveal">
        <p className="eyebrow">{labels.about}</p>
        <h1>{labels.aboutTitle}</h1>
      </section>
      <section className="about-grid section-narrow reveal">
        <div className="portrait"><ParallaxMedia src="/assets/original/2025/03/CO-HAI-VINTAGE-1.jpg" alt="Cô Hai Vintage" fill priority sizes="(max-width: 800px) 100vw, 45vw" strength={12} /></div>
        <div className="prose">
          <p className="lead">{labels.aboutLead}</p>
          <p>{labels.about1}</p>
          <p>{labels.about2}</p>
          <p>{labels.about3}</p>
          <div className="prose-rule" />
          <p className="eyebrow">SAIGON / VIETNAM</p>
        </div>
      </section>
    </div>
  );
}
