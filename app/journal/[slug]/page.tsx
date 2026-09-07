import type { Metadata } from "next";
import Link from "next/link";
import { editorialPosts, getEditorialPost } from "@/lib/content";
import { getLocale, localizedPost, ui } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { ParallaxMedia } from "@/components/ParallaxMedia";

export function generateStaticParams() {
  return editorialPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getEditorialPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [{ url: post.image }] },
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
      <header className="article-header reveal">
        <p className="eyebrow">{localized.category}</p>
        <h1>{localized.title}</h1>
        <p className="article-intro">{localized.intro}</p>
      </header>
      <div className="article-hero">
        <ParallaxMedia src={localized.image} alt={localized.title} fill priority quality={100} sizes="100vw" strength={9} />
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
