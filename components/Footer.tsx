import { getLocale, ui } from "@/lib/i18n";
import { MagneticLink } from "@/components/MagneticLink";

export async function Footer() {
  const locale = await getLocale();
  const labels = ui[locale];
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">CÔ HAI VINTAGE</div>
          <p>{labels.footer}</p>
        </div>
        <div className="footer-links">
          <MagneticLink href="/about">{labels.about}</MagneticLink>
          <MagneticLink href="/portfolio">{labels.journal}</MagneticLink>
          <MagneticLink href="/contact">{labels.contact}</MagneticLink>
          <MagneticLink href="/shop">{labels.shop}</MagneticLink>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Cô Hai Vintage. {labels.rights}</span>
        <span className="footer-mark">CHV / 01</span>
      </div>
    </footer>
  );
}
