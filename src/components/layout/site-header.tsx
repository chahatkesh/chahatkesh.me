"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Navbar, { type NavbarVariant } from "./nav";
import { useScrolled } from "~/hooks";
import { cn } from "~/lib/utils";

interface SiteHeaderProps {
  variant?: NavbarVariant;
}

const pastHomeIntro = () => window.scrollY >= window.innerHeight * 0.3;

/**
 * Sticky site chrome. Stays pinned while scrolling, and picks up a frosted
 * bar once content starts sliding underneath so links stay readable.
 */
const SiteHeader = ({ variant = "public" }: SiteHeaderProps) => {
  const pathname = usePathname();
  const isHome = variant === "public" && pathname === "/";
  const scrolled = useScrolled(isHome ? pastHomeIntro : undefined);
  const hidden = isHome && !scrolled;
  const headerRef = useRef<HTMLElement>(null);

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
      inert={hidden}
      className={cn(
        "sticky top-0 z-40 pt-[env(safe-area-inset-top)] transition-colors duration-300",
        isHome &&
          "transition-[opacity,transform,background-color] motion-reduce:transition-none",
        hidden && "pointer-events-none -translate-y-full opacity-0",
        scrolled
          ? "bg-background/75 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent",
      )}
    >
      <div className="container">
        <Navbar variant={variant} />
      </div>
    </header>
  );
};

export default SiteHeader;
