import { Breadcrumb, PageBanner, PageLoader } from "~/components/shared";

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
 * Full-page loading state for admin pages, wrapped with the page breadcrumbs.
 */
export const AdminLoadingState = ({
  breadcrumbs,
}: Pick<AdminAsyncStateProps, "breadcrumbs">) => (
  <div className="space-y-8">
    <PageBanner>
      <Breadcrumb
        items={breadcrumbs}
        align="center"
        className="relative z-[1] text-xs tracking-wide text-muted-foreground/60"
      />
    </PageBanner>
    <PageLoader minHeight="section" label="Loading admin" />
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
    <PageBanner>
      <Breadcrumb
        items={breadcrumbs}
        align="center"
        className="relative z-[1] text-xs tracking-wide text-muted-foreground/60"
      />
    </PageBanner>
    <div className="flex min-h-[400px] items-center justify-center">
      <p className="text-destructive">{errorMessage}</p>
    </div>
  </div>
);
