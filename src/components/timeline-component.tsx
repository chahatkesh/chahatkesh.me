"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  TimelineEvent, 
  getAllTimelineEvents,
  categoryColors,
  getEventDuration,
  formatDateRange,
  formatOngoingDate
} from "~/data/timeline";
import { typo } from "~/components/ui/typograpghy";
import { cn } from "~/lib/utils";
import { 
  FaExternalLinkAlt, 
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaGithub,
  FaGlobe,
  FaFileAlt,
  FaCertificate
} from "react-icons/fa";
import { MotionDiv } from "./motion-wrapper";

// Helper function to get link icon
const getLinkIcon = (iconType?: string) => {
  switch (iconType) {
    case 'github':
      return <FaGithub size={10} />;
    case 'website':
    case 'demo':
      return <FaGlobe size={10} />;
    case 'article':
    case 'blog':
      return <FaFileAlt size={10} />;
    case 'certificate':
      return <FaCertificate size={10} />;
    default:
      return <FaExternalLinkAlt size={10} />;
  }
};

const TimelineComponent = () => {
  const allEvents = getAllTimelineEvents();

  return (
    <div className="space-y-8">
      {/* Header Section - Minimal */}
      <MotionDiv 
              className="space-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className={cn(typo({ variant: "h2" }))}>My Journey</h1>
              <p className={cn(typo({ variant: "paragraph" }))}>
                {allEvents.length} events showcasing my learnings, achievements, and milestones.
              </p>
      </MotionDiv>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ring via-ring/60 to-ring/30 opacity-30" />
        
        <div className="space-y-8">
          {allEvents.map((event, eventIndex) => {
            const duration = getEventDuration(event.startDate, event.endDate);
            
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: eventIndex * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 flex h-3 w-3 items-center justify-center rounded-full shadow-lg bg-ring border-2 border-neutral-900">
                </div>

                <div className="ml-8">{/* Reduced margin since dot is smaller */}
                  <EventCard event={event} duration={duration} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Minimal Event Card Component
interface EventCardProps {
  event: TimelineEvent;
  duration: string;
}

const EventCard = ({ event, duration }: EventCardProps) => {
  const formatEventDate = (event: TimelineEvent) => {
    if (event.endDate?.toLowerCase() === 'present') {
      return formatOngoingDate(event.startDate);
    }
    return formatDateRange(event.startDate, event.endDate);
  };

  return (
    <div className="group relative space-y-3 pb-6 transition-all duration-300 border-b border-neutral-800">
      {/* Title and Tags */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h3 className="font-ubuntu text-base font-medium text-white group-hover:text-ring transition-colors">
          {event.title}
        </h3>
        
        <div className="hidden sm:flex flex-wrap gap-2">
          {event.tags?.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="text-xs text-neutral-400 bg-neutral-900/50 px-2 py-1 rounded border border-neutral-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Date, Duration, and Location */}
      <div className="flex items-center gap-4 text-sm text-neutral-400 flex-wrap">
        <div className="flex items-center gap-2">
          <FaCalendarAlt size={12} />
          {formatEventDate(event)}
        </div>
        
        {duration !== 'Single day' && (
          <div className="flex items-center gap-2">
            <FaClock size={12} />
            <span>{duration}</span>
          </div>
        )}

        {event.location && (
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt size={12} />
            <span>{event.location}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {event.description && (
        <p className="text-neutral-300 text-sm leading-relaxed">
          {event.description}
        </p>
      )}

      {/* Links and Category */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        {/* Links on the left */}
        <div className="flex flex-wrap gap-2">
          {event.links && event.links.length > 0 && event.links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-ring hover:text-ring/80 transition-colors bg-neutral-800/30 hover:bg-neutral-800/50 px-3 py-1.5 rounded border border-neutral-700 hover:border-neutral-600"
            >
              {getLinkIcon(link.icon)}
              <span>{link.title}</span>
            </Link>
          ))}
        </div>

        {/* Category on the right */}
        <span className={`
          text-xs px-2 py-1 rounded border flex-shrink-0
          ${categoryColors[event.category as keyof typeof categoryColors]}
        `}>
          {event.category}
        </span>
      </div>
    </div>
  );
};

export default TimelineComponent;