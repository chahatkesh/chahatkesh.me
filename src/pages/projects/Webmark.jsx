import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Award,
  Users,
  AlertCircle,
  CheckCircle,
  Code,
  Layers,
  PenTool,
  GitBranch,
  Calendar,
  Zap,
} from "lucide-react";
import LetsTalk from "../../components/common/LetsTalk";

const Webmark = () => {
  // Technology stack data
  const frontendTech = [
    { name: "React.js", description: "Modular components for organized UI" },
    { name: "React Router", description: "Seamless, single-page navigation" },
    { name: "TypeScript", description: "Type safety for fewer bugs" },
    { name: "React Query", description: "Optimized data fetching & caching" },
    { name: "Context API", description: "Global state management" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework" },
    { name: "Radix UI", description: "Accessible, unstyled components" },
    { name: "Framer Motion", description: "Smooth animations & transitions" },
    { name: "React Beautiful DnD", description: "Drag-and-drop functionality" },
    { name: "Vite", description: "Fast development build tool" },
  ];

  const backendTech = [
    { name: "Node.js & Express", description: "Server-side framework" },
    { name: "MongoDB", description: "Scalable NoSQL data storage" },
    { name: "Mongoose", description: "MongoDB object modeling" },
    { name: "JWT", description: "Secure authentication & authorization" },
    { name: "Bcrypt", description: "Password hashing" },
    { name: "Nodemailer", description: "Email notifications" },
    { name: "Node-cron", description: "Scheduled tasks" },
  ];

  // Development phases
  const developmentPhases = [
    {
      name: "Conceptualization",
      duration: "2 weeks",
      tasks: ["Market research", "Feature planning", "Technology selection"],
    },
    {
      name: "Design",
      duration: "3 weeks",
      tasks: ["UI/UX wireframing", "Component design", "User flow mapping"],
    },
    {
      name: "Frontend Development",
      duration: "4 weeks",
      tasks: [
        "Component implementation",
        "State management",
        "Responsive design",
      ],
    },
    {
      name: "Backend Development",
      duration: "3 weeks",
      tasks: ["Database schema", "API development", "Authentication system"],
    },
    {
      name: "Integration and Testing",
      duration: "2 weeks",
      tasks: ["Integration", "Testing", "Bug fixing"],
    },
    {
      name: "Deployment",
      duration: "1 week",
      tasks: ["Vercel deployment", "Initial user testing", "Monitoring"],
    },
  ];

  // Key features
  const keyFeatures = [
    {
      title: "Structured Organization",
      description:
        "Create collections and categories for systematic bookmark management",
    },
    {
      title: "Intuitive Interface",
      description: "Drag & Drop functionality for easy rearrangement",
    },
    {
      title: "Advanced Search",
      description: "Quick and specific bookmark and note search",
    },
    {
      title: "Personalization",
      description: "Custom colors and icons for enhanced user experience",
    },
    {
      title: "Security",
      description: "Private collections to protect sensitive bookmarks",
    },
    {
      title: "Cross-Device Accessibility",
      description: "Responsive design for desktop and mobile",
    },
  ];

  // Future innovations
  const futureInnovations = [
    {
      title: "Browser Extension",
      description:
        "Direct bookmark fetching from browser with seamless integration",
    },
    {
      title: "AI-Powered Categorization",
      description:
        "Intelligent bookmark categorization using Large Language Models",
    },
    {
      title: "Social Sharing",
      description: "Public bookmark collections and collaborative management",
    },
    {
      title: "Enhanced Personalization",
      description: "ML-based recommendations and browsing analytics",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#37352f] flex flex-col">
      <main className="flex-1">
        <article className="py-16 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          {/* Project Header */}
          <header className="mb-12">
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
              <img
                src="/projects/webmark.png"
                alt="Webmark Dashboard"
                className="w-full object-cover h-auto max-h-[400px]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/1200x600?text=Webmark`;
                }}
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Webmark</h1>
                <p className="text-gray-600 text-lg">
                  Encrypted Cross-Platform Bookmark Manager
                </p>
              </div>
              <a
                href="https://webmark.site"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
                Visit Project <ExternalLink size={16} className="ml-2" />
              </a>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-md border border-red-200">
                React
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-md border border-green-200">
                Node.js
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-md border border-blue-200">
                MongoDB
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-md border border-purple-200">
                Live
              </span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-md border border-yellow-200">
                UX/UI Design
              </span>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Users size={16} className="mr-2 text-gray-400" />
                <span>60+ active users</span>
              </div>
              <div className="flex items-center">
                <Award size={16} className="mr-2 text-gray-400" />
                <span>Solo Development</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-gray-400" />
                <span>Oct 2024 - Dec 2024</span>
              </div>
            </div>
          </header>

          {/* Project Overview */}
          <section className="mb-16 p-6 bg-gray-50 rounded-lg border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-700 mb-4">
              Webmark is a secure, comprehensive bookmark management solution
              that allows users to organize, categorize, and access their web
              bookmarks across multiple devices. This project was developed to
              address the challenge of managing an overwhelming number of
              bookmarks in today's digital landscape.
            </p>
            <p className="text-gray-700">
              The platform features encrypted storage, intuitive drag-and-drop
              organization, advanced search capabilities, and personalized
              bookmark management—all designed with both security and user
              experience in mind.
            </p>
          </section>

          {/* Problem Statement */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-md bg-[#fff3e1] text-[#ff8c38] mr-3">
                <AlertCircle size={20} />
              </div>
              <h2 className="text-2xl font-semibold">Problem Statement</h2>
            </div>

            <p className="text-gray-700 mb-6">
              In the digital age, users face significant challenges managing
              their ever-growing collection of web bookmarks:
            </p>

            <ul className="space-y-3 mb-6 list-disc pl-6 text-gray-700">
              <li>
                <strong>Overwhelming volume:</strong> Users accumulate hundreds
                of bookmarks across multiple browsers and devices
              </li>
              <li>
                <strong>Poor organization:</strong> Built-in browser bookmark
                managers offer limited categorization options
              </li>
              <li>
                <strong>Limited accessibility:</strong> Browser-specific
                bookmarks are often trapped in their respective ecosystems
              </li>
              <li>
                <strong>Inefficient retrieval:</strong> Finding specific
                bookmarks becomes time-consuming as collections grow
              </li>
              <li>
                <strong>Lack of personalization:</strong> Most bookmark systems
                offer minimal customization options
              </li>
            </ul>
          </section>

          {/* Solution */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-md bg-[#d4f9db] text-[#0e9d3a] mr-3">
                <CheckCircle size={20} />
              </div>
              <h2 className="text-2xl font-semibold">Webmark's Solution</h2>
            </div>

            <p className="text-gray-700 mb-8">
              Webmark addresses these challenges through a comprehensive
              bookmark management platform that prioritizes organization,
              accessibility, and user experience.
            </p>

            {/* Key Features */}
            <div className="mb-10">
              <h3 className="text-xl font-medium mb-6">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {keyFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-100 rounded-lg hover:border-gray-300 transition-all">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Value Propositions */}
            <div>
              <h3 className="text-xl font-medium mb-4">
                Unique Value Propositions
              </h3>
              <ul className="space-y-2 pl-6 list-disc text-gray-700">
                <li>One-stop platform for centralized bookmark management</li>
                <li>Visual and interactive bookmark organization</li>
                <li>Personalized user experience with custom collections</li>
                <li>
                  Efficient link retrieval through advanced search capabilities
                </li>
                <li>
                  End-to-end encryption ensures bookmark privacy and security
                </li>
              </ul>
            </div>
          </section>

          {/* Technology Stack */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-md bg-[#e1f0ff] text-[#2382FC] mr-3">
                <Code size={20} />
              </div>

              <h2 className="text-2xl font-semibold">Technology Stack</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Frontend Technologies */}
              <div>
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <Layers size={18} className="mr-2 text-gray-500" />
                  Frontend
                </h3>
                <div className="space-y-3">
                  {frontendTech.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm border-b border-gray-100 pb-2">
                      <span className="font-medium w-1/3 text-gray-800">
                        {tech.name}
                      </span>
                      <span className="text-gray-600">{tech.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend Technologies */}
              <div>
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <Code size={18} className="mr-2 text-gray-500" />
                  Backend
                </h3>
                <div className="space-y-3">
                  {backendTech.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm border-b border-gray-100 pb-2">
                      <span className="font-medium w-1/3 text-gray-800">
                        {tech.name}
                      </span>
                      <span className="text-gray-600">{tech.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* UI/UX Design */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-md bg-[#f9e9fd] text-[#bf4ec5] mr-3">
                <PenTool size={20} />
              </div>
              <h2 className="text-2xl font-semibold">UI/UX Approach</h2>
            </div>

            <p className="text-gray-700 mb-6">
              The Webmark interface was meticulously designed to provide an
              optimal user experience across different devices, focusing on
              intuitive navigation and visual organization.
            </p>

            <div className="space-y-8 mb-8">
              {/* Design challenge sections */}
              <div>
                <h3 className="text-lg font-medium mb-3 text-gray-800">
                  Navbar & Navigation
                </h3>
                <p className="text-gray-600 mb-2">
                  Created a compact, accessible design with integrated welcome
                  message and profile toggle functionality. The responsive menu
                  adapts to different screen sizes while maintaining easy access
                  to key functions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 text-gray-800">
                  Bookmark Organization & Display
                </h3>
                <p className="text-gray-600 mb-2">
                  Implemented a structured layout to contain bookmarks clearly,
                  with seamless adaptation across device sizes. The bookmark
                  cards maintain consistent formatting with logo, name, and
                  action buttons while preserving readability on mobile devices.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 text-gray-800">
                  Drag-and-Drop Functionality
                </h3>
                <p className="text-gray-600">
                  Developed intuitive desktop interactions with optimized mobile
                  alternatives, ensuring smooth, responsive movement of
                  bookmarks for organizational purposes. The system prevents
                  accidental deletions while maintaining consistent
                  functionality across devices.
                </p>
              </div>
            </div>

            {/* UI Image */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <img
                src="/projects/webmark-ui.png"
                alt="Webmark UI Screenshots"
                className="w-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/1200x600?text=Webmark+UI+Design`;
                }}
              />
            </div>
          </section>

          {/* Development Journey */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-md bg-[#e8e9ff] text-[#4851d5] mr-3">
                <GitBranch size={20} />
              </div>
              <h2 className="text-2xl font-semibold">Development Journey</h2>
            </div>

            <p className="text-gray-700 mb-8">
              Webmark was developed as a solo project, requiring a disciplined
              approach to project management and development. The journey
              involved wearing multiple hats: designer, developer, tester, and
              product manager.
            </p>

            {/* Development Phases */}
            <h3 className="text-xl font-medium mb-6">Development Timeline</h3>
            <div className="space-y-6 mb-12">
              {developmentPhases.map((phase, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-4 pb-6 border-b border-gray-100 last:border-0">
                  <div className="md:w-1/4">
                    <h4 className="font-medium text-gray-900">{phase.name}</h4>
                    <p className="text-sm text-gray-500">{phase.duration}</p>
                  </div>
                  <div className="md:w-3/4">
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Achievements */}
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-100 mb-10">
              <h3 className="text-xl font-medium mb-4">Key Achievements</h3>
              <ul className="space-y-3 list-disc pl-5 text-gray-700">
                <li>
                  <span className="font-medium">Complete Solo Project:</span>{" "}
                  Developed entire full-stack application independently
                </li>
                <li>
                  <span className="font-medium">User Adoption:</span> Grew to
                  60+ active users within first months of launch
                </li>
                <li>
                  <span className="font-medium">Feedback Iteration:</span>{" "}
                  Implemented 15+ user-suggested improvements
                </li>
                <li>
                  <span className="font-medium">Scalable Architecture:</span>{" "}
                  Built with future expansion capabilities
                </li>
              </ul>
            </div>
          </section>

          {/* Future Plans */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-md bg-[#d5e8ff] text-[#0074e3] mr-3">
                <Zap size={20} />
              </div>
              <h2 className="text-2xl font-semibold">
                Future Plans & Innovation
              </h2>
            </div>

            <p className="text-gray-700 mb-8">
              Webmark continues to evolve with ambitious plans for new features
              and capabilities to enhance the bookmark management experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {futureInnovations.map((innovation, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-100 rounded-lg hover:border-gray-300 transition-all">
                  <h4 className="font-medium text-gray-800 mb-2">
                    {innovation.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {innovation.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16 p-6 bg-gray-50 rounded-lg border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-gray-700">
              Webmark represents a modern, user-centric approach to bookmark
              management, combining intuitive design, powerful features, and
              scalable technology. The project stands as a testament to focused,
              independent software development—taking an idea from conception to
              a fully-functional product that serves real users and solves a
              common digital organization challenge.
            </p>
          </section>

          {/* Add LetsTalk component at bottom */}
          <div className="mt-16">
            <LetsTalk />
          </div>
        </article>
      </main>
    </div>
  );
};

export default Webmark;
