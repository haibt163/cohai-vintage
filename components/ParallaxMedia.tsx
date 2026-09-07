"use client";

import Image, { type ImageProps } from "next/image";
import { useRef, type PointerEvent } from "react";

type ParallaxMediaProps = ImageProps & { strength?: number; className?: string };

export function ParallaxMedia({ strength = 14, className = "", ...props }: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--parallax-x", `${x * strength}px`);
    el.style.setProperty("--parallax-y", `${y * strength}px`);
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--parallax-x", "0px");
    el.style.setProperty("--parallax-y", "0px");
  }

  return (
    <div ref={ref} className={`parallax-media ${className}`.trim()} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <Image {...props} className="parallax-image" />
    </div>
  );
}
