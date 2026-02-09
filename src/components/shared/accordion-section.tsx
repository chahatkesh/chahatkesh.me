"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "~/lib/utils";

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function AccordionSection({
  title,
  children,
  defaultOpen = false,
  icon,
  className,
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("rounded-lg border border-neutral-800", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between p-5 text-left transition-colors",
          "hover:bg-neutral-900/30 focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        )}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-500/10 text-cyan-400">
              {icon}
            </div>
          )}
          <span className="text-lg font-semibold text-neutral-100">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
        >
          <FiChevronDown className="h-5 w-5 text-neutral-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-neutral-800 p-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
