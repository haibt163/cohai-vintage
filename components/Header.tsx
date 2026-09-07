import { navigation } from "@/lib/content";
import { MagneticLink } from "@/components/MagneticLink";

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <MagneticLink className="brand" href="/" aria-label="Cô Hai Vintage home">
          <span className="brand-mark">CÔ HAI</span>
          <span className="brand-subtitle">VINTAGE</span>
        </MagneticLink>
        <div className="header-note" aria-hidden="true">SAIGON · VINTAGE · STORIES</div>
        <details className="mobile-nav">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <MagneticLink key={item.href} href={item.href}>{item.label}</MagneticLink>
            ))}
          </nav>
        </details>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <MagneticLink key={item.href} href={item.href}>{item.label}</MagneticLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
