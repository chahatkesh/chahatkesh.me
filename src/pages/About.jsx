import React from "react";
import {
  GraduationCap,
  Award,
  Users,
  Code,
  Trophy,
  Briefcase,
} from "lucide-react";
import LetsTalk from "../components/common/LetsTalk";
// Import icons from React Icons library
import {
  SiCplusplus,
  SiC,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiChakraui,
  SiShadcnui,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiDocker,
  SiGooglecloud,
  SiFramer,
  SiOpenai,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { FaAws, FaDatabase } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import { VscAzure } from "react-icons/vsc";

// Import data files
import experienceData from "../data/experienceData";
import achievementData from "../data/achievementData";
import awardsData from "../data/awardsData";
import communityData from "../data/communityData";

export default function AboutPage() {
  // Define skill arrays for better maintainability
  const languageSkills = [
    { name: "C++", icon: <SiCplusplus className="mr-1" /> },
    { name: "C", icon: <SiC className="mr-1" /> },
    { name: "Python", icon: <SiPython className="mr-1" /> },
    { name: "JavaScript", icon: <SiJavascript className="mr-1" /> },
    { name: "TypeScript", icon: <SiTypescript className="mr-1" /> },
  ];

  const frontendSkills = [
    { name: "React.js", icon: <SiReact className="mr-1" /> },
    { name: "Next.js", icon: <SiNextdotjs className="mr-1" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="mr-1" /> },
    { name: "Chakra UI", icon: <SiChakraui className="mr-1" /> },
    { name: "Shadcn UI", icon: <SiShadcnui className="mr-1" /> },
    { name: "Aceternity UI", icon: <SiReact className="mr-1" /> },
    { name: "Framer Motion", icon: <SiFramer className="mr-1" /> },
  ];

  const backendSkills = [
    { name: "Node.js", icon: <SiNodedotjs className="mr-1" /> },
    { name: "Express.js", icon: <SiExpress className="mr-1" /> },
    { name: "RESTful APIs", icon: <TbApi className="mr-1" /> },
    { name: "OpenAI API", icon: <SiOpenai className="mr-1" /> },
    { name: "GitHub API", icon: <SiGithub className="mr-1" /> },
    { name: "Third-Party Integrations", icon: <TbApi className="mr-1" /> },
  ];

  const databaseAndCloudSkills = [
    { name: "MongoDB", icon: <SiMongodb className="mr-1" /> },
    { name: "SQL", icon: <SiMysql className="mr-1" /> },
    { name: "Git", icon: <SiGit className="mr-1" /> },
    { name: "GitHub", icon: <SiGithub className="mr-1" /> },
    { name: "Docker", icon: <SiDocker className="mr-1" /> },
    { name: "GitHub Actions", icon: <SiGithub className="mr-1" /> },
    { name: "AWS", icon: <FaAws className="mr-1" /> },
    { name: "GCP", icon: <SiGooglecloud className="mr-1" /> },
    { name: "Azure", icon: <VscAzure className="mr-1" /> },
  ];

  const aiMlTools = [
    { name: "LangChain", icon: <BsRobot className="mr-1" /> },
    {
      name: "Retrieval-Augmented Generation (RAG)",
      icon: <BsRobot className="mr-1" />,
    },
    {
      name: "Vector Databases (Weaviate, Pinecone)",
      icon: <FaDatabase className="mr-1" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#37352f] flex flex-col">
      <main className="flex-1">
        <section className="py-16 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          {/* Notion-like header with profile */}
          <div className="flex items-center gap-6 mb-10 border-b border-[#e6e6e6] pb-10">
            <div className="relative">
              <img
                src="/profile.jpg"
                alt="Chahat Kesharwani"
                className="w-24 h-24 aspect-square object-cover rounded-lg shadow-sm border-2 border-white"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/96x96?text=CK";
                }}
              />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-semibold mb-1 tracking-tight">
                Chahat Kesharwani
              </h1>
              <p className="text-sm md:text-lg text-gray-600">
                Full-stack Developer & UI/UX Designer
              </p>
              <div className="hidden md:flex gap-2 mt-2">
                <span className="bg-gray-100 text-gray-600 pl-1 pr-2 py-1 rounded-md text-xs flex items-center">
                  <Code size={12} className="mr-1" /> Engineering Student at
                  NITJ
                </span>
              </div>
            </div>
          </div>

          {/* Introduction with real content */}
          <div className="mb-10">
            <div className="text-lg mb-4 font-medium text-gray-800">
              👋 Hey, I'm Chahat
            </div>
            <p className="mb-4 leading-relaxed text-gray-700">
              I'm a passionate Full-stack Developer and UI/UX Designer at NIT
              Jalandhar, dedicated to creating impactful solutions through
              technology. With a strong foundation in both development and
              design, I love tackling complex problems and turning innovative
              ideas into reality through hackathons and collaborative projects.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              My focus is on building innovative solutions through code and
              design, combining technical expertise with creative
              problem-solving to deliver exceptional digital experiences.
            </p>
          </div>

          {/* Achievement Highlights */}
          <div className="mb-12 p-5 bg-[#f7f6f3] rounded-lg border border-[#e6e6e6]">
            <h2 className="text-xl font-medium mb-4 flex items-center text-gray-800">
              <Trophy size={18} className="mr-2 text-[#ff8c38]" /> Achievement
              Highlights
            </h2>
            <ul className="space-y-3">
              {achievementData.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">{achievement.icon}</span>
                  <span>{achievement.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Non-collapsible Sections - Notion Style */}
          <div className="space-y-12">
            {/* Experience Section */}
            <div className="bg-white rounded-lg border-t border-[#f0f0f0] pt-10">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-md bg-[#e3f5e6] text-[#0e9d3a] mr-3">
                  <Briefcase size={20} />
                </div>
                <h2 className="text-xl font-medium">Professional Experience</h2>
              </div>
              <div className="space-y-8 ml-2">
                {experienceData.map((experience, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium">{experience.title}</h3>
                      <span className="text-sm text-gray-500">
                        {experience.period}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-1">
                      {experience.company}{" "}
                      <span className="text-xs text-gray-500">
                        {experience.location}
                      </span>
                    </p>
                    <ul className="text-sm space-y-1 text-gray-700 list-disc pl-4 mt-2">
                      {experience.responsibilities.map(
                        (responsibility, idx) => (
                          <li key={idx}>{responsibility}</li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-lg border-t border-[#f0f0f0] pt-10">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-md bg-[#e1f0ff] text-[#2382FC] mr-3">
                  <Code size={20} />
                </div>
                <h2 className="text-xl font-medium">Technical Skills</h2>
              </div>
              <div className="space-y-6 ml-2">
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-gray-700 font-medium mb-3 pb-1 border-b border-gray-200">
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {languageSkills.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1 bg-gray-50 text-gray-800 text-sm rounded-md border border-gray-200 hover:bg-gray-100 transition-colors flex items-center">
                        {skill.icon} {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-gray-700 font-medium mb-3 pb-1 border-b border-gray-200">
                    Frontend
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {frontendSkills.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1 bg-gray-50 text-gray-800 text-sm rounded-md border border-gray-200 hover:bg-gray-100 transition-colors flex items-center">
                        {skill.icon} {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-gray-700 font-medium mb-3 pb-1 border-b border-gray-200">
                    Backend
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {backendSkills.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1 bg-gray-50 text-gray-800 text-sm rounded-md border border-gray-200 hover:bg-gray-100 transition-colors flex items-center">
                        {skill.icon} {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-gray-700 font-medium mb-3 pb-1 border-b border-gray-200">
                    Database & Cloud
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {databaseAndCloudSkills.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1 bg-gray-50 text-gray-800 text-sm rounded-md border border-gray-200 hover:bg-gray-100 transition-colors flex items-center">
                        {skill.icon} {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-gray-700 font-medium mb-3 pb-1 border-b border-gray-200">
                    AI/ML Tools
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {aiMlTools.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1 bg-gray-50 text-gray-800 text-sm rounded-md border border-gray-200 hover:bg-gray-100 transition-colors flex items-center">
                        {skill.icon} {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Education Section */}
            <div className="bg-white rounded-lg border-t border-[#f0f0f0] pt-10">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-md bg-[#fff3e1] text-[#ff8c38] mr-3">
                  <GraduationCap size={20} />
                </div>
                <h2 className="text-xl font-medium">Education</h2>
              </div>
              <div className="ml-2">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">
                    Dr. B. R. Ambedkar National Institute of Technology
                    Jalandhar
                  </h3>
                  <span className="text-sm text-gray-500">
                    Aug 2023 — Jun 2027
                  </span>
                </div>
                <p className="text-gray-600 mb-1">
                  B.Tech in Instrumentation and Control
                </p>
                <p className="text-sm text-gray-500">
                  Cumulative GPA: 8.42/10.0
                </p>
              </div>
            </div>
            {/* Awards & Achievements Section */}
            <div className="bg-white rounded-lg border-t border-[#f0f0f0] pt-10">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-md bg-[#f9e9fd] text-[#bf4ec5] mr-3">
                  <Award size={20} />
                </div>
                <h2 className="text-xl font-medium">Awards & Achievements</h2>
              </div>
              <div className="space-y-6 ml-2">
                {awardsData.map((award, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium">{award.title}</h3>
                      <span className="text-sm text-gray-500">
                        {award.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{award.description}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Community Section */}
            <div className="bg-white rounded-lg border-t border-[#f0f0f0] pt-10">
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-md bg-[#fff0e0] text-[#ff9933] mr-3">
                  <Users size={20} />
                </div>
                <h2 className="text-xl font-medium">Community</h2>
              </div>
              <div className="space-y-6 ml-2">
                {communityData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium">{item.organization}</h3>
                      <span className="text-sm text-gray-500">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-1">{item.role}</p>
                    <p className="text-sm text-gray-700">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Replace Contact Section with LetsTalk component */}
          <div className="mt-12">
            <LetsTalk />
          </div>
        </section>
      </main>
    </div>
  );
}
