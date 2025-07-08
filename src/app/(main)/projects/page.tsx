import { ProjectList, projects } from "~/components/project";
import { getSEOTags } from "~/lib/seo";
import BackButton from "~/components/back-btn";

export const metadata: ReturnType<typeof getSEOTags> = getSEOTags({
  title: `Projects | Chahat Kesharwani`,
  description:
    "Explore a digital garden of my projects, where I showcase insights on shipping exceptional products, advancing as a developer, and thriving in the tech industry",
  canonicalUrlRelative: "/projects",
  keywords: ["JavaScript", "TypeScript", "React", "Testing", "Career", "Software Development"],
});

const ProjectsPage = ({ searchParams }: { searchParams: { search: string | undefined } }) => {
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(decodeURIComponent(searchParams.search || ""))
  );

  return (
    <div className="space-y-8">
      <BackButton>Back</BackButton>
      <div className="flex flex-col flex-wrap justify-between gap-4 sm:flex-row sm:items-center mt-4">
        <h1 className="text-left text-xl font-medium"> All Projects </h1>
      </div>

      <div className="mt-6">
        <ProjectList projects={filteredProjects} metadata={false} />
      </div>
    </div>
  );
};

export default ProjectsPage;
