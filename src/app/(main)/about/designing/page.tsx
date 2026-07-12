import { type Metadata } from "next";
import config from "~/config";
import { Breadcrumb, MotionDiv } from "~/components/shared";
import { typo } from "~/components/ui";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { cn } from "~/lib/utils";

export const metadata: Metadata = getSEOTags({
  title: "Designing",
  description:
    "A future home for design explorations, UI studies, and visual thinking.",
  openGraph: {
    title: `Designing — ${config.appName}`,
    description: "Design explorations, UI studies, and visual thinking.",
  },
  canonicalUrlRelative: "/about/designing",
});

export default function DesigningPage() {
  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About Me", url: "/about" },
        { name: "Designing", url: "/about/designing" },
      ])}

      <Breadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "About Me", url: "/about" },
          { name: "Designing", url: "/about/designing" },
        ]}
      />

      <MotionDiv
        className="mt-4 space-y-1"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className={cn(typo({ variant: "h2" }))}>Designing</h1>
        <p
          className={cn(
            typo({ variant: "paragraph", size: "sm" }),
            "text-muted-foreground",
          )}
        >
          Design explorations, UI studies, and visual thinking.
        </p>
      </MotionDiv>

      <section className="rounded-lg border border-border bg-card/50 p-6 sm:p-8">
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          This page is intentionally left blank for now. I will publish design
          breakdowns, process notes, and experiments here.
        </p>
      </section>
    </div>
  );
}
