import type { Metadata } from "next";
import Script from "next/script";
import config from "~/config";

export const getSEOTags = ({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  extraTags,
  noIndex = false,
}: Metadata & {
  canonicalUrlRelative?: string;
  extraTags?: Record<string, unknown>;
  noIndex?: boolean;
} = {}) => {
  const finalTitle = title
    ? `${title} | ${config.appName}`
    : config.seo.defaultTitle;

  const finalDescription = description || config.seo.defaultDescription;
  const finalKeywords = keywords || config.seo.defaultKeywords;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    applicationName: config.appName,
    authors: [{ name: config.appName, url: `https://${config.domainName}` }],
    creator: config.appName,
    publisher: config.appName,
    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
      url: true,
    },

    metadataBase: new URL(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : `https://${config.domainName}/`
    ),

    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    }),

    openGraph: {
      title: openGraph?.title || finalTitle,
      description: openGraph?.description || finalDescription,
      url: openGraph?.url || `https://${config.domainName}/`,
      siteName: config.appName,
      locale: config.seo.language,
      type: "website",
      images: [
        {
          url: `https://${config.domainName}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${config.appName} - ${config.appDesignation}`,
        },
      ],
    },

    twitter: {
      title: openGraph?.title || finalTitle,
      description: openGraph?.description || finalDescription,
      card: "summary_large_image",
      site: "@chahatkesh",
      creator: "@chahatkesh",
      images: [`https://${config.domainName}/twitter-image`],
    },

    // Additional meta tags for better social media support
    other: {
      // WhatsApp and Telegram
      "og:image:width": "1200",
      "og:image:height": "630",
      "twitter:image:width": "1200",
      "twitter:image:height": "630",

      // LinkedIn
      "article:author": config.appName,

      // Discord
      "theme-color": "#000000",

      // General social media
      "og:updated_time": new Date().toISOString(),
      ...extraTags,
    },
  };
};

export const renderSchemaTags = () => {
  const currentDate = new Date().toISOString();

  return (
    <Script
      id="schemaTags"
      strategy="afterInteractive"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "ProfilePage",
          name: config.appName,
          description: config.seo.defaultDescription,
          image: `https://${config.domainName}/logo.png`,
          url: `https://${config.domainName}/`,

          dateCreated: config.seo.siteCreationDate,
          dateModified: currentDate,

          mainEntity: {
            "@type": "Person",
            name: config.appName,
            jobTitle: config.appDesignation,
            description: config.seo.defaultDescription,
            url: `https://${config.domainName}/`,
            sameAs: [
              config.social.github,
              config.social.linkedin,
              config.social.twitter,
              config.social.instagram,
              config.social.youtube,
            ],
            image: `https://${config.domainName}/chahat.jpg`,
            email: config.social.email,
            telephone: config.social.phone,
            address: {
              "@type": "PostalAddress",
              addressCountry: "India",
            },
            alumniOf: [
              {
                "@type": "EducationalOrganization",
                name: "Your University Name",
                url: "https://university-url.edu",
              },
            ],
            knowsAbout: [
              "Web Development",
              "React",
              "Next.js",
              "TypeScript",
              "JavaScript",
              "Frontend Development",
              "Software Engineering",
            ],
          },

          applicationCategory: "ProfilePage",
        }),
      }}
    />
  );
};

export const renderOrganizationSchema = () => {
  return (
    <Script
      id="organizationSchema"
      strategy="afterInteractive"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: config.appName,
          url: `https://${config.domainName}`,
          logo: `https://${config.domainName}/logo.png`,
          sameAs: [
            config.social.github,
            config.social.linkedin,
            config.social.twitter,
            config.social.instagram,
            config.social.youtube,
          ],
          contactPoint: {
            "@type": "ContactPoint",
            email: config.social.email,
            telephone: config.social.phone,
            contactType: "Customer Service",
          },
        }),
      }}
    />
  );
};

export const renderBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return (
    <Script
      id="breadcrumbSchema"
      strategy="afterInteractive"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `https://${config.domainName}${item.url}`,
          })),
        }),
      }}
    />
  );
};
