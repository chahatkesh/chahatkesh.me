import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiVercel,
  SiFramer,
  SiRadixui,
  SiCloudinary,
  SiZod,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import type { IconType } from "react-icons";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TechItem {
  name: string;
  version: string;
  icon: IconType;
  color: string;
  description: string;
  category: "core" | "ui" | "data" | "infra";
}

export interface ArchitectureLayer {
  name: string;
  description: string;
  items: {
    label: string;
    detail: string;
    count?: number;
  }[];
}

export interface DesignPattern {
  name: string;
  description: string;
  example: string;
}

export interface PerformanceMetric {
  label: string;
  value: string;
  description: string;
}

export interface ColorToken {
  name: string;
  hex: string;
  desc: string;
  color: string;
  border?: boolean;
}

export interface FontEntry {
  family: string;
  usage: string;
  weights: string;
  className: string;
}

export interface PageEntry {
  path: string;
  name: string;
  description: string;
  renderType: "SSG" | "SSR" | "Static" | "ISR";
}

export interface CodeQualityTool {
  name: string;
  purpose: string;
  config?: string;
}

export interface QualityCategory {
  category: string;
  tools: CodeQualityTool[];
}

export interface CodebaseMetric {
  label: string;
  value: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export const techStack: TechItem[] = [
  {
    name: "Next.js",
    version: "16.1.1",
    icon: SiNextdotjs,
    color: "text-neutral-400",
    description: "App Router, RSC, ISR, Edge Runtime",
    category: "core",
  },
  {
    name: "React",
    version: "19",
    icon: SiReact,
    color: "text-sky-500",
    description: "Server Components, Suspense, use() hook",
    category: "core",
  },
  {
    name: "TypeScript",
    version: "5.9",
    icon: SiTypescript,
    color: "text-blue-400",
    description: "Strict mode, path aliases, declaration files",
    category: "core",
  },
  {
    name: "Tailwind CSS",
    version: "3.4",
    icon: SiTailwindcss,
    color: "text-cyan-300",
    description: "CVA typography, custom design tokens, shadcn/ui",
    category: "ui",
  },
  {
    name: "Framer Motion",
    version: "12",
    icon: SiFramer,
    color: "text-pink-400",
    description: "Shared layout animations, variants system, spring physics",
    category: "ui",
  },
  {
    name: "Radix UI",
    version: "1.x",
    icon: SiRadixui,
    color: "text-violet-400",
    description: "Accessible Dialog, Tooltip, Sheet primitives",
    category: "ui",
  },
  {
    name: "MongoDB",
    version: "9.0",
    icon: SiMongodb,
    color: "text-green-500",
    description: "Mongoose ODM, connection pooling, indexed queries",
    category: "data",
  },
  {
    name: "React Query",
    version: "5",
    icon: TbBrandReactNative,
    color: "text-red-400",
    description: "Server state, polling, deduplication, cache invalidation",
    category: "data",
  },
  {
    name: "Cloudinary",
    version: "2.8",
    icon: SiCloudinary,
    color: "text-blue-300",
    description: "Image CDN, transformations, upload API",
    category: "data",
  },
  {
    name: "Zod",
    version: "4",
    icon: SiZod,
    color: "text-blue-600",
    description: "Runtime validation, env vars, API schemas",
    category: "data",
  },
  {
    name: "Vercel",
    version: "Latest",
    icon: SiVercel,
    color: "text-neutral-400",
    description: "Edge Network, Analytics, Speed Insights, Preview Deploys",
    category: "infra",
  },
  {
    name: "Lenis",
    version: "1.3",
    icon: SiFramer,
    color: "text-orange-400",
    description: "Smooth scroll, RAF loop, inertia-based scrolling",
    category: "ui",
  },
];

export const architectureLayers: ArchitectureLayer[] = [
  {
    name: "Presentation Layer",
    description:
      "React Server Components with selective client hydration. Pages are server-rendered by default, with 'use client' boundaries only where interactivity is needed.",
    items: [
      {
        label: "Pages (routes)",
        detail: "App Router file-based routing",
        count: 15,
      },
      {
        label: "Components",
        detail: "Atomic design: ui → shared → features → sections",
        count: 51,
      },
      {
        label: "Layouts",
        detail: "Nested layouts with route groups",
        count: 3,
      },
      {
        label: "OG Images",
        detail: "Dynamic generation via @vercel/og (ImageResponse)",
        count: 8,
      },
    ],
  },
  {
    name: "State Management",
    description:
      "No global state library — server state via React Query, local state via useState/useRef. Custom hooks abstract complex UI logic.",
    items: [
      {
        label: "React Query",
        detail: "Spotify polling, visitor counter, link stats",
      },
      { label: "SWR", detail: "Gallery data with optimistic UI" },
      {
        label: "Custom Hooks",
        detail: "useHorizontalScroll, useDebouncedValue, useLenis",
        count: 7,
      },
      { label: "URL State", detail: "Search params for gallery filters" },
    ],
  },
  {
    name: "Data Layer",
    description:
      "Static data lives in ~/data as typed TypeScript modules. Dynamic data flows through API routes to MongoDB with Mongoose models.",
    items: [
      {
        label: "API Routes",
        detail: "RESTful endpoints (auth, gallery CRUD, Spotify, visitors)",
        count: 9,
      },
      {
        label: "Mongoose Models",
        detail: "Admin, Gallery, Visitor with typed schemas",
        count: 3,
      },
      {
        label: "Data Modules",
        detail: "Projects, experience, timeline, stack definitions",
        count: 7,
      },
      {
        label: "Constants",
        detail: "Brand tokens, API paths, animation presets, limits",
        count: 5,
      },
    ],
  },
  {
    name: "Infrastructure",
    description:
      "Deployed on Vercel Edge Network with automatic preview deployments per PR. Image optimization via Next.js Image + Cloudinary CDN pipeline.",
    items: [
      { label: "ISR", detail: "GitHub commits revalidate every 3600s" },
      {
        label: "Image Pipeline",
        detail: "AVIF/WebP, srcset, Cloudinary transforms, sharp",
      },
      {
        label: "Redirects",
        detail: "Vanity URLs (/resume, /github, /linkedin, etc.)",
      },
      {
        label: "Monitoring",
        detail: "Google Analytics, Microsoft Clarity, Vercel Analytics",
      },
    ],
  },
];

export const designPatterns: DesignPattern[] = [
  {
    name: "Barrel Exports",
    description:
      "Every directory exposes a clean index.ts that re-exports public APIs. Components import from ~/components/features/project rather than reaching into implementation files.",
    example:
      "import { ProjectList, TechStackBadges } from '~/components/features/project'",
  },
  {
    name: "Constants-First Architecture",
    description:
      "All magic numbers, brand colors, API routes, and animation configs live in ~/constants/. Zero hardcoded values in component files — every threshold is named and documented.",
    example:
      "SPOTIFY_POLL_INTERVAL_MS = 30_000 // not a magic 30000 in useQuery",
  },
  {
    name: "Composition over Props Drilling",
    description:
      "Complex pages compose small, focused components. Project detail page was refactored from 462 → 287 lines by extracting TechStackBadges, ProjectTimeline, and RelatedProjects.",
    example:
      "<TechStackBadges stacks={project.stacks} max={MAX_VISIBLE_STACKS} />",
  },
  {
    name: "Custom Hooks for UI Logic",
    description:
      "Repeated UI patterns are abstracted into hooks. useHorizontalScroll encapsulates resize observers, passive event listeners, scroll state, and button visibility for any carousel.",
    example:
      "const { ref, canScrollLeft, scrollRight } = useHorizontalScroll()",
  },
  {
    name: "Type-Safe Window Augmentation",
    description:
      "Global browser APIs are properly typed via declaration merging — window.lenis is declared in types/window.d.ts, eliminating all (window as any) casts across the codebase.",
    example: "declare global { interface Window { lenis?: Lenis } }",
  },
  {
    name: "Centralized Data Transforms",
    description:
      "Gallery images flow through toGalleryItem() transform. Project images resolve via getImageSrc() with static import fallback. Single source of truth eliminates 3× duplication.",
    example:
      "const src = getImageSrc(project) // handles StaticImport | string | undefined",
  },
];

export const performanceStrategies: PerformanceMetric[] = [
  {
    label: "Server Components",
    value: "~80%",
    description:
      "Most pages are fully server-rendered with zero client JS. Only interactive widgets (carousels, search, Spotify player) use 'use client' boundaries.",
  },
  {
    label: "Image Optimization",
    value: "AVIF + WebP",
    description:
      "Next.js Image with responsive srcset, AVIF/WebP format negotiation, Cloudinary CDN transforms, and sharp for OG image generation.",
  },
  {
    label: "Code Splitting",
    value: "Route-based",
    description:
      "Next.js automatic code splitting per route. Heavy dependencies (react-icons, framer-motion) only load on pages that use them.",
  },
  {
    label: "Data Fetching",
    value: "Stale-While-Revalidate",
    description:
      "React Query with configurable staleTime (5min for link stats), SWR deduplication (10s), and polling intervals (30s for Spotify).",
  },
  {
    label: "Smooth Scrolling",
    value: "RAF-based",
    description:
      "Lenis smooth scroll runs on requestAnimationFrame with proper cleanup via cancelAnimationFrame. Custom easeOutExpo easing curve.",
  },
  {
    label: "Bundle Hygiene",
    value: "Lean deps",
    description:
      "Removed unused packages (e.g. @paralleldrive/cuid2), stable deterministic IDs, tree-shakeable barrel exports.",
  },
];

export const colorTokens: ColorToken[] = [
  {
    name: "Background",
    hex: "#000000",
    desc: "Pure Black",
    color: "bg-black",
    border: true,
  },
  {
    name: "Accent",
    hex: "hsl(182.7 100% 35.5%)",
    desc: "Brand Cyan",
    color: "bg-ring",
  },
  {
    name: "Text Primary",
    hex: "#FFFFFF",
    desc: "White",
    color: "bg-white",
    border: true,
  },
  {
    name: "Text Secondary",
    hex: "#A3A3A3",
    desc: "Neutral 400",
    color: "bg-neutral-400",
  },
  {
    name: "Border",
    hex: "#262626",
    desc: "Neutral 800",
    color: "bg-neutral-800",
  },
  {
    name: "Surface",
    hex: "#0a0a0a",
    desc: "Neutral 950",
    color: "bg-neutral-950",
    border: true,
  },
];

export const fonts: FontEntry[] = [
  {
    family: "League Spartan",
    usage: "Body text, paragraphs, descriptions",
    weights: "300–700",
    className: "font-sans",
  },
  {
    family: "Ubuntu",
    usage: "Headings, section titles, nav labels",
    weights: "400–700",
    className: "font-ubuntu",
  },
  {
    family: "System Mono",
    usage: "Code snippets, SHA hashes, paths",
    weights: "400",
    className: "font-mono",
  },
];

export const codeQuality: QualityCategory[] = [
  {
    category: "Static Analysis",
    tools: [
      {
        name: "TypeScript",
        purpose: "Strict mode type checking with noEmit verification",
        config: "tsconfig.json",
      },
      {
        name: "ESLint",
        purpose: "Next.js + React Hooks + TypeScript rules",
        config: "eslint.config.mjs",
      },
      {
        name: "Prettier",
        purpose: "Opinionated formatting with Tailwind plugin",
        config: ".prettierrc",
      },
    ],
  },
  {
    category: "Git Workflow",
    tools: [
      {
        name: "Husky",
        purpose: "Pre-commit hooks — lint + format staged files",
      },
      {
        name: "lint-staged",
        purpose: "Run eslint --fix and prettier --write on *.{ts,tsx}",
      },
      {
        name: "Conventional Commits",
        purpose: "feat:, fix:, refactor: prefix convention",
      },
    ],
  },
  {
    category: "CI/CD Pipeline",
    tools: [
      {
        name: "Vercel Preview",
        purpose: "Every PR gets an isolated preview deployment",
      },
      {
        name: "Type Check",
        purpose: "tsc --noEmit runs as part of validate script",
      },
      {
        name: "Build Validation",
        purpose: "next build must succeed for deployment",
      },
    ],
  },
  {
    category: "Runtime Validation",
    tools: [
      {
        name: "Zod Schemas",
        purpose: "Environment variable validation via @t3-oss/env-nextjs",
      },
      {
        name: "API Error Boundaries",
        purpose: "Graceful fallbacks for Spotify, GitHub, visitor APIs",
      },
      {
        name: "AbortSignal.timeout",
        purpose: "All fetches have 5s timeout to prevent hangs",
      },
    ],
  },
];

export const pages: PageEntry[] = [
  {
    path: "/",
    name: "Home",
    description: "Landing with about, skills, projects, experience, contact",
    renderType: "Static",
  },
  {
    path: "/about",
    name: "About",
    description: "Bio, tech stack badges, social links",
    renderType: "Static",
  },
  {
    path: "/about/journey",
    name: "Journey",
    description: "Interactive timeline of life events",
    renderType: "Static",
  },
  {
    path: "/about/journey/btech",
    name: "B.Tech Courses",
    description: "Semester-wise course breakdown with syllabus modals",
    renderType: "Static",
  },
  {
    path: "/about/experience",
    name: "Experience",
    description: "Professional work timeline with duration calculation",
    renderType: "Static",
  },
  {
    path: "/about/experience/[slug]",
    name: "Experience Detail",
    description: "Dynamic page: contributions, tech stack, achievements",
    renderType: "SSG",
  },
  {
    path: "/about/site",
    name: "About This Site",
    description: "The page you're reading — meta technical deep-dive",
    renderType: "ISR",
  },
  {
    path: "/projects",
    name: "Projects",
    description: "Full project list with search and filters",
    renderType: "SSR",
  },
  {
    path: "/projects/[slug]",
    name: "Project Detail",
    description: "Dynamic: timeline, contributors, related projects",
    renderType: "SSG",
  },
  {
    path: "/gallery",
    name: "Gallery",
    description: "Photo grid with Cloudinary CDN, lightbox, admin uploads",
    renderType: "Static",
  },
  {
    path: "/links",
    name: "Links",
    description: "Link-in-bio page with click tracking and featured gallery",
    renderType: "Static",
  },
  {
    path: "/admin",
    name: "Admin",
    description: "Protected dashboard with JWT auth, gallery management",
    renderType: "Static",
  },
];

export const codebaseMetrics: CodebaseMetric[] = [
  {
    label: "Total Lines of Code",
    value: "13,300+",
    description: "TypeScript + TSX + CSS",
  },
  {
    label: "Components",
    value: "51",
    description: "Across 8 categories: ui, shared, features, sections, etc.",
  },
  {
    label: "Custom Hooks",
    value: "7",
    description: "useHorizontalScroll, useDebouncedValue, useLenis, etc.",
  },
  {
    label: "API Routes",
    value: "9",
    description: "Auth, Gallery CRUD, Spotify, Visitor tracking",
  },
  {
    label: "Type Definition Files",
    value: "5",
    description: "Window augmentation, gallery, config, gtag, images",
  },
  {
    label: "Constant Modules",
    value: "5",
    description: "Brand, API, limits, animation, barrel index",
  },
  {
    label: "Data Modules",
    value: "7",
    description: "Projects, experience, timeline, stack, courses, links, about",
  },
  {
    label: "Mongoose Models",
    value: "3",
    description: "Admin, Gallery, Visitor",
  },
];
