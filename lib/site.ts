/**
 * Canonical public origin. Priority:
 *  1. NEXT_PUBLIC_SITE_URL  — set this to the real custom domain (e.g. https://cohaivintage.com)
 *  2. VERCEL_PROJECT_PRODUCTION_URL — provided by Vercel (host only, no protocol)
 *  3. localhost for local development
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const contact = {
  email: "cohaivintage@gmail.com",
  instagramHandle: "vintagebycohai",
  instagramUrl: "https://www.instagram.com/vintagebycohai/",
} as const;

export const absoluteUrl = (path: string) => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
