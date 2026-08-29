import { type ReactNode } from "react";
import Footer from "~/components/layout/footer";
import SiteHeader from "~/components/layout/site-header";
import { SkipContent } from "~/components/ui";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-dvh flex-col">
      <SkipContent />
      <SiteHeader />
      <div className="container relative flex flex-1 flex-col">
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
