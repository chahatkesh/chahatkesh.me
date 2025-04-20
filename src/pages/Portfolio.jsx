import React, { useState } from "react";
import ProjectCard from "../components/projects/ProjectCard";
import projects from "../data/projects";
import LetsTalk from "../components/common/LetsTalk";

export default function PortfolioPage() {
  const [category, setCategory] = useState("All");

  // Get unique categories from project tags
  const categories = [
    "All",
    ...new Set(
      projects.flatMap((project) =>
        project.tags
          .filter((tag) => tag.category === "Tech")
          .map((tag) => tag.name)
      )
    ),
  ];

  const filterProjects = () => {
    if (category === "All") {
      return projects;
    }
    return projects.filter((project) =>
      project.tags.some(
        (tag) => tag.name === category && tag.category === "Tech"
      )
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <main className="flex-1">
        <section className="py-16 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          <h1 className="text-3xl font-medium mb-8">Portfolio</h1>
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1 text-sm border rounded-md transition-colors ${
                  category === cat
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-200 text-gray-700 hover:border-gray-400"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filterProjects().map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Add Let's Talk component at the bottom */}
          <div className="mt-16">
            <LetsTalk />
          </div>
        </section>
      </main>
    </div>
  );
}
