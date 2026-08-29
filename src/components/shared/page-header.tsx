import { type ReactNode } from "react";
import Breadcrumb, { type BreadcrumbItem } from "./breadcrumb";
import PageBanner from "./page-banner";
import { MotionDiv } from "./motion-wrapper";
import { cn } from "~/lib/utils";

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title: ReactNode;
  subtitle: ReactNode;
  /** Extra classes on the h1 (e.g. admin `text-3xl`). */
  titleClassName?: string;
  className?: string;
}

/**
 * Canonical page header: centered title + subtitle on grid banner,
 * breadcrumb below subtitle. `!mt-0` cancels parent `space-y-8` when a
 * JSON-LD script is the preceding sibling.
 */
const PageHeader = ({
  breadcrumbs,
  title,
  subtitle,
  titleClassName,
  className,
}: PageHeaderProps) => {
  return (
    <header className={cn("!mt-0 mb-2", className)}>
      <PageBanner>
        <MotionDiv
          className="flex w-full flex-col items-center space-y-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1
            className={cn(
              "font-ubuntu text-2xl font-semibold text-foreground sm:text-3xl",
              titleClassName,
            )}
          >
            {title}
          </h1>
          <div className="w-full max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground/80 sm:text-base">
            {subtitle}
          </div>
        </MotionDiv>

        <Breadcrumb
          items={breadcrumbs}
          align="center"
          className="relative z-[1] mt-4 text-xs tracking-wide text-muted-foreground/60"
        />
      </PageBanner>
    </header>
  );
};

export default PageHeader;
