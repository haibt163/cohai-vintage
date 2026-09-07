import Image from "next/image";
import Link from "next/link";
import { editorialPosts } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Cô Hai Vintage</p>
          <h1>Vintage has a story.<br />Wear it well.</h1>
          <p className="hero-text">
            A considered world of vintage fashion, luxury pieces, jewellery and editorial stories — curated with personality.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/shop">Explore the collection</Link>
            <Link className="text-link" href="/about">Meet Cô Hai →</Link>
          </div>
        </div>
        <div className="hero-image-wrap">
          <Image
            src="/assets/original/portfolio-115.jpg"
            alt="Editorial vintage-inspired composition"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
            className="hero-image"
          />
        </div>
      </section>

      <section className="intro section-narrow">
        <p className="eyebrow">The Cô Hai point of view</p>
        <h2>Luxury is not only about the label. It is about the story, the condition, the details and the feeling.</h2>
        <p>
          Cô Hai Vintage brings together a personal perspective on vintage fashion and luxury — from pre-owned handbags and jewellery to the culture, history and style behind the objects we keep.
        </p>
      </section>

      <section className="editorial-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">From the journal</p>
            <h2>Stories worth keeping.</h2>
          </div>
          <Link className="text-link" href="/portfolio">View all stories →</Link>
        </div>
        <div className="editorial-grid">
          {editorialPosts.map((post) => (
            <article className="editorial-card" key={post.title}>
              <div className="card-image">
                <Image src={post.image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" />
              </div>
              <p className="card-category">{post.category}</p>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link className="text-link" href={post.href}>Read story →</Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
