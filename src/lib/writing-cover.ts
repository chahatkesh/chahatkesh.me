/**
 * Deterministic editorial covers for writing entries.
 * Motif is inferred from the title so the image belongs to the piece,
 * then drawn as a quiet line illustration — no stored assets.
 */

export const WRITING_COVER_VIEWBOX = { width: 1600, height: 900 } as const;

export const WRITING_COVER_PALETTES = {
  brass: {
    bg: "#0f0d0a",
    paper: "#ebe4d6",
    accent: "#c4a36a",
    mute: "#4a3f32",
    soft: "#221e18",
  },
  rose: {
    bg: "#100b0d",
    paper: "#ece2e4",
    accent: "#c48793",
    mute: "#4a3338",
    soft: "#221618",
  },
  iris: {
    bg: "#0d0b11",
    paper: "#e4e0ea",
    accent: "#9a8cbf",
    mute: "#3d364c",
    soft: "#1a1722",
  },
  sage: {
    bg: "#0b0f0c",
    paper: "#dfe8e1",
    accent: "#7aa384",
    mute: "#33473a",
    soft: "#151c17",
  },
  teal: {
    bg: "#0b0d0d",
    paper: "#e7e2d8",
    accent: "#00adb5",
    mute: "#3e4f50",
    soft: "#1a2424",
  },
  slate: {
    bg: "#0a0d11",
    paper: "#dce3ea",
    accent: "#7f9db8",
    mute: "#33404c",
    soft: "#151b22",
  },
} as const;

export const WRITING_COVER_MOTIFS = [
  "home",
  "company",
  "uncertainty",
  "growth",
  "writing",
  "structure",
  "backend",
] as const;

export type WritingCoverMotif = (typeof WRITING_COVER_MOTIFS)[number];
export type WritingCoverPalette =
  (typeof WRITING_COVER_PALETTES)[keyof typeof WRITING_COVER_PALETTES];

const MOTIF_PALETTE: Record<
  WritingCoverMotif,
  keyof typeof WRITING_COVER_PALETTES
> = {
  home: "brass",
  company: "rose",
  uncertainty: "iris",
  growth: "sage",
  writing: "teal",
  structure: "slate",
  backend: "teal",
};

export type WritingCoverSpec = {
  motif: WritingCoverMotif;
  palette: WritingCoverPalette;
  seed: number;
};

