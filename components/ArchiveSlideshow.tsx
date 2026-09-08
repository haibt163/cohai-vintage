"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";

type Slide = { src: string; alt: string };

type ArchiveSlideshowProps = {
  slides: Slide[];
  interval?: number;
};

export function ArchiveSlideshow({ slides, interval = 7000 }: ArchiveSlideshowProps) {
  const [active, setActive] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (slides.length < 2 || reducedMotion.current) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [interval, slides.length]);

  if (!slides.length) return null;

  function move(direction: 1 | -1) {
    setActive((current) => (current + direction + slides.length) % slides.length);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || reducedMotion.current) return;
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
      aria-label="Cô Hai Vintage image archive"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {slides.map((slide, index) => (
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
            quality={100}
            unoptimized
            sizes="(max-width: 900px) 100vw, 50vw"
            className="archive-slide-image"
          />
        </div>
      ))}

      <span className="archive-caption" aria-live="polite">
        {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} · CÔ HAI ARCHIVE
      </span>

      {slides.length > 1 && (
        <div className="archive-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous image">←</button>
          <div className="archive-dots" aria-label="Choose archive image">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                className={index === active ? "active" : ""}
                onClick={() => setActive(index)}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={index === active}
              />
            ))}
          </div>
          <button type="button" onClick={() => move(1)} aria-label="Next image">→</button>
        </div>
      )}
    </div>
  );
}
