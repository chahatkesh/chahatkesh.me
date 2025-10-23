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
    events: [
      {
        id: createId(),
        date: "2023-08-15",
        eventName: "College Orientation",
        category: "Academic",
        url: "https://chahatkesh.me/about"
      },
    ]
  },
  {
    year: 2,
    label: "2nd Year",
    academicYear: "2024-25",
    isActive: true,
    events: [
      {
        id: createId(),
        date: "2024-08-10",
        eventName: "Advanced Programming Course",
        category: "Academic"
      },
    ]
  },
  {
    year: 3,
    label: "3rd Year",
    academicYear: "2025-26",
    isActive: true,
    events: [
      {
        id: createId(),
        date: "2025-07-28",
        eventName: "The 5th Semester Adventure Begins",
        category: "Academic"
      },
      {
        id: createId(),
        date: "2025-07-29",
        eventName: "Deep Dive: A Chat with Dr. OP Verma",
        category: "Achievement"
      },
      {
        id: createId(),
        date: "2025-07-31",
        eventName: "Cohort 1.0 Retreat & Launching OpenLearn’s Accelerate Journey",
        category: "Workshop"
      },
      {
        id: createId(),
        date: "2025-08-09",
        eventName: "Rakshabandhan Roadtrip: Memories in Prayagraj",
        category: "Trip"
      },
      {
        id: createId(),
        date: "2025-08-10",
        eventName: "Lights, Camera, Action: Space Club Documentary Shoot",
        category: "Other"
      },
      {
        id: createId(),
        date: "2025-08-14",
        eventName: "Patriotic Lens: Independence Day Video Shoot",
        category: "Other"
      },
      {
        id: createId(),
        date: "2025-08-14",
        eventName: "Cracking the Expedia Code: Online Assessment",
        category: "Competition"
      },
      {
        id: createId(),
        date: "2025-08-15",
        eventName: "Voices of Cohort 1.0: OpenMic Magic",
        category: "Workshop"
      },
      {
        id: createId(),
        date: "2025-08-16",
        eventName: "ZScaler Challenge: Testing My Skills Online",
        category: "Competition"
      },
      {
        id: createId(),
        date: "2025-08-17",
        eventName: "Movie Escape: Mahavatar Narsimha at PVR",
        category: "Other"
      },
      {
        id: createId(),
        date: "2025-08-18",
        eventName: "Unboxing the Future: Nothing Buds 2 Reveal",
        category: "Other"
      },
      {
        id: createId(),
        date: "2025-08-21",
        eventName: "Meet & Grow: OpenLearn Accelerate Program Connect",
        category: "Workshop"
      },
      {
        id: createId(),
        date: "2025-08-23",
        eventName: "Celebrating Space: National Space Day & Brahmand 2 Launch",
        category: "Achievement"
      },
      {
        id: createId(),
        date: "2025-08-30",
        eventName: "Welcoming the Next Wave: Club Orientation for Juniors",
        category: "Workshop"
      },
      {
        id: createId(),
        date: "2025-09-06",
        eventName: "Hackathon Chronicles: OpenLearn’s First Challenge at Thapar",
        category: "Hackathon"
      },
      {
        id: createId(),
        date: "2025-09-18",
        eventName: "Journey to Knowledge: Visiting IIT Ropar",
        category: "Trip"
      },
      {
        id: createId(),
        date: "2025-09-22",
        eventName: "Mid-Sem Exam Marathon: Testing the Limits",
        category: "Academic"
      },
      {
        id: createId(),
        date: "2025-09-27",
        eventName: "Road to Adventure: First Bike Trip to Jibhi, HP",
        category: "Trip"
      },
      {
        id: createId(),
        date: "2025-09-29",
        eventName: "Back to Campus: Memories from Himachal",
        category: "Trip"
      },
      {
        id: createId(),
        date: "2025-10-03",
        eventName: "Birthday Vibes & Kantara Movie Night with Rishi",
        category: "Other"
      },
      {
        id: createId(),
        date: "2025-10-10",
        eventName: "Minor Project Evaluation: The Review Day",
        category: "Academic"
      },
      {
        id: createId(),
        date: "2025-10-11",
        eventName: "Prepping the Stage: OpenLearn Grand Orientation",
        category: "Workshop"
      },
      {
        id: createId(),
        date: "2025-10-13",
        eventName: "Grand Orientation Day: 400+ Minds Connect",
        category: "Achievement"
      },
      {
        id: createId(),
        date: "2025-10-15",
        eventName: "Recharge Mode: Mid-Sem Break Begins",
        category: "Academic"
      }
    ]
  },
  {
    year: 4,
    label: "4th Year",
    academicYear: "2026-27",
    isActive: false,
    events: [],
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
