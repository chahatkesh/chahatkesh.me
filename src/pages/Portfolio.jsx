import { useState } from "react";
import { Filter, X, ChevronDown } from "lucide-react";

export default function PortfolioPage() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");

  // Sample projects data
  const projects = [
    {
      id: 1,
      title: "Webmark",
      description:
        "Encrypted Cross-Platform Bookmark Manager serving 60+ active users",
      coverImage: "/projects/webmark.png",
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
      slug: "webmark",
    },
    {
      id: 2,
      title: "Weather Dashboard",
      description:
        "Real-time weather tracking application with location-based forecasts",
      coverImage: "/projects/webmark.png",
      tags: [
        { name: "React", color: "bg-red-100 text-red-800", category: "Tech" },
        {
          name: "JavaScript",
          color: "bg-yellow-100 text-yellow-800",
          category: "Tech",
        },
        {
          name: "API",
          color: "bg-indigo-100 text-indigo-800",
          category: "Tech",
        },
        {
          name: "Personal",
          color: "bg-pink-100 text-pink-800",
          category: "Type",
        },
      ],
      slug: "weather-dashboard",
    },
    {
      id: 3,
      title: "Task Management System",
      description: "Collaborative task management tool for distributed teams",
      coverImage: "/projects/webmark.png",
      tags: [
        { name: "React", color: "bg-red-100 text-red-800", category: "Tech" },
        {
          name: "TypeScript",
          color: "bg-blue-100 text-blue-800",
          category: "Tech",
        },
        {
          name: "PostgreSQL",
          color: "bg-green-100 text-green-800",
          category: "Tech",
        },
        {
          name: "Freelance",
          color: "bg-orange-100 text-orange-800",
          category: "Type",
        },
      ],
      slug: "task-management",
    },
    {
      id: 4,
      title: "Social Media Analyzer",
      description: "AI-powered sentiment analysis for social media platforms",
      coverImage: "/projects/webmark.png",
      tags: [
        {
          name: "Python",
          color: "bg-blue-100 text-blue-800",
          category: "Tech",
        },
        { name: "React", color: "bg-red-100 text-red-800", category: "Tech" },
        {
          name: "TensorFlow",
          color: "bg-yellow-100 text-yellow-800",
          category: "Tech",
        },
        {
          name: "Hackathon",
          color: "bg-teal-100 text-teal-800",
          category: "Type",
        },
      ],
      slug: "social-media-analyzer",
    },
    {
      id: 5,
      title: "Budget Tracker",
      description: "Personal finance application with visualization tools",
      coverImage: "/projects/webmark.png",
      tags: [
        { name: "React", color: "bg-red-100 text-red-800", category: "Tech" },
        {
          name: "Chart.js",
          color: "bg-purple-100 text-purple-800",
          category: "Tech",
        },
        {
          name: "Firebase",
          color: "bg-yellow-100 text-yellow-800",
          category: "Tech",
        },
        {
          name: "Personal",
          color: "bg-pink-100 text-pink-800",
          category: "Type",
        },
      ],
      slug: "budget-tracker",
    },
  ];

  // Get all unique tags grouped by category
  const tagsByCategory = projects
    .flatMap((project) => project.tags)
    .reduce((acc, tag) => {
      if (!acc[tag.category]) {
        acc[tag.category] = [];
      }

      // Only add if not already present
      if (!acc[tag.category].some((t) => t.name === tag.name)) {
        acc[tag.category].push({ name: tag.name, color: tag.color });
      }

      return acc;
    }, {});

  // Get all unique categories
  const categories = ["All", ...Object.keys(tagsByCategory)];

  // Filter projects based on selected tags
  const filteredProjects =
    selectedTags.length > 0
      ? projects.filter((project) =>
          selectedTags.every((tag) => project.tags.some((t) => t.name === tag))
        )
      : projects;

  // Toggle tag selection
  const toggleTag = (tagName) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tagName)
        ? prevTags.filter((t) => t !== tagName)
        : [...prevTags, tagName]
    );
  };

  // Handle project click to navigate to detail page
  const handleProjectClick = (slug) => {
    // In a real app, use router navigation
    window.location.href = `/projects/${slug}`;
  };

  return (
    <div
      className="min-h-screen bg-white text-gray-800 font-sans"
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif",
      }}>
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-gray-700 hover:text-gray-900 py-1.5 px-3 rounded hover:bg-gray-100 border border-gray-200">
            <Filter size={16} className="mr-2" />
            <span className="font-medium">Filter</span>
            <ChevronDown
              size={16}
              className={`ml-2 transform transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Filter UI */}
        {showFilters && (
          <div className="mb-6 p-5 border border-gray-200 rounded-lg bg-white shadow-sm">
            <div className="flex mb-4 border-b border-gray-200 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`mr-4 pb-2 text-sm font-medium ${
                    filterCategory === category
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-800"
                  }`}>
                  {category}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              {filterCategory === "All"
                ? Object.values(tagsByCategory)
                    .flat()
                    .map((tag) => (
                      <button
                        key={tag.name}
                        onClick={() => toggleTag(tag.name)}
                        className={`px-3 py-1.5 text-xs rounded-md ${
                          selectedTags.includes(tag.name)
                            ? tag.color + " ring-2 ring-gray-300"
                            : tag.color
                        }`}>
                        {tag.name}
                      </button>
                    ))
                : (tagsByCategory[filterCategory] || []).map((tag) => (
                    <button
                      key={tag.name}
                      onClick={() => toggleTag(tag.name)}
                      className={`px-3 py-1.5 text-xs rounded-md ${
                        selectedTags.includes(tag.name)
                          ? tag.color + " ring-2 ring-gray-300"
                          : tag.color
                      }`}>
                      {tag.name}
                    </button>
                  ))}
            </div>

            {selectedTags.length > 0 && (
              <div className="flex items-center mt-4 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-500 mr-2">Active filters:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tagName) => {
                    const tagData = Object.values(tagsByCategory)
                      .flat()
                      .find((t) => t.name === tagName);
                    return (
                      <span
                        key={tagName}
                        className={`px-2 py-1 rounded-md flex items-center text-xs ${tagData.color}`}>
                        {tagName}
                        <button
                          onClick={() => toggleTag(tagName)}
                          className="ml-1.5 hover:text-gray-900">
                          <X size={12} />
                        </button>
                      </span>
                    );
                  })}
                  <button
                    onClick={() => setSelectedTags([])}
                    className="text-xs text-gray-500 hover:text-gray-800 ml-2">
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Selected tags display when filter is closed */}
        {!showFilters && selectedTags.length > 0 && (
          <div className="flex items-center mb-6 flex-wrap gap-2">
            <span className="text-sm text-gray-500 mr-2">Filters:</span>
            {selectedTags.map((tagName) => {
              const tagData = Object.values(tagsByCategory)
                .flat()
                .find((t) => t.name === tagName);
              return (
                <span
                  key={tagName}
                  className={`px-2 py-1 rounded-md flex items-center text-xs ${tagData.color}`}>
                  {tagName}
                  <button
                    onClick={() => toggleTag(tagName)}
                    className="ml-1.5 hover:text-gray-900">
                    <X size={12} />
                  </button>
                </span>
              );
            })}
            <button
              onClick={() => setSelectedTags([])}
              className="text-xs text-gray-500 hover:text-gray-800">
              Clear all
            </button>
          </div>
        )}

        {/* Projects Grid - Notion-style */}
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project.slug)}
              className="border border-gray-200 rounded-lg overflow-hidden hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 w-full">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 md:w-2/3">
                  <h3 className="text-lg font-medium mb-2 text-gray-900">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={`${project.id}-${tag.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTag(tag.name);
                        }}
                        className={`px-2 py-0.5 text-xs rounded ${tag.color} cursor-pointer hover:ring-2 hover:ring-gray-300`}>
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500 mb-2">
              No projects match your selected filters.
            </p>
            <button
              onClick={() => setSelectedTags([])}
              className="text-blue-600 hover:text-blue-800 font-medium">
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
