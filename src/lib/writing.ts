import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { cache, type ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import config from "~/config";
import { writingMdxComponents } from "~/components/features/writing/mdx-components";

const WRITING_DIRECTORY = path.join(process.cwd(), "src/content/writing");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const frontmatterSchema = z.object({
  /** Header + card title. Keep to ~2 lines in the page banner (≤48). */
  title: z.string().min(1).max(48),
  /** Header subtitle. Must fit the banner without clipping (≤72). */
  subtitle: z.string().min(1).max(72),
  /** SEO / Open Graph description. */
  description: z.string().min(1).max(160),
  date: z.iso.date(),
  updated: z.iso.date().optional(),
  tags: z.array(z.string().min(1)).default([]),
  draft: z.boolean().default(false),
});

export type WritingFrontmatter = z.infer<typeof frontmatterSchema>;

export interface WritingEntry extends WritingFrontmatter {
  slug: string;
  readingTime: number;
  content: ReactElement;
  /** LLM-oriented markdown: frontmatter as metadata, MDX components unwrapped. */
  markdown: string;
}

function calculateReadingTime(source: string) {
  const content = source.replace(/^---[\s\S]*?---/, "");
  const words = content
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_#[\]()>-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

function attrValue(attrs: string, name: string) {
  return (
    new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`).exec(attrs)?.[1] ??
    new RegExp(`\\b${name}\\s*=\\s*'([^']*)'`).exec(attrs)?.[1]
  );
}

function unwrapMdxComponents(body: string) {
  return body
    .replace(
      /<WritingMermaid\b([^>]*)>([\s\S]*?)<\/WritingMermaid>/g,
      (_match, attrs: string, inner: string) => {
        const title = attrValue(attrs, "title");
        const caption = attrValue(attrs, "caption");
        const fenced = /```(?:mermaid)?\s*\n([\s\S]*?)```/.exec(inner);
        const code = (fenced?.[1] ?? inner).trim();
        const heading = title ? `**${title}**\n\n` : "";
        const note = caption ? `\n\n_${caption}_` : "";
        return `${heading}\`\`\`mermaid\n${code}\n\`\`\`${note}`;
      },
    )
    .replace(
      /<Callout\b([^>]*)>([\s\S]*?)<\/Callout>/g,
      (_match, attrs: string, inner: string) => {
        const title = attrValue(attrs, "title");
        const text = inner.replace(/^\s+/gm, "").trim();
        const quoted = (title ? `**${title}**\n\n${text}` : text)
          .split("\n")
          .map((line) => `> ${line}`)
          .join("\n");
        return quoted;
      },
    )
    .replace(
      /<Details\b([^>]*)>([\s\S]*?)<\/Details>/g,
      (_match, attrs: string, inner: string) => {
        const summary = attrValue(attrs, "summary") ?? "Details";
        return `**${summary}**\n\n${inner.trim()}`;
      },
    )
    .replace(
      /<BackendRoadmap\s*\/>/g,
      "_Interactive backend roadmap — open the HTML page to explore it._",
    )
    .replace(
      /<FolderStructures\s*\/>/g,
      "_Interactive folder-structure diagrams — open the HTML page to explore them._",
    )
    .replace(/<\/?[A-Z][A-Za-z0-9]*\b[^>]*\/?>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function writingToMarkdown(
  slug: string,
  frontmatter: WritingFrontmatter,
  source: string,
) {
  const body = unwrapMdxComponents(
    source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, ""),
  );
  const canonical = `https://${config.domainName}/about/writing/${slug}`;

  return [
    `# ${frontmatter.title}`,
    "",
    `> ${frontmatter.subtitle}`,
    "",
    frontmatter.description,
    "",
    `- Canonical: ${canonical}`,
    `- Markdown: ${canonical}.md`,
    `- Date: ${frontmatter.date}`,
    frontmatter.updated ? `- Updated: ${frontmatter.updated}` : null,
    `- Tags: ${frontmatter.tags.join(", ")}`,
    "",
    body,
    "",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

export const LLM_MARKDOWN_HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  "Cache-Control":
    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
} as const;

async function readWritingSource(slug: string) {
  if (!SLUG_PATTERN.test(slug)) return null;

  try {
    return await fs.readFile(
      path.join(WRITING_DIRECTORY, `${slug}.mdx`),
      "utf8",
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export const getWritingEntry = cache(
  async (slug: string): Promise<WritingEntry | null> => {
    const source = await readWritingSource(slug);
    if (!source) return null;

    const { content, frontmatter } = await compileMDX({
      source,
      components: writingMdxComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight],
        },
      },
    });
    const parsedFrontmatter = frontmatterSchema.safeParse(frontmatter);

    if (!parsedFrontmatter.success) {
      throw new Error(
        `Invalid frontmatter in ${slug}.mdx: ${parsedFrontmatter.error.message}`,
      );
    }

    return {
      slug,
      ...parsedFrontmatter.data,
      readingTime: calculateReadingTime(source),
      content,
      markdown: writingToMarkdown(slug, parsedFrontmatter.data, source),
    };
  },
);

export const getWritingEntries = cache(async () => {
  let files: string[];

  try {
    files = await fs.readdir(WRITING_DIRECTORY);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
      .map((file) => getWritingEntry(file.replace(/\.mdx$/, ""))),
  );

  return entries
    .filter((entry): entry is WritingEntry => Boolean(entry && !entry.draft))
    .sort((a, b) => b.date.localeCompare(a.date));
});
