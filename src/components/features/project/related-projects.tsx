import Image from "next/image";
import { SmartLink, typo } from "~/components/ui";
import { MotionDiv } from "~/components/shared";
import { ALL_STACKS } from "~/lib/project-utils";
import type { Project } from "~/data/projects";
import config from "~/config";

interface RelatedProjectsProps {
  projects: Project[];
  /** Number of related projects to display */
  count?: number;
}

/**
 * "More Projects" grid section shown at the bottom of project detail pages.
 */
export function RelatedProjects({ projects, count = 3 }: RelatedProjectsProps) {
  const visible = projects.slice(0, count);

  if (visible.length === 0) return null;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-16 pt-16 border-t border-neutral-800"
    >
      <h2 className={typo({ variant: "h2" })}>More Projects</h2>

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
              className="block w-full h-full"
            >
              <div className="rounded-xl overflow-hidden border border-neutral-800 bg-gradient-to-br from-neutral-900/50 to-neutral-950/70 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 h-full w-full flex flex-col">
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-md px-2 z-20">
                    <span className="text-xs text-neutral-300">
                      {new Date(project.datePublished).toLocaleDateString(
                        config.seo.language,
                        { year: "numeric", month: "short" },
                      )}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-400 line-clamp-3 mb-4 flex-1">
                    {project.tagline}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stacks.slice(0, 3).map((stack) => {
                      const techInfo = ALL_STACKS[stack];
                      const Icon = techInfo?.Icon;
                      return Icon ? (
                        <span key={stack} className="text-neutral-400">
                          <Icon size={16} aria-label={stack} />
                        </span>
                      ) : null;
                    })}
                    {project.stacks.length > 3 && (
                      <span className="text-xs text-neutral-500">
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
