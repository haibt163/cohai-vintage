# Cô Hai Vintage — Project Status

## Current direction

Rebuild the Cô Hai Vintage website as a clean, modern, premium Next.js application rather than reproducing the original WordPress/Elementor/Astra implementation.

GitHub `main` is the authoritative source of truth. The recovered WordPress material remains the source for genuine editorial subjects, product information and photography.

## Current stack

- Next.js 16
- React 19
- TypeScript
- App Router
- GitHub `main` is the authoritative source of truth

## Source reconstruction

The original site was a WordPress installation using Astra + Elementor. The recovered material contains genuine Cô Hai Vintage editorial content, product information, and media.

Important editorial subjects:

- Cô Hai Vintage founder/story
- Flea Market / vintage culture
- Akoya Pearl / Mikimoto
- Bernard Arnault / LVMH
- Coco Chanel
- Louis Vuitton's Patent/history
- Have the Right Outfit / style

Recovered product examples:

- Louis Vuitton Vintage Concorde
- Louis Vuitton Monogram Neverfull MM
- Louis Vuitton Vintage Mono Kelly

## Media status

Genuine recovered media is stored under:

`public/assets/original/`

The implemented catalogue uses genuine mapped families for the founder, Flea Market, Akoya/Mikimoto, street style, Bernard Arnault and Coco Chanel subjects. Product pages use the recovered Louis Vuitton product families documented in `MEDIA-MAPPING.md`.

The previous hero used `CO-HAI-VINTAGE.jpg`, which reads as visually dark/spooky in the current browser preview. The Phase 4 hero now uses the verified `CO-HAI-VINTAGE-1.jpg` family instead. Legacy recovered Astra/demo files remain as source material and should only be removed after the Phase 5 reference audit.

## Phase 3 — status: COMPLETE

Completed:

- Genuine recovered editorial photography integrated into the site.
- Journal restored around the recovered editorial subject families.
- Coco Chanel editorial subject added using the mapped recovered image family.
- Three confirmed vintage Louis Vuitton product detail routes with image galleries.
- Product copy deliberately avoids unsupported price, condition, provenance, stock or authenticity claims.
- Image references use the canonical recovered media location.
- Editorial and product routes are statically parameterised.

The Louis Vuitton Patent/history subject remains identified in the reconstruction map, but is intentionally not assigned a guessed filename until the exact recovered WordPress attachment mapping is verified.

## Phase 4 — status: COMPLETE

Completed in the current pass:

- Premium editorial typography, spacing and layered paper-texture styling.
- More distinctive glass/sticky header and stronger navigation hierarchy.
- EN/VI language switcher using a persistent locale cookie and server-rendered translations.
- Dynamic document `lang` attribute for English/Vietnamese.
- Pointer-based magnetic navigation interactions.
- Pointer parallax image movement on hero, editorial and product imagery.
- Staggered entrance motion and reduced-motion fallback.
- Homepage rebuilt around a cleaner editorial rhythm with a non-spooky verified hero image, journal storytelling, product feature and closing statement.
- Journal landing page art-directed as an image-led editorial archive.
- Shop landing page now has a featured piece followed by the collection grid.
- About, Contact, article and product detail routes now share the same visual language and bilingual UI.
- Mobile navigation includes the language control and responsive layouts were reworked.

## Phase 5 — IN PROGRESS

Production audit now covers:

- Route and navigation review.
- Image-reference review and legacy asset cleanup planning.
- Desktop/tablet/mobile layout checks.
- Lint and production build through GitHub Actions.
- Accessibility, metadata, image loading, performance and console-error review.
- Keep `main` clean and deployable.

Do not remove legacy media until repo-wide reference checks prove it is unused.

## Local workflow

After GitHub changes are made, synchronize the Windows working copy with:

`git pull origin main`

Then run:

`npm run dev`
`npm run lint`
`npm run build`

## Security

Never commit:

- SQL database dumps
- `wp-config.php`
- passwords
- API keys
- `.env` secrets
- Bluehost/cPanel backup archives
- other sensitive recovery files

## Continuity

Phase 4 is now considered complete. Continue with the Phase 5 production audit, using:

- `AGENTS.md`
- `PROJECT_STATUS.md`
- `ORIGINAL-WORDPRESS.md`
- `MEDIA-MAPPING.md`
