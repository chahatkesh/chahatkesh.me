"use client";

import Link from "next/link";
import { typo } from "~/components/ui/typograpghy";
import { collegeTimeline } from "~/data/college-timeline";
import { 
  FaGraduationCap, 
  FaCalendarAlt, 
  FaArrowRight,
  FaLock
} from "react-icons/fa";

const CollegeJourneySection = () => {
  return (
    <section className="mt-10 space-y-6" aria-label="College Journey">
      <h2 className={typo({ variant: "h2" })}>B.Tech Journey</h2>
      
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {collegeTimeline.map((year) => (
          <div
            key={year.year}
            className={`
              group relative rounded-lg border p-4 transition-all duration-300
              ${year.isActive 
                ? 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-900/20 cursor-pointer' 
                : 'border-neutral-800 bg-neutral-900/30 opacity-60 cursor-not-allowed'
              }
            `}
          >
            {year.isActive ? (
              <Link 
                href={`/about/btech-year-${year.year}`}
                className="block"
              >
                <div className="flex items-center justify-between">
                  {/* Left side - Year info */}
                  <div className="flex items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-ubuntu text-base font-medium text-white">
                          {year.label}
                        </h3>
                        {year.year === 3 && (
                          <span className="inline-flex items-center rounded-full bg-green-500/20 px-2 py-0.5 text-[9px] font-medium text-green-400 border border-green-500/30">
                            Current
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-neutral-400">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt size={10} />
                          <span>{year.academicYear}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaGraduationCap size={10} />
                          <span>{year.events.length} events</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Action */}
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 text-sm text-ring transition-colors group-hover:gap-3">
                      <span>View</span>
                      <FaArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex items-center justify-between">
                {/* Left side - Year info */}
                <div className="flex items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-ubuntu text-base font-medium text-white">
                        {year.label}
                      </h3>
                      <FaLock className="text-neutral-500" size={12} />
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt size={10} />
                        <span>{year.academicYear}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaGraduationCap size={10} />
                        <span>{year.events.length} events</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Action */}
                <div className="flex items-center">
                  <span className="text-sm text-neutral-500">Coming Soon</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollegeJourneySection;
