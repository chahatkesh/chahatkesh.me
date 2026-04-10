import { VisitorCounter } from "~/components/features";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="!mt-auto flex flex-col items-center justify-center py-6">
      <div className="mb-4 h-px w-12 bg-border" />
      <div className="flex w-full flex-wrap items-center justify-center gap-2 text-center text-sm text-muted-foreground sm:justify-between">
        <span>
          &copy; {new Date().getFullYear()} &middot;{" "}
          <Link
            href="/about/site"
            className="hover:text-foreground transition-colors underline decoration-neutral-700 hover:decoration-ring underline-offset-2"
          >
            Built
          </Link>{" "}
          by Chahat
        </span>

        <div className="flex items-center gap-2">
          <VisitorCounter />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
