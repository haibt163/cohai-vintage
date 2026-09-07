# Cô Hai Vintage — Project Status

## Current state

The reconstruction is now through the final Phase 5 production audit and is kept deployable on `main`.

## Phase 3 — COMPLETE

- Recovered genuine editorial photography integrated from `public/assets/original/`.
- Recovered editorial subjects restored, including Flea Market, Akoya Pearl / Mikimoto, Have the Right Outfit, Bernard Arnault and Coco Chanel.
- Three Louis Vuitton product routes restored with supporting galleries.
- Product copy remains conservative: no unsupported pricing, condition, provenance or authenticity claims.
- Canonical media location remains `public/assets/original/`.

## Phase 4 — COMPLETE

- Premium editorial typography, spacing and section composition.
- Distinctive Cô Hai Vintage header/navigation and bilingual EN/VI switcher.
- Magnetic navigation interactions.
- Visible mouse parallax on editorial photography.
- High-quality image rendering with `quality={100}` on image-led experiences.
- Homepage archive slideshow using eight verified recovered image assets, with slow automatic rotation and manual controls.
- About page founder archive slideshow using all four verified `CO-HAI-VINTAGE` portrait assets.
- Shop, product, Contact and About routes visually integrated.
- Responsive mobile/tablet layouts and reduced-motion support.

## Phase 5 — COMPLETE

### Route integrity

- `/` homepage.
- `/about` founder/story page.
- `/journal` canonical editorial archive.
- `/journal/[slug]` canonical editorial articles.
- `/shop` collection.
- `/shop/[slug]` product detail routes.
- `/contact` contact flow.
- Legacy `/portfolio` routes redirect to the canonical Journal routes.
- Branded `not-found` page added.

### Image-reference audit

- Primary image-led routes use verified recovered Cô Hai media.
- Homepage and About use multiple genuine archive assets rather than repeatedly enlarging one image.
- Product/editorial images use the recovered source paths and full-quality Next image delivery.
- No guessed Louis Vuitton Patent filename was introduced.

### Interaction / responsive audit

- Scroll reveal reinitialises on Next.js client-side route changes.
- In-view content is made visible immediately after navigation, preventing the previous refresh-only behaviour.
- Mouse parallax is applied directly to image media rather than only to the ambient pointer layer.
- Slideshow controls are keyboard-accessible and automatic motion respects `prefers-reduced-motion`.
- Mobile removes desktop-only pointer effects while preserving touch-friendly controls.

### Accessibility / metadata

- Descriptive image alt text across archive and product experiences.
- Carousel controls have accessible labels and pressed state.
- Missing routes use a branded 404 experience.
- Site metadata, Open Graph defaults, Apple web-app metadata, theme colour and installable manifest configured.
- Custom Cô Hai Vintage icon replaces the default Next.js presentation and includes an iPhone-friendly Apple icon.

### Performance / validation

- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run build` passes in GitHub Actions.
- CI now validates lint, TypeScript and production build on pushes and pull requests to `main`.

## Local workflow

```bash
git pull origin main
npm run dev
```

Before committing local changes:

```bash
npm run lint
npm run typecheck
npm run build
```

## Security rules

Do not commit SQL dumps, `wp-config.php`, passwords, API keys, `.env` files, Bluehost/cPanel backups or other secrets.

## Deployment rule

`main` is the authoritative reconstruction branch. Keep it clean and deployable; make future changes through the same documented workflow and preserve recovered genuine media as the source of truth.
