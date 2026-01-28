"use client";
import React, { useEffect, useState } from "react";
import { useSpring } from "framer-motion";
import { MotionDiv } from "./motion-wrapper";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Add spring physics for ultra-smooth animation
  const scaleX = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Listen to Lenis scroll events for more accurate progress
    const handleScroll = () => {
      const lenis = (window as any).lenis;
      if (lenis) {
        setScrollProgress(lenis.progress);
      } else {
        // Fallback to regular scroll calculation
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MotionDiv
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-ring"
      style={{
        scaleX,
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    />
  );
};

export default ScrollProgress;
