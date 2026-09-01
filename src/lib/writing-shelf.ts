/**
 * Deterministic book spines for the writing shelf.
 * Each entry is dressed as a physical volume: cloth colour follows the same
 * motif that drives its cover, while thickness, height and lean come from the
 * slug hash so a piece always looks like the same book.
 */

import {
  inferWritingCoverMotif,
  type WritingCoverMotif,
} from "./writing-cover";

export type WritingSpineFinish = "cloth" | "paper" | "night";

export type WritingSpineSpec = {
  finish: WritingSpineFinish;
  /** Spine body colour. */
  cloth: string;
  /** Title / author colour. */
  ink: string;
  /** Rules, publisher mark and glow colour. */
  foil: string;
  /** Fore-edge / head colour of the page block. */
  page: string;
  /** Thickness in px, driven by reading time. */
  width: number;
  /** Height in px at desktop sizing. */
  height: number;
  /** Resting lean in degrees, so the row never looks machined. */
  tilt: number;
};

const PAGE_STOCK = ["#f4ead8", "#efe4cf", "#f7f0e2", "#e9dcc4"] as const;

/** Cloth grain as a data-URI. Lives in .ts so SWC never sees `</svg>` inside TSX. */
export const CLOTH_GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`,
)}")`;

const MOTIF_CLOTH: Record<
  WritingCoverMotif,
  { cloth: string; ink: string; foil: string }
> = {
  home: { cloth: "#b0552c", ink: "#fdf1e3", foil: "#f3c48c" },
  company: { cloth: "#9f2536", ink: "#fdeef0", foil: "#f0a5ae" },
  uncertainty: { cloth: "#403e73", ink: "#eeecfb", foil: "#b4aff1" },
  growth: { cloth: "#2f6a4f", ink: "#e9f6ee", foil: "#9fd8b5" },
  writing: { cloth: "#0f7c85", ink: "#e6f8f9", foil: "#80dce1" },
  structure: { cloth: "#2b4257", ink: "#e8f0f7", foil: "#a4c5df" },
  architecture: { cloth: "#bc7220", ink: "#fff5e6", foil: "#f8d29a" },
  backend: { cloth: "#14555c", ink: "#e6f7f7", foil: "#7acdd0" },
};

/** Mostly coloured cloth, with the occasional cream or black volume. */
const FINISH_CYCLE: WritingSpineFinish[] = [
  "cloth",
  "paper",
  "cloth",
  "night",
  "cloth",
];

const PAPER_BODY = "#e6dcc9";
const NIGHT_BODY = "#1c1f26";

function hashSlug(input: string): number {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function getWritingSpineSpec(
  slug: string,
  title: string,
  readingTime: number,
): WritingSpineSpec {
  const seed = hashSlug(slug);
  const motif = inferWritingCoverMotif(title);
  const { cloth, ink, foil } = MOTIF_CLOTH[motif];
  const finish = FINISH_CYCLE[hashSlug(`${slug}binding`) % FINISH_CYCLE.length];

  const body =
    finish === "paper" ? PAPER_BODY : finish === "night" ? NIGHT_BODY : cloth;
  const text = finish === "paper" ? cloth : finish === "night" ? foil : ink;
  const mark = finish === "paper" ? cloth : foil;

  return {
    finish,
    cloth: body,
    ink: text,
    foil: mark,
    page: PAGE_STOCK[seed % PAGE_STOCK.length],
    width: Math.min(124, 68 + readingTime * 2.5),
    height: 268 + ((seed >>> 5) % 9) * 8,
    tilt: (((seed >>> 8) % 5) - 2) * 0.7,
  };
}
