import Image from "next/image";
import Link from "next/link";
import { editorialPosts, products } from "@/lib/content";
import { archiveSlides } from "@/lib/archive-media";
import { getLocale, localizedPost, localizedProduct, ui } from "@/lib/i18n";
import { ArchiveSlideshow } from "@/components/ArchiveSlideshow";
import { ParallaxMedia } from "@/components/ParallaxMedia";

export default async function Home() {
  const locale = await getLocale();
  const labels = ui[locale];
  const posts = editorialPosts.map((post) => localizedPost(post, locale));
  const pieces = products.map((product) => localizedProduct(product, locale));
  const heroText = locale === "vi"
    ? "Một thế giới được tuyển chọn của thời trang vintage, những món đồ xa xỉ, trang sức và câu chuyện — với cá tính riêng và sự trân trọng dành cho những gì đã đi qua."
    : "A considered world of vintage fashion, luxury pieces, jewellery and stories — curated with personality and a respect for what came before.";

  return (
    <>
      <section className="hero">
        <div className="hero-copy reveal">
          <p className="eyebrow">Cô Hai Vintage</p>
          <h1>{locale === "vi" ? <>Vintage có một câu chuyện.<br />Hãy mặc nó thật đẹp.</> : <>Vintage has a story.<br />Wear it well.</>}</h1>
          <p className="hero-text">{heroText}</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/shop">{labels.explore}</Link>
            <Link className="text-link" href="/about">{labels.meet}</Link>
          </div>
        </div>
        <div className="hero-image-wrap hero-parallax-wrap">
          <ArchiveSlideshow slides={archiveSlides} interval={7200} />
        </div>
      </section>

      <section className="intro section-narrow reveal">
        <p className="eyebrow">{labels.pointOfView}</p>
        <h2>{labels.luxury}</h2>
        <p>{labels.intro}</p>
      </section>

      <section className="editorial-section">
        <div className="section-heading section-narrow reveal">
          <div><p className="eyebrow">{labels.fromJournal}</p><h2>{labels.stories}</h2></div>
          <Link className="text-link" href="/journal">{labels.viewAll}</Link>
        </div>
        <div className="editorial-grid section-narrow">
          {posts.slice(0, 3).map((post, index) => (
            <article className={`editorial-card reveal reveal-delay-${index + 1}`} key={post.slug}>
              <Link href={`/journal/${post.slug}`} className="card-image">
                <ParallaxMedia src={post.image} alt={post.title} fill sizes="(max-width: 800px) 100vw, 33vw" strength={8} />
              </Link>
              <p className="card-category">{post.category}</p>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link className="text-link" href={`/journal/${post.slug}`}>{labels.read}</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="feature-split section-narrow reveal">
        <div className="feature-copy">
          <p className="eyebrow">{labels.selected}</p>
          <h2>{labels.pastLife}</h2>
          <p className="muted large-copy">{labels.collectionIntro}</p>
          <Link className="button" href="/shop">{labels.viewCollection}</Link>
        </div>
        <div className="mini-product-grid">
          {pieces.map((product, index) => (
            <Link className={`mini-product reveal reveal-delay-${index + 1}`} href={`/shop/${product.slug}`} key={product.slug}>
              <div className="mini-product-image">
                <Image src={product.image} alt={product.name} fill quality={100} sizes="(max-width: 800px) 33vw, 20vw" />
              </div>
              <span>{product.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="closing-banner reveal">
        <div className="closing-inner section-narrow">
          <p className="eyebrow">Cô Hai Vintage / Saigon</p>
          <h2>{locale === "vi" ? "Đồ đẹp xứng đáng có thêm một chương." : "Beautiful things deserve another chapter."}</h2>
          <Link className="text-link" href="/contact">{locale === "vi" ? "Bắt đầu một cuộc trò chuyện →" : "Start a conversation →"}</Link>
        </div>
      </section>
    </>
  );
}
