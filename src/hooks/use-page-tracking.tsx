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

// Create a wrapper component for Suspense boundary
export function PageTrackingWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  usePageTracking();
  return <>{children}</>;
}
