import { type Metadata } from "next";
import config from "~/config";
import { PageHeader } from "~/components/shared";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";

export const metadata: Metadata = getSEOTags({
  title: "Gym",
  description:
    "A future page for training logs, routines, and lessons from consistency.",
  openGraph: {
    title: `Gym — ${config.appName}`,
    description: "Training logs, routines, and lessons from consistency.",
  },
  canonicalUrlRelative: "/about/gym",
});

export default function GymPage() {
  return (
    <div className="space-y-8">
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About Me", url: "/about" },
        { name: "Gym", url: "/about/gym" },
      ])}

      <PageHeader
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About Me", url: "/about" },
          { name: "Gym", url: "/about/gym" },
        ]}
        title="Gym"
        subtitle="Training logs, routines, and lessons from consistency."
      />

      <section className="rounded-lg border border-border bg-card/50 p-6 sm:p-8">
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          This page is intentionally left blank for now. I will add my workout
          philosophy and training progression here.
        </p>
      </section>
    </div>
  );
}
