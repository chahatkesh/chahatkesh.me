"use client";

import { useState } from "react";
import { subscribeToColorScheme } from "~/lib/color-scheme";
import useIsomorphicLayoutEffect from "~/hooks/use-isomorphic";

/** Reads a live HSL token so the colophon matches the active appearance. */
export function LiveTokenValue({ name }: { name: string }) {
  const [value, setValue] = useState(name);

  useIsomorphicLayoutEffect(() => {
    const read = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
      setValue(raw ? `hsl(${raw})` : name);
    };

    read();
    return subscribeToColorScheme(read);
  }, [name]);

  return <>{value}</>;
}
