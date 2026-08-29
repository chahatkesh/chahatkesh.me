/**
 * Editorial copy and URL metadata for stack detail pages.
 * Icons live in stack.tsx; this file holds slug, description, and aliases.
 *
 * Subtitles and descriptions stay general: how I use the technology.
 * Project and role mappings are derived from data, not listed here.
 */

export type StackCopyMeta = {
  slug?: string;
  description: string;
  aliases?: string[];
};

/** Stable slug overrides for names that slugify ambiguously. */
export const STACK_SLUG_OVERRIDES: Record<string, string> = {
  "C++": "cpp",
  C: "c",
  "@dnd-kit": "dnd-kit",
};

export function slugifyStackName(name: string): string {
  if (STACK_SLUG_OVERRIDES[name]) return STACK_SLUG_OVERRIDES[name];

  return name
    .toLowerCase()
    .replace(/\./g, "-")
    .replace(/[^a-z0-9\s-/]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Page-header subtitles for stack detail pages (≤72 chars, no truncation). */
export const STACK_SUBTITLES: Record<string, string> = {
  "C++": "Performance and memory layout — how I reason about systems.",
  C: "Pointers, memory, and the constraints higher-level languages hide.",
  Python: "My default for AI pipelines, FastAPI, and rapid experimentation.",
  JavaScript: "Where I learned the web — browser and server work together.",
  TypeScript: "My daily driver for production apps, APIs, and monorepos.",
  Git: "Branches for experiments, commits as narrative, history I trust.",
  GitHub: "Public repos, contributions, and the trail of work I ship.",
  Slack: "Async product work and a source of structured team signal.",
  Notion: "Notes, specs, and a place decisions can flow back from.",
  VSCode: "My primary editor across TypeScript, Python, and monorepos.",
  Figma: "UI ideas shared before code — layout and interaction alignment.",
  HTML5: "Semantic, accessible markup — the skeleton of every interface.",
  "HTML5 Canvas":
    "Pixel-level rendering when the DOM is not the right surface.",
  CSS3: "Layout and polish where utilities aren't the whole story.",
  React: "Components and hooks across dashboards, sites, and products.",
  "React.js": "Components and hooks across dashboards, sites, and products.",
  "@dnd-kit": "Accessible drag-and-drop that feels native, not bolted on.",
  "Next.js": "Production apps with App Router, RSC, and SEO built in.",
  Vite: "Fast SPA iteration with a clean, predictable production build.",
  "Tailwind CSS": "Consistent UI quickly — tokens and utilities site-wide.",
  "Chakra UI":
    "Accessible primitives and theming without reinventing the base.",
  "shadcn/ui": "Radix-backed components I own with accessible defaults.",
  "Aceternity UI":
    "Motion-forward treatments that feel intentional, not generic.",
  "Framer Motion":
    "Transitions, hovers, and staggered reveals that feel alive.",
  "React Toastify":
    "Non-blocking feedback for saves, errors, and admin actions.",
  "React Helmet":
    "Dynamic titles and Open Graph tags for client-rendered SPAs.",
  Recharts: "Product metrics that stay readable at a glance.",
  SWR: "Cached client data with revalidation, without extra state machinery.",
  "GitHub API": "Live developer data, rate-limit aware and identity-accurate.",
  "Retrieval-Augmented Generation":
    "Grounding LLM answers in retrieved evidence with citations.",
  "Radix UI": "Accessible dialogs, menus, and controls with keyboard support.",
  "Lucide React": "Consistent stroke icons across shadcn-style interfaces.",
  Flutter: "Native mobile workflows for capture, scanning, and uploads.",
  "Artificial Intelligence":
    "Speech, OCR, classification, and grounded answers in production.",
  "Machine Learning":
    "Domain-specific models, evaluation fixtures, and inference.",
  "AI Pipelines": "Composable STT, retrieval, LLM, and caching stages.",
  "Classification Algorithms":
    "Routing unstructured queries before retrieval can answer.",
  "Full Stack Development":
    "Owning UI, APIs, data models, and deployment together.",
  "Research & Development":
    "Prototypes that earn their place before production.",
  "Data Modeling": "Schemas and evaluation data that keep AI systems legible.",
  "Node.js": "APIs, integrations, and services on the JavaScript runtime.",
  "Express.js": "Modular routes, middleware, and a lean HTTP surface.",
  MongoDB: "Flexible document storage for blogs, bookmarks, and product data.",
  Mongoose: "Schemas, validation, and population on document stores.",
  Cloudinary:
    "Optimized uploads and transforms without owning an image pipeline.",
  "REST APIs": "Predictable resources and error shapes for frontend contracts.",
  "API Integration":
    "OAuth, speech, payments, and webhooks wired for production.",
  Axios: "HTTP client with interceptors and consistent error handling.",
  PostgreSQL: "Relational data where integrity, joins, and migrations matter.",
  MySQL: "Normalized schemas when tables fit better than documents.",
  Docker: "Reproducible environments from local to CI to production.",
  "GitHub Actions": "CI and deploy pipelines that keep releases honest.",
  AWS: "Compute, storage, and IAM with production operational discipline.",
  GCP: "Google Cloud services where that stack fits the workload.",
  "Third-Party Integrations":
    "Stripe, OAuth, and messaging with graceful failures.",
  SQL: "Queries and migrations that keep ORMs aligned with the database.",
  "RESTful APIs":
    "Predictable resources and error shapes for frontend contracts.",
  "OpenAI API":
    "Prompt design, token budgets, and error handling for LLM features.",
  Anthropic: "Grounded product intelligence with traceable customer evidence.",
  LangChain: "Structured LLM workflows when raw API calls would sprawl.",
  "Vector Databases": "Embeddings and similarity search before generation.",
  Qdrant: "Semantic retrieval where answers must cite their source chunks.",
  Stripe: "Checkout, webhooks, and the UX around money moving in production.",
  JWT: "Stateless auth, refresh patterns, and actually protected routes.",
  "NextAuth.js":
    "Session handling without reinventing auth on every Next.js app.",
  "Passport.js":
    "OAuth strategies, callbacks, and cookie sessions done strictly.",
  "Prisma ORM": "Relational models and migrations I can trust in production.",
  Redis: "Caching, sessions, and queues where latency and async work meet.",
  BullMQ: "Durable queues, retries, and workers that don't block the product.",
  "pnpm Workspaces":
    "Shared packages, isolated deps, and a tree that stays honest.",
  LiveKit: "Realtime sessions and media without building WebRTC from scratch.",
  FastAPI: "Async Python APIs with OpenAPI docs and clean service boundaries.",
  "AWS Lambda": "Event-driven work that scales to zero between bursts.",
  "AWS S3":
    "Durable objects, presigned uploads, and trigger-driven processing.",
  DynamoDB: "Low-latency serverless records with predictable performance.",
  Vercel: "Edge-friendly Next.js deploys, cron, and low shipping friction.",
};

export const STACK_COPY: Record<string, StackCopyMeta> = {
  // Languages & Tools
  "C++": {
    description:
      "I reach for C++ when the calculation has to be exact and owned — native engines, tight memory layout, and a language boundary so numerical work never leaks into the TypeScript layer.",
  },
  C: {
    description:
      "C taught me how machines actually move data. It is part of the bedrock behind my understanding of pointers, memory, and the constraints that higher-level languages hide.",
  },
  Python: {
    description:
      "Python is my default for AI pipelines, FastAPI services, and quick experimentation — the language I use when retrieval, inference, and orchestration need to move faster than the UI layer.",
  },
  JavaScript: {
    description:
      "JavaScript is where I learned the web. I still ship it in production on both sides of the network — it is the runtime that ties browser and server work together.",
  },
  TypeScript: {
    description:
      "TypeScript is my daily driver for production work — Next.js apps, Express APIs, and monorepos where contracts between layers need to stay honest.",
  },
  Git: {
    description:
      "Git is how I think about change — branches for experiments, commits as narrative, and history as something you can trust when debugging or collaborating across long-running products.",
  },
  GitHub: {
    description:
      "GitHub is where my work lives publicly — repos, contributions, reviews, and the open-source trail that makes a body of work inspectable instead of anecdotal.",
  },
  Slack: {
    description:
      "Slack keeps async product work moving. I also treat it as a signal source — customer feedback and team context that has to become structured product understanding.",
  },
  Notion: {
    description:
      "Notion is part of my workflow for notes, specs, and documentation — and as a connected source where decisions and context need to flow back into a product graph.",
  },
  VSCode: {
    description:
      "VS Code is my primary editor — extensions, integrated terminal, and the muscle memory that lets me stay in flow across TypeScript, Python, and config-heavy monorepos.",
  },
  Figma: {
    description:
      "Figma is where UI ideas become shareable before code. I use it to align on layout, spacing, and interaction patterns — especially when design and engineering need a common reference.",
  },

  // Frontend
  HTML5: {
    description:
      "HTML5 is the semantic skeleton of every interface I ship. I care about accessible structure, meaningful landmarks, and markup that still makes sense when styles or scripts fail.",
  },
  "HTML5 Canvas": {
    description:
      "I use HTML5 Canvas when the DOM is the wrong surface — pixel-level control for bulk rendering, previews, and generation workflows that have to look polished without a round-trip per frame.",
  },
  CSS3: {
    description:
      "CSS3 handles layout and polish where a utility framework is not the whole story — responsive styling, custom properties, and the cases where cascade still earns its keep.",
  },
  React: {
    description:
      "React is the UI layer I reach for most often — component composition, hooks, and the ecosystem around it power dashboards, marketing sites, and product surfaces.",
    aliases: ["React.js"],
  },
  "React.js": {
    description:
      "React.js is the UI layer I reach for most often — component composition, hooks, and the ecosystem around it power dashboards, marketing sites, and product surfaces.",
    aliases: ["React"],
  },
  "@dnd-kit": {
    slug: "dnd-kit",
    description:
      "I reach for @dnd-kit when reorder has to stay accessible and composable — optimistic UI with persistence that feels native, not a library bolted onto the page.",
  },
  "Next.js": {
    description:
      "Next.js is my default for production web apps — App Router, server components, route handlers, and SEO primitives when the product needs to be fast, crawlable, and deployable as one system.",
  },
  Vite: {
    description:
      "Vite keeps frontend iteration fast. I use it for SPAs where a sharp dev server and a clean production build matter more than framework ceremony.",
  },
  "Tailwind CSS": {
    description:
      "Tailwind CSS is how I ship consistent UI quickly — design tokens, responsive utilities, and shadcn-style composition without maintaining a parallel stylesheet language.",
  },
  "Chakra UI": {
    description:
      "Chakra UI gives me accessible primitives and theming so a team can ship a dashboard without reinventing base components or fighting focus states.",
  },
  "shadcn/ui": {
    description:
      "shadcn/ui gives me Radix-backed components I own in the repo — accessible defaults with Tailwind-level control, without a black-box component package.",
  },
  "Aceternity UI": {
    description:
      "Aceternity UI is part of a motion-forward aesthetic — polished hero treatments and micro-interactions that make marketing surfaces feel intentional, not generic.",
  },
  "Framer Motion": {
    description:
      "Framer Motion adds deliberate motion — page transitions, hover feedback, and staggered reveals where UX should feel alive without becoming noise.",
  },
  "React Toastify": {
    description:
      "React Toastify handles non-blocking feedback — save confirmations, subscription updates, and admin actions where users need a clear signal without leaving context.",
  },
  "React Helmet": {
    description:
      "React Helmet keeps SPA metadata honest — dynamic titles, Open Graph tags, and SEO helpers for client-rendered products that still need to be discoverable.",
  },
  Recharts: {
    description:
      "Recharts powers analytics visuals — click trends, admin metrics, and dashboards where product numbers need to be readable at a glance rather than dumped as tables.",
  },
  SWR: {
    description:
      "SWR is my go-to for client-side data that should feel instant — caching, revalidation, and deduplication without over-building state machinery.",
  },
  "GitHub API": {
    description:
      "The GitHub API feeds live developer data into products — contribution graphs, profile stats, and identity that has to stay accurate and rate-limit aware.",
  },
  "Retrieval-Augmented Generation": {
    description:
      "RAG is how I ground LLM answers in real evidence — retrieval, citation, and context windows where hallucination is not acceptable.",
  },
  "Radix UI": {
    description:
      "Radix UI primitives underpin accessible dialogs, menus, and form controls — keyboard support and focus management as defaults, not afterthoughts.",
  },
  "Lucide React": {
    description:
      "Lucide React is my icon set for product UIs — consistent stroke icons without bloating bundles with one-off SVG assets.",
  },
  Flutter: {
    description:
      "Flutter is how I ship native-feeling mobile workflows — audio capture, document scanning, and offline-friendly uploads tied to a backend that already exists.",
  },

  // Backend & DevOps
  "Artificial Intelligence": {
    description:
      "AI is not a buzzword in my work — it is production pipelines for speech, OCR, classification, and grounded answers. I build systems where models are one stage in an observable, testable flow.",
  },
  "Machine Learning": {
    description:
      "Machine learning shows up as domain-specific models, evaluation fixtures, and inference pipelines that had to improve before they shipped — not notebooks that never left the laptop.",
  },
  "AI Pipelines": {
    description:
      "I design AI pipelines as composable services — STT, retrieval, LLM structuring, and caching stages with timing instrumentation so each step can be debugged independently in production.",
  },
  "Classification Algorithms": {
    description:
      "Classification is how unstructured queries become routable — distinct handling for different intents before retrieval or generation is allowed to answer.",
  },
  "Full Stack Development": {
    description:
      "Full-stack work is my default mode — owning UI, API contracts, data models, and deployment together so products ship as coherent systems, not handoffs between silos.",
  },
  "Research & Development": {
    description:
      "R&D is where prototypes earn their place — experimenting with retrieval, speech, and service boundaries before those patterns harden into production integrations.",
  },
  "Data Modeling": {
    description:
      "Data modeling is how I make AI systems legible — schemas, relationships, and evaluation data that let classifiers and retrieval layers evolve without breaking downstream consumers.",
  },
  "Node.js": {
    description:
      "Node.js backs most of my APIs — route handlers, integrations, and serverless-adjacent services where one language across the stack keeps the feedback loop short.",
  },
  "Express.js": {
    description:
      "Express.js is my pragmatic API layer — modular routes, middleware, and a lean HTTP surface when framework ceremony would get in the way of a clear contract.",
  },
  MongoDB: {
    description:
      "MongoDB is my document store of choice for product data — flexible schemas for content, bookmarks, visitors, and records where iteration speed matters more than rigid normalization.",
  },
  Mongoose: {
    description:
      "Mongoose adds structure to MongoDB — schemas, validation, and population patterns so document data still has a contract the rest of the app can trust.",
  },
  Cloudinary: {
    description:
      "Cloudinary handles media at scale — optimized uploads and transformations without running my own image pipeline.",
  },
  "REST APIs": {
    description:
      "REST APIs are how my frontends talk to backends — predictable resources, clear error shapes, and contracts I can document and test.",
    aliases: ["RESTful APIs"],
  },
  "API Integration": {
    description:
      "API integration is where products meet the outside world — OAuth providers, speech services, payment rails, and webhooks wired with retries, validation, and observability.",
  },
  Axios: {
    description:
      "Axios is my HTTP client on React SPAs — interceptors, typed responses, and consistent error handling so every request fails in the same, recoverable way.",
  },
  PostgreSQL: {
    description:
      "PostgreSQL is my relational store for structured product data — integrity, joins, and migrations when the model is a graph of entities rather than a bag of documents.",
  },
  MySQL: {
    description:
      "MySQL is part of my SQL toolkit for relational workloads — normalized schemas and reporting queries when the data model fits tables more than documents.",
  },
  Docker: {
    description:
      "Docker keeps environments reproducible — app, native binaries, and supporting services packaged so local, CI, and production actually match.",
  },
  "GitHub Actions": {
    description:
      "GitHub Actions automates CI and deploy — format, lint, type-check, tests, image builds, and health-gated releases without a manual ritual.",
  },
  AWS: {
    description:
      "AWS is the cloud backbone I reach for when workloads need Lambda, S3, IAM, and the operational discipline to run in production rather than on a laptop.",
  },
  GCP: {
    description:
      "GCP is in my cloud toolkit for services and integrations where Google's stack fits the workload — part of the multi-cloud picture alongside AWS-centric builds.",
  },
  "Third-Party Integrations": {
    description:
      "Third-party integrations are product features — Stripe, OAuth, speech APIs, and messaging platforms wired so failures degrade gracefully and users still understand what happened.",
  },
  SQL: {
    description:
      "SQL is how I query and shape relational truth — migrations, analytics, and the ad-hoc investigations that keep ORMs and application code aligned with what's actually in the database.",
  },
  "RESTful APIs": {
    description:
      "RESTful APIs are how my frontends talk to backends — predictable resources, clear error shapes, and contracts I can document and test.",
    aliases: ["REST APIs"],
  },
  "OpenAI API": {
    description:
      "The OpenAI API is how I ship LLM features — prompt design, token budgets, and error handling where model output is a user-facing product, not a demo.",
  },
  Anthropic: {
    description:
      "Anthropic models power grounded product intelligence — long-context reasoning and citation-friendly answers where evidence has to stay traceable to its source.",
  },
  LangChain: {
    description:
      "LangChain helps compose LLM workflows when retrieval, tools, and chaining need structure — a layer I reach for when raw API calls would sprawl across services.",
  },
  "Vector Databases": {
    description:
      "Vector databases are the retrieval layer behind grounded AI — embeddings, similarity search, and context assembly before an LLM ever generates a token.",
  },
  Qdrant: {
    description:
      "Qdrant is my vector store for semantic retrieval — similarity search where answers must cite the chunks they came from.",
  },
  Stripe: {
    description:
      "Stripe handles payments — checkout flows, webhooks, and the compliance-minded UX around money moving in production.",
  },
  JWT: {
    description:
      "JWT secures stateless auth — signed tokens, refresh patterns, and middleware that keeps protected routes actually protected.",
  },
  "NextAuth.js": {
    description:
      "NextAuth.js handles session and provider configuration so I do not reinvent auth on every Next.js surface that needs a login.",
  },
  "Passport.js": {
    description:
      "Passport.js orchestrates OAuth — strategies, callbacks, and cookie sessions where sign-in has to be strict and recoverable.",
  },
  "Prisma ORM": {
    description:
      "Prisma ORM models relational domains I can migrate in production — typed clients, schema as source of truth, and migrations that stay reviewable.",
  },
  Redis: {
    description:
      "Redis is my cache and queue backbone — session storage, response caching, and job processing where latency and async work share the same infra.",
  },
  BullMQ: {
    description:
      "BullMQ runs background jobs — durable queues, retries, and worker isolation so ingestion and AI tasks do not block interactive product workflows.",
  },
  "pnpm Workspaces": {
    description:
      "pnpm workspaces keep packages honest — shared types, isolated dependencies, and a tree that stays coordinated instead of a single tangled install.",
  },
  LiveKit: {
    description:
      "LiveKit enables realtime communication — live sessions and media workflows integrated into a product without building WebRTC from scratch.",
  },
  FastAPI: {
    description:
      "FastAPI is my Python API framework of choice — async routes, OpenAPI docs, and service boundaries when the backend is inference-heavy rather than CRUD-heavy.",
  },
  "AWS Lambda": {
    description:
      "AWS Lambda is how I run event-driven work — S3 triggers, transcription, and digitization tasks that should scale to zero between bursts.",
  },
  "AWS S3": {
    description:
      "AWS S3 stores durable objects — presigned uploads from clients, trigger-driven processing, and media that should not live on the app server.",
  },
  DynamoDB: {
    description:
      "DynamoDB backs serverless data paths — low-latency records and stream-driven updates where Lambda and mobile clients need predictable performance.",
  },
  Vercel: {
    description:
      "Vercel is how I ship Next.js and static frontends — edge-friendly deploys, cron, and the DX that keeps shipping friction low.",
  },
};
