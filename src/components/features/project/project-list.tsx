import { ContentNotFound, typo } from "~/components/ui";
import { type Project } from "~/data/projects";
import ProjectItem from "./project-item";
import FeaturedProjectItem from "./featured-project-item";
import { ProjectJsonLd } from "./project-jsonld";
import config from "~/config";
import { getImageSrc } from "~/lib/project-utils";

interface ProjectListProps {
  projects: Project[];
  metadata?: boolean;
  showFeatured?: boolean;
}

const ProjectList = ({
  projects,
  metadata,
  showFeatured = false,
}: ProjectListProps) => {
  return (
    <section aria-label="projects" className="mt-5 space-y-6">
      {metadata && (
        <>
          <h2 className={typo({ variant: "h2" })}>Work Worth Showing</h2>
          {projects.map((project) => (
            <ProjectJsonLd
              key={project.slug}
              title={project.title}
              description={project.description}
              slug={project.slug}
              datePublished={project.datePublished}
              dateStarted={project.dateStarted}
              dateModified={project.dateModified}
              image={`https://${config.domainName}${getImageSrc(project.cover)}`}
              tags={project.stacks}
            />
          ))}
        </>
      )}

      <div className="!mt-8">
        {projects.length > 0 ? (
          <ol
            className={`grid gap-8 ${showFeatured ? "md:grid-cols-1" : "md:grid-cols-1"}`}
            role="list"
          >
            {projects.map((project, index) =>
              showFeatured ? (
                <FeaturedProjectItem
                  key={project.id}
                  {...project}
                  metadata={false}
                />
              ) : (
                <ProjectItem
                  key={project.id}
                  {...project}
                  metadata={false}
                  imagePriority={index === 0}
                />
              ),
            )}
          </ol>
        ) : (
          <ContentNotFound text="No Projects Found" />
        )}
      </div>
    </section>
  );
};

export default ProjectList;
