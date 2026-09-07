import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">CÔ HAI VINTAGE</div>
          <p>Vintage fashion, objects, jewellery and stories with a sense of history.</p>
        </div>
        <div className="footer-links">
          <Link href="/about">About</Link>
          <Link href="/portfolio">Journal</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/shop">Shop</Link>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Cô Hai Vintage. All rights reserved.</div>
    </footer>
  );
}
