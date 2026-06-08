import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));
const config = jiti("./src/config.ts").default;

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // Allow the OG image proxy route (which carries a `?src=` query string)
    // while keeping the default strict behaviour for all other local images.
    localPatterns: [
      { pathname: "/api/og-image" },
      { pathname: "/**", search: "" },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jklrjucnntkajrda.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  redirects: async () => {
    const redirects = [
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/chahatkesharwani/",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/chahatkesh",
        permanent: true,
      },
      {
        source: "/support",
        destination: "https://buymeacoffee.com/chahatkesh",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/chahat.kesharwanii/",
        permanent: true,
      },
      {
        source: "/twitter",
        destination: "https://x.com/chahatkesh",
        permanent: true,
      },
      {
        source: "/youtube",
        destination: "https://www.youtube.com/@chahatkesh",
        permanent: true,
      },
      {
        source: "/x",
        destination: "https://www.x.com/chahatkesh",
        permanent: true,
      },
      {
        source: "/discord",
        destination: "https://discord.com/users/chahatkesh",
        permanent: true,
      },
      {
        source: "/cal",
        destination: "https://cal.com/chahatkesh/",
        permanent: true,
      },
    ];

    const resumeUrl = config.resumeUrl;
    if (typeof resumeUrl === "string" && resumeUrl.length > 0) {
      redirects.unshift({
        source: "/resume",
        destination: resumeUrl,
        permanent: true,
      });
    }

    return redirects;
  },
};

export default nextConfig;
