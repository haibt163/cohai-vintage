# Cô Hai Vintage — Project Status

## Current state — 7 September 2026

The modern Cô Hai Vintage reconstruction is running well on `main` and satisfies the large majority of the agreed functional and visual requirements. `main` remains the authoritative, deployable source.

Phase 3 authentic content/media restoration and Phase 4 premium visual transformation are complete. Phase 5 production work is substantially complete, but a small number of visual verification items remain intentionally open for the next conversation.

## Phase 3 — COMPLETE

- Recovered genuine editorial photography integrated from `public/assets/original/`.
- Recovered editorial subjects restored, including Flea Market, Akoya Pearl / Mikimoto, Have the Right Outfit, Bernard Arnault and Coco Chanel.
- Three Louis Vuitton product routes restored with supporting galleries.
- Product copy remains conservative: no unsupported pricing, condition, provenance or authenticity claims.
- Canonical media location remains `public/assets/original/`.
- Verified product galleries currently use only the recovered Louis Vuitton assets mapped in `lib/content.ts`.

## Phase 4 — COMPLETE

- Premium editorial typography, spacing and section composition.
- Distinctive Cô Hai Vintage header/navigation and bilingual EN/VI switcher.
- Magnetic navigation interactions.
- Visible mouse parallax on editorial photography.
- High-quality image rendering with `quality={100}` on image-led experiences.
- Homepage archive slideshow using the 18 verified recovered archive images, with slow automatic rotation and manual controls.
- About page founder archive slideshow focused on the four verified `CO-HAI-VINTAGE` founder portrait assets rather than mixing unrelated editorial/product imagery.
- Shop, product, Contact and About routes visually integrated.
- Responsive mobile/tablet layouts and reduced-motion support.
- Vietnamese typography/spacing refinements added to address visible word-spacing and diacritic rendering issues.
- Hero and Shop image geometry restrained so recovered portrait photography is not unnecessarily stretched into wide crops.

## Phase 5 — SUBSTANTIALLY COMPLETE

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
- Homepage and About use genuine archive assets rather than repeatedly enlarging one image.
- Product/editorial images use the recovered source paths and full-quality Next image delivery.
- The three product galleries have been checked against the recovered filenames; no broken product image path is currently known.
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
- Custom Cô Hai Vintage generated icon routes are implemented for the browser icon and Apple/iOS icon.

### Validation

The latest GitHub Actions validation run for the current visual fixes is green:

- `npm run lint` — PASS
- `npm run typecheck` — PASS
- `npm run build` — PASS

## Pending issues / next-audit items

These items are deliberately recorded as OPEN rather than treated as finished:

1. **Recovered photography sharpness — OPEN / PRIORITY**
   - The site is using the correct recovered photographs, but the photos still look somewhat blurry/soft in the live presentation.
   - Do not replace them with stock imagery or invent higher-resolution variants.
   - Next audit should determine whether the softness comes from the recovered source resolution, browser/device rendering, Next image delivery, CSS cropping/scaling, or a combination.
   - Keep the current image sources intact until that audit is completed.

2. **Favicon / iOS icon live verification — OPEN**
   - Custom generated Cô Hai Vintage icon routes have been implemented and the production build passes.
   - Live deployment still needs browser verification because the previous Vercel/default icon and iOS missing-icon behaviour may be affected by deployment state and aggressive browser/Home Screen caching.
   - Verify desktop browser tab/favicon and iOS Home Screen icon after the latest deployment; if necessary clear/re-add the Home Screen shortcut before judging the icon.

3. **Final cross-device visual audit — OPEN**
   - Recheck the live site on desktop, tablet and iPhone after deployment.
   - Pay particular attention to Vietnamese line wrapping/diacritics, hero image framing, About portraits, Shop image scale, and any perceived missing/incorrect image.
   - Confirm there are no console errors, broken network requests, unexpected layout shifts, or browser-specific rendering regressions.

4. **Shop image perception — OPEN FOR VISUAL RECHECK**
   - The recovered product gallery filenames/paths are present and mapped correctly.
   - The earlier concern that a Shop image appeared missing may be a presentation/crop/loading issue rather than a missing source file. Recheck the live gallery visually before changing the source mapping.

5. **Production deployment verification — OPEN**
   - GitHub `main` is validated and deployable, but the final production URL should be checked after the latest commit is deployed.
   - Do not mark the above visual items closed solely because CI is green; they require real browser/device verification.

## Known good decisions — preserve these

- Keep genuine recovered WordPress media as the source of truth.
- Keep the 18 verified archive images; do not fabricate two additional images just to reach a larger slideshow count.
- Keep the About slideshow focused on the four founder archive portraits.
- Keep product gallery mappings as currently defined in `lib/content.ts` unless a source audit proves otherwise.
- Keep motion subtle and respect reduced-motion preferences.
- Keep the bilingual EN/VI experience and Vietnamese typography refinements.
- Do not reintroduce Astra starter/demo imagery where genuine Cô Hai media exists.

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

## Next-conversation handoff

Start the next conversation by reading this file together with `AGENTS.md`, `ORIGINAL-WORDPRESS.md`, and `MEDIA-MAPPING.md`. The immediate priority is **not** another broad redesign. Begin with the OPEN items above, especially the photography sharpness/source-resolution audit and live favicon/iOS verification, then perform the final cross-device visual audit before declaring Phase 5 fully closed.
