/**
 * Deterministic editorial covers for writing entries.
 * Motif is inferred from the title so the image belongs to the piece,
 * then drawn as a quiet line illustration — no stored assets.
 */

export const WRITING_COVER_VIEWBOX = { width: 1600, height: 900 } as const;

export type WritingCoverAppearance = "dark" | "light";

export type WritingCoverPalette = {
  bg: string;
  ink: string;
  accent: string;
};

export const WRITING_COVER_PALETTES = {
  brass: { bg: "#17140f", ink: "#eee6d6", accent: "#d2ae6e" },
  rose: { bg: "#171013", ink: "#f0e4e7", accent: "#d68e9c" },
  iris: { bg: "#121019", ink: "#e8e4f0", accent: "#a797d4" },
  sage: { bg: "#0f1511", ink: "#e2ece4", accent: "#86b691" },
  teal: { bg: "#0d1516", ink: "#e2eeee", accent: "#19b8c0" },
  copper: { bg: "#18110c", ink: "#f0e2d2", accent: "#de9356" },
  slate: { bg: "#0f141a", ink: "#e0e8f0", accent: "#8eaccb" },
} as const satisfies Record<string, WritingCoverPalette>;

/** Same motifs, printed on tinted paper instead of a dark plate. */
export const WRITING_COVER_PALETTES_LIGHT = {
  brass: { bg: "#f5f0e6", ink: "#3a3025", accent: "#a8742f" },
  rose: { bg: "#f7eff1", ink: "#3e2a30", accent: "#b05a6c" },
  iris: { bg: "#f2f0f7", ink: "#2f2a3e", accent: "#6f5ca6" },
  sage: { bg: "#eff4f0", ink: "#22342a", accent: "#3f8155" },
  teal: { bg: "#edf5f5", ink: "#1a3233", accent: "#0b7f87" },
  copper: { bg: "#f7f0e8", ink: "#3a281b", accent: "#b8692a" },
  slate: { bg: "#eff3f7", ink: "#233040", accent: "#3f6f96" },
} as const satisfies Record<
  keyof typeof WRITING_COVER_PALETTES,
  WritingCoverPalette
>;

export const WRITING_COVER_MOTIFS = [
  "home",
  "company",
  "uncertainty",
  "growth",
  "writing",
  "structure",
  "architecture",
  "backend",
] as const;

export type WritingCoverMotif = (typeof WRITING_COVER_MOTIFS)[number];

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
  architecture: "copper",
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
  if (/(architect|monolith|frontend|magazine)/.test(text))
    return "architecture";
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

function coverId(
  slug: string,
  name: string,
  appearance: WritingCoverAppearance,
) {
  return `wc-${appearance}-${slug}-${name}`;
}

/** One line weight everywhere; hierarchy comes from ink opacity alone. */
const STROKE = 4;

const INK_LEVELS = {
  dark: { strong: 0.88, mid: 0.5, faint: 0.24 },
  light: { strong: 0.82, mid: 0.46, faint: 0.22 },
} as const;

type Ink = keyof (typeof INK_LEVELS)["dark"];

function createPen(
  palette: WritingCoverPalette,
  appearance: WritingCoverAppearance,
) {
  const levels = INK_LEVELS[appearance];
  const stroke = (ink: Ink) =>
    `fill="none" stroke="${palette.ink}" stroke-opacity="${levels[ink]}" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round"`;

  return {
    line: (x1: number, y1: number, x2: number, y2: number, ink: Ink) =>
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${stroke(ink)} />`,
    path: (d: string, ink: Ink) => `<path d="${d}" ${stroke(ink)} />`,
    rect: (x: number, y: number, w: number, h: number, r: number, ink: Ink) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ${stroke(ink)} />`,
    circle: (x: number, y: number, r: number, ink: Ink) =>
      `<circle cx="${x}" cy="${y}" r="${r}" ${stroke(ink)} />`,
    accentRect: (x: number, y: number, w: number, h: number, r: number) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${palette.accent}" />`,
    accentDot: (x: number, y: number, r: number) =>
      `<circle cx="${x}" cy="${y}" r="${r}" fill="${palette.accent}" />`,
    accentLine: (x1: number, y1: number, x2: number, y2: number) =>
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${palette.accent}" stroke-width="${STROKE + 1}" stroke-linecap="round" />`,
  };
}

/**
 * Motifs stay inside a centered ~760×460 box so they survive both the
 * 16:10 card crop and the 2.2:1 article header crop.
 */
