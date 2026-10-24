# photo-inbox

Drop **replacement** or **new** website photos here. Everything in this folder except this README is ignored by Git.
A photo is copied into `public/assets/original/2025/03/` by `scripts/manage-photos.ps1`, and only that copy is committed.

## Name every photo like this

`<prefix>-<topic>-<number>.<jpg|jpeg|png|webp|avif>` — lowercase letters, digits and hyphens only.

| Prefix | Use for | Example |
|---|---|---|
| `cohai-` | Founder portraits (About page + homepage archive) | `cohai-5.jpg` |
| `journal-` | A Journal article | `journal-flea-market-1.jpg` |
| `shop-` | A product gallery | `shop-concorde-4.jpg` |
| `landing-` | A photo used only on the homepage | `landing-2.jpg` |

The number counts photos within one item. It does not set display order (the code does).

## Replace a photo

Save the new photo with the **exact same filename** as the one it replaces, then put it here.
Run the script with nothing in this folder to print every current filename and where it is used.

## Add a photo

Use a new filename that follows the pattern. The script copies it in but never overwrites anything.
It then prints the small edit needed in `lib/` to actually show it on the site.

## Run it

```powershell
# 1. Preview (changes nothing)
powershell -ExecutionPolicy Bypass -File .\scripts\manage-photos.ps1

# 2. If the plan is right, apply it
powershell -ExecutionPolicy Bypass -File .\scripts\manage-photos.ps1 -Apply
```

Anything wrong (bad name, empty file, a renamed HEIC, an extension that does not match the existing file, uncommitted changes
to the file being replaced) stops the script before anything is changed. Do not work around a stop; fix the file.

Full procedure and the reasons behind it: `PHOTO-REPLACEMENT-GUIDE.md`.
