import { type Metadata } from "next";
import { notFound } from "next/navigation";
import dbConnect from "~/lib/mongodb";
import Diagram from "~/models/diagram";
import { getSEOTags } from "~/lib/seo";
import {
  DiagramCanvas,
  ZoomableDiagramView,
} from "~/components/features/diagram";
import { getDiagramSharePath } from "~/lib/diagram-utils";
import config from "~/config";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

type DiagramLean = {
  title: string;
  slug: string;
  mermaidCode: string;
};

export const dynamic = "force-dynamic";

async function getDiagramBySlug(slug: string): Promise<DiagramLean | null> {
  await dbConnect();
  return Diagram.findOne({ slug }).lean<DiagramLean>();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const diagram = await getDiagramBySlug(slug);

  if (!diagram) {
    return getSEOTags({
      title: "Diagram not found",
      description: "The requested Mermaid diagram page could not be found.",
      noIndex: true,
    });
  }

  return getSEOTags({
    title: diagram.title,
    description: `${diagram.title} — interactive Mermaid diagram from chahatkesh.me`,
    canonicalUrlRelative: getDiagramSharePath(diagram.slug),
    noIndex: true,
    openGraph: {
      title: `${diagram.title} — Diagram`,
      description: `${diagram.title} — interactive Mermaid diagram from chahatkesh.me`,
    },
  });
}

export default async function DiagramSharePage({ params }: Params) {
  const { slug } = await params;
  const diagram = await getDiagramBySlug(slug);

  if (!diagram) {
    notFound();
  }

  return (
    <DiagramCanvas>
      <h1 className="sr-only">{diagram.title}</h1>
      <ZoomableDiagramView
        title={diagram.title}
        mermaidCode={diagram.mermaidCode}
        authorName={config.author.name}
        authorUrl={"/"}
      />
    </DiagramCanvas>
  );
}
