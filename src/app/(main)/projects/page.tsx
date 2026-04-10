import { type Metadata } from "next";
import { ProjectList } from "~/components/features/project";
import { projects } from "~/data/projects";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { Breadcrumb } from "~/components/shared";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";
import config from "~/config";

export const metadata: Metadata = getSEOTags({
  title: "Projects",
  description: `Things I've built and shipped. From AI tools to production platforms, each project is a chapter in figuring out what I can make.`,
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
    description: `Production-grade projects built with React, Next.js, TypeScript, and a lot of late nights. Explore the work.`,
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
      <Breadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
        ]}
      />
      <div className="flex flex-col flex-wrap justify-between gap-4 sm:flex-row sm:items-center mt-4">
        <div className="space-y-1">
          <h1 className={cn(typo({ variant: "h2" }))}>
            Things I&apos;ve Built
          </h1>
          <p className={cn(typo({ variant: "paragraph", size: "sm" }))}>
            From side projects to production. Each one taught me something.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <ProjectList projects={filteredProjects} metadata={false} />
      </div>
    </div>
  );
};

export default ProjectsPage;
