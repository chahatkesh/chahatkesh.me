/**
 * Global type augmentation for the Window object.
 * Provides type safety for globally-attached instances like Lenis.
 */
import type Lenis from "lenis";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}
