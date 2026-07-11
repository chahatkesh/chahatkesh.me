import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import dbConnect from "~/lib/mongodb";
import Gist from "~/models/gist";
import { getSEOTags } from "~/lib/seo";
import { MarkdownRenderer } from "~/components/features/gist";
import { getGistSharePath, markdownToSnippet } from "~/lib/gist-utils";
import config from "~/config";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

type GistLean = {
  title: string;
  slug: string;
  markdownContent: string;
  updatedAt: string;
};

export const dynamic = "force-dynamic";

async function getGistBySlug(slug: string): Promise<GistLean | null> {
  await dbConnect();
  return Gist.findOne({ slug }).lean<GistLean>();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const gist = await getGistBySlug(slug);

  if (!gist) {
    return getSEOTags({
      title: "Document not found",
      description: "The requested markdown document could not be found.",
      noIndex: true,
    });
  }

  const description = markdownToSnippet(gist.markdownContent);

  return getSEOTags({
    title: gist.title,
    description,
    canonicalUrlRelative: getGistSharePath(gist.slug),
    noIndex: true,
    openGraph: {
      title: `${gist.title} — Gist`,
      description,
    },
  });
}

export default async function SharedGistPage({ params }: Params) {
  const { slug } = await params;
  const gist = await getGistBySlug(slug);

  if (!gist) {
    notFound();
  }

  return (
    <main className="min-h-dvh bg-background px-4 py-10 sm:px-6 sm:py-12">
      <article className="mx-auto w-full max-w-4xl space-y-6">
        <header className="space-y-1 border-b border-border pb-5">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {gist.title}
          </h1>
          <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
            by{" "}
            <Link
              href="/"
              className="text-ring no-underline transition-colors hover:text-ring/80"
            >
              {config.author.name}
            </Link>
          </p>
        </header>

        <MarkdownRenderer
          content={gist.markdownContent}
          className="border-none bg-transparent p-0"
          emptyMessage="This document has no content."
        />
      </article>
    </main>
  );
}
