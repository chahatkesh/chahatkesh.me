import { type StaticImageData } from "next/image";
import { generateExperienceSlug } from "~/lib/utils";
import { type LinkIconType } from "~/lib/link-icons";

// Import logos
import AnnamAILogo from "../assets/images/experience/AnnamAI.png";
import LayrLogo from "../assets/images/experience/Layr.svg";
import LevelSuperMindLogo from "../assets/images/experience/LevelSuperMind.png";
import XceedLogo from "../assets/images/experience/Xceed.png";
import ZenbaseLogo from "../assets/images/experience/Zenbase.png";
import GDGCLogo from "../assets/images/experience/GDGC.png";

export type Experience = {
  slug: string;
  companyId?: string;
  employer: string;
  role: string;
  type: string; // Full-time, Part-time, Internship, Contract, etc.
  location: string; // Remote, City, Country
  start_date: string;
  end_date: string;
  tagline: string; // Brief one-liner for card
  description: string; // Full description for detail page
  logo: StaticImageData | string;
  about?: string; // About the organization
  contributions?: string[]; // Key contributions/responsibilities
  techStack?: string[]; // Technologies used
  achievements?: string[]; // Measurable achievements
  links?: {
    title: string;
    url: string;
    icon?: LinkIconType;
  }[]; // Optional links related to the experience
  gallery?: (string | StaticImageData)[]; // Image URLs or StaticImageData
};

