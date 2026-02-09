import type { Metadata } from "next";
import Script from "next/script";
import config from "~/config";

export const getSEOTags = ({
  title,
  description,
  keywords,
  openGraph,
  extraTags,
  noIndex = false,
  canonicalUrlRelative,
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
  const canonicalUrl = canonicalUrlRelative
    ? `https://${config.domainName}${canonicalUrlRelative}`
    : `https://${config.domainName}/`;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    applicationName: config.seo.siteName,
    authors: [{ name: config.appName, url: `https://${config.domainName}` }],
    creator: config.appName,
    publisher: config.appName,
    alternates: {
      canonical: canonicalUrl,
    },
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
        : `https://${config.domainName}/`,
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
      url: canonicalUrl,
      siteName: config.seo.siteName,
      locale: config.seo.locale,
      type: "website",
      // Images are automatically handled by opengraph-image.tsx in each route
      // Only include images if explicitly passed in openGraph config
      ...(openGraph?.images && { images: openGraph.images }),
    },

    twitter: {
      title: openGraph?.title || finalTitle,
      description: openGraph?.description || finalDescription,
      card: "summary_large_image",
      site: config.author.twitter,
      creator: config.author.twitter,
      // Twitter images are automatically handled by twitter-image.tsx or opengraph-image.tsx
      // Only include if explicitly passed
      ...(openGraph?.images && { images: openGraph.images }),
    },

    // Additional meta tags for better social media support and SEO
    other: {
      // WhatsApp and Telegram
      "og:image:width": "1200",
      "og:image:height": "630",
      "twitter:image:width": "1200",
      "twitter:image:height": "630",

      // LinkedIn
      "article:author": config.appName,

      // Discord
      "theme-color": config.colors.main,

      // General social media
      "og:updated_time": new Date().toISOString(),

      // Additional SEO
      "google-site-verification":
        process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
      viewport: "width=device-width, initial-scale=1, maximum-scale=5",
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
          "@context": "https://schema.org",
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
            alternateName: "chahatkesh",
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
              addressCountry: "IN",
              addressRegion: "India",
            },
            nationality: {
              "@type": "Country",
              name: "India",
            },
            knowsAbout: [
              "Web Development",
              "Full Stack Development",
              "Frontend Development",
              "Backend Development",
              "UI/UX Design",
              "Product Design",
              "Software Engineering",
              "React",
              "Next.js",
              "TypeScript",
              "JavaScript",
              "Node.js",
              "MongoDB",
              "Tailwind CSS",
              "API Development",
              "Responsive Web Design",
              "Software Architecture",
            ],
            hasOccupation: {
              "@type": "Occupation",
              name: "Full Stack Developer",
              occupationLocation: {
                "@type": "Country",
                name: "India",
              },
              skills:
                "React, Next.js, TypeScript, Node.js, MongoDB, UI/UX Design",
            },
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

export const renderBreadcrumbSchema = (
  items: { name: string; url: string }[],
) => {
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
