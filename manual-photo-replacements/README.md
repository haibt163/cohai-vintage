# Cô Hai Vintage — Manual Photo Replacement Set

This directory is the page-grouped staging map for every current photograph used by the website.

Some files recovered from the old WordPress site turned out to be screenshots of the old web presentation rather than the original uploaded photographs. The application filenames/paths are therefore being preserved while genuine originals can be substituted manually.

## Page groups

- `landing/` — 18 current homepage archive images.
- `about/` — 4 founder images used by the About slideshow.
- `journal/` — 5 current editorial images used by Journal archive/article experiences.
- `shop/` — 8 current product/gallery images used by Shop and product-detail experiences.

The same image may intentionally appear in more than one page group. This is a page-oriented replacement map, not a new media source of truth.

## Replacement rule

Keep the exact existing filename and extension whenever possible. The canonical active media remains under:

`public/assets/original/2025/03/`

After replacing a staging image with the genuine original locally, copy the verified replacement over the matching canonical file, then commit/push. No application-code change is required when the path remains unchanged.

The repository's existing canonical images are deliberately not renamed or moved by this staging setup. This keeps the live site stable while the photographic originals are being recovered.

See `PHOTO-REPLACEMENT-MANIFEST.md` for the complete filename-to-page mapping.
