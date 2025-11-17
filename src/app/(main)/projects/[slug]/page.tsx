import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "~/components/back-btn";
import SmartLink from "~/components/ui/smart-link";
import { typo } from "~/components/ui/typograpghy";
import projects from "~/data/projects";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { FiGlobe} from	"react-icons/fi";
import { TbBrandGithub } from "react-icons/tb";
import { FaChevronRight } from "react-icons/fa";
import config from "~/config";
import { ProjectJsonLd } from "~/components/project/project-jsonld";
import { MotionDiv } from "~/components/motion-wrapper";
import {
  FRONTEND_STACKS,
  BACKEND_DEVOPS,
  LANGUAGES_TOOLS
} from "~/data/stack";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return getSEOTags({
      title: "Project Not Found",
      description: "The requested project could not be found."
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
      images: [
        {
          url: `https://${config.domainName}${project.cover.src}`,
          width: 1200,
          height: 630,
          alt: project.title
        }
      ]
    }
  });
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

const ALL_STACKS = {
  ...FRONTEND_STACKS,
  ...BACKEND_DEVOPS,
  ...LANGUAGES_TOOLS
};

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const formattedDate = new Date(project.dateModified).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  );

  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Projects", url: "/projects" },
        { name: project.title, url: `/projects/${project.slug}` }
      ])}

      <ProjectJsonLd
        title={project.title}
        description={project.description}
        slug={project.slug}
        datePublished={project.datePublished}
        dateModified={project.dateModified}
        image={`https://${config.domainName}${project.cover.src}`}
        tags={project.stacks}
      />

      <BackButton>Back to Projects</BackButton>

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
            <p className="hidden md:block text-lg md:text-xl text-primary mb-2 font-medium">
              {project.tagline}
            </p>
            <div className="flex gap-4">
              <p className="text-sm text-neutral-300">
                Published on: {new Date(project.datePublished).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
                })}
              </p>
              <p className="hidden md:block text-sm text-neutral-300">
                Last updated: {formattedDate}
              </p>
            </div>
          </MotionDiv>
        </div>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex flex-wrap gap-2">
          {project.stacks.map((stack, index) => {
            const techInfo = ALL_STACKS[stack];
            const Icon = techInfo?.Icon;
            const className = techInfo?.className || "text-neutral-400";

            return (
              <MotionDiv
                key={index}
                className="flex items-center h-6 md:h-8 gap-1.5 px-3 rounded-full bg-neutral-900 border border-neutral-800 text-xs"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {Icon && (
                  <Icon className={className} size={14} aria-label={stack} />
                )}
                <span className="whitespace-nowrap">{stack}</span>
              </MotionDiv>
            );
          })}
        </div>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
          <p className={typo({ variant: "paragraph", size: "lg" }) + " text-justify"}>
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



        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className={typo({ variant: "h2" })}>About {project.title}</h2>
          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
            <p className={typo({ variant: "paragraph", size: "lg" }) + " text-justify"}>
              {project.detailedDescription}
            </p>
          </div>
        </MotionDiv>

        {project.contributors && project.contributors.length > 0 && (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="space-y-6"
          >
            <h2 className={typo({ variant: "h2" })}>Contributors</h2>
            <div className="space-y-4">
              {project.contributors.map((contributor, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center justify-between border-b border-neutral-800 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex-1">
                    <h3 className="font-ubuntu text-base text-white">{contributor.name}</h3>
                    <p className="text-sm text-neutral-400 mt-0.5">{contributor.role}</p>
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
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className={typo({ variant: "h2" })}>Key Features</h2>
          <ul className="grid grid-cols-1 gap-5">
            {project.features.map((feature, index) => (
              <MotionDiv
                key={index}
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

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 pt-16 border-t border-neutral-800"
      >
        <h2 className={typo({ variant: "h2" })}>More Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {projects
            .filter((p) => p.id !== project.id)
            .slice(0, 3)
            .map((relatedProject, index) => (
              <MotionDiv
                key={relatedProject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="group"
              >
                <SmartLink
                  href={`/projects/${relatedProject.slug}`}
                  className="block w-full h-full"
                >
                  <div className="rounded-xl overflow-hidden border border-neutral-800 bg-gradient-to-br from-neutral-900/50 to-neutral-950/70 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 h-full w-full flex flex-col">
                    <div className="relative w-full aspect-video overflow-hidden">
                      <Image
                        src={relatedProject.cover}
                        alt={relatedProject.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-md px-2 z-20">
                        <span className="text-xs text-neutral-300">
                          {new Date(relatedProject.datePublished).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short"
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                        {relatedProject.title}
                      </h3>
                      <p className="text-sm text-neutral-400 line-clamp-3 mb-4 flex-1">
                        {relatedProject.tagline}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {relatedProject.stacks.slice(0, 3).map((stack, i) => {
                          const techInfo = ALL_STACKS[stack];
                          const Icon = techInfo?.Icon;

                          return Icon ? (
                            <span key={i} className="text-neutral-400">
                              <Icon size={16} aria-label={stack} />
                            </span>
                          ) : null;
                        })}
                        {relatedProject.stacks.length > 3 && (
                          <span className="text-xs text-neutral-500">
                            +{relatedProject.stacks.length - 3} more
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
    </div>
  );
}
