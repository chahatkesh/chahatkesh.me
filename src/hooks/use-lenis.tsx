"use client";

/**
 * Native smooth-scroll hook.
 * Replaces the previous Lenis-based implementation.
 * Uses the browser's built-in scroll APIs, which respect
 * `prefers-reduced-motion` when combined with the global
 * `scroll-behavior: smooth` / `auto` CSS rules in globals.css.
 */
export function useScrollTo() {
  const scrollTo = (
    target: string | number | HTMLElement,
    options?: { offset?: number },
  ) => {
    const offset = options?.offset ?? 0;

    if (typeof target === "number") {
      window.scrollTo({ top: target + offset, behavior: "smooth" });
    } else if (typeof target === "string") {
      const element = document.querySelector(target);
      if (element) {
        const top =
          element.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return scrollTo;
}
