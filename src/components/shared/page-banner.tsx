import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

interface PageBannerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Full-bleed premium header shell with mini-grid background.
 * Breaks out of the centered container while keeping inner content aligned.
 */
const PageBanner = ({ children, className }: PageBannerProps) => {
  return (
    <div
      className={cn(
        "page-banner-grid relative mb-4 w-[100vw] max-w-[100vw] -ml-[calc(50vw-50%)]",
        className,
      )}
    >
      <div className="relative z-[1] mx-auto flex w-full max-w-[57rem] flex-col items-center px-4 py-8 text-center sm:py-10">
        {children}
      </div>
    </div>
  );
};

export default PageBanner;
