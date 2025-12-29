import Script from "next/script";
import config from "~/config";

export function HomeJsonLd() {
  const currentDate = new Date().toISOString();

  return (
    <Script
      id="home-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: config.appName,
          description: config.seo.defaultDescription,
          url: `https://${config.domainName}/`,
          datePublished: config.seo.siteCreationDate,
          dateModified: currentDate,
          author: {
            "@type": "Person",
            name: config.appName,
            jobTitle: config.appDesignation,
            url: `https://${config.domainName}/about`,
          },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `https://${config.domainName}/projects?search={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        }),
      }}
    />
  );
}
