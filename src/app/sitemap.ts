import { type MetadataRoute } from "next";
import config from "~/config";
import { projects } from "~/data/projects";
import { experiences } from "~/data/experience";
import { youtubeVideos } from "~/data/youtube";
import { monthlyChangelog } from "~/data/changelog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${config.domainName}`;

  // Derive honest "last modified" dates from real content so the signal is
  // truthful rather than reporting "now" on every build.
  const latestOf = (dates: string[], fallback: string) =>
    dates.length
      ? dates.reduce((a, b) => (new Date(a) > new Date(b) ? a : b))
      : fallback;

  const siteCreationDate = new Date(config.seo.siteCreationDate).toISOString();

  const projectsLastModified = latestOf(
    projects.map((p) => p.dateModified || p.datePublished),
    siteCreationDate,
  );
  const videosLastModified = latestOf(
    youtubeVideos.map((v) => v.publishedAt),
    siteCreationDate,
  );
  const changelogLastModified = latestOf(
    monthlyChangelog.map((entry) => `${entry.month}-01`),
    siteCreationDate,
  );

  // Static pages with comprehensive metadata
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
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
      url: `${baseUrl}/about/journey/btech`,
      lastModified: siteCreationDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about/site`,
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
    lastModified: video.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...experiencePages, ...videoPages];
}
