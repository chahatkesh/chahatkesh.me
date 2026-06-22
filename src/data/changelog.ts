export type ChangelogChangeType = "added" | "improved" | "fixed";

export interface ChangelogChange {
  type: ChangelogChangeType;
  title: string;
  description: string;
}

export interface ChangelogStats {
  commits: number;
  files: number;
}

export interface MonthlyChangelog {
  month: string;
  title: string;
  summary: string;
  overview: string;
  stats: ChangelogStats;
  changes: ChangelogChange[];
}

export const monthlyChangelog: MonthlyChangelog[] = [
  {
    month: "2026-06",
    title: "BTech Journey, Shared Files & Richer Interactions",
    summary:
      "A month about depth — the people behind the degree, a proper file-sharing layer, and a gallery that finally feels alive.",
    overview:
      "June was about adding texture. The B.Tech journey grew real teeth — professor profiles, syllabi, and course detail you can actually click into — while a brand-new shared-file system gave the site a real way to host and serve documents on demand. Underneath, the database connection got steadier and the gallery learned a few new tricks, so the whole thing comes across a little more handcrafted than it did a month ago. The month closed on a quieter, more structural note — the changelog grew into per-month pages of its own, and a careful SEO pass made the site's structured data, crawl rules, and 404s read correctly to people and search engines alike.",
    stats: { commits: 13, files: 198 },
    changes: [
      {
        type: "added",
        title: "Professors behind the courses",
        description:
          "A new ProfessorModal sits right inside the syllabus view, so tapping a course now reveals the people teaching it and what else they cover — the academic story reads like more than a list of subjects.",
      },
      {
        type: "added",
        title: "Diagrams that explain themselves",
        description:
          "Project pages can now render flowcharts straight from text using Mermaid.js, turning architecture into something you can follow at a glance instead of imagining.",
      },
      {
        type: "added",
        title: "A real shared-file system",
        description:
          "A complete upload-and-manage layer for documents — APIs to create, update, delete, and fetch files, plus raw serving — so sharing a file is now a first-class feature rather than a workaround.",
      },
      {
        type: "added",
        title: "Motion that respects you",
        description:
          "New RevealSection and RevealCard wrappers bring gentle fade-up motion as you scroll, while quietly honoring reduced-motion preferences for anyone who'd rather skip the movement.",
      },
      {
        type: "added",
        title: "Gallery, in focus",
        description:
          "Images now open into a click-to-expand lightbox, so the gallery feels less like a static grid and more like something you actually browse.",
      },
      {
        type: "added",
        title: "Cleaner link previews",
        description:
          "An Open Graph image proxy lets external previews load properly, and the About page now shows live previews of the projects it points to.",
      },
      {
        type: "added",
        title: "A changelog with rooms of its own",
        description:
          "Every month now opens into its own page — the full story, the stats, and prev/next links between months, each with a dedicated Open Graph card. What used to be one long list is now something you can browse, bookmark, and share a single month of.",
      },
      {
        type: "improved",
        title: "A more semantic shell",
        description:
          "The main layout now wraps content in a proper <main> element, and link styling was tuned across the site for consistency and accessibility.",
      },
      {
        type: "improved",
        title: "One focused activity view",
        description:
          "Retired the heavier GitHub and LeetCode activity widgets in favor of a single, lighter coding-activity view — now with proper handling for zero-contribution days.",
      },
      {
        type: "improved",
        title: "Structured data crawlers can actually read",
        description:
          "All the JSON-LD — home, projects, videos, and changelog — now renders straight into the page's HTML instead of after it loads, so search engines pick up the structured data on the first request rather than missing it entirely.",
      },
      {
        type: "improved",
        title: "Robots and sitemap, set straight",
        description:
          "Collapsed the crawl rules into one unambiguous group, kept the admin area out of search for good, and normalized every sitemap date and URL so each lines up with the page's own canonical — quiet housekeeping that search engines reward.",
      },
      {
        type: "improved",
        title: "Error states that stay on-brand",
        description:
          "Main and admin error pages were refreshed so failures now present clearer fallback messaging and styling that still matches the overall portfolio experience.",
      },
      {
        type: "fixed",
        title: "Steadier database connections",
        description:
          "MongoDB connection handling was hardened with new utility helpers, making hiccups far less likely under load.",
      },
      {
        type: "fixed",
        title: "Pushes that don't stall",
        description:
          "Metric and tech-version refreshes moved into the pre-commit hook so they stop blocking pushes mid-flow.",
      },
      {
        type: "fixed",
        title: "A 404 that stays in character",
        description:
          "Unknown pages now land on a custom not-found screen that keeps the site's nav and footer instead of a bare fallback, and a stray duplicate viewport tag was cleared out so every page ships exactly one.",
      },
    ],
  },
  {
    month: "2026-05",
    title: "A Quiet, Deliberate Copy Refresh",
    summary:
      "Not every month ships a feature — one small, intentional pass to keep the Zenbase and internship story current.",
    overview:
      "Some months are about restraint. May was a single, deliberate edit — a careful pass over the experience copy so the Zenbase internship and earlier roles are described in a way that stays accurate and true to where things actually stand.",
    stats: { commits: 1, files: 7 },
    changes: [
      {
        type: "improved",
        title: "An honest experience story",
        description:
          "Refreshed the internship and previous Zenbase descriptions so the professional narrative reads current — small words, but they matter when someone's reading about your work.",
      },
    ],
  },
  {
    month: "2026-04",
    title: "Videos Go Live & the UI Gets a Design System",
    summary:
      "The biggest release in a while: a native videos section, a full move to design tokens, and accessibility cleaned up end to end.",
    overview:
      "April was a proper platform release. A whole videos experience went live — listing pages, detail pages, SEO, and social cards — while behind the scenes every hardcoded color migrated to semantic design tokens. Add native smooth scrolling and a sweep of accessibility fixes, and the site came out of the month noticeably more polished and a lot easier to keep that way.",
    stats: { commits: 13, files: 174 },
    changes: [
      {
        type: "added",
        title: "A videos section that lives here",
        description:
          "New /videos listing and detail pages, fully static-generated with SEO metadata, JSON-LD, OG images, and sitemap entries — a YouTube presence that lives natively on the site instead of linking away.",
      },
      {
        type: "added",
        title: "Experience you can see",
        description:
          "Experience pages gained a company-level image gallery, so each role can be shown rather than only described.",
      },
      {
        type: "added",
        title: "Calmer scrolling",
        description:
          "Native smooth scrolling was added for a more deliberate feel when moving through long pages.",
      },
      {
        type: "added",
        title: "A small personal note",
        description:
          "A poem section landed on the About page, with its own font styling — a little humanity between all the engineering.",
      },
      {
        type: "improved",
        title: "One source of truth for color",
        description:
          "Every neutral and gray Tailwind class was replaced with semantic design tokens, so theming is now consistent and changeable from a single place.",
      },
      {
        type: "improved",
        title: "Accessibility, taken seriously",
        description:
          "A focused round of a11y fixes across components tightened contrast, semantics, and focus handling.",
      },
      {
        type: "improved",
        title: "A homepage that leads with work",
        description:
          "Professional Experience replaced Skills on the homepage, with typography and font configurations refined throughout, and fresh projects and timeline events to keep things current.",
      },
      {
        type: "improved",
        title: "A footer that holds together",
        description:
          "The footer was rebuilt for better responsiveness, alignment, and clearer copy on every screen size.",
      },
    ],
  },
  {
    month: "2026-02",
    title: "Hardening the Foundations",
    summary:
      "An engineering-heavy month: validation everywhere, safer auth, and a codebase organized for the long haul.",
    overview:
      "February was the kind of month you don't see but everything depends on. Runtime environment validation and Zod schemas now guard every API route, a risky auth fallback was removed, and the whole codebase was reorganized with clean exports and centralized design tokens. Error and loading boundaries mean a single stumble no longer takes the page down with it.",
    stats: { commits: 20, files: 251 },
    changes: [
      {
        type: "added",
        title: "No more silent misconfiguration",
        description:
          "Environment variables are now validated at startup with Zod, and a documented example file spells out all fifteen required keys — the app tells you what's wrong instead of failing quietly.",
      },
      {
        type: "added",
        title: "Bad input caught at the door",
        description:
          "A central validations layer adds Zod request schemas across every API route, so malformed requests get rejected before they touch anything important.",
      },
      {
        type: "added",
        title: "A palette in one place",
        description:
          "Category and social-brand colors moved into a single theme constants file, making the palette consistent and easy to evolve.",
      },
      {
        type: "added",
        title: "A tidier module map",
        description:
          "Clean barrel exports for components, lib, models, types, and data made imports shorter and the codebase easier to navigate.",
      },
      {
        type: "improved",
        title: "A genuine security fix",
        description:
          "Removed the hardcoded JWT secret fallback and added proper auth middleware — the kind of change that matters even though nobody sees it.",
      },
      {
        type: "improved",
        title: "A stricter, kinder linter",
        description:
          "Adopted consistent type-only imports and upgraded the ESLint config (with Zod added) to keep the codebase honest as it grows.",
      },
      {
        type: "improved",
        title: "Less repetition, more reuse",
        description:
          "Extracted shared utilities and derived config from constants, including a dedicated Cloudinary config module.",
      },
      {
        type: "fixed",
        title: "Failures that degrade gracefully",
        description:
          "Added error and loading boundaries for both route groups, so when something breaks the page bends instead of shattering.",
      },
      {
        type: "fixed",
        title: "The right verb for the job",
        description:
          "Switched the visitor-count increment from GET to POST — a small correctness fix, since counting a visit changes state.",
      },
    ],
  },
  {
    month: "2026-01",
    title: "Routing, Open Graph & Smoother Navigation",
    summary:
      "Metadata and movement: dynamic social cards for every route, smooth scrolling, and proper breadcrumb navigation.",
    overview:
      "January went after the details that shape first impressions. A reusable Open Graph pipeline now generates social images for every route, navigation moved from a lone back button to proper breadcrumbs, and Lenis brought smooth scrolling site-wide. Small things on their own — but together, they're what make a site feel considered.",
    stats: { commits: 9, files: 58 },
    changes: [
      {
        type: "added",
        title: "Every link looks intentional",
        description:
          "A reusable template now generates Open Graph images for every route, so anything shared anywhere arrives looking designed rather than default.",
      },
      {
        type: "added",
        title: "Always know where you are",
        description:
          "Replaced the back button with a breadcrumb component, giving clearer context and a more reliable way to move around the site.",
      },
      {
        type: "added",
        title: "Smooth by default",
        description:
          "Integrated Lenis for buttery smooth scrolling, with editor settings tidied up alongside it.",
      },
      {
        type: "added",
        title: "More to the work story",
        description:
          "Added current-work links and richer experience details, with a more flexible link model for dynamic rendering.",
      },
      {
        type: "improved",
        title: "Complete social coverage",
        description:
          "Refactored Open Graph handling and SEO config, and restored the Twitter image export so previews are covered across platforms.",
      },
      {
        type: "fixed",
        title: "Cleaner project URLs",
        description:
          "Dropped the staging subdomain from project URLs so links point where they actually should.",
      },
    ],
  },
  {
    month: "2025-12",
    title: "The Big Build — Admin, Analytics & Growing Up",
    summary:
      "The most ambitious month yet: an admin system, cloud media, analytics, and a wave of new pages and content.",
    overview:
      "December was a sprint in the truest sense — dozens of commits that turned a portfolio into a platform. An authenticated admin system went in, Cloudinary took over media, Google Analytics and Clarity started listening, and a Spotify Now Playing widget gave the site a heartbeat. New About, Experience, and About-This-Site pages gave everything room to breathe. If one month defined the site, it was this one.",
    stats: { commits: 42, files: 346 },
    changes: [
      {
        type: "added",
        title: "Content management without code",
        description:
          "A full admin panel with authentication, session management, a dashboard, and a user-creation script — so the site can be updated without opening an editor.",
      },
      {
        type: "added",
        title: "Knowing how it's actually used",
        description:
          "Google Analytics, Search Console verification, and Microsoft Clarity were wired in for a real, honest view of how people move through the site.",
      },
      {
        type: "added",
        title: "A little heartbeat",
        description:
          "A live Spotify Now Playing widget, backed by the API with caching handled, so the site shows a sign of life beyond static text.",
      },
      {
        type: "added",
        title: "Real activity, surfaced",
        description:
          "GitHub API integration fetches the latest commits and commit dates, putting genuine development activity on display.",
      },
      {
        type: "added",
        title: "Room to tell the story",
        description:
          "Detailed experience pages with a timeline and carousel, a richer About section, and a new About-This-Site page covering the tech and design philosophy behind it all.",
      },
      {
        type: "added",
        title: "A home for the links",
        description:
          "A dedicated Links page pulled primary, social, and support links together, with a featured gallery carousel to lead with visuals.",
      },
      {
        type: "improved",
        title: "Media that just works",
        description:
          "Image handling now supports both static imports and string URLs across components, smoothing out the Cloudinary workflow.",
      },
      {
        type: "improved",
        title: "Consistency on autopilot",
        description:
          "Pre-commit hooks, CI/CD fixes, an ESLint migration, and a documentation cleanup brought order to the whole repository.",
      },
    ],
  },
  {
    month: "2025-11",
    title: "A Journey Worth Navigating",
    summary:
      "Built the journey timeline system, made it filterable, and tidied discovery with a smarter sitemap.",
    overview:
      "November was about telling the story of a path, not just listing the stops along it. The college journey was rebuilt as a proper timeline component with filtering, the sitemap was restructured to cover every page, and a Portfolio Evolution section began documenting the site's own history. A good amount of quiet maintenance kept everything tidy underneath.",
    stats: { commits: 14, files: 50 },
    changes: [
      {
        type: "added",
        title: "A journey you can filter",
        description:
          "Rebuilt the college journey as a dedicated, filterable timeline component with fresh event data and icons, so the path is easy to read and explore.",
      },
      {
        type: "added",
        title: "The site, documenting itself",
        description:
          "A new Portfolio Evolution section captures the site's version history, with links back to its earlier iterations.",
      },
      {
        type: "added",
        title: "A fuller record",
        description:
          "New travel and milestone events, refreshed EventCard styling, and new backend and frontend technologies added to the stack data.",
      },
      {
        type: "improved",
        title: "Nothing hides from search",
        description:
          "Restructured sitemap generation to include both static and dynamic project pages, so every page is discoverable.",
      },
      {
        type: "improved",
        title: "Smarter navigation",
        description:
          "The back button now accepts a destination, allowing direct navigation to specific routes instead of just stepping back.",
      },
      {
        type: "fixed",
        title: "Links that point true",
        description:
          "Updated the resume link and corrected the Webmark project's deployed URL after a domain change.",
      },
    ],
  },
  {
    month: "2025-10",
    title: "The College Journey Takes Shape",
    summary:
      "First real structure for the academic journey, plus unified experience data for consistent storytelling.",
    overview:
      "October laid the groundwork for one of the site's most personal sections. The first structured college-journey implementation arrived with its own timeline and categories, while experience data was pulled into one central source — so every role is told the same, consistent way.",
    stats: { commits: 5, files: 21 },
    changes: [
      {
        type: "added",
        title: "Mapping out the B.Tech years",
        description:
          "A College Journey section and timeline component to chart the academic path, with categorized events that hold together as a story.",
      },
      {
        type: "added",
        title: "One source for experience",
        description:
          "Added experience data and the Awadh logo, and refactored the Professional Experience component to read from a single source of truth.",
      },
      {
        type: "added",
        title: "OpenLearn, properly showcased",
        description:
          "Added the OpenLearn project with a full write-up and cover image, plus a tidier project card that leads with a focused set of features and stacks.",
      },
    ],
  },
  {
    month: "2025-07",
    title: "Gallery-First & a Sharper Visual Brand",
    summary:
      "Gallery interactions, refined social imagery, and a round of brand-consistency fixes.",
    overview:
      "July leaned into the visual side of things. A featured carousel brought the gallery forward, Open Graph and Twitter images were retuned for a more consistent look, and a handful of small fixes kept icons, links, and project details aligned. A large refactor pass tidied the structure holding it all up.",
    stats: { commits: 10, files: 182 },
    changes: [
      {
        type: "added",
        title: "Leading with the best work",
        description:
          "A FeaturedCarousel component brought the gallery's strongest images to the front of the page.",
      },
      {
        type: "added",
        title: "Share previews with polish",
        description:
          "Refined Open Graph and Twitter image styles for a more consistent, aesthetic preview wherever a link lands.",
      },
      {
        type: "added",
        title: "A refreshed project",
        description:
          "Updated the Blogger project details and improved how its tech stack is represented.",
      },
      {
        type: "improved",
        title: "Tidier underneath",
        description:
          "A broad refactor pass improved readability, maintainability, and performance across the codebase.",
      },
      {
        type: "fixed",
        title: "The small things, aligned",
        description:
          "Corrected the Cloudinary icon color and pointed the hackathon link to the right About section.",
      },
    ],
  },
  {
    month: "2025-04",
    title: "From One Page to Many",
    summary:
      "The first multi-page architecture — dedicated product pages, structured sections, and routing primitives.",
    overview:
      "April was where the portfolio stopped being a single page. Routing and a layout structure went in, the Webmark project got a full dedicated page, and a set of content pages gave the site somewhere to grow. There was even a draggable note, just for a bit of playfulness.",
    stats: { commits: 11, files: 73 },
    changes: [
      {
        type: "added",
        title: "A real structure to build on",
        description:
          "Introduced routing and a layout with Navbar, Home, Portfolio, and project pages — the skeleton everything since has hung on.",
      },
      {
        type: "added",
        title: "Somewhere to grow",
        description:
          "About, Blog, Contact, Now, Progress, and Resources pages, each with structured content and components.",
      },
      {
        type: "added",
        title: "Webmark, in full",
        description:
          "A complete project page for Webmark with overview, tech stack, gallery, and a development-journey section.",
      },
      {
        type: "added",
        title: "A playful touch",
        description:
          "A responsive draggable note with its own font styling and sensible visibility boundaries — a small bit of character.",
      },
      {
        type: "improved",
        title: "A sharper homepage",
        description:
          "Refined how the homepage renders, reordering sections and integrating reusable About, FeaturedProject, and LetsTalk components.",
      },
    ],
  },
  {
    month: "2025-03",
    title: "Where It All Started",
    summary:
      "The first commits — React, Tailwind, and the baseline the whole site grew from.",
    overview:
      "Every project has a day one, and this was it. March was the initial React and Tailwind setup, Vercel deployment config, and the first branding assets. Nothing fancy — just the seed that everything since has grown out of.",
    stats: { commits: 4, files: 15 },
    changes: [
      {
        type: "improved",
        title: "The first foundation",
        description:
          "Initial project setup with React, Tailwind CSS, and the first basic components — the very beginning.",
      },
      {
        type: "improved",
        title: "Deployable from day one",
        description:
          "Added Vercel configuration for URL rewrites, so the site could ship from the start.",
      },
      {
        type: "improved",
        title: "The start of an identity",
        description:
          "The first favicon and brand assets — small, but the beginning of how the site would look and feel.",
      },
    ],
  },
];

export const changelogStats = monthlyChangelog.reduce(
  (acc, month) => {
    acc.totalMonths += 1;
    acc.totalChanges += month.changes.length;
    acc.totalCommits += month.stats.commits;

    for (const change of month.changes) {
      acc.typeCounts[change.type] += 1;
    }

    return acc;
  },
  {
    totalMonths: 0,
    totalChanges: 0,
    totalCommits: 0,
    typeCounts: {
      added: 0,
      improved: 0,
      fixed: 0,
    },
  },
);

/** Find a single month's changelog by its ISO month slug (e.g. "2026-06"). */
export function getChangelogEntry(month: string): MonthlyChangelog | undefined {
  return monthlyChangelog.find((entry) => entry.month === month);
}

export function getAdjacentChangelog(month: string): {
  newer: MonthlyChangelog | null;
  older: MonthlyChangelog | null;
} {
  const index = monthlyChangelog.findIndex((entry) => entry.month === month);
  if (index === -1) return { newer: null, older: null };
  return {
    newer: index > 0 ? monthlyChangelog[index - 1] : null,
    older:
      index < monthlyChangelog.length - 1 ? monthlyChangelog[index + 1] : null,
  };
}
