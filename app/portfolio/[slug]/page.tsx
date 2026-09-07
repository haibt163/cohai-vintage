import { redirect } from "next/navigation";

export function generateStaticParams() {
  return [];
}

export default async function LegacyEditorialRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/journal/${slug}`);
}
