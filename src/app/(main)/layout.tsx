import { type ReactNode } from "react";
import Footer from "~/components/layout/footer";
import BookCallStrip from "~/components/layout/book-call-strip";
import Navbar from "~/components/layout/nav";
import { SkipContent } from "~/components/ui";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <BookCallStrip />
      <div className="container relative flex min-h-dvh flex-col space-y-4 py-2">
        <div className="!mb-6">
          <SkipContent />
          <Navbar />
          <main id="main-content">{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
