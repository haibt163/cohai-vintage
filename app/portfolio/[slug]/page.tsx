import Image from "next/image";
import Link from "next/link";
import { editorialPosts, getEditorialPost } from "@/lib/content";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return editorialPosts.map((post) => ({ slug: post.slug }));
}

export default async function EditorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getEditorialPost(slug);
  if (!post) notFound();

  return (
    <article className="article-page">
      <header className="article-header">
        <p className="eyebrow">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="article-intro">{post.intro}</p>
      </header>
      <div className="article-hero"><Image src={post.image} alt="" fill priority sizes="100vw" /></div>
      <div className="article-body">
        {post.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <div className="article-back"><Link className="text-link" href="/portfolio">← Back to Journal</Link></div>
      </div>
    </article>
  );
}