function motifMarkup(
  motif: WritingCoverMotif,
  pen: ReturnType<typeof createPen>,
  width: number,
  height: number,
) {
  const cx = width / 2;
  const cy = height / 2;

  switch (motif) {
    case "home": {
      // Home (gabled, lit window) and hostel (institutional), joined by one path.
      const ground = cy + 150;
      return [
        pen.line(cx - 380, ground, cx + 380, ground, "faint"),
        pen.path(
          `M ${cx - 300} ${ground} V ${ground - 170} L ${cx - 180} ${ground - 290} L ${cx - 60} ${ground - 170} V ${ground}`,
          "strong",
        ),
        pen.accentRect(cx - 202, ground - 124, 44, 44, 4),
        pen.rect(cx + 60, ground - 230, 240, 230, 2, "mid"),
        pen.rect(cx + 110, ground - 186, 34, 34, 2, "faint"),
        pen.rect(cx + 216, ground - 186, 34, 34, 2, "faint"),
        pen.rect(cx + 110, ground - 112, 34, 34, 2, "faint"),
        pen.rect(cx + 216, ground - 112, 34, 34, 2, "faint"),
        pen.accentLine(cx - 60, ground, cx + 60, ground),
      ].join("");
    }
    case "company": {
      // A person at the center, shaped by the people kept close.
      const oy = cy - 30;
      const hub = { x: cx, y: oy, r: 92 };
      const people = [
        { x: cx - 260, y: oy - 60, r: 52, accent: false },
        { x: cx + 250, y: oy - 90, r: 44, accent: true },
        { x: cx - 120, y: oy + 200, r: 40, accent: false },
        { x: cx + 190, y: oy + 180, r: 48, accent: false },
      ];

      const links = people.map((person) => {
        const angle = Math.atan2(person.y - hub.y, person.x - hub.x);
        const gap = 18;
        const x1 = hub.x + Math.cos(angle) * (hub.r + gap);
        const y1 = hub.y + Math.sin(angle) * (hub.r + gap);
        const x2 = person.x - Math.cos(angle) * (person.r + gap);
        const y2 = person.y - Math.sin(angle) * (person.r + gap);
        return pen.line(
          Number(x1.toFixed(1)),
          Number(y1.toFixed(1)),
          Number(x2.toFixed(1)),
          Number(y2.toFixed(1)),
          "faint",
        );
      });

      const nodes = people.map((person) =>
        person.accent
          ? pen.accentDot(person.x, person.y, person.r)
          : pen.circle(person.x, person.y, person.r, "mid"),
      );

      return [
        ...links,
        pen.circle(hub.x, hub.y, hub.r, "strong"),
        ...nodes,
      ].join("");
    }
    case "uncertainty": {
      // An unfinished orbit — the step taken before the path is known.
      const oy = cy + 24;
      const radius = 240;
      const gap = (40 * Math.PI) / 180;
      const start = -Math.PI / 2 + gap / 2;
      const end = -Math.PI / 2 - gap / 2 + Math.PI * 2;
      const sx = cx + Math.cos(start) * radius;
      const sy = oy + Math.sin(start) * radius;
      const ex = cx + Math.cos(end) * radius;
      const ey = oy + Math.sin(end) * radius;

      return [
        pen.path(
          `M ${sx.toFixed(1)} ${sy.toFixed(1)} A ${radius} ${radius} 0 1 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`,
          "strong",
        ),
        pen.accentDot(cx, oy - radius - 44, 16),
      ].join("");
    }
    case "growth": {
      // A quiet ascent: three marks climbing, the last one lit.
      return [
        pen.line(cx, cy + 210, cx, cy - 210, "faint"),
        pen.circle(cx, cy + 110, 18, "mid"),
        pen.circle(cx, cy, 18, "strong"),
        pen.accentDot(cx, cy - 110, 20),
      ].join("");
    }
    case "writing": {
      // An open spread — two pages, one sentence begun.
      const top = cy - 160;
      return [
        pen.rect(cx - 280, top, 250, 320, 8, "mid"),
        pen.rect(cx + 30, top, 250, 320, 8, "strong"),
        pen.line(cx - 240, top + 64, cx - 70, top + 64, "faint"),
        pen.line(cx - 240, top + 104, cx - 100, top + 104, "faint"),
        pen.line(cx - 240, top + 144, cx - 130, top + 144, "faint"),
        pen.accentLine(cx + 70, top + 64, cx + 210, top + 64),
      ].join("");
    }
    case "structure": {
      // A file tree — a place for everything, and a smaller place inside.
      const ox = cx - 228;
      const bar = 48;
      const half = bar / 2;
      const rows = [cy - 200, cy - 100, cy, cy + 100, cy + 200];
      const trunk = ox + 36;
      const branch = ox + 136;
      const depth1 = ox + 96;
      const depth2 = ox + 186;

      return [
        pen.line(trunk, rows[0] + half + 12, trunk, rows[4], "faint"),
        pen.line(branch, rows[1] + half + 12, branch, rows[3], "faint"),
        pen.line(trunk, rows[1], depth1 - 14, rows[1], "faint"),
        pen.line(trunk, rows[4], depth1 - 14, rows[4], "faint"),
        pen.line(branch, rows[2], depth2 - 14, rows[2], "faint"),
        pen.line(branch, rows[3], depth2 - 14, rows[3], "faint"),
        pen.rect(ox, rows[0] - half, 140, bar, 12, "strong"),
        pen.rect(depth1, rows[1] - half, 300, bar, 12, "mid"),
        pen.rect(depth2, rows[2] - half, 240, bar, 12, "mid"),
        pen.accentRect(depth2, rows[3] - half, 170, bar, 12),
        pen.rect(depth1, rows[4] - half, 360, bar, 12, "mid"),
      ].join("");
    }
    case "architecture": {
      // A magazine page on the left, independently composed modules on the right.
      const pageW = 200;
      const pageH = 380;
      const pageX = cx - 330;
      const pageY = cy - pageH / 2;
      const tile = 104;
      const tileGap = 24;
      const clusterX = cx + 80;
      const clusterY = cy - tile - tileGap / 2;

      return [
        pen.rect(pageX, pageY, pageW, pageH, 10, "strong"),
        pen.line(pageX + 32, pageY + 52, pageX + pageW - 32, pageY + 52, "mid"),
        pen.line(
          pageX + 32,
          pageY + 92,
          pageX + pageW - 56,
          pageY + 92,
          "faint",
        ),
        pen.line(
          pageX + 32,
          pageY + 126,
          pageX + pageW - 44,
          pageY + 126,
          "faint",
        ),
        pen.rect(pageX + 32, pageY + 172, pageW - 64, 168, 6, "faint"),
        pen.line(pageX + pageW + 40, cy, clusterX - 40, cy, "faint"),
        pen.rect(clusterX, clusterY, tile, tile, 14, "strong"),
        pen.accentRect(clusterX + tile + tileGap, clusterY, tile, tile, 14),
        pen.rect(clusterX, clusterY + tile + tileGap, tile, tile, 14, "mid"),
        pen.rect(
          clusterX + tile + tileGap,
          clusterY + tile + tileGap,
          tile,
          tile,
          14,
          "mid",
        ),
      ].join("");
    }
    case "backend": {
      // A request leaves the client, the server does the work, a response returns.
      const ox = cx + 20;
      const serverX = ox + 90;
      const serverW = 230;
      const serverH = 300;
      const serverY = cy - serverH / 2;
      const lineFrom = ox - 170;
      const lineTo = serverX - 36;

      return [
        pen.rect(ox - 380, cy - 80, 170, 120, 14, "strong"),
        pen.line(ox - 295, cy + 40, ox - 295, cy + 80, "mid"),
        pen.line(ox - 335, cy + 80, ox - 255, cy + 80, "mid"),
        pen.line(lineFrom, cy - 26, lineTo, cy - 26, "mid"),
        pen.path(
          `M ${lineTo - 16} ${cy - 40} L ${lineTo} ${cy - 26} L ${lineTo - 16} ${cy - 12}`,
          "mid",
        ),
        pen.line(lineTo, cy + 26, lineFrom, cy + 26, "faint"),
        pen.path(
          `M ${lineFrom + 16} ${cy + 12} L ${lineFrom} ${cy + 26} L ${lineFrom + 16} ${cy + 40}`,
          "faint",
        ),
        pen.rect(serverX, serverY, serverW, serverH, 18, "strong"),
        pen.line(serverX, cy - 50, serverX + serverW, cy - 50, "faint"),
        pen.line(serverX, cy + 50, serverX + serverW, cy + 50, "faint"),
        pen.circle(serverX + serverW - 44, cy - 100, 7, "mid"),
        pen.circle(serverX + serverW - 44, cy + 100, 7, "mid"),
        pen.accentRect(serverX + 34, cy - 16, 96, 32, 8),
      ].join("");
    }
  }
}

