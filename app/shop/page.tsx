import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/content";
import { getLocale, localizedProduct, ui } from "@/lib/i18n";
import { ParallaxMedia } from "@/components/ParallaxMedia";

export default async function Shop() {
  const locale = await getLocale();
  const labels = ui[locale];
  const pieces = products.map((product) => localizedProduct(product, locale));
  const featured = pieces[0];

  return (
    <div className="page-shell">
      <section className="page-hero shop-hero">
        <p className="eyebrow">{labels.shop}</p>
        <h1>{labels.shopTitle}</h1>
        <p className="page-dek">{labels.shopDek}</p>
      </section>
      {featured && (
        <section className="shop-feature section-narrow reveal">
          <Link className="shop-feature-image" href={`/shop/${featured.slug}`}>
            <ParallaxMedia src={featured.image} alt={featured.name} fill priority sizes="(max-width: 800px) 100vw, 62vw" strength={12} />
            <span className="image-caption">01 / FEATURED PIECE</span>
          </Link>
          <div className="shop-feature-copy">
            <p className="eyebrow">{featured.category}</p>
            <h2>{featured.name}</h2>
            <p>{featured.description}</p>
            <Link className="button button-dark" href={`/shop/${featured.slug}`}>{labels.viewPiece}</Link>
          </div>
        </section>
      )}
      <section className="section-narrow product-grid">
        {pieces.map((product, index) => (
          <article className={`product-card reveal reveal-delay-${(index % 3) + 1}`} key={product.slug}>
            <Link href={`/shop/${product.slug}`} className="product-image"><ParallaxMedia src={product.image} alt={product.name} fill sizes="(max-width: 800px) 100vw, 33vw" strength={7} /></Link>
            <p className="card-category">{product.category}</p>
            <h2><Link href={`/shop/${product.slug}`}>{product.name}</Link></h2>
            <p>{product.description}</p>
            <Link className="text-link" href={`/shop/${product.slug}`}>{labels.viewPiece}</Link>
          </article>
        ))}
      </section>
      <section className="shop-note">
        <p className="eyebrow">{labels.noteTitle}</p>
        <p>{labels.note}</p>
      </section>
    </div>
  );
}
