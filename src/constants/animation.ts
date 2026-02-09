/**
 * Shared animation configuration for Framer Motion.
 * Provides consistent animation behavior across all components.
 */

import type { Variants, Transition } from "framer-motion";

// --- Transitions ---

export const TRANSITION_DEFAULT: Transition = {
  duration: 0.3,
};

export const TRANSITION_FAST: Transition = {
  duration: 0.2,
};

export const TRANSITION_SLOW: Transition = {
  duration: 0.6,
};

export const TRANSITION_SPRING: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// --- Hover effects ---

export const HOVER_LIFT_SM = { y: -1 };
export const HOVER_LIFT_MD = { y: -2 };
export const HOVER_LIFT_LG = { y: -5 };
export const HOVER_SCALE_SM = { scale: 1.02 };
export const HOVER_SCALE_MD = { scale: 1.05 };

// --- Stagger helpers ---

/** Calculate stagger delay with a configurable cap */
export const getStaggerDelay = (
  index: number,
  step = 0.05,
  maxDelay = 0.3,
): number => Math.min(index * step, maxDelay);

// --- Common variants ---

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// --- Smooth scroll easing ---

/** easeOutExpo — standard smooth scroll easing curve */
export const easeOutExpo = (t: number): number =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));

// --- Lenis configuration ---

export const LENIS_CONFIG = {
  duration: 1.2,
  wheelMultiplier: 1,
  touchMultiplier: 2,
} as const;

// --- Scroll progress spring ---

export const SCROLL_SPRING_CONFIG = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
} as const;
