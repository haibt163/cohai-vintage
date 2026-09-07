import Image from "next/image";
import Link from "next/link";
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
          <article className="journal-row" key={post.slug}>
            <Link href={`/portfolio/${post.slug}`} className="journal-image"><Image src={post.image} alt="" fill sizes="(max-width: 800px) 100vw, 42vw" /></Link>
            <div>
              <p className="eyebrow">{post.category}</p>
              <h2>{post.title}</h2>
              <p>{post.intro}</p>
              <Link className="text-link" href={`/portfolio/${post.slug}`}>Read the story →</Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
