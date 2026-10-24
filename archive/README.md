# archive/

Recovered WordPress media that is **not** referenced by the application and is
therefore **not served** by the website.

- `wordpress-recovery/2025/03/` — the ~885 recovered uploads that no page uses
  (e.g. `IMG_*.jpg`). Useful as a source of genuine originals when replacing
  screenshot-based photos (see `PHOTO-REPLACEMENT-GUIDE.md`).
- `wordpress-recovery/*.png|jpg` — theme/demo images from the old Astra site.

Rules
- Nothing here is bundled into the site. To use a file, save a copy under the right site filename (the name of the photo it replaces, or a new name
  following the convention in `MEDIA-MAPPING.md`), put it in `photo-inbox/` and run `scripts/manage-photos.ps1`
  (adding it to `lib/content.ts` / `lib/archive-media.ts` stays a deliberate, reviewed edit).
- Files that are used by the site stay in `public/assets/original/2025/03/`
  (the canonical location); do not move them here.
- Do not add logs, plugin caches, SQL dumps, or configuration exports.
