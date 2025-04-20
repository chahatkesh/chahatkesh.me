const projects = [
  {
    id: 1,
    title: "Webmark",
    description:
      "Encrypted Cross-Platform Bookmark Manager serving 60+ active users",
    overview:
      "An encrypted bookmark manager that allows users to securely save and organize their web bookmarks across devices.",
    challenge:
      "Creating a secure yet user-friendly system for bookmark management while ensuring cross-platform compatibility.",
    solution:
      "Implemented end-to-end encryption for user data while maintaining an intuitive interface that works seamlessly across browsers and devices.",
    coverImage: "/projects/webmark.png",
    tags: [
      { name: "React", color: "bg-red-100 text-red-800", category: "Tech" },
      {
        name: "Node.js",
        color: "bg-green-100 text-green-800",
        category: "Tech",
      },
      { name: "MongoDB", color: "bg-blue-100 text-blue-800", category: "Tech" },
      {
        name: "Team-built",
        color: "bg-purple-100 text-purple-800",
        category: "Type",
      },
    ],
    slug: "webmark",
    featured: true,
  },
  // {
  //   id: 2,
  //   title: "Servolend AI",
  //   description:
  //     "AI-Augmented Loan Origination Platform with real-time risk assessment",
  //   overview:
  //     "A loan origination platform that leverages AI to assess borrower risk and streamline the lending process.",
  //   challenge:
  //     "Integrating complex AI algorithms into a user-friendly interface while meeting stringent financial industry regulations.",
  //   solution:
  //     "Developed an intuitive platform that presents AI-driven insights in an understandable format for both lenders and borrowers.",
  //   coverImage: "/projects/webmark.png",
  //   tags: [
  //     { name: "React", color: "bg-red-100 text-red-800", category: "Tech" },
  //     { name: "AI/ML", color: "bg-blue-100 text-blue-800", category: "Tech" },
  //     {
  //       name: "Node.js",
  //       color: "bg-green-100 text-green-800",
  //       category: "Tech",
  //     },
  //     {
  //       name: "Fintech",
  //       color: "bg-yellow-100 text-yellow-800",
  //       category: "Industry",
  //     },
  //   ],
  //   slug: "servolend",
  //   featured: true,
  // },
  // {
  //   id: 3,
  //   title: "RepoCraft",
  //   description: "AI-Powered Documentation Generator for GitHub repositories",
  //   overview:
  //     "An AI tool that automatically generates comprehensive documentation for GitHub repositories to improve developer experience.",
  //   challenge:
  //     "Creating an AI system that can understand code structure across various programming languages and generate relevant documentation.",
  //   solution:
  //     "Built a tool that analyzes repository code patterns and generates contextually appropriate documentation with minimal user input.",
  //   coverImage: "/projects/webmark.png",
  //   tags: [
  //     { name: "Next.js", color: "bg-gray-100 text-gray-800", category: "Tech" },
  //     {
  //       name: "OpenAI",
  //       color: "bg-green-100 text-green-800",
  //       category: "Tech",
  //     },
  //     {
  //       name: "GitHub API",
  //       color: "bg-purple-100 text-purple-800",
  //       category: "Tech",
  //     },
  //     {
  //       name: "Personal",
  //       color: "bg-blue-100 text-blue-800",
  //       category: "Type",
  //     },
  //   ],
  //   slug: "repocraft",
  //   featured: false,
  // },
];

// Helper function to get featured projects
export const getFeaturedProjects = () => projects.filter(project => project.featured);

export default projects;
