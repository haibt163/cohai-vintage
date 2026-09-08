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

The current site must progressively replace all remaining Astra starter/demo/stock imagery with genuine recovered WordPress media whenever a genuine source asset exists.

Do not choose generic stock imagery merely because it looks cleaner.

Before using an asset, inspect its actual subject and use the documented WordPress mapping in `MEDIA-MAPPING.md` and `ORIGINAL-WORDPRESS.md`.

### Image-quality rule

Some recovered photographs are screenshots of the old web presentation rather than the original uploaded photos. This is an OPEN source-quality finding. Do not try to hide the problem with aggressive CSS enlargement, sharpening filters, fake upscaling, or stock replacements.

Preferred remediation: obtain the genuine original photograph and manually replace the corresponding file **using the same filename/path** wherever practical. This preserves the existing code references and minimizes code churn.

The reusable staging and safeguard procedure is documented in `PHOTO-REPLACEMENT-GUIDE.md`.

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

The current approved visual direction includes:

- roughly 50/50 desktop homepage hero image/text composition;
- larger, immersive photography without hiding poor source quality through fake enlargement;
- Bodoni/Didot-style editorial serif headlines;
- larger supporting/dek/body copy so the typographic hierarchy remains readable and balanced;
- subtle magnetic navigation and tasteful mouse/pointer parallax;
- responsive mobile behaviour;
- accessibility and reduced-motion support.

The larger supporting-copy treatment is intentional. Do not reduce normal editorial paragraphs back to tiny 13–15px website copy without a demonstrated device/layout reason.

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
- premium visual typography and composition pass
- stronger homepage hero/parallax treatment
- enlarged supporting-copy hierarchy
- lint/typecheck/build validation baseline

Still open:

- recovered-photo source-resolution/replacement audit
- live favicon and iOS Home Screen icon verification
- final desktop/tablet/iPhone visual audit
- final Shop image/crop/loading recheck
- final production deployment/browser verification

Do not mark Phase 5 fully closed merely because CI is green; the remaining items require visual/live verification.

## Photography replacement workflow

For the current handoff, the owner may manually replace screenshot-based photos and push the replacements to GitHub. Use this low-churn method whenever possible:

1. Pull the latest `main`.
2. Run `scripts/stage-current-photos.ps1` to create a fresh page-grouped staging set.
3. Identify the exact filename/path and page usage from `manual-photo-replacements/PHOTO-REPLACEMENT-MANIFEST.md`.
4. Obtain the genuine original photograph.
5. Rename it to exactly match the approved filename and extension.
6. Replace the staged copy; do not rename the canonical application asset merely to accommodate the source.
7. Run `scripts/apply-photo-replacements.ps1`.
8. **Never bypass a failed safeguard.** The apply script rejects unexpected filenames, missing approved filenames, and inconsistent duplicate copies across page groups using SHA-256 comparison.
9. Inspect desktop and iPhone-sized rendering.
10. Run `npm run lint`, `npm run typecheck`, and `npm run build`.
11. Commit/push only the verified binary replacements.

The complete reusable procedure is in `PHOTO-REPLACEMENT-GUIDE.md`.

Do not add the local staging binaries to GitHub as a separate media source. The canonical source remains `public/assets/original/2025/03/`.

## Workflow

Before major changes, inspect the existing implementation and the relevant recovered source material.

After meaningful code or media changes, run:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

Preserve the known-good validation state while addressing the remaining audit items.

## Never commit

- SQL database dumps
- `wp-config.php`
- passwords
- API keys
- `.env` secrets
- Bluehost/cPanel backup archives
- credentials or other sensitive recovery files

## Continuity instruction

At the beginning of a new conversation, read:

- `PROJECT_STATUS.md`
- `AGENTS.md`
- `ORIGINAL-WORDPRESS.md`
- `MEDIA-MAPPING.md`
- `PHOTO-REPLACEMENT-GUIDE.md`

Then continue from the OPEN items in `PROJECT_STATUS.md`. Do not restart the reconstruction or initiate another broad redesign unless explicitly requested.