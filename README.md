# Cô Hai Vintage

Modern Next.js rebuild of the Cô Hai Vintage website, using recovered genuine WordPress editorial content, product information, and photography as source material.

## Direction

This is intentionally a new implementation rather than a reproduction of the old Elementor/Astra site.

The target experience is:

- premium vintage fashion/editorial
- image-led and story-driven
- modern and distinctive
- elegant rather than template-like
- responsive across desktop, tablet and mobile
- enhanced with subtle, tasteful pointer/parallax motion

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

## Source material

The recovered WordPress source is documented in:

- `ORIGINAL-WORDPRESS.md`
- `MEDIA-MAPPING.md`
- `PROJECT_STATUS.md`
- `AGENTS.md`

Genuine recovered media is under `public/assets/original/`.

## Phase roadmap

- **Phase 3:** authentic WordPress media, original editorial articles, and product catalogue restoration.
- **Phase 4:** premium visual redesign, stronger art direction, and subtle mouse/pointer parallax.
- **Phase 5:** final responsive, accessibility, performance, asset, route, and production audit.

## Security

Do not commit SQL dumps, `wp-config.php`, credentials, passwords, API keys, `.env` secrets, Bluehost/cPanel archives, or other sensitive recovery material.

## Deployment

The project is intended to remain deployable from GitHub `main` once the Phase 5 production checks are complete.
