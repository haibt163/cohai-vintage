import Image from "next/image";
import Link from "next/link";
import { getProduct, products } from "@/lib/content";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="product-detail page-shell">
      <div className="product-gallery">
        {product.gallery.map((image, index) => (
          <div className="product-gallery-image" key={image}>
            <Image src={image} alt={`${product.name} view ${index + 1}`} fill sizes="(max-width: 800px) 100vw, 55vw" priority={index === 0} />
          </div>
        ))}
      </div>
      <div className="product-info">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="product-lead">{product.description}</p>
        <ul className="detail-list">{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
        <p className="muted">Individual condition, provenance, availability and pricing should be confirmed before purchase.</p>
        <Link className="button button-dark" href="/contact">Enquire about this piece</Link>
        <Link className="text-link product-back" href="/shop">← Back to collection</Link>
      </div>
    </div>
  );
}
