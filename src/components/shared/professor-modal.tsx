"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { type ProfessorInfo } from "~/data/btech-courses";

interface ProfessorModalProps {
  professor: ProfessorInfo | null;
  onClose: () => void;
}

export const ProfessorModal = ({ professor, onClose }: ProfessorModalProps) => {
  return (
    <Dialog.Root
      open={Boolean(professor)}
      onOpenChange={(open) => !open && onClose()}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background shadow-[0_24px_80px_-16px_rgba(0,0,0,0.6)] max-h-[80vh] flex flex-col overflow-hidden focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.98] data-[state=open]:zoom-in-[0.98] data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200"
          aria-describedby={undefined}
        >
          {professor && (
            <>
              {/* Header */}
              <div className="flex-shrink-0 px-6 pt-6 pb-5 sm:px-8 border-b border-border flex items-start justify-between gap-4">
                <div className="space-y-1.5 min-w-0">
                  <Dialog.Title className="text-lg font-ubuntu font-medium text-foreground leading-snug">
                    {professor.name}
                  </Dialog.Title>
                  <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[11px] uppercase tracking-widest text-muted-foreground/70">
                    <span>
                      <span className="font-mono tabular-nums normal-case tracking-normal">
                        {professor.courseCount}
                      </span>{" "}
                      {professor.courseCount === 1 ? "course" : "courses"}
                    </span>
                    <span className="h-3 w-px bg-border" aria-hidden="true" />
                    <span>
                      <span className="font-mono tabular-nums normal-case tracking-normal">
                        {professor.courses.reduce(
                          (sum, c) => sum + c.credits,
                          0,
                        )}
                      </span>{" "}
                      credits
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

              {/* Courses List */}
              <div className="px-6 sm:px-8 py-5 flex-1 overflow-y-auto smooth-scroll scrollbar-minimal">
                <ul className="divide-y divide-border/60">
                  {professor.courses.map((course) => (
                    <li
                      key={`${course.code}-${course.semester}`}
                      className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 space-y-0.5">
                        <p className="text-sm text-foreground font-medium truncate">
                          {course.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <span className="hidden sm:inline">
                            <span className="font-mono">{course.code}</span>{" "}
                            •{" "}
                          </span>
                          Sem {course.semester} •{" "}
                          <span className="font-mono tabular-nums">
                            {course.credits} cr
                          </span>
                        </p>
                      </div>
                      <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-muted-foreground/60 flex-shrink-0">
                        {course.type}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 border-t border-border px-6 sm:px-8 py-3">
                <p className="text-[11px] text-muted-foreground/60 text-center">
                  Thank you for everything you taught me.
                </p>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
