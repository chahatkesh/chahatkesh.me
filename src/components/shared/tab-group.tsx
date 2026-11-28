"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabGroupProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  sticky?: boolean;
  siblingNav?: boolean;
}

// Survives the remount Next does when the tab query changes, so the
// end-of-section links still scroll after the new panel is on the page.
const siblingScroll = { pending: false };

function requestSiblingScroll() {
  siblingScroll.pending = true;
}

function takeSiblingScroll() {
  if (!siblingScroll.pending) return false;
  siblingScroll.pending = false;
  return true;
}

function cssLengthToPx(value: string) {
  const raw = value.trim();
  if (!raw) return 0;
  if (raw.endsWith("rem")) {
    const root = parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    return parseFloat(raw) * root;
  }
  return parseFloat(raw) || 0;
}

export function TabGroup({
  tabs,
  defaultTab,
  className,
  sticky = false,
  siblingNav = false,
}: TabGroupProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");

  const initialTab =
    tabParam && tabs.find((tab) => tab.id === tabParam)
      ? tabParam
      : defaultTab || tabs[0]?.id;
  const [activeTab, setActiveTab] = useState(initialTab);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabBarAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeElement = tabRefs.current[activeTab];
    if (activeElement) {
      setIndicatorStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
      });
    }
  }, [activeTab]);

  const scrollTabBarUnderHeader = () => {
    const anchor = tabBarAnchorRef.current;
    if (!anchor) return;

    const headerHeight = cssLengthToPx(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--header-height",
      ),
    );
    const top =
      anchor.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  useEffect(() => {
    if (!siblingScroll.pending) return;

    // Wait until the new panel is committed. Scrolling in the click handler
    // gets undone when the previous panel unmounts and the browser anchors
    // the viewport to the bottom of the next section.
    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled || !takeSiblingScroll()) return;
        scrollTabBarUnderHeader();
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [activeTab]);

  const handleTabClick = (
    tabId: string,
    options?: { scrollToTabs?: boolean },
  ) => {
    if (options?.scrollToTabs) {
      requestSiblingScroll();
    }
    setActiveTab(tabId);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tab", tabId);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      const nextIndex = (index + 1) % tabs.length;
      handleTabClick(tabs[nextIndex].id);
      tabRefs.current[tabs[nextIndex].id]?.focus();
    } else if (e.key === "ArrowLeft") {
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      handleTabClick(tabs[prevIndex].id);
      tabRefs.current[tabs[prevIndex].id]?.focus();
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Sits outside the sticky bar so its position stays the in-flow top. */}
      <div ref={tabBarAnchorRef} className="h-0" aria-hidden />

      {/* Tab Navigation */}
      <div
        className={cn(
          "border-b border-border",
          sticky &&
            "sticky top-[var(--header-height)] z-20 bg-background/95 backdrop-blur-sm",
        )}
      >
        <div
          className="relative flex gap-1"
          role="tablist"
          aria-label="Site information tabs"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => handleTabClick(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "relative el-focus-styles px-4 py-3 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "text-ring"
                  : "text-muted-foreground hover:text-foreground/90",
              )}
            >
              {tab.label}
            </button>
          ))}

          {/* Animated indicator */}
          <motion.div
            className="absolute bottom-0 h-0.5 bg-ring"
            initial={false}
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <div
              key={tab.id}
              id={`tabpanel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              hidden={!isActive}
              className="focus:outline-none"
            >
              {isActive && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {tab.content}
                  {siblingNav && (
                    <nav
                      aria-labelledby={`other-sections-${tab.id}`}
                      className="mt-12 border-t border-border pt-6"
                    >
                      <p
                        id={`other-sections-${tab.id}`}
                        className="text-xs uppercase tracking-wider text-muted-foreground"
                      >
                        Other sections
                      </p>
                      <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:gap-6">
                        {tabs
                          .filter((other) => other.id !== tab.id)
                          .map((other) => (
                            <button
                              key={other.id}
                              type="button"
                              onClick={() =>
                                handleTabClick(other.id, { scrollToTabs: true })
                              }
                              className="el-focus-styles inline-flex items-center gap-2 rounded-sm py-1.5 text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                              {other.label}
                              <span aria-hidden="true">→</span>
                            </button>
                          ))}
                      </div>
                    </nav>
                  )}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
