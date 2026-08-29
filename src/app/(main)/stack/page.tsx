import { type Metadata } from "next";
import { PageHeader } from "~/components/shared";
import { StackGroupList } from "~/components/features/stack";
import { ContentNotFound } from "~/components/ui";
import config from "~/config";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import {
  STACK_CATEGORIES,
  filterStacksBySearch,
  getAllStacks,
  sortStacksByUsage,
} from "~/lib/stack-utils";

export const metadata: Metadata = getSEOTags({
  title: "Stack",
  description:
    "The languages, frameworks, and tools behind my projects and roles — each with context on how I use them.",
  canonicalUrlRelative: "/stack",
  keywords: [
    "Tech Stack",
    "TypeScript",
    "React",
    "Next.js",
    "Full Stack",
    "Portfolio",
  ],
  openGraph: {
    title: `What I Build With — ${config.appName}`,
    description:
      "Explore the toolkit behind my projects and experience — from frontend to backend and AI.",
  },
});

const StackPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) => {
  const params = await searchParams;
  const query = decodeURIComponent(params.search || "");
  const filteredStacks = filterStacksBySearch(getAllStacks(), query);
  const hasResults = filteredStacks.length > 0;

  const groupedStacks = STACK_CATEGORIES.map((category) => ({
    ...category,
    stacks: sortStacksByUsage(
      filteredStacks.filter((stack) => stack.category === category.id),
    ),
  })).filter((group) => group.stacks.length > 0);

  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Stack", url: "/stack" },
      ])}

      <PageHeader
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Stack", url: "/stack" },
        ]}
        title="What I Build With"
        subtitle="The toolkit behind my projects and roles, click any stack to see where it shows up in my work."
      />

      {hasResults ? (
        <div className="space-y-10">
          {groupedStacks.map((group) => (
            <StackGroupList
              key={group.id}
              title={group.label}
              stacks={group.stacks}
            />
          ))}
        </div>
      ) : (
        <ContentNotFound text="No stacks match your search" />
      )}
    </div>
  );
};

export default StackPage;
