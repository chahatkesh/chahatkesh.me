"use client";

import { type Course } from "~/data/btech-courses";
import { FaTimes } from "react-icons/fa";

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
  if (!course.syllabus || course.syllabus.length === 0 || !isOpen) {
    return null;
  }

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Modal Content */}
        <div
          className="relative w-full max-w-3xl max-h-[85vh] bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex items-start justify-between gap-4 z-10">
            <div className="flex-1">
              <h2 className="text-xl font-ubuntu font-medium text-white">
                {course.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
              aria-label="Close modal"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Syllabus Content */}
          <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-120px)]">
            <div className="space-y-6">
              {course.syllabus.map((unit) => (
                <div key={unit.unit} className="space-y-2">
                  <h3 className="text-sm font-medium text-ring">
                    Unit-{unit.unit}
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed text-justify">
                    {unit.topics}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-neutral-900 border-t border-neutral-800 px-6 py-3 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm bg-neutral-800 hover:bg-neutral-700 text-white rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
