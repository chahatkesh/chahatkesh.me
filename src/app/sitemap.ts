import { type MetadataRoute } from "next";
import config from "~/config";
import { projects } from "~/data/projects";
import { experiences } from "~/data/experience";
import { youtubeVideos } from "~/data/youtube";
import { monthlyChangelog } from "~/data/changelog";
import { getWritingEntries } from "~/lib/writing";
import { getAllStacks } from "~/lib/stack-utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://${config.domainName}`;
  const writingEntries = await getWritingEntries();

  // Derive honest "last modified" dates from real content so the signal is
  // truthful rather than reporting "now" on every build.
  const latestOf = (dates: string[], fallback: string) =>
    dates.length
      ? dates.reduce((a, b) => (new Date(a) > new Date(b) ? a : b))
      : fallback;

  const siteCreationDate = new Date(config.seo.siteCreationDate).toISOString();

  // Normalize every "last modified" to a full ISO timestamp so the sitemap
  // emits a single, consistent date format across hub and detail pages.
  const projectsLastModified = new Date(
    latestOf(
      projects.map((p) => p.dateModified || p.datePublished),
      siteCreationDate,
    ),
  ).toISOString();
  const videosLastModified = new Date(
    latestOf(
      youtubeVideos.map((v) => v.publishedAt),
      siteCreationDate,
    ),
  ).toISOString();
  const changelogLastModified = new Date(
    latestOf(
      monthlyChangelog.map((entry) => `${entry.month}-01`),
      siteCreationDate,
    ),
  ).toISOString();
  const writingLastModified = new Date(
    latestOf(
      writingEntries.map((entry) => entry.updated ?? entry.date),
      siteCreationDate,
    ),
  ).toISOString();

  // Static pages with comprehensive metadata
  const staticPages: MetadataRoute.Sitemap = [
    {
      // Trailing slash to exactly match the homepage canonical / JSON-LD URL.
      url: `${baseUrl}/`,
      lastModified: projectsLastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: siteCreationDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: projectsLastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/stack`,
      lastModified: projectsLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/timeline`,
      lastModified: projectsLastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/experience`,
      lastModified: siteCreationDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about/journey`,
      lastModified: siteCreationDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: siteCreationDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: videosLastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified: changelogLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/links`,
      lastModified: siteCreationDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/places`,
      lastModified: siteCreationDate,
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${baseUrl}/about/writing`,
      lastModified: writingLastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about/gym`,
      lastModified: siteCreationDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about/designing`,
      lastModified: siteCreationDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about/journey/btech`,
      lastModified: siteCreationDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/site`,
      lastModified: siteCreationDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Dynamic project pages
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(
      project.dateModified || project.datePublished,
    ).toISOString(),
    changeFrequency: "monthly" as const,
    priority: project.isFeatured ? 0.8 : 0.6,
  }));

  // Dynamic experience pages
  const experiencePages: MetadataRoute.Sitemap = experiences.map(
    (experience) => ({
      url: `${baseUrl}/about/experience/${experience.slug}`,
      lastModified: siteCreationDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  // Dynamic video pages
  const videoPages: MetadataRoute.Sitemap = youtubeVideos.map((video) => ({
    url: `${baseUrl}/videos/${video.slug}`,
    lastModified: new Date(video.publishedAt).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic changelog month pages
  const changelogPages: MetadataRoute.Sitemap = monthlyChangelog.map(
    (entry) => ({
      url: `${baseUrl}/changelog/${entry.month}`,
      lastModified: new Date(`${entry.month}-01`).toISOString(),
      changeFrequency: "yearly" as const,
      priority: 0.4,
    }),
  );

  const writingPages: MetadataRoute.Sitemap = writingEntries.map((entry) => ({
    url: `${baseUrl}/about/writing/${entry.slug}`,
    lastModified: new Date(entry.updated ?? entry.date).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  const stackPages: MetadataRoute.Sitemap = getAllStacks().map((stack) => ({
    url: `${baseUrl}/stack/${stack.slug}`,
    lastModified: projectsLastModified,
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  return [
    ...staticPages,
    ...projectPages,
    ...experiencePages,
    ...videoPages,
    ...changelogPages,
    ...writingPages,
    ...stackPages,
  ];
}
