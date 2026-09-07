import Link from "next/link";
import { MagneticLink } from "@/components/MagneticLink";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">CÔ HAI VINTAGE</div>
          <p>Vintage fashion, objects, jewellery and stories with a sense of history.</p>
        </div>
        <div className="footer-links">
          <MagneticLink href="/about">About</MagneticLink>
          <MagneticLink href="/portfolio">Journal</MagneticLink>
          <MagneticLink href="/contact">Contact</MagneticLink>
          <MagneticLink href="/shop">Shop</MagneticLink>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Cô Hai Vintage. All rights reserved.</span>
        <span className="footer-mark">CHV / 01</span>
      </div>
    </footer>
  );
}
