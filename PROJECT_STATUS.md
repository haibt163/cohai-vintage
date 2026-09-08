# Cô Hai Vintage — Project Status

## Current state — 8 September 2026

The modern Cô Hai Vintage reconstruction is running well on `main` and satisfies the large majority of the agreed functional and visual requirements. `main` remains the authoritative code source.

Phase 3 authentic content/media restoration and Phase 4 premium visual transformation are complete. Phase 5 production work is substantially complete, with the remaining visual/live verification items intentionally carried forward.

## Phase 3 — COMPLETE

- Genuine recovered editorial photography integrated from `public/assets/original/`.
- Recovered editorial subjects restored, including Flea Market, Akoya Pearl / Mikimoto, Have the Right Outfit, Bernard Arnault and Coco Chanel.
- Three Louis Vuitton product routes restored with supporting galleries.
- Product copy remains conservative: no unsupported pricing, condition, provenance or authenticity claims.
- Verified product galleries use the recovered Louis Vuitton assets mapped in `lib/content.ts`.

## Phase 4 — COMPLETE

- Premium editorial typography, spacing and section composition.
- Distinctive Cô Hai Vintage header/navigation and bilingual EN/VI switcher.
- Magnetic navigation interactions.
- Visible mouse parallax on editorial photography.
- Homepage archive slideshow using the verified recovered archive set, with slow automatic rotation and manual controls.
- About founder archive slideshow focused on the four verified `CO-HAI-VINTAGE` portraits.
- Shop, product, Contact and About routes visually integrated.
- Responsive mobile/tablet layouts and reduced-motion support.
- Final visual polish now includes a roughly 50/50 desktop homepage hero image/text composition, stronger pointer parallax, and a more generous editorial type hierarchy.
- Headline typography uses a Bodoni/Didot-style serif stack to create a high-end fashion-editorial feel without copying proprietary branding.
- Supporting/dek/body typography was deliberately enlarged so paragraphs are proportionate to the editorial headlines on desktop and iOS/mobile.

## Phase 5 — SUBSTANTIALLY COMPLETE

### Route integrity

- `/` homepage.
- `/about` founder/story page.
- `/journal` canonical editorial archive.
- `/journal/[slug]` canonical editorial articles.
- `/shop` collection.
- `/shop/[slug]` product detail routes.
- `/contact` contact flow.
- Legacy `/portfolio` routes redirect to canonical Journal routes.
- Branded `not-found` page added.

### Image/reference state

- Primary image-led routes use verified recovered Cô Hai media.
- Homepage and About use genuine archive assets rather than repeatedly enlarging one image.
- Product/editorial images use recovered source paths.
- Product gallery mappings are documented in `MEDIA-MAPPING.md`.

### Interaction / responsive state

- Scroll reveal reinitialises on Next.js client-side route changes.
- In-view content is made visible immediately after navigation.
- Homepage archive mouse parallax is intentionally stronger than the earlier version; shared parallax defaults were also increased while preserving restrained motion.
- Slideshow controls are keyboard-accessible and automatic motion respects `prefers-reduced-motion`.
- Mobile removes desktop-only pointer effects while preserving touch-friendly controls.

### Typography hierarchy

- Editorial headings use the Bodoni/Didot-style serif stack.
- Hero and page introductory/dek copy is larger and easier to read.
- Supporting editorial paragraphs are approximately 18px on normal layouts, with larger article body typography.
- Small metadata, navigation and caption text remains intentionally compact.
- The hierarchy is designed to avoid an excessive gap between very large headlines and tiny supporting paragraphs.

### Accessibility / metadata

- Descriptive image alt text across archive and product experiences.
- Carousel controls have accessible labels and pressed state.
- Missing routes use a branded 404 experience.
- Site metadata, Open Graph defaults, Apple web-app metadata, theme colour and installable manifest configured.
- Custom Cô Hai Vintage icon generation is implemented.

### Validation / deployment

The required local validation gate remains:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

