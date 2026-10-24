# Photo Replacement & Intake Guide

## Purpose

Replace low-quality recovered photographs with genuine originals, and add new photographs, through **one folder** (`photo-inbox/`) and **one script**
(`scripts/manage-photos.ps1`). No hard-coded filename lists, no per-page staging copies, no "all photos or nothing" rule.

The workflow is portable to other projects that keep their site photos in one directory (see "Adapting to another project").

## Why this exists

A recovered old website may contain images that are screenshots of the historical web presentation rather than the original uploads. A screenshot stays
soft even when the application, CSS and image delivery are working correctly. The right fix is a genuine source replacement, not fake sharpening or
artificial enlargement.

## Core rules

1. **The filename is the identity.** Same filename as a photo already on the site = **replace** it. New filename = **add** it (never overwrites).
2. **Names say what a photo belongs to**, not which page happens to show it (see "Naming convention"). Lowercase letters, digits and hyphens only.
3. **Check everything first; change nothing if anything is wrong.**
4. **Showing a new photo is a separate, reviewed code change** in `lib/content.ts` or `lib/archive-media.ts`. The script prints what to add; it never edits code.
5. **Git is the backup.** The script refuses to overwrite a photo that has uncommitted changes.

## Naming convention

`<prefix>-<topic>-<number>.<jpg|jpeg|png|webp|avif>`

| Prefix | Owner | Example |
|---|---|---|
| `cohai-` | Founder portraits (About page and homepage archive) | `cohai-5.jpg` |
| `journal-` | A Journal article (topic = article) | `journal-flea-market-1.jpg` |
| `shop-` | A product gallery (topic = product) | `shop-concorde-4.jpg` |
| `landing-` | A photo used only on the homepage | `landing-2.jpg` |

The number counts photos within one item. It never sets display order; the code does. A photo shown on several pages keeps one name (the homepage archive
shows all photos, so a `shop-` photo also appears there).

## Workflow

1. **Branch from current `main`:** `git pull origin main`, then create a feature branch.
2. **Find the genuine original.** Search `archive/wordpress-recovery/2025/03/` first (old WordPress filenames; the mapping to current names is in
   `MEDIA-MAPPING.md`). Confirm the subject and where the photo is used. Do not replace a photo merely because it looks soft.
3. **Name it and put it in `photo-inbox/`.** To replace: use the exact current filename (run the script with an empty inbox to list them). To add: use a new
   filename that follows the convention.
4. **Preview:** `powershell -ExecutionPolicy Bypass -File .\scripts\manage-photos.ps1` (changes nothing).
5. **Apply:** the same command with `-Apply`. It copies the photos in and runs `npm run check:media`.
6. **For every ADDED photo that should be visible:** make the small `lib/` edit the script printed, with Owner-written Vietnamese alt text where required.
7. **Inspect** locally at desktop and iPhone widths, then run `npm run lint`, `npm run typecheck`, `npm run build`.
8. **Commit** the photos and any `lib/` change on the branch and open a pull request. Empty `photo-inbox/` afterwards.

## What the script checks (before anything is copied)

| Check | Why |
|---|---|
| Name matches the convention (lowercase) | Keeps the folder consistent; avoids Windows/Linux case clashes on deploy |
| File is not empty and its content is really jpg/png/webp/avif | Catches broken files and renamed iPhone HEIC photos |
| No same-name photo with a different extension already on the site | A `.jpg` saved over a `.webp` would silently become an unused extra file while the site keeps the old one |
| Replacement target has no uncommitted changes | A second apply cannot silently destroy an earlier uncommitted replacement |
| Identical content is skipped | Re-running is safe |
| Adds never overwrite | Adding cannot clobber an existing photo |

`npm run check:media` (also run by CI) fails when code references a missing file and warns about files nothing references.

## Not supported on purpose

- **Removing a photo:** do it as a normal Git change (delete the file and its `lib/` reference). `check:media` catches a dangling reference.
- **Reusing a photo in another place:** reference the same filename again in `lib/`; nothing is duplicated.
- **Automatic edits to `lib/*.ts`:** adds extra risk for little gain; the script prints the exact entry instead.
- **More than one image per Journal article:** the content model has a single `image` field per article. A `journal-<topic>-2` photo cannot be displayed until
  the code supports it.

## What not to do

- Bypass a failed check.
- Use fake upscaling or sharpening to disguise screenshot softness.
- Replace authentic source photography with generic stock imagery.
- Commit passwords, API keys, `.env` secrets, hosting backups or other sensitive recovery material.

## Adapting to another project

Change only: the media directory (`$media`), the filename pattern (`$namePattern`), the files scanned for references (`Get-Usage`, `check-media.mjs`),
and the project's validation commands. Keep the principles: **filename is identity, check everything first, fail closed, git is the backup, inspect after.**

## Cô Hai Vintage implementation

- Media directory: `public/assets/original/2025/03/` (the only photos the site serves).
- Intake folder: `photo-inbox/` (contents ignored by Git except its README).
- Script: `scripts/manage-photos.ps1`. Naming and old-to-current filename table: `MEDIA-MAPPING.md`.
- Display mapping: `lib/content.ts` (articles, product galleries) and `lib/archive-media.ts` (homepage archive, About founder portraits).
