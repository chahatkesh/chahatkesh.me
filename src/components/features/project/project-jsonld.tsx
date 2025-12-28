import Script from 'next/script';
import config from '~/config';

interface ProjectJsonLdProps {
  title: string;
  description: string;
  datePublished: string;
  dateStarted?: string;
  dateModified?: string;
  slug: string;
  image?: string;
  tags?: string[];
}

export function ProjectJsonLd({
  title,
  description,
  datePublished,
  dateStarted,
  dateModified,
  slug,
  image,
  tags = [],
}: ProjectJsonLdProps) {
  const projectUrl = `https://${config.domainName}/projects/${slug}`;
  
  return (
    <Script
      id={`project-jsonld-${slug}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          name: title,
          description: description,
          author: {
            '@type': 'Person',
            name: config.appName,
            url: `https://${config.domainName}`,
          },
          datePublished,
          dateModified: dateModified || dateStarted || datePublished,
          codeRepository: projectUrl,
          url: projectUrl,
          ...(image && { image }),
          ...(tags.length > 0 && { keywords: tags.join(', ') }),
          programmingLanguage: tags.filter(tag => 
            ['JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS'].includes(tag)
          ),
        }),
      }}
    />
  );
}
