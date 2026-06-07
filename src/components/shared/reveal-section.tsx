"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getStaggerDelay } from "~/constants/animation";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the reveal begins. */
  delay?: number;
}

/**
 * Wraps content in a scroll-triggered fade-up reveal.
 * Respects prefers-reduced-motion and only animates once.
 */
export function RevealSection({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
  /** Zero-based index used to compute a capped stagger delay. */
  index?: number;
}

/**
 * A single cascading item. Computes its own staggered delay from `index`.
 * Use several of these inside a normal grid to create a cascade on scroll.
 */
export function RevealCard({
  children,
  className,
  index = 0,
}: RevealItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: getStaggerDelay(index, 0.06, 0.36),
      }}
    >
      {children}
    </motion.div>
  );
}
