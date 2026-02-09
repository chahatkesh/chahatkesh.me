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
}

export function TabGroup({
  tabs,
  defaultTab,
  className,
  sticky = false,
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

  useEffect(() => {
    const activeElement = tabRefs.current[activeTab];
    if (activeElement) {
      setIndicatorStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
      });
    }
  }, [activeTab]);

  const handleTabClick = (tabId: string) => {
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
      {/* Tab Navigation */}
      <div
        className={cn(
          "border-b border-neutral-800",
          sticky && "sticky top-0 z-20 bg-black/95 backdrop-blur-sm",
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
                "relative px-4 py-3 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                activeTab === tab.id
                  ? "text-cyan-400"
                  : "text-neutral-400 hover:text-neutral-200",
              )}
            >
              {tab.label}
            </button>
          ))}

          {/* Animated indicator */}
          <motion.div
            className="absolute bottom-0 h-0.5 bg-cyan-500"
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
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            className={cn(
              "focus:outline-none",
              activeTab === tab.id && "animate-fade-in",
            )}
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
