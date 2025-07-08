import { ConfigProps } from "./types/config";

export const config = {
  appName: "Chahat Kesharwani",
  appDesignation: "Software Developer",
  appDescription: `Hi, I'm Chahat Kesharwani. I'm a passionate software developer specializing in web development, creating engaging user experiences with modern technologies like React, Next.js, and TypeScript.`,
  domainName: "chahatkesh.me",

  seo: {
    titleTemplate: "%s | Chahat Kesharwani",
    defaultTitle: "Chahat Kesharwani - Software Developer Portfolio",
    defaultDescription: "Software Developer specializing in web development with React, Next.js and TypeScript. Check out my projects, skills, and experience.",
    defaultKeywords: [
      "Chahat Kesharwani",
      "software developer",
      "web developer",
      "React developer",
      "Next.js developer",
      "TypeScript developer",
      "portfolio",
      "frontend engineer",
      "fullstack developer",
    ],
    language: "en-US",
    siteCreationDate: "2023-01-01",
  },

  colors: {
    theme: "dark",
    main: "#000000",
  },

  social: {
    github: "https://github.com/chahatkesh",
    linkedin: "https://www.linkedin.com/in/chahatkesharwani/",
    instagram: "https://www.instagram.com/chahat.kesharwanii/",
    discord: "https://discordapp.com/users/chahatkesh/",
    email: "ckesharwani4@gmail.com",
    phone: "+919170602005",
    youtube: "https://www.youtube.com/@chahatkesh",
    twitter: "https://x.com/chahatkesh",
    buymeacoffee: "https://buymeacoffee.com/chahatkesh",
  },

  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/dashboard",
  },
} as ConfigProps;

export default config;
