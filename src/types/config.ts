export type Theme = "light" | "dark";

export interface ConfigProps {
  appName: string;
  appDescription: string;
  appDesignation: string;
  domainName: string;

  author: {
    name: string;
    email: string;
    url: string;
    github: string;
    twitter: string;
  };

  seo: {
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string[];
    language: string;
    locale: string;
    siteCreationDate: string;
    siteName: string;
    siteType: string;
  };

  location: {
    city: string;
    country: string;
    countryCode: string;
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
}
