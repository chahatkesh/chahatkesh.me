import { MotionDiv, Breadcrumb } from "~/components/shared";
import { typo } from "~/components/ui";
import { cn } from "~/lib/utils";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface AdminPageHeaderProps {
  /** Breadcrumb trail rendered above the title. */
  breadcrumbs: BreadcrumbItem[];
  /** Main page title. */
  title: string;
  /** Supporting description shown below the title. */
  subtitle: string;
}

/**
 * Shared admin page header: a breadcrumb trail followed by an animated
 * title/subtitle block. Used across the admin files, gallery, and experience
 * pages to keep their headings consistent.
 */
export const AdminPageHeader = ({
  breadcrumbs,
  title,
  subtitle,
}: AdminPageHeaderProps) => (
  <>
    <Breadcrumb items={breadcrumbs} />

    <MotionDiv
      className="space-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className={cn(typo({ variant: "h2" }), "text-3xl")}>{title}</h1>
      <p className={cn(typo({ variant: "paragraph" }))}>{subtitle}</p>
    </MotionDiv>
  </>
);
