import { type ReactNode } from "react";
import { SkipContent } from "~/components/ui";

const ChangelogLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="changelog-surface relative min-h-dvh bg-background text-foreground">
      <SkipContent />

      {/* Fading grid — hero band only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(52vh,28rem)] [mask-image:linear-gradient(to_bottom,black_35%,transparent_100%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border) / 0.35) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border) / 0.35) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <main id="main-content" className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default ChangelogLayout;
