export type ArchiveSlide = {
  src: string;
  alt: string;
};

const media = (name: string) => `/assets/original/2025/03/${name}`;

/**
 * Verified recovered Cô Hai photography and editorial/product imagery.
 * Keep this list limited to files confirmed in the repository; do not invent
 * numbered variants just to increase the slide count.
 */
export const archiveSlides: ArchiveSlide[] = [
  { src: media("STREET-STYLE-3.jpg"), alt: "Vintage street style from the Cô Hai Vintage archive" },
  { src: media("STREET-STYLE-1.jpg"), alt: "A second street-style photograph from the Cô Hai Vintage archive" },
  { src: media("CO-HAI-VINTAGE.jpg"), alt: "Cô Hai Vintage founder archive portrait" },
  { src: media("CO-HAI-VINTAGE-1.jpg"), alt: "Cô Hai Vintage founder archive portrait, second view" },
  { src: media("CO-HAI-VINTAGE-2.jpg"), alt: "Cô Hai Vintage founder archive portrait, third view" },
  { src: media("CO-HAI-VINTAGE-3.jpg"), alt: "Cô Hai Vintage founder archive portrait, fourth view" },
  { src: media("FLEA-MARKET.jpg"), alt: "Flea market scene from the Cô Hai Vintage archive" },
  { src: media("MIKIMOTO-1.jpg"), alt: "Akoya pearl editorial image from the Cô Hai Vintage archive" },
  { src: media("COCO-CHANEL.jpg"), alt: "Coco Chanel fashion-history editorial image" },
  { src: media("221215140542-bernard-arnault.jpg"), alt: "Bernard Arnault and luxury-business editorial image" },
  { src: media("LV-vintage-Concorde.webp"), alt: "Louis Vuitton Vintage Concorde from the recovered collection" },
  { src: media("lv-concorde-1.jpg"), alt: "Louis Vuitton Concorde detail from the recovered collection" },
  { src: media("LV-CONCORDE-2.webp"), alt: "Louis Vuitton Concorde second detail from the recovered collection" },
  { src: media("LV-NEVERFUL-MONO-MM.jpg"), alt: "Louis Vuitton Monogram Neverfull MM from the recovered collection" },
  { src: media("LV-neverfull-MM.jpg"), alt: "Louis Vuitton Neverfull MM detail from the recovered collection" },
  { src: media("lv-neverfull-mono-1.jpg"), alt: "Louis Vuitton Neverfull MM alternate detail from the recovered collection" },
  { src: media("LV-KELLY-MONO.jpg"), alt: "Louis Vuitton Vintage Mono Kelly from the recovered collection" },
  { src: media("LV-KELLY-LOCK.jpg"), alt: "Louis Vuitton Vintage Mono Kelly lock detail" },
];
