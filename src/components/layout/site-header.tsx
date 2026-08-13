"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Navbar, { type NavbarVariant } from "./nav";
import BookCallStrip from "./book-call-strip";
import { useScrolled } from "~/hooks";
import { cn } from "~/lib/utils";

interface SiteHeaderProps {
  variant?: NavbarVariant;
}

/**
 * Sticky site chrome. Stays pinned while scrolling, and picks up a frosted
 * bar once content starts sliding underneath so links stay readable.
 */
const SiteHeader = ({ variant = "public" }: SiteHeaderProps) => {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const showStrip = variant === "public" && pathname === "/";

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const syncHeight = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${el.offsetHeight}px`,
      );
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(el);

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--header-height");
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-40 pt-[env(safe-area-inset-top)] transition-colors duration-300",
        scrolled
          ? "bg-background/75 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
          : "bg-background",
      )}
    >
      {showStrip && (
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out",
            scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]",
          )}
          aria-hidden={scrolled}
        >
          <div className="overflow-hidden" inert={scrolled || undefined}>
            <BookCallStrip />
          </div>
        </div>
      )}
      <div className="container">
        <Navbar variant={variant} />
      </div>
    </header>
  );
};

export default SiteHeader;
