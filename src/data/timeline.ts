import { createId } from "@paralleldrive/cuid2";

export interface TimelineLink {
  title: string;
  url: string;
  icon?: string;
}

export interface TimelineEvent {
  id: string;
  startDate: string;
  endDate?: string;
  title: string;
  description?: string;
  category: 'project' | 'achievement' | 'learning' | 'work' | 'travel' | 'hackathon' | 'workshop' | 'other';
  tags?: string[];
  links?: TimelineLink[];
  image?: string;
  location?: string;
  status?: 'completed' | 'ongoing' | 'upcoming';
}

export const timelineEvents: TimelineEvent[] = [
  
];

export const getEventDuration = (startDate: string, endDate?: string): string => {
  if (!endDate) return 'Single day';
  
  if (endDate.toLowerCase() === 'present') {
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Single day';
    if (diffDays === 1) return '1 day';
    if (diffDays <= 7) return `${diffDays} days`;
    if (diffDays <= 31) return `${Math.ceil(diffDays / 7)} weeks`;
    if (diffDays <= 365) return `${Math.ceil(diffDays / 30)} months`;
    return `${Math.ceil(diffDays / 365)} years`;
  }
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Single day';
  if (diffDays === 1) return '1 day';
  if (diffDays <= 7) return `${diffDays} days`;
  if (diffDays <= 31) return `${Math.ceil(diffDays / 7)} weeks`;
  if (diffDays <= 365) return `${Math.ceil(diffDays / 30)} months`;
  return `${Math.ceil(diffDays / 365)} years`;
};

export const getEventStatus = (startDate: string, endDate?: string): 'completed' | 'ongoing' | 'upcoming' => {
  const now = new Date();
  const start = new Date(startDate);
  
  if (!endDate) {
    if (start > now) return 'upcoming';
    return 'completed';
  }
  
  if (endDate.toLowerCase() === 'present') {
    if (start > now) return 'upcoming';
    return 'ongoing';
  }
  
  const end = new Date(endDate);
  
  if (start > now) return 'upcoming';
  if (end > now) return 'ongoing';
  return 'completed';
};

export const formatDateRange = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate);
  
  const formatOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  if (!endDate) {
    return start.toLocaleDateString('en-US', formatOptions);
  }
  
  if (endDate.toLowerCase() === 'present') {
    return `${start.toLocaleDateString('en-US', formatOptions)} - Present`;
  }
  
  const end = new Date(endDate);
  
  if (start.getFullYear() === end.getFullYear()) {
    if (start.getMonth() === end.getMonth()) {
      if (start.getDate() === end.getDate()) {
        return start.toLocaleDateString('en-US', formatOptions);
      }
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.getDate()}, ${end.getFullYear()}`;
    }
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${end.getFullYear()}`;
  }
  
  return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString('en-US', formatOptions)}`;
};

export const formatOngoingDate = (startDate: string): string => {
  const start = new Date(startDate);
  const formatOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  return `${start.toLocaleDateString('en-US', formatOptions)} - Present`;
};

export const getAllTimelineEvents = (): TimelineEvent[] => {
  return [...timelineEvents].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
};

export const getEventsByYear = (year: number): TimelineEvent[] => {
  return timelineEvents.filter(event => 
    new Date(event.startDate).getFullYear() === year ||
    (event.endDate && event.endDate !== 'present' && new Date(event.endDate).getFullYear() === year)
  );
};

export const getEventsByCategory = (category: string): TimelineEvent[] => {
  return timelineEvents.filter(event => event.category === category);
};

export const getOngoingEvents = (): TimelineEvent[] => {
  return timelineEvents.filter(event => getEventStatus(event.startDate, event.endDate) === 'ongoing');
};

export const categoryColors = {
  'project': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'achievement': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'learning': 'bg-green-500/20 text-green-400 border-green-500/30',
  'work': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'travel': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'hackathon': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'workshop': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'other': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
};