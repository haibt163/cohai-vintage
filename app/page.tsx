import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { editorialPosts, products } from "@/lib/content";
import { getArchiveSlides } from "@/lib/archive-media";
import { getLocale, localizedPost, localizedProduct, slideshowLabels, ui } from "@/lib/i18n";
import { ArchiveSlideshow } from "@/components/ArchiveSlideshow";
import { ParallaxMedia } from "@/components/ParallaxMedia";
import { absoluteUrl, contact } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = locale === "vi"
    ? "Thời trang vintage, hàng xa xỉ và câu chuyện"
    : "Vintage Fashion, Luxury Pieces and Stories";
  const description = locale === "vi"
    ? "Khám phá Cô Hai Vintage tại Sài Gòn: thời trang vintage, món đồ xa xỉ đã qua sử dụng, trang sức và những câu chuyện về phong cách, nguồn gốc và giá trị của những món đồ được gìn giữ."
    : "Discover Cô Hai Vintage in Saigon: curated vintage fashion, pre-owned luxury pieces, jewellery and stories about style, provenance and the objects we keep.";
  const shareTitle = locale === "vi"
    ? "Cô Hai Vintage | Thời trang vintage và những câu chuyện"
    : "Cô Hai Vintage | Vintage Fashion and Stories";
  const image = absoluteUrl("/opengraph-image");

  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title: shareTitle,
      description,
      type: "website",
      url: absoluteUrl("/"),
      images: [{ url: image, width: 1200, height: 630, alt: "Cô Hai Vintage — vintage fashion, luxury pieces and stories" }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image],
    },
  };
}

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
            <a
              className="instagram-link"
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @vintagebycohai"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" />
              </svg>
            </a>
          </div>
        </div>
        <div className="hero-image-wrap hero-parallax-wrap">
          <ArchiveSlideshow slides={getArchiveSlides(locale)} interval={7200} labels={slideshowLabels(locale)} />
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
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 800px) 33vw, 20vw" />
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
