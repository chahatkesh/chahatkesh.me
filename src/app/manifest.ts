import { MetadataRoute } from 'next';
import config from '~/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${config.appName} - ${config.appDesignation}`,
    short_name: config.appName.split(' ')[0],
    description: config.seo.defaultDescription,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    categories: ['portfolio', 'developer', 'technology', 'personal'],
    lang: 'en-US',
    dir: 'ltr',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
