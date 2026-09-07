import Link from "next/link";
import { getLocale } from "@/lib/i18n";

export default async function NotFound() {
  const locale = await getLocale();
  return (
    <div className="page-shell page-not-found">
      <section className="page-hero">
        <p className="eyebrow">404 / Cô Hai Vintage</p>
        <h1>{locale === "vi" ? "Trang này không còn ở đây." : "This page has moved."}</h1>
        <p className="page-dek">
          {locale === "vi" ? "Hãy quay về kho lưu trữ hoặc khám phá bộ sưu tập." : "Return to the archive or explore the collection."}
        </p>
        <div className="hero-actions">
          <Link className="button button-dark" href="/">{locale === "vi" ? "Về trang chủ" : "Back home"}</Link>
          <Link className="text-link" href="/journal">{locale === "vi" ? "Xem Journal" : "Open Journal"}</Link>
        </div>
      </section>
    </div>
  );
}
