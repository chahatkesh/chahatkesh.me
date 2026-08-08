import { type ReactNode } from "react";
import { type Metadata } from "next";
import { AdminNavbar } from "~/components/admin";
import { SkipContent } from "~/components/ui";
import { getSession } from "~/lib/auth";

// Admin must always reflect the latest writes — never serve a static shell.
export const dynamic = "force-dynamic";

// Keep the entire admin area out of search indexes regardless of robots.txt.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getSession();

  // Login (unauthenticated): no navbar or footer — full viewport shell
  if (!session) {
    return (
      <div className="relative flex h-dvh flex-col">
        <SkipContent />
        {children}
      </div>
    );
  }

  // Match public layout: no space-y between nav and main — AdminPageHeader
  // banner owns the top gap (same as public PageHeader).
  return (
    <div className="container relative flex min-h-dvh flex-col py-2">
      <div className="flex flex-1 flex-col">
        <SkipContent />
        <AdminNavbar />
        <div id="main-content" className="flex flex-1 flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
