import { createId } from "@paralleldrive/cuid2";
import { StaticImageData } from "next/image";

// Project cover images
import webmark from "~/assets/images/projects/webmark.png";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  tagline: string;
  features: string[];
  stacks: string[];
  cover: StaticImageData;
  isRepo: boolean;
  repoUrl?: string;
  deployedURL?: string;
  datePublished: string;
  dateModified: string;
  isFeatured: boolean;
}

const projects: Project[] = [
  {
    id: createId(),
    title: `Webmark`,
    slug: "webmark",
    description:
      "A full-stack bookmark management solution for organizing and categorizing Web links.",
    tagline: "A platform for efficient bookmark organization and management",
    features: [
      "Intuitive drag-and-drop organization",
      "Advanced search and filtering",
      "Tag-based categorization system",
      "One-click bookmark saving",
      "Cross-device synchronization"
    ],
    stacks: ["React.js", "Tailwind CSS", "Node.js", "MongoDB", "Radix UI"],
    cover: webmark,
    isRepo: true,
    repoUrl: "https://github.com/chahatkesh/webmark",
    deployedURL: "https://webmark.site/",
    datePublished: "2024-01-15",
    dateModified: "2024-05-20",
    isFeatured: true,
  },
];

export default projects;
