import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

interface DiagramCanvasProps {
  children: ReactNode;
  className?: string;
}

/**
 * Full-screen blank canvas for public diagram viewing routes.
 */
export function DiagramCanvas({ children, className }: DiagramCanvasProps) {
  return (
    <section
      className={cn(
        "relative min-h-dvh w-full overflow-hidden bg-background",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_hsl(var(--ring)/0.22)_1px,_transparent_1.2px)] bg-[length:24px_24px]" />

      <div className="relative z-10 flex min-h-dvh w-full items-stretch">
        {children}
      </div>
    </section>
  );
}
