import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
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
    return [
      {
        source: "/resume",
        destination:
          "https://drive.google.com/file/d/1HEdKZYNu8Q_0Cu2zM0BMCR5lf8XpO_gs/view?usp=sharing",
        permanent: true,
      },
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
  },
};

export default nextConfig;
