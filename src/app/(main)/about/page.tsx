import Image from "next/image";
import { typo } from "~/components/ui/typograpghy";
import { cn } from "~/lib/utils";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import ProfessionalExperience from "~/components/professional-experience";
import chahat from "~/assets/images/chahat.png";
import workspaceImage from "~/assets/images/workspace-desk.jpg";
import BackButton from "~/components/back-btn";
import { MotionDiv } from "~/components/motion-wrapper";
import Link from "next/link";
import { 
  FaLaptopCode, 
  FaBook, 
  FaRunning, 
  FaYoutube,
  FaAward,
  FaBriefcase,
  FaLaptop,
  FaHeadphones,
  FaMobileAlt,
  FaPenFancy
} from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { BiCodeAlt } from "react-icons/bi";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "~/components/ui/tooltip";
import { Metadata } from "next";
import config from "~/config";

export const metadata: Metadata = getSEOTags({
  title: "About Me",
  description: `Learn more about ${config.appName}, a ${config.appDesignation} with experience in web development and software engineering. Discover my journey, skills, and interests.`,
  openGraph: {
    title: `About ${config.appName} - ${config.appDesignation}`,
    description: `Learn more about my background, skills, and journey as a ${config.appDesignation}. Get to know the person behind the code.`,
  },
  canonicalUrlRelative: "/about",
});

// My achievements data
const achievements = [
  {
    title: "Hackathon Winner",
    description: "Won 3+ hackathons and participated in 5+ hackathons & ideathons",
    year: "2023-2025",
    icon: <FaAward className="text-yellow-500" />,
  },
  {
    title: "Freelance Projects",
    description: "Successfully delivered 10+ freelance projects for clients worldwide",
    year: "since 2024",
    icon: <FaBriefcase className="text-blue-400" />,
  },
  {
    title: "Chief Pathfinder",
    description: "Leading initiatives at Openlearn to build educational tools",
    year: "2025",
    icon: <FaLaptopCode className="text-green-500" />,
  },
  {
    title: "Open Source Contributor",
    description: "Active contributor to several open source projects",
    year: "2024-2025",
    icon: <BiCodeAlt className="text-purple-500" />,
  }
];

// My current projects/work
const currentProjects = [
  {
    title: "Agricultural AI Chat System",
    description: "A sophisticated three-level AI chat system designed for agricultural knowledge management, featuring intelligent query classification, cache management, and AI-generated responses.",
    url: "https://github.com/chahatkesh",
    icon: <SiOpenai className="text-teal-500" />,
  },
];

// My hobbies
const hobbies = [
  {
    title: "Reading",
    description: "I enjoy reading non-fiction books on technology, psychology, and personal growth",
    icon: <FaBook className="text-amber-500" />,
  },
  {
    title: "Gym",
    description: "Regular workout sessions to stay fit and maintain a healthy work-life balance",
    icon: <FaRunning className="text-green-400" />,
  },
  {
    title: "Designing",
    description: "Creating visually appealing UI/UX designs and digital artwork in my free time",
    icon: <FaPenFancy className="text-blue-300" />,
  },
  {
    title: "Content Creation",
    description: "Producing educational tech content and tutorials for the developer community",
    icon: <FaYoutube className="text-red-500" />,
  }
];

// My workspace/desk setup
const deskSetup = [
  { name: "MacBook Pro M3 (2023)", icon: <FaLaptop className="text-gray-300" /> },
  { name: "Oppo Enco Buds 2", icon: <FaHeadphones className="text-blue-300" /> },
  { name: "XP Pen Deco01 V2", icon: <FaPenFancy className="text-orange-400" /> },
  { name: "iPhone 15 Pro", icon: <FaMobileAlt className="text-gray-400" /> },
];

