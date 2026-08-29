import { NextResponse } from "next/server";
import config from "~/config";
import { projects } from "~/data/projects";
import { LLM_MARKDOWN_HEADERS, getWritingEntries } from "~/lib/writing";

export const dynamic = "force-static";

export async function GET() {
  const base = `https://${config.domainName}`;
  const writing = await getWritingEntries();
  const featuredProjects = projects.filter((project) => project.isFeatured);

  const writingLinks = writing
    .map(
      (entry) =>
        `- [${entry.title}](${base}/about/writing/${entry.slug}.md): ${entry.description}`,
    )
    .join("\n");

  const projectLinks = featuredProjects
    .map(
      (project) =>
        `- [${project.title}](${base}/projects/${project.slug}): ${project.tagline ?? project.task}`,
    )
    .join("\n");

  const body = `# ${config.appName}

> ${config.seo.defaultDescription}

${config.appDescription}

Prefer the Markdown versions of writing. HTML pages are for humans; \`.md\` files are the source of truth for language models.

## Writing

${writingLinks}

## Projects

- [All projects](${base}/projects): Catalog with case studies
${projectLinks}

## Optional

- [All writing, one file](${base}/llms-full.txt): Every essay concatenated as Markdown
- [Writing index](${base}/about/writing): HTML listing of essays
- [About](${base}/about): Bio, stack, and how to reach me
- [Experience](${base}/about/experience): Roles and what I actually shipped
- [Stack](${base}/stack): Tools I use and why
- [This site](${base}/site): How the portfolio itself is built
`;

  return new NextResponse(body, { headers: LLM_MARKDOWN_HEADERS });
}
