# Cô Hai Vintage — Project Status

## Current state — 8 September 2026

The modern Cô Hai Vintage reconstruction is running well on `main` and satisfies the large majority of the agreed functional and visual requirements. `main` remains the authoritative code source.

Phase 3 authentic content/media restoration and Phase 4 premium visual transformation are complete. Phase 5 production work is substantially complete, with the remaining visual/live verification items intentionally carried forward.

## Audit remediation — 29 September 2026 (MERGED to `main` via PR #1, 29 Sep 2026)

A full audit and a patch set are tracked in [`AUDIT-2026-09-29.md`](AUDIT-2026-09-29.md) (finding IDs, status, evidence, Owner decisions,
verification checklist). Summary of what the branch changes: `public/` reduced from ~184 MB to the 18 referenced photos (rest moved to
`archive/`), image optimiser enabled, lazy/pausable slideshow, canonical/sitemap/robots/OG/JSON-LD, customer-facing copy, contact prefill,
accessibility layer, `check:media` CI step. PR #1 was reviewed and approved by ChatGPT and the Project Owner, then merged.

Post-merge evidence: **lint FAILED once** on the slideshow (`react-hooks` rule against `setState` in an effect) and was fixed in `169d22e`
(`useSyncExternalStore`); Vercel production deployment `8c506f9` (merge of PR #1) is **READY** and is the current `main` head (VERIFIED via the
Vercel connector). **Live-site behaviour: VERIFIED 30 Sep 2026** — the Project Owner ran `node scripts/verify-deployment.mjs https://cohaivintage.com`
(37/37 checks passed, including canonical/og:image/sitemap host, robots → sitemap, headers, redirects, JSON-LD, optimiser) and confirmed the
visual check on device; the Instagram URL is also confirmed. Not re-listed elsewhere.

## Engineering operating model — aligned to the CoHai Travel masters (30 Sep 2026)

The governance files follow the CoHai Travel master set, which the Project Owner has declared the standard for all current and future projects:
`AGENTS.md` (contract, incl. the Karpathy-derived working principles), `AGENTS.project.md` (project specifics), `CLAUDE.md`, `.omp/AGENTS.md`,
`.omp/RULES.md`, `docs/ENGINEERING_GOVERNANCE.md` and `docs/AI_ENGINEERING_WORKFLOW.md` (same names and numbering as Travel, plus Cô Hai Vintage
additions in Governance §13 and Workflow Part B). Key rules: **the author of a change never approves it**; three-lane mode (Main Engineer → Chief
Engineer → Project Owner) and two-lane mode (a chat lane authors, the other chat lane reviews) for audits and small tasks; the Project Owner may
override any rule. `create-project-zip-universal.ps1` is the review-ZIP script (includes `.git`, excludes `archive/`). Re-diff against the Travel
masters when they change.

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

0. **Post-merge verification and Owner decisions — OPEN / PRIORITY** — run `scripts/verify-deployment.mjs` against production and complete the
   checklist in `AUDIT-2026-09-29.md` §4; Owner decisions: copy approval, Instagram URL, contact delivery, archive/history policy, price/availability, legal
   pages. Next engineering phase (after verification): path-based locales, see `docs/PLAN-locale-routing.md`.

1. **Photography sharpness / original-source replacement — OPEN / PRIORITY**
   - Use the page-grouped staging set under `manual-photo-replacements/`.
   - The canonical active images remain under `public/assets/original/2025/03/`.
   - `scripts/stage-current-photos.ps1` creates a fresh page-grouped staging set from the canonical files.
   - `scripts/apply-photo-replacements.ps1` contains the safeguard gate before applying staged replacements: approved filenames only, complete set required, and duplicate staged copies must have identical SHA-256 contents.
   - Follow `PHOTO-REPLACEMENT-GUIDE.md` for the reusable workflow and safeguard rules.

2. **Favicon / home-screen icons — FIXED IN BRANCH `chore/branded-icons`, live verification OPEN**
   - Root cause (VERIFIED from the repo): `app/favicon.ico` was still the untouched create-next-app starter icon (25,931 bytes, history: "Initial commit from Create Next App") and outranked the branded dynamic icon.
   - Fix: branded `app/favicon.ico` (16/32/48), `app/icon.svg`, `app/apple-icon.png` (180), manifest icons 192/512 + 512 maskable in `public/icons/`; the old dynamic `app/icon.tsx` / `app/apple-icon.tsx` were removed. `scripts/icons/generate-icons.py` regenerates all of them.
   - After merge and deploy: run `node scripts/verify-deployment.mjs https://cohaivintage.com` (now includes icon checks), then look at the tab icon (hard refresh; browsers cache favicons for a long time) and re-add the iPhone Home Screen shortcut.

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

Do not place WordPress/WooCommerce logs, plugin caches (Astra, Spectra, WPForms, WooCommerce imports/uploads), `.htaccess`/`index.php` stubs or any other recovery artefacts under `public/`: everything in `public/` is served to the internet. `npm run check:media` (run in CI) enforces this.

## Deployment rule

`main` is the authoritative reconstruction branch. Keep it clean and deployable; preserve recovered genuine media as the source of truth.

## Next-conversation handoff

Start the next conversation by following `docs/AI_ENGINEERING_WORKFLOW.md` §10: read `docs/ENGINEERING_GOVERNANCE.md`, `AGENTS.md`, `AGENTS.project.md`, `PROJECT_STATUS.md`, `AUDIT-2026-09-29.md`, `ORIGINAL-WORDPRESS.md`, `MEDIA-MAPPING.md`, and `PHOTO-REPLACEMENT-GUIDE.md`. The immediate priority remains **photography replacement and live verification**, not another broad redesign.