import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/content";

export default function Shop() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">Shop</p>
        <h1>Selected pieces<br />with a past life.</h1>
        <p className="page-dek">A curated starting collection of vintage Louis Vuitton pieces from the recovered Cô Hai archive.</p>
      </section>
      <section className="section-narrow product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.slug}>
            <Link href={`/shop/${product.slug}`} className="product-image"><Image src={product.image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" /></Link>
            <p className="card-category">{product.category}</p>
            <h2><Link href={`/shop/${product.slug}`}>{product.name}</Link></h2>
            <p>{product.description}</p>
            <Link className="text-link" href={`/shop/${product.slug}`}>View piece →</Link>
          </article>
        ))}
      </section>
      <section className="shop-note">
        <p className="eyebrow">A note on vintage</p>
        <p>Availability, condition and pricing should be confirmed for each individual piece before publication. The current catalogue deliberately avoids inventing those details.</p>
      </section>
    </div>
  );
}
