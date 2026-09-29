"use client";

import { useEffect, useRef } from "react";

export function PointerAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const element = ref.current;
    if (reduceMotion || coarsePointer || !element) return;

    let frame = 0;
    let x = window.innerWidth * 0.72;
    let y = window.innerHeight * 0.28;

    // Variables are set on the atmosphere element itself (not :root) so that
    // pointer movement only invalidates styles for this one node.
    const render = () => {
      element.style.setProperty("--pointer-x", `${x}px`);
      element.style.setProperty("--pointer-y", `${y}px`);
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

  return <div ref={ref} className="pointer-atmosphere" aria-hidden="true" />;
}
