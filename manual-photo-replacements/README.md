# Cô Hai Vintage — Manual Photo Replacement Set

This directory is the page-grouped staging map for current photographs used by the website.

Some files recovered from the old WordPress site turned out to be screenshots of the old web presentation rather than the original uploaded photographs. The application filenames/paths are therefore being preserved while genuine originals can be substituted manually.

For the reusable procedure, see the root `PHOTO-REPLACEMENT-GUIDE.md`.

## Page groups

- `landing/` — 18 current homepage archive images.
- `about/` — 4 founder images used by the About slideshow.
- `journal/` — 5 current editorial images used by Journal archive/article experiences.
- `shop/` — 8 current product/gallery images used by Shop and product-detail experiences.

The same image may intentionally appear in more than one page group. This is a page-oriented replacement map, not a new media source of truth.

## Replacement rule

Keep the exact existing filename and extension whenever possible. The canonical active media remains under:

`public/assets/original/2025/03/`

After replacing a staging image with the genuine original locally, use:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\apply-photo-replacements.ps1
```

The apply script validates the complete approved filename set before copying into the canonical directory.

## Safeguards

The apply script is intentionally fail-closed. It stops when:

1. a staged image has an unexpected filename;
2. an approved filename is missing;
3. the same filename appears in multiple groups with different SHA-256 contents.

Do not bypass these checks. If a duplicate filename has different contents, make the intended replacement identical in every page group before applying it.

The staging setup does not rename or move canonical images. This keeps the live site stable while photographic originals are being recovered.

See `PHOTO-REPLACEMENT-MANIFEST.md` for the exact filename-to-page mapping.
