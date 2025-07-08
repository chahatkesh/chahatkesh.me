export interface Post {
  title: string;
  slug: string;
  slugAsParams: string;
  description: string;
  date: string;
  published: boolean;
  cover?: string;
  tags: string[];
  metadata?: {
    readingTime?: number;
    wordCount?: number;
  };
  toc?: any[]; // Table of contents
  body?: string; // Content body
}

// Static blog posts data
export const posts: Post[] = [
  {
    title: "Welcome to My Blog",
    slug: "/blog/welcome",
    slugAsParams: "welcome",
    description: "Welcome to my personal blog where I share insights about web development, AI, and technology.",
    date: "2024-01-01",
    published: true,
    cover: "/images/blog/welcome.jpg",
    tags: ["welcome", "blog", "introduction"],
    metadata: {
      readingTime: 5,
      wordCount: 1200,
    },
  },
  {
    title: "Getting Started with Next.js 14",
    slug: "/blog/nextjs-14-guide",
    slugAsParams: "nextjs-14-guide",
    description: "A comprehensive guide to getting started with Next.js 14 and its new features.",
    date: "2024-02-15",
    published: true,
    cover: "/images/blog/nextjs-14.jpg",
    tags: ["nextjs", "react", "web development"],
    metadata: {
      readingTime: 8,
      wordCount: 2400,
    },
  },
  {
    title: "Building Modern UI with Tailwind CSS",
    slug: "/blog/tailwind-modern-ui",
    slugAsParams: "tailwind-modern-ui",
    description: "Learn how to build modern, responsive user interfaces with Tailwind CSS.",
    date: "2024-03-10",
    published: true,
    cover: "/images/blog/tailwind-ui.jpg",
    tags: ["tailwind", "css", "ui design"],
    metadata: {
      readingTime: 6,
      wordCount: 1800,
    },
  },
];
