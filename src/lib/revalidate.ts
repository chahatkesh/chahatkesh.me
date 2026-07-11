import { revalidatePath } from "next/cache";

const NO_STORE = "private, no-store, no-cache, must-revalidate";

/** Cache-Control for public list APIs; admin fetches pass `_admin=1` for no-store. */
export function publicListCacheControl(
  request: { nextUrl: URL },
  publicValue: string,
): string {
  return request.nextUrl.searchParams.get("_admin") === "1"
    ? NO_STORE
    : publicValue;
}

/**
 * Purge cached public API/list pages after admin mutations.
 * Public routes keep ISR/edge caching; mutations invalidate so the next
 * public request regenerates while admin fetches stay fresh via adminFetcher.
 */
export function revalidatePlacesCache() {
  revalidatePath("/api/places");
  revalidatePath("/places");
}

export function revalidateGalleryCache() {
  revalidatePath("/api/gallery");
  revalidatePath("/gallery");
  revalidatePath("/links");
}

export function revalidateExperienceGalleryCache() {
  revalidatePath("/api/experience/gallery");
  revalidatePath("/about/experience");
}
