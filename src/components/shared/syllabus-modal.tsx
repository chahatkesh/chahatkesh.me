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
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-background shadow-2xl max-h-[85vh] overflow-hidden focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
          aria-describedby={undefined}
        >
          {/* Header */}
          <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-start justify-between gap-4 z-10">
            <Dialog.Title className="text-xl font-ubuntu font-medium text-foreground">
              {course.name}
            </Dialog.Title>
            <Dialog.Close
              className="flex-shrink-0 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </Dialog.Close>
          </div>

          {/* Syllabus Content */}
          <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-120px)]">
            <div className="space-y-6">
              {course.syllabus?.map((unit) => (
                <div key={unit.unit} className="space-y-2">
                  <h3 className="text-sm font-medium text-ring">
                    Unit-{unit.unit}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                    {unit.topics}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-background border-t border-border px-6 py-3 flex justify-end">
            <Dialog.Close className="px-4 py-2 text-sm bg-muted hover:bg-accent text-foreground rounded transition-colors">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
