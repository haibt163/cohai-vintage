# Manual Photo Replacement Guide

## Purpose

This guide documents the reusable workflow for replacing low-quality recovered website photographs with genuine original files while preserving the application's existing filenames and paths.

It is intended to be portable to other projects that use the same local manual-replacement approach.

## Why this workflow exists

A recovered old website may contain images that are screenshots of the historical web presentation rather than the original uploaded photographs. A screenshot can therefore remain soft even when the application, CSS and image delivery are working correctly.

The preferred fix is a genuine source replacement, not fake sharpening or artificial enlargement.

## Core rule

**Preserve the existing filename and application path whenever practical.**

If the application currently references:

```text
public/assets/original/2025/03/example.jpg
```

the genuine replacement should normally also be named:

```text
example.jpg
```

This keeps application code and content mappings unchanged.

## Repository workflow

### 1. Pull the latest code

From Git Bash in the project directory:

```bash
git pull origin main
```

Do this before staging so the staging set matches the current canonical files.

### 2. Stage the current canonical photos

Run from the project root in PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\stage-current-photos.ps1
```

The script copies the current canonical images into page-grouped folders such as:

```text
manual-photo-replacements/
  landing/
  about/
  journal/
  shop/
```

The exact groups and filenames are project-specific and should be documented in the manifest.

### 3. Source the genuine original

For each image:

- confirm the exact page/section usage;
- confirm that the subject matches the intended content;
- obtain the genuine original photograph from the owner/archive/source;
- prefer a sufficiently large source for the intended rendered size;
- preserve the existing filename and extension wherever practical.

Do not replace an image merely because it looks soft. First confirm that the image is actually the correct asset for that page or product.

### 4. Replace the staged copy

Put the genuine original into the corresponding staging group using the exact approved filename.

Do not create a second naming convention such as `example-original.jpg` if the application already expects `example.jpg`.

### 5. Run the safeguard script

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\apply-photo-replacements.ps1
```

The script is intentionally fail-closed.

## Safeguard checks

The apply script should contain an explicit approved filename list and must stop before copying anything when a required check fails.

### Check A — No unexpected filenames

Every staged image filename must belong to the approved canonical filename list.

Examples of files that should cause a failure:

```text
example-original.jpg
example-new.jpg
example-final2.jpg
```

This prevents accidental creation of new application assets or silent mapping drift.

### Check B — Complete approved set

Every approved filename must be present in staging before the apply step proceeds.

This prevents a partial staging set from silently overwriting only some of the canonical media.

### Check C — Duplicate page-group consistency

The same canonical image may appear in multiple page groups. For example, one founder photograph can legitimately be present in both `landing/` and `about/`.

If the same filename appears more than once, every staged copy must have identical SHA-256 content.

The current Cô Hai script uses:

```powershell
Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256
```

If duplicate copies differ, the script stops and identifies the conflicting paths.

**Do not bypass this check.** Make the intended replacement identical in every group first.

### Check D — Canonical overwrite only after validation

Only after all checks pass should the script copy the staged files into:

```text
public/assets/original/2025/03/
```

The current implementation applies exactly the approved set and reports a success message after validation.

## Why SHA-256 is used

A filename alone cannot prove that two duplicate staged files are identical. SHA-256 provides a deterministic content comparison without relying on visual inspection or file timestamps.

This is especially important when one image is staged under multiple page groups.

## After the replacement

Inspect the site locally at realistic rendered sizes, especially:

- desktop/laptop;
- tablet where relevant;
- iPhone/mobile width;
- the largest intended image presentation.

Then run:

```bash
npm run lint
npm run typecheck
npm run build
```

If all checks pass, commit and push the verified binary replacement.

## What not to do

Do not:

- bypass a safeguard failure;
- rename application assets without checking all references;
- use fake upscaling as a substitute for the original;
- add sharpening filters just to disguise screenshot softness;
- replace authentic source photography with generic stock imagery;
- change `lib/content.ts` or component mappings when the filename/path is intentionally preserved;
- commit passwords, API keys, `.env` secrets, hosting backups or other sensitive recovery material.

## Reusable project adaptation

For another project, adapt only these project-specific pieces:

1. canonical media directory;
2. page/group staging directories;
3. approved filename manifest;
4. staging script's group lists;
5. apply script's approved filename list;
6. project-specific validation commands.

Keep the safety principles unchanged:

> **Exact filenames. Complete set. Duplicate copies must match. Fail closed. Validate before overwrite. Inspect after overwrite.**

## Cô Hai Vintage implementation

For this repository:

- canonical media: `public/assets/original/2025/03/`;
- staging root: `manual-photo-replacements/`;
- current page groups: `landing/`, `about/`, `journal/`, `shop/`;
- current approved set: 18 unique homepage/archive filenames, with intentional reuse across groups;
- staging helper: `scripts/stage-current-photos.ps1`;
- safeguard/apply helper: `scripts/apply-photo-replacements.ps1`;
- detailed filename/page mapping: `manual-photo-replacements/PHOTO-REPLACEMENT-MANIFEST.md`.
