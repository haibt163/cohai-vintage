import type { Metadata } from "next";
import Link from "next/link";
import { editorialPosts, getEditorialPost } from "@/lib/content";
import { getLocale, localizedPost, ui } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { ParallaxMedia } from "@/components/ParallaxMedia";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return editorialPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const found = getEditorialPost(slug);
  if (!found) return {};
  const post = localizedPost(found, await getLocale());
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article", images: [{ url: post.image }] },
  };
}

export default async function EditorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getEditorialPost(slug);
  if (!post) notFound();
  const locale = await getLocale();
  const labels = ui[locale];
  const localized = localizedPost(post, locale);

  return (
    <article className="article-page">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: localized.title,
        description: localized.excerpt,
        image: absoluteUrl(localized.image),
        inLanguage: locale,
        mainEntityOfPage: absoluteUrl(`/journal/${slug}`),
        publisher: { "@type": "Organization", name: "Cô Hai Vintage" },
      }} />
      <header className="article-header reveal">
        <p className="eyebrow">{localized.category}</p>
        <h1>{localized.title}</h1>
        <p className="article-intro">{localized.intro}</p>
      </header>
      <div className="article-hero">
        <ParallaxMedia src={localized.image} alt={localized.title} fill priority sizes="100vw" strength={9} />
      </div>
      <div className="article-body">
        {localized.paragraphs.map((paragraph, index) => (
          <p className={index === 0 ? "article-lead" : ""} key={paragraph}>{paragraph}</p>
        ))}
        <div className="article-back">
          <Link className="text-link" href="/journal">{labels.backJournal}</Link>
        </div>
      </div>
    </article>
  );
}
