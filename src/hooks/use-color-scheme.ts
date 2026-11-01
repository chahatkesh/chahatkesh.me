"use client";

import { useState } from "react";
import { subscribeToColorScheme } from "~/lib/color-scheme";
import useIsomorphicLayoutEffect from "./use-isomorphic";

export type ColorScheme = "light" | "dark";

/**
 * System appearance. The server and the first client render both report
 * "dark" so hydration matches; the layout effect corrects it before paint.
 * CSS tokens do not depend on this hook.
 */
export function useColorScheme(): ColorScheme {
  const [scheme, setScheme] = useState<ColorScheme>("dark");

  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const apply = () => setScheme(media.matches ? "light" : "dark");
    apply();
    return subscribeToColorScheme(apply);
  }, []);

  return scheme;
}
