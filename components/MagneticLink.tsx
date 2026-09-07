"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent, PropsWithChildren } from "react";

type MagneticLinkProps = PropsWithChildren<ComponentPropsWithoutRef<typeof Link>>;

export function MagneticLink({ children, className = "", ...props }: MagneticLinkProps) {
  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    target.style.setProperty("--magnetic-x", `${x}px`);
    target.style.setProperty("--magnetic-y", `${y}px`);
  }

  function handleLeave(event: MouseEvent<HTMLAnchorElement>) {
    const target = event.currentTarget;
    target.style.setProperty("--magnetic-x", "0px");
    target.style.setProperty("--magnetic-y", "0px");
  }

  return (
    <Link
      {...props}
      className={`magnetic-link ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </Link>
  );
}