function hashString(input: string): number {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function inferWritingCoverMotif(title: string): WritingCoverMotif {
  const text = title.toLowerCase();

  if (/(home|hostel|heart|house)/.test(text)) return "home";
  if (/(company|friend|greatness|together)/.test(text)) return "company";
  if (/(know|anything|uncertain|figured)/.test(text)) return "uncertainty";
  if (/(shape|codebase|folder|structure)/.test(text)) return "structure";
  if (/(backend|server|request)/.test(text)) return "backend";
  if (/(grow|learn|start)/.test(text)) return "growth";
  if (/(writ|essay|note)/.test(text)) return "writing";

  return "growth";
}

export function getWritingCoverSpec(
  slug: string,
  title: string,
): WritingCoverSpec {
  const motif = inferWritingCoverMotif(title);

  return {
    motif,
    palette: WRITING_COVER_PALETTES[MOTIF_PALETTE[motif]],
    seed: hashString(slug),
  };
}

function coverId(slug: string, name: string) {
  return `wc-${slug}-${name}`;
}

function motifMarkup(spec: WritingCoverSpec, width: number, height: number) {
  const { palette, motif } = spec;
  const cx = width / 2;
  const cy = height / 2;

  switch (motif) {
    case "home": {
      // Two dwellings on one ground line: home (left, gabled) and hostel (right, institutional).
      const ground = cy + 125;
      return `
        <line x1="${cx - 340}" y1="${ground}" x2="${cx + 340}" y2="${ground}" stroke="${palette.paper}" stroke-opacity="0.28" stroke-width="1.25" />
        <path d="M ${cx - 250} ${ground} L ${cx - 250} ${ground - 150} L ${cx - 140} ${ground - 250} L ${cx - 30} ${ground - 150} L ${cx - 30} ${ground}" fill="none" stroke="${palette.paper}" stroke-opacity="0.82" stroke-width="1.75" stroke-linejoin="round" />
        <rect x="${cx - 168}" y="${ground - 108}" width="36" height="36" fill="${palette.accent}" />
        <path d="M ${cx + 70} ${ground} L ${cx + 70} ${ground - 200} L ${cx + 250} ${ground - 200} L ${cx + 250} ${ground}" fill="none" stroke="${palette.paper}" stroke-opacity="0.55" stroke-width="1.5" />
        <rect x="${cx + 108}" y="${ground - 150}" width="28" height="28" fill="none" stroke="${palette.mute}" stroke-width="1.25" />
        <rect x="${cx + 184}" y="${ground - 150}" width="28" height="28" fill="none" stroke="${palette.mute}" stroke-width="1.25" />
        <line x1="${cx - 30}" y1="${ground}" x2="${cx + 70}" y2="${ground}" stroke="${palette.accent}" stroke-width="2" />
      `;
    }
    case "company": {
      // A person at the center, shaped by the people kept close.
      const people = [
        { x: cx, y: cy, r: 78, filled: false, hub: true },
        { x: cx - 210, y: cy - 40, r: 46, filled: false },
        { x: cx + 200, y: cy - 70, r: 40, filled: true },
        { x: cx - 90, y: cy + 170, r: 36, filled: false },
        { x: cx + 150, y: cy + 150, r: 42, filled: false },
      ] as const;

      const links = people
        .filter((person) => !("hub" in person && person.hub))
        .map(
          (person) =>
            `<line x1="${cx}" y1="${cy}" x2="${person.x}" y2="${person.y}" stroke="${palette.mute}" stroke-opacity="0.55" stroke-width="1" />`,
        )
        .join("");

      const nodes = people
        .map((person) =>
          person.filled
            ? `<circle cx="${person.x}" cy="${person.y}" r="${person.r}" fill="${palette.accent}" />`
            : `<circle cx="${person.x}" cy="${person.y}" r="${person.r}" fill="none" stroke="${palette.paper}" stroke-opacity="${"hub" in person ? 0.9 : 0.55}" stroke-width="${"hub" in person ? 1.75 : 1.4}" />`,
        )
        .join("");

      return `${links}${nodes}`;
    }
    case "uncertainty": {
      // An unfinished orbit — the step taken before the path is known.
      const radius = 230;
      const gap = (42 * Math.PI) / 180;
      const start = -Math.PI / 2 + gap / 2;
      const end = -Math.PI / 2 - gap / 2 + Math.PI * 2;
      const sx = cx + Math.cos(start) * radius;
      const sy = cy + Math.sin(start) * radius;
      const ex = cx + Math.cos(end) * radius;
      const ey = cy + Math.sin(end) * radius;
      const dotAngle = -Math.PI / 2;
      const dotR = radius + 36;
      const dx = cx + Math.cos(dotAngle) * dotR;
      const dy = cy + Math.sin(dotAngle) * dotR;

      return `
        <path d="M ${sx.toFixed(1)} ${sy.toFixed(1)} A ${radius} ${radius} 0 1 1 ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="${palette.paper}" stroke-opacity="0.78" stroke-width="1.75" stroke-linecap="round" />
        <circle cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="13" fill="${palette.accent}" />
      `;
    }
    case "growth": {
      // A quiet ascent: three marks climbing, the last one lit.
      return `
        <line x1="${cx}" y1="${cy + 190}" x2="${cx}" y2="${cy - 200}" stroke="${palette.mute}" stroke-opacity="0.4" stroke-width="1.25" />
        <circle cx="${cx}" cy="${cy + 90}" r="16" fill="none" stroke="${palette.paper}" stroke-opacity="0.45" stroke-width="1.4" />
        <circle cx="${cx}" cy="${cy - 10}" r="16" fill="none" stroke="${palette.paper}" stroke-opacity="0.7" stroke-width="1.4" />
        <circle cx="${cx}" cy="${cy - 110}" r="16" fill="${palette.accent}" />
      `;
    }
    case "writing": {
      // An open spread — two pages, one sentence begun.
      return `
        <rect x="${cx - 260}" y="${cy - 150}" width="240" height="300" rx="6" fill="none" stroke="${palette.paper}" stroke-opacity="0.55" stroke-width="1.5" />
        <rect x="${cx + 20}" y="${cy - 150}" width="240" height="300" rx="6" fill="none" stroke="${palette.paper}" stroke-opacity="0.85" stroke-width="1.5" />
        <line x1="${cx}" y1="${cy - 150}" x2="${cx}" y2="${cy + 150}" stroke="${palette.mute}" stroke-width="1.25" />
        <line x1="${cx + 58}" y1="${cy - 40}" x2="${cx + 220}" y2="${cy - 40}" stroke="${palette.accent}" stroke-width="2" stroke-linecap="round" />
      `;
    }
    case "structure": {
      // Nested frames — a place for everything, and a smaller place inside.
      return `
        <rect x="${cx - 280}" y="${cy - 190}" width="560" height="380" rx="18" fill="none" stroke="${palette.paper}" stroke-opacity="0.35" stroke-width="1.5" />
        <rect x="${cx - 180}" y="${cy - 90}" width="240" height="180" rx="12" fill="none" stroke="${palette.paper}" stroke-opacity="0.7" stroke-width="1.5" />
        <rect x="${cx + 90}" y="${cy - 40}" width="90" height="80" rx="8" fill="${palette.accent}" fill-opacity="0.9" />
      `;
    }
    case "backend": {
      // A request leaving a client, landing in a server, coming back.
      return `
        <circle cx="${cx - 320}" cy="${cy}" r="22" fill="none" stroke="${palette.paper}" stroke-opacity="0.7" stroke-width="1.5" />
        <line x1="${cx - 286}" y1="${cy}" x2="${cx - 90}" y2="${cy}" stroke="${palette.paper}" stroke-opacity="0.35" stroke-width="1.5" />
        <rect x="${cx - 90}" y="${cy - 120}" width="180" height="240" rx="16" fill="none" stroke="${palette.paper}" stroke-opacity="0.8" stroke-width="1.75" />
        <rect x="${cx - 36}" y="${cy - 28}" width="72" height="56" rx="8" fill="${palette.accent}" />
        <line x1="${cx + 90}" y1="${cy}" x2="${cx + 286}" y2="${cy}" stroke="${palette.paper}" stroke-opacity="0.35" stroke-width="1.5" />
        <circle cx="${cx + 320}" cy="${cy}" r="22" fill="none" stroke="${palette.paper}" stroke-opacity="0.7" stroke-width="1.5" />
      `;
    }
  }
}

export function generateWritingCoverSvg({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const { width, height } = WRITING_COVER_VIEWBOX;
  const spec = getWritingCoverSpec(slug, title);
  const grainId = coverId(slug, "grain");
  const vigId = coverId(slug, "vig");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="presentation" aria-hidden="true">
  <defs>
    <filter id="${grainId}">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" result="noise" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <radialGradient id="${vigId}" cx="50%" cy="48%" r="72%">
      <stop offset="40%" stop-color="${spec.palette.bg}" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.42" />
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="${spec.palette.bg}" />
  <rect width="${width}" height="${height}" fill="${spec.palette.soft}" fill-opacity="0.55" />
  ${motifMarkup(spec, width, height)}
  <rect width="${width}" height="${height}" fill="url(#${vigId})" />
  <rect width="${width}" height="${height}" filter="url(#${grainId})" opacity="0.045" />
</svg>`;
}