export function generateWritingCoverSvg({
  slug,
  title,
  appearance = "dark",
}: {
  slug: string;
  title: string;
  appearance?: WritingCoverAppearance;
}) {
  const { width, height } = WRITING_COVER_VIEWBOX;
  const motif = inferWritingCoverMotif(title);
  const palette =
    appearance === "light"
      ? WRITING_COVER_PALETTES_LIGHT[MOTIF_PALETTE[motif]]
      : WRITING_COVER_PALETTES[MOTIF_PALETTE[motif]];
  const pen = createPen(palette, appearance);
  const grainId = coverId(slug, "grain", appearance);
  const glowId = coverId(slug, "glow", appearance);
  const sheenId = coverId(slug, "sheen", appearance);
  const isDark = appearance === "dark";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" role="presentation" aria-hidden="true">
  <defs>
    <filter id="${grainId}">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" result="noise" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <radialGradient id="${glowId}" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="${palette.accent}" stop-opacity="${isDark ? 0.16 : 0.1}" />
      <stop offset="100%" stop-color="${palette.accent}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="${sheenId}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="${isDark ? 0.04 : 0.3}" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="${palette.bg}" />
  <rect width="${width}" height="${height}" fill="url(#${sheenId})" />
  <rect width="${width}" height="${height}" fill="url(#${glowId})" />
  ${motifMarkup(motif, pen, width, height)}
  <rect width="${width}" height="${height}" filter="url(#${grainId})" opacity="${isDark ? 0.035 : 0.04}" />
</svg>`;
}
