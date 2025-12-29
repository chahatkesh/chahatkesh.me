import { Metadata } from "next";
import { ProjectList, projects } from "~/components/features/project";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { BackButton } from "~/components/shared";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
import config from "~/config";

export const metadata: Metadata = getSEOTags({
  title: "Projects",
  description: `Explore ${config.appName}'s portfolio of projects. Browse through web applications, tools, and software solutions built using modern technologies.`,
  canonicalUrlRelative: "/projects",
  keywords: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Web Development",
    "Portfolio Projects",
    "Software Engineering",
  ],
  openGraph: {
    title: `Projects by ${config.appName}`,
    description: `Explore my portfolio of projects and case studies. See examples of my work as a ${config.appDesignation} using React, Next.js, and other modern technologies.`,
  },
});

const ProjectsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) => {
  const params = await searchParams;
  const filteredProjects = projects
    .filter((project) =>
      project.title
        .toLowerCase()
        .includes(decodeURIComponent(params.search || "").toLowerCase()),
    )
    .sort((a, b) => {
      // First, sort by featured status (featured projects on top)
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;

      // Then sort by published date (newest first)
      return (
        new Date(b.datePublished).getTime() -
        new Date(a.datePublished).getTime()
      );
    });

  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Projects", url: "/projects" },
      ])}
      <BackButton>Back</BackButton>
      <div className="flex flex-col flex-wrap justify-between gap-4 sm:flex-row sm:items-center mt-4">
        <h1 className={cn(typo({ variant: "h2" }))}>All Projects</h1>
      </div>

      <div className="mt-6">
        <ProjectList projects={filteredProjects} metadata={false} />
      </div>
    </div>
  );
};

export default ProjectsPage;
