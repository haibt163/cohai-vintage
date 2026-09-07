"use client";

import Link, { type LinkProps } from "next/link";
import { type MouseEvent, type PropsWithChildren } from "react";

type MagneticLinkProps = PropsWithChildren<LinkProps & { className?: string }>;

export function MagneticLink({ children, className = "", ...props }: MagneticLinkProps) {
  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
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
