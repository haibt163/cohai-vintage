# Cô Hai Vintage

Modern Next.js rebuild of the Cô Hai Vintage website, using recovered genuine WordPress editorial content, product information, and photography as source material.

## Current status

The site is running well for most agreed requirements and `main` is the authoritative project branch.

Phase 3 and Phase 4 are complete. Phase 5 is substantially complete, with a focused set of visual/live verification items intentionally carried into the next audit.

The latest visual polish includes a roughly 50/50 desktop homepage hero, stronger mouse/pointer parallax, Bodoni/Didot-style editorial headlines, and larger supporting/dek/body typography so the hierarchy remains readable rather than pairing huge headlines with tiny paragraphs.

### OPEN items

- **Photography sharpness / source replacement:** confirmed that some recovered WordPress images are screenshots rather than original uploaded photographs. Replace those files manually with genuine originals while keeping the same filenames/paths where possible. Do not solve this by fake upscaling or stock substitutions.
- **Favicon / iOS icon:** custom Cô Hai icon routes are implemented; verify on the deployed production site and on an actual iPhone after re-adding the Home Screen shortcut if necessary.
- **Final cross-device visual audit:** desktop/tablet/iPhone check for Vietnamese typography, image framing, Shop presentation, console errors and broken network requests.
- **Shop image recheck:** visually verify the current product mappings and framing after source-photo replacement before changing mappings.
- **Production deployment verification:** confirm the latest `main` build is what is actually served in production before closing Phase 5.

Do not treat CI success alone as closure for these visual items.

## Direction

This is intentionally a new implementation rather than a reproduction of the old Elementor/Astra site.

The target experience is:

- premium vintage fashion/editorial
- image-led and story-driven
- modern and distinctive
- elegant rather than template-like
- responsive across desktop, tablet and mobile
- enhanced with subtle, tasteful pointer/parallax motion

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

Keep all three checks green after meaningful code changes.

## Photography replacement workflow

Use the reusable procedure in `PHOTO-REPLACEMENT-GUIDE.md`.

Quick version:

```bash
git pull origin main
```

Then in PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\stage-current-photos.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\apply-photo-replacements.ps1
```

The apply script is deliberately fail-closed. It rejects unexpected filenames, missing approved filenames, and duplicate staged copies with different SHA-256 contents. Never bypass a failed safeguard.

Recommended staging structure:

```text
manual-photo-replacements/
  landing/
  about/
  journal/
  shop/
```

The canonical active media remains under `public/assets/original/2025/03/`. Preserve existing filenames/paths whenever possible so application code does not need to change.

## Source material

The recovered WordPress source is documented in:

- `ORIGINAL-WORDPRESS.md`
- `MEDIA-MAPPING.md`
- `PROJECT_STATUS.md`
- `AGENTS.md`
- `PHOTO-REPLACEMENT-GUIDE.md`

Genuine recovered media is under `public/assets/original/`.

## Phase roadmap

- **Phase 3:** authentic WordPress media, original editorial articles, and product catalogue restoration — complete.
- **Phase 4:** premium visual redesign, stronger art direction, and subtle mouse/pointer parallax — complete.
- **Phase 5:** final responsive, accessibility, performance, asset, route, and production audit — substantially complete; see OPEN items above.

## Continuity

For the next conversation, start with `PROJECT_STATUS.md`, then read `AGENTS.md`, `ORIGINAL-WORDPRESS.md`, `MEDIA-MAPPING.md`, and `PHOTO-REPLACEMENT-GUIDE.md`. Continue from the OPEN audit items rather than restarting the reconstruction.

## Security

Do not commit SQL dumps, `wp-config.php`, credentials, passwords, API keys, `.env` secrets, Bluehost/cPanel archives, or other sensitive recovery material.

## Deployment

The project is intended to remain deployable from GitHub `main`. Keep `main` clean and preserve recovered genuine media as the source of truth while the remaining visual/live audit items are closed.
