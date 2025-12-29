import config from "~/config";

export interface LinkItem {
  id: number;
  title: string;
  description: string;
  href: string;
  icon: string; // Icon identifier
  iconSize?: "sm" | "md"; // Optional size
  type: "primary" | "social" | "support" | "action";
  gradient?: string;
  hoverColor?: string;
}

export const links: LinkItem[] = [
  // Primary Links
  {
    id: 1,
    title: "Resume",
    description: "Download my CV / Resume",
    href: "/resume",
    icon: "FileText",
    iconSize: "md",
    type: "primary",
    hoverColor: "hover:border-emerald-500/50 hover:bg-emerald-500/5",
  },
  {
    id: 2,
    title: "Projects",
    description: "Explore my work & case studies",
    href: "/projects",
    icon: "FolderGit2",
    iconSize: "md",
    type: "primary",
    hoverColor: "hover:border-blue-500/50 hover:bg-blue-500/5",
  },
  {
    id: 3,
    title: "Portfolio",
    description: "Check out my work & projects",
    href: "/",
    icon: "Home",
    iconSize: "md",
    type: "primary",
    hoverColor: "hover:border-purple-500/50 hover:bg-purple-500/5",
  },
  {
    id: 4,
    title: "Journey",
    description: "My journey so far",
    href: "/about/journey",
    icon: "Journey",
    iconSize: "md",
    type: "primary",
    hoverColor: "hover:border-cyan-500/50 hover:bg-cyan-500/5",
  },
  {
    id: 5,
    title: "GitHub",
    description: "Explore my open source contributions",
    href: config.social.github,
    icon: "FaGithub",
    iconSize: "md",
    type: "primary",
    hoverColor: "hover:border-gray-400/50 hover:bg-gray-400/5",
  },
  {
    id: 6,
    title: "LinkedIn",
    description: "Let's connect professionally",
    href: config.social.linkedin,
    icon: "Linkedin",
    iconSize: "md",
    type: "primary",
    hoverColor: "hover:border-blue-500/50 hover:bg-blue-500/5",
  },

  // Social Links
  {
    id: 7,
    title: "Instagram",
    description: "Follow my journey",
    href: config.social.instagram,
    icon: "FaInstagram",
    iconSize: "sm",
    type: "social",
    hoverColor: "hover:border-pink-500/50 hover:bg-pink-500/5",
  },
  {
    id: 8,
    title: "Twitter / X",
    description: "Thoughts & updates",
    href: config.social.twitter,
    icon: "FaXTwitter",
    iconSize: "sm",
    type: "social",
    hoverColor: "hover:border-sky-500/50 hover:bg-sky-500/5",
  },
  {
    id: 9,
    title: "YouTube",
    description: "Watch my content",
    href: config.social.youtube,
    icon: "FaYoutube",
    iconSize: "sm",
    type: "social",
    hoverColor: "hover:border-red-500/50 hover:bg-red-500/5",
  },

  // Contact
  {
    id: 10,
    title: "Email Me",
    description: config.social.email,
    href: `mailto:${config.social.email}`,
    icon: "Mail",
    iconSize: "sm",
    type: "social",
    hoverColor: "hover:border-emerald-500/50 hover:bg-emerald-500/5",
  },

  // Support
  {
    id: 11,
    title: "Buy Me a Coffee",
    description: "Support my work ☕",
    href: config.social.buymeacoffee,
    icon: "SiBuymeacoffee",
    iconSize: "sm",
    type: "support",
    hoverColor: "hover:border-yellow-500/50 hover:bg-yellow-500/5",
  },

  // Action Links
  {
    id: 12,
    title: "Book a Call",
    description: "Schedule a 1:1 meeting with me",
    href: "https://cal.com/chahatkesh/",
    icon: "Calendar",
    iconSize: "md",
    type: "action",
    hoverColor: "hover:border-indigo-500/50 hover:bg-indigo-500/5",
  },
];
