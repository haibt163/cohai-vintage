import type { MetadataRoute } from "next";
import { editorialPosts, products } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

// lastModified is intentionally omitted: no reliable per-page dates exist yet.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about", "/journal", "/shop", "/contact"];
  return [
    ...staticRoutes.map((path) => ({ url: absoluteUrl(path) })),
    ...editorialPosts.map((post) => ({ url: absoluteUrl(`/journal/${post.slug}`) })),
    ...products.map((product) => ({ url: absoluteUrl(`/shop/${product.slug}`) })),
  ];
}
