"use client";

import { useSyncExternalStore } from "react";

function subscribe(notify: () => void) {
  window.addEventListener("scroll", notify, { passive: true });
  window.addEventListener("resize", notify);
  return () => {
    window.removeEventListener("scroll", notify);
    window.removeEventListener("resize", notify);
  };
}

const pastTop = () => window.scrollY > 8;

export function useScrolled(getSnapshot = pastTop) {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
