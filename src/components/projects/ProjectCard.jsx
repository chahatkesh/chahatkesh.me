import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className="border border-gray-100 hover:border-gray-300 transition-all rounded-xl overflow-hidden shadow-sm hover:shadow-md block">
      <div className="h-48 bg-gray-100 overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://via.placeholder.com/600x300?text=${encodeURIComponent(
              project.title
            )}`;
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-md text-xs ${tag.color}`}>
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