The latest visual-polish commit `7497eae840510022989686985cf5c4a33d9e2beb` has a successful Vercel status. This confirms the GitHub-side deployment check, but local lint/typecheck/build and final device review should still be run after future local media changes.

## Photography source finding — OPEN / PRIORITY

Some recovered old-WordPress images are screenshots rather than the original uploaded photographs. This is the primary explanation for much of the remaining softness.

Do **not** solve screenshot softness primarily through CSS enlargement, sharpening filters, aggressive `quality`, fake upscaling, or stock substitutions. Prefer obtaining the genuine original and replacing the existing file while preserving its filename/path.

## Pending issues / next-audit items

1. **Photography sharpness / original-source replacement — OPEN / PRIORITY**
   - Use the page-grouped staging set under `manual-photo-replacements/`.
   - The canonical active images remain under `public/assets/original/2025/03/`.
   - `scripts/stage-current-photos.ps1` creates a fresh page-grouped staging set from the canonical files.
   - `scripts/apply-photo-replacements.ps1` contains the safeguard gate before applying staged replacements: approved filenames only, complete set required, and duplicate staged copies must have identical SHA-256 contents.
   - Follow `PHOTO-REPLACEMENT-GUIDE.md` for the reusable workflow and safeguard rules.

2. **Favicon / iOS icon live verification — OPEN**
   - Verify the custom icon on the deployed production site and on an actual iPhone after removing/re-adding the Home Screen shortcut if necessary.

3. **Final cross-device visual audit — OPEN**
   - Recheck desktop, tablet and iPhone after the next media replacements.
   - Pay attention to Vietnamese typography/line wrapping, hero framing, About portraits, Shop image scale, console errors and broken network requests.

4. **Shop image presentation — OPEN FOR VISUAL RECHECK**
   - Verify current product mappings, framing and loading on desktop and iPhone before changing mappings.

5. **Production deployment verification — OPEN**
   - Confirm the latest `main` commit is the one actually served in production before closing Phase 5.

## Known-good decisions — preserve these

- Keep genuine recovered WordPress media as the source of truth.
- Keep stable filenames/paths where possible so manual photo replacement does not require code mapping changes.
- Do not compensate for soft source images by enlarging them unnecessarily.
- Keep the About slideshow focused on the four founder archive portraits.
- Keep product gallery mappings stable unless a source audit proves otherwise.
- Keep motion subtle and respect reduced-motion preferences.
- Keep the bilingual EN/VI experience and Vietnamese typography refinements.
- Do not reintroduce Astra starter/demo imagery where genuine Cô Hai media exists.
- Preserve the enlarged supporting-copy hierarchy unless later device testing demonstrates a readability or composition problem.

## Manual photo-replacement workflow

After pulling `main`, run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\stage-current-photos.ps1
```

Replace the staged files with genuine originals using the exact approved filenames. Then run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\apply-photo-replacements.ps1
```

The apply script must finish with its validation message before the canonical files are overwritten. If it stops on an unexpected filename, missing file, or duplicate-content mismatch, fix the staging set rather than bypassing the safeguard.

Then inspect locally and run:

```bash
npm run lint
npm run typecheck
npm run build
```

Commit/push only the verified binary replacements.

For the reusable detailed procedure, see `PHOTO-REPLACEMENT-GUIDE.md`.

## Local workflow

```bash
git pull origin main
npm run dev
```

## Security rules

Do not commit SQL dumps, `wp-config.php`, passwords, API keys, `.env` files, Bluehost/cPanel backups or other secrets.

## Deployment rule

`main` is the authoritative reconstruction branch. Keep it clean and deployable; preserve recovered genuine media as the source of truth.

## Next-conversation handoff

Start the next conversation by reading `PROJECT_STATUS.md`, `AGENTS.md`, `ORIGINAL-WORDPRESS.md`, `MEDIA-MAPPING.md`, and `PHOTO-REPLACEMENT-GUIDE.md`. The immediate priority remains **photography replacement and live verification**, not another broad redesign.