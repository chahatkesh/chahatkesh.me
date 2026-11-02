/**
 * Theme & presentation-layer tokens.
 * Centralizes Tailwind class maps and visual tokens
 * that are used across multiple components.
 */

// ---------------------------------------------------------------------------
// Timeline category colors (Tailwind class maps)
// ---------------------------------------------------------------------------

export const CATEGORY_COLORS = {
  project:
    "bg-blue-500/15 text-blue-400 light:text-blue-800 border-blue-500/30",
  achievement:
    "bg-yellow-500/15 text-yellow-400 light:text-yellow-800 border-yellow-500/30",
  learning:
    "bg-green-500/15 text-green-400 light:text-green-800 border-green-500/30",
  writing:
    "bg-amber-500/15 text-amber-400 light:text-amber-800 border-amber-500/30",
  work: "bg-purple-500/15 text-purple-400 light:text-purple-800 border-purple-500/30",
  travel: "bg-pink-500/15 text-pink-400 light:text-pink-800 border-pink-500/30",
  hackathon:
    "bg-orange-500/15 text-orange-400 light:text-orange-800 border-orange-500/30",
  workshop:
    "bg-indigo-500/15 text-indigo-400 light:text-indigo-800 border-indigo-500/30",
  other: "bg-muted text-muted-foreground border-border",
} as const;

// ---------------------------------------------------------------------------
// Social platform brand colors (Tailwind hover class maps)
// ---------------------------------------------------------------------------

export const SOCIAL_BRAND_COLORS = {
  twitter: "hover:bg-[#1DA1F2]",
  github: "hover:bg-[#333]",
  linkedin: "hover:bg-[#0A66C2]",
  instagram: "hover:bg-[#E4405F]",
  youtube: "hover:bg-[#FF0000]",
  discord: "hover:bg-[#5865F2]",
  email: "hover:bg-[#EA4335]",
  buymeacoffee: "hover:bg-[#FFDD00]",
  buymeacoffeeText: "hover:text-[#f2b84b] light:hover:text-[#8a5a00]",
} as const;
