import Link from "next/link";
import { getProduct, products } from "@/lib/content";
import { getLocale, localizedProduct, ui } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { ParallaxMedia } from "@/components/ParallaxMedia";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const locale = await getLocale();
  const labels = ui[locale];
  const localized = localizedProduct(product, locale);
  return (
    <div className="product-detail page-shell">
      <div className="product-gallery">
        {localized.gallery.map((image, index) => <div className="product-gallery-image" key={image}><ParallaxMedia src={image} alt={`${localized.name} view ${index + 1}`} fill sizes="(max-width: 800px) 100vw, 55vw" priority={index === 0} strength={6} /><span className="gallery-number">0{index + 1}</span></div>)}
      </div>
      <div className="product-info reveal"><p className="eyebrow">{localized.category}</p><h1>{localized.name}</h1><p className="product-lead">{localized.description}</p><ul className="detail-list">{localized.details.map((detail) => <li key={detail}>{detail}</li>)}</ul><p className="muted">{labels.confirm}</p><Link className="button button-dark" href="/contact">{labels.enquire}</Link><Link className="text-link product-back" href="/shop">{labels.backCollection}</Link></div>
    </div>
  );
}
