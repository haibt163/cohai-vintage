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

## Confirmed photography-source caveat

The owner confirmed during live review that some media extracted from the old WordPress site are **screenshots of the historical site presentation rather than the original uploaded photographs**. These files can therefore look soft even when the website renders them correctly.

The appropriate remedy is to replace those screenshot files with genuine originals using the same application filename/path whenever practical, rather than changing the design to hide the softness or inventing synthetic detail.

The reusable procedure and safeguards are documented in `PHOTO-REPLACEMENT-GUIDE.md`.

## Current reconstruction state

The site is now a functioning premium Next.js implementation on GitHub `main`. Phase 3 authentic content/media restoration and Phase 4 visual transformation are complete. Phase 5 is substantially complete, with a short list of live visual verification items intentionally carried forward.

The current visual direction includes an approximately 50/50 desktop homepage hero, stronger but still restrained mouse/pointer parallax, Bodoni/Didot-style editorial headlines, and enlarged supporting/dek/body typography to reduce the visual gap between very large headlines and small paragraphs. These changes are approved and should be preserved.

The homepage uses the verified recovered archive set and the About page uses four verified founder archive portraits. Product galleries are mapped to recovered Louis Vuitton assets rather than invented filenames.

## Open audit items

1. **Photography replacement / sharpness:** some recovered files are screenshots, not original uploads. Use the page-grouped replacement set and fail-closed apply script documented in `PHOTO-REPLACEMENT-GUIDE.md`.
2. Verify the custom browser favicon and Apple/iOS Home Screen icon on the deployed production site. Previous default/missing-icon observations may be affected by deployment and browser/Home Screen caching.
3. Perform a final desktop/tablet/iPhone visual audit, including Vietnamese typography/line wrapping, hero framing, About portraits, Shop image presentation, console errors and broken network requests.
4. Recheck the earlier perceived missing Shop image; current recovered product paths are mapped, so visually verify before changing source mapping.
5. Confirm the latest GitHub `main` deployment in the production environment before closing Phase 5.

Do not mark these items complete merely because automated CI passes. They require real visual/live verification.

## Recommended photo replacement workflow

Use:

```text
manual-photo-replacements/
  README.md
  PHOTO-REPLACEMENT-MANIFEST.md
  landing/
  about/
  journal/
  shop/
```

For every staged image, record the existing site filename/path, page/section usage, replacement source, pixel dimensions, and intended orientation/aspect. Rename the genuine original to match the current site filename wherever possible, then apply it using the safeguard script.

## Design objective

The implementation should remain distinctive, premium and restrained:

- genuine recovered photography
- strong art direction and typography
- editorial storytelling
- sophisticated galleries and product presentation
- subtle mouse/pointer parallax and hover motion
- responsive layouts
- reduced-motion accessibility
- fast, restrained interactions
- readable supporting copy proportionate to the large editorial headlines

Avoid generic template aesthetics and avoid replacing authentic source photography with stock imagery.

## Phase continuity

Phase 3: restore authentic media, articles, and catalogue content — **COMPLETE**.

Phase 4: transform the shell into the premium visual/motion experience — **COMPLETE**.

Phase 5: final route, asset, accessibility, performance, and production audit — **SUBSTANTIALLY COMPLETE; visual/live verification OPEN**.

## Security

Raw SQL exports, `wp-config.php`, hosting backups, credentials, passwords, API keys, `.env` secrets, and other sensitive recovery files stay outside GitHub.
