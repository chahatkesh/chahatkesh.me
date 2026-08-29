"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "~/components/analytics";

export function usePageTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      try {
        const url = searchParams?.toString()
          ? `${pathname}?${searchParams.toString()}`
          : pathname;

        trackPageView(url);
      } catch {
        // Fallback to pathname only if searchParams fails
        trackPageView(pathname);
      }
    }
  }, [pathname, searchParams]);
}

/**
 * Must sit inside its own Suspense boundary and must NOT wrap page content.
 * `useSearchParams` forces a client-render bailout up to the nearest
 * Suspense fallback — if that fallback wraps the app, crawlers get an empty body.
 */
export function PageTracker() {
  usePageTracking();
  return null;
}
