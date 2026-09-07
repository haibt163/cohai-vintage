# Original WordPress — Reconstruction Notes

## Source

The previous Cô Hai Vintage website was a WordPress installation using Astra + Elementor. The recovered material contains genuine Cô Hai Vintage editorial content, product information, and media.

The old WordPress implementation is source material, not the design/template to copy.

## Recovered editorial subjects

- Cô Hai Vintage — founder/story
- Flea Market — vintage culture and second-hand reuse
- Akoya Pearl — Mikimoto, Japanese pearl cultivation and history
- Bernard Arnault — LVMH and luxury brands
- Coco Chanel — fashion and styling principles
- Louis Vuitton's Patent — Louis Vuitton history/patent material
- Have the Right Outfit — personal style and dressing

## Recovered shop material

Confirmed vintage Louis Vuitton examples include:

- Louis Vuitton Vintage Concorde
- Louis Vuitton Monogram Neverfull MM
- Louis Vuitton Vintage Mono Kelly

Additional Louis Vuitton product/history imagery is present in the recovered WordPress media.

## Brand story context

Recovered material describes Cô Hai as Vietnamese/Australian, with study and life experience in Rotterdam/Holland, Tasmania and Sydney, professional accounting experience, later fashion-business study at Orana Fashion Business College, and the founding of Cô Hai Vintage in Saigon.

Use this source carefully and preserve the substance of the original story rather than inventing biography details.

## Reconstruction principle

The modern site should preserve the genuine editorial subjects, product facts, imagery, and recognizable brand context while replacing the old Elementor/Astra implementation with a polished Next.js experience.

## Current reconstruction state

The site is now a functioning premium Next.js implementation on GitHub `main`. Phase 3 authentic content/media restoration and Phase 4 visual transformation are complete. Phase 5 is substantially complete, with a short list of live visual verification items intentionally carried forward.

The current implementation uses 18 verified recovered archive images for the homepage slideshow and four verified founder archive portraits for the About slideshow. Product galleries are mapped to the recovered Louis Vuitton assets rather than invented filenames.

## Open audit items

The following must remain visible to future contributors:

1. Recovered photographs still appear somewhat blurry/soft in the live presentation. Audit source resolution, rendered dimensions, Next image delivery, CSS scaling/cropping and device/browser behaviour before changing the media.
2. Verify the custom browser favicon and Apple/iOS Home Screen icon on the deployed production site. Previous default/missing-icon observations may be affected by deployment and browser/Home Screen caching.
3. Perform a final desktop/tablet/iPhone visual audit, including Vietnamese typography/line wrapping, hero framing, About portraits, Shop image presentation, console errors and broken network requests.
4. Recheck the earlier perceived missing Shop image; current recovered product paths are mapped, so visually verify before changing source mapping.
5. Confirm the latest GitHub `main` deployment in the production environment before closing Phase 5.

Do not mark these items complete merely because automated CI passes. They require real visual/live verification.

## Design objective for the next phases

The current implementation should remain distinctive, premium and restrained:

- genuine recovered photography
- strong art direction and typography
- editorial storytelling
- sophisticated galleries and product presentation
- subtle mouse/pointer parallax and hover motion
- responsive layouts
- reduced-motion accessibility
- fast, restrained interactions

Avoid generic template aesthetics and avoid replacing authentic source photography with stock imagery.

## Phase continuity

Phase 3: restore authentic media, articles, and catalogue content — **COMPLETE**.

Phase 4: transform the shell into the premium visual/motion experience — **COMPLETE**.

Phase 5: final route, asset, accessibility, performance, and production audit — **SUBSTANTIALLY COMPLETE; visual/live verification OPEN**.

## Security

Raw SQL exports, `wp-config.php`, hosting backups, credentials, passwords, API keys, `.env` secrets, and other sensitive recovery files stay outside GitHub.
