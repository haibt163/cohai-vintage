import Link from "next/link";
import { editorialPosts } from "@/lib/content";
import { getLocale, localizedPost, ui } from "@/lib/i18n";
import { ParallaxMedia } from "@/components/ParallaxMedia";

export default async function Portfolio() {
  const locale = await getLocale();
  const labels = ui[locale];
  const posts = editorialPosts.map((post) => localizedPost(post, locale));
  return (
    <div className="page-shell">
      <section className="page-hero editorial-hero">
        <p className="eyebrow">{labels.journal}</p>
        <h1>{labels.journalTitle}</h1>
        <p className="page-dek">{locale === "vi" ? "Một kho lưu trữ về đồ đẹp, văn hoá vintage và những ý tưởng giúp phong cách có chiều sâu hơn." : "An archive of beautiful objects, vintage culture and ideas that give personal style more depth."}</p>
      </section>
      <section className="journal-list section-narrow">
        {posts.map((post, index) => (
          <article className={`journal-row reveal reveal-delay-${(index % 3) + 1}`} key={post.slug}>
            <Link href={`/portfolio/${post.slug}`} className="journal-image"><ParallaxMedia src={post.image} alt={post.title} fill sizes="(max-width: 800px) 100vw, 42vw" strength={10} /><span className="journal-index">0{index + 1}</span></ParallaxMedia></Link>
            <div><p className="eyebrow">{post.category}</p><h2>{post.title}</h2><p>{post.intro}</p><Link className="text-link" href={`/portfolio/${post.slug}`}>{labels.read}</Link></div>
          </article>
        ))}
      </section>
    </div>
  );
}
