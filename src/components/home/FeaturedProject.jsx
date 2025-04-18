import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FeaturedProjects() {
  const navigate = useNavigate();

  // Featured projects data
  const featuredProjects = [
    {
      id: 1,
      title: "Webmark",
      description:
        "Encrypted Cross-Platform Bookmark Manager serving 60+ active users. Built with React/TypeScript/Node.js, implementing military-grade encryption and drag-drop interface.",
      coverImage: "/projects/webmark.png",
      tags: [
        { name: "React", color: "bg-red-100 text-red-800" },
        { name: "Node.js", color: "bg-green-100 text-green-800" },
        { name: "MongoDB", color: "bg-blue-100 text-blue-800" },
      ],
      demoUrl: "https://webmark.site",
      githubUrl: "https://github.com/chahatkesh/webmark",
      slug: "webmark",
    },
    {
      id: 2,
      title: "RepoCraft",
      description:
        "AI-Powered Repository Documentation Generator using OpenAI & GitHub API to generate READMEs, producing 20+ files per week with optimized repo analysis algorithms.",
      coverImage: "/api/placeholder/800/400",
      tags: [
        { name: "Next.js", color: "bg-gray-100 text-gray-800" },
        { name: "TypeScript", color: "bg-blue-100 text-blue-800" },
        { name: "OpenAI API", color: "bg-green-100 text-green-800" },
      ],
      demoUrl: "https://repocraft.dev",
      githubUrl: "https://github.com/chahatkesh/repocraft",
      slug: "repocraft",
    },
    {
      id: 3,
      title: "Servolend AI",
      description:
        "AI-Augmented Loan Origination Platform with multi-tenant architecture, integrating GenAI for 1-click risk assessment and role-based access control.",
      coverImage: "/api/placeholder/800/400",
      tags: [
        { name: "React.js", color: "bg-red-100 text-red-800" },
        { name: "Node.js", color: "bg-green-100 text-green-800" },
        { name: "LangChain", color: "bg-purple-100 text-purple-800" },
      ],
      demoUrl: "https://servolend.ai",
      githubUrl: "https://github.com/chahatkesh/servolend",
      slug: "servolend",
    },
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Projects
          </h2>
          <button
            onClick={() => navigate("/portfolio")}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
            View all projects
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>

        <div className="space-y-16">
          {featuredProjects.map((project, index) => (
            <div key={project.id} className="group">
              <div
                className={`flex flex-col ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
                } gap-8`}>
                <div className="md:w-1/2">
                  <div
                    className="h-64 md:h-80 bg-gray-100 rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/portfolio/${project.slug}`)}>
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="md:w-1/2 flex flex-col justify-center">
                  <h3
                    className="text-2xl font-bold text-gray-900 mb-4 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => navigate(`/portfolio/${project.slug}`)}>
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-3 py-1 rounded-md text-sm ${tag.color}`}>
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                      <ExternalLink size={16} className="mr-1" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium transition-colors">
                      <Github size={16} className="mr-1" />
                      Source Code
                    </a>
                    <button
                      onClick={() => navigate(`/portfolio/${project.slug}`)}
                      className="inline-flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                      <ArrowRight size={16} className="mr-1" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
