import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

interface PageBannerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Full-bleed premium header shell with mini-grid background.
 * Breaks out of the centered container while keeping inner content aligned.
 * Pulls under the sticky nav so the grid reads as one continuous hero surface.
 */
const PageBanner = ({ children, className }: PageBannerProps) => {
  return (
    <div
      className={cn(
        "page-banner-grid relative -mt-[var(--header-height)] mb-4 w-[100vw] max-w-[100vw] -ml-[calc(50vw-50%)] pt-[var(--header-height)]",
        className,
      )}
    >
      <div className="relative z-[1] mx-auto flex w-full max-w-[57rem] flex-col items-center px-4 pb-8 pt-4 text-center sm:pb-10 sm:pt-6">
        {children}
      </div>
    </div>
  );
};

export default PageBanner;
