import type { Metadata } from "next";
import { getLocale, slideshowLabels, ui } from "@/lib/i18n";
import { getArchiveSlides } from "@/lib/archive-media";
import { ArchiveSlideshow } from "@/components/ArchiveSlideshow";

export async function generateMetadata(): Promise<Metadata> {
  const labels = ui[await getLocale()];
  return { title: labels.about, description: labels.aboutLead, alternates: { canonical: "/about" } };
}

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
        <div className="portrait founder-archive">
          <ArchiveSlideshow slides={getArchiveSlides(locale, "founder")} interval={7600} labels={slideshowLabels(locale)} />
        </div>
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