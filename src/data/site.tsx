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
  priority?: number; // 1-3, where 1 is highest priority
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
  impact?: number; // 1-100 score for chart visualization
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
    version: "16.3",
    icon: SiNextdotjs,
    color: "text-foreground/80",
    description: "App Router, RSC, ISR, Edge Runtime",
    category: "core",
    priority: 1,
  },
  {
    name: "React",
    version: "19",
    icon: SiReact,
    color: "text-sky-500",
    description: "Server Components, Suspense, use() hook",
    category: "core",
    priority: 1,
  },
  {
    name: "TypeScript",
    version: "5.9",
    icon: SiTypescript,
    color: "text-blue-400",
    description: "Strict mode, path aliases, declaration files",
    category: "core",
    priority: 1,
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
    version: "9.9",
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
    version: "2.9",
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
    color: "text-foreground/80",
    description: "Edge Network, Analytics, Speed Insights, Preview Deploys",
    category: "infra",
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
        count: 39,
      },
      {
        label: "Components",
        detail: "Atomic design: ui → shared → features → sections",
        count: 110,
      },
      {
        label: "Layouts",
        detail: "Nested layouts with route groups",
        count: 4,
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
        detail: "Spotify polling, coding activity, gym summary, link stats",
      },
      {
        label: "SWR",
        detail: "Gallery, places, admin CRUD with optimistic UI",
      },
      {
        label: "Custom Hooks",
        detail: "useHorizontalScroll, useDebouncedValue, useScrollTo",
        count: 8,
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
        detail:
          "Auth, gallery, places, gym, diagrams, gists, Spotify, visitors",
        count: 32,
      },
      {
        label: "Mongoose Models",
        detail: "Admin, gallery, places, gym, diagrams, gists, shared files",
        count: 12,
      },
      {
        label: "Data Modules",
        detail:
          "Projects, experience, timeline, stack, stack-meta, courses, site metadata",
        count: 14,
      },
      {
        label: "Constants",
        detail: "Brand tokens, API paths, animation presets, limits",
        count: 8,
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
    name: "Type-Safe Browser APIs",
    description:
      "Global browser APIs and declaration merging are used to eliminate all (window as any) casts across the codebase. Native scroll APIs are used directly via typed wrappers.",
    example: "window.scrollTo({ top: offsetPosition, behavior: 'smooth' })",
  },
  {
    name: "Centralized Data Transforms",
    description:
      "Gallery images flow through toGalleryItem() transform. Project images resolve via getImageSrc() with static import fallback. Single source of truth eliminates 3× duplication.",
    example:
      "const src = getImageSrc(project) // handles StaticImport | string | undefined",
  },
  {
    name: "Unified Loading Language",
    description:
      "One Skeleton primitive (bg-muted/40 pulse) for in-page placeholders, one PageLoader (brand-tip ring) for route and admin waits, Loader2 only on mutations. Shape-matched skeletons mirror real layouts so content never jumps.",
    example:
      '<Skeleton className="h-10 w-full" /> · <PageLoader minHeight="page" />',
  },
];

export const performanceStrategies: PerformanceMetric[] = [
  {
    label: "Server Components",
    value: "~80%",
    description:
      "Most pages are fully server-rendered with zero client JS. Only interactive widgets (carousels, search, Spotify player) use 'use client' boundaries.",
    impact: 95,
  },
  {
    label: "Image Optimization",
    value: "AVIF + WebP",
    description:
      "Next.js Image with responsive srcset, AVIF/WebP format negotiation, Cloudinary CDN transforms, and sharp for OG image generation.",
    impact: 85,
  },
  {
    label: "Code Splitting",
    value: "Route-based",
    description:
      "Next.js automatic code splitting per route. Heavy widgets (coding activity, skills, metrics, maps) load via dynamic() with shape-matched Skeleton fallbacks.",
    impact: 80,
  },
  {
    label: "Loading UX",
    value: "Skeleton + PageLoader",
    description:
      "Route loading.tsx files and admin chrome share PageLoader. Async sections use layout-faithful Skeleton compositions — gym rings, gallery grids, contribution graphs — instead of generic blobs.",
    impact: 78,
  },
  {
    label: "Data Fetching",
    value: "Stale-While-Revalidate",
    description:
      "React Query with configurable staleTime (5min for link stats), SWR deduplication (10s), and polling intervals (30s for Spotify).",
    impact: 70,
  },
  {
    label: "Smooth Scrolling",
    value: "Native CSS",
    description:
      "Native scroll-behavior: smooth on the html element. Zero JS overhead — the same approach used by Linear, Vercel, and Stripe. Respects prefers-reduced-motion automatically.",
    impact: 65,
  },
  {
    label: "Bundle Hygiene",
    value: "Lean deps",
    description:
      "Removed unused packages (e.g. @paralleldrive/cuid2), stable deterministic IDs, tree-shakeable barrel exports.",
    impact: 75,
  },
];

export const colorTokens: ColorToken[] = [
  {
    name: "Background",
    hex: "hsl(240 10% 3.9%)",
    desc: "--background",
    color: "bg-background",
    border: true,
  },
  {
    name: "Accent / Ring",
    hex: "hsl(182.7 100% 35.5%)",
    desc: "--ring",
    color: "bg-ring",
  },
  {
    name: "Foreground",
    hex: "hsl(0 0% 98%)",
    desc: "--foreground",
    color: "bg-foreground",
    border: true,
  },
  {
    name: "Muted Foreground",
    hex: "hsl(240 5% 64.9%)",
    desc: "--muted-foreground",
    color: "bg-muted-foreground",
  },
  {
    name: "Border",
    hex: "hsl(240 3.7% 15.9%)",
    desc: "--border",
    color: "bg-border",
  },
  {
    name: "Card / Surface",
    hex: "hsl(240 5% 8%)",
    desc: "--card",
    color: "bg-card",
    border: true,
  },
];

export const fonts: FontEntry[] = [
  {
    family: "Outfit",
    usage: "Body text, paragraphs, descriptions",
    weights: "400–500",
    className: "font-sans",
  },
  {
    family: "League Spartan",
    usage: "Headings, section titles, nav labels",
    weights: "500, 600, 700",
    className: "font-ubuntu",
  },
  {
    family: "Lora",
    usage: "Poem section, italic accents, personal notes",
    weights: "400, 600 (normal + italic)",
    className: "font-poem",
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
    description:
      "Landing with about, clickable skills, projects, experience, contact",
    renderType: "Static",
  },
  {
    path: "/about",
    name: "About",
    description: "Bio, tech stack badges, social links",
    renderType: "Static",
  },
  {
    path: "/about/writing",
    name: "Writing",
    description: "Essays about lessons, ideas, and questions worth keeping",
    renderType: "SSG",
  },
  {
    path: "/about/writing/[slug]",
    name: "Writing Detail",
    description: "MDX essay with HTML for readers and a .md twin for LLMs",
    renderType: "SSG",
  },
  {
    path: "/llms.txt",
    name: "llms.txt",
    description: "Markdown index of the site for language models",
    renderType: "SSR",
  },
  {
    path: "/about/gym",
    name: "Gym",
    description: "Training logs, rings, heatmap, and progress photos",
    renderType: "Static",
  },
  {
    path: "/about/designing",
    name: "Designing",
    description: "Design explorations, UI studies, and visual thinking",
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
    path: "/site",
    name: "About This Site",
    description: "The page you're reading — meta technical deep-dive",
    renderType: "ISR",
  },
  {
    path: "/changelog",
    name: "Changelog",
    description:
      "Monthly updates, improvements, and fixes across the portfolio",
    renderType: "Static",
  },
  {
    path: "/changelog/[month]",
    name: "Changelog Month",
    description: "Dedicated monthly release notes with change details",
    renderType: "SSG",
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
    path: "/stack",
    name: "Stack",
    description:
      "Browseable toolkit grouped by category, with search across 76 technologies",
    renderType: "SSR",
  },
  {
    path: "/timeline",
    name: "Timeline",
    description:
      "Full-page horizontal map of dated work, writing, videos, and life",
    renderType: "Static",
  },
  {
    path: "/stack/[slug]",
    name: "Stack Detail",
    description:
      "Per-technology page with mapped projects, experience, and related stacks",
    renderType: "SSG",
  },
  {
    path: "/gallery",
    name: "Gallery",
    description: "Photo grid with Cloudinary CDN, lightbox, admin uploads",
    renderType: "Static",
  },
  {
    path: "/places",
    name: "Places",
    description: "Interactive world map with location pins and visit notes",
    renderType: "Static",
  },
  {
    path: "/links",
    name: "Links",
    description: "Link-in-bio page with click tracking and featured gallery",
    renderType: "Static",
  },
  {
    path: "/videos",
    name: "Videos",
    description: "YouTube catalog with listing and detail pages",
    renderType: "SSG",
  },
  {
    path: "/videos/[slug]",
    name: "Video Detail",
    description: "Individual video page with SEO and embed",
    renderType: "SSG",
  },
  {
    path: "/diagrams/[slug]",
    name: "Diagram",
    description: "Public Mermaid diagram with zoomable canvas",
    renderType: "SSR",
  },
  {
    path: "/gists/[slug]",
    name: "Gist",
    description: "Public markdown note with clean reading layout",
    renderType: "SSR",
  },
  {
    path: "/s/[id]",
    name: "Shared File",
    description: "Short public URL for uploaded shared files",
    renderType: "SSR",
  },
  {
    path: "/admin",
    name: "Admin",
    description: "Protected dashboard with JWT auth and content management",
    renderType: "Static",
  },
];

export const codebaseMetrics: CodebaseMetric[] = [
  {
    label: "Total Lines of Code",
    value: "39,299+",
    description: "TypeScript + TSX + CSS",
  },
  {
    label: "Components",
    value: "122",
    description: "Across 8 categories: ui, shared, features, sections, etc.",
  },
  {
    label: "Custom Hooks",
    value: "8",
    description: "useHorizontalScroll, useDebouncedValue, useScrollTo, etc.",
  },
  {
    label: "API Routes",
    value: "32",
    description:
      "Auth, gallery, places, gym, diagrams, gists, Spotify, visitors",
  },
  {
    label: "Type Definition Files",
    value: "11",
    description: "Window augmentation, gallery, config, gtag, images",
  },
  {
    label: "Constant Modules",
    value: "8",
    description: "Brand, API, limits, animation, barrel index",
  },
  {
    label: "Data Modules",
    value: "13",
    description:
      "Projects, experience, timeline, stack, stack-meta, courses, links, about",
  },
  {
    label: "Mongoose Models",
    value: "12",
    description: "Admin, gallery, places, gym, diagrams, gists, shared files",
  },
];
