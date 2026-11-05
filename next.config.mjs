/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    // The layout never renders wider than ~57rem, so 2x at 1920 covers it.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days — portfolio images change rarely
    // Allow the OG image proxy route (which carries a `?src=` query string)
    // while keeping the default strict behaviour for all other local images.
    localPatterns: [
      { pathname: "/api/og-image" },
      { pathname: "/**", search: "" },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jklrjucnntkajrda.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/about/writing/:slug.md",
        destination: "/llms/writing/:slug",
      },
    ];
  },
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  redirects: async () => {
    return [
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
