# Cô Hai Vintage — Project Instructions

Project-specific facts and rules. Universal rules are in `AGENTS.md`; roles and merge authority in `docs/ENGINEERING_GOVERNANCE.md`; report and review
formats in `docs/AI_ENGINEERING_WORKFLOW.md`; project commands and steps in `docs/PROJECT_PROCEDURES.md`. This file adds project facts and gates; it never
weakens the universal rules.

## 1. Project and stack

Repository: `haibt163/cohai-vintage` (public). Canonical integration branch: `main` — the protected source of record. Normal implementation
work uses a dedicated feature branch or worktree.

This repository is the authoritative source for the modern Cô Hai Vintage website rebuild (Saigon vintage-fashion/editorial + a small
vintage Louis Vuitton collection). It is a clean Next.js implementation. Do NOT reproduce the old WordPress/Elementor/Astra site literally.

- Next.js 16 (App Router), React 19, TypeScript, plain CSS layers (Tailwind is installed but currently unused — see audit D-01).
- Deployed on Vercel. `main` is the authoritative code source. Node 22.
- Bilingual EN/VI. Cookie-based locale (`cohai-locale`; default `vi`). Path-based locales are a deferred phase (audit A-02).
- **Vietnamese is the source of truth.** About 90% of target customers are Vietnamese. All Vietnamese text is written by the Project Owner and stays
  exactly as written. English is the secondary, machine-assisted version and may be improved when asked.

## 2. Architecture map

| Area | Where | Notes |
|---|---|---|
| Content model | `lib/content.ts` | `products`, `editorialPosts`, `navigation`, `getProduct`, `getEditorialPost`. Images referenced with `media("<filename>")`. |
| Localisation | `lib/i18n.ts` | `ui` dictionary (EN + VI), `getLocale`, `localizedProduct/Post`, `slideshowLabels`. **Every user-visible string needs both EN and VI.** |
| Archive imagery | `lib/archive-media.ts` | `getArchiveSlides(locale, group?)`; localised alt text; `group: "archive" \| "founder"`. |
| Site constants | `lib/site.ts` | `siteUrl` (`NEXT_PUBLIC_SITE_URL`), contact e-mail/Instagram, `absoluteUrl`. |
| Routes | `app/` | `/`, `/about`, `/journal`, `/journal/[slug]`, `/shop`, `/shop/[slug]`, `/contact`; `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `manifest.ts`, icons, branded 404. `/portfolio*` 308-redirects to `/journal*` (in `next.config.ts`). |
| Components | `components/` | Header/MobileNav, Footer, ArchiveSlideshow, ParallaxMedia, PointerAtmosphere, MagneticLink, RevealObserver, ContactForm, JsonLd, LanguageSwitcher. |
| CSS layers (import order matters) | `app/globals.css` → `motion.css` → `quality-motion.css` → `audit-fixes.css` → `a11y.css` | Later files override earlier. New accessibility overrides go in `a11y.css`. |
| Config | `next.config.ts` | Image optimiser (`qualities: [75, 90]` — every `quality` used must be listed), redirects, security headers, preview `noindex`. |
| Scripts | `scripts/` | `check-media.mjs` (CI), `stage-current-photos.ps1`, `apply-photo-replacements.ps1`. |

## 3. Media rules

- **Served media:** only files the app references live in `public/assets/original/2025/03/` (canonical). Everything in `public/` is
  publicly served.
- **Archived media:** unused recovered WordPress media is in `archive/wordpress-recovery/` (not served). Copy from there into `public/`
  with the exact expected filename only when deliberately used. Never put logs, plugin caches, dumps or `.htaccess`/`index.php`
  under `public/` (`npm run check:media` enforces it).
- Progressively replace remaining Astra starter/demo/stock imagery with genuine recovered WordPress media where a genuine asset exists.
  Do not choose stock imagery because it looks cleaner. Inspect an asset's actual subject and use `MEDIA-MAPPING.md` / `ORIGINAL-WORDPRESS.md`.

### Image-quality rule

Some recovered photographs are screenshots of the old web presentation, not the original uploads (OPEN source-quality finding). Do not hide
it with CSS enlargement, sharpening filters, fake upscaling, aggressive `quality`, or stock replacements. Preferred fix: obtain the genuine
original and replace the file **with the same filename/path** so code references do not change (`PHOTO-REPLACEMENT-GUIDE.md`).
After enabling the image optimiser, compare sharpness against production on desktop and iPhone before merging.

## 4. Content rules

Genuine editorial subjects: Cô Hai Vintage founder/story · Flea Market · Akoya Pearl / Mikimoto · Bernard Arnault / LVMH · Coco Chanel ·
Louis Vuitton's Patent/history · Have the Right Outfit / style.
Confirmed recovered products: LV Vintage Concorde · LV Monogram Neverfull MM · LV Vintage Mono Kelly.

**Do not invent** prices, stock status, condition grades, provenance, authenticity claims, measurements, dates or product facts that the
recovered source material or the Owner does not support. No `Product` structured data until real price/availability exist.
Customer-facing copy must not contain internal-draft wording ("recovered", "should be confirmed before publication", "the new site").

## 5. Design direction and protected decisions

Target: a premium vintage-fashion/editorial experience — elegant, restrained, image-led, contemporary, distinctive. Motion stays refined.
Preserve these approved decisions unless the Owner asks otherwise:

- roughly 50/50 desktop homepage hero image/text composition;
- larger immersive photography (no fake enlargement of poor sources);
- Bodoni/Didot-style editorial serif headlines;
- deliberately larger supporting/dek/body copy — do not shrink normal editorial paragraphs to 13–15px without a demonstrated device reason;
- subtle magnetic navigation and tasteful pointer parallax; responsive mobile; `prefers-reduced-motion` support;
- micro-labels (8–9px) are an open *visual* decision (audit C-03), not a bug to fix silently.

## 6. Phase roadmap and open work

Phases 3 (authentic content/media) and 4 (premium visual experience) are complete. Phase 5 is substantially complete but stays OPEN until
these are verified on a live deployment: photo source-resolution replacement audit · favicon and home-screen icons (fixed in `chore/branded-icons`, live check pending) · desktop/tablet/iPhone
visual audit · Shop image/crop/loading recheck · production deployment/browser verification. **CI green does not close Phase 5.**

The 29 Sep 2026 audit remediation branch and its open Owner decisions are tracked in `AUDIT-2026-09-29.md`. Current status lives in
`PROJECT_STATUS.md`. Do not restart the reconstruction or begin a broad redesign unless explicitly asked.

## 7. Photography replacement workflow

1. Pull the latest `main`. 2. `scripts/stage-current-photos.ps1` to create a page-grouped staging set. 3. Find exact filename/page usage in
`manual-photo-replacements/PHOTO-REPLACEMENT-MANIFEST.md`. 4. Get the genuine original (check `archive/` first). 5. Rename to exactly match the
approved filename and extension. 6. Replace the staged copy; never rename the canonical app asset. 7. Run `scripts/apply-photo-replacements.ps1`.
8. **Never bypass a failed safeguard** (rejects unexpected names, missing approved names, and inconsistent duplicate copies via SHA-256).
9. Inspect desktop and iPhone rendering. 10. Run the standard verification set (`docs/PROJECT_PROCEDURES.md` §12). 11. Commit only the verified binary replacements.
Do not commit staging binaries as a separate media source.

## 8. Verification commands and project-specific validation

Standard set is `docs/PROJECT_PROCEDURES.md` §12. Additionally, for user-visible changes verify on a Vercel preview: EN and VI, desktop and iPhone width,
console/network clean, images sharp, `/portfolio` redirects, `/sitemap.xml`, `/robots.txt`, contact prefill (`/contact?piece=<product-slug>`).
After a production deploy run `node scripts/verify-deployment.mjs https://cohaivintage.com` and paste the output. For review handoffs run
`create-project-zip-universal.ps1` (includes `.git`; excludes `node_modules`, `.next`, `.env*`, and `archive/`).

