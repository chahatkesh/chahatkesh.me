"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import config from "~/config";

const BookCallStrip = () => {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <Link
      href={config.social.cal}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book a 30-minute call"
      className="el-focus-styles group sticky top-0 z-40 flex w-full items-center justify-center gap-x-2 border-b border-ring/25 bg-background/90 px-4 py-2 text-center text-[13px] leading-none backdrop-blur-md transition-colors duration-300 hover:border-ring/40 hover:bg-ring/10 sm:text-sm"
    >
      <span className="text-muted-foreground transition-colors group-hover:text-foreground/80">
        Open for a chat
      </span>
      <span aria-hidden className="hidden text-ring/40 xs:inline">
        ·
      </span>
      <span className="inline-flex items-center gap-0.5 font-medium text-ring">
        Book 30 minutes
        <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
};

export default BookCallStrip;
