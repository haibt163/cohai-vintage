# Cô Hai Vintage — Project Status

## Current direction

Rebuild the Cô Hai Vintage website as a clean, modern Next.js application rather than reproducing the original WordPress/Elementor/Astra implementation.

## Current stack

- Next.js 16
- React 19
- TypeScript
- App Router
- GitHub `main` is the authoritative source of truth

## Source reconstruction completed

The original site was a WordPress installation using Astra + Elementor. The recovered WordPress material contains genuine Cô Hai Vintage editorial content, product information, and media.

Important genuine editorial subjects include:

- Cô Hai Vintage founder/story
- Flea Market / vintage culture
- Akoya Pearl / Mikimoto
- Bernard Arnault / LVMH
- Coco Chanel
- Louis Vuitton patent/history
- Have the Right Outfit / style

Recovered product examples include:

- Louis Vuitton Vintage Concorde
- Louis Vuitton Monogram Neverfull MM
- Louis Vuitton Vintage Mono Kelly

## Media rule

Use genuine recovered Cô Hai media whenever appropriate.

Do not substitute Astra starter/demo imagery simply because it is visually attractive.

Recovered genuine media belongs under:

`public/assets/original/`

The earlier generic/demo assets have not yet been removed and should only be deleted after reference checks confirm they are unused.

## Current implementation

The repository contains the first modern site shell:

- Home
- About
- Journal
- Contact
- Shop
- shared navigation/footer
- central editorial/product content definitions

## Next phase

1. Catalogue genuine recovered media.
2. Replace remaining placeholder/demo image references.
3. Build the editorial pages from recovered WordPress content.
4. Build the shop/catalogue around recovered product data and imagery.
5. Remove unused demo assets after reference checks.
6. Run lint/build checks at each milestone.

## Security

Never commit:

- SQL database dumps
- `wp-config.php`
- passwords
- API keys
- Bluehost/cPanel backup archives
- other secrets