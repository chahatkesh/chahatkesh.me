"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { CAROUSEL_SCROLL_AMOUNT } from "~/constants";

interface UseHorizontalScrollOptions {
  /** Pixels to scroll per click. Defaults to CAROUSEL_SCROLL_AMOUNT (340). */
  scrollAmount?: number;
}

interface UseHorizontalScrollReturn {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
}

/**
 * Shared hook for horizontal scroll carousel logic.
 * Manages scroll state, directional scroll, and button visibility.
 */
export function useHorizontalScroll(
  options: UseHorizontalScrollOptions = {},
): UseHorizontalScrollReturn {
  const { scrollAmount = CAROUSEL_SCROLL_AMOUNT } = options;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    checkScrollButtons();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollButtons, { passive: true });
      return () => el.removeEventListener("scroll", checkScrollButtons);
    }
  }, [checkScrollButtons]);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      if (scrollContainerRef.current) {
        const current = scrollContainerRef.current.scrollLeft;
        const target =
          direction === "left"
            ? current - scrollAmount
            : current + scrollAmount;
        scrollContainerRef.current.scrollTo({
          left: target,
          behavior: "smooth",
        });
      }
    },
    [scrollAmount],
  );

  const scrollLeftFn = useCallback(() => scroll("left"), [scroll]);
  const scrollRightFn = useCallback(() => scroll("right"), [scroll]);

  return {
    scrollContainerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft: scrollLeftFn,
    scrollRight: scrollRightFn,
  };
}
