import { FeatureCard, typo } from "~/components/ui";
import { RevealSection } from "~/components/shared";
import { cn } from "~/lib/utils";
import { hobbies } from "~/data/about";

type OutsideTheScreenProps = {
  /** Full copy for About; compact labels for Home. Same board, different density. */
  variant?: "full" | "minimal";
};

const OutsideTheScreen = ({ variant = "full" }: OutsideTheScreenProps) => {
  const isMinimal = variant === "minimal";

  return (
    <section
      id="outside-the-screen"
      aria-label="Outside the Screen"
      className={cn(isMinimal ? "space-y-5" : "mt-10 space-y-6")}
    >
      <h2 className={typo({ variant: "h2" })}>Outside the Screen</h2>

      <RevealSection delay={0.08}>
        {/* Cell borders instead of divide-* so wrapping rows don't double the outer edge. */}
        <ul
          role="list"
          className={cn(
            "grid overflow-hidden rounded-xl border border-dashed border-border",
            "[&>li]:border-dashed [&>li]:border-border",
            isMinimal
              ? [
                  "grid-cols-2 sm:grid-cols-4",
                  "[&>li]:border-b [&>li]:border-r",
                  "[&>li:nth-child(2n)]:border-r-0 sm:[&>li:nth-child(2n)]:border-r",
                  "sm:[&>li:nth-child(4n)]:border-r-0",
                  "[&>li:nth-last-child(-n+2)]:border-b-0 sm:[&>li]:border-b-0",
                ]
              : [
                  "grid-cols-1 sm:grid-cols-2",
                  "[&>li]:border-b sm:[&>li]:border-r",
                  "sm:[&>li:nth-child(2n)]:border-r-0",
                  "[&>li:last-child]:border-b-0 sm:[&>li:nth-last-child(-n+2)]:border-b-0",
                ],
          )}
        >
          {hobbies.map((hobby) => (
            <li key={hobby.title} role="listitem" className="min-w-0">
              <FeatureCard
                href={hobby.href}
                compact={isMinimal}
                feature={{
                  title: hobby.title,
                  icon: hobby.icon,
                  description: isMinimal ? hobby.label : hobby.description,
                }}
              />
            </li>
          ))}
        </ul>
      </RevealSection>
    </section>
  );
};

export default OutsideTheScreen;
