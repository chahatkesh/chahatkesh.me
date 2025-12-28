import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import { experiences } from "~/data/experience";
import ExperienceDetailClient from "./page.client";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return experiences.map((exp) => ({
    slug: exp.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experience = experiences.find((exp) => exp.slug === slug);

  if (!experience) {
    return getSEOTags({
      title: "Experience Not Found",
      description: "The experience you're looking for doesn't exist.",
    });
  }

  return getSEOTags({
    title: `${experience.role} at ${experience.employer}`,
    description: experience.tagline,
    openGraph: {
      title: `${experience.role} - ${config.appName}`,
      description: experience.description,
    },
    canonicalUrlRelative: `/about/experience/${experience.slug}`,
  });
}

const ExperienceDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const experience = experiences.find((exp) => exp.slug === slug);

  if (!experience) {
    notFound();
  }

  return (
    <>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
        { name: "Experience", url: "/about/experience" },
        { name: experience.role, url: `/about/experience/${experience.slug}` },
      ])}
      <ExperienceDetailClient experience={experience} />
    </>
  );
};

export default ExperienceDetailPage;
