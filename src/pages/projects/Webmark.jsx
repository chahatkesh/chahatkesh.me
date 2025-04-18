import { useState } from "react";
import { Home, ChevronRight, ExternalLink, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Webmark() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Project details
  const project = {
    id: 1,
    title: "Webmark",
    subtitle: "Modern Bookmark Management Platform",
    description:
      "Webmark revolutionizes bookmark management with a centralized hub, smart organization, military-grade security, and cross-platform synchronization.",
    coverImage: "/projects/webmark.png",
    demoUrl: "https://webmark.site",
    githubUrl: "https://github.com/chahatkesh/webmark",
    tags: [
      { name: "React", color: "bg-red-100 text-red-800", category: "Tech" },
      {
        name: "Node.js",
        color: "bg-green-100 text-green-800",
        category: "Tech",
      },
      {
        name: "MongoDB",
        color: "bg-blue-100 text-blue-800",
        category: "Tech",
      },
      {
        name: "Team-built",
        color: "bg-purple-100 text-purple-800",
        category: "Type",
      },
    ],
    stats: [
      { label: "Active Users", value: "60+" },
      { label: "Bookmarks Saved", value: "10,000+" },
      { label: "Cross-Platform", value: "Yes" },
      { label: "Security", value: "End-to-End" },
    ],
    features: [
      {
        title: "Drag & Drop Interface",
        description:
          "Intuitive bookmark organization using React Beautiful DnD",
        icon: "🔄",
      },
      {
        title: "Smart Collections",
        description: "Automatic category suggestions using machine learning",
        icon: "🧠",
      },
      {
        title: "Secure Sharing",
        description: "Encrypted collection sharing with AES-256 encryption",
        icon: "🔒",
      },
      {
        title: "Advanced Search",
        description: "Full-text search across all bookmarks with ElasticSearch",
        icon: "🔍",
      },
    ],
    techStack: {
      frontend: [
        "React.js",
        "TypeScript",
        "React Query",
        "Tailwind CSS",
        "Radix UI",
        "Lucide React",
        "Framer Motion",
        "React Beautiful DnD",
        "Vite",
        "React Toastify",
      ],
      backend: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "JWT",
        "Bcrypt",
        "Nodemailer",
        "Node-cron",
        "Dotenv",
      ],
    },
    problems: [
      "73% of users lose important links due to poor organization",
      "Average user spends 12 minutes daily searching for saved links",
      "68% struggle with cross-device bookmark synchronization",
      "82% express concerns about bookmark security",
    ],
    solutions: [
      "Centralized Hub: Unified platform for all bookmarks",
      "Smart Organization: AI-powered categorization (coming soon)",
      "Military-Grade Security: End-to-end encryption",
      "Cross-Platform Sync: Instant access across devices",
    ],
    developmentJourney: [
      {
        phase: "Phase 1: Foundation (4 weeks)",
        tasks: [
          "Core bookmark CRUD operations",
          "Basic user authentication",
          "Initial UI components",
        ],
      },
      {
        phase: "Phase 2: Enhancement (6 weeks)",
        tasks: [
          "Advanced search implementation",
          "Drag & drop functionality",
          "Cross-device synchronization",
        ],
      },
      {
        phase: "Phase 3: Optimization (2 weeks)",
        tasks: [
          "Performance improvements",
          "Security enhancements",
          "Automated testing suite",
        ],
      },
    ],
    upcomingFeatures: [
      {
        title: "AI-Powered Insights",
        timeline: "Q4 2024",
        description:
          "Advanced analytics and suggestions based on bookmark patterns",
      },
      {
        title: "Browser Extension",
        timeline: "Q1 2025",
        description: "One-click saving from any browser with custom tagging",
      },
      {
        title: "Team Collaboration",
        timeline: "Q2 2025",
        description:
          "Real-time collaboration tools for teams and organizations",
      },
    ],
    team: [
      {
        name: "Chahat Kesharwani",
        role: "Lead Developer",
        github: "https://github.com/chahatkesh",
      },
    ],
  };

  // For demo purposes - would normally come from API
  const screenshots = [
    {
      id: 1,
      title: "Dashboard View",
      description: "The main dashboard showing categories and bookmarks",
      url: "/projects/webmark.png",
    },
    {
      id: 2,
      title: "Bookmark Organization",
      description: "Drag and drop interface for organizing bookmarks",
      url: "/api/placeholder/800/450",
    },
    {
      id: 3,
      title: "Search Functionality",
      description: "Powerful search across all bookmarks with filters",
      url: "/api/placeholder/800/450",
    },
    {
      id: 4,
      title: "Search Functionality",
      description: "Powerful search across all bookmarks with filters",
      url: "/api/placeholder/800/450",
    },
  ];

  // Tabs content rendering
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-medium mb-4 text-gray-800">
                Project Overview
              </h3>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-medium mb-3 text-gray-700">
                      The Bookmark Management Crisis
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      {project.problems.map((problem, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          <span>{problem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-3 text-gray-700">
                      Webmark's Solution
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      {project.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  {project.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-md text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-medium mb-4 text-gray-800">
                Key Features
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="text-2xl mr-4">{feature.icon}</div>
                      <div>
                        <h4 className="text-lg font-medium text-gray-800">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-medium mb-4 text-gray-800">
                Coming Soon
              </h3>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="space-y-4">
                  {project.upcomingFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-md">
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {feature.description}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0 md:ml-4">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {feature.timeline}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );

      case "tech":
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-medium mb-4 text-gray-800">
                Technology Stack
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-medium mb-4 text-gray-700 flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    Frontend Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.frontend.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-medium mb-4 text-gray-700 flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    Backend Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.backend.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-green-50 text-green-700 rounded-md text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-medium mb-4 text-gray-800">
                Technical Architecture
              </h3>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-3 text-gray-700">
                    Frontend Architecture
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700 overflow-x-auto">
                    <p>React.js → Routing via React Router</p>
                    <p>React.js → Type Safety via TypeScript</p>
                    <p>React.js → State Management via React Query</p>
                    <p>React Query → Global State via Context API</p>
                    <p>React.js → Styling via Tailwind CSS</p>
                    <p>Tailwind CSS → Accessible Components via Radix UI</p>
                    <p>React.js → Drag & Drop via React Beautiful DnD</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-3 text-gray-700">
                    Backend Architecture
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700 overflow-x-auto">
                    <p>Node.js & Express.js → Database via MongoDB</p>
                    <p>MongoDB → Modeling via Mongoose</p>
                    <p>Node.js & Express.js → Authentication via JWT</p>
                    <p>JWT → Password Hashing via Bcrypt</p>
                    <p>Node.js & Express.js → Email Service via Nodemailer</p>
                    <p>Node.js & Express.js → Scheduled Tasks via Node-cron</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

      case "gallery":
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-medium mb-4 text-gray-800">
                Project Gallery
              </h3>
              <div className="grid gap-6">
                {screenshots.map((screenshot) => (
                  <div
                    key={screenshot.id}
                    className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="text-lg font-medium mb-2 text-gray-700">
                      {screenshot.title}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {screenshot.description}
                    </p>
                    <div className="bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={screenshot.url}
                        alt={screenshot.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      case "journey":
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-medium mb-4 text-gray-800">
                Development Journey
              </h3>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="relative border-l-2 border-gray-200 pl-6 ml-6">
                  {project.developmentJourney.map((phase, phaseIndex) => (
                    <div key={phaseIndex} className="mb-8 relative">
                      <div className="absolute -left-9 mt-1.5 w-5 h-5 rounded-full bg-blue-500"></div>
                      <h4 className="text-lg font-medium text-gray-800 mb-3">
                        {phase.phase}
                      </h4>
                      <ul className="space-y-2">
                        {phase.tasks.map((task, taskIndex) => (
                          <li
                            key={taskIndex}
                            className="text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                            {task}
                          </li>
                        ))}
                      </ul>
                      {phaseIndex < project.developmentJourney.length - 1 && (
                        <div className="h-6"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-medium mb-4 text-gray-800">Team</h3>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl font-bold">
                      CK
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-800">
                        {project.team[0].name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {project.team[0].role}
                      </p>
                    </div>
                  </div>
                  <a
                    href={project.team[0].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mt-4 md:mt-0 text-gray-600 hover:text-gray-900">
                    <Github size={16} className="mr-1" />
                    <span>GitHub Profile</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 text-gray-800 font-sans"
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif",
      }}>
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 mb-6 text-sm text-gray-500">
          <a href="/" className="flex items-center hover:text-gray-900">
            <Home size={16} className="mr-1" />
            <span>Home</span>
          </a>
          <ChevronRight size={14} />
          <a
            href="/portfolio"
            onClick={(e) => {
              e.preventDefault();
              navigate("/portfolio");
            }}
            className="hover:text-gray-900">
            Portfolio
          </a>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Webmark</span>
        </nav>

        {/* Project Header */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="aspect-w-16 aspect-h-6 bg-gray-100">
            <img
              src={project.coverImage || "/api/placeholder/1200/400"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600">{project.subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-md text-sm ${tag.color}`}>
                  {tag.name}
                </span>
              ))}
            </div>

            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <ExternalLink size={18} className="mr-2" />
                  Visit Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <Github size={18} className="mr-2" />
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}>
              Overview
            </button>
            <button
              onClick={() => setActiveTab("tech")}
              className={`py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "tech"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}>
              Technology
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "gallery"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}>
              Gallery
            </button>
            <button
              onClick={() => setActiveTab("journey")}
              className={`py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "journey"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}>
              Journey
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </main>
    </div>
  );
}
