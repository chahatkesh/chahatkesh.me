import { ReactNode } from "react";
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
}

export const currentProjects: CurrentProject[] = [
  {
    title: "Ninja: Stop Dialing. Stop Chasing. Let AI Book Meetings for You.",
    description:
      "Transform real estate agents into high performers with AI co-pilots. Autonomous lead outreach, 24/7 follow-ups, intelligent appointment booking, and conversation management. Integrates WhatsApp Business, Vonage voice, Cal.com scheduling.",
    url: "https://silentninja.tech/",
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
      "I enjoy reading non-fiction books on technology, psychology, and personal growth",
    icon: <FaBook className="text-amber-500" />,
  },
  {
    title: "Gym",
    description:
      "Regular workout sessions to stay fit and maintain a healthy work-life balance",
    icon: <FaRunning className="text-green-400" />,
  },
  {
    title: "Designing",
    description:
      "Creating visually appealing UI/UX designs and digital artwork in my free time",
    icon: <FaPenFancy className="text-blue-300" />,
  },
  {
    title: "Content Creation",
    description:
      "Creating fun tech content and tutorials for the developer community",
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
