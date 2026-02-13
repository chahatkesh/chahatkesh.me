import { type Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb } from "~/components/shared";
import { SmartLink, typo } from "~/components/ui";
import { projects } from "~/data/projects";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { FiGlobe } from "react-icons/fi";
import { TbBrandGithub } from "react-icons/tb";
import { FaChevronRight } from "react-icons/fa";
import config from "~/config";
import { ProjectJsonLd } from "~/components/features/project";
import { MotionDiv } from "~/components/shared";
import { getImageSrc } from "~/lib/project-utils";
import {
  TechStackBadges,
  RelatedProjects,
  ProjectTimeline,
} from "~/components/features/project";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return getSEOTags({
      title: "Project Not Found",
      description: "The requested project could not be found.",
    });
  }

  return getSEOTags({
    title: project.title,
    description: project.description,
    canonicalUrlRelative: `/projects/${project.slug}`,
    keywords: [...project.stacks, "Project Details", "Portfolio"],
    openGraph: {
      title: project.title,
      description: project.description,
    },
  });
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Projects", url: "/projects" },
        { name: project.title, url: `/projects/${project.slug}` },
      ])}

      <ProjectJsonLd
        title={project.title}
        description={project.description}
        slug={project.slug}
        datePublished={project.datePublished}
        dateStarted={project.dateStarted}
        dateModified={project.dateModified}
        image={`https://${config.domainName}${getImageSrc(project.cover)}`}
        tags={project.stacks}
      />

      <Breadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
          { name: project.title, url: `/projects/${project.slug}` },
        ]}
      />

      <div className="relative w-full aspect-video rounded-xl md:rounded-3xl border-2 border-neutral-800 overflow-hidden mb-12 group">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
          priority
          placeholder="blur"
          sizes="(max-width: 1200px) 100vw"
        />
        {project.contributors && project.contributors.length > 0 && (
          <div className="absolute top-6 right-6 z-20 text-[10px] bg-black/75 rounded-sm px-2 py-1 md:text-xs text-ring font-medium tracking-wide">
            TEAM PROJECT
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full h-[85%] md:h-1/2 bg-gradient-to-t from-black via-black/75 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 z-20 p-6 md:p-8 max-w-3xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-2">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-primary font-medium">
              {project.tagline}
            </p>
          </MotionDiv>
        </div>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <TechStackBadges stacks={project.stacks} />
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
          <p
            className={
              typo({ variant: "paragraph", size: "lg" }) + " text-justify"
            }
          >
            {project.task}
          </p>
        </div>
      </MotionDiv>

      <div className="space-y-12">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-5"
        >
          <div className="flex gap-8">
            {project.deployedURL && (
              <SmartLink
                href={project.deployedURL}
                className="text-ring font-bold transition-transform duration-300 hover:text-ring/80 hover:scale-[1.15]"
              >
                <div className="flex items-center gap-2">
                  <span className="leading-none">View Live Site</span>
                  <FiGlobe className="w-4 h-4 relative" />
                </div>
              </SmartLink>
            )}

            {project.isRepo && project.repoUrl && (
              <SmartLink
                href={project.repoUrl}
                className="text-ring font-bold transition-transform duration-300 hover:text-ring/80 hover:scale-[1.15]"
              >
                <div className="flex items-center gap-2">
                  <span className="leading-none">View Source Code</span>
                  <TbBrandGithub className="w-4 h-4 relative" />
                </div>
              </SmartLink>
            )}
          </div>
        </MotionDiv>

        <ProjectTimeline
          dateStarted={project.dateStarted}
          datePublished={project.datePublished}
          dateModified={project.dateModified}
        />

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="space-y-6"
        >
          <h2 className={typo({ variant: "h2" })}>About {project.title}</h2>
          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
            <p
              className={
                typo({ variant: "paragraph", size: "lg" }) + " text-justify"
              }
            >
              {project.detailedDescription}
            </p>
          </div>
        </MotionDiv>

        {project.contributors && project.contributors.length > 0 && (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="space-y-6"
          >
            <h2 className={typo({ variant: "h2" })}>Contributors</h2>
            <div className="space-y-4">
              {project.contributors.map((contributor, index) => (
                <MotionDiv
                  key={contributor.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center justify-between border-b border-neutral-800 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex-1">
                    <h3 className="font-ubuntu text-base text-white">
                      {contributor.name}
                    </h3>
                    <p className="text-sm text-neutral-400 mt-0.5">
                      {contributor.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    {contributor.github && (
                      <SmartLink
                        href={contributor.github}
                        className="text-neutral-400 hover:text-white transition-colors"
                      >
                        GitHub
                      </SmartLink>
                    )}
                    {contributor.linkedin && (
                      <SmartLink
                        href={contributor.linkedin}
                        className="text-neutral-400 hover:text-ring transition-colors"
                      >
                        LinkedIn
                      </SmartLink>
                    )}
                  </div>
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>
        )}

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="space-y-6"
        >
          <h2 className={typo({ variant: "h2" })}>Key Features</h2>
          <ul className="grid grid-cols-1 gap-5">
            {project.features.map((feature, index) => (
              <MotionDiv
                key={feature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <li className="flex items-start gap-3 rounded-xl transition-colors">
                  <span className="text-ring flex-shrink-0 mt-1 group-hover:text-primary transition-colors">
                    <FaChevronRight size={16} />
                  </span>
                  <p className="text-base">{feature}</p>
                </li>
              </MotionDiv>
            ))}
          </ul>
        </MotionDiv>
      </div>

      <RelatedProjects projects={projects.filter((p) => p.id !== project.id)} />
    </div>
  );
}
