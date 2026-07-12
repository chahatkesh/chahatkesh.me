import { type Metadata } from "next";
import config from "~/config";
import { Breadcrumb, MotionDiv } from "~/components/shared";
import { typo } from "~/components/ui";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { cn } from "~/lib/utils";

export const metadata: Metadata = getSEOTags({
  title: "Reading",
  description:
    "A space for books, notes, and reading takeaways I want to publish soon.",
  openGraph: {
    title: `Reading — ${config.appName}`,
    description: "Books, notes, and reading takeaways.",
  },
  canonicalUrlRelative: "/about/reading",
});

export default function ReadingPage() {
  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About Me", url: "/about" },
        { name: "Reading", url: "/about/reading" },
      ])}

      <Breadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "About Me", url: "/about" },
          { name: "Reading", url: "/about/reading" },
        ]}
      />

      <MotionDiv
        className="mt-4 space-y-1"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className={cn(typo({ variant: "h2" }))}>Reading</h1>
        <p
          className={cn(
            typo({ variant: "paragraph", size: "sm" }),
            "text-muted-foreground",
          )}
        >
          Books, notes, and reflections I want to share soon.
        </p>
      </MotionDiv>

      <section className="rounded-lg border border-border bg-card/50 p-6 sm:p-8">
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          This page is intentionally left blank for now. I will be sharing my
          reading list, highlights, and notes here.
        </p>
      </section>
    </div>
  );
}
