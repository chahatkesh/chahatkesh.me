import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "~/components/back-btn";
import SmartLink from "~/components/ui/smart-link";
import { typo } from "~/components/ui/typograpghy";
import projects from "~/data/projects";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import config from "~/config";
import { ProjectJsonLd } from "~/components/project/project-jsonld";
import { MotionDiv } from "~/components/motion-wrapper";
import { FRONTEND_STACKS, BACKEND_DEVOPS, LANGUAGES_TOOLS } from "~/data/stack";

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
      images: [{
        url: `https://${config.domainName}${project.cover.src}`,
        width: 1200,
        height: 630,
        alt: project.title
      }]
    },
  });
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Combine all tech stacks for icon lookup
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

  const formattedDate = new Date(project.dateModified).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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
        dateModified={project.dateModified}
        image={`https://${config.domainName}${project.cover.src}`}
        tags={project.stacks}
      />
      
      <BackButton>Back to Projects</BackButton>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left column (5/12) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-6 rounded-2xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                className="object-cover"
                priority
                placeholder="blur"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.stacks.map((stack, index) => {
                const techInfo = ALL_STACKS[stack];
                const Icon = techInfo?.Icon;
                const className = techInfo?.className || "text-neutral-400";
                
                return (
                  <MotionDiv
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-sm"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {Icon && <Icon className={className} size={16} aria-label={stack} />}
                    <span className="whitespace-nowrap">{stack}</span>
                  </MotionDiv>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {project.deployedURL && (
              <SmartLink 
                href={project.deployedURL} 
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <FaExternalLinkAlt size={14} />
                <span>View Live Site</span>
              </SmartLink>
            )}
            
            {project.isRepo && project.repoUrl && (
              <SmartLink 
                href={project.repoUrl} 
                className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
              >
                <FaGithub size={14} />
                <span>View Source Code</span>
              </SmartLink>
            )}
          </div>
        </div>
        
        {/* Right column (7/12) */}
        <div className="md:col-span-7 space-y-6">
          <div>
            <p className="text-sm text-neutral-400 mb-2">{project.tagline}</p>
            <h1 className="text-3xl font-bold mb-3">{project.title}</h1>
            <p className="text-sm text-neutral-500 mb-6">Last updated: {formattedDate}</p>
            
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className={typo({ variant: "paragraph" })}>{project.description}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Key Features</h2>
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800">
                  <p className="text-base">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
