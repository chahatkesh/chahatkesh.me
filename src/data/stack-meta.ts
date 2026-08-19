/**
 * Editorial copy and URL metadata for stack detail pages.
 * Icons live in stack.tsx; this file holds slug, description, and aliases.
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
  GitHub: "Public repos behind this portfolio, OpenLearn, and Swasya AI.",
  Slack: "Async product work — and a connected signal source at Layr.",
  Notion: "Notes, specs, and a connected source in Layr's product graph.",
  VSCode: "My primary editor across TypeScript, Python, and monorepos.",
  Figma: "UI ideas shared before code — layout and interaction alignment.",
  HTML5: "Semantic, accessible markup — the skeleton of every interface.",
  "HTML5 Canvas":
    "Bulk certificate rendering at Xceed with pixel-level control.",
  CSS3: "Layout and polish on Tomato where utilities aren't the whole story.",
  React: "Components and hooks across dashboards, sites, and products.",
  "React.js": "Components and hooks across dashboards, sites, and products.",
  "@dnd-kit":
    "Accessible drag-and-drop on Webmark with native-feeling reorder.",
  "Next.js": "Production apps with App Router, RSC, and SEO built in.",
  Vite: "Fast iteration on OpenLearn, Webmark, GW Infra, and Swasya.",
  "Tailwind CSS": "Consistent UI quickly — tokens and utilities site-wide.",
  "Chakra UI": "Accessible primitives for the Xceed certificate dashboard.",
  "shadcn/ui": "Radix-backed components I own with accessible defaults.",
  "Aceternity UI": "Motion-forward hero treatments on this portfolio site.",
  "Framer Motion":
    "Transitions, hovers, and staggered reveals that feel alive.",
  "React Toastify": "Non-blocking feedback on Blogger saves and subscriptions.",
  "React Helmet": "Dynamic metadata for Webmark's client-rendered SPA.",
  Recharts: "Analytics visuals on Webmark profiles and GW Infra dashboards.",
  SWR: "Cached client data on Webmark and OpenLearn with revalidation.",
  "GitHub API": "Live contribution data on this portfolio and GitRoast.",
  "Retrieval-Augmented Generation":
    "Grounding LLM answers in retrieved evidence with citations.",
  "Radix UI":
    "Accessible dialogs, menus, and controls on Webmark and GW Infra.",
  "Lucide React": "Consistent stroke icons across shadcn-style interfaces.",
  Flutter: "Swasya's nurse app — audio capture, scanning, and uploads.",
  "Artificial Intelligence":
    "Production pipelines for speech, OCR, classification, and grounded answers.",
  "Machine Learning":
    "Agricultural query classification and inference at Annam.ai.",
  "AI Pipelines": "Composable STT, retrieval, LLM, and caching stages.",
  "Classification Algorithms":
    "Routing crop, weather, market, and scheme queries before RAG answers.",
  "Full Stack Development":
    "Owning UI, APIs, data models, and deployment together.",
  "Research & Development":
    "Prototypes that earn their place before production.",
  "Data Modeling": "Schemas and evaluation data that keep AI systems legible.",
  "Node.js": "Express APIs and MongoDB services across most of my backends.",
  "Express.js":
    "Modular routes and middleware on GW Infra, Webmark, and Tomato.",
  MongoDB: "Flexible document storage for blogs, bookmarks, and product data.",
  Mongoose: "Schemas and validation on Blogger, Webmark, and this portfolio.",
  Cloudinary: "Optimized uploads and transforms on Blogger and the gallery.",
  "REST APIs": "Predictable resources and error shapes for frontend contracts.",
  "API Integration":
    "OAuth, speech, payments, and webhooks wired for production.",
  Axios: "HTTP client with interceptors on GW Infra and the Xceed module.",
  PostgreSQL: "Relational data for OpenLearn, Layr, and Zenbase's CRM.",
  MySQL: "Normalized schemas when tables fit better than documents.",
  Docker: "Reproducible environments for OpenLearn, Swasya, and Annam.ai.",
  "GitHub Actions": "CI pipelines that keep Webmark's monorepo release-ready.",
  AWS: "Lambda, S3, and IAM for Swasya, OpenLearn email, and Layr.",
  GCP: "Google Cloud services where that stack fits the workload.",
  "Third-Party Integrations":
    "Stripe, OAuth, and messaging with graceful failures.",
  SQL: "Queries and migrations that keep ORMs aligned with the database.",
  "RESTful APIs":
    "Predictable resources and error shapes for frontend contracts.",
  "OpenAI API":
    "GitRoast roasts and Webmark categorization with token budgets.",
  Anthropic: "Grounded product intelligence with traceable customer evidence.",
  LangChain: "Structured LLM workflows when raw API calls would sprawl.",
  "Vector Databases": "Embeddings and similarity search before generation.",
  Qdrant: "Semantic retrieval for Annam.ai RAG and Layr's product memory.",
  Stripe: "Checkout and webhooks on GW Infra and Tomato.",
  JWT: "Stateless auth middleware on GW Infra, OpenLearn, and Webmark.",
  "NextAuth.js": "Session handling for this portfolio's admin surface.",
  "Passport.js": "Google OAuth orchestration on Webmark's cookie sessions.",
  "Prisma ORM": "Relational models for OpenLearn, Layr, and Zenbase.",
  Redis: "Caching and session storage on OpenLearn and Layr.",
  BullMQ: "Background jobs for ingestion and AI tasks at Layr.",
  "pnpm Workspaces": "Shared types and coordinated releases in Webmark.",
  LiveKit: "Real-time communication features at Level SuperMind.",
  FastAPI: "Async Python APIs for Annam.ai and Swasya's EC2 backend.",
  "AWS Lambda": "Event-driven transcription and digitization on Swasya.",
  "AWS S3": "Audio and imaging storage with presigned mobile uploads.",
  DynamoDB: "Serverless patient records and stream-driven updates on Swasya.",
  Vercel: "Hosting this portfolio, Webmark, Blogger, and Tomato.",
};

export const STACK_COPY: Record<string, StackCopyMeta> = {
  // Languages & Tools
  "C++": {
    description:
      "I reach for C++ when performance and memory layout matter — competitive programming foundations, systems thinking, and low-level data structures that still shape how I reason about code today.",
  },
  C: {
    description:
      "C taught me how machines actually move data. It is part of the bedrock behind my understanding of pointers, memory, and the constraints that higher-level languages hide.",
  },
  Python: {
    description:
      "Python is my default for AI pipelines, FastAPI services, and quick experimentation — from agricultural RAG at Annam.ai to Swasya's backend orchestration.",
  },
  JavaScript: {
    description:
      "JavaScript is where I learned the web. I still ship it in production — GW Infra runs on Express — and it ties browser and server work together.",
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
      "GitHub is where my work lives publicly — repos, contributions, and the open-source trail behind projects like this portfolio, OpenLearn, and Swasya AI.",
  },
  Slack: {
    description:
      "Slack keeps async product work moving. At Layr it is one of the signal sources I integrate — customer feedback and team context that has to become structured product understanding.",
  },
  Notion: {
    description:
      "Notion is part of my workflow for notes, specs, and documentation. At Layr it is also a connected source where decisions and context need to flow back into the product graph.",
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
      "I used HTML5 Canvas at Xceed NITJ to render certificates at scale — pixel-level control for bulk generation workflows that had to look polished without a server round-trip per preview.",
  },
  CSS3: {
    description:
      "CSS3 handles layout and polish where a utility framework is not the whole story. On Tomato I leaned on it for responsive styling alongside a Vite-powered React frontend.",
  },
  React: {
    description:
      "React is the UI layer I reach for most often — component composition, hooks, and the ecosystem around it power dashboards, marketing sites, and product surfaces across my portfolio.",
    aliases: ["React.js"],
  },
  "React.js": {
    description:
      "React.js is the UI layer I reach for most often — component composition, hooks, and the ecosystem around it power dashboards, marketing sites, and product surfaces across my portfolio.",
    aliases: ["React"],
  },
  "@dnd-kit": {
    slug: "dnd-kit",
    description:
      "I chose @dnd-kit for Webmark's cross-category drag-and-drop because it stays accessible and composable — optimistic UI with persistence that feels native, not bolted on.",
  },
  "Next.js": {
    description:
      "Next.js is my default for production web apps — App Router, server components, route handlers, and SEO primitives show up in this portfolio, Blogger, GitRoast, Layr, and Zenbase's CRM frontend.",
  },
  Vite: {
    description:
      "Vite keeps frontend iteration fast. I use it for SPAs like OpenLearn, Webmark, GW Infra, and Swasya's doctor dashboard where dev-server speed and clean builds matter.",
  },
  "Tailwind CSS": {
    description:
      "Tailwind CSS is how I ship consistent UI quickly — design tokens, responsive utilities, and shadcn-style composition across nearly every project and role in this portfolio.",
  },
  "Chakra UI": {
    description:
      "Chakra UI powered the Xceed certificate module — accessible primitives and theming that let a large team ship a dashboard without reinventing base components.",
  },
  "shadcn/ui": {
    description:
      "shadcn/ui gives me Radix-backed components I own in the repo. I use it on Level SuperMind and anywhere I want accessible defaults with Tailwind-level control.",
  },
  "Aceternity UI": {
    description:
      "Aceternity UI is part of the motion-forward aesthetic on this site — polished hero treatments and micro-interactions that make marketing surfaces feel intentional, not generic.",
  },
  "Framer Motion": {
    description:
      "Framer Motion adds deliberate motion — page transitions, hover feedback, and staggered reveals on project cards, experience pages, and product dashboards where UX should feel alive.",
  },
  "React Toastify": {
    description:
      "React Toastify handles non-blocking feedback on Blogger — save confirmations, subscription updates, and admin actions where users need a clear signal without leaving context.",
  },
  "React Helmet": {
    description:
      "React Helmet keeps SPA metadata honest on Webmark — dynamic titles, Open Graph tags, and SEO helpers for a client-rendered bookmark product that still needs discoverability.",
  },
  Recharts: {
    description:
      "Recharts powers analytics visuals — profile click trends on Webmark and admin dashboards on GW Infra where product metrics need to be readable at a glance.",
  },
  SWR: {
    description:
      "SWR is my go-to for client-side data that should feel instant — caching, revalidation, and deduplication on Webmark and OpenLearn without over-building state machinery.",
  },
  "GitHub API": {
    description:
      "The GitHub API feeds live data into this portfolio — contribution graphs and profile stats on GitRoast — where third-party developer identity has to be accurate and rate-limit aware.",
  },
  "Retrieval-Augmented Generation": {
    description:
      "RAG is how I ground LLM answers in real evidence — retrieval, citation, and context windows show up in agricultural AI work and product-intelligence flows where hallucination is not acceptable.",
  },
  "Radix UI": {
    description:
      "Radix UI primitives underpin accessible dialogs, menus, and form controls — especially on Webmark and GW Infra where keyboard support and focus management are non-negotiable.",
  },
  "Lucide React": {
    description:
      "Lucide React is my icon set for shadcn-style UIs — consistent stroke icons across OpenLearn and GW Infra without bloating bundles with one-off SVG assets.",
  },
  Flutter: {
    description:
      "Flutter is how Swasya reaches nurses in the field — native mobile workflows for audio capture, document scanning, and offline-friendly uploads tied to a serverless backend.",
  },

  // Backend & DevOps
  "Artificial Intelligence": {
    description:
      "AI is not a buzzword in my work — it is production pipelines for speech, OCR, classification, and grounded answers. I build systems where models are one stage in a observable, testable flow.",
  },
  "Machine Learning": {
    description:
      "Machine learning shows up in agricultural query classification and inference at Annam.ai — domain-specific models, evaluation fixtures, and pipelines that had to improve before they shipped.",
  },
  "AI Pipelines": {
    description:
      "I design AI pipelines as composable services — STT, retrieval, LLM structuring, and caching stages with timing instrumentation so each step can be debugged independently in production.",
  },
  "Classification Algorithms": {
    description:
      "Classification is how unstructured agricultural queries become routable — crop health, weather, markets, and schemes each needed distinct handling before RAG could answer reliably.",
  },
  "Full Stack Development": {
    description:
      "Full-stack work is my default mode — owning UI, API contracts, data models, and deployment together so products ship as coherent systems, not handoffs between silos.",
  },
  "Research & Development": {
    description:
      "R&D is where prototypes earn their place — experimenting with retrieval, speech, and service boundaries at Annam.ai before those patterns hardened into production integrations.",
  },
  "Data Modeling": {
    description:
      "Data modeling is how I make AI systems legible — schemas, relationships, and evaluation data that let classifiers and retrieval layers evolve without breaking downstream consumers.",
  },
  "Node.js": {
    description:
      "Node.js backs most of my APIs — Express route handlers, MongoDB integrations, and serverless-adjacent services across Webmark, OpenLearn, GW Infra, Blogger, and this portfolio.",
  },
  "Express.js": {
    description:
      "Express.js is my pragmatic API layer — modular routes, middleware, and JWT auth on GW Infra, OpenLearn, Webmark, and Tomato where a lean HTTP surface beats framework ceremony.",
  },
  MongoDB: {
    description:
      "MongoDB is my document store of choice for product data — flexible schemas for blogs, bookmarks, visitors, and healthcare records where iteration speed matters more than rigid normalization.",
  },
  Mongoose: {
    description:
      "Mongoose adds structure to MongoDB — schemas, validation, and population patterns on Blogger, Webmark, GW Infra, and this portfolio's admin-backed content.",
  },
  Cloudinary: {
    description:
      "Cloudinary handles media at scale — optimized uploads and transformations on Blogger and this portfolio's gallery without running my own image pipeline.",
  },
  "REST APIs": {
    description:
      "REST APIs are how my frontends talk to backends — predictable resources, clear error shapes, and contracts I can document and test across Zenbase, Annam.ai, and Level SuperMind.",
    aliases: ["RESTful APIs"],
  },
  "API Integration": {
    description:
      "API integration is where products meet the outside world — OAuth providers, speech services, payment rails, and webhooks wired with retries, validation, and observability.",
  },
  Axios: {
    description:
      "Axios is my HTTP client on React SPAs — interceptors, typed responses, and consistent error handling on GW Infra and the Xceed certificate module.",
  },
  PostgreSQL: {
    description:
      "PostgreSQL is my relational store for structured product data — OpenLearn's cohort model, Layr's workspace graph, and Zenbase's CRM entities where integrity and joins matter.",
  },
  MySQL: {
    description:
      "MySQL is part of my SQL toolkit for relational workloads — normalized schemas and reporting queries when the data model fits tables more than documents.",
  },
  Docker: {
    description:
      "Docker keeps environments reproducible — containerized services for OpenLearn, Swasya, and Annam.ai pipelines where dev, staging, and production need to match.",
  },
  "GitHub Actions": {
    description:
      "GitHub Actions automates CI for Webmark — test, build, and deploy pipelines that keep a monorepo honest without manual release rituals.",
  },
  AWS: {
    description:
      "AWS is the cloud backbone for Swasya, OpenLearn email, and Layr — Lambda, S3, IAM, and the operational discipline to run healthcare and product workloads in production.",
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
      "RESTful APIs are how my frontends talk to backends — predictable resources, clear error shapes, and contracts I can document and test across Zenbase, Annam.ai, and Level SuperMind.",
    aliases: ["REST APIs"],
  },
  "OpenAI API": {
    description:
      "The OpenAI API powers GitRoast's roasts and Webmark's categorization — prompt design, token budgets, and error handling where LLM output is a user-facing feature, not a demo.",
  },
  Anthropic: {
    description:
      "Anthropic models power grounded product intelligence at Layr — long-context reasoning and citation-friendly answers where customer evidence has to stay traceable to its source.",
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
      "Qdrant is my vector store for semantic retrieval — agricultural RAG at Annam.ai and Layr's product memory graph where answers must cite the chunks they came from.",
  },
  Stripe: {
    description:
      "Stripe handles payments on GW Infra and Tomato — checkout flows, webhooks, and the compliance-minded UX around money moving in production.",
  },
  JWT: {
    description:
      "JWT secures stateless auth on GW Infra, OpenLearn, Webmark, and Tomato — signed tokens, refresh patterns, and middleware that keeps protected routes actually protected.",
  },
  "NextAuth.js": {
    description:
      "NextAuth.js guards this portfolio's admin surface — session handling and provider configuration without reinventing auth on every Next.js project.",
  },
  "Passport.js": {
    description:
      "Passport.js orchestrates Google OAuth on Webmark — strategies, callbacks, and cookie sessions where OAuth-only auth had to be strict and recoverable.",
  },
  "Prisma ORM": {
    description:
      "Prisma ORM models complex relational domains — OpenLearn's 25+ entities, Layr's workspace schema, and Zenbase's CRM with migrations I can trust in production.",
  },
  Redis: {
    description:
      "Redis is my cache and queue backbone — session storage, response caching, and BullMQ job processing on OpenLearn and Layr where latency and async work share the same infra.",
  },
  BullMQ: {
    description:
      "BullMQ runs background jobs at Layr — durable queues, retries, and worker isolation so ingestion and AI tasks do not block interactive product workflows.",
  },
  "pnpm Workspaces": {
    description:
      "pnpm workspaces structure Webmark's monorepo — shared types, coordinated releases, and dependency deduplication between client and API packages.",
  },
  LiveKit: {
    description:
      "LiveKit enabled real-time communication features at Level SuperMind — live sessions and media workflows integrated into a Next.js product without building WebRTC from scratch.",
  },
  FastAPI: {
    description:
      "FastAPI is my Python API framework of choice — async routes, OpenAPI docs, and service boundaries for Annam.ai's agricultural engine and Swasya's EC2 backend.",
  },
  "AWS Lambda": {
    description:
      "AWS Lambda runs Swasya's event-driven pipeline — S3 triggers, transcription, and digitization tasks that scale to zero between clinic uploads.",
  },
  "AWS S3": {
    description:
      "AWS S3 stores Swasya's audio and imaging — presigned uploads from mobile, trigger-driven processing, and durable objects behind HIPAA-minded workflows.",
  },
  DynamoDB: {
    description:
      "DynamoDB backs Swasya's serverless data path — low-latency patient records and stream-driven updates where Lambda and mobile clients need predictable performance.",
  },
  Vercel: {
    description:
      "Vercel hosts this portfolio, Webmark, Blogger, and Tomato — edge-friendly Next.js deployments, cron jobs, and the DX that keeps shipping friction low.",
  },
};
