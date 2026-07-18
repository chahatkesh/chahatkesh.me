import { VisitorCounter } from "~/components/features";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="!mt-auto flex flex-col items-center justify-center py-6">
      <div className="mb-4 h-px w-12 bg-border" />

      <div className="flex w-full flex-col items-center gap-2 text-center text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-left">
        <p>
          &copy; {new Date().getFullYear()} &middot;{" "}
          <Link href="/site" className="link-inline">
            Built
          </Link>{" "}
          by Chahat
        </p>

        <nav
          aria-label="Footer"
          className="flex items-center gap-x-3 text-muted-foreground"
        >
          <Link
            href="/changelog"
            className="el-focus-styles rounded-sm transition-colors hover:text-ring"
          >
            Changelog
          </Link>
          <span aria-hidden>•</span>
          <VisitorCounter />
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
