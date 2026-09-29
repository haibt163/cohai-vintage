import Link from "next/link";
import { getLocale, ui } from "@/lib/i18n";

export default async function NotFound() {
  const locale = await getLocale();
  const labels = ui[locale];
  return (
    <div className="page-shell page-not-found">
      <section className="page-hero">
        <p className="eyebrow">404 / Cô Hai Vintage</p>
        <h1>{labels.notFoundTitle}</h1>
        <p className="page-dek">
          {labels.notFoundDek}
        </p>
        <div className="hero-actions">
          <Link className="button button-dark" href="/">{labels.backHome}</Link>
          <Link className="text-link" href="/journal">{labels.openJournal}</Link>
        </div>
      </section>
    </div>
  );
}
