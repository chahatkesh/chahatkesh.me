import { FETCH_TIMEOUT_MS } from "~/constants";

/**
 * Standard JSON fetcher for React Query / SWR.
 * Includes a timeout and throws on non-ok responses.
 */
export async function fetcher<T = unknown>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Lightweight JSON fetcher for SWR (no timeout / throw-on-error).
 * Use when callers handle their own error/loading states via SWR.
 * Public pages should use this so HTTP/edge caching stays intact.
 */
export const simpleFetcher = <T = unknown>(url: string): Promise<T> =>
  fetch(url).then((res) => res.json());

/**
 * Admin SWR fetcher — always bypasses browser/HTTP caches so the dashboard
 * reflects writes immediately. Appends `_admin=1` so edge caches treat the
 * request separately from public ISR responses.
 * Public pages should keep using `simpleFetcher`.
 */
export const adminFetcher = <T = unknown>(url: string): Promise<T> => {
  const separator = url.includes("?") ? "&" : "?";
  return fetch(`${url}${separator}_admin=1`, {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
    },
  }).then((res) => res.json());
};

/** SWR options for admin screens: always refresh, never share stale public cache. */
export const ADMIN_SWR_CONFIG = {
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  revalidateOnMount: true,
  dedupingInterval: 0,
} as const;

/**
 * POST fetcher for mutations (e.g., visitor counter increment).
 */
export async function postFetcher<T = unknown>(url: string): Promise<T> {
  return fetcher<T>(url, {
    method: "POST",
    headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
    cache: "no-store",
  });
}
