import { Breadcrumb } from "~/components/shared";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface AdminAsyncStateProps {
  /** Breadcrumb trail rendered above the loading/error state. */
  breadcrumbs: BreadcrumbItem[];
  /** Message shown when the request fails. */
  errorMessage: string;
}

/**
 * Full-page loading spinner for admin pages, wrapped with the page breadcrumbs.
 */
export const AdminLoadingState = ({
  breadcrumbs,
}: Pick<AdminAsyncStateProps, "breadcrumbs">) => (
  <div className="space-y-8">
    <Breadcrumb items={breadcrumbs} />
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-muted-foreground/30"></div>
    </div>
  </div>
);

/**
 * Full-page error message for admin pages, wrapped with the page breadcrumbs.
 */
export const AdminErrorState = ({
  breadcrumbs,
  errorMessage,
}: AdminAsyncStateProps) => (
  <div className="space-y-8">
    <Breadcrumb items={breadcrumbs} />
    <div className="flex items-center justify-center min-h-[400px]">
      <p className="text-destructive">{errorMessage}</p>
    </div>
  </div>
);
