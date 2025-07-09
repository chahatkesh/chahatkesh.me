"use client";

import ContentNotFound from "../ui/content-not-found";
import { typo } from "../ui/typograpghy";
import { Project } from "~/data/projects";
import ProjectItem from "./project-item";
import FeaturedProjectItem from "./featured-project-item";

interface ProjectListProps {
  projects: Project[];
  metadata?: boolean;
  showFeatured?: boolean;
}

const ProjectList = ({ projects, metadata, showFeatured = false }: ProjectListProps) => {
  return (
    <section aria-label="projects" className="mt-5 space-y-6" id="main-content">
      {metadata && <h2 className={typo({ variant: "h2" })}>Featured Projects</h2>}

      <div className="!mt-8">
        {projects.length > 0 ? (
          <ol className={`grid gap-8 ${showFeatured ? 'md:grid-cols-1' : 'md:grid-cols-1'}`} role="list">
            {projects.map((project) => (
              showFeatured ? 
              <FeaturedProjectItem 
                key={project.id} 
                {...project} 
                metadata={metadata}
              /> :
              <ProjectItem 
                key={project.id} 
                {...project} 
                metadata={metadata}
              />
            ))}
          </ol>
        ) : (
          <ContentNotFound text="No Projects Found" />
        )}
      </div>
    </section>
  );
};

export default ProjectList;
