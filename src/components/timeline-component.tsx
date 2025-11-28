"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  TimelineEvent, 
  getAllTimelineEvents,
  categoryColors,
  getEventDuration,
  formatDateRange,
  formatOngoingDate
} from "~/data/timeline";
import { 
  FaExternalLinkAlt, 
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaGithub,
  FaGlobe,
  FaFileAlt,
  FaCertificate,
  FaYoutube,
  FaLinkedin,
  FaInstagram
} from "react-icons/fa";
import { MotionDiv } from "./motion-wrapper";
import { SiDevpost } from "react-icons/si";
import { cn } from "~/lib/utils";

// Helper function to get link icon
const getLinkIcon = (iconType?: string) => {
  switch (iconType) {
    case 'github':
      return <FaGithub size={14} />;
    case 'website':
    case 'demo':
      return <FaGlobe size={10} />;
    case 'article':
    case 'blog':
      return <FaFileAlt size={10} />;
    case 'certificate':
      return <FaCertificate size={10} />;
    case 'youtube':
      return <FaYoutube size={14} />;
    case 'devfolio':
      return <SiDevpost size={14} />;
    case 'linkedin':
      return <FaLinkedin size={14} />;
    case 'instagram':
      return <FaInstagram size={14} />;
    case 'document':
      return <FaFileAlt size={10} />;
    default:
      return <FaExternalLinkAlt size={10} />;
  }
};

type CategoryFilter = 'all' | 'project' | 'achievement' | 'learning' | 'work' | 'travel' | 'hackathon' | 'workshop' | 'other';

const categories: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'project', label: 'Project' },
  { value: 'achievement', label: 'Achievement' },
  { value: 'learning', label: 'Learning' },
  { value: 'work', label: 'Work' },
  { value: 'travel', label: 'Travel' },
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'other', label: 'Other' },
];

const TimelineComponent = () => {
  const allEvents = getAllTimelineEvents();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');

  const filteredEvents = selectedCategory === 'all' 
    ? allEvents 
    : allEvents.filter(event => event.category === selectedCategory);

  return (
    <MotionDiv 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Category Filter */}
      <MotionDiv 
        className="pb-4 border-b border-neutral-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {/* Desktop: Show all categories */}
        <div className="hidden sm:flex flex-wrap gap-4 items-center">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={cn(
                "text-sm transition-all duration-200",
                selectedCategory === category.value
                  ? "text-ring underline underline-offset-4 decoration-2"
                  : "text-neutral-400 hover:text-neutral-300"
              )}
            >
              {category.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-neutral-500">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
          </span>
        </div>

        {/* Mobile: Horizontal scrollable categories */}
        <div className="flex sm:hidden items-center gap-3">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide scroll-smooth" id="category-scroll">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={cn(
                  "text-sm whitespace-nowrap transition-all duration-200 flex-shrink-0",
                  selectedCategory === category.value
                    ? "text-ring underline underline-offset-4 decoration-2"
                    : "text-neutral-400"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
          <button 
            onClick={() => {
              const container = document.getElementById('category-scroll');
              if (container) {
                container.scrollBy({ left: 150, behavior: 'smooth' });
              }
            }}
            className="text-neutral-400 p-1 flex-shrink-0"
            aria-label="Scroll categories"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </MotionDiv>

      {/* Timeline */}
      <MotionDiv 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {/* Timeline vertical line */}
        <div className="absolute left-[5px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-ring via-ring/60 to-ring/20 opacity-30" />
        {/* Events */}
        <div className="space-y-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              No events found in this category.
            </div>
          ) : (
            filteredEvents.map((event, eventIndex) => {
              const duration = getEventDuration(event.startDate, event.endDate);
              
              return (
                <MotionDiv
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: Math.min(eventIndex * 0.05, 0.3) }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute mt-1 left-0 flex h-3 w-3 items-center justify-center rounded-full shadow-lg bg-ring border-2 border-neutral-900">
                  </div>
                  <div className="ml-8">{/* Reduced margin since dot is smaller */}
                    <EventCard event={event} duration={duration} />
                  </div>
                </MotionDiv>
              );
            }))}
        </div>
      </MotionDiv>
    </MotionDiv>
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
      {/* Title and Metadata on same line */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h3 className="font-ubuntu text-base font-medium text-white group-hover:text-ring transition-colors">
          {event.title}
        </h3>
        
        <div className="flex items-center gap-3 text-xs text-neutral-400 flex-wrap">
          <div className="flex items-center gap-1.5">
            <FaCalendarAlt size={11} />
            {formatEventDate(event)}
          </div>
          
          {duration !== 'Single day' && (
            <div className="flex items-center gap-1.5">
              <FaClock size={11} />
              <span>{duration}</span>
            </div>
          )}

          {event.location && (
            <div className="flex items-center gap-1.5">
              <FaMapMarkerAlt size={11} />
              <span>{event.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {event.description && (
        <p className="text-neutral-300 text-sm leading-relaxed text-justify">
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
              className="inline-flex items-center justify-center gap-1.5 text-xs text-neutral-400 hover:text-ring/80 transition-colors bg-neutral-800/30 hover:bg-neutral-800/50 px-3 py-1.5 rounded border border-neutral-700 hover:border-neutral-600"
            >
              <span className="flex items-center">{getLinkIcon(link.icon)}</span>
              <span className="leading-none">{link.title}</span>
            </Link>
          ))}
        </div>

        {/* Category on the right - hidden on mobile */}
        <span className={`
          hidden sm:inline-flex text-[10px] uppercase tracking-wider flex-shrink-0
          ${categoryColors[event.category as keyof typeof categoryColors].split(' ')[1]}
        `}>
          {event.category}
        </span>
      </div>
    </div>
  );
};

export default TimelineComponent;