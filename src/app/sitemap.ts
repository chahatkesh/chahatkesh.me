import { type MetadataRoute } from "next";
import config from "~/config";
import { projects } from "~/data/projects";
import { experiences } from "~/data/experience";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${config.domainName}`;
  const currentDate = new Date().toISOString();

  // Static pages with comprehensive metadata
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/about/experience`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about/journey`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/links`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about/journey/btech`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about/site`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Dynamic project pages
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.dateModified || project.datePublished,
    changeFrequency: "monthly" as const,
    priority: project.isFeatured ? 0.8 : 0.6,
  }));

  // Dynamic experience pages
  const experiencePages: MetadataRoute.Sitemap = experiences.map(
    (experience) => ({
      url: `${baseUrl}/about/experience/${experience.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  return [...staticPages, ...projectPages, ...experiencePages];
}
