"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "~/lib/utils";
import {
  backendRoadmap,
  backendRoadmapSectionStart,
} from "~/data/backend-roadmap";

export function BackendRoadmap() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = backendRoadmap[index]!;
  const isFirst = index === 0;
  const isLast = index === backendRoadmap.length - 1;

  useEffect(() => {
    stepRefs.current[index]?.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [index, reduceMotion]);

  function goTo(next: number) {
    setIndex(Math.min(backendRoadmap.length - 1, Math.max(0, next)));
  }

  return (
    <div className="writing-backend-roadmap my-8 overflow-hidden rounded-2xl border border-border/80 bg-card/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] font-sans">
      <div className="border-b border-border/80 px-4 py-4 sm:px-8 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <NavButton
            direction="prev"
            disabled={isFirst}
            onClick={() => goTo(index - 1)}
          />

          <div className="min-w-0 flex-1 text-center">
            <h3 className="!mb-0 !mt-0 font-poem text-xl font-semibold tracking-tight text-foreground sm:text-[1.4rem]">
              {active.name}
            </h3>
          </div>

          <NavButton
            direction="next"
            disabled={isLast}
            onClick={() => goTo(index + 1)}
          />
        </div>

        <div
          className="scrollbar-hide mt-3 flex items-center justify-start overflow-x-auto sm:justify-center"
          role="list"
          aria-label="Roadmap path"
        >
          {backendRoadmap.map((module, stepIndex) => {
            const isActive = stepIndex === index;
            const isPast = stepIndex < index;

            return (
              <div
                key={module.id}
                className="flex items-center"
                role="listitem"
              >
                {stepIndex > 0 && (
                  <span
                    aria-hidden
                    className={cn(
                      "h-px w-4 shrink-0 sm:w-7",
                      isPast || isActive ? "bg-ring/40" : "bg-border/80",
                    )}
                  />
                )}
                <button
                  type="button"
                  ref={(node) => {
                    stepRefs.current[stepIndex] = node;
                  }}
                  onClick={() => goTo(stepIndex)}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`${module.number} ${module.name}`}
                  title={module.name}
                  className="el-focus-styles group flex size-9 shrink-0 items-center justify-center rounded-full"
                >
                  <span
                    className={cn(
                      "flex items-center justify-center rounded-full transition-all duration-300",
                      isActive
                        ? "size-3 bg-ring shadow-[0_0_0_4px_hsl(var(--background)),0_0_0_5px_hsl(var(--ring)/0.55)]"
                        : isPast
                          ? "size-1.5 bg-ring/70 group-hover:size-2"
                          : "size-1.5 border border-muted-foreground/40 bg-transparent group-hover:border-ring/60",
                    )}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.id}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0 px-5 py-7 sm:px-8 sm:py-8"
        >
          <p className="!mb-8 max-w-xl font-poem text-[0.98rem] leading-[1.8] text-muted-foreground">
            {active.why}
          </p>

          <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {active.sections.map((section, sectionIndex) => (
              <section key={section.title}>
                <h4 className="!mb-2 !mt-0 flex items-baseline gap-2.5 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-ring/90">
                  <span className="font-mono tabular-nums tracking-[0.14em] text-ring/70">
                    {String(
                      backendRoadmapSectionStart[index]! + sectionIndex + 1,
                    ).padStart(2, "0")}
                  </span>
                  {section.title}
                </h4>
                <ul className="m-0 list-disc space-y-2.5 pl-5">
                  {section.topics.map((topic) => (
                    <li key={topic.name} className="m-0 marker:text-ring/80">
                      <p className="!mb-0 text-[0.95rem] leading-snug text-foreground/90">
                        {topic.name}
                      </p>
                      <p className="!mb-0 mt-1 font-poem text-[0.9rem] italic leading-relaxed text-muted-foreground/85">
                        {topic.hint}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function NavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous module" : "Next module"}
      className="el-focus-styles flex size-8 shrink-0 items-center justify-center rounded-full border border-border/70 text-foreground/80 transition-all duration-200 enabled:hover:border-ring/50 enabled:hover:text-ring enabled:hover:shadow-[0_0_0_3px_hsl(var(--ring)/0.12)] disabled:cursor-not-allowed disabled:opacity-25"
    >
      <Icon className="size-4" strokeWidth={1.5} />
    </button>
  );
}
