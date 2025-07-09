export type Theme = "light" | "dark";

export interface ConfigProps {
  appName: string;
  appDescription: string;
  appDesignation: string;
  domainName: string;

  seo: {
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string[];
    language: string;
    siteCreationDate: string;
  };

  social: {
    github: string;
    linkedin: string;
    instagram: string;
    discord: string;
    email: string;
    phone: string;
    youtube: string;
    twitter: string;
    buymeacoffee: string;
  };

  colors: {
    theme: Theme;
    main: string;
  };
  auth: {
    loginUrl: string;
    callbackUrl: string;
  };
}
