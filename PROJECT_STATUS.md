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

The implemented Phase 3 catalogue now uses genuine mapped families for the founder, Flea Market, Akoya/Mikimoto, street style, Bernard Arnault and Coco Chanel subjects. Product pages use the recovered Louis Vuitton product families documented in `MEDIA-MAPPING.md`.

The repository still contains legacy recovered Astra/demo files because the archive itself is retained as source material. Unused legacy files should only be removed after a repository-wide reference audit in Phase 5.

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

## Phase 4 — status: IN PROGRESS

Implemented:

- Premium editorial typography and spacing system.
- More distinctive header treatment and navigation hierarchy.
- Magnetic pointer interaction for desktop navigation and reduced-motion fallback.
- Refined image hover/depth treatments.
- Stronger editorial hero and section composition.
- Product presentation and gallery proportions improved.
- Responsive mobile/tablet layouts refined.
- `prefers-reduced-motion` support added for interaction and image motion.

Remaining Phase 4 work:

- More expressive editorial art direction across the Journal and Shop landing pages.
- Additional image-led storytelling sections using verified recovered assets.
- Further refinement of mobile navigation and interaction details.
- Final cross-route visual consistency pass.

## Phase 5 — next

- Audit every route and navigation link.
- Audit every image reference and identify broken/unused references.
- Remove unused Astra/demo assets only after repository-wide reference checks.
- Check desktop, tablet and mobile layouts.
- Run lint and production build through CI.
- Check accessibility, metadata, image loading, performance and console errors.
- Keep `main` clean and deployable.

## Local workflow

After GitHub changes are made, synchronize the Windows working copy with:

`git pull origin main`

Then run the local development server with:

`npm run dev`

Before committing local changes, run:

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

The next session should continue from the Phase 4 work above, then execute the Phase 5 production audit. Read:

- `AGENTS.md`
- `PROJECT_STATUS.md`
- `ORIGINAL-WORDPRESS.md`
- `MEDIA-MAPPING.md`
