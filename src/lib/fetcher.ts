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
 * POST fetcher for mutations (e.g., visitor counter increment).
 */
export async function postFetcher<T = unknown>(url: string): Promise<T> {
  return fetcher<T>(url, {
    method: "POST",
    headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
    cache: "no-store",
  });
}
