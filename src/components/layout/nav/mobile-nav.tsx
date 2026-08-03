"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { isPublicNavActive, navData, type NavItemData } from "./_nav-mock";
import { cn } from "~/lib/utils";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface MobileNavProps {
  items?: NavItemData[];
  isActive?: (path: string, pathname: string) => boolean;
}

const MobileNav = ({
  items = navData,
  isActive: isActiveFn = isPublicNavActive,
}: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape to close + focus trap while open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const focusables =
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Move focus to the close button on open; restore to the trigger on close.
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      const t = window.setTimeout(() => closeButtonRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      openButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <button
        ref={openButtonRef}
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="el-focus-styles flex size-9 items-center justify-center rounded-sm text-foreground/70 transition-colors hover:text-foreground"
      >
        <Menu className="size-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav"
            ref={dialogRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col bg-background"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header */}
            <div className="flex items-center justify-end border-b border-border/30 px-6 py-4">
              <motion.button
                ref={closeButtonRef}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ delay: 0.08, duration: 0.3, ease: "backOut" }}
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
                className="el-focus-styles flex size-9 items-center justify-center rounded-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                <X className="size-5" />
              </motion.button>
            </div>

            {/* Nav links — vertically centered */}
            <nav
              aria-label="Mobile navigation"
              className="flex flex-1 flex-col justify-center px-6"
            >
              <ol role="list" className="space-y-0">
                {items.map((item, index) => {
                  const active = isActiveFn(item.path, pathname);
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.16 + index * 0.065,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      role="listitem"
                    >
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "el-focus-styles group flex w-full items-center justify-between rounded-sm py-[1.1rem] transition-colors duration-200",
                          active
                            ? "text-ring"
                            : "text-foreground/50 hover:text-foreground",
                        )}
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="w-6 text-xs font-medium tabular-nums text-muted-foreground/40 transition-colors group-hover:text-muted-foreground/60">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[2.4rem] font-bold leading-none tracking-tight">
                            {item.label}
                          </span>
                        </span>
                        {active && (
                          <span className="size-[7px] shrink-0 rounded-full bg-ring" />
                        )}
                      </Link>
                      {index < items.length - 1 && (
                        <div className="ml-10 h-px bg-border/25" />
                      )}
                    </motion.li>
                  );
                })}
              </ol>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
