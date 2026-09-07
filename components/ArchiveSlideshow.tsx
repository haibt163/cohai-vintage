"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = { src: string; alt: string };

export function ArchiveSlideshow({ slides, interval = 6500 }: { slides: Slide[]; interval?: number }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), interval);
    return () => window.clearInterval(timer);
  }, [interval, slides.length]);

  if (!slides.length) return null;

  const move = (direction: 1 | -1) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <div className="archive-slideshow" aria-roledescription="carousel" aria-label="Cô Hai Vintage image archive">
      {slides.map((slide, index) => (
        <div className={`archive-slide ${index === active ? "is-active" : ""}`} key={slide.src} aria-hidden={index !== active}>
          <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 900px) 100vw, 52vw" priority={index === 0} />
        </div>
      ))}
      {slides.length > 1 && (
        <div className="archive-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous image">←</button>
          <div className="archive-dots" aria-label="Choose image">
            {slides.map((slide, index) => <button key={slide.src} type="button" className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Show image ${index + 1}`} aria-pressed={index === active} />)}
          </div>
          <button type="button" onClick={() => move(1)} aria-label="Next image">→</button>
        </div>
      )}
    </div>
  );
}
