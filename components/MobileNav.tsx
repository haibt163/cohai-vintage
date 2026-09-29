"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/** <details> disclosure that closes itself after navigation (it previously stayed open). */
export function MobileNav({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [pathname]);

  return (
    <details ref={ref} className="mobile-nav">
      <summary>{label}</summary>
      {children}
    </details>
  );
}
