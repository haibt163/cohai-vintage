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

The current homepage archive slideshow uses **18 verified unique recovered images**. Do not fabricate additional images merely to reach a round slideshow count.

The current verified set is:

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
16. `lv-mono-neverfull-MM-3.jpg`
17. `LV-KELLY-MONO.jpg`
18. `LV-KELLY-LOCK.jpg`

## Editorial mappings

### Cô Hai Vintage

Primary family: `CO-HAI-VINTAGE*`

Use for the founder/story, identity, and brand-history sections.

The About page currently uses the four verified founder archive portraits only, selected from the `CO-HAI-VINTAGE*` family.

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
- Neverfull MM: 3 recovered assets (`LV-NEVERFUL-MONO-MM.jpg`, `LV-neverfull-MM.jpg`, `lv-mono-neverfull-MM-3.jpg`)
- Mono Kelly: 2 recovered assets

## Current photography-source finding — OPEN / PRIORITY

The owner has confirmed that some files recovered from the old WordPress site are **screenshots rather than the original uploaded photographs**. This explains a significant portion of the remaining softness/blurriness.

### Page-grouped replacement set

A dedicated staging map now exists at:

```text
manual-photo-replacements/
  README.md
  PHOTO-REPLACEMENT-MANIFEST.md
  landing/
  about/
  journal/
  shop/
```

The manifest identifies every current image by its exact filename and page usage. The canonical active images remain unchanged under `public/assets/original/2025/03/` until a genuine replacement is verified.

Because binary media should not be fabricated as text through the repository file-writing interface, the repository includes local helpers:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\stage-current-photos.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\apply-photo-replacements.ps1
```

The first copies the exact current binaries into the page-grouped staging folders after a local `git pull`. The second copies verified staged replacements back to the canonical media directory.

### Replacement strategy

The preferred low-churn solution is:

1. keep the existing application filename/path;
2. obtain the genuine original photograph manually;
3. rename the genuine file to exactly match the existing filename;
4. replace the staged/canonical screenshot file locally;
5. run the site at realistic desktop/iPhone rendered sizes and visually verify it;
6. commit/push the binary replacement without changing application code where the path is unchanged.

Do not replace a file merely because it looks soft until its page usage has been confirmed.

## Current image-quality issue — OPEN

The code/rendering side has been restrained so that the site does not deliberately enlarge soft archival imagery. Remaining blur should now be investigated primarily as a **source-quality problem**, while still checking:

- original source pixel dimensions and file quality;
- actual rendered dimensions in each route;
- Next.js image delivery and browser caching;
- CSS `object-fit`, aspect-ratio and transform scaling;
- desktop versus iOS/mobile rendering.

Do not use fake sharpening or AI upscaling as a substitute for a genuine original photograph.

## Implementation rule

Filename alone does not prove correct placement. Inspect the actual asset and compare it against the recovered WordPress attachment/content mapping before assigning it to an article or product.

Keep verified media mappings stable unless a source audit produces concrete evidence for a change.

Before deleting any legacy/demo asset, perform a repository-wide reference check.
