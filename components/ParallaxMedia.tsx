"use client";

import Image, { type ImageProps } from "next/image";
import { useRef, type PointerEvent } from "react";

type ParallaxMediaProps = ImageProps & { strength?: number; className?: string };

export function ParallaxMedia({ strength = 14, className = "", alt, ...props }: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty("--parallax-x", `${x * strength}px`);
    element.style.setProperty("--parallax-y", `${y * strength}px`);
  }

  function handleLeave() {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty("--parallax-x", "0px");
    element.style.setProperty("--parallax-y", "0px");
  }

  return (
    <div
      ref={ref}
      className={`parallax-media ${className}`.trim()}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <Image
        {...props}
        alt={alt}
        quality={100}
        className={`parallax-image ${props.className ?? ""}`.trim()}
      />
    </div>
  );
}
