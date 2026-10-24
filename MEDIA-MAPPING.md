# Cô Hai Vintage — Media Mapping

## Canonical media location

Recovered genuine media **in use by the site** belongs under:

`public/assets/original/2025/03/`

Recovered media that is not used lives in `archive/wordpress-recovery/` (same relative structure, not served). See `archive/README.md`.

The old WordPress upload structure is preserved sufficiently to trace filenames back to the recovered source material.

## Naming convention (current site filenames)

Files in `public/assets/original/2025/03/` are named after the content item that owns the photo, not after the page that happens to show it
(the homepage archive shows all of them). Lowercase letters, digits and hyphens only; the trailing number counts photos within one item.

| Prefix | Owner | Pattern | Examples |
|---|---|---|---|
| `cohai-` | Founder portraits (About page and homepage archive) | `cohai-<n>` | `cohai-1.jpg` |
| `journal-` | A Journal article | `journal-<article-topic>-<n>` | `journal-flea-market-1.jpg` |
| `shop-` | A product gallery | `shop-<product>-<n>` | `shop-concorde-2.jpg` |
| `landing-` | Homepage-only photos (used nowhere else) | `landing-<n>` | `landing-1.jpg` |

The `photo-inbox/` workflow (`scripts/manage-photos.ps1`) enforces this pattern for every new or replacement photo. Display order is defined in
`lib/content.ts` / `lib/archive-media.ts`, never by the number in the filename.

### Old filename to current filename (one-time rename)

The old names are what you will find in `archive/wordpress-recovery/` and in older documents.

| Old filename | Current filename |
|---|---|
| `STREET-STYLE-3.jpg` | `journal-outfit-1.jpg` |
| `STREET-STYLE-1.jpg` | `landing-1.jpg` |
| `CO-HAI-VINTAGE.jpg` | `cohai-1.jpg` |
| `CO-HAI-VINTAGE-1.jpg` | `cohai-2.jpg` |
| `CO-HAI-VINTAGE-2.jpg` | `cohai-3.jpg` |
| `CO-HAI-VINTAGE-3.jpg` | `cohai-4.jpg` |
| `FLEA-MARKET.jpg` | `journal-flea-market-1.jpg` |
| `MIKIMOTO-1.jpg` | `journal-akoya-pearl-1.jpg` |
| `COCO-CHANEL.jpg` | `journal-coco-chanel-1.jpg` |
| `221215140542-bernard-arnault.jpg` | `journal-bernard-arnault-1.jpg` |
| `LV-vintage-Concorde.webp` | `shop-concorde-1.webp` |
| `lv-concorde-1.jpg` | `shop-concorde-2.jpg` |
| `LV-CONCORDE-2.webp` | `shop-concorde-3.webp` |
| `LV-NEVERFUL-MONO-MM.jpg` | `shop-neverfull-mm-1.jpg` |
| `LV-neverfull-MM.jpg` | `shop-neverfull-mm-2.jpg` |
| `lv-mono-neverfull-MM-3.jpg` | `shop-neverfull-mm-3.jpg` |
| `LV-KELLY-MONO.jpg` | `shop-mono-kelly-1.jpg` |
| `LV-KELLY-LOCK.jpg` | `shop-mono-kelly-2.jpg` |

## Confirmed genuine media families

These are the **old WordPress source filenames** (use them to search `archive/wordpress-recovery/`; the table above gives the current site names).

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

1. `journal-outfit-1.jpg`
2. `landing-1.jpg`
3. `cohai-1.jpg`
4. `cohai-2.jpg`
5. `cohai-3.jpg`
6. `cohai-4.jpg`
7. `journal-flea-market-1.jpg`
8. `journal-akoya-pearl-1.jpg`
9. `journal-coco-chanel-1.jpg`
10. `journal-bernard-arnault-1.jpg`
11. `shop-concorde-1.webp`
12. `shop-concorde-2.jpg`
13. `shop-concorde-3.webp`
14. `shop-neverfull-mm-1.jpg`
15. `shop-neverfull-mm-2.jpg`
16. `shop-neverfull-mm-3.jpg`
17. `shop-mono-kelly-1.jpg`
18. `shop-mono-kelly-2.jpg`

## Editorial mappings

### Cô Hai Vintage

Primary family: `CO-HAI-VINTAGE*`

Use for founder/story, identity, and brand-history sections. The About page currently uses the four verified founder archive portraits only.

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
- Neverfull MM: 3 recovered assets (`shop-neverfull-mm-1.jpg`, `shop-neverfull-mm-2.jpg`, `shop-neverfull-mm-3.jpg`)
- Mono Kelly: 2 recovered assets

## Current photography-source finding — OPEN / PRIORITY

The owner has confirmed that some files recovered from the old WordPress site are **screenshots rather than the original uploaded photographs**. This explains a significant portion of the remaining softness/blurriness.

### Page-grouped replacement set

A dedicated staging map exists at:

```text
manual-photo-replacements/
  README.md
  PHOTO-REPLACEMENT-MANIFEST.md
  landing/
  about/
  journal/
  shop/
```

The manifest identifies current images by exact filename and page usage. Canonical active images remain under `public/assets/original/2025/03/` until a genuine replacement is verified.

### Replacement helper scripts

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\stage-current-photos.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\apply-photo-replacements.ps1
```

The staging script copies the current canonical binaries into the page groups. The apply script is fail-closed and validates the complete approved filename set plus SHA-256 consistency for duplicate filenames across page groups before copying anything into the canonical directory.

See `PHOTO-REPLACEMENT-GUIDE.md` for the reusable procedure and safeguard rationale.

### Replacement strategy

The preferred low-churn solution is:

1. keep the existing application filename/path;
2. obtain the genuine original photograph manually;
3. rename the genuine file to exactly match the approved filename;
4. replace the staged copy;
5. run the safeguard/apply script;
6. inspect realistic desktop and iPhone rendering;
7. run lint, typecheck and build;
8. commit/push the verified binary replacement.

Do not replace a file merely because it looks soft until its page usage has been confirmed.

## Current image-quality issue — OPEN

The code/rendering side has been restrained so that the site does not deliberately enlarge soft archival imagery to hide source problems. Remaining blur should now be investigated primarily as a **source-quality problem**, while still checking:

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
