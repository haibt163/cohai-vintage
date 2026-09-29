"use client";

import Image from "next/image";
import { useEffect, useState, type PointerEvent } from "react";

type Slide = { src: string; alt: string };

export type SlideshowLabels = {
  region: string;
  previous: string;
  next: string;
  pause: string;
  play: string;
  choose: string;
  /** Contains "{n}", replaced with the 1-based slide number. */
  show: string;
  caption: string;
};

const defaultLabels: SlideshowLabels = {
  region: "Cô Hai Vintage image archive",
  previous: "Previous image",
  next: "Next image",
  pause: "Pause slideshow",
  play: "Play slideshow",
  choose: "Choose archive image",
  show: "Show image {n}",
  caption: "CÔ HAI ARCHIVE",
};

type ArchiveSlideshowProps = {
  slides: Slide[];
  interval?: number;
  labels?: SlideshowLabels;
};

export function ArchiveSlideshow({ slides, interval = 7000, labels = defaultLabels }: ArchiveSlideshowProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Autoplay stops for reduced-motion users, when the user pauses it (WCAG 2.2.2),
  // and while keyboard focus is inside the carousel. Mouse hover does NOT pause it,
  // because the hero uses hover-driven parallax.
  const playing = slides.length > 1 && !reducedMotion && !paused && !focusWithin;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [playing, interval, slides.length]);

  if (!slides.length) return null;

  function move(direction: 1 | -1) {
    setActive((current) => (current + direction + slides.length) % slides.length);
  }

  // Only the active slide and its neighbours are mounted, so the browser does not
  // download every archive image on first load. Neighbours stay mounted for the
  // cross-fade and are pre-fetched for the next advance.
  function isMounted(index: number) {
    const distance = Math.abs(index - active);
    return Math.min(distance, slides.length - distance) <= 1;
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--archive-x", `${x * 28}px`);
    event.currentTarget.style.setProperty("--archive-y", `${y * 20}px`);
  }

  function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--archive-x", "0px");
    event.currentTarget.style.setProperty("--archive-y", "0px");
  }

  return (
    <div
      className="archive-slideshow"
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocus={() => setFocusWithin(true)}
      onBlur={() => setFocusWithin(false)}
    >
      {slides.map((slide, index) =>
        isMounted(index) ? (
          <div
            className={`archive-slide ${index === active ? "is-active" : ""}`}
            key={slide.src}
            aria-hidden={index !== active}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              quality={90}
              sizes="(max-width: 900px) 100vw, 50vw"
              className="archive-slide-image"
            />
          </div>
        ) : null,
      )}

      {/* Announce slide changes only when the user is driving them (autoplay is silent). */}
      <span className="archive-caption" aria-live={playing ? "off" : "polite"}>
        {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} · {labels.caption}
      </span>

      {slides.length > 1 && (
        <div className="archive-controls">
          <button type="button" onClick={() => move(-1)} aria-label={labels.previous}>←</button>
          <div className="archive-dots" role="group" aria-label={labels.choose}>
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                className={index === active ? "active" : ""}
                onClick={() => setActive(index)}
                aria-label={labels.show.replace("{n}", String(index + 1))}
                aria-pressed={index === active}
              />
            ))}
          </div>
          {!reducedMotion && (
            <button
              type="button"
              className="archive-pause"
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? labels.play : labels.pause}
              aria-pressed={paused}
            >
              {paused ? "▶" : "❚❚"}
            </button>
          )}
          <button type="button" onClick={() => move(1)} aria-label={labels.next}>→</button>
        </div>
      )}
    </div>
  );
}
