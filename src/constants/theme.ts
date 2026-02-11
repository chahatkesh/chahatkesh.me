/**
 * Theme & presentation-layer tokens.
 * Centralizes Tailwind class maps and visual tokens
 * that are used across multiple components.
 */

// ---------------------------------------------------------------------------
// Timeline category colors (Tailwind class maps)
// ---------------------------------------------------------------------------

export const CATEGORY_COLORS = {
  project: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  achievement: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  learning: "bg-green-500/20 text-green-400 border-green-500/30",
  work: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  travel: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  hackathon: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  workshop: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  other: "bg-gray-500/20 text-gray-400 border-gray-500/30",
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
} as const;
