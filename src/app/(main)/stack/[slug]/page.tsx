import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader, MotionDiv } from "~/components/shared";
import { ProjectList } from "~/components/features/project";
import {
  RelatedStacks,
  StackExperienceList,
} from "~/components/features/stack";
import { clipAtWord, STACK_TEXT_LIMITS } from "~/lib/page-header-subtitle";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import {
  getAllStacks,
  getRelatedStacks,
  getStackBySlug,
  getStackCategoryLabel,
  getStackUsage,
  sortProjectsForStack,
} from "~/lib/stack-utils";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const stack = getStackBySlug(slug);

  if (!stack) {
    return getSEOTags({
      title: "Stack Not Found",
      description: "The requested stack could not be found.",
    });
  }

  const description = clipAtWord(
    stack.description,
    STACK_TEXT_LIMITS.metaDescription,
  );

  return getSEOTags({
    title: stack.name,
    description,
    canonicalUrlRelative: `/stack/${stack.slug}`,
    keywords: [
      stack.name,
      "Tech Stack",
      "Portfolio",
      getStackCategoryLabel(stack.category),
    ],
    openGraph: {
      title: `${stack.name} — Stack`,
      description,
    },
  });
}

export async function generateStaticParams() {
  return getAllStacks().map((stack) => ({
    slug: stack.slug,
  }));
}

export default async function StackDetailPage({ params }: Props) {
  const { slug } = await params;
  const stack = getStackBySlug(slug);

  if (!stack) {
    notFound();
  }

  const usage = getStackUsage(stack.name);
  const sortedProjects = sortProjectsForStack(usage.projects);
  const relatedStacks = getRelatedStacks(stack.name);
  const Icon = stack.Icon;

  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Stack", url: "/stack" },
        { name: stack.name, url: `/stack/${stack.slug}` },
      ])}

      <PageHeader
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Stack", url: "/stack" },
          { name: stack.name, url: `/stack/${stack.slug}` },
        ]}
        title={stack.name}
        subtitle={stack.subtitle}
      />

      <MotionDiv
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex justify-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-border bg-muted/50">
          <Icon className={stack.className} size={40} aria-hidden />
        </div>
      </MotionDiv>

      {usage.projectCount > 0 ? (
        <section className="space-y-4">
          <h2 className="font-ubuntu text-xl font-medium text-foreground">
            Projects
          </h2>
          <ProjectList projects={sortedProjects} />
        </section>
      ) : null}

      {usage.experienceCount > 0 ? (
        <section className="space-y-4">
          <h2 className="font-ubuntu text-xl font-medium text-foreground">
            Experience
          </h2>
          <StackExperienceList experiences={usage.experiences} />
        </section>
      ) : null}

      {usage.totalUsage === 0 ? (
        <p className="text-sm text-muted-foreground/80">
          In my toolkit, but not on a public project or role page yet.
        </p>
      ) : null}

      <RelatedStacks stacks={relatedStacks} />
    </div>
  );
}
