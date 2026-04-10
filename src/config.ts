import { type ConfigProps } from "./types/config";

export const config = {
  appName: "Chahat Kesharwani",
  appDesignation: "Engineer · Builder · Explorer",
  appDescription: `I'm Chahat, an engineer who builds products people actually use. I care deeply about architecture, ship fast, and find the most satisfaction in systems that just work. Currently building AI-powered products at Zenbase, Singapore.`,
  domainName: "chahatkesh.me",
  author: {
    name: "Chahat Kesharwani",
    email: "ckesharwani4@gmail.com",
    url: "https://chahatkesh.me",
    github: "chahatkesh",
    twitter: "@chahatkesh",
  },

  seo: {
    titleTemplate: "%s | Chahat Kesharwani",
    defaultTitle: "Chahat Kesharwani - Engineer · Builder · Explorer",
    defaultDescription:
      "Engineer, builder, and explorer from India. I build AI-powered products, ship production-grade frontends, and care deeply about craft. Founding engineer at Zenbase (Singapore). Explore my projects, experience, and journey.",
    defaultKeywords: [
      "Chahat Kesharwani",
      "chahatkesh",
      "engineer builder explorer",
      "product builder",
      "startup engineer",
      "frontend engineer",
      "full stack developer",
      "AI products",
      "React developer",
      "Next.js developer",
      "TypeScript developer",
      "software engineer India",
      "portfolio website",
      "Zenbase",
      "open source developer",
      "hackathon winner",
      "NIT Jalandhar",
    ],
    language: "en-US",
    locale: "en_US",
    siteCreationDate: "2025-07-05",
    siteName: "Chahat Kesharwani Portfolio",
    siteType: "portfolio",
  },

  location: {
    city: "India",
    country: "India",
    countryCode: "IN",
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
} as ConfigProps;

export default config;