const AboutPage = () => {
  return (
    <MotionDiv>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About Me", url: "/about" },
      ])}
      <div className="space-y-12">
        <BackButton />
        <section className="space-y-4">
          {/* Hero Section */}
          <div className="!mt-8 space-y-14">
            <section className="grid gap-8 sm:gap-6 md:grid-cols-3" aria-label="About Me">
              <div className="order-2 space-y-4 sm:order-1 md:col-span-2">
                <h1 className="font-ubuntu text-2xl font-semibold text-white sm:text-3xl">
                  Chahat Kesharwani
                </h1>

                <p className={typo({ variant: "paragraph", font: "sans" })}>
                  <span className="text-white">Hello there! 👋</span> I'm a passionate developer and engineering student from India, focused on creating beautiful, functional web experiences.
                </p>

                <p className={typo({ variant: "paragraph", font: "sans" })}>
                  I specialize in modern web development using React, Next.js, and TypeScript. My journey in tech has been filled with learning, building, and collaborating on projects that solve real problems.
                </p>

                <p className={typo({ variant: "paragraph", font: "sans" })}>
                  Currently, I'm pursuing my engineering degree while working on freelance projects and open-source contributions. I'm passionate about AI integration in web applications and creating intuitive user interfaces.
                </p>

                <p className={cn(typo({ variant: "paragraph", font: "sans" }), "sm:!mt-4")}>
                  Check out my <Link 
                    href="https://drive.google.com/file/d/1ZdX5oQ7PXUymfJ47OFRwR6ijk9D3wzEZ/view?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="el-focus-styles text-ring"
                  >
                    Resume
                  </Link> for more details about my experience and skills.
                </p>
              </div>

              <div className="relative order-1 block aspect-square sm:order-2">
                <div className="absolute inset-0 -z-10 size-full rounded-md bg-[#00adb5]"></div>
                <Image
                  alt="Chahat Kesharwani profile picture"
                  src={chahat}
                  placeholder="blur"
                  className="size-full -rotate-3 transform rounded-md shadow-md"
                  priority
                />
              </div>
            </section>

            {/* My Workspace Section */}
            <section className="mt-10 space-y-6" aria-label="My Workspace">
              <h2 className={typo({ variant: "h2" })}>My Workspace</h2>
              
              <div className="mt-6 space-y-6">
                {/* Full-width workspace image */}
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-neutral-800">
                  <Image 
                    src={workspaceImage} 
                    alt="My workspace setup" 
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                </div>
                
                {/* Setup list below in smaller format */}
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                  {deskSetup.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-neutral-300 transition-transform duration-300 hover:scale-105 hover:text-white">
                      <span className="text-lg">{item.icon}</span>
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Achievements Section */}
            <section className="mt-10 space-y-6" aria-label="Achievements">
              <h2 className={typo({ variant: "h2" })}>Achievements</h2>
              
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 transition-all duration-300 hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-900/20"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800/50">
                          {achievement.icon}
                        </div>
                        <h3 className="font-ubuntu text-base font-medium text-white">{achievement.title}</h3>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs font-medium text-neutral-300">
                        {achievement.year}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-400">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Professional Experience Section */}
            <ProfessionalExperience />

            {/* Current Work Section */}
            <section className="mt-10 space-y-6" aria-label="Current Work">
              <h2 className={typo({ variant: "h2" })}>What I'm Currently Working On</h2>
              
              <div className="mt-4 grid gap-6 sm:grid-cols-1">
                {currentProjects.map((project, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={project.url} target="_blank" rel="noopener noreferrer" className="block">
                          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 transition-all duration-300 hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-900/20">
                            <div className="mb-3 flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800/50">
                                {project.icon}
                              </div>
                              <h3 className="font-ubuntu text-base font-medium text-white">{project.title}</h3>
                            </div>
                            <p className="text-sm text-neutral-400">{project.description}</p>
                          </div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to view project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </section>

            {/* Beyond Code Section */}
            <section className="mt-10 space-y-6" aria-label="Beyond Code">
              <h2 className={typo({ variant: "h2" })}>Beyond Code</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {hobbies.map((hobby, index) => (
                  <div 
                    key={index} 
                    className="group rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 transition-all duration-300 hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-900/20"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800/50 transition-transform duration-300 group-hover:scale-110">
                        {hobby.icon}
                      </div>
                      <h3 className="font-ubuntu text-base font-medium text-white">{hobby.title}</h3>
                    </div>
                    <p className="text-sm text-neutral-400">{hobby.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </MotionDiv>
  );
};

export default AboutPage;
