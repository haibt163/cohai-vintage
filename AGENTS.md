# Cô Hai Vintage — Agent Instructions

## Project

This repository is the authoritative source for the modern Cô Hai Vintage website rebuild.

The project is a clean, modern Next.js implementation. Do NOT reproduce the old WordPress/Elementor/Astra implementation literally.

## Stack

- Next.js 16
- React 19
- TypeScript
- App Router
- Tailwind/CSS as already configured in the repository

## Source of truth

The recovered WordPress installation is the source for genuine Cô Hai Vintage editorial content, product information, image assets, and historical context.

Genuine recovered media is under:

`public/assets/original/`

GitHub `main` is the authoritative code source.

## Critical media rule

The current site must progressively replace all remaining Astra starter/demo/stock imagery with the genuine recovered WordPress media whenever a genuine source asset exists.

Do not choose generic stock imagery merely because it looks cleaner.

Before using an asset, inspect its actual subject and use the documented WordPress mapping in `MEDIA-MAPPING.md` and `ORIGINAL-WORDPRESS.md`.

### Image-quality rule

Some recovered photographs are screenshots of the old web presentation rather than the original uploaded photos. This is now an OPEN source-quality finding. Do not try to hide the problem with aggressive CSS enlargement, sharpening filters, fake upscaling, or stock replacements.

Preferred remediation: obtain the genuine original photograph and manually replace the corresponding file **using the same filename/path** wherever practical. This preserves the existing code references and minimizes token/code churn. Audit and record each replacement before copying it into `public/assets/original/`.

## Editorial source material

Important genuine subjects include:

- Cô Hai Vintage founder/story
- Flea Market
- Akoya Pearl / Mikimoto
- Bernard Arnault / LVMH
- Coco Chanel
- Louis Vuitton's Patent/history
- Have the Right Outfit / style

## Product source material

Confirmed recovered vintage Louis Vuitton examples include:

- Louis Vuitton Vintage Concorde
- Louis Vuitton Monogram Neverfull MM
- Louis Vuitton Vintage Mono Kelly

Do not invent prices, stock status, condition grades, provenance, authenticity claims, measurements, or product facts that are not supported by the recovered source material.

## Design direction

The target is a premium vintage-fashion/editorial experience: elegant, restrained, image-led, contemporary, and distinctive rather than a generic template.

Future phases should prioritize:

- original WordPress photography
- strong editorial typography and hierarchy
- sophisticated spacing and composition
- immersive image presentation without over-enlarging soft sources
- subtle hover/motion treatments
- tasteful mouse/pointer parallax where it improves the experience
- responsive mobile behaviour
- accessibility and reduced-motion support
- fast loading and sensible image sizing

Motion must remain refined. Avoid excessive animation, gimmicks, or motion that harms readability/performance.

## Phase roadmap

### Phase 3 — Authentic content and media

- Replace generic/demo media with genuine recovered WordPress imagery.
- Build editorial pages from the recovered articles.
- Build the vintage product catalogue and product detail views.
- Verify image-to-article/product mappings.

### Phase 4 — Premium visual experience

- Redesign the current generic layouts into a more distinctive Cô Hai Vintage visual system.
- Improve typography, composition, navigation, image galleries, cards, and responsive layouts.
- Add subtle mouse/pointer parallax and hover interactions.
- Respect `prefers-reduced-motion`.

### Phase 5 — Final polish and production readiness

Phase 5 is substantially complete but remains OPEN until the documented visual verification items are closed.

Completed:

- route and asset-reference audit
- responsive layout work
- accessibility and metadata work
- branded 404
- custom browser/Apple icon implementation
- lint, typecheck and production build validation

Still open:

- recovered-photo source-resolution/replacement audit
- live favicon and iOS Home Screen icon verification
- final desktop/tablet/iPhone visual audit
- final Shop image/crop/loading recheck
- final production deployment/browser verification

Do not mark Phase 5 fully closed merely because CI is green; the remaining items require visual/live verification.

## Workflow

Before major changes, inspect the existing implementation and the relevant recovered source material.

For photography replacement work, prefer this low-churn workflow:

1. identify the exact existing filename/path used by a page or component;
2. place the genuine replacement in a local page-grouped staging folder;
3. rename it to the exact existing filename;
4. visually compare the replacement at the site's real rendered dimensions;
5. copy it over the existing file under `public/assets/original/`;
6. avoid source-code changes when the path can remain identical;
7. run the normal validation commands.

Suggested local staging structure:

```text
manual-photo-replacements/
  landing/
  about/
  journal/
  shop/
```

After meaningful changes, run:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

The known-good green validation state should be preserved while resolving the remaining audit items.

Do not commit generated secrets or hosting recovery material.

## Never commit

- SQL database dumps
- `wp-config.php`
- passwords
- API keys
- `.env` secrets
- Bluehost/cPanel backup archives
- credentials or other sensitive recovery files

## Continuity instruction

At the beginning of a new conversation, read this file together with:

- `PROJECT_STATUS.md`
- `ORIGINAL-WORDPRESS.md`
- `MEDIA-MAPPING.md`

Then continue from the OPEN items in `PROJECT_STATUS.md`. The immediate next task is photography replacement preparation and live verification, not a broad redesign.
