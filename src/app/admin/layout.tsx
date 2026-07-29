import { type ReactNode } from "react";
import { type Metadata } from "next";
import Footer from "~/components/layout/footer";
import Navbar from "~/components/layout/nav";
import { SkipContent } from "~/components/ui";

// Admin must always reflect the latest writes — never serve a static shell.
export const dynamic = "force-dynamic";

// Keep the entire admin area out of search indexes regardless of robots.txt.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container relative flex min-h-dvh flex-col space-y-4 py-2">
      <div className="!mb-6 space-y-4">
        <SkipContent />
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
