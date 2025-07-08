import { ConfigProps } from "./types/config";

export const config = {
  appName: "Hi I'm Ayush",
  appDesignation: "Software Developer",
  appDescription: `Hi, I'm Ayush. I'm funny.`,

  domainName: "ayushworks.com",

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
