# Cô Hai Vintage — Agent Instructions

## Project

This repository is the authoritative source for the modern Cô Hai Vintage website rebuild.

The project is a clean, modern Next.js implementation. Do NOT reproduce the old WordPress/Elementor/Astra implementation literally.

## Stack

- Next.js 16
- React 19
- TypeScript
- App Router
- Tailwind/CSS as already configured in the repository

## Source of truth

The recovered WordPress installation is the source for genuine Cô Hai Vintage editorial content, product information, image assets, and historical context.

Genuine recovered media is under:

`public/assets/original/`

GitHub `main` is the authoritative code source.

## Critical media rule

The current site must progressively replace all remaining Astra starter/demo/stock imagery with the genuine recovered WordPress media whenever a genuine source asset exists.

Do not choose generic stock imagery merely because it looks cleaner.

Before using an asset, inspect its actual subject and use the documented WordPress mapping in `MEDIA-MAPPING.md` and `ORIGINAL-WORDPRESS.md`.

## Editorial source material

Important genuine subjects include:

- Cô Hai Vintage founder/story
- Flea Market
- Akoya Pearl / Mikimoto
- Bernard Arnault / LVMH
- Coco Chanel
- Louis Vuitton's Patent/history
- Have the Right Outfit / style

## Product source material

Confirmed recovered vintage Louis Vuitton examples include:

- Louis Vuitton Vintage Concorde
- Louis Vuitton Monogram Neverfull MM
- Louis Vuitton Vintage Mono Kelly

Do not invent prices, stock status, condition grades, provenance, authenticity claims, measurements, or product facts that are not supported by the recovered source material.

## Design direction

The target is a premium vintage-fashion/editorial experience: elegant, restrained, image-led, contemporary, and distinctive rather than a generic template.

Future phases should prioritize:

- original WordPress photography
- strong editorial typography and hierarchy
- sophisticated spacing and composition
- immersive image presentation
- subtle hover/motion treatments
- tasteful mouse/pointer parallax where it improves the experience
- responsive mobile behaviour
- accessibility and reduced-motion support
- fast loading and sensible image sizing

Motion must remain refined. Avoid excessive animation, gimmicks, or motion that harms readability/performance.

## Phase roadmap

### Phase 3 — Authentic content and media

- Replace generic/demo media with genuine recovered WordPress imagery.
- Build editorial pages from the recovered articles.
- Build the vintage product catalogue and product detail views.
- Verify image-to-article/product mappings.

### Phase 4 — Premium visual experience

- Redesign the current generic layouts into a more distinctive Cô Hai Vintage visual system.
- Improve typography, composition, navigation, image galleries, cards, and responsive layouts.
- Add subtle mouse/pointer parallax and hover interactions.
- Respect `prefers-reduced-motion`.

### Phase 5 — Final polish and production readiness

- Audit every route and asset reference.
- Remove unused Astra/demo assets only after reference checks.
- Check mobile/tablet/desktop layouts.
- Run lint and production build.
- Check metadata, accessibility, broken links, image loading, and console errors.
- Keep GitHub `main` clean and deployable.

## Workflow

Before major changes, inspect the existing implementation and the relevant recovered source material.

After meaningful changes, run:

- `npm run lint`
- `npm run build`

Do not commit generated secrets or hosting recovery material.

## Never commit

- SQL database dumps
- `wp-config.php`
- passwords
- API keys
- `.env` secrets
- Bluehost/cPanel backup archives
- credentials or other sensitive recovery files

## Continuity instruction

At the beginning of a new conversation, read this file together with:

- `PROJECT_STATUS.md`
- `ORIGINAL-WORDPRESS.md`
- `MEDIA-MAPPING.md`

These files define the reconstruction context and current direction.
