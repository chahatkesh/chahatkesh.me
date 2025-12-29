import { StaticImageData } from "next/image";

// Import logos
import AnnamAILogo from "../assets/images/experience/AnnamAI.png";
import LevelSuperMindLogo from "../assets/images/experience/LevelSuperMind.png";
import XceedLogo from "../assets/images/experience/Xceed.png";
import AwadhLogo from "../assets/images/experience/Awadh.png";

export type Experience = {
  slug: string;
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
  links?: { title: string; url: string; icon?: string }[];
  gallery?: (string | StaticImageData)[]; // Image URLs or StaticImageData
};

export const experiences: Experience[] = [
  {
    slug: "awadh-eir",
    employer: "iHub AwaDH IIT Ropar",
    role: "Entrepreneur in Residence",
    type: "Full-time",
    location: "Hybrid",
    start_date: "Oct 2025",
    end_date: "present",
    tagline: "Innovation-driven research and startup ideation under IIT Ropar's incubation ecosystem.",
    description: "Engaged in innovation-driven research and startup ideation under iHub AWaDH's incubation ecosystem. Focused on developing AI-powered solutions for real-world problems, leveraging cutting-edge technologies and methodologies.",
    logo: AwadhLogo,
    about: "iHub AWaDH (Agriculture and Water Technology Development Hub) is a Technology Innovation Hub established at IIT Ropar under the National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS) by the Department of Science and Technology, Government of India.",
    contributions: [
      "Conducting innovation-driven research in AI and agricultural technology",
      "Developing AI-powered solutions for real-world agricultural problems",
      "Collaborating with startup ecosystem and mentors",
      "Leveraging cutting-edge technologies for sustainable solutions"
    ],
    techStack: ["Artificial Intelligence", "Machine Learning", "Research & Development"],
    links: [
      { title: "iHub AwaDH Website", url: "https://www.ihubawadh.iitrpr.ac.in/", icon: "website" }
    ],
    gallery: [
      "https://jklrjucnntkajrda.public.blob.vercel-storage.com/experience/awadh-eir/img1.png",
      "https://jklrjucnntkajrda.public.blob.vercel-storage.com/experience/awadh-eir/img2.png",
      "https://jklrjucnntkajrda.public.blob.vercel-storage.com/experience/awadh-eir/img3.png"
    ]
  },
  {
    slug: "annam-ai-research-intern",
    employer: "Annam.ai IIT Ropar",
    role: "Research Intern - AI Systems",
    type: "Internship",
    location: "Hybrid",
    start_date: "May 2025",
    end_date: "Oct 2025",
    tagline: "Developed AI engine with modular pipelines for classification and inference.",
    description: "Contributed to the development of an internal AI engine with modular pipelines for classification and inference. Built domain-specific classifiers and optimized data modeling strategies to improve AI inference accuracy.",
    logo: AnnamAILogo,
    about: "Annam.ai is an AI-driven agricultural technology platform incubated at IIT Ropar, focused on transforming agriculture through intelligent systems and data-driven solutions.",
    contributions: [
      "Developed internal AI engine with modular pipelines for classification and inference",
      "Built domain-specific classifiers for agricultural data",
      "Optimized data modeling strategies to improve AI inference accuracy",
      "Collaborated with research team on AI system architecture"
    ],
    techStack: ["Python", "Machine Learning", "AI Pipelines", "Data Modeling", "Classification Algorithms"],
    achievements: [
      "Successfully improved AI inference accuracy through optimized data modeling",
      "Built reusable modular pipeline architecture"
    ],
    links: [
      { title: "Annam.ai Website", url: "https://annam.ai/", icon: "website" }
    ],
    gallery: [
      "https://jklrjucnntkajrda.public.blob.vercel-storage.com/experience/annam-ai-research-intern/img1.png",
      "https://jklrjucnntkajrda.public.blob.vercel-storage.com/experience/annam-ai-research-intern/img2.png",
      "https://jklrjucnntkajrda.public.blob.vercel-storage.com/experience/annam-ai-research-intern/img3.png"
    ]
  },
  {
    slug: "level-supermind-fullstack",
    employer: "Level SuperMind",
    role: "Fullstack Developer",
    type: "Internship",
    location: "Remote",
    start_date: "Jan 2025",
    end_date: "Feb 2025",
    tagline: "Built 15+ reusable UI components and integrated 5+ APIs with 30% faster load times.",
    description: "Developed 15+ reusable UI components and integrated 5+ third-party APIs, resulting in 30% faster load times. Revamped onboarding with optimized API flows, reducing user setup time by 20%. Tech stack: Next.js, TypeScript, Tailwind CSS, ShadCN UI, LiveKit, Framer Motion.",
    logo: LevelSuperMindLogo,
    about: "Level SuperMind is a platform that leverages AI to enhance learning experiences through interactive and personalized content delivery.",
    contributions: [
      "Developed 15+ reusable UI components for the platform",
      "Integrated 5+ third-party APIs with optimized performance",
      "Revamped user onboarding flow with improved API architecture",
      "Implemented real-time communication features using LiveKit",
      "Added smooth animations and transitions using Framer Motion"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI", "LiveKit", "Framer Motion", "API Integration"],
    achievements: [
      "Achieved 30% faster page load times through optimization",
      "Reduced user setup time by 20% with improved onboarding",
      "Built comprehensive reusable component library"
    ],
    gallery: [
      "https://jklrjucnntkajrda.public.blob.vercel-storage.com/experience/level-supermind-fullstack/img1.png",
      "https://jklrjucnntkajrda.public.blob.vercel-storage.com/experience/level-supermind-fullstack/img2.png",
      "https://jklrjucnntkajrda.public.blob.vercel-storage.com/experience/level-supermind-fullstack/img3.png"
    ]
  },
  {
    slug: "xceed-nitj-fullstack",
    employer: "Xceed NITJ",
    role: "Fullstack Developer",
    type: "Project",
    location: "NIT Jalandhar",
    start_date: "Nov 2023",
    end_date: "Jun 2024",
    tagline: "Built Certificate Module used by 20+ college clubs for streamlined distribution.",
    description: "Collaborated with a 22-member team to build a Certificate Module for bulk certificate generation and distribution. Designed and shipped a user dashboard, used by 20+ college clubs for streamlined certificate distribution. Tech stack: React.js, Tailwind CSS, Chakra UI, Axios, Framer Motion, html2Canvas.",
    logo: XceedLogo,
    about: "Xceed is the official tech club of NIT Jalandhar, focusing on building innovative technical solutions for the campus community.",
    contributions: [
      "Collaborated with a 22-member development team",
      "Built Certificate Module for bulk certificate generation",
      "Designed and implemented user dashboard interface",
      "Integrated html2Canvas for certificate rendering",
      "Implemented bulk distribution system for certificates"
    ],
    techStack: ["React.js", "Tailwind CSS", "Chakra UI", "Axios", "Framer Motion", "html2Canvas"],
    achievements: [
      "Certificate system adopted by 20+ college clubs",
      "Streamlined certificate distribution process campus-wide",
      "Successfully collaborated in large team environment"
    ],
    links: [
      { title: "Xceed NITJ", url: "https://xceed.co.in/", icon: "website" }
    ],
    gallery: [
      "https://jklrjucnntkajrda.public.blob.vercel-storage.com/experience/xceed-nitj-fullstack/img1.png",
      "https://jklrjucnntkajrda.public.blob.vercel-storage.com/experience/xceed-nitj-fullstack/img2.png",
      "https://jklrjucnntkajrda.public.blob.vercel-storage.com/experience/xceed-nitj-fullstack/img3.png"
    ]
  }
];