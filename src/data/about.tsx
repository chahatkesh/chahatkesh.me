import { type ReactNode } from "react";
import {
  FaBook,
  FaRunning,
  FaYoutube,
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
  showInLinks: boolean;
}

export const currentProjects: CurrentProject[] = [
  {
    title: "Layr",
    description:
      "Building Layr, a product decision layer for AI-native teams. It connects Slack, Jira, Linear, customer calls, support tickets, and docs, then turns scattered signals into evidence-backed priorities, specs, and task drafts. Kind of like Cursor for PMs: less context hunting, faster decisions, and cleaner handoffs to engineering.",
    url: "https://www.uselayr.com/",
    showInLinks: true,
  },
  {
    title: "Ninja at Zenbase",
    description:
      "Building the frontend for Ninja, an AI platform for real estate agents. The system handles autonomous lead outreach, real-time conversation management, voice calls, WhatsApp follow-ups, and appointment scheduling. Production-grade architecture, fast iteration, and a lot of fun engineering problems.",
    url: "https://silentninja.tech/",
    showInLinks: false,
  },
];

// ── Hobbies ───────────────────────────────────────────────────────
export interface Hobby {
  title: string;
  description: string;
  icon: ReactNode;
}

export const hobbies: Hobby[] = [
  {
    title: "Reading",
    description:
      "Non-fiction is my default. Psychology, systems thinking, startup stories. I read to understand how things work beyond the surface.",
    icon: <FaBook className="text-amber-500" />,
  },
  {
    title: "Gym",
    description:
      "Discipline built in one area tends to bleed into others. The gym is where I reset, especially after a long debugging session.",
    icon: <FaRunning className="text-green-400" />,
  },
  {
    title: "Designing",
    description:
      "I open Figma the way some people open Instagram. Design and engineering are the same problem to me, just approached from different angles.",
    icon: <FaPenFancy className="text-blue-300" />,
  },
  {
    title: "Content Creation",
    description:
      "Sharing what I build and what I learn. It started as a way to document things, and now it keeps me honest about making progress.",
    icon: <FaYoutube className="text-red-500" />,
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
    icon: <FaLaptop className="text-gray-300" />,
  },
  {
    name: "CMF by Nothing Buds 2",
    icon: <FaHeadphones className="text-blue-300" />,
  },
  {
    name: "XP Pen Deco01 V2",
    icon: <FaPenFancy className="text-orange-400" />,
  },
  {
    name: "iPhone 15 Pro",
    icon: <FaMobileAlt className="text-gray-400" />,
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
