# Cô Hai Vintage

Modern Next.js rebuild of the Cô Hai Vintage website, using recovered genuine WordPress editorial content, product information, and photography as source material.

## Current status

The site is running well for most agreed requirements and `main` is the authoritative project branch.

Phase 3 and Phase 4 are complete. Phase 5 is substantially complete, with a small number of visual/live verification items intentionally carried into the next audit.

### OPEN items

- **Photography sharpness:** recovered photos are correct but still appear somewhat blurry/soft in places. Audit source resolution, rendered size, Next image delivery, CSS scaling/cropping and device/browser behaviour. Do not replace genuine media with stock imagery.
- **Favicon / iOS icon:** custom browser and Apple icon routes are implemented; verify them on the deployed production site, accounting for browser and iOS Home Screen caching.
- **Final cross-device visual audit:** desktop/tablet/iPhone check for Vietnamese typography, image framing, Shop presentation, console errors and broken network requests.
- **Shop image recheck:** earlier perceived missing image should be visually rechecked before changing the currently verified product mappings.
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

The latest GitHub Actions validation for the current visual fixes passes lint, typecheck and production build.

## Source material

The recovered WordPress source is documented in:

- `ORIGINAL-WORDPRESS.md`
- `MEDIA-MAPPING.md`
- `PROJECT_STATUS.md`
- `AGENTS.md`

Genuine recovered media is under `public/assets/original/`.

The homepage archive currently uses 18 verified recovered images. The About page founder slideshow uses the four verified founder archive portraits. The three Louis Vuitton product galleries use the currently verified recovered assets mapped in `lib/content.ts`.

## Phase roadmap

- **Phase 3:** authentic WordPress media, original editorial articles, and product catalogue restoration — complete.
- **Phase 4:** premium visual redesign, stronger art direction, and subtle mouse/pointer parallax — complete.
- **Phase 5:** final responsive, accessibility, performance, asset, route, and production audit — substantially complete; see OPEN items above.

## Continuity

For the next conversation, start with `PROJECT_STATUS.md`, then read `AGENTS.md`, `ORIGINAL-WORDPRESS.md`, and `MEDIA-MAPPING.md`. Continue from the OPEN audit items rather than restarting the reconstruction.

## Security

Do not commit SQL dumps, `wp-config.php`, credentials, passwords, API keys, `.env` secrets, Bluehost/cPanel archives, or other sensitive recovery material.

## Deployment

The project is intended to remain deployable from GitHub `main`. Keep `main` clean and preserve recovered genuine media as the source of truth while the remaining visual/live audit items are closed.
