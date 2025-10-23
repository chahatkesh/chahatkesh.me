import { StaticImageData } from "next/image";

// Import images
import AnnamAILogo from "../assets/images/experience/AnnamAI.png";
import LevelSuperMindLogo from "../assets/images/experience/LevelSuperMind.png";
import XceedLogo from "../assets/images/experience/Xceed.png";
import AwadhLogo from "../assets/images/experience/Awadh.png";

export type Experience = {
  employer: string;
  role: string;
  start_date: string;
  end_date: string;
  description: string;
  logo: StaticImageData;
};

export const experiences: Experience[] = [
  {
    employer: "iHub AwaDH (IIT Ropar)",
    role: "Entrepreneur in Residence",
    start_date: "Oct 2025",
    end_date: "present",
    description: "Engaged in innovation-driven research and startup ideation under iHub AWaDH's incubation ecosystem. Focused on developing AI-powered solutions for real-world problems, leveraging cutting-edge technologies and methodologies.",
    logo: AwadhLogo
  },
  {
    employer: "Annam.ai (IIT Ropar)",
    role: "Research Intern - AI Systems",
    start_date: "May 2025",
    end_date: "Oct 2025",
    description: "Contributed to the development of an internal AI engine with modular pipelines for classification and inference. Built domain-specific classifiers and optimized data modeling strategies to improve AI inference accuracy.",
    logo: AnnamAILogo
  },
  {
    employer: "Level SuperMind",
    role: "Fullstack Developer",
    start_date: "Jan 2025",
    end_date: "Feb 2025",
    description: "Developed 15+ reusable UI components and integrated 5+ third-party APIs, resulting in 30% faster load times. Revamped onboarding with optimized API flows, reducing user setup time by 20%. Tech stack: Next.js, TypeScript, Tailwind CSS, ShadCN UI, LiveKit, Framer Motion.",
    logo: LevelSuperMindLogo
  },
  {
    employer: "Xceed NITJ",
    role: "Fullstack Developer",
    start_date: "Nov 2023",
    end_date: "Jun 2024",
    description: "Collaborated with a 22-member team to build a Certificate Module for bulk certificate generation and distribution. Designed and shipped a user dashboard, used by 20+ college clubs for streamlined certificate distribution. Tech stack: React.js, Tailwind CSS, Chakra UI, Axios, Framer Motion, html2Canvas.",
    logo: XceedLogo
  }
];