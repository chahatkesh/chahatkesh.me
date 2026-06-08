"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { type Course } from "~/data/btech-courses";

interface SyllabusModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

export const SyllabusModal = ({
  course,
  isOpen,
  onClose,
}: SyllabusModalProps) => {
  const hasSyllabus = course.syllabus && course.syllabus.length > 0;

  return (
    <Dialog.Root
      open={isOpen && hasSyllabus}
      onOpenChange={(open) => !open && onClose()}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background shadow-[0_24px_80px_-16px_rgba(0,0,0,0.6)] max-h-[85vh] flex flex-col overflow-hidden focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.98] data-[state=open]:zoom-in-[0.98] data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200"
          aria-describedby={undefined}
        >
          {/* Header */}
          <div className="flex-shrink-0 px-6 pt-6 pb-5 sm:px-8 border-b border-border">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 min-w-0">
                <Dialog.Title className="text-lg sm:text-xl font-ubuntu font-medium text-foreground leading-snug">
                  {course.name}
                </Dialog.Title>
                <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[11px] uppercase tracking-widest text-muted-foreground/70">
                  <span className="hidden sm:inline font-mono normal-case tracking-normal text-ring">
                    {course.code}
                  </span>
                  <span
                    className="hidden sm:block h-3 w-px bg-border"
                    aria-hidden="true"
                  />
                  <span className="hidden sm:inline">{course.type}</span>
                  <span
                    className="hidden sm:block h-3 w-px bg-border"
                    aria-hidden="true"
                  />
                  <span className="normal-case tracking-normal text-muted-foreground">
                    {course.professor}
                  </span>
                  <span className="h-3 w-px bg-border" aria-hidden="true" />
                  <span className="font-mono tabular-nums normal-case tracking-normal">
                    {course.credits} cr
                  </span>
                </div>
              </div>
              <Dialog.Close
                className="flex-shrink-0 -mr-2 -mt-2 p-2 text-muted-foreground/70 hover:text-foreground rounded-md hover:bg-muted transition-colors el-focus-styles"
                aria-label="Close modal"
              >
                <X size={16} />
              </Dialog.Close>
            </div>
          </div>

          {/* Syllabus Content */}
          <div className="px-6 sm:px-8 py-6 flex-1 overflow-y-auto smooth-scroll scrollbar-minimal">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-5 select-none">
              Syllabus — {course.syllabus?.length}{" "}
              {course.syllabus?.length === 1 ? "unit" : "units"}
            </p>
            <div className="space-y-6">
              {course.syllabus?.map((unit) => (
                <div key={unit.unit} className="flex gap-4 sm:gap-5">
                  <span className="flex-shrink-0 font-mono text-xs text-muted-foreground/50 tabular-nums pt-0.5 select-none">
                    {String(unit.unit).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-justify text-muted-foreground leading-relaxed border-l border-border pl-4 sm:pl-5">
                    {unit.topics}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 border-t border-border px-6 sm:px-8 py-3 flex items-center justify-between gap-4">
            <span className="text-[11px] text-muted-foreground/60">
              NIT Jalandhar • B.Tech ICE
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-border bg-muted/50">
                esc
              </kbd>
              to close
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
