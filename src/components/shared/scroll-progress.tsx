"use client";
import React, { useEffect, useState } from "react";
import { useSpring } from "framer-motion";
import { MotionDiv } from "./motion-wrapper";
import { SCROLL_SPRING_CONFIG } from "~/constants";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const scaleX = useSpring(scrollProgress, SCROLL_SPRING_CONFIG);

  useEffect(() => {
    const handleScroll = () => {
      const lenis = window.lenis;
      if (lenis) {
        setScrollProgress(lenis.progress);
      } else {
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
