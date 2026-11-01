import Image from "next/image";
import { SmartLink, typo } from "~/components/ui";
import { MotionDiv } from "~/components/shared";
import { ALL_STACKS } from "~/lib/project-utils";
import type { Project } from "~/data/projects";
import config from "~/config";
import { MAX_RELATED_PROJECTS, MAX_VISIBLE_STACKS_FEATURED } from "~/constants";

interface RelatedProjectsProps {
  projects: Project[];
  /** Number of related projects to display */
  count?: number;
}

/**
 * "More Projects" grid section shown at the bottom of project detail pages.
 */
export function RelatedProjects({
  projects,
  count = MAX_RELATED_PROJECTS,
}: RelatedProjectsProps) {
  const visible = projects.slice(0, count);

  if (visible.length === 0) return null;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-16 pt-16 border-t border-border"
    >
      <h2 className={typo({ variant: "h2" })}>Keep Exploring</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {visible.map((project, index) => (
          <MotionDiv
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="group"
          >
            <SmartLink
              href={`/projects/${project.slug}`}
              className="block h-full w-full rounded-xl text-foreground"
            >
              <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors duration-300 hover:border-ring/40">
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                  />
                  <div className="absolute right-2.5 top-2.5 z-20 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-md">
                    <time dateTime={project.datePublished}>
                      {new Date(project.datePublished).toLocaleDateString(
                        config.seo.language,
                        { year: "numeric", month: "short" },
                      )}
                    </time>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-ring">
                    {project.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 flex-1 text-sm text-muted-foreground">
                    {project.tagline}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {project.stacks
                      .slice(0, MAX_VISIBLE_STACKS_FEATURED)
                      .map((stack) => {
                        const techInfo = ALL_STACKS[stack];
                        const Icon = techInfo?.Icon;
                        return Icon ? (
                          <span key={stack} className="text-muted-foreground">
                            <Icon size={16} aria-label={stack} />
                          </span>
                        ) : null;
                      })}
                    {project.stacks.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{project.stacks.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </SmartLink>
          </MotionDiv>
        ))}
      </div>
    </MotionDiv>
  );
}
