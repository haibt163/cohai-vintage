import { navigation } from "@/lib/content";
import { getLocale, ui } from "@/lib/i18n";
import { MagneticLink } from "@/components/MagneticLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export async function Header() {
  const locale = await getLocale();
  const labels = ui[locale];

  return (
    <header className="site-header">
      <div className="header-inner">
        <MagneticLink className="brand" href="/" aria-label="Cô Hai Vintage home">
          <span className="brand-mark">CÔ HAI</span>
          <span className="brand-subtitle">VINTAGE</span>
        </MagneticLink>
        <div className="header-note" aria-hidden="true">{labels.saigon}</div>
        <details className="mobile-nav">
          <summary>{labels.menu}</summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => <MagneticLink key={item.href} href={item.href}>{labels[item.key as keyof typeof labels]}</MagneticLink>)}
            <LanguageSwitcher locale={locale} />
          </nav>
        </details>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => <MagneticLink key={item.href} href={item.href}>{labels[item.key as keyof typeof labels]}</MagneticLink>)}
          <LanguageSwitcher locale={locale} />
        </nav>
      </div>
    </header>
  );
}
