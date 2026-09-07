# Original WordPress Source

## Purpose

This document records the WordPress installations and database
archives used as source material for the Cô Hai Vintage rebuild.

The Next.js application is the new production implementation.
WordPress is treated as historical/source material.

## Current WordPress installation

Filesystem:

website_1fe948e5

Database:

zbltvdmy_WPOE1

Table prefix:

3EK_

Theme:

Astra

Page builder:

Elementor

Important pages:

- Home — ID 1355
- About — ID 1356
- Contact — ID 1357
- Portfolio — ID 1358
- Shop — ID 1705

## Historical Cô Hai installation

Filesystem:

website_988a0339

Historical database:

zbltvdmy_WPELG

Additional historical snapshots:

- zbltvdmy_WPELG-2025-03-23-7c20303.sql
- zbltvdmy_WPELG-2025-03-24-95519c8.sql

## Important finding

The current website_1fe948e5 installation contains substantial
Astra starter/demo material.

These assets must NOT automatically be treated as genuine
Cô Hai Vintage content.

The older WPELG installation contains genuine historical
Cô Hai Vintage content and should be used as the primary
historical content reference.

## Genuine historical content identified

- CÔ HAI VINTAGE
- FLEA MARKET
- AKOYA PEARL
- BERNARD ARNAULT
- COCO CHANEL
- CHANEL
- DIOR
- LOUIS VUITTON'S PATENT
- SHOP
- CART
- CHECKOUT
- MY ACCOUNT

## Media

Original historical media recovered from:

website_988a0339/wp-content/uploads/

Selected/recovered media is being migrated into:

public/assets/original/

## Rules

Do not commit raw SQL databases.

Do not commit wp-config.php or credentials.

Do not copy WordPress plugins into the Next.js application.

Do not assume Astra starter assets are Cô Hai assets.

Preserve original historical media until its relevance has
been established.