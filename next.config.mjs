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
  },
  redirects: async () => {
    return [
      {
        source: "/resume",
        destination:
          "https://drive.google.com/file/d/1ZdX5oQ7PXUymfJ47OFRwR6ijk9D3wzEZ/view?usp=sharing",
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
    ];
  },
};

export default nextConfig;
