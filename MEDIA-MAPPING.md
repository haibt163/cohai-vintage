# Cô Hai Vintage — Media Mapping

## Canonical media location

Recovered genuine media belongs under:

`public/assets/original/`

The old WordPress upload structure is preserved sufficiently to trace filenames back to the recovered source material.

## Confirmed genuine media families

- `CO-HAI-VINTAGE*`
- `FLEA-MARKET*`
- `BERNARD*`
- `COCO-CHANEL*`
- `MIKIMOTO*`
- `MIKOMOTO*`
- `STREET-STYLE*`
- `LV-vintage-Concorde*`
- `LV-NEVERFUL-MONO-MM*`
- `LV-KELLY-MONO*`
- related Louis Vuitton product imagery
- brand and editorial assets

## Verified homepage archive set

The current homepage archive slideshow uses **18 verified unique recovered images**. This is intentional: the implementation does not fabricate additional images merely to reach a round slideshow count.

The verified set is:

1. `STREET-STYLE-3.jpg`
2. `STREET-STYLE-1.jpg`
3. `CO-HAI-VINTAGE.jpg`
4. `CO-HAI-VINTAGE-1.jpg`
5. `CO-HAI-VINTAGE-2.jpg`
6. `CO-HAI-VINTAGE-3.jpg`
7. `FLEA-MARKET.jpg`
8. `MIKIMOTO-1.jpg`
9. `COCO-CHANEL.jpg`
10. `221215140542-bernard-arnault.jpg`
11. `LV-vintage-Concorde.webp`
12. `lv-concorde-1.jpg`
13. `LV-CONCORDE-2.webp`
14. `LV-NEVERFUL-MONO-MM.jpg`
15. `LV-neverfull-MM.jpg`
16. `lv-neverfull-mm.webp`
17. `LV-KELLY-MONO.jpg`
18. `LV-KELLY-LOCK.jpg`

## Editorial mappings

### Cô Hai Vintage

Primary family: `CO-HAI-VINTAGE*`

Use for the founder/story, identity, and brand-history sections.

The About page currently uses the four verified founder archive portraits only, selected from the `CO-HAI-VINTAGE*` family. Do not mix unrelated product/editorial imagery into that founder slideshow unless a later source audit proves it is appropriate.

### Flea Market

Primary family: `FLEA-MARKET*`

Use the actual flea-market photographs rather than generic/demo imagery.

### Akoya Pearl

Primary families: `MIKIMOTO*`, `MIKOMOTO*`

Use the recovered Mikimoto/pearl imagery for the article and supporting gallery.

### Have the Right Outfit

Primary family: `STREET-STYLE*`

Use the recovered street-style imagery for the style article.

### Bernard Arnault

Primary family: `BERNARD*`

Use the recovered Bernard Arnault/LVMH imagery and verify the exact image before placement.

### Coco Chanel

Primary family: `COCO-CHANEL*`

Reserved for the Coco Chanel editorial content and related recovered imagery.

### Louis Vuitton's Patent

Use the relevant recovered Louis Vuitton/history imagery identified from the original WordPress attachment mapping. Do not guess a filename when the mapping is uncertain.

### Louis Vuitton products

- `LV-vintage-Concorde*` — Vintage Concorde
- `LV-NEVERFUL-MONO-MM*` — Monogram Neverfull MM
- `LV-KELLY-MONO*` — Vintage Mono Kelly
- related LV imagery — supporting product/history galleries

Current verified product gallery counts:

- Concorde: 3 recovered assets
- Neverfull MM: 3 recovered assets
- Mono Kelly: 2 recovered assets

## Current image-quality issue — OPEN

The recovered images above are the correct source assets, but the live site still presents some photographs as slightly blurry/soft. This remains a **pending issue**, not a reason to replace the genuine media.

The next audit should compare:

- original source pixel dimensions and file quality;
- the actual rendered dimensions in each route;
- Next.js image delivery and browser caching;
- CSS `object-fit`, aspect-ratio and transform scaling;
- desktop versus iOS/mobile rendering.

Do not treat visual softness as proof that the media mapping is wrong.

## Implementation rule

Filename alone does not prove correct placement. Inspect the actual asset and compare it against the recovered WordPress attachment/content mapping before assigning it to an article or product.

The current implementation has removed or replaced the important Astra starter/demo references where genuine Cô Hai media was available. Before deleting any remaining legacy/demo asset, perform a repository-wide reference check.

Keep the current verified media mappings stable unless the next audit produces concrete source evidence for a change.
