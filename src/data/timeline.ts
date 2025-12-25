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
  // {
  //   id: createId(),
  //   startDate: '',
  //   title: '',
  //   description: '',
  //   category: 'other',
  //   links: [
  //     { title: '', url: '', icon: '' },
  //   ],
  //   location: '',
  // },
  {
    id: createId(),
    startDate: '2025-04-10',
    endDate: '2025-04-12',
    title: 'Volunteer at Hackmol 6.0',
    description: 'Volunteered at Hackmol 6.0, one of North India’s largest hackathons, hosted during Utakansh — the techno-cultural fest of the college. Supported onsite execution for 400+ participants, gaining hands-on experience in event coordination and community management.',
    category: 'workshop',
    links: [
      { title: 'Post', url: 'https://www.instagram.com/p/DIvKqPCzkHa/', icon: 'instagram' },
      { title: 'Website', url: 'https://hackmol.com/', icon: 'website' }
    ],
    location: '',
  },
  {
    id: createId(),
    startDate: '2025-04-03',
    endDate: '2025-04-05',
    title: 'Attended Startup Mahakumbh at Bharat Mandapam',
    description: 'Visited Bharat Mandapam, Delhi with Davinder and Vatsal to attend Startup Mahakumbh. Witnessed an ocean of startups, innovative ideas, and emerging technologies, making it an inspiring exposure to India’s growing startup ecosystem.',
    category: 'learning',
    links: [
      { title: 'View Post', url: 'https://www.instagram.com/p/DIqQLLPTvRJ/', icon: 'instagram' },
    ],
    location: 'Bharat Mandapam, New Delhi, India',
  },
  {
    id: createId(),
    startDate: '2024-10-11',
    endDate: '2024-10-14',
    title: 'Spiritual Trip to Mathura & Vrindavan',
    description: 'Went on a spiritual trip to Mathura, Vrindavan, and Barsana with four friends. The journey was filled with devotion, peaceful moments, and meaningful experiences at some of the most sacred places of Lord Krishna.',
    category: 'travel',
    location: 'Vrindavan, Uttar Pradesh, India',
  },
  {
    id: createId(),
    startDate: '2025-09-27',
    endDate: '2025-09-29',
    title: 'Bike Trip to Jibhi & Raghupur Fort Trek',
    description: 'Went on a bike trip from NIT Jalandhar to Jibhi, Himachal Pradesh with three friends. Trekked to Raghupur Fort at around 12,000 ft, experienced local Himachali food, and enjoyed the thrill of riding through mountain roads.',
    category: 'travel',
    location: 'Jibhi, Himachal Pradesh, India',
  },
  {
    id: createId(),
    startDate: '2025-12-20',
    endDate: '2025-12-23',
    title: 'Himachal Trip & Paragliding at Bir Billing',
    description: 'Went on a road trip with three friends exploring Manali, Atal Tunnel, Gramphu, Kasol, Manikaran, Bir, and Billing. Experienced paragliding at Bir Billing, known as the paragliding capital of India, making it a perfect mix of adventure, travel, and unforgettable memories.',
    category: 'travel',
    location: 'Himachal Pradesh, India',
  },
  {
    id: createId(),
    startDate: '2025-06-25',
    endDate: '2025-06-27',
    title: 'Visit to Shri Mata Vaishno Devi Temple',
    description: 'Visited Mata Vaishno Devi Temple in Katra, Jammu with two of the most special people. A peaceful and memorable journey filled with devotion, reflection, and gratitude.',
    category: 'travel',
    location: 'Katra, Jammu & Kashmir, India',
  },
  {
    id: createId(),
    startDate: '2024-02-17',
    endDate: '2024-02-18',
    title: 'Visit to Shri Mata Vaishno Devi Temple',
    description: 'Visited Mata Vaishno Devi in Katra during the second semester of college with a group of 12 friends. The trip was a memorable blend of devotion, friendship, and shared experiences.',
    category: 'travel',
    location: 'Katra, Jammu & Kashmir, India',
  },
  {
    id: createId(),
    startDate: '2025-08-28',
    title: 'Launched OpenLearn V2',
    description: 'Launched OpenLearn V2 with an improved user experience and several new features, focusing on better usability, smoother learning flows, and a more scalable foundation for the community.',
    category: 'project',
    links: [
      { title: 'Launch Post', url: 'https://x.com/OpenLearn_NITJ/status/1960859569720320340/', icon: 'twitter' },
      { title: 'Visit Website', url: 'https://openlearn.org.in/', icon: 'website' }
    ],
    location: 'Remote',
  },
  {
    id: createId(),
    startDate: '2025-11-15',
    title: 'Attended SMX Tour – Seedhe Maut Live',
    description: 'Attended the Seedhe Maut SMX Tour in Chandigarh and experienced the duo live for the first time. Being in the moshpit and singing along with thousands of fans captured the raw energy and vibe of a live hip-hop concert.',
    category: 'other',
    links: [
      { title: 'Highlights', url: 'https://www.instagram.com/reel/DRmSUqvEluH/', icon: 'instagram' },
    ],
    location: 'Chandigarh, India',
  },
  {
    id: createId(),
    startDate: '2023-08-16',
    endDate: 'present',
    title: 'Started B.Tech at NIT Jalandhar',
    description: 'Began my undergraduate journey at Dr. B. R. Ambedkar National Institute of Technology, Jalandhar, pursuing a B.Tech degree and stepping into a new phase of learning, growth, and exploration.',
    category: 'learning',
    links: [
      { title: 'View Post', url: 'https://www.linkedin.com/posts/chahatkesharwani_i-am-thrilled-to-announce-that-i-have-been-activity-7103987077058318337-OC_v/', icon: 'linkedin' },
      { title: 'Details', url: '/about/journey/btech', icon: 'blog' }
    ],
    location: 'NIT Jalandhar, Punjab, India',
  },
  {
    id: createId(),
    startDate: '2024-11-28',
    title: 'Built LPG Leakage Detection System',
    description: 'Worked on an LPG Leakage Detection System using an MQ-2 sensor and Arduino. The system detects gas leaks, triggers an alarm, cuts off the simulated power supply, and activates an exhaust fan to reduce risk. A simple yet effective automation project focused on household safety.',
    category: 'project',
    links: [
      { title: 'View Post', url: 'https://www.linkedin.com/posts/sadgi-saraswat-17637a31a_me-together-with-vanshika-soni-chahat-kesharwani-activity-7277338238179045376-ElSF/', icon: 'linkedin' },
    ],
    location: 'NIT Jalandhar, Punjab, India',
  },
  {
    id: createId(),
    startDate: '2025-01-04',
    endDate: '2025-01-12',
    title: '9 Days of Exploration – IOTA Community',
    description: 'Organized the 9 Days of Exploration session series under the IOTA community from January 4–12, 2025. The initiative connected with 300+ first-year students, helping them explore domains like Web, App Dev, UI/UX, ML, DSA, DevOps, Cybersecurity, and more.',
    category: 'workshop',
    links: [
      { title: 'Session Website', url: 'https://iota-sessions.onrender.com/', icon: 'website' },
      { title: 'View Post', url: 'https://www.linkedin.com/posts/chahatkesharwani_learningandgrowing-iotacommunity-studentcommunity-activity-7284173831433265152-oJ9g/', icon: 'linkedin' }
    ],
    location: 'Online',
  },
  {
    id: createId(),
    startDate: '2025-02-21',
    title: 'Participated in Code Kshetra 2.0',
    description: 'Participated in Code Kshetra 2.0, a 36-hour national hackathon where our team built Satark AI, an AI-powered legal assistant designed to simplify legal workflows using GenAI and RAG. We made it to the offline finalist round among thousands of participants, gaining hands-on experience, new connections, and a memorable learning journey.',
    category: 'hackathon',
    links: [
      { title: 'Devfolio', url: 'https://devfolio.co/projects/satark-ai-b0ee', icon: 'devfolio' },
      { title: 'View Post', url: 'https://www.linkedin.com/posts/chahatkesharwani_codekshetra2-hackathon-learningandgrowth-activity-7299509464628428802-pafE/', icon: 'linkedin' }
    ],
    location: 'JIMS Rohini, Delhi, India',
  },
  {
    id: createId(),
    startDate: '2025-02-08',
    title: 'Participated in HackTU 6.0',
    description: 'Participated in a 24-hour hackathon at Thapar University, where we built ServoLend, an AI-driven loan origination platform. The project used LangChain, Gemini, ML-based risk assessment, Google Auth, and a dual backend with Node.js and FastAPI. It was a fast-paced experience filled with teamwork, late-night debugging, and rapid problem-solving.',
    category: 'hackathon',
    links: [
      { title: 'Devfolio', url: 'https://devfolio.co/projects/servolend-f1da', icon: 'devfolio' },
      { title: 'View Post', url: 'https://www.linkedin.com/posts/chahatkesharwani_hackathon-tech-learning-activity-7295183312657031168-Js7C/', icon: 'linkedin' },
    ],
    location: 'Thapar University, Patiala, India',
  },
  {
    id: createId(),
    startDate: '2025-01-25',
    endDate: '2025-02-25',
    title: 'Frontend Internship at Level SuperMind',
    description: 'Worked as a Frontend Development Intern at Level SuperMind, building features for a large-scale religious services platform using Next.js. The internship focused on real-world product development, agile workflows, and integrating frontend components into a fast-moving production environment.',
    category: 'work',
    links: [
      { title: 'LOR', url: 'https://drive.google.com/file/d/1pW29WoNlRcr4M387cyPefGBqJ631TgKX/view?usp=sharing', icon: 'document' },
      { title: 'View Announcement', url: 'https://www.linkedin.com/posts/chahatkesharwani_hackathon-internship-coding-activity-7290334676211118080-_2de/', icon: 'linkedin' }
    ],
    location: 'Remote',
  },
  {
    id: createId(),
    startDate: '2025-01-19',
    title: '2nd Place – Level SuperMind National Hackathon',
    description: 'Won 2nd place at Level SuperMind’s National Hackathon in Mumbai among 23,000+ participants. Our team built SoulBuddy, an AI-powered spiritual guide trained on 30,000+ data points within 15 hours. I contributed to the UI and frontend. The project received strong appreciation from the judging panel for its design, functionality, and real-time chatbot experience.',
    category: 'hackathon',
    links: [
      { title: 'CodeBase', url: 'https://github.com/chahatkesh/soulbuddy.ai', icon: 'github' },
      { title: 'Demo', url: 'https://youtu.be/AS8gnSInEF4/', icon: 'youtube' },
      { title: 'View Post', url: 'https://www.linkedin.com/posts/chahatkesharwani_hackathon-coding-innovation-activity-7287731589751455744-kiz5/', icon: 'linkedin' }
    ],
    location: 'Schabang Office, Mumbai, India',
  },
  {
    id: createId(),
    startDate: '2024-11-28',
    endDate: 'present',
    title: 'Joined GDGC NITJ as Core Member',
    description: 'Became a core member of Google Developer Group on Campus NIT Jalandhar, contributing to the UI/UX and Web Development team and supporting design and development initiatives within the community.',
    category: 'achievement',
    links: [
      { title: 'View Post', url: 'https://www.instagram.com/p/DE2w15FhvDn/', icon: 'instagram' },
      { title: 'Github Organisation', url: 'https://github.com/gdgcnitj/', icon: 'website'}
    ],
    location: 'NIT Jalandhar, Punjab, India',
  },
  {
    id: createId(),
    startDate: '2025-11-19',
    title: 'Automated Refractive Index Measurement System',
    description: 'Built an automated optical system that measures the refractive index of liquids using a hollow prism and real-time image processing. The setup used an ESP32-CAM to track laser deviation and OpenCV to detect the beam shift, calculate the deviation angle, and compute the refractive index using Snell’s Law.',
    category: 'project',
    links: [
      { title: 'View Post', url: 'https://www.linkedin.com/posts/chahatkesharwani_excited-to-share-a-project-our-team-recently-activity-7398305255446335488-qWGt/', icon: 'linkedin' },
    ],
    location: 'NIT Jalandhar, Punjab, India',
  },
  {
    id: createId(),
    startDate: '2025-11-08',
    title: 'Winner – AWS Partner Track at HackCBS 8.0',
    description: 'Won the AWS Partner Track at HackCBS 8.0 with our project Swasya AI. Participated in the 24-hour hackathon at Saheed Sukhdev College of Business Studies, where we built an AI-powered tool that listens to patient conversations, extracts key details, and generates quick medical summaries to support doctors before consultations. Our team was awarded a $250 cash prize for the win.',
    category: 'hackathon',
    links: [
      { title: 'Devfolio', url: 'https://devfolio.co/projects/swasya-ai-bf6e', icon: 'devfolio' },
      { title: 'View Post', url: 'https://www.linkedin.com/posts/chahatkesharwani_hackcbs-hackathon-activity-7405285073060532224-yNPS/', icon: 'linkedin' },
    ],
    location: 'Saheed Sukhdev College, Delhi, India',
  },
  {
    id: createId(),
    startDate: '2025-11-03',
    title: 'Product Presentation to GOI & MeitY Delegation',
    description: 'Presented our Agri-Tech work during a strategic meeting with leaders from the Government of India, IIT Ropar, and MeitY. Shared insights, discussed impact, and showcased how our work can support the agriculture ecosystem.',
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
    description: 'Started my journey as an Entrepreneur-in-Residence at iHub AwaDH IIT Ropar, where I work full-time on a project supported and backed by the iHub AwaDH.',
    category: 'work',
    links: [
      { title: 'Visit iHub AwaDH', url: 'https://ihub-awadh.in/', icon: 'website' },
      { title: 'View Announcement', url: 'https://www.linkedin.com/posts/chahatkesharwani_im-happy-to-share-that-im-starting-a-new-activity-7382848439652593664-gJYU/', icon: 'linkedin' }
    ],
    location: 'Hybrid, IIT Ropar',
  },
  {
    id: createId(),
    startDate: '2025-09-06',
    title: 'Mentor at Bit N Build Punjab Round',
    description: 'Invited as a mentor for the Bit N Build Punjab Round at Thapar University. Guided 30+ teams across 120+ participants, helping them refine ideas, improve prototypes, and navigate the hackathon process.',
    category: 'hackathon',
    links: [
      { title: 'Event Details', url: 'https://www.openlearn.org.in/events/hackathon-1', icon: 'website' },
      { title: 'View Post', url: 'https://www.instagram.com/p/DOEclMdkzPo/', icon: 'instagram' },
      { title: 'View Post', url: 'https://www.linkedin.com/posts/chahatkesharwani_hackathon-tech-openlearn-activity-7372724850840367104-_gTg/', icon: 'linkedin' }
    ],
    location: 'Thapar University, Patiala, India',
  },
  {
    id: createId(),
    startDate: '2025-05-05',
    endDate: '2025-10-04',
    title: 'Annam AI Research Intern - IIT Ropar',
    description: 'Contributed to the frontend and system architecture of Agri-Tech solutions at Annam AI, working with the IIT Ropar research team on ML-driven agricultural applications.',
    category: 'work',
    links: [
      { title: 'Visit Annam AI', url: 'https://annam.ai/', icon: 'website' },
      { title: 'View Announcement', url: 'https://www.linkedin.com/posts/chahatkesharwani_im-happy-to-share-that-im-starting-a-new-activity-7328306685486264320-6L9d/', icon: 'linkedin' }
    ],
    location: 'Remote',
  },
  {
    id: createId(),
    startDate: '2025-06-13',
    title: 'OpenLearn - Educational Organization',
    description: 'Co-founded OpenLearn, a student-run community with 400+ learners. It’s a space where students learn together, share knowledge, and grow with a long-term vision of turning what we learn into real, impactful products.',
    category: 'project',
    links: [
      { title: 'Visit OpenLearn', url: 'https://openlearn.org.in/', icon: 'website' },
      { title: 'Story Board', url: 'https://www.instagram.com/openlearn.org.in/', icon: 'instagram' }
    ],
    location: 'Remote',
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
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to count inclusively
  
  if (diffDays === 1) return 'Single day';
  if (diffDays === 2) return '2 days';
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