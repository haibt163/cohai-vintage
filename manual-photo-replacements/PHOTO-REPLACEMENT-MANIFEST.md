# Cô Hai Vintage — Photo Replacement Manifest

This is the exact current media set to use when sourcing genuine original photographs.

## Canonical source directory

`public/assets/original/2025/03/`

## Landing / homepage — 18 images

1. `STREET-STYLE-3.jpg`
2. `STREET-STYLE-1.jpg`
3. `CO-HAI-VINTAGE.jpg`
4. `CO-HAI-VINTAGE-1.jpg`
5. `CO-HAI-VINTAGE-2.jpg`
6. `CO-HAI-VINTAGE-3.jpg`
7. `FLEA-MARKET.jpg`
8. `MIKIMOTO-1.jpg`
9. `COCO-CHANEL.jpg`
10. `221215140542-bernard-arnault.jpg`
11. `LV-vintage-Concorde.webp`
12. `lv-concorde-1.jpg`
13. `LV-CONCORDE-2.webp`
14. `LV-NEVERFUL-MONO-MM.jpg`
15. `LV-neverfull-MM.jpg`
16. `lv-mono-neverfull-MM-3.jpg`
17. `LV-KELLY-MONO.jpg`
18. `LV-KELLY-LOCK.jpg`

## About — 4 founder portraits

- `CO-HAI-VINTAGE.jpg`
- `CO-HAI-VINTAGE-1.jpg`
- `CO-HAI-VINTAGE-2.jpg`
- `CO-HAI-VINTAGE-3.jpg`

## Journal — 5 current editorial images

- `FLEA-MARKET.jpg`
- `MIKIMOTO-1.jpg`
- `STREET-STYLE-3.jpg`
- `221215140542-bernard-arnault.jpg`
- `COCO-CHANEL.jpg`

## Shop — 8 current product/gallery images

- `LV-vintage-Concorde.webp`
- `lv-concorde-1.jpg`
- `LV-CONCORDE-2.webp`
- `LV-NEVERFUL-MONO-MM.jpg`
- `LV-neverfull-MM.jpg`
- `lv-mono-neverfull-MM-3.jpg`
- `LV-KELLY-MONO.jpg`
- `LV-KELLY-LOCK.jpg`

These cover the three current product galleries:

- Concorde — 3 images
- Neverfull MM — 3 images
- Mono Kelly — 2 images

## Replacement procedure

1. Pull the latest repository `main`.
2. Run `scripts/stage-current-photos.ps1`.
3. Use these page-grouped folders as the replacement checklist.
4. Obtain the genuine original photograph and confirm its page/section usage.
5. Rename it to the exact filename above, preserving the extension where practical.
6. Replace the staged file.
7. Run `scripts/apply-photo-replacements.ps1`.
8. If the safeguard stops, fix the staging set; do not bypass it.
9. Run the site locally and inspect desktop and iPhone-sized rendering.
10. Run `npm run lint`, `npm run typecheck`, and `npm run build`.
11. Commit and push the verified binary replacement.

## Safeguard expectations

The apply script must reject:

- unexpected/renamed staged image filenames;
- any missing approved filename;
- duplicate occurrences of the same filename whose SHA-256 contents differ.

When a filename occurs in more than one page group, all staged copies must be byte-for-byte identical. This prevents one page group from silently overwriting another group's intended replacement.

Do not change `lib/content.ts` or component mappings merely because a source photo has been replaced at the same path.

For the full reusable rationale and adaptation notes, see `PHOTO-REPLACEMENT-GUIDE.md`.
