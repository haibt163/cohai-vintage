"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    document.documentElement.classList.add("motion-ready");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return () => document.documentElement.classList.remove("motion-ready");

    const reveal = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((item) => observer.observe(item));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    reveal(document);
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) reveal(node as Element);
      }));
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
