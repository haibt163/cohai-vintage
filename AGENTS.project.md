# Cô Hai Vintage — Project Instructions

Project-specific facts and rules. Universal rules are in `AGENTS.md`; governance in `docs/ENGINEERING_GOVERNANCE.md`; procedures in
`docs/AI_ENGINEERING_WORKFLOW.md`. This file may adapt names/paths but never weakens governance.

## 1. Project and stack

Repository: `haibt163/cohai-vintage` (public). Canonical integration branch: `main` — the protected source of record. Normal implementation
work uses a dedicated feature branch or worktree.

This repository is the authoritative source for the modern Cô Hai Vintage website rebuild (Saigon vintage-fashion/editorial + a small
vintage Louis Vuitton collection). It is a clean Next.js implementation. Do NOT reproduce the old WordPress/Elementor/Astra site literally.

- Next.js 16 (App Router), React 19, TypeScript, plain CSS layers (Tailwind is installed but currently unused — see audit D-01).
- Deployed on Vercel. `main` is the authoritative code source. Node 22.
- Bilingual EN/VI. Cookie-based locale (`cohai-locale`; default `vi`). Path-based locales are a deferred phase (audit A-02).

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
these are verified on a live deployment: photo source-resolution replacement audit · favicon and iOS Home Screen icon · desktop/tablet/iPhone
visual audit · Shop image/crop/loading recheck · production deployment/browser verification. **CI green does not close Phase 5.**

The 29 Sep 2026 audit remediation branch and its open Owner decisions are tracked in `AUDIT-2026-09-29.md`. Current status lives in
`PROJECT_STATUS.md`. Do not restart the reconstruction or begin a broad redesign unless explicitly asked.

## 7. Photography replacement workflow

1. Pull the latest `main`. 2. `scripts/stage-current-photos.ps1` to create a page-grouped staging set. 3. Find exact filename/page usage in
`manual-photo-replacements/PHOTO-REPLACEMENT-MANIFEST.md`. 4. Get the genuine original (check `archive/` first). 5. Rename to exactly match the
approved filename and extension. 6. Replace the staged copy; never rename the canonical app asset. 7. Run `scripts/apply-photo-replacements.ps1`.
8. **Never bypass a failed safeguard** (rejects unexpected names, missing approved names, and inconsistent duplicate copies via SHA-256).
9. Inspect desktop and iPhone rendering. 10. Run the standard verification set (`docs/AI_ENGINEERING_WORKFLOW.md` §12). 11. Commit only the verified binary replacements.
Do not commit staging binaries as a separate media source.

## 8. Verification commands and project-specific validation

Standard set is `docs/AI_ENGINEERING_WORKFLOW.md` §12. Additionally, for user-visible changes verify on a Vercel preview: EN and VI, desktop and iPhone width,
console/network clean, images sharp, `/portfolio` redirects, `/sitemap.xml`, `/robots.txt`, contact prefill (`/contact?piece=<product-slug>`).
After a production deploy run `node scripts/verify-deployment.mjs https://cohaivintage.com` and paste the output. For review handoffs run
`create-project-zip-universal.ps1` (includes `.git`; excludes `node_modules`, `.next`, `.env*`, and `archive/`).

## 9. Never commit

SQL dumps · `wp-config.php` · passwords · API keys · `.env` secrets · Bluehost/cPanel backups · credentials or sensitive recovery files ·
WordPress/WooCommerce logs, plugin caches, `.htaccess`/`index.php` stubs (never under `public/`) · Git-ignored generated files (`.next`, `next-env.d.ts`, `*.tsbuildinfo`).

## 10. Owner decision list (open)

Copy approval · production domain env var · Instagram URL · contact delivery method · Git-history purge policy · `archive/` retention ·
price/availability/buy path · legal pages. Details: `AUDIT-2026-09-29.md` §3.

## 11. Multi-harness engineering model

Current implementation lanes: Claude Code (`CLAUDE.md`), Codex CLI/App, OMP CLI (`.omp/AGENTS.md`, `.omp/RULES.md`). Claude Code and Codex CLI/App are
peers with the same merge-capable standing; OMP is a full implementation lane without merge authority. Review lanes: Claude Chat and ChatGPT, peers
with identical authority. Harness choice never changes scope, verification, Git rules, review or approval boundaries, or the Project Owner's authority.
The repository must stay portable across harnesses.

## 12. Approval boundary

Project Owner defines task → implementation/investigation → tests + evidence + handoff → Chief Engineer review → APPROVE from the active Chief Engineer
chat lane (either is sufficient) or the Project Owner → merge executed by the Project Owner, Claude Code or Codex CLI/App → protected `main`.

- **The author of a change never approves it** — in three-lane mode (Main Engineer → Chief Engineer → Project Owner) or two-lane mode (for audits,
  small revisions and ad hoc tasks, one chat lane authors and the other reviews). The Project Owner may override any rule when it benefits the project
  and may commit, open PRs and merge personally. See `docs/ENGINEERING_GOVERNANCE.md` §2a–§2b and §6a.
- Claude Chat currently cannot commit or open PRs itself: it hands over a Git bundle (commits keep its identity) and the Project Owner or ChatGPT pushes
  and opens the PR (`docs/AI_ENGINEERING_WORKFLOW.md` §19). Every PR states its author lane and reviewer lane.

## 13. Scope control

A task should produce the smallest correct change that meets its requirements. Do not combine unrelated refactors, dependency changes, visual redesign,
content rewriting or architecture replacement with a scoped task unless explicitly authorised. Record newly discovered unrelated issues separately
(`AUDIT-*.md` or the PR description).

## 14. Definition of done

Scope implemented or investigated · relevant verification run with output attached · important claims evidence-backed · security, data and provenance
considered · diff focused and reviewable · documentation accurate where behaviour changed · limitations explicit · Git state understood · ready for the
required review (author lane and reviewer lane named, and different).

## 15. Documentation structure

`AGENTS.md` (contract) · `AGENTS.project.md` (this file) · `CLAUDE.md` · `.omp/AGENTS.md`, `.omp/RULES.md` · `docs/ENGINEERING_GOVERNANCE.md` ·
`docs/AI_ENGINEERING_WORKFLOW.md` · `docs/PLAN-locale-routing.md` · `PROJECT_STATUS.md` (current handover) · `AUDIT-2026-09-29.md` (audit tracker) ·
`MEDIA-MAPPING.md`, `ORIGINAL-WORDPRESS.md`, `PHOTO-REPLACEMENT-GUIDE.md` (provenance and photography). Historical audits stay as evidence; do not rewrite
them to look continuous. `AGENTS.project.md` stays a concise project contract, not a duplicate of these documents.
