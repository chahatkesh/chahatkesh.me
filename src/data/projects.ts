import { createId } from "@paralleldrive/cuid2";
import { StaticImageData } from "next/image";

// Project cover images
import webmark from "~/assets/images/projects/webmark.png";
import tomato from "~/assets/images/projects/tomato.png";

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
    datePublished: "2024-11-05",
    dateModified: "2025-05-22",
    isFeatured: true,
  },
  {
    id: createId(),
    title: `Tomato`,
    slug: "tomato-food-delivery",
    description:
      "A comprehensive full-stack food delivery platform with real-time order management, secure payment processing, and dual-interface administration.",
    detailedDescription:
      "Tomato is a complete food delivery ecosystem I developed featuring three interconnected applications: a customer-facing React app for browsing and ordering food, an admin panel for restaurant management, and a robust Node.js backend API. The platform addresses the full food delivery workflow from menu browsing to order fulfillment, incorporating Stripe payment integration for secure transactions, JWT-based authentication for user security, and real-time order status updates. The customer application provides an intuitive shopping experience with category-based filtering, cart management, and order tracking, while the admin panel offers comprehensive food item management, order processing capabilities, and analytics dashboard. Built with modern technologies including React 18, Express.js, MongoDB, and deployed on Vercel and Render, the platform demonstrates scalable architecture design with features like image upload handling, responsive design, and production-ready deployment configuration.",
    tagline: "Satisfy Your Cravings with Tomato",
    task: "Developed Tomato, a sophisticated full-stack food delivery platform consisting of three integrated applications: a React-based customer app with intuitive menu browsing and cart functionality, an admin panel for comprehensive restaurant management, and a Node.js backend API with MongoDB integration. The platform features secure Stripe payment processing, JWT authentication, real-time order tracking, image upload capabilities, and responsive design. Successfully deployed the customer app and admin panel on Vercel with custom domains, and the backend API on Render, demonstrating expertise in modern web development, payment integration, database design, and production deployment strategies.",
    features: [
      "Real-time order tracking and management",
      "Secure Stripe payment integration",
      "Comprehensive admin dashboard",
      "JWT-based user authentication",
      "Responsive multi-device design",
      "Image upload and management",
      "Category-based menu filtering",
      "Shopping cart functionality"
    ],
    stacks: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe", "JWT", "Vite", "CSS3"],
    cover: tomato,
    isRepo: true,
    repoUrl: "https://github.com/chahatkesh/food-delivery-app",
    deployedURL: "https://tomato.chahatkesh.me/",
    datePublished: "2024-12-15",
    dateModified: "2025-07-09",
    isFeatured: false,
  }
];

export default projects;
