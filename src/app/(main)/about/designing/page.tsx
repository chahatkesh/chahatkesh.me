import { type Metadata } from "next";
import config from "~/config";
import { PageHeader } from "~/components/shared";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";

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

      <PageHeader
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About Me", url: "/about" },
          { name: "Designing", url: "/about/designing" },
        ]}
        title="Designing"
        subtitle="Design explorations, UI studies, and visual thinking."
      />

      <section className="rounded-lg border border-border bg-card/50 p-6 sm:p-8">
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          This page is intentionally left blank for now. I will publish design
          breakdowns, process notes, and experiments here.
        </p>
      </section>
    </div>
  );
}
