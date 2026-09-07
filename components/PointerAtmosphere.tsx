"use client";

import { useEffect } from "react";

export function PointerAtmosphere() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || coarsePointer) return;

    let frame = 0;
    let x = window.innerWidth * 0.72;
    let y = window.innerHeight * 0.28;

    const render = () => {
      document.documentElement.style.setProperty("--pointer-x", `${x}px`);
      document.documentElement.style.setProperty("--pointer-y", `${y}px`);
      frame = 0;
    };

    const handleMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    render();
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="pointer-atmosphere" aria-hidden="true" />;
}
