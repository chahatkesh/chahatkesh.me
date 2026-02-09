import { VisitorCounter } from "~/components/features";
import Link from "next/link";
import config from "~/config";

const Footer = () => {
  return (
    <footer className="!mt-auto flex flex-col items-center justify-center py-4">
      <div className="flex w-full flex-wrap items-center justify-center gap-2 text-center sm:justify-between">
        <span>
          &copy; {new Date().getFullYear()}{" "}
          <Link
            href="/about/site"
            className="hover:text-ring transition-colors underline decoration-neutral-700 hover:decoration-ring underline-offset-2"
          >
            Developed
          </Link>{" "}
          by {config.appName}
        </span>

        <div className="flex items-center gap-2">
          <VisitorCounter />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
