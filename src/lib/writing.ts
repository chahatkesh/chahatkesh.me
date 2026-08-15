import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { cache, type ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { z } from "zod";
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