## 9. Never commit

SQL dumps · `wp-config.php` · passwords · API keys · `.env` secrets · Bluehost/cPanel backups · credentials or sensitive recovery files ·
WordPress/WooCommerce logs, plugin caches, `.htaccess`/`index.php` stubs (never under `public/`) · Git-ignored generated files (`.next`, `next-env.d.ts`, `*.tsbuildinfo`).

## 10. Owner decision list (open)

Copy approval · production domain env var · Instagram URL · contact delivery method · Git-history purge policy · `archive/` retention ·
price/availability/buy path · legal pages. Details: `AUDIT-2026-09-29.md` §3.

## 11. Sensitive boundaries and never-list

Treat as sensitive: secrets; customer contact details; business claims (price, stock, condition, provenance, authenticity, measurements);
recovered-media provenance and image quality; anything under `public/` (served to the internet); production configuration and environment variables.

Never: edit, correct, retranslate, reformat, reorder or delete any Vietnamese text unless the Project Owner explicitly says so in the task (if a task needs a new
Vietnamese string, ask the Project Owner for it; do not write or machine-translate Vietnamese) · place logs, plugin caches or dumps under `public/` · invent business facts the recovered sources or the Project Owner do not support ·
hide poor image sources with CSS tricks or present stock imagery as recovered brand material · bypass a failed safeguard (`npm run check:media`,
the photo-apply script, CI) · discard source provenance for convenience. (Never-commit items: §9.)

## 12. Owner gates

Ask the Project Owner before: changing any Vietnamese text (see §11) · publishing customer-facing copy that makes a business commitment · changing the production domain or
`NEXT_PUBLIC_SITE_URL` · adding third-party services, secrets or dependencies · purging Git history · deleting `archive/` (old WordPress photos;
copies are also kept outside the repository) · replacing approved photography · changing the approved visual direction (§5).

## 13. Project evidence rules

- Visual claims need desktop and iPhone-width renders of a Vercel preview or production. CI green is not visually verified.
- Photo changes need before/after rendering and must pass the `apply-photo-replacements.ps1` SHA-256 safeguard.
- Production claims need the deployed commit SHA matched to `main` and an observation on the live URL (`scripts/verify-deployment.mjs`).
- Business and content claims need Owner-supplied or recovered-source evidence.
- SEO/metadata claims need the rendered output (view-source, `/sitemap.xml`, `/robots.txt`, schema validator), not just code.

## 14. Documents

`AGENTS.md` (universal contract) · `AGENTS.project.md` (this file) · `CLAUDE.md` · `.omp/AGENTS.md`, `.omp/RULES.md` · `docs/ENGINEERING_GOVERNANCE.md` ·
`docs/AI_ENGINEERING_WORKFLOW.md` · `docs/PROJECT_PROCEDURES.md` · `docs/PLAN-locale-routing.md` · `PROJECT_STATUS.md` (current handover) ·
`AUDIT-2026-09-29.md` (audit tracker) · `MEDIA-MAPPING.md`, `ORIGINAL-WORDPRESS.md`, `PHOTO-REPLACEMENT-GUIDE.md` (provenance and photography).
Historical audits stay as evidence; do not rewrite them to look continuous. This file stays a concise project contract, not a copy of those documents.
