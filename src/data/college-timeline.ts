import { createId } from "@paralleldrive/cuid2";

export interface TimelineEvent {
  id: string;
  date: string;
  eventName: string;
  url?: string;
  category: 'Hackathon' | 'Competition' | 'Project' | 'Blog' | 'Trip' | 'Academic' | 'Internship' | 'Workshop' | 'Achievement' | 'Other';
}

export interface CollegeYear {
  year: number;
  label: string;
  academicYear: string;
  isActive: boolean;
  events: TimelineEvent[];
}

// Mock data for college timeline - replace with actual data
export const collegeTimeline: CollegeYear[] = [
  {
    year: 1,
    label: "1st Year",
    academicYear: "2023-24",
    isActive: true,
    events: []
  },
  {
    year: 2,
    label: "2nd Year",
    academicYear: "2024-25",
    isActive: true,
    events: []
  },
  {
    year: 3,
    label: "3rd Year",
    academicYear: "2025-26",
    isActive: true,
    events: [],
  },
  {
    year: 4,
    label: "4th Year",
    academicYear: "2026-27",
    isActive: false,
    events: []
  }
];

// Helper function to get events for a specific year
export const getTimelineEventsByYear = (year: number): TimelineEvent[] => {
  const yearData = collegeTimeline.find(y => y.year === year);
  return yearData ? yearData.events : [];
};

// Helper function to get year info
export const getCollegeYearInfo = (year: number): CollegeYear | undefined => {
  return collegeTimeline.find(y => y.year === year);
};

// Category colors for UI
export const categoryColors = {
  'Hackathon': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Competition': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Project': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Blog': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Trip': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'Academic': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Internship': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  'Workshop': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'Achievement': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Other': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
};
