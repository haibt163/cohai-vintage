# archive/

Recovered WordPress media that is **not** referenced by the application and is
therefore **not served** by the website.

- `wordpress-recovery/2025/03/` — the ~885 recovered uploads that no page uses
  (e.g. `IMG_*.jpg`). Useful as a source of genuine originals when replacing
  screenshot-based photos (see `PHOTO-REPLACEMENT-GUIDE.md`).
- `wordpress-recovery/*.png|jpg` — theme/demo images from the old Astra site.

Rules
- Nothing here is bundled into the site. To use a file, copy it to
  `public/assets/original/2025/03/` **with the exact filename the code expects**
  (or add it to `lib/content.ts` / `lib/archive-media.ts` deliberately).
- Files that are used by the site stay in `public/assets/original/2025/03/`
  (the canonical location); do not move them here.
- Do not add logs, plugin caches, SQL dumps, or configuration exports.
