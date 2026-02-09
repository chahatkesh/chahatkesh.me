"use client";

import { useState, useEffect } from "react";
import { cn } from "~/lib/utils";
import { FiList, FiChevronRight } from "react-icons/fi";

interface Section {
  id: string;
  title: string;
}

interface PageTableOfContentsProps {
  sections: Section[];
}

export function PageTableOfContents({ sections }: PageTableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-950/50 p-4">
      <div className="mb-3 flex items-center gap-2">
        <FiList className="text-ring" />
        <h3 className="font-ubuntu text-sm font-medium text-white">
          Table of Contents
        </h3>
      </div>
      <nav aria-label="Table of contents">
        <ol className="space-y-1">
          {sections.map((section, index) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "group flex w-full items-start gap-2 rounded-md px-3 py-2 text-left text-sm transition-all",
                  activeSection === section.id
                    ? "bg-ring/10 text-ring font-medium"
                    : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200",
                )}
              >
                <span
                  className={cn(
                    "flex-shrink-0 font-mono text-xs",
                    activeSection === section.id
                      ? "text-ring"
                      : "text-neutral-600 group-hover:text-neutral-500",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{section.title}</span>
                <FiChevronRight
                  className={cn(
                    "flex-shrink-0 text-xs transition-transform",
                    activeSection === section.id
                      ? "translate-x-0.5 opacity-100"
                      : "opacity-0 group-hover:opacity-50",
                  )}
                />
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
