import { type Metadata } from "next";
import { ProjectList } from "~/components/features/project";
import { projects } from "~/data/projects";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { PageHeader } from "~/components/shared";
import config from "~/config";

export const metadata: Metadata = getSEOTags({
  title: "Projects",
  description:
    "Web apps, tools, and experiments — from AI products to infrastructure and open-source builds.",
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
    title: `Projects — ${config.appName}`,
    description:
      "Things I've built and shipped — from AI products to infrastructure and open-source builds.",
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

      <PageHeader
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
        ]}
        title={<>Things I&apos;ve Built</>}
        subtitle="From side projects to production. Each one taught me something."
      />

      <ProjectList projects={filteredProjects} metadata={false} />
    </div>
  );
};

export default ProjectsPage;
