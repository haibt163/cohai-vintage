# Cô Hai Vintage — Project Status

## Current state — 22 November 2026

`main` is at `5b19f7a` (merge of PR #15, 27 October 2026). GitHub Actions run 40528017292 passed on that commit, and Vercel Production deployment `7362205430` succeeded for the same SHA. `https://cohaivintage.com` returned HTTP 200 on 22 November 2026. `main` remains the authoritative code source.

Phase 3 authentic content/media restoration and Phase 4 premium visual transformation are complete. Phase 5 production work is substantially complete, with photo-source replacement and the remaining visual/live verification items intentionally carried forward.

## Brand identity refresh — 27 October 2026 (icon pack merged)

- **VERIFIED:** The Owner's original square Cô Hai Vintage image is available as `public/instagram.jpg`; its source blob is unchanged from the supplied commit.
- **VERIFIED:** The homepage Instagram icon links to the existing shared profile URL.
- **VERIFIED:** Static assets were generated from the original image with resizing only: `app/favicon.ico` (16/32/48, RGBA frames), `app/icon.svg` (self-contained embedded source photo), `app/apple-icon.png` (180×180), and `public/icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (512×512).
- **VERIFIED:** The icon-generation run succeeded: https://github.com/haibt163/cohai-vintage/actions/runs/40452150446. The temporary workflow used for generation was removed; generated static assets and the reusable generator remain.
- **IMPLEMENTED:** `scripts/icons/generate-icons.py` uses `public/instagram.jpg` as its sole source, validates square framing, and checks raster output dimensions. Next.js discovers the icon files under `app/` automatically; the PWA manifest continues to reference the three self-hosted PNGs.
- **VERIFIED:** After the RGBA correction, GitHub Actions PR validation passed lint, typecheck, production build, media checks, translation parity, and the advisory dependency audit on commit `1a7a7ad8a84b920c47fcfd5ac02ed08996f10fc5`: https://github.com/haibt163/cohai-vintage/actions/runs/40452327573.
- **UNVERIFIED:** Desktop/iPhone/Android visual checks have not been performed. PR #13 is merged and deployed in `5b19f7a`; confirm the favicon and Home Screen icon on a device.

## Audit remediation — 29 September 2026 (MERGED to `main` via PR #1, 29 Sep 2026)

A full audit and a patch set are tracked in [`AUDIT-2026-09-29.md`](AUDIT-2026-09-29.md) (finding IDs, status, evidence, Owner decisions,
verification checklist). Summary of what the branch changes: `public/` reduced from ~184 MB to the 18 referenced photos (rest moved to
`archive/`), image optimiser enabled, lazy/pausable slideshow, canonical/sitemap/robots/OG/JSON-LD, customer-facing copy, contact prefill,
accessibility layer, `check:media` CI step. PR #1 was reviewed and approved by ChatGPT and the Project Owner, then merged.

Post-merge evidence: **lint FAILED once** on the slideshow (`react-hooks` rule against `setState` in an effect) and was fixed in `169d22e`
(`useSyncExternalStore`); Vercel production deployment `8c506f9` (merge of PR #1) was **READY** at that time (VERIFIED via the
Vercel connector); current deployment evidence is at the top of this document. **Live-site behaviour: VERIFIED 30 Sep 2026** — the Project Owner ran `node scripts/verify-deployment.mjs https://cohaivintage.com`
(37/37 checks passed, including canonical/og:image/sitemap host, robots → sitemap, headers, redirects, JSON-LD, optimiser) and confirmed the
visual check on device; the Instagram URL is also confirmed. Not re-listed elsewhere.

## Engineering governance — 22 November 2026

The Project Owner adopted a single harness-neutral standard in `docs/ENGINEERING_GOVERNANCE.md`. Any harness may serve as Main Engineer; every change uses a pull request from a sub-branch; only the Owner's approval on record authorizes a merge; Chief Engineer review is advisory; the Owner chooses two-lane or three-lane mode per task. The 30 September master alignment is superseded.

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

The visual-polish commit `7497eae840510022989686985cf5c4a33d9e2beb` had a successful Vercel status at that time. That confirms the GitHub-side deployment check, but local lint/typecheck/build and final device review should still be run after future local media changes; current CI and deployment evidence is at the top of this document.

## Photography source finding — OPEN / PRIORITY

Some recovered old-WordPress images are screenshots rather than the original uploaded photographs. This is the primary explanation for much of the remaining softness.

Do **not** solve screenshot softness primarily through CSS enlargement, sharpening filters, aggressive `quality`, fake upscaling, or stock substitutions. Prefer obtaining the genuine original and replacing the existing file while preserving its filename/path.

## Pending issues / next-audit items

0. **Owner decisions — OPEN / PRIORITY** — Owner decisions: copy approval, contact delivery, archive/history policy, price/availability, legal
   pages. The 30 September live-site run passed and the Instagram URL is confirmed; complete any remaining checklist items in `AUDIT-2026-09-29.md`
   §4. Next engineering phase: path-based locales, see `docs/PLAN-locale-routing.md`.

1. **Photography sharpness / original-source replacement — OPEN / PRIORITY**
   - Put genuine originals in `photo-inbox/` and run `scripts/manage-photos.ps1` (preview, then `-Apply`). Replace = same filename as the current photo; add = new filename following the convention in `MEDIA-MAPPING.md`.
   - The canonical active images remain under `public/assets/original/2025/03/` (renamed to purpose-based names; old-to-current table in `MEDIA-MAPPING.md`).
   - Any number of photos can be processed at once; the script checks everything first and changes nothing on any problem.
   - Follow `PHOTO-REPLACEMENT-GUIDE.md` for the reusable workflow and safeguard rules.

2. **Favicon / home-screen icons — MERGED AND DEPLOYED (PR #13); live visual verification OPEN**
   - Root cause (VERIFIED from the repo): `app/favicon.ico` was still the untouched create-next-app starter icon (25,931 bytes, history: "Initial commit from Create Next App") and outranked the branded dynamic icon.
   - Fix: branded `app/favicon.ico` (16/32/48), `app/icon.svg`, `app/apple-icon.png` (180), manifest icons 192/512 + 512 maskable in `public/icons/`; the old dynamic `app/icon.tsx` / `app/apple-icon.tsx` were removed. `scripts/icons/generate-icons.py` regenerates all of them.
   - The fix is deployed in `5b19f7a`: run `node scripts/verify-deployment.mjs https://cohaivintage.com` (includes icon checks), then look at the tab icon (hard refresh; browsers cache favicons for a long time) and re-add the iPhone Home Screen shortcut.

3. **Final cross-device visual audit — OPEN**
   - Recheck desktop, tablet and iPhone after the next media replacements.
   - Pay attention to Vietnamese typography/line wrapping, hero framing, About portraits, Shop image scale, console errors and broken network requests.

4. **Shop image presentation — OPEN FOR VISUAL RECHECK**
   - Verify current product mappings, framing and loading on desktop and iPhone before changing mappings.

5. **Production deployment — VERIFIED for `5b19f7a`; visual check OPEN**
   - Vercel Production deployment `7362205430` was built from `5b19f7a`; the live origin returned HTTP 200 on 22 November 2026. Desktop/iPhone rendering remains UNVERIFIED.

## Known-good decisions — preserve these

- Keep genuine recovered WordPress media as the source of truth.
- Keep filenames stable: a replacement photo uses the same filename as the photo it replaces, so no code mapping changes (names follow the convention in `MEDIA-MAPPING.md`).
- Do not compensate for soft source images by enlarging them unnecessarily.
- Keep the About slideshow focused on the four founder archive portraits.
- Keep product gallery mappings stable unless a source audit proves otherwise.
- Keep motion subtle and respect reduced-motion preferences.
- Keep the bilingual EN/VI experience and Vietnamese typography refinements.
- Do not reintroduce Astra starter/demo imagery where genuine Cô Hai media exists.
- Preserve the enlarged supporting-copy hierarchy unless later device testing demonstrates a readability or composition problem.

## Manual photo-replacement workflow

Put replacement or new photos in `photo-inbox/` (replacement = exact current filename; new photo = new filename following the convention), then run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\manage-photos.ps1          # preview, changes nothing
powershell -ExecutionPolicy Bypass -File .\scripts\manage-photos.ps1 -Apply   # apply, then runs npm run check:media
```

If the script stops (bad name, empty or renamed file, extension mismatch, uncommitted changes to the target), fix the inbox rather than bypassing the safeguard.
A newly added photo is not shown until a reviewed edit is made in `lib/content.ts` or `lib/archive-media.ts` (the script prints it).

Then inspect locally and run:

```bash
npm run lint
npm run typecheck
npm run build
```

Commit the photos (and any `lib/` change) on a branch and open a pull request.

For the reusable detailed procedure, see `PHOTO-REPLACEMENT-GUIDE.md`.

## Local workflow

```bash
git pull origin main
npm run dev
```

## Security rules

Do not commit SQL dumps, `wp-config.php`, passwords, API keys, `.env` files, Bluehost/cPanel backups or other secrets.

Do not place WordPress/WooCommerce logs, plugin caches (Astra, Spectra, WPForms, WooCommerce imports/uploads), `.htaccess`/`index.php` stubs or any other recovery artefacts under `public/`: everything in `public/` is served to the internet. `npm run check:media` (run in CI) enforces this.

## Deployment rule

`main` is the authoritative reconstruction branch. Keep it clean and deployable; preserve recovered genuine media as the source of truth.

## Next-conversation handoff

Start the next conversation by reading `docs/ENGINEERING_GOVERNANCE.md`, `AGENTS.md`, `AGENTS.project.md`, `PROJECT_STATUS.md`, `AUDIT-2026-09-29.md`, `ORIGINAL-WORDPRESS.md`, `MEDIA-MAPPING.md`, and `PHOTO-REPLACEMENT-GUIDE.md`. The immediate priority remains **photography replacement and live verification**, not another broad redesign.