# Cô Hai Vintage — Project Status

## Current direction

Rebuild the Cô Hai Vintage website as a clean, modern, premium Next.js application rather than reproducing the original WordPress/Elementor/Astra implementation.

The current shell is functional but still too generic visually. The next work must move decisively toward the original Cô Hai Vintage identity using the recovered WordPress photography and editorial material.

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

Some legacy Astra/demo/stock imagery remains in the repository and is currently visible in parts of the site. This is NOT the desired final state.

Phase 3 onward must replace those images with the correct recovered WordPress images wherever available. Do not keep stock imagery simply because it looks attractive.

See `MEDIA-MAPPING.md` for the known media families and article/product relationships.

## Current implementation status

The repository currently has the first modern site shell with:

- Home
- About
- Journal
- Contact
- Shop
- shared navigation/footer
- central editorial/product content definitions
- editorial detail routes
- product detail routes
- responsive CSS foundation

Phase 3A code has been committed to `main`.

## User visual assessment / next objective

The current local preview was checked and is considered too generic: several pages still show stock/demo photography and the UI feels like a starter template.

The next implementation must:

1. Replace current generic/demo imagery with the genuine WordPress photographs.
2. Restore the original Cô Hai editorial articles rather than generic summaries where source material is available.
3. Improve art direction, typography, spacing, composition, image crops, and navigation.
4. Make the experience feel modern, slick, editorial, and premium rather than template-like.
5. Add tasteful mouse/pointer parallax and hover interactions where appropriate.
6. Support `prefers-reduced-motion` and avoid excessive animation.
7. Ensure mobile/tablet layouts remain polished.

## Phase roadmap

### Phase 3 — Authentic content and media

- Complete genuine WordPress media catalogue.
- Replace all visible placeholder/demo imagery where genuine source imagery exists.
- Restore the original editorial subjects and article content.
- Complete product imagery and galleries from recovered assets.
- Verify every article/product image against the WordPress mapping.

### Phase 4 — Premium redesign and motion

- Rework current generic layouts into a distinctive Cô Hai Vintage visual system.
- Introduce stronger editorial typography and visual hierarchy.
- Improve navigation/header/footer.
- Create richer image-led sections, galleries, cards, and product presentation.
- Add subtle mouse/pointer parallax, image depth, reveal, and hover effects.
- Respect reduced-motion preferences.
- Avoid gimmicky effects or performance-heavy animation.

### Phase 5 — Final polish / production readiness

- Audit every route and navigation link.
- Audit every image reference.
- Remove unused Astra/demo assets only after repository-wide reference checks.
- Check desktop, tablet and mobile layouts.
- Run lint and production build.
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

At the start of the next conversation, read:

- `AGENTS.md`
- `PROJECT_STATUS.md`
- `ORIGINAL-WORDPRESS.md`
- `MEDIA-MAPPING.md`

The next session should continue from the Phase 3 → Phase 4 → Phase 5 roadmap rather than restarting the reconstruction.
