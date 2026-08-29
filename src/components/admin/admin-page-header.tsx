import { PageHeader } from "~/components/shared";

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
 * Shared admin page header — same spacing as public PageHeader,
 * with a slightly larger title for denser admin layouts.
 */
export const AdminPageHeader = ({
  breadcrumbs,
  title,
  subtitle,
}: AdminPageHeaderProps) => (
  <PageHeader
    breadcrumbs={breadcrumbs}
    title={title}
    subtitle={subtitle}
    titleClassName="text-3xl sm:text-4xl"
  />
);
