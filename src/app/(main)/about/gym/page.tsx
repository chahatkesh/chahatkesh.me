import { type Metadata } from "next";
import config from "~/config";
import { Breadcrumb, MotionDiv } from "~/components/shared";
import { typo } from "~/components/ui";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import { cn } from "~/lib/utils";

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

      <Breadcrumb
        items={[
          { name: "Home", url: "/" },
          { name: "About Me", url: "/about" },
          { name: "Gym", url: "/about/gym" },
        ]}
      />

      <MotionDiv
        className="mt-4 space-y-1"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className={cn(typo({ variant: "h2" }))}>Gym</h1>
        <p
          className={cn(
            typo({ variant: "paragraph", size: "sm" }),
            "text-muted-foreground",
          )}
        >
          Training logs, routines, and lessons from consistency.
        </p>
      </MotionDiv>

      <section className="rounded-lg border border-border bg-card/50 p-6 sm:p-8">
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          This page is intentionally left blank for now. I will add my workout
          philosophy and training progression here.
        </p>
      </section>
    </div>
  );
}
