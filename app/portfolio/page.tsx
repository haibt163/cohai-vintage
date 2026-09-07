import Image from "next/image";
import { editorialPosts } from "@/lib/content";

export default function Portfolio() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <p className="eyebrow">Journal</p>
        <h1>Vintage, style<br />and the stories behind them.</h1>
      </section>
      <section className="journal-list section-narrow">
        {editorialPosts.map((post) => (
          <article className="journal-row" id={post.title.toLowerCase().replaceAll(" ", "-")} key={post.title}>
            <div className="journal-image"><Image src={post.image} alt="" fill sizes="(max-width: 800px) 100vw, 42vw" /></div>
            <div>
              <p className="eyebrow">{post.category}</p>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <p className="muted">The full original article archive will be migrated and edited in Phase 3.</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
