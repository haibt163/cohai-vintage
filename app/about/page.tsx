import { getLocale, ui } from "@/lib/i18n";
import { ArchiveSlideshow } from "@/components/ArchiveSlideshow";

const founderSlides = [
  { src: "/assets/original/2025/03/CO-HAI-VINTAGE.jpg", alt: "Cô Hai Vintage founder archive portrait" },
  { src: "/assets/original/2025/03/CO-HAI-VINTAGE-1.jpg", alt: "Cô Hai Vintage founder archive portrait, second view" },
  { src: "/assets/original/2025/03/CO-HAI-VINTAGE-2.jpg", alt: "Cô Hai Vintage founder archive portrait, third view" },
  { src: "/assets/original/2025/03/CO-HAI-VINTAGE-3.jpg", alt: "Cô Hai Vintage founder archive portrait, fourth view" },
];

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
          <ArchiveSlideshow slides={founderSlides} interval={7600} />
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
