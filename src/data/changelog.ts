export type ChangelogChangeType = "added" | "improved" | "fixed";

export interface ChangelogChange {
  type: ChangelogChangeType;
  text: string;
}

export interface MonthlyChangelog {
  month: string;
  title: string;
  description: string;
  changes: ChangelogChange[];
}

export const monthlyChangelog: MonthlyChangelog[] = [
  {
    month: "2026-06",
    title: "BTech Journey, Shared Files, and Interaction Depth",
    description:
      "June focused on major UX capability upgrades across the BTech journey, content delivery, and gallery interactions, while also tightening data handling, MongoDB reliability, and admin workflows.",
    changes: [
      {
        type: "added",
        text: "Add ProfessorModal component and integrate with syllabus modal. Added ProfessorModal component to display professor details and courses.",
      },
      {
        type: "added",
        text: "Add ProjectMermaidDiagram component for rendering diagrams with Mermaid.js.",
      },
      {
        type: "added",
        text: "Enhance MongoDB connection handling and add utility functions.",
      },
      {
        type: "added",
        text: "Add RevealSection and RevealCard components for scroll-triggered animations.",
      },
      {
        type: "added",
        text: "Enhance layout and link styles across the application. Updated the main layout to wrap children in a <main> element for better semantic structure.",
      },
      {
        type: "added",
        text: "Implement shared file upload and management system. Introduced a new API for handling shared files, including routes for creating, updating, deleting, and fetching files.",
      },
      {
        type: "improved",
        text: "Remove unused components and dependencies related to GitHub and LeetCode activity tracking. Deleted the CodingActivity, GitHubContributions, and LeetCodeStats components along with their associated files.",
      },
      {
        type: "added",
        text: "Enhance image interaction and add lightbox functionality. Update FeaturedImage and GalleryGrid components to support onClick events for images.",
      },
      {
        type: "fixed",
        text: "Refresh metrics in pre-commit to stop pre-push blocking. Run update-metrics and update-tech-versions inside the pre-commit hook.",
      },
      {
        type: "added",
        text: "Implement Open Graph image proxy and enhance About page project previews. Add a new API route for proxying Open Graph images to support external URLs.",
      },
      {
        type: "fixed",
        text: "Integrate LeetCode activity tracking and update error handling. Add new API routes for fetching LeetCode stats and calendar data.",
      },
    ],
  },
  {
    month: "2026-05",
    title: "Professional Narrative and Experience Copy Refresh",
    description:
      "May delivered targeted profile updates to keep internship and prior experience messaging current, while aligning supporting metrics and public-facing copy.",
    changes: [
      {
        type: "added",
        text: "Update internship and previous Zenbase copy.",
      },
    ],
  },
  {
    month: "2026-04",
    title: "Video Platform Launch, Tokenized UI, and Accessibility Hardening",
    description:
      "April was a broad platform release: videos experience launch, design-token migration, accessibility cleanup, experience gallery evolution, and core navigation polish.",
    changes: [
      {
        type: "improved",
        text: "Refresh codebase metrics and YouTube stats.",
      },
      {
        type: "improved",
        text: "Merged pull request updates. Add videos page, design token migration, and a11y fixes.",
      },
      {
        type: "improved",
        text: "Migrate hardcoded colors to semantic design tokens and fix a11y issues. Replace all neutral-*/gray-* Tailwind classes with semantic tokens.",
      },
      {
        type: "added",
        text: "Add YouTube videos page, company-level experience gallery, and native smooth scroll. Add /videos listing + /videos/[slug] detail pages with SSG, SEO metadata, JSON-LD, OG images, and sitemap entries.",
      },
      {
        type: "added",
        text: "Add new projects and timeline events for enhanced portfolio showcase.",
      },
      {
        type: "added",
        text: "Update AboutSection content and enhance font configurations.",
      },
      {
        type: "added",
        text: "Update footer layout for improved responsiveness and alignment.",
      },
      {
        type: "added",
        text: "Improve footer layout and update text for clarity; enhance breadcrumb display logic.",
      },
      {
        type: "added",
        text: "Enhance content and descriptions across various sections for clarity and engagement.",
      },
      {
        type: "added",
        text: "Update homepage sections and enhance typography. Replaced Skills section with Professional Experience on the homepage.",
      },
      {
        type: "added",
        text: "Update links and descriptions for Annam.ai and related experiences.",
      },
      {
        type: "added",
        text: "Add poem section to about page and update font styles.",
      },
      {
        type: "added",
        text: "Add experience gallery management. Introduced API endpoints for managing experience gallery images, including fetching, adding, updating, and deleting images.",
      },
    ],
  },
  {
    month: "2026-02",
    title: "Platform Hardening, Validation Layer, and Developer Ergonomics",
    description:
      "February introduced deep engineering improvements including environment validation, schema-based API validation, auth hardening, module organization, and UX reliability boundaries.",
    changes: [
      {
        type: "added",
        text: "Add current projects to links page and update codebase metrics.",
      },
      {
        type: "added",
        text: "Add new timeline event for spiritual trip to Shree Mata Vaishno Devi Temple.",
      },
      {
        type: "improved",
        text: "Simplify SitePage component by removing unused data fetching and enhancing repository summary.",
      },
      {
        type: "improved",
        text: "Upgrade ESLint config and add Zod dependency. Add consistent-type-imports rule (warn, prefer type imports).",
      },
      {
        type: "improved",
        text: "Convert to consistent type-only imports. Apply @typescript-eslint/consistent-type-imports rule.",
      },
      {
        type: "fixed",
        text: "Add error and loading boundaries for improved UX. Create error.tsx boundaries for (main) and admin route groups.",
      },
      {
        type: "added",
        text: "Centralize design tokens and theme constants. Create src/constants/theme.ts with CATEGORY_COLORS and SOCIAL_BRAND_COLORS.",
      },
      {
        type: "added",
        text: "Add barrel exports for component modules. Create src/components/layout/index.ts (Navbar, Footer).",
      },
      {
        type: "added",
        text: "Add barrel exports for lib, models, types, and data. Create src/lib/index.ts exporting all utilities (cn, fetcher, dates, github, seo, auth, cloudinary, validations).",
      },
      {
        type: "improved",
        text: "Extract shared utilities and derive config from constants. Extract Cloudinary config to src/lib/cloudinary.ts (DRY principle).",
      },
      {
        type: "added",
        text: "Add Zod validation schemas for all API routes. Create src/lib/validations.ts with comprehensive request schemas.",
      },
      {
        type: "improved",
        text: "Remove hardcoded JWT fallback and add auth middleware. Remove dangerous hardcoded JWT_SECRET fallback in auth.ts.",
      },
      {
        type: "added",
        text: "Add runtime environment variable validation with Zod. Create .env.example documenting all 15 required environment variables.",
      },
      {
        type: "improved",
        text: "Remove unnecessary shebang and husky script initialization from pre-commit hook.",
      },
      {
        type: "added",
        text: "Add CommitActivity component for displaying recent GitHub commits. Enhance GitHubContributions component with client-side rendering.",
      },
      {
        type: "improved",
        text: "Merged pull request updates. Refactor the CI/CD Pipeline.",
      },
      {
        type: "fixed",
        text: "Change HTTP method from GET to POST for visitor count increment.",
      },
      {
        type: "added",
        text: "Refactor codebase. Integrate Lenis for smooth scrolling and update VSCode settings.",
      },
      {
        type: "improved",
        text: "Remove ignored built dependencies from pnpm workspace configuration.",
      },
      {
        type: "added",
        text: "Enhance timeline events with static IDs and improve date formatting. Updated timeline events to use static IDs for better consistency.",
      },
    ],
  },
  {
    month: "2026-01",
    title: "Routing, Open Graph Automation, and Navigation Evolution",
    description:
      "January strengthened routing and metadata quality with dynamic Open Graph pipelines, navigation enhancements, and better timeline and link modeling.",
    changes: [
      {
        type: "added",
        text: "Integrate Lenis for smooth scrolling and update VSCode settings.",
      },
      {
        type: "fixed",
        text: "Update project URLs to remove staging subdomain.",
      },
      {
        type: "added",
        text: "Add current work links and update link item type for dynamic rendering.",
      },
      {
        type: "added",
        text: "Add experience details and update the experience card layout.",
      },
      {
        type: "added",
        text: "Restore Open Graph image handling and Twitter image export functionality.",
      },
      {
        type: "added",
        text: "Refactor Open Graph image handling and update SEO metadata configuration.",
      },
      {
        type: "added",
        text: "Implement dynamic OG images for all routes. Create reusable OG image template utility.",
      },
      {
        type: "added",
        text: "Update navigation links and enhance timeline events with new job details.",
      },
      {
        type: "added",
        text: "Replace BackButton with Breadcrumb component for improved navigation.",
      },
    ],
  },
  {
    month: "2025-12",
    title: "Admin Foundation, Analytics, and Portfolio Expansion Sprint",
    description:
      "December established the admin subsystem, cloud media workflows, analytics integrations, multiple content pages, and broad portfolio information architecture upgrades.",
    changes: [
      {
        type: "added",
        text: "Update About section with new project details and add 'Let's Connect' section.",
      },
      {
        type: "added",
        text: "Implement GitHub API integration to fetch latest commits.",
      },
      {
        type: "added",
        text: "Add additional images to experience section.",
      },
      {
        type: "added",
        text: "Improve date parsing logic in calculateDuration function.",
      },
      {
        type: "added",
        text: "Enhance date parsing logic in calculateDuration function.",
      },
      {
        type: "added",
        text: "Add portfolio project details and update tech stack icons.",
      },
      {
        type: "improved",
        text: "Remove emojis from project documentation for consistency.",
      },
      {
        type: "added",
        text: "Add contributing guidelines and issue templates for better project management.",
      },
      {
        type: "improved",
        text: "Remove unused dependencies from pnpm-lock.yaml.",
      },
      {
        type: "added",
        text: "Update README for enhanced project description and remove unused dependencies.",
      },
      {
        type: "added",
        text: "Add automated code quality checks with pre-commit hooks and CI/CD fixes.",
      },
      {
        type: "improved",
        text: "Refactor code for consistency and readability across multiple files. Updated formatting in use-client.tsx, use-isomorphic.tsx, use-media.tsx, use-page-tracking.tsx, auth.ts, date-utils.ts, git.ts, mongodb.ts, seo.tsx, shadcn-ui.ts, spotify.ts, admin.ts, gallery.ts, visitor.ts, react-query.tsx, gtag.d.ts, tailwind.config.ts, and tsconfig.json.",
      },
      {
        type: "improved",
        text: "Refactor code for consistency and readability.",
      },
      {
        type: "added",
        text: "Update image handling to support both StaticImageData and string types across components.",
      },
      {
        type: "improved",
        text: "Format CI/CD pipeline YAML file for improved readability.",
      },
      {
        type: "added",
        text: "Add action links for booking a call; update routing and UI components.",
      },
      {
        type: "added",
        text: "Migrate ESLint configuration to eslint.config.mjs; update linting scripts and dependencies.",
      },
      {
        type: "added",
        text: "Add MongoDB URI check in admin creation script. Update experience page to handle params as promises.",
      },
      {
        type: "fixed",
        text: "Enhance admin login page with improved UI and error handling; add new dashboard layout and cards for content management.",
      },
      {
        type: "added",
        text: "Implement admin authentication system with session management and admin user creation script.",
      },
      {
        type: "added",
        text: "Implement admin panel layout and authentication. Created AdminLayout component for consistent layout across admin pages.",
      },
      {
        type: "added",
        text: "Add FeaturedCarousel component with customizable title and subtitle; integrate gallery images into Links page.",
      },
      {
        type: "added",
        text: "Add 'Journey' link with icon to links section; adjust IDs for consistency.",
      },
      {
        type: "added",
        text: "Add Google Analytics, Search Console verification, and Microsoft Clarity integration.",
      },
      {
        type: "added",
        text: "Enhance portfolio metadata and SEO; update config and manifest for improved clarity and structure.",
      },
      {
        type: "added",
        text: "Update category of timeline event from 'learning' to 'workshop' for clarity.",
      },
      {
        type: "added",
        text: "Update project repository URL and adjust project dates; refactor function naming for clarity.",
      },
      {
        type: "added",
        text: "Remove redundant export of GalleryItem type from gallery index.",
      },
      {
        type: "added",
        text: "Add new sections and components for About, Contact, Professional Experience, and Skills; implement SEO enhancements and shared utilities.",
      },
      {
        type: "added",
        text: "Add Links page with primary, social, and support links; implement GitHub contributions stats.",
      },
      {
        type: "added",
        text: "Add new timeline events for Startup Mahakumbh and spiritual trip to Mathura & Vrindavan.",
      },
      {
        type: "added",
        text: "Enhance Spotify Now Playing API response handling and prevent caching.",
      },
      {
        type: "added",
        text: "Refactor duration calculation to improve date parsing and validation.",
      },
      {
        type: "added",
        text: "Add functions to fetch first and last commit dates from GitHub repositories. Implemented `getGitCommitDates` to retrieve commit dates for a given repo URL.",
      },
      {
        type: "added",
        text: "Add new travel events to timeline and update duration calculation logic.",
      },
      {
        type: "added",
        text: "Enhance About page layout for improved responsiveness and user experience.",
      },
      {
        type: "added",
        text: "Integrate Spotify Now Playing feature with API and UI components.",
      },
      {
        type: "added",
        text: "Add About This Site page with technical details and design philosophy.",
      },
      {
        type: "added",
        text: "Enhance experience section with detailed pages, timeline, and carousel for better user engagement.",
      },
      {
        type: "added",
        text: "Enhance stats and search layout for better user experience.",
      },
      {
        type: "improved",
        text: "Refactor code structure for improved readability and maintainability.",
      },
      {
        type: "added",
        text: "Update timeline events with new titles, descriptions, and links for clarity.",
      },
    ],
  },
  {
    month: "2025-11",
    title: "Journey Timeline System and Discoverability Improvements",
    description:
      "November centered on timeline modeling, journey filtering, sitemap expansion, and quality fixes to keep route links and project discovery accurate.",
    changes: [
      {
        type: "added",
        text: "Restructure sitemap generation to include static and dynamic project pages.",
      },
      {
        type: "added",
        text: "Add new timeline events for travel and project milestones with corresponding icons.",
      },
      {
        type: "improved",
        text: "Remove unused components and files for better maintainability.",
      },
      {
        type: "added",
        text: "Enhance Journey page with new header and timeline filtering functionality.",
      },
      {
        type: "fixed",
        text: "Update resume link in configuration and about page.",
      },
      {
        type: "fixed",
        text: "Update deployed URL for webmark project to reflect new domain.",
      },
      {
        type: "added",
        text: "Update BackButton component to accept href prop for navigation. Modified BackButton component to accept an optional href prop, allowing for direct navigation to specified routes.",
      },
      {
        type: "improved",
        text: "Refactor code structure for improved readability and maintainability.",
      },
      {
        type: "added",
        text: "Update EventCard styling and add new project and timeline events.",
      },
      {
        type: "added",
        text: "Add new backend and frontend technologies to stack data.",
      },
      {
        type: "improved",
        text: "Refactor code structure for improved readability and maintainability.",
      },
      {
        type: "added",
        text: "Enhance TimelineComponent with new icons and update EventCard layout for better metadata display.",
      },
      {
        type: "added",
        text: "Add Portfolio Evolution section with version history and links to previous site iterations.",
      },
      {
        type: "added",
        text: "Refactor college journey structure by removing old year pages and introducing a new journey timeline component with updated event data.",
      },
    ],
  },
  {
    month: "2025-10",
    title: "College Journey Architecture and Experience Data Unification",
    description:
      "October introduced the first structured college journey implementation and unified experience data presentation for stronger storytelling consistency.",
    changes: [
      {
        type: "added",
        text: "Remove SimpleTags component and clear events from college timeline for streamlined data structure.",
      },
      {
        type: "added",
        text: "Update college timeline with new events and categories for enhanced academic journey representation.",
      },
      {
        type: "added",
        text: "Add College Journey and Timeline components with mock data. Implemented CollegeJourneySection component to display B.Tech journey timeline.",
      },
      {
        type: "added",
        text: "Add experience data and Awadh logo; refactor ProfessionalExperience component to use centralized experience data.",
      },
      {
        type: "added",
        text: "Add OpenLearn project with detailed description and cover image; update project item display to show limited features and stacks.",
      },
    ],
  },
  {
    month: "2025-07",
    title: "Gallery Interaction Layer and Visual Brand Refinements",
    description:
      "July shipped gallery-first UI updates, Open Graph visual tuning, project metadata refreshes, and focused fixes for link and icon consistency.",
    changes: [
      {
        type: "improved",
        text: "Refactor code structure for improved readability and maintainability.",
      },
      {
        type: "fixed",
        text: "Update hackathon link to point to the About section.",
      },
      {
        type: "added",
        text: "Update OpenGraph and Twitter image styles for improved aesthetics and consistency.",
      },
      {
        type: "added",
        text: "Add FeaturedCarousel component and integrate it into the gallery page.",
      },
      {
        type: "fixed",
        text: "Update Cloudinary icon color for consistency in backend stacks.",
      },
      {
        type: "added",
        text: "Update Blogger project details and enhance tech stack representation.",
      },
      {
        type: "improved",
        text: "Implement code changes to enhance functionality and improve performance.",
      },
      {
        type: "improved",
        text: "Refactor code structure for improved readability and maintainability.",
      },
      {
        type: "improved",
        text: "Refactor code structure for improved readability and maintainability.",
      },
      {
        type: "added",
        text: "Consolidate July 9, 2025 changes.",
      },
    ],
  },
  {
    month: "2025-04",
    title: "Multi-page Portfolio Foundation and Productized Content Sections",
    description:
      "April built the initial multi-page architecture with dedicated product pages, structured content sections, and layout/routing primitives for future growth.",
    changes: [
      {
        type: "added",
        text: "Replace Comic Sans with Delius font in DraggableNote and update font imports.",
      },
      {
        type: "added",
        text: "Add responsive positioning for DraggableNote and implement Comic Sans font styling.",
      },
      {
        type: "added",
        text: "Enhance DraggableNote component with responsive positioning and improved visibility boundaries.",
      },
      {
        type: "added",
        text: "Add About, Blog, Contact, Now, Progress, and Resources pages with structured content and components. Implemented About page with personal introduction, skills, experience, education, and achievements.",
      },
      {
        type: "added",
        text: "Update routing and enhance portfolio section with detailed project information and contact form.",
      },
      {
        type: "added",
        text: "Implement Webmark project page with detailed overview, tech stack, gallery, and development journey sections.",
      },
      {
        type: "improved",
        text: "Refactor code structure for improved readability and maintainability.",
      },
      {
        type: "improved",
        text: "Add About, FeaturedProject, LetsTalk components and integrate Footer in App.",
      },
      {
        type: "improved",
        text: "Swap Progress and Hero component rendering in Home page.",
      },
      {
        type: "improved",
        text: "Swap Progress and Hero component rendering in Home page.",
      },
      {
        type: "improved",
        text: "Implement routing and layout structure with Navbar, Home, Portfolio, and Webmark pages.",
      },
    ],
  },
  {
    month: "2025-03",
    title: "Project Bootstrap and Deployment Baseline",
    description:
      "March established the initial React and Tailwind baseline, deployment rewrites, and core branding assets that seeded later iterations.",
    changes: [
      {
        type: "improved",
        text: "Update favicon image.",
      },
      {
        type: "improved",
        text: "Add Vercel configuration for URL rewrites.",
      },
      {
        type: "improved",
        text: "Add initial project setup with React, Tailwind CSS, and basic components.",
      },
      {
        type: "improved",
        text: "Initial commit.",
      },
    ],
  },
];

export const changelogStats = monthlyChangelog.reduce(
  (acc, month) => {
    acc.totalMonths += 1;
    acc.totalChanges += month.changes.length;

    for (const change of month.changes) {
      acc.typeCounts[change.type] += 1;
    }

    return acc;
  },
  {
    totalMonths: 0,
    totalChanges: 0,
    typeCounts: {
      added: 0,
      improved: 0,
      fixed: 0,
    },
  },
);