export const experiences: Experience[] = [
  {
    slug: generateExperienceSlug("Layr", "Building Layr"),
    employer: "Layr",
    role: "Building Layr",
    type: "Self-employed",
    location: "Remote",
    start_date: "Apr 08, 2026",
    end_date: "present",
    tagline:
      "Building a product decision engine that turns fragmented customer evidence into clear, cited answers on what product teams should build next.",
    description:
      "Building Layr, a B2B product-intelligence platform for small product teams. Layr connects the tools where customer feedback, delivery context, and past decisions live, then transforms those signals into structured product understanding, evidence-backed recommendations, execution-ready specifications, and reviewed task drafts.",
    logo: LayrLogo,
    about:
      "Layr is a workspace-based SaaS product for founders, product managers, and engineering leads whose product context has outgrown manual synthesis. It closes the loop from customer signal to product decision and execution while keeping every recommendation traceable to its source.",
    contributions: [
      "Designed and built the end-to-end product workflow from connected signals and structured understanding to cited decisions, specifications, and execution drafts",
      "Developed scoped integrations for Slack, Jira, Linear, Notion, and Intercom with source selection, synchronization, and human-controlled publishing",
      "Built a continuously updated product memory graph that connects customer signals, recurring problems, features, and past decisions with source provenance",
      "Implemented Ask Layr using graph retrieval and semantic search to produce grounded answers with supporting evidence and citations",
      "Created evidence-backed opportunity prioritization and specification workflows that turn product insight into reviewable Jira, Linear, and Notion drafts",
      "Built the multi-workspace product experience, public website, and customer documentation as a cohesive platform",
    ],
    techStack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma ORM",
      "Qdrant",
      "Redis",
      "BullMQ",
      "Anthropic",
      "AWS",
    ],
    links: [
      {
        title: "Layr Website",
        url: "https://uselayr.com/",
        icon: "website",
      },
      {
        title: "Layr Documentation",
        url: "https://docs.uselayr.com/",
        icon: "website",
      },
      {
        title: "Layr LinkedIn",
        url: "https://www.linkedin.com/company/uselayrr",
        icon: "linkedin",
      },
    ],
  },
  {
    slug: generateExperienceSlug("Zenbase Technologies", "Founding Engineer"),
    employer: "Zenbase Technologies",
    role: "Founding Engineer",
    type: "Full-time",
    location: "Singapore, Remote",
    start_date: "Dec 2025",
    end_date: "May 2026",
    tagline:
      "Building Ninja, an AI-driven sales automation platform for real-estate agents in Singapore with real-time CRM, autonomous agents, and compliance-first architecture.",
    description:
      "Led frontend engineering for Ninja, an AI-powered sales automation and CRM platform built for real-estate agents in Singapore. Developed production-grade, scalable frontend architecture enabling autonomous outreach, real-time lead management, and agent-driven workflows. Architected dashboards, automation controls, and AI agent orchestration using industry-standard practices focused on maintainability, performance, security, and regulatory compliance.",
    logo: ZenbaseLogo,
    about:
      "Ninja is an AI-first sales automation platform designed for real-estate professionals in Singapore. It replaces manual prospecting with autonomous voice, WhatsApp, and scheduling agents while unifying CRM, real-time analytics, automation engines, and compliance guardrails to support enterprise-grade outbound, follow-ups, and appointment booking.",
    contributions: [
      "Architected the core frontend using Next.js with a production-ready, scalable codebase following industry best practices for modularity, reusability, and long-term maintainability",
      "Designed a clean, layered frontend architecture separating UI, business logic, and data access to support rapid iteration and future product expansion",
      "Built real-time interfaces for lead pipelines, call progress, follow-up queues, and performance metrics using event-driven UI patterns",
      "Designed and implemented complex data views including lead CRUD flows, CSV imports, filtering, tagging, notes, activity timelines, and audit logs",
      "Developed UI layers for AI-driven features such as autonomous calling dashboards, WhatsApp conversation views, appointment booking states, and automation rule management",
      "Integrated frontend with backend services (PostgreSQL/Prisma APIs, AI agents, messaging, voice, scheduling) through optimized API contracts and robust state management",
      "Implemented authentication-aware routing, role-based access interfaces, and security-first UX for agents, team leads, and organization admins",
      "Ensured production-quality standards through consistent code structure, type safety, error handling, and performance optimizations across the application",
      "Optimized frontend performance using code-splitting, dynamic routing, memoization, and scalable layout systems for high-frequency real-time updates",
      "Designed task-focused user workflows that reduce cognitive load for real-estate agents by surfacing only context-relevant actions at each stage of the sales funnel",
      "Structured dashboards and interaction patterns to prioritize outcomes such as follow-ups, callbacks, and appointment bookings, improving speed of decision-making and operational efficiency",
    ],
    techStack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "REST APIs",
      "Third-Party Integrations",
      "Prisma ORM",
      "PostgreSQL",
      "Redis",
      "JWT",
      "GitHub Actions",
    ],
    achievements: [
      "Shipped a production-ready CRM interface for real-estate agents within the first 4 weeks of development",
      "Built a scalable frontend architecture capable of supporting new AI agents, workflows, and enterprise features without refactoring core systems",
      "Enabled agents to replace spreadsheet-based workflows with a centralized, real-time lead management system",
      "Improved operational efficiency by designing UX flows optimized for high-volume lead handling and fast appointment scheduling",
    ],
    links: [
      {
        title: "Product Overview",
        url: "https://silentninja.tech/",
        icon: "website",
      },
      {
        title: "Zenbase LinkedIn",
        url: "https://www.linkedin.com/company/zenbase-tech/",
        icon: "linkedin",
      },
    ],
  },
  {
    slug: generateExperienceSlug("Annam.ai", "Entrepreneur in Residence"),
    companyId: "annam-ai",
    employer: "Annam.ai",
    role: "Entrepreneur in Residence",
    type: "Full-time",
    location: "IIT Ropar, Hybrid",
    start_date: "Oct 2025",
    end_date: "Mar 2026",
    tagline:
      "Built production AI infrastructure for agricultural RAG, multilingual speech, semantic caching, and media workflows using Python and FastAPI.",
    description:
      "Led product development and contributed to KM Engine, a Python and FastAPI agricultural knowledge platform composed of nine backend services for RAG chat, query classification, semantic caching, search, speech, and media processing. Developed an audio workflow connecting Whisper STT, contextual RAG, and Edge Text-to-Speech, with TTS voices configured for 12 languages. Worked with researchers, mentors, and startups to move AI prototypes toward scalable, cloud-ready products.",
    logo: AnnamAILogo,
    about:
      "Annam.ai is an AI-driven agricultural technology platform incubated at IIT Ropar, focused on transforming agriculture through intelligent systems and data-driven solutions.",
    contributions: [
      "Contributed to a Python and FastAPI monorepo spanning nine independently runnable backend services for RAG chat, classification, caching, search, speech, image analysis, and video generation",
      "Developed an authenticated audio-to-audio workflow that orchestrates Whisper STT, the contextual RAG pipeline, and Text-to-Speech while returning transcript, response text, and encoded audio",
      "Configured Edge TTS voices for 12 languages, including Tamil, Telugu, Malayalam, Kannada, and Marathi, with streaming synthesis and multiple audio formats",
      "Developed asynchronous REST integrations for the classify-cache-LLM flow, including semantic retrieval, provider fallbacks, and per-stage timing instrumentation",
      "Worked with MongoDB for conversation persistence, Redis for session and response caching, and Qdrant for vector retrieval across the AI pipeline",
      "Presented AI-powered agri-tech solutions to delegates from the Government of India, MeitY, and IIT Ropar during a strategic product showcase",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "REST APIs",
      "MongoDB",
      "Redis",
      "Qdrant",
      "Artificial Intelligence",
      "AI Pipelines",
      "Machine Learning",
      "Docker",
    ],
    links: [
      {
        title: "Annam.ai Website",
        url: "https://annam.ai/",
        icon: "website",
      },
      {
        title: "Annam.ai LinkedIn",
        url: "https://www.linkedin.com/company/annam-ai/",
        icon: "linkedin",
      },
    ],
  },
  {
    slug: generateExperienceSlug("Annam.ai", "Research Intern - AI Systems"),
    companyId: "annam-ai",
    employer: "Annam.ai",
    role: "Research Intern - AI Systems",
    type: "Internship",
    location: "IIT Ropar, Hybrid",
    start_date: "May 2025",
    end_date: "Oct 2025",
    tagline:
      "Developed modular Python pipelines for agricultural query classification, inference, and retrieval-backed responses.",
    description:
      "Contributed to the foundations of an agricultural AI engine through reusable Python pipelines for query classification and inference. Built domain-specific classification logic, structured evaluation fixtures, and service-oriented components that supported retrieval-backed answer generation and later production integration.",
    logo: AnnamAILogo,
    about:
      "Annam.ai is an AI-driven agricultural technology platform incubated at IIT Ropar, focused on transforming agriculture through intelligent systems and data-driven solutions.",
    contributions: [
      "Developed reusable Python pipelines for agricultural query classification and AI inference",
      "Built domain-specific classifiers spanning crop health, weather, market, finance, government schemes, and general agricultural queries",
      "Created structured multilingual evaluation fixtures to validate classifier behavior across supported query categories",
      "Collaborated with researchers on service boundaries, data modeling, and retrieval-backed AI system architecture",
    ],
    techStack: [
      "Python",
      "Machine Learning",
      "AI Pipelines",
      "Data Modeling",
      "Classification Algorithms",
      "Qdrant",
    ],
    achievements: [
      "Successfully improved AI inference accuracy through optimized data modeling",
      "Built reusable modular pipeline architecture",
    ],
    links: [
      { title: "Annam.ai Website", url: "https://annam.ai/", icon: "website" },
      {
        title: "Annam.ai LinkedIn",
        url: "https://www.linkedin.com/company/annam-ai/",
        icon: "linkedin",
      },
    ],
  },
  {
    slug: generateExperienceSlug("Level SuperMind", "Full-stack Intern"),
    employer: "Level SuperMind",
    role: "Full-stack Intern",
    type: "Internship",
    location: "Mumbai, Remote",
    start_date: "Jan 2025",
    end_date: "Feb 2025",
    tagline:
      "Built 15+ reusable UI components and integrated 5+ APIs with 30% faster load times.",
    description:
      "Worked as a Full-stack Intern at Level SuperMind, where I built scalable product features across frontend and API-integrated workflows. Delivered 15+ reusable UI components, integrated 5+ third-party services, and optimized rendering/data flows to achieve faster page performance. Also restructured onboarding journeys and API interactions to reduce setup friction and improve activation speed for new users.",
    logo: LevelSuperMindLogo,
    about:
      "Level SuperMind is a consumer wellness and mindfulness platform that combines neuroscience-backed practices, guided meditation, and AI-powered personalization to help users improve focus, emotional well-being, and daily mental performance through structured digital experiences.",
    contributions: [
      "Developed 15+ reusable UI components for the platform",
      "Integrated 5+ third-party APIs with optimized performance",
      "Revamped user onboarding flow with improved API architecture",
      "Implemented real-time communication features using LiveKit",
      "Added smooth animations and transitions using Framer Motion",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "LiveKit",
      "Framer Motion",
      "REST APIs",
    ],
    achievements: [
      "Achieved 30% faster page load times through optimization",
      "Reduced user setup time by 20% with improved onboarding",
      "Built comprehensive reusable component library",
    ],
    links: [
      {
        title: "Level SuperMind Website",
        url: "https://level.game/",
        icon: "website",
      },
      {
        title: "Level SuperMind LinkedIn",
        url: "https://www.linkedin.com/company/levelsupermind/",
        icon: "linkedin",
      },
    ],
  },
  {
    slug: generateExperienceSlug("GDGC NITJ", "Core Team Member"),
    employer: "GDGC NITJ",
    role: "Core Team Member",
    type: "Volunteer",
    location: "NIT Jalandhar",
    start_date: "Nov 2024",
    end_date: "present",
    tagline:
      "Building the developer community at NIT Jalandhar through events, workshops, and open-source work.",
    description:
      "Served as a core team member at GDG on Campus NIT Jalandhar, driving community initiatives across web development and UI/UX while supporting large-scale events and technical programs. Contributed to HackMol operations, delivered UI/UX knowledge sessions, and helped strengthen the chapter’s open-source ecosystem by organizing and preserving project codebases across multiple editions.",
    logo: GDGCLogo,
    about:
      "GDG on Campus NIT Jalandhar (GDGC NITJ) is the official student-led Google Developer Groups chapter at Dr. B. R. Ambedkar National Institute of Technology, Jalandhar. The community brings together developers, designers, and innovators to learn, build, and grow through hands-on workshops, hackathons, study jams, and open-source collaboration. The chapter operates across specialized domains including AI/ML, App Development, Competitive Programming, DevSecOps, UI/UX, Web Development, and Women in Tech—creating an inclusive, developer-first ecosystem for skill-building and real-world impact.",
    contributions: [
      "Volunteered at HackMol 6.0 (April 2025) — supported onsite execution for 400+ participants across North India's largest student hackathon during Utakansh, the techno-cultural fest.",
      "Led HackMol 7.0 as Event Coordinator (March 2026) — managed end-to-end execution including registrations, hackspaces, and ceremonies. Handled 3000+ registrations and 450+ PPTs, shortlisted 60 teams (200+ participants) for the offline round, and worked through 60+ hours of continuous execution.",
      "Spoke at GDGC NITJ Winter Fest (February 5, 2025) — delivered a session on UI/UX fundamentals as a speaker in the UI domain.",
      "Established the GDGC NITJ GitHub organisation, sourced legacy codebases for HackMol 3.0 through 7.0, and deployed all of them to preserve and maintain project history.",
    ],
    techStack: ["Next.js", "React.js", "Tailwind CSS", "GitHub"],
    achievements: [
      "Coordinated HackMol 7.0 end-to-end — 3000+ registrations, 450+ PPTs reviewed, 60 teams selected for offline round.",
      "Speaker at GDGC NITJ Winter Fest 2025 in the UI/UX domain.",
      "Built and deployed the GDGC NITJ GitHub org with archived codebases from HackMol 3.0 to 7.0.",
    ],
    links: [
      {
        title: "GDGC NITJ GitHub",
        url: "https://github.com/gdgcnitj/",
        icon: "github",
      },
      { title: "HackMol", url: "https://hackmol.com/", icon: "website" },
    ],
  },
  {
    slug: generateExperienceSlug("Xceed NITJ", "Fullstack Developer"),
    employer: "Xceed NITJ",
    role: "Fullstack Developer",
    type: "Project",
    location: "NIT Jalandhar",
    start_date: "Nov 2023",
    end_date: "Jun 2024",
    tagline:
      "Built Certificate Module used by 20+ college clubs for streamlined distribution.",
    description:
      "Collaborated with a 22-member team to build a Certificate Module for bulk certificate generation and distribution. Designed and shipped a user dashboard, used by 20+ college clubs for streamlined certificate distribution. Tech stack: React.js, Tailwind CSS, Chakra UI, Axios, Framer Motion, HTML5 Canvas.",
    logo: XceedLogo,
    about:
      "Xceed is the official tech club of NIT Jalandhar, focusing on building innovative technical solutions for the campus community.",
    contributions: [
      "Collaborated with a 22-member development team",
      "Built Certificate Module for bulk certificate generation",
      "Designed and implemented user dashboard interface",
      "Integrated HTML5 Canvas utilities for certificate rendering",
      "Implemented bulk distribution system for certificates",
    ],
    techStack: [
      "React.js",
      "Tailwind CSS",
      "Chakra UI",
      "Axios",
      "Framer Motion",
      "HTML5 Canvas",
    ],
    achievements: [
      "Certificate system adopted by 20+ college clubs",
      "Streamlined certificate distribution process campus-wide",
      "Successfully collaborated in large team environment",
    ],
    links: [
      {
        title: "Xceed NITJ",
        url: "https://xceed.nitj.ac.in/",
        icon: "website",
      },
    ],
  },
];
