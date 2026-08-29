import { type Metadata } from "next";
import config from "~/config";
import { GymDashboard } from "~/components/features/gym";
import { PageHeader } from "~/components/shared";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";

export const metadata: Metadata = getSEOTags({
  title: "Gym",
  description:
    "Training logs, muscle group balance, and lessons from consistency.",
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
        title="In the Gym"
        subtitle="Training logs, routines, and what consistency taught me."
      />

      <GymDashboard />
    </div>
  );
}
