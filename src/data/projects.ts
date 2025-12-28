import { createId } from "@paralleldrive/cuid2";
import { StaticImageData } from "next/image";

// Project cover images
import webmark from "~/assets/images/projects/webmark.png";
import tomato from "~/assets/images/projects/tomato.png";
import gitroast from "~/assets/images/projects/gitroast.png";
import blogger from "~/assets/images/projects/blogger.png";
import openlearn from "~/assets/images/projects/openlearn.png";
import swasya from "~/assets/images/projects/swasya.png";
import gwinfra from "~/assets/images/projects/gwinfra.png";

export interface Contributor {
  name: string;
  role: string;
  github?: string;
  linkedin?: string;
}

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
  dateStarted: string;
  dateModified: string;
  isFeatured: boolean;
  contributors?: Contributor[];
}

const projects: Project[] = [
  {
    id: createId(),
    title: "Swasya AI",
    slug: "swasya-ai",
    description: "A full-stack AI-powered healthcare assistance system for Indian Primary Healthcare Centers (PHCs) featuring multi-platform interfaces with serverless cloud architecture, real-time speech-to-SOAP transcription, and intelligent document digitization built using React, Flutter, FastAPI, and AWS.",
    detailedDescription: "Swasya AI is a comprehensive full-stack healthcare intelligence platform designed and developed to revolutionize primary healthcare delivery in India through AI-powered workflow automation, multi-platform interfaces, and hybrid serverless cloud architecture. The platform addresses critical inefficiencies in rural healthcare by streamlining communication between nurses, doctors, and administrators while reducing diagnosis time by 40% through intelligent data processing. The system unites a hybrid serverless architecture combining AWS Lambda functions with EC2 instances, a FastAPI backend with MongoDB and DynamoDB databases, and multi-platform frontends including a React 19 web dashboard for doctors, a Flutter mobile app for nurses, and an admin analytics panel. The backend leverages AWS Serverless Application Model (SAM) for Lambda deployments, featuring 25+ database models across DynamoDB and MongoDB, event-driven S3 triggers for automatic document processing, AWS Transcribe for Hindi/English speech-to-text conversion, AWS Textract for OCR, Google Gemini 2.5 Flash for medical note structuring and SOAP generation, Groq Whisper for real-time audio transcription, and AWS IoT Core (MQTT) for real-time bidirectional communication with sub-100ms latency. The architecture implements automatic queue management workflows, AI-generated medical timelines with RAG (Retrieval Augmented Generation), regional health outbreak visualization using Leaflet maps, and production-grade security with IAM roles, VPC isolation, TLS 1.2 encryption, and AWS Secrets Manager. The frontend implements a responsive React 19 web dashboard with real-time patient queue monitoring, live SOAP note streaming with typing animations, medical history timeline viewers with split document preview, interactive outbreak mapping with Leaflet, and polling-based live updates. The Flutter mobile app provides native nurse workflows with audio recording interfaces, document scanning via camera integration, real-time upload queues with batch processing, and offline-first architecture. Together, Swasya AI represents a production-ready, enterprise-grade healthcare platform deployed on AWS eu-north-1 region, demonstrating expertise in full-stack development, serverless microservices architecture, AI/ML integration, multi-cloud orchestration, real-time communication systems, HIPAA-compliant healthcare workflows, and scalable infrastructure design serving 100+ patients daily across distributed PHC networks.",
    tagline: "Turning dialogue into data and data into clarity",
    task: "Architected and developed Swasya AI, a full-stack AI-powered healthcare assistance system for Indian Primary Healthcare Centers. Implemented a hybrid serverless architecture combining AWS Lambda (serverless microservices) with EC2 (FastAPI backend), 4 Lambda functions for event-driven processing, DynamoDB and MongoDB databases with 25+ interconnected models, S3-triggered pipelines for audio transcription (AWS Transcribe + Groq Whisper) and document OCR (AWS Textract), Google Gemini 2.5 Flash for SOAP note generation and medical timeline RAG, and AWS IoT Core MQTT for real-time communication. Built a React 19 web dashboard with live patient queues, SOAP note streaming, medical timeline visualization, and Leaflet-based outbreak mapping. Developed a Flutter mobile app for nurses with audio recording, document scanning, upload queue management, and batch processing workflows. Deployed using AWS SAM (Serverless Application Model), Docker containerization, IAM security policies, VPC isolation, and TLS encryption. Achieved 40% reduction in diagnosis time, sub-100ms real-time updates via MQTT, and production-grade scalability serving 100+ patients daily. Delivered a comprehensive healthcare ecosystem demonstrating end-to-end expertise in serverless architecture, multi-platform development, AI/ML integration, cloud infrastructure orchestration, real-time systems, and healthcare compliance.",
    features: [
      "Hybrid serverless architecture (AWS Lambda + EC2 FastAPI backend)",
      "Multi-platform interfaces (React 19 web + Flutter mobile + Admin panel)",
      "AWS SAM infrastructure-as-code with 4 Lambda functions (PatientRegistration, PresignedURL, ScribeTask, DigitizeTask)",
      "Event-driven S3 triggers for automatic audio/document processing pipelines",
      "AI-powered speech-to-SOAP transcription (AWS Transcribe + Groq Whisper + Gemini 2.5 Flash)",
      "Intelligent document digitization (AWS Textract + Gemini Vision for prescription OCR)",
      "Real-time bidirectional communication via AWS IoT Core MQTT (sub-100ms latency)",
      "Dual database architecture (DynamoDB for serverless NoSQL + MongoDB for complex queries)",
      "Automated queue management with status workflows (waiting → nurse_completed → ready_for_doctor → in_consultation → completed)",
      "AI-generated medical timelines with RAG (Retrieval Augmented Generation)",
      "Live SOAP note streaming with typing animations on doctor dashboard",
      "Medical history timeline viewer with split document preview",
      "Regional health outbreak visualization using Leaflet maps with hotspot tracking",
      "Nurse mobile app with audio recording, document scanning, and batch upload queues",
      "Presigned S3 URLs for secure direct uploads from mobile devices",
      "Production-grade security (IAM roles, VPC isolation, TLS 1.2, AWS Secrets Manager)",
      "DynamoDB Streams for change data capture and automatic timeline updates",
      "Groq Whisper integration for Hindi/English audio transcription (whisper-large-v3-turbo)",
      "Gemini 2.5 Flash for medical structuring and medication name correction",
      "Multi-language support (Hindi, English, Hinglish code-mixed)",
      "HIPAA-compliant data handling with PII redaction in AWS Transcribe",
      "CloudWatch monitoring with comprehensive logging and metrics",
      "Responsive UI with mobile-first design and Tailwind CSS 4.1",
      "Polling-based live updates with 5-second refresh intervals",
      "Docker containerization and systemd service management",
      "Batch document processing with AI-powered timeline generation",
      "Comprehensive API documentation with OpenAPI/Swagger"
    ],
    stacks: ["React.js", "Flutter", "Python", "FastAPI", "AWS Lambda", "AWS S3", "DynamoDB", "MongoDB", "AWS", "Docker", "Tailwind CSS", "TypeScript", "Node.js", "Vite"],
    cover: swasya,
    isRepo: true,
    repoUrl: "https://github.com/chahatkesh/swasya-ai",
    datePublished: "2025-11-09",
    dateStarted: "2025-11-08",
    dateModified: "2025-11-17",
    isFeatured: false,
    contributors: [
    {
      name: "Rishi Ahuja",
      role: "Backend Developer",
      github: "https://github.com/rishiahuja",
      linkedin: "https://www.linkedin.com/in/rishi-ahuja-b1a224310/"
    },
    {
      name: "Vatsal Khanna",
      role: "Project Manager",
      github: "https://github.com/vatsalkhanna5",
      linkedin: "https://www.linkedin.com/in/vatsalkhanna/"
    }
  ]
  },
  {
    id: createId(),
    title: "GW Infra Solutions",
    slug: "gw-infra-solutions",
    description:
      "A comprehensive full-stack solar energy management platform with CMS capabilities, role-based admin control, and dynamic content management built using React 18 and Node.js.",
    detailedDescription:
      "GW Infra Solutions is a production-ready, full-stack web platform I architected and developed for a solar energy solutions company, combining a robust content management system with modern web technologies to deliver a seamless user experience and powerful administrative capabilities. The platform serves as a complete digital ecosystem for managing solar installations, events, blogs, and customer engagement. The backend is built with Node.js, Express.js, MongoDB, and Mongoose ODM, implementing a RESTful API architecture that handles complex data relationships across users, blogs, and events. It features JWT-based authentication with secure password hashing using bcrypt, role-based access control for administrative operations, and comprehensive CRUD operations with error handling middleware. The API supports dynamic content creation, image upload handling with Multer, data validation, and population of relational data for enriched responses. Integration with Stripe enables payment processing capabilities, while the modular controller-route architecture ensures scalability and maintainability. The frontend is developed using React 18, Vite, and modern UI libraries including Radix UI and shadcn/ui, delivering a high-performance, responsive single-page application with advanced component architecture. It features a dual-layout system with separate User and Admin interfaces, comprehensive SEO optimization with React Helmet Async for meta management, and form handling using React Hook Form with Zod validation. The UI showcases animated components using Framer Motion, data visualization through Recharts, and an Apple-inspired design system implemented with Tailwind CSS. Key features include a dynamic admin dashboard with analytics, blog and event management systems, contact form with validation, testimonial carousels using Keen Slider, and real-time content updates. The platform implements protected routes with authentication context, skeleton loading states for improved UX, and toast notifications for user feedback. Together, GW Infra Solutions represents an enterprise-grade web application demonstrating expertise in full-stack JavaScript development, RESTful API design, authentication flows, content management systems, responsive UI/UX design, and modern web performance optimization.",
    tagline: "Powering Sustainable Energy Through Digital Innovation",
    task:
      "Architected and developed GW Infra Solutions, a full-stack web platform for solar energy management uniting a Node.js/Express backend with a React 18 frontend. Implemented comprehensive CMS functionality with blog and event management, role-based authentication using JWT and bcrypt, and MongoDB database architecture with Mongoose ODM for data persistence. On the backend, built RESTful APIs with modular controller-route structure, authentication middleware, file upload handling with Multer, and Stripe payment integration. On the frontend, implemented dual-layout architecture (User/Admin), dynamic routing with React Router v6, form validation using React Hook Form and Zod, animated UI components with Framer Motion, and data visualization dashboards using Recharts. Integrated shadcn/ui and Radix UI primitives for accessible component design, comprehensive SEO optimization with React Helmet Async, and responsive styling with Tailwind CSS. Delivered a scalable, production-ready platform with protected routes, context-based authentication, skeleton loading patterns, and toast notifications, demonstrating end-to-end expertise in modern web development, API architecture, and design-driven engineering.",
    features: [
      "JWT-based authentication with bcrypt password hashing",
      "Role-based access control for admin operations",
      "Dynamic blog management system with author population",
      "Event management with multi-image gallery support (up to 5 images)",
      "Comprehensive admin dashboard with analytics and data visualization",
      "Contact form with React Hook Form and Zod schema validation",
      "Dual-layout architecture separating user and admin interfaces",
      "Protected routes with authentication context management",
      "SEO optimization with dynamic meta tags using React Helmet Async",
      "Animated UI components using Framer Motion",
      "Responsive Apple-inspired design system with Tailwind CSS",
      "Data visualization dashboards using Recharts",
      "File upload handling with Multer middleware",
      "Real-time content updates with skeleton loading states",
      "Toast notifications for user feedback and error handling",
      "Event status automation based on date (upcoming/ongoing/completed)",
      "Pagination support for blogs and events",
      "Image gallery with validation constraints",
      "RESTful API with modular controller-route architecture",
      "Error handling middleware for graceful failure management",
      "Stripe payment integration for transaction processing",
      "Testimonial carousel with Keen Slider autoplay",
      "Navigation menu with smooth animations and mobile responsiveness",
      "shadcn/ui and Radix UI primitives for accessible components"
    ],
    stacks: [
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Stripe",
      "React.js",
      "Vite",
      "Tailwind CSS",
      "Radix UI",
      "Framer Motion",
      "Lucide React",
      "Axios",
    ],
    cover: gwinfra,
    isRepo: true,
    repoUrl: "https://github.com/chahatkesh/gwinfra",
    deployedURL: "https://gwinfrasolutions.com",
    datePublished: "2024-11-15",
    dateStarted: "2024-08-18",
    dateModified: "2025-12-23",
    isFeatured: false,
    contributors: [
      {
        name: "Bhavesh Singh",
        role: "Full Stack Developer",
        github: "https://github.com/Bhaveshs1212",
        linkedin: "https://www.linkedin.com/in/bhavesh-singh12/"
      }
    ]
  },
  {
    id: createId(),
    title: "OpenLearn",
    slug: "openlearn",
    description:
      "A full-stack cohort learning platform with gamified progression and role-based collaboration built using TypeScript and React 19.",
    detailedDescription:
      "OpenLearn is a comprehensive full-stack learning management system I designed and developed to transform skill-based education through cohort learning, hierarchical role management, and gamified progression. The platform unites a TypeScript-based backend with a React 19-powered frontend, delivering an enterprise-level ecosystem that enhances both academic and administrative experiences. The backend is built with TypeScript, Express.js, Prisma ORM, and PostgreSQL, handles complex relationships between 25+ database models across users, cohorts, leagues, and resources. It supports hierarchical role-based access control with 5 user levels (Grand Pathfinder → Chief Pathfinder → Pathfinder → Pioneer → Luminary), advanced progress analytics, OTP-based email verification, assignment workflows, badge gamification, and leaderboard systems. Performance and reliability are ensured through Redis caching, Docker containerization, AWS SES integration, and secure JWT-based authentication, all deployed with production-grade CI/CD pipelines. The frontend is developed using React 19, Vite 6.3.5, and Tailwind CSS 4.1.8, provides a high-performance, responsive single-page interface inspired by Apple’s design philosophy. It offers an interactive dashboard with real-time progress visualization, cohort insights, leaderboard tracking, and assignment management. Advanced features include a multi-tiered role-based system, content creation tools, GitHub integration, and an administrative panel for managing users, leagues, and curricula. Performance is optimized through code splitting, lazy loading, and Framer Motion animations. Together, the OpenLearn platform represents an enterprise-grade, production-ready educational ecosystem, combining scalable backend architecture with cutting-edge frontend performance and design precision. It demonstrates expertise in modern web engineering, complex database management, API-driven systems, authentication flows, and user-centered interface design.",
    tagline: "Democratising Learning, Transforming Futures",
    task:
      "Architected and developed OpenLearn, a full-stack educational platform uniting a TypeScript-based backend with a React 19 frontend. Implemented cohort-based learning with hierarchical RBAC (5 roles), structured specialization tracks (AI/ML, Finance, Creative), and gamified achievement systems. On the backend, built over 25 interconnected Prisma models, RESTful APIs with advanced analytics, OTP-based authentication, Redis caching, Docker deployment, and AWS SES integration. On the frontend, implemented JWT-based workflows, email verification, dynamic dashboards, and an Apple-style UI using Tailwind CSS 4.1.8 and Framer Motion. Delivered a scalable, responsive, and secure platform demonstrating end-to-end expertise in full-stack development, modern DevOps, and design-driven engineering.",
    features: [
      "Hierarchical RBAC (5 levels: Grand Pathfinder → Luminary)",
      "Cohort-based learning with specialization leagues",
      "Gamified learning with badges, leaderboards, and progress",
      "Assignment submission, grading, and feedback workflows",
      "OTP-based email verification and JWT authentication",
      "Comprehensive admin panel for user, content, and league management",
      "Responsive Apple-inspired UI with Framer Motion animations",
      "Real-time progress tracking and analytics dashboards",
      "Social sharing and GitHub integration for projects",
      "Redis caching, Docker containerization, and AWS SES email services",
      "Optimized code splitting, lazy loading, and chunk management (Vite 6.3.5)",
      "Database migration automation and audit logging",
      "Production-ready CI/CD pipelines and monitoring tools"
    ],
    stacks: ["TypeScript", "Node.js", "Express.js", "Prisma ORM", "PostgreSQL", "Redis", "Docker", "JWT", "AWS", "React.js", "Vite", "Tailwind CSS", "Framer Motion", "Lucide React"],
    cover: openlearn,
    isRepo: true,
    repoUrl: "https://github.com/chahatkesh/openlearn-frontend",
    deployedURL: "https://openlearn.org.in",
    datePublished: "2025-06-15",
    dateStarted: "2025-06-09",
    dateModified: "2025-11-28",
    isFeatured: true,
    contributors: [
    {
      name: "Rishi Ahuja",
      role: "Backend Developer",
      github: "https://github.com/rishiahuja",
      linkedin: "https://www.linkedin.com/in/rishi-ahuja-b1a224310/"
    },
    {
      name: "Vatsal Khanna",
      role: "Project Manager",
      github: "https://github.com/vatsalkhanna5",
      linkedin: "https://www.linkedin.com/in/vatsalkhanna/"
    }
  ]
  },
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
    deployedURL: "https://webmark.chahatkesh.me/",
    datePublished: "2024-11-05",
    dateStarted: "2024-07-09",
    dateModified: "2025-11-26",
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
    dateStarted: "2024-07-03",
    dateModified: "2025-07-09",
    isFeatured: false,
  },
  {
    id: createId(),
    title: `Blogger`,
    slug: "blogger",
    description:
      "A sophisticated full-stack blog platform that revolutionizes the blogging experience for both creators and readers with comprehensive content management and engagement features.",
    detailedDescription:
      "Blogger is a cutting-edge content management platform I engineered to transform the digital blogging landscape. This full-stack application harnesses the power of Next.js 14 with App Router, MongoDB, and Cloudinary to deliver a lightning-fast, SEO-optimized blog platform that seamlessly handles everything from content creation to audience engagement. The platform features a professional admin panel with intuitive drag-and-drop image uploads, comprehensive blog management with CRUD operations, and real-time email subscription tracking. Readers enjoy a beautifully crafted interface with dynamic category filtering (Technology, Startup, Lifestyle), responsive design across all devices, and integrated social media sharing capabilities. What distinguishes Blogger is its intelligent cloud-based image management system powered by Cloudinary, automated email subscription service, and performance-first architecture that ensures blazing-fast load times through Next.js optimization. Built with modern web technologies including React 18, TailwindCSS, Mongoose ODM, and Axios, Blogger demonstrates enterprise-level scalability while maintaining an intuitive user experience that makes content creation effortless and content consumption delightful.",
    tagline: "Where Stories Come to Life - Professional Blogging Redefined",
    task: "Architected and developed Blogger, a state-of-the-art full-stack blog platform that seamlessly integrates content management with reader engagement. The application showcases advanced Next.js 14 capabilities including App Router, server-side rendering, and API routes, while leveraging MongoDB for scalable data management and Cloudinary for optimized image handling. Key technical achievements include implementing a sophisticated admin dashboard with comprehensive blog management, creating a responsive blog listing system with dynamic category-based filtering, developing an automated email subscription service with full CRUD operations, and optimizing performance through Next.js image optimization and caching strategies. The platform features real-time toast notifications, social media sharing integration, and mobile-first responsive design. This project exemplifies expertise in modern React development, NoSQL database design, RESTful API architecture, cloud storage integration, and user experience optimization.",
    features: [
      "Professional admin panel with comprehensive CRUD operations",
      "Dynamic category filtering (Technology, Startup, Lifestyle)",
      "Automated email subscription management system",
      "Cloud-based image upload and optimization with Cloudinary",
      "Real-time toast notifications and user feedback",
      "SEO-optimized dynamic blog post pages",
      "Integrated social media sharing (Twitter, LinkedIn, Facebook)",
      "Mobile-first responsive design with hover animations",
      "Server-side rendering for enhanced performance",
      "Scalable MongoDB database with Mongoose ODM"
    ],
    stacks: ["Next.js", "React.js", "Tailwind CSS", "MongoDB", "Mongoose", "Node.js", "Axios", "Cloudinary"],
    cover: blogger,
    isRepo: true,
    repoUrl: "https://github.com/chahatkesh/blog-app",
    deployedURL: "https://blogger.chahatkesh.me",
    datePublished: "2024-07-03",
    dateStarted: "2024-06-28",
    dateModified: "2025-07-11",
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
    dateStarted: "2025-05-14",
    dateModified: "2025-07-09",
    isFeatured: false,
  },
];

export default projects;
