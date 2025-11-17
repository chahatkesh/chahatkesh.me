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
  links?: TimelineLink[];
  location?: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: createId(),
    startDate: '2025-11-08',
    title: 'Participated in HackCBS 8.0',
    description: 'A 24-hour hackathon organized by the tech community of Saheed Sukhdev College of Business Studies. We built Swasya AI, an AI-powered medical transcription tool that listens, reads, and summarizes, so doctors get the complete patient story before consultation begins.',
    category: 'hackathon',
    links: [
      { title: 'GitHub', url: 'https://github.com/chahatkesh/swasya-ai', icon: 'github' },
      { title: 'Devfolio', url: 'https://devfolio.co/projects/swasya-ai-bf6e', icon: 'devfolio' },
      { title: 'Product Demo', url: 'https://youtu.be/eg1DibXqRGc', icon: 'youtube' }
    ],
    location: 'Saheed Sukhdev College, Delhi, India',
  },
  {
    id: createId(),
    startDate: '2025-11-03',
    title: 'Product Presentation to GOI & MeitY Delegation',
    description: 'Presented our Agri-Tech innovations to a high-level delegation in a 4-hour strategic meeting and luncheon. The audience included the Chief AI Officer (Ministry of Agriculture), the Director of IIT Ropar, officials from the Ministry of Education, and leadership from MeitY.',
    category: 'achievement',
    links: [
      { title: 'View Post (MeitY)', url: 'https://www.linkedin.com/posts/nicmeity_artificialintelligence-agriculture-nicmeity-activity-7391430381838721024-JoFY/', icon: 'linkedin' },
      { title: 'View Post (Annam AI)', url: 'https://www.linkedin.com/posts/annam-ai_iitropar-annamai-agritech-activity-7391777407919214592-TGyh/', icon: 'linkedin' }
    ],
    location: 'IIT Ropar, Punjab, India',
  },
  {
    id: createId(),
    startDate: '2025-10-17',
    endDate: 'present',
    title: 'Started Entrepreneur-in-Residence (EIR)',
    description: 'Began role as an Entrepreneur-in-Residence at iHub AwaDH, IIT Ropar, supporting and mentoring technology startups.',
    category: 'work',
    links: [
      { title: 'Visit iHub AwaDH', url: 'https://ihub-awadh.in/', icon: 'website' },
      { title: 'View Announcement', url: 'https://www.linkedin.com/posts/chahatkesharwani_im-happy-to-share-that-im-starting-a-new-activity-7382848439652593664-gJYU?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEYS_ZIB5LbJYVWVau1yBowmKAce_JxfWf0', icon: 'linkedin' }
    ],
    location: 'IIT Ropar, Punjab, India',
  },
  {
    id: createId(),
    startDate: '2025-09-06',
    title: 'Bit N Build, Punjab Round Mentor',
    description: 'Invited as a mentor for the Bit n Build Punjab Round hackathon at Thapar University, Patiala. Guided and advised over 30 participating teams during the event held on September 6, 2025, which hosted 120+ participants in collaboration with Genesoc Society.',
    category: 'achievement',
    links: [
      { title: 'Event Details', url: 'https://www.openlearn.org.in/events/hackathon-1', icon: 'website' },
      { title: 'View Post', url: 'https://www.instagram.com/p/DOEclMdkzPo/', icon: 'instagram' }
    ],
    location: 'Thapar University, Patiala, India',
  }
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