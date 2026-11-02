/** Subscribe to system appearance changes. Call from a browser effect. */
export function subscribeToColorScheme(onChange: () => void): () => void {
  const media = window.matchMedia("(prefers-color-scheme: light)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
