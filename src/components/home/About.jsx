import { Code, GraduationCap, Briefcase, Users } from "lucide-react";

export default function AboutSection() {
  // Skills categories with items
  const skills = [
    {
      category: "Languages",
      items: ["C++", "C", "Python", "JavaScript", "TypeScript"],
    },
    {
      category: "Frontend",
      items: [
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "Chakra UI",
        "Shadcn UI",
        "Aceternity UI",
        "Framer Motion",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express.js",
        "RESTful APIs",
        "OpenAI API",
        "GitHub API",
      ],
    },
    {
      category: "Database",
      items: ["MongoDB", "SQL"],
    },
    {
      category: "AI/ML Tools",
      items: [
        "LangChain",
        "Retrieval-Augmented Generation (RAG)",
        "Vector Databases (Weaviate, Pinecone)",
      ],
    },
  ];

  // Experience items
  const experience = [
    {
      title: "Fullstack Developer",
      company: "Level SuperMind",
      period: "Mar 2025 - May 2025",
      description:
        "Constructed 15+ reusable UI components with 30% faster load times; integrated 5+ third-party APIs. Improved onboarding experience, reducing onboarding time by 25%.",
      tech: "Next.js, TypeScript, Tailwind CSS, ShadCN UI, LiveKit, Framer Motion",
    },
    {
      title: "Frontend Developer",
      company: "Xceed NITJ",
      period: "Nov 2023 - Jun 2024",
      description:
        "Worked with 22 developers to build a Certificate Module for bulk certificate generation and distribution. Structured an intuitive interface for professors and college clubs.",
      tech: "React.js, Tailwind CSS, Chakra UI, Axios, Framer Motion, html2Canvas",
    },
  ];

  // Community involvement
  const community = [
    {
      role: "Core Member",
      organization: "Google Developers Group on Campus",
      period: "Nov 2024 - present",
      description:
        "Led tech workshops, mentored juniors, and volunteered for HackMol 6.0 from planning through execution.",
    },
    {
      role: "Co-ordinator",
      organization: "Internet Optimization & Technology Analytics Club",
      period: "Jul 2024 - present",
      description:
        "Led a 9-day tech exploration series with 300+ attendees, coordinating logistics, speakers, and marketing.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl">
            I'm a passionate developer focused on creating elegant, functional,
            and user-friendly web applications. With expertise in both frontend
            and backend technologies, I enjoy turning complex problems into
            simple, beautiful, and intuitive solutions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-md mr-4">
                  <GraduationCap size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Education</h3>
                  <p className="text-gray-500 text-sm">NIT Jalandhar</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  B.Tech in Instrumentation and Control
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  Aug 2023 - Jun 2027
                </p>
                <p className="text-gray-600 mt-2">Cumulative GPA: 8.42/10.0</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-100 rounded-md mr-4">
                  <Code size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Core Competencies
                  </h3>
                  <p className="text-gray-500 text-sm">Technical Foundation</p>
                </div>
              </div>
              <ul className="text-gray-600 space-y-1">
                <li>Data Structures & Algorithms (DSA)</li>
                <li>Object-Oriented Programming (OOP)</li>
                <li>JSON Web Token Authentication</li>
                <li>Secure API Design</li>
                <li>Responsive Design</li>
                <li>UI/UX Best Practices</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Briefcase size={20} className="mr-2" />
            Work Experience
          </h3>

          <div className="space-y-6">
            {experience.map((job, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {job.title}
                    </h4>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <span className="mt-2 md:mt-0 text-sm text-gray-500">
                    {job.period}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{job.description}</p>
                <div className="bg-gray-50 px-4 py-2 rounded-md">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Tech Stack:</span> {job.tech}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Technical Skills
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-medium text-gray-900 mb-4">
                  {skillGroup.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Users size={20} className="mr-2" />
            Community Involvement
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {community.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {item.role}
                    </h4>
                    <p className="text-gray-600">{item.organization}</p>
                  </div>
                  <span className="mt-2 md:mt-0 text-sm text-gray-500">
                    {item.period}
                  </span>
                </div>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
