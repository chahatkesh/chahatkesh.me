import { createId } from "@paralleldrive/cuid2";
import { StaticImageData } from "next/image";

// Project cover images
import webmark from "~/assets/images/projects/webmark.png";
import tomato from "~/assets/images/projects/tomato.png";
import gitroast from "~/assets/images/projects/gitroast.png";

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
    datePublished: "2024-07-07",
    dateModified: "2025-07-09",
    isFeatured: false,
  },
  {
    id: createId(),
    title: "GitRoast",
    slug: "gitroast-github-profile-roaster",
    description: "An AI-powered developer entertainment platform that generates hilarious, technically-accurate roasts based on GitHub profile analysis.",
    detailedDescription: "GitRoast is a sophisticated full-stack web application I developed that revolutionizes developer entertainment by combining GitHub API integration with OpenAI's GPT models to generate personalized, technically-savvy roasts based on comprehensive profile analysis. The platform features a modern Next.js 15 frontend with React 19 and TypeScript, implementing advanced GitHub statistics compilation including repository analysis, commit pattern recognition, programming language distribution, and account age calculations. The application utilizes OpenAI's API to generate contextually-aware roasts with adjustable intensity levels (mild, medium, spicy), ensuring content appropriateness while maintaining technical accuracy and humor. Key features include real-time visitor analytics powered by MongoDB Atlas, responsive design with Tailwind CSS and Framer Motion animations, advanced image export functionality using html-to-image for social media sharing, and integrated Twitter sharing capabilities. The backend leverages Next.js API routes with Edge Runtime for optimal performance, implements comprehensive error handling for GitHub API rate limiting, and includes JWT-based authentication patterns. The platform demonstrates advanced software architecture with clean separation of concerns, TypeScript interface definitions for GitHub API responses, and production-ready deployment configuration with custom domain integration.",
    tagline: "Because Sometimes Your Commit History Needs a Reality Check",
    task: "Developed GitRoast, an innovative AI-powered platform that analyzes GitHub profiles and generates humorous, technically-accurate roasts using OpenAI's GPT models. Built with Next.js 15, React 19, and TypeScript, the application features comprehensive GitHub API integration for real-time profile analysis, customizable roast intensity levels, MongoDB Atlas integration for visitor analytics, and advanced social sharing capabilities. Implemented sophisticated GitHub statistics compilation including repository analysis, commit pattern recognition, programming language distribution calculations, and account age analytics. The platform includes responsive design with Tailwind CSS, smooth animations using Framer Motion, image export functionality for social media sharing, and Twitter integration for viral content distribution. Successfully deployed on custom domain with Edge Runtime optimization, demonstrating expertise in modern web development, API integration, AI/ML implementation, database design, and production deployment strategies.",
    features: [
      "AI-powered GitHub profile analysis and roast generation",
      "Comprehensive repository statistics and commit pattern analysis",
      "Customizable roast intensity levels (mild, medium, spicy)",
      "Advanced image export and social media sharing",
      "Responsive design with smooth animations",
      "GitHub API rate limiting and error handling",
      "Edge Runtime optimization for performance",
      "TypeScript-based architecture with type safety"
    ],
    stacks: [
      "Next.js",
      "React.js",
      "TypeScript",
      "OpenAI API",
      "GitHub API",
      "MongoDB",
      "Tailwind CSS",
      "Framer Motion",
    ],
    cover: gitroast,
    isRepo: true,
    repoUrl: "https://github.com/chahatkesh/gitroast",
    deployedURL: "https://gitroast.chahatkesh.me/",
    datePublished: "2025-05-15",
    dateModified: "2025-07-09",
    isFeatured: false,
  },
];

export default projects;
