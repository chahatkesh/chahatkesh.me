import config from "~/config";

export interface LinkItem {
  id: number;
  title: string;
  href: string;
  icon: string;
  /** Small right-aligned value, e.g. reading time. */
  meta?: string;
  /** When set, the row copies href to the clipboard instead of navigating. */
  action?: "copy";
}

export const startLinks: LinkItem[] = [
  { id: 1, title: "Resume", href: "/resume", icon: "FileText" },
  { id: 2, title: "Book a call", href: config.social.cal, icon: "Calendar" },
  { id: 3, title: "Portfolio", href: "/", icon: "Home" },
];

export const workLinks: LinkItem[] = [
  { id: 10, title: "Projects", href: "/projects", icon: "FolderGit2" },
  {
    id: 11,
    title: "Experience",
    href: "/about/experience",
    icon: "Briefcase",
  },
  { id: 12, title: "GitHub", href: config.social.github, icon: "github" },
  { id: 13, title: "Journey", href: "/about/journey", icon: "Journey" },
];

export const allWritingLink: LinkItem = {
  id: 20,
  title: "All writing",
  href: "/about/writing",
  icon: "BookOpen",
};

export const elsewhereLinks: LinkItem[] = [
  { id: 30, title: "LinkedIn", href: config.social.linkedin, icon: "linkedin" },
  {
    id: 31,
    title: "Twitter / X",
    href: config.social.twitter,
    icon: "twitter",
  },
  {
    id: 32,
    title: "Instagram",
    href: config.social.instagram,
    icon: "instagram",
  },
  { id: 33, title: "YouTube", href: config.social.youtube, icon: "youtube" },
  {
    id: 34,
    title: config.social.email,
    href: config.social.email,
    icon: "Mail",
    action: "copy",
  },
];

export const footerSupportLink = {
  title: "Buy me a coffee",
  href: config.social.buymeacoffee,
};
