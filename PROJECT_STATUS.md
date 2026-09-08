# Cô Hai Vintage — Project Status

## Current state — 8 September 2026

The modern Cô Hai Vintage reconstruction is running well on `main` and satisfies the large majority of the agreed functional and visual requirements. `main` remains the authoritative code source.

Phase 3 authentic content/media restoration and Phase 4 premium visual transformation are complete. Phase 5 production work is substantially complete, but the remaining visual/live verification items are intentionally carried forward.

## Phase 3 — COMPLETE

- Recovered genuine editorial photography integrated from `public/assets/original/`.
- Recovered editorial subjects restored, including Flea Market, Akoya Pearl / Mikimoto, Have the Right Outfit, Bernard Arnault and Coco Chanel.
- Three Louis Vuitton product routes restored with supporting galleries.
- Product copy remains conservative: no unsupported pricing, condition, provenance or authenticity claims.
- Canonical media location remains `public/assets/original/`.
- Verified product galleries currently use only the recovered Louis Vuitton assets mapped in `lib/content.ts`.

## Phase 4 — COMPLETE

- Premium editorial typography, spacing and section composition.
- Distinctive Cô Hai Vintage header/navigation and bilingual EN/VI switcher.
- Magnetic navigation interactions.
- Visible mouse parallax on editorial photography.
- Restrained image rendering and framing intended to avoid unnecessary enlargement of archival photographs.
- Homepage archive slideshow using the verified recovered archive set, with slow automatic rotation and manual controls.
- About page founder archive slideshow focused on the four verified `CO-HAI-VINTAGE` founder portrait assets.
- Shop, product, Contact and About routes visually integrated.
- Responsive mobile/tablet layouts and reduced-motion support.
- Vietnamese typography/spacing refinements are present, but final cross-device review remains open.

## Phase 5 — SUBSTANTIALLY COMPLETE

### Route integrity

- `/` homepage.
- `/about` founder/story page.
- `/journal` canonical editorial archive.
- `/journal/[slug]` canonical editorial articles.
- `/shop` collection.
- `/shop/[slug]` product detail routes.
- `/contact` contact flow.
- Legacy `/portfolio` routes redirect to the canonical Journal routes.
- Branded `not-found` page added.

### Image/reference state

- Primary image-led routes use verified recovered Cô Hai media.
- Homepage and About use genuine archive assets rather than repeatedly enlarging one image.
- Product/editorial images use recovered source paths.
- Product gallery mappings are documented in `MEDIA-MAPPING.md`.

### Interaction / responsive state

- Scroll reveal reinitialises on Next.js client-side route changes.
- In-view content is made visible immediately after navigation.
- Mouse parallax is applied directly to image media and remains restrained.
- Slideshow controls are keyboard-accessible and automatic motion respects `prefers-reduced-motion`.
- Mobile removes desktop-only pointer effects while preserving touch-friendly controls.

### Accessibility / metadata

- Descriptive image alt text across archive and product experiences.
- Carousel controls have accessible labels and pressed state.
- Missing routes use a branded 404 experience.
- Site metadata, Open Graph defaults, Apple web-app metadata, theme colour and installable manifest configured.
- Custom Cô Hai Vintage icon generation is implemented.

### Validation

The latest automated validation has been kept as a required gate:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

The latest known green validation remains the baseline to preserve while working on the open visual items. Always re-run all three after meaningful changes.

## Newly confirmed photography finding — OPEN / PRIORITY

The owner has now confirmed the root cause of a major portion of the perceived softness: some of the recovered old-WordPress images are actually screenshots rather than the original uploaded photographs.

This changes the remediation strategy:

- Do **not** attempt to solve screenshot softness primarily through CSS enlargement, sharpening filters, aggressive `quality`, or fake upscaling.
- Preserve the existing filenames/paths where possible so the site code does not need to change.
- The preferred replacement workflow is to keep the current filename and manually replace the low-quality screenshot with the genuine original photograph in the same path.
- Before replacement, audit each currently used image and record its exact path, page/section usage, and required target orientation/aspect.
- After replacement, re-test desktop and iPhone presentation at realistic rendered sizes.

## Pending issues / next-audit items

1. **Photography sharpness / original-source replacement — OPEN / PRIORITY**
   - Some currently used recovered files are screenshots of old web content rather than original uploads.
   - This is now the primary explanation for much of the blur.
   - A page-grouped staging map has now been added at `manual-photo-replacements/` with `landing/`, `about/`, `journal/`, and `shop/` groups plus a complete manifest.
   - The staging folders identify every current image by its exact filename; the canonical active files remain unchanged under `public/assets/original/2025/03/`.
   - Because the current GitHub file-writing interface is text-oriented, the actual binary copies are intentionally prepared locally rather than fabricated as text placeholders. `scripts/stage-current-photos.ps1` copies the exact current binaries into the staging folders after `git pull`.
   - `scripts/apply-photo-replacements.ps1` can copy verified staged originals back to the canonical media directory before commit/push.
   - Keep current code paths stable unless a replacement cannot safely preserve the filename.

2. **Favicon / iOS icon live verification — OPEN**
   - Custom Cô Hai Vintage icon generation is implemented.
   - Verify on the deployed production site, including browser tab/favicon and iOS Home Screen behaviour after removing/re-adding an installed shortcut.

3. **Final cross-device visual audit — OPEN**
   - Recheck desktop, tablet and iPhone after the next media replacements.
   - Pay attention to Vietnamese typography/line wrapping, hero framing, About portraits, Shop image scale and any broken image/network request.

4. **Shop image presentation — OPEN FOR VISUAL RECHECK**
   - Verify the currently mapped product images and their framing/loading on desktop and iPhone before changing mappings.

5. **Production deployment verification — OPEN**
   - Confirm the latest `main` commit is the one actually served in production before closing Phase 5.

## Known-good decisions — preserve these

- Keep genuine recovered WordPress media as the source of truth.
- Keep stable filenames/paths where possible so manual photo replacement does not require code mapping changes.
- Keep the current layout restrained; do not compensate for low-resolution source images by making them larger.
- Keep the About slideshow focused on the four founder archive portraits.
- Keep product gallery mappings stable unless a source audit proves otherwise.
- Keep motion subtle and respect reduced-motion preferences.
- Keep the bilingual EN/VI experience and Vietnamese typography refinements.
- Do not reintroduce Astra starter/demo imagery where genuine Cô Hai media exists.

## Manual photo-replacement workflow

After pulling `main`, run once:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\stage-current-photos.ps1
```

This populates:

```text
manual-photo-replacements/
  landing/
  about/
  journal/
  shop/
```

Replace the staged files with genuine originals while preserving their exact filenames. Then run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\apply-photo-replacements.ps1
```

Inspect locally, then run the normal validation commands and commit/push the verified binary replacements.

## Local workflow

```bash
git pull origin main
npm run dev
```

Before committing local changes:

```bash
npm run lint
npm run typecheck
npm run build
```

## Security rules

Do not commit SQL dumps, `wp-config.php`, passwords, API keys, `.env` files, Bluehost/cPanel backups or other secrets.

## Deployment rule

`main` is the authoritative reconstruction branch. Keep it clean and deployable; preserve recovered genuine media as the source of truth.

## Next-conversation handoff

Start the next conversation by reading this file together with `AGENTS.md`, `ORIGINAL-WORDPRESS.md`, and `MEDIA-MAPPING.md`. The immediate priority is **photography replacement and live verification**, not another broad redesign.
