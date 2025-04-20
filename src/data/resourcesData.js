// Data structure for the Resources page

// Development Resources
const devResources = [
  {
    title: "MDN Web Docs",
    description: "Comprehensive resource for web developers with detailed documentation on HTML, CSS, JavaScript and Web APIs.",
    url: "https://developer.mozilla.org/",
    tags: ["Documentation", "Web Development"],
    favorite: true,
  },
  {
    title: "React Documentation",
    description: "Official React documentation covering everything from getting started to advanced concepts.",
    url: "https://react.dev/",
    tags: ["React", "Documentation"],
    favorite: true,
  },
  {
    title: "JavaScript.info",
    description: "Modern JavaScript tutorial with simple explanations and practical examples.",
    url: "https://javascript.info/",
    tags: ["JavaScript", "Tutorial"],
    favorite: false,
  },
  {
    title: "CSS Tricks",
    description: "Tips, tricks, and techniques on using CSS in web development.",
    url: "https://css-tricks.com/",
    tags: ["CSS", "Web Design"],
    favorite: true,
  },
  {
    title: "GitHub Docs",
    description: "Learn how to use GitHub and Git with comprehensive documentation.",
    url: "https://docs.github.com/",
    tags: ["Git", "Version Control"],
    favorite: false,
  },
];

// Design Resources
const designResources = [
  {
    title: "Figma Community Resources",
    description: "Free design resources, UI kits, and templates from the Figma community.",
    url: "https://www.figma.com/community",
    tags: ["UI/UX", "Design Tools"],
    favorite: true,
  },
  {
    title: "Dribbble",
    description: "Design inspiration and showcase platform for designers.",
    url: "https://dribbble.com/",
    tags: ["Design Inspiration", "UI/UX"],
    favorite: false,
  },
  {
    title: "Tailwind UI",
    description: "Beautiful UI components built with Tailwind CSS.",
    url: "https://tailwindui.com/",
    tags: ["UI Components", "Tailwind"],
    favorite: true,
  },
  {
    title: "Unsplash",
    description: "Free high-resolution photos you can use everywhere.",
    url: "https://unsplash.com/",
    tags: ["Photos", "Resources"],
    favorite: true,
  },
  {
    title: "Coolors",
    description: "Color schemes generator and color palette inspiration.",
    url: "https://coolors.co/",
    tags: ["Color", "Design Tools"],
    favorite: false,
  },
];

// Learning Platforms
const learningResources = [
  {
    title: "freeCodeCamp",
    description: "Free coding curriculum with certifications and thousands of interactive coding challenges.",
    url: "https://www.freecodecamp.org/",
    tags: ["Learning", "Free"],
    favorite: true,
  },
  {
    title: "Codecademy",
    description: "Interactive learning platform for various programming languages and technologies.",
    url: "https://www.codecademy.com/",
    tags: ["Interactive Learning", "Coding"],
    favorite: false,
  },
  {
    title: "Frontend Masters",
    description: "In-depth courses on frontend development from industry experts.",
    url: "https://frontendmasters.com/",
    tags: ["Premium", "Frontend"],
    favorite: true,
  },
  {
    title: "Scrimba",
    description: "Interactive coding screencasts where you can edit the code while watching.",
    url: "https://scrimba.com/",
    tags: ["Interactive", "Frontend"],
    favorite: false,
  },
  {
    title: "Coursera",
    description: "Online courses from top universities and companies.",
    url: "https://www.coursera.org/",
    tags: ["Academic", "Certification"],
    favorite: false,
  },
];

// AI & ML Resources
const aiResources = [
  {
    title: "LangChain Documentation",
    description: "Documentation for building AI-powered applications with LangChain.",
    url: "https://js.langchain.com/docs/",
    tags: ["AI", "Documentation"],
    favorite: true,
  },
  {
    title: "Hugging Face",
    description: "The AI community building the future. Hub for models, datasets, and applications.",
    url: "https://huggingface.co/",
    tags: ["AI", "ML Models"],
    favorite: true,
  },
  {
    title: "OpenAI Cookbook",
    description: "Examples and guides for building with OpenAI API.",
    url: "https://cookbook.openai.com/",
    tags: ["OpenAI", "API"],
    favorite: true,
  },
  {
    title: "Pinecone Documentation",
    description: "Vector database for building production-ready vector search applications.",
    url: "https://docs.pinecone.io/",
    tags: ["Vector DB", "Documentation"],
    favorite: false,
  },
  {
    title: "Papers with Code",
    description: "Free and open resource with Machine Learning papers, code, and evaluation tables.",
    url: "https://paperswithcode.com/",
    tags: ["Research", "ML"],
    favorite: false,
  },
];

// Tools & Software
const toolsResources = [
  {
    title: "VS Code",
    description: "Powerful, lightweight code editor with extensive ecosystem of extensions.",
    url: "https://code.visualstudio.com/",
    tags: ["Editor", "Development Tool"],
    favorite: true,
  },
  {
    title: "Postman",
    description: "API platform for building and using APIs with helpful testing tools.",
    url: "https://www.postman.com/",
    tags: ["API", "Testing"],
    favorite: false,
  },
  {
    title: "GitHub Copilot",
    description: "AI pair programmer that helps you write code faster and with less work.",
    url: "https://github.com/features/copilot",
    tags: ["AI", "Productivity"],
    favorite: true,
  },
  {
    title: "Vercel",
    description: "Platform for frontend frameworks and static sites with seamless deployment.",
    url: "https://vercel.com/",
    tags: ["Hosting", "Deployment"],
    favorite: true,
  },
  {
    title: "Docker",
    description: "Platform for developing, shipping, and running applications in containers.",
    url: "https://www.docker.com/",
    tags: ["DevOps", "Containers"],
    favorite: false,
  },
];

// Books & Reading
const bookResources = [
  {
    title: "Eloquent JavaScript",
    description: "Modern introduction to programming with JavaScript by Marijn Haverbeke.",
    url: "https://eloquentjavascript.net/",
    tags: ["JavaScript", "Free Book"],
    favorite: true,
  },
  {
    title: "Clean Code",
    description: "Classic book on writing clean, maintainable code by Robert C. Martin.",
    url: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882",
    tags: ["Software Design", "Best Practice"],
    favorite: true,
  },
  {
    title: "Don't Make Me Think",
    description: "Web usability guide by Steve Krug focused on intuitive navigation and design.",
    url: "https://www.amazon.com/Dont-Make-Think-Revisited-Usability/dp/0321965515/",
    tags: ["UX", "Design"],
    favorite: false,
  },
  {
    title: "Refactoring UI",
    description: "Learn UI design from the creators of Tailwind CSS.",
    url: "https://www.refactoringui.com/book",
    tags: ["UI Design", "Practical Guide"],
    favorite: true,
  },
  {
    title: "You Don't Know JS",
    description: "Series of books diving deep into JavaScript language mechanisms.",
    url: "https://github.com/getify/You-Dont-Know-JS",
    tags: ["JavaScript", "Advanced"],
    favorite: false,
  },
];

export {
  devResources,
  designResources,
  learningResources,
  aiResources,
  toolsResources,
  bookResources
};
