import { createId } from "@paralleldrive/cuid2";
import { StaticImageData } from "next/image";

// Project cover images
import webmark from "~/assets/images/projects/webmark.png";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailedDescription: string;
  tagline: string;
  task: string;
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
    detailedDescription:
      "Webmark is a modern bookmark management platform I developed to solve the challenge of organizing online resources across multiple devices and browsers. The application provides users with a centralized hub to store, categorize, and efficiently access their important web links through an intuitive drag-and-drop interface. With features like customizable categories, real-time search functionality, and usage analytics that track time savings, Webmark transforms the traditional bookmarking experience into a productivity tool. Built with React, Node.js, and MongoDB, the platform combines responsive design with performance optimizations to deliver a seamless user experience across all devices while maintaining accessibility standards through Radix UI components.",
    tagline: "Master Your Bookmarks with Webmark",
    task: "Developed Webmark, a sophisticated full-stack bookmark management platform that enables users to organize web links into customizable categories with an intuitive drag-and-drop interface. The application features real-time search capabilities, cross-device synchronization, user analytics that track time saved, and a performance-optimized architecture built with React, Node.js, MongoDB, and modern web technologies like React Query and Radix UI. This implementation demonstrates expertise in both frontend and backend development, with particular strengths in state management, performance optimization, and user experience design.",
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
