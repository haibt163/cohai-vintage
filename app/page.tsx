import Image from "next/image";
import Link from "next/link";
import { editorialPosts, products } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Cô Hai Vintage</p>
          <h1>Vintage has a story.<br />Wear it well.</h1>
          <p className="hero-text">A considered world of vintage fashion, luxury pieces, jewellery and stories — curated with personality and a respect for what came before.</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/shop">Explore the collection</Link>
            <Link className="text-link" href="/about">Meet Cô Hai →</Link>
          </div>
        </div>
        <div className="hero-image-wrap">
          <Image src="/assets/original/2025/03/CO-HAI-VINTAGE.jpg" alt="Cô Hai Vintage" fill priority sizes="(max-width: 900px) 100vw, 52vw" className="hero-image" />
        </div>
      </section>

      <section className="intro section-narrow">
        <p className="eyebrow">The Cô Hai point of view</p>
        <h2>Luxury is not only about the label. It is about the story, the condition, the details and the feeling.</h2>
        <p>Cô Hai Vintage brings together a personal perspective on vintage fashion and luxury — from pre-owned handbags and jewellery to the culture, history and style behind the objects we keep.</p>
      </section>

      <section className="editorial-section">
        <div className="section-heading">
          <div><p className="eyebrow">From the journal</p><h2>Stories worth keeping.</h2></div>
          <Link className="text-link" href="/portfolio">View all stories →</Link>
        </div>
        <div className="editorial-grid">
          {editorialPosts.slice(0, 3).map((post) => (
            <article className="editorial-card" key={post.slug}>
              <Link href={`/portfolio/${post.slug}`} className="card-image"><Image src={post.image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" /></Link>
              <p className="card-category">{post.category}</p>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link className="text-link" href={`/portfolio/${post.slug}`}>Read story →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="feature-split section-narrow">
        <div>
          <p className="eyebrow">Selected vintage</p>
          <h2>Pieces with a past life.</h2>
          <p className="muted large-copy">A small selection of recovered Louis Vuitton pieces. Each listing leads with the object itself, with condition and provenance added only as individual inventory is verified.</p>
          <Link className="button" href="/shop">View the collection</Link>
        </div>
        <div className="mini-product-grid">
          {products.map((product) => (
            <Link className="mini-product" href={`/shop/${product.slug}`} key={product.slug}>
              <div className="mini-product-image"><Image src={product.image} alt="" fill sizes="(max-width: 800px) 33vw, 20vw" /></div>
              <span>{product.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
