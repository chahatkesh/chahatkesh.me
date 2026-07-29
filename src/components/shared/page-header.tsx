import { type ReactNode } from "react";
import Breadcrumb, { type BreadcrumbItem } from "./breadcrumb";
import { MotionDiv } from "./motion-wrapper";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title: ReactNode;
  subtitle?: ReactNode;
  /** Extra classes on the h1 (e.g. admin `text-3xl`). */
  titleClassName?: string;
  className?: string;
}

/**
 * Canonical page header: breadcrumb + title sit as one tight unit
 * (`space-y-2` ≈ 8px). Parent `space-y-8` then separates header from content.
 */
const PageHeader = ({
  breadcrumbs,
  title,
  subtitle,
  titleClassName,
  className,
}: PageHeaderProps) => {
  return (
    <header className={cn("space-y-2", className)}>
      <Breadcrumb items={breadcrumbs} />

      <MotionDiv
        className="space-y-1"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className={cn(typo({ variant: "h2" }), titleClassName)}>{title}</h1>
        {subtitle ? (
          <div className={cn(typo({ variant: "paragraph" }))}>{subtitle}</div>
        ) : null}
      </MotionDiv>
    </header>
  );
};

export default PageHeader;
