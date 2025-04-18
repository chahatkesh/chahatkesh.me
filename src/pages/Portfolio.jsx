import { useState, useEffect, useRef } from "react";
import {
  Filter,
  X,
  ChevronDown,
  Search,
  Home,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PortfolioPage() {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);

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
      title: "Servolend AI",
      description: "AI-Augmented Loan Origination Platform",
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
      slug: "servolend",
    },
    {
      id: 3,
      title: "Task Management System",
      description: "Collaborative task management tool for distributed teams",
      coverImage: "/api/placeholder/400/200",
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
      coverImage: "/api/placeholder/400/200",
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
      coverImage: "/api/placeholder/400/200",
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

  // Filter projects based on selected tags and search query
  const filteredProjects = projects
    .filter((project) =>
      selectedTags.length > 0
        ? selectedTags.every((tag) => project.tags.some((t) => t.name === tag))
        : true
    )
    .filter((project) =>
      searchQuery
        ? project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.tags.some((tag) =>
            tag.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : true
    );

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
    // Use React Router's navigate function to go to the project detail page
    navigate(`/portfolio/${slug}`);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }

      // Escape to close search
      if (e.key === "Escape" && showSearch) {
        setShowSearch(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSearch]);

  // Focus search input when opened
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  return (
    <div
      className="min-h-screen bg-gray-50 text-gray-800 font-sans"
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif",
      }}>
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 mb-6 text-sm text-gray-500">
          <a href="/" className="flex items-center hover:text-gray-900">
            <Home size={16} className="mr-1" />
            <span>Home</span>
          </a>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Portfolio</span>
        </nav>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>

          <div className="flex space-x-2">
            <button
              onClick={() => setShowSearch(true)}
              className="flex items-center text-gray-700 hover:text-gray-900 py-1.5 px-3 rounded hover:bg-gray-200 border border-gray-200 bg-white">
              <Search size={16} className="mr-2" />
              <span className="font-medium">Search</span>
              <span className="ml-2 text-xs text-gray-500">⌘K</span>
            </button>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-700 hover:text-gray-900 py-1.5 px-3 rounded hover:bg-gray-200 border border-gray-200 bg-white">
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
        </div>

        {/* Filter UI */}
        {showFilters && (
          <div className="mb-6 p-5 border border-gray-200 rounded-lg bg-white shadow-sm">
            <div className="flex mb-4 border-b border-gray-200 pb-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`mr-4 pb-2 text-sm font-medium whitespace-nowrap ${
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
                        className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                          selectedTags.includes(tag.name)
                            ? tag.color + " ring-2 ring-gray-300"
                            : tag.color + " hover:ring-1 hover:ring-gray-300"
                        }`}>
                        {tag.name}
                      </button>
                    ))
                : (tagsByCategory[filterCategory] || []).map((tag) => (
                    <button
                      key={tag.name}
                      onClick={() => toggleTag(tag.name)}
                      className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                        selectedTags.includes(tag.name)
                          ? tag.color + " ring-2 ring-gray-300"
                          : tag.color + " hover:ring-1 hover:ring-gray-300"
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
              className="border border-gray-200 rounded-lg overflow-hidden hover:bg-gray-50 transition-colors cursor-pointer bg-white shadow-sm group">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 w-full h-auto overflow-hidden relative bg-gray-100">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 md:w-3/4">
                  <h3 className="text-lg font-medium mb-2 text-gray-900">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
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
                        className={`px-2 py-0.5 text-xs rounded ${tag.color} cursor-pointer hover:ring-1 hover:ring-gray-300`}>
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
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm">
            <p className="text-gray-500 mb-2">
              No projects match your selected filters.
            </p>
            <button
              onClick={() => {
                setSelectedTags([]);
                setSearchQuery("");
              }}
              className="text-blue-600 hover:text-blue-800 font-medium">
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Spotlight Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div
            className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center border-b border-gray-200 p-4">
              <Search size={18} className="text-gray-400 mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by title, description, or tags..."
                className="flex-1 outline-none text-gray-800 text-lg"
                autoFocus
              />
              <button
                onClick={() => setShowSearch(false)}
                className="text-gray-400 hover:text-gray-700">
                <X size={18} />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {searchQuery && (
                <div className="p-2">
                  <p className="text-xs text-gray-500 px-3 py-1">
                    {filteredProjects.length}{" "}
                    {filteredProjects.length === 1 ? "result" : "results"}
                  </p>
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                      onClick={() => {
                        setShowSearch(false);
                        handleProjectClick(project.slug);
                      }}>
                      <div className="font-medium text-gray-900">
                        {project.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {project.description}
                      </div>
                    </div>
                  ))}
                  {filteredProjects.length === 0 && (
                    <div className="px-3 py-4 text-center text-gray-500">
                      No matching projects found
                    </div>
                  )}
                </div>
              )}
              {!searchQuery && (
                <div className="p-4 text-center text-gray-500">
                  Start typing to search projects
                </div>
              )}
            </div>

            <div className="px-4 py-3 bg-gray-50 text-xs text-gray-500 border-t border-gray-200 rounded-b-lg flex justify-between">
              <div>
                Press{" "}
                <kbd className="px-2 py-0.5 rounded bg-gray-100 border border-gray-300">
                  Esc
                </kbd>{" "}
                to close
              </div>
              <div>
                Press{" "}
                <kbd className="px-2 py-0.5 rounded bg-gray-100 border border-gray-300">
                  Enter
                </kbd>{" "}
                to select
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
