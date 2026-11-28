import { type ReactNode } from "react";
import {
  FaLaptop,
  FaHeadphones,
  FaMobileAlt,
  FaPenFancy,
} from "react-icons/fa";

// ── Current Projects / Work ───────────────────────────────────────
export interface CurrentProject {
  title: string;
  description: string;
  url: string;
  showInAbout: boolean;
}

export const currentProjects: CurrentProject[] = [
  {
    title: "Layr",
    description:
      "Co-founding Layr, the AI product decision layer for founders, product managers, and engineering leaders. It connects Slack, Jira, Linear, customer calls, support tickets, and product docs, then turns scattered signals into evidence-backed priorities, specs, and task drafts.",
    url: "https://uselayr.com/",
    showInAbout: true,
  },
  {
    title: "Ninja at Zenbase",
    description:
      "Building the frontend for Ninja, an AI platform for real estate agents. The system handles autonomous lead outreach, real-time conversation management, voice calls, WhatsApp follow-ups, and appointment scheduling. Production-grade architecture, fast iteration, and a lot of fun engineering problems.",
    url: "https://silentninja.tech/",
    showInAbout: false,
  },
];

// ── Hobbies ───────────────────────────────────────────────────────
export interface Hobby {
  illustration: "notebook" | "barbell" | "curve" | "plane";
  title: string;
  label: string;
  href: string;
}

export const hobbies: Hobby[] = [
  {
    illustration: "notebook",
    title: "Writing",
    label: "Essays & notes",
    href: "/about/writing",
  },
  {
    illustration: "barbell",
    title: "Gym",
    label: "Training logs",
    href: "/about/gym",
  },
  {
    illustration: "curve",
    title: "Designing",
    label: "Visual craft",
    href: "/about/designing",
  },
  {
    illustration: "plane",
    title: "Travelling",
    label: "Places I've been",
    href: "/places",
  },
];

// ── Desk / Workspace Setup ────────────────────────────────────────
export interface DeskItem {
  name: string;
  icon: ReactNode;
}

export const deskSetup: DeskItem[] = [
  {
    name: "MacBook Pro M3 (2023)",
    icon: <FaLaptop className="text-foreground/80" />,
  },
  {
    name: "CMF by Nothing Buds 2",
    icon: <FaHeadphones className="text-blue-300 light:text-blue-700" />,
  },
  {
    name: "XP Pen Deco01 V2",
    icon: <FaPenFancy className="text-orange-400 light:text-orange-700" />,
  },
  {
    name: "iPhone 15 Pro",
    icon: <FaMobileAlt className="text-foreground/70" />,
  },
];

// ── Portfolio Evolution ───────────────────────────────────────────
export interface PortfolioVersion {
  version: string;
  label: string;
  url?: string;
  isCurrent?: boolean;
}

export const portfolioVersions: PortfolioVersion[] = [
  {
    version: "v4.0",
    label: "Next.js - Current Version",
    url: "/changelog",
    isCurrent: true,
  },
  {
    version: "v3.0",
    label: "React + Tailwind - My Minimal Era",
    url: "https://v3.chahatkesh.me",
  },
  {
    version: "v2.0",
    label: "Stepping into React",
    url: "https://v2.chahatkesh.me",
  },
  {
    version: "v1.0",
    label: "HTML/CSS Beginnings",
    url: "https://v1.chahatkesh.me",
  },
];
