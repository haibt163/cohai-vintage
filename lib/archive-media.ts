import type { Locale } from "@/lib/i18n";

export type ArchiveSlide = {
  src: string;
  alt: string;
};

type ArchiveEntry = {
  src: string;
  alt: { en: string; vi: string };
  /** "founder" entries also feed the About page slideshow. */
  group: "archive" | "founder";
};

const media = (name: string) => `/assets/original/2025/03/${name}`;

/**
 * Verified recovered Cô Hai photography and editorial/product imagery.
 * Keep this list limited to files confirmed in the repository; do not invent
 * numbered variants just to increase the slide count.
 * Every file listed here must exist in public/assets/original/2025/03/
 * (enforced in CI by scripts/check-media.mjs).
 */
const entries: ArchiveEntry[] = [
  { group: "archive", src: media("STREET-STYLE-3.jpg"), alt: { en: "Vintage street style from the Cô Hai Vintage archive", vi: "Phong cách đường phố vintage từ kho lưu trữ Cô Hai Vintage" } },
  { group: "archive", src: media("STREET-STYLE-1.jpg"), alt: { en: "A second street-style photograph from the Cô Hai Vintage archive", vi: "Bức ảnh phong cách đường phố thứ hai từ kho lưu trữ Cô Hai Vintage" } },
  { group: "founder", src: media("CO-HAI-VINTAGE.jpg"), alt: { en: "Cô Hai Vintage founder archive portrait", vi: "Chân dung người sáng lập trong kho lưu trữ Cô Hai Vintage" } },
  { group: "founder", src: media("CO-HAI-VINTAGE-1.jpg"), alt: { en: "Cô Hai Vintage founder archive portrait, second view", vi: "Chân dung người sáng lập trong kho lưu trữ Cô Hai Vintage, góc nhìn thứ hai" } },
  { group: "founder", src: media("CO-HAI-VINTAGE-2.jpg"), alt: { en: "Cô Hai Vintage founder archive portrait, third view", vi: "Chân dung người sáng lập trong kho lưu trữ Cô Hai Vintage, góc nhìn thứ ba" } },
  { group: "founder", src: media("CO-HAI-VINTAGE-3.jpg"), alt: { en: "Cô Hai Vintage founder archive portrait, fourth view", vi: "Chân dung người sáng lập trong kho lưu trữ Cô Hai Vintage, góc nhìn thứ tư" } },
  { group: "archive", src: media("FLEA-MARKET.jpg"), alt: { en: "Flea market scene from the Cô Hai Vintage archive", vi: "Khung cảnh chợ đồ cũ từ kho lưu trữ Cô Hai Vintage" } },
  { group: "archive", src: media("MIKIMOTO-1.jpg"), alt: { en: "Akoya pearl editorial image from the Cô Hai Vintage archive", vi: "Hình ảnh biên tập về ngọc trai Akoya từ kho lưu trữ Cô Hai Vintage" } },
  { group: "archive", src: media("COCO-CHANEL.jpg"), alt: { en: "Coco Chanel fashion-history editorial image", vi: "Hình ảnh biên tập về Coco Chanel và lịch sử thời trang" } },
  { group: "archive", src: media("221215140542-bernard-arnault.jpg"), alt: { en: "Bernard Arnault and luxury-business editorial image", vi: "Hình ảnh biên tập về Bernard Arnault và ngành kinh doanh hàng xa xỉ" } },
  { group: "archive", src: media("LV-vintage-Concorde.webp"), alt: { en: "Louis Vuitton Vintage Concorde from the Cô Hai Vintage collection", vi: "Louis Vuitton Concorde Vintage trong bộ sưu tập Cô Hai Vintage" } },
  { group: "archive", src: media("lv-concorde-1.jpg"), alt: { en: "Louis Vuitton Concorde detail from the Cô Hai Vintage collection", vi: "Chi tiết Louis Vuitton Concorde trong bộ sưu tập Cô Hai Vintage" } },
  { group: "archive", src: media("LV-CONCORDE-2.webp"), alt: { en: "Louis Vuitton Concorde second detail from the Cô Hai Vintage collection", vi: "Chi tiết thứ hai của Louis Vuitton Concorde trong bộ sưu tập Cô Hai Vintage" } },
  { group: "archive", src: media("LV-NEVERFUL-MONO-MM.jpg"), alt: { en: "Louis Vuitton Monogram Neverfull MM from the Cô Hai Vintage collection", vi: "Louis Vuitton Monogram Neverfull MM trong bộ sưu tập Cô Hai Vintage" } },
  { group: "archive", src: media("LV-neverfull-MM.jpg"), alt: { en: "Louis Vuitton Neverfull MM detail from the Cô Hai Vintage collection", vi: "Chi tiết Louis Vuitton Neverfull MM trong bộ sưu tập Cô Hai Vintage" } },
  { group: "archive", src: media("lv-mono-neverfull-MM-3.jpg"), alt: { en: "Louis Vuitton Neverfull MM alternate detail from the Cô Hai Vintage collection", vi: "Chi tiết khác của Louis Vuitton Neverfull MM trong bộ sưu tập Cô Hai Vintage" } },
  { group: "archive", src: media("LV-KELLY-MONO.jpg"), alt: { en: "Louis Vuitton Vintage Mono Kelly from the Cô Hai Vintage collection", vi: "Louis Vuitton Mono Kelly Vintage trong bộ sưu tập Cô Hai Vintage" } },
  { group: "archive", src: media("LV-KELLY-LOCK.jpg"), alt: { en: "Louis Vuitton Vintage Mono Kelly lock detail", vi: "Chi tiết khoá của Louis Vuitton Mono Kelly Vintage" } },
];

/** Full homepage archive, or only the founder portraits (About page). */
export function getArchiveSlides(locale: Locale, group?: ArchiveEntry["group"]): ArchiveSlide[] {
  return entries
    .filter((entry) => !group || entry.group === group)
    .map((entry) => ({ src: entry.src, alt: entry.alt[locale] }));
}
