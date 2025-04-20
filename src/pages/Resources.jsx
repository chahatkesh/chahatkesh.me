import React, { useState } from "react";
import {
  Code,
  PaintBucket,
  GraduationCap,
  BookOpen,
  Terminal,
  Bot,
  Star,
  Search,
  ExternalLink,
} from "lucide-react";
import LetsTalk from "../components/common/LetsTalk";
import {
  devResources,
  designResources,
  learningResources,
  aiResources,
  toolsResources,
  bookResources,
} from "../data/resourcesData";

const Resources = () => {
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // All resources combined
  const allResources = [
    ...devResources,
    ...designResources,
    ...learningResources,
    ...aiResources,
    ...toolsResources,
    ...bookResources,
  ];

  // Filter resources based on search and category
  const filterResources = (resources) => {
    if (!searchQuery) return resources;

    return resources.filter(
      (resource) =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        resource.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  };

  // Resource categories with icons
  const categories = [
    {
      name: "Development",
      icon: <Code size={20} />,
      data: devResources,
      color: "bg-[#e1f0ff] text-[#2382FC]",
    },
    {
      name: "Design",
      icon: <PaintBucket size={20} />,
      data: designResources,
      color: "bg-[#fff3e1] text-[#ff8c38]",
    },
    {
      name: "Learning",
      icon: <GraduationCap size={20} />,
      data: learningResources,
      color: "bg-[#e3f5e6] text-[#0e9d3a]",
    },
    {
      name: "AI & ML",
      icon: <Bot size={20} />,
      data: aiResources,
      color: "bg-[#f9e9fd] text-[#bf4ec5]",
    },
    {
      name: "Tools",
      icon: <Terminal size={20} />,
      data: toolsResources,
      color: "bg-[#d4f9db] text-[#0e9d3a]",
    },
    {
      name: "Books",
      icon: <BookOpen size={20} />,
      data: bookResources,
      color: "bg-[#e8e9ff] text-[#4851d5]",
    },
  ];

  // Component for resource card
  const ResourceCard = ({ resource }) => {
    return (
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200 bg-white">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-800 mb-1 flex items-center">
            {resource.title}
            {resource.favorite && (
              <Star size={14} fill="#FFD700" color="#FFD700" className="ml-2" />
            )}
          </h3>
          <ExternalLink size={14} className="text-gray-500" />
        </div>
        <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
        <div className="flex flex-wrap gap-2">
          {resource.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-100">
              {tag}
            </span>
          ))}
        </div>
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#37352f] flex flex-col">
      <main className="flex-1">
        <section className="py-16 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          <h1 className="text-3xl font-medium mb-6">Resources</h1>

          <div className="mb-10 p-6 bg-[#f7f6f3] rounded-lg border border-[#e6e6e6]">
            <p className="text-gray-700">
              A curated collection of resources I've found helpful throughout my
              journey. Feel free to explore and discover tools that might
              enhance your own projects and learning.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveFilter("All")}
              className={`px-4 py-1 text-sm border rounded-md transition-colors ${
                activeFilter === "All"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "border-gray-200 text-gray-700 hover:border-gray-400"
              }`}>
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveFilter(category.name)}
                className={`px-4 py-1 text-sm border rounded-md transition-colors ${
                  activeFilter === category.name
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-200 text-gray-700 hover:border-gray-400"
                }`}>
                {category.name}
              </button>
            ))}
          </div>

          {/* Show resources based on filter selection */}
          {activeFilter === "All" ? (
            // Show all categories when "All" is selected
            <div className="space-y-12">
              {categories.map((category) => {
                const filteredResources = filterResources(category.data);
                if (filteredResources.length === 0) return null;

                return (
                  <div
                    key={category.name}
                    className="bg-white rounded-lg border-t border-[#f0f0f0] pt-10">
                    <div className="flex items-center mb-6">
                      <div className={`p-2 rounded-md ${category.color} mr-3`}>
                        {category.icon}
                      </div>
                      <h2 className="text-xl font-medium">
                        {category.name} Resources
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-2">
                      {filteredResources.map((resource, index) => (
                        <ResourceCard key={index} resource={resource} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Show only selected category
            <div className="bg-white rounded-lg">
              {categories
                .filter((category) => category.name === activeFilter)
                .map((category) => {
                  const filteredResources = filterResources(category.data);

                  return (
                    <div key={category.name} className="mb-8">
                      <div className="flex items-center mb-6">
                        <div
                          className={`p-2 rounded-md ${category.color} mr-3`}>
                          {category.icon}
                        </div>
                        <h2 className="text-xl font-medium">
                          {category.name} Resources
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-2">
                        {filteredResources.length > 0 ? (
                          filteredResources.map((resource, index) => (
                            <ResourceCard key={index} resource={resource} />
                          ))
                        ) : (
                          <p className="text-gray-500 col-span-2">
                            No resources found matching your search.
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* Search results when no specific filter */}
          {searchQuery &&
            activeFilter === "All" &&
            filterResources(allResources).length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No resources found matching "{searchQuery}"
                </p>
              </div>
            )}

          {/* Add LetsTalk component at bottom */}
          <div className="mt-16">
            <LetsTalk />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Resources;
