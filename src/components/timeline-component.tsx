"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TimelineEvent, categoryColors } from "~/data/college-timeline";
import { typo } from "~/components/ui/typograpghy";
import { cn } from "~/lib/utils";
import { 
  FaExternalLinkAlt, 
  FaCalendarAlt
} from "react-icons/fa";

interface TimelineComponentProps {
  events: TimelineEvent[];
  year: number;
  academicYear: string;
}

const TimelineComponent = ({ events, year, academicYear }: TimelineComponentProps) => {
  // Sort events by date (newest first)
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short'
    });
  };

  // Group events by month-year for timeline structure
  const groupedEvents = sortedEvents.reduce((acc, event) => {
    const monthYear = getMonthYear(event.date);
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {} as Record<string, TimelineEvent[]>);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className={cn(typo({ variant: "h2" }))}>
              {year === 1 ? '1st' : year === 2 ? '2nd' : year === 3 ? '3rd' : year === 4 ? '4th' : `${year}th`} Year Timeline
            </h1>
            <p className="text-sm text-neutral-400">Academic Year: {academicYear}</p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <FaCalendarAlt size={12} />
            <span>{events.length} events</span>
          </div>
        </div>


      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ring via-ring/60 to-ring/30 opacity-30" />
        
        <AnimatePresence mode="wait">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {Object.entries(groupedEvents).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-neutral-400">No events found for the selected category.</p>
              </div>
            ) : (
              Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
                <div key={monthYear} className="relative">
                  {/* Month-Year Header */}
                  <div className="relative flex items-center mb-6">
                    <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-ring to-ring/70 text-white text-sm font-semibold">
                      {monthEvents.length}
                    </div>
                    <div className="ml-12 rounded-lg bg-neutral-900/50 px-4 py-2 border border-neutral-800">
                      <h3 className="font-ubuntu text-base font-medium text-white">
                        {monthYear}
                      </h3>
                    </div>
                  </div>

                  {/* Events for this month */}
                  <div className="ml-12 space-y-4">
                    {monthEvents.map((event, eventIndex) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: eventIndex * 0.1 }}
                      >
                        {event.url ? (
                          <Link
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 transition-all duration-300 hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-900/20 cursor-pointer"
                          >
                            {/* Event Content */}
                            <div className="space-y-3">
                              {/* Header */}
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                                      <FaCalendarAlt size={12} />
                                      {formatDate(event.date)}
                                    </div>
                                    
                                    <span className={`
                                      absolute right-5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium
                                      ${categoryColors[event.category]}
                                    `}>
                                      {event.category}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-ubuntu text-base font-medium text-white">
                                      {event.eventName}
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Hover gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-ring/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg" />
                          </Link>
                        ) : (
                          <div className="group relative rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 transition-all duration-300 hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-900/20">
                            {/* Event Content */}
                            <div className="space-y-3">
                              {/* Header */}
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                                      <FaCalendarAlt size={12} />
                                      {formatDate(event.date)}
                                    </div>
                                    
                                    <span className={`
                                      absolute right-5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium
                                      ${categoryColors[event.category]}
                                    `}>
                                      {event.category}
                                    </span>
                                  </div>
                                  
                                  <h4 className="font-ubuntu text-base font-medium text-white">
                                    {event.eventName}
                                  </h4>
                                </div>
                              </div>
                            </div>

                            {/* Hover gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-ring/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TimelineComponent;
