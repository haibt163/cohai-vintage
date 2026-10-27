#!/usr/bin/env python3
"""Generate the self-hosted icon pack from the owner's original Instagram image.

Source of truth: public/instagram.jpg. No filters, retouching, text, shapes, or
brand redraws are applied. The source must be square so its framing is preserved.
Requires Python 3 and Pillow: python -m pip install Pillow
"""
from __future__ import annotations

import base64
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "public" / "instagram.jpg"
FAVICON = ROOT / "app" / "favicon.ico"
SVG_ICON = ROOT / "app" / "icon.svg"
APPLE_ICON = ROOT / "app" / "apple-icon.png"
PWA_DIR = ROOT / "public" / "icons"


def read_source() -> Image.Image:
    if not SOURCE.is_file():
        raise FileNotFoundError(f"Original profile image not found: {SOURCE}")
    with Image.open(SOURCE) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
    if image.width != image.height:
        raise ValueError(
            f"Source image must be square to preserve its full composition; got "
            f"{image.width}x{image.height}. Do not crop or redesign it automatically."
        )
    return image


def resized(image: Image.Image, size: int) -> Image.Image:
    return image.resize((size, size), Image.Resampling.LANCZOS)


def generate_svg() -> None:
    # Embed the source image so the SVG icon is self-contained and fully self-hosted.
    # The JPEG bytes are embedded unchanged; only the SVG viewport is added.
    source_bytes = SOURCE.read_bytes()
    with Image.open(SOURCE) as opened:
        width, height = opened.size
    encoded = base64.b64encode(source_bytes).decode("ascii")
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <title>Cô Hai Vintage</title>
  <image href="data:image/jpeg;base64,{encoded}" width="{width}" height="{height}" preserveAspectRatio="xMidYMid meet"/>
</svg>
'''
    SVG_ICON.write_text(svg, encoding="utf-8")


def main() -> None:
    image = read_source()
    PWA_DIR.mkdir(parents=True, exist_ok=True)
    (ROOT / "app").mkdir(parents=True, exist_ok=True)

    # One original image, resized only; each output keeps the full square framing.
    image.resize((48, 48), Image.Resampling.LANCZOS).save(
        FAVICON, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)]
    )
    generate_svg()
    resized(image, 180).save(APPLE_ICON, format="PNG", optimize=True)
    resized(image, 192).save(PWA_DIR / "icon-192.png", format="PNG", optimize=True)
    resized(image, 512).save(PWA_DIR / "icon-512.png", format="PNG", optimize=True)
    # Maskable icon uses the same full-bleed image with no added artwork or framing.
    resized(image, 512).save(PWA_DIR / "icon-maskable-512.png", format="PNG", optimize=True)

    # Fail fast if outputs are missing or the raster dimensions are incorrect.
    expected = [
        (APPLE_ICON, (180, 180)),
        (PWA_DIR / "icon-192.png", (192, 192)),
        (PWA_DIR / "icon-512.png", (512, 512)),
        (PWA_DIR / "icon-maskable-512.png", (512, 512)),
    ]
    for path, dimensions in expected:
        with Image.open(path) as output:
            if output.size != dimensions:
                raise RuntimeError(f"Incorrect output dimensions for {path}: {output.size}")
    if not FAVICON.is_file() or not SVG_ICON.is_file():
        raise RuntimeError("Favicon output generation failed")
    print("Generated favicon.ico, icon.svg, apple-icon.png, and three PWA PNGs from public/instagram.jpg.")


if __name__ == "__main__":
    main()
