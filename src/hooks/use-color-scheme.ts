"use client";

import { useSyncExternalStore } from "react";
import {
  getColorScheme,
  subscribeToColorScheme,
  type ColorScheme,
} from "~/lib/color-scheme";

export type { ColorScheme } from "~/lib/color-scheme";

export function useColorScheme(): ColorScheme {
  return useSyncExternalStore(
    subscribeToColorScheme,
    getColorScheme,
    () => "dark" as const,
  );
}
