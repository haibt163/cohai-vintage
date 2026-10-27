/**
 * Canonical public origin for Cô Hai Vintage. Keep this aligned with the
 * production domain configured in Vercel so canonicals never point at a preview
 * or project-specific Vercel alias.
 */
export const siteUrl = "https://cohaivintage.com";

export const contact = {
  email: "cohaivintage@gmail.com",
  instagramHandle: "vintagebycohai",
  instagramUrl: "https://www.instagram.com/vintagebycohai/",
} as const;

export const absoluteUrl = (path: string) => siteUrl + (path.startsWith("/") ? path : "/" + path);
