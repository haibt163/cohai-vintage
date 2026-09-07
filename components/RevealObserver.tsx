"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      document.documentElement.classList.remove("motion-ready");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.02, rootMargin: "0px 0px -4% 0px" },
    );

    const reveal = (root: ParentNode) => {
      const candidates: Element[] = [];
      if (root instanceof Element && root.matches(".reveal:not(.is-visible)")) candidates.push(root);
      root.querySelectorAll<Element>(".reveal:not(.is-visible)").forEach((item) => candidates.push(item));

      candidates.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const alreadyOnScreen = rect.top < window.innerHeight && rect.bottom > 0;
        if (alreadyOnScreen) {
          item.classList.add("is-visible");
        } else {
          observer.observe(item);
        }
      });
    };

    reveal(document);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) reveal(node as Element);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const refresh = () => reveal(document);
    window.addEventListener("resize", refresh, { passive: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", refresh);
      document.documentElement.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}
