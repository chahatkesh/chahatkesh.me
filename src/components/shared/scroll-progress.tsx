"use client";
import React from "react";
import { useScroll } from "framer-motion";
import { MotionDiv } from "./motion-wrapper";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <MotionDiv
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-ring"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
