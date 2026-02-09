"use client";

import { useEffect, useState } from "react";
import type Lenis from "lenis";

/**
 * Hook to access the global Lenis instance
 * Useful for programmatic scrolling and scroll control
 */
export function useLenis() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const checkLenis = () => {
      const lenisInstance = window.lenis;
      if (lenisInstance) {
        setLenis(lenisInstance);
      }
    };

    // Check immediately
    checkLenis();

    // Also check after a short delay to ensure Lenis is initialized
    const timeout = setTimeout(checkLenis, 100);

    return () => clearTimeout(timeout);
  }, []);

  return lenis;
}

/**
 * Hook to programmatically scroll to a target
 */
export function useScrollTo() {
  const lenis = useLenis();

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
    },
  ) => {
    if (lenis) {
      lenis.scrollTo(target, options);
    } else {
      // Fallback to native scroll
      if (typeof target === "string") {
        const element = document.querySelector(target);
        element?.scrollIntoView({ behavior: "smooth" });
      } else if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return scrollTo;
}
