import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cô Hai Vintage",
    short_name: "Cô Hai Vintage",
    description: "Vintage fashion, luxury pieces, jewellery and stories from Saigon.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#f3efe8",
    theme_color: "#f3efe8",
    icons: [
      { src: "/icon.svg", sizes: "512x512", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
