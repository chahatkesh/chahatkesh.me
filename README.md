# Chahat Kesharwani - Portfolio Website

A modern, full-stack personal portfolio website built with Next.js 16, featuring advanced SEO optimization, real-time integrations, admin dashboard, and comprehensive content management capabilities.

## Overview

This portfolio website serves as a professional showcase for projects, skills, and experience. It combines cutting-edge web technologies with performance optimization, featuring dynamic content management, Spotify integration, GitHub and LeetCode activity tracking, and an admin panel for gallery and file management.

**Live Site:** [chahatkesh.me](https://chahatkesh.me)

## Technical Stack

### Core Technologies

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript 5.9
- **Styling:** Tailwind CSS 3.4
- **Database:** MongoDB (with Mongoose 9)
- **Authentication:** JWT (Jose 6)
- **Image Management:** Cloudinary, Next-Cloudinary 6
- **Animation:** Framer Motion 12

### Key Dependencies

- **UI Components:** Radix UI primitives
- **Data Fetching:** SWR, TanStack React Query 5
- **Analytics:** Vercel Analytics, Microsoft Clarity, Google Analytics
- **Utilities:** Zod 4, class-variance-authority, clsx, tailwind-merge, Lenis, Mermaid

## Features

### Public Features

- **Responsive Design:** Mobile-first, fully responsive interface
- **Project Showcase:** Detailed project pages with metadata, tech stack, Mermaid diagrams, and contributions
- **Professional Experience:** Timeline-based experience display with per-role detail pages and dynamic galleries
- **Skills Visualization:** Interactive tech stack showcase with categorization
- **Coding Activity:** Unified GitHub and LeetCode contribution calendars
- **Spotify Integration:** Live now-playing widget displaying current music
- **Image Gallery:** Curated photo gallery with optimized image delivery
- **Videos:** YouTube video catalog with individual video pages
- **Changelog:** Monthly release notes documenting site updates
- **Journey:** Personal and professional journey documentation, including BTech course details
- **About This Site:** Architecture overview, codebase metrics, and tech stack documentation
- **Links Hub:** Centralized social links page with profile stats
- **Shared Files:** Public file sharing via short URLs (`/s/[id]`)
- **Contact:** Email and social links with Spotify widget
- **SEO Optimization:** Comprehensive meta tags, JSON-LD structured data, sitemap, robots.txt
- **Performance:** Optimized images, code splitting, lazy loading, smooth scrolling

### Admin Features

- **Protected Admin Panel:** JWT-based authentication system
- **Gallery Management:** Upload, organize, and manage gallery images via Cloudinary
- **Experience Gallery Management:** Manage images for individual experience entries
- **File Sharing:** Upload files and generate shareable public URLs
- **Session Management:** Secure token-based authentication
- **Admin Creation Script:** CLI tool for creating admin accounts

### Analytics & Monitoring

- **Visitor Tracking:** Real-time visitor counter with MongoDB persistence
- **Page Tracking:** Custom page view analytics
- **Performance Monitoring:** Vercel Speed Insights integration
- **Third-Party Analytics:** Google Analytics, Microsoft Clarity

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (main)/            # Public pages (home, about, projects, gallery, videos, changelog)
│   ├── admin/             # Protected admin panel (gallery, files, experience)
│   ├── api/               # API routes (auth, gallery, files, spotify, visitors, coding-activity)
│   └── links/             # Social links hub page
├── assets/                # Static image assets
├── components/
│   ├── admin/             # Admin-specific components
│   ├── analytics/         # Analytics integrations
│   ├── features/          # Feature components (coding activity, Spotify, gallery, etc.)
│   ├── layout/            # Layout components (nav, footer)
│   ├── sections/          # Homepage sections
│   ├── seo/               # SEO components and JSON-LD
│   ├── shared/            # Reusable components
│   └── ui/                # UI components (buttons, cards, inputs)
├── constants/             # App constants (API routes, limits, theme tokens)
├── data/                  # Static data (projects, experience, changelog, site metadata)
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities (auth, MongoDB, SEO, Spotify, GitHub, LeetCode, etc.)
├── models/                # MongoDB models (admin, gallery, visitor, experience-gallery, shared-file)
├── providers/             # React context providers
├── styles/                # Global styles
├── types/                 # TypeScript type definitions
└── env.ts                 # Runtime environment variable validation

scripts/                   # Maintenance scripts (see scripts/README.md)
```

## Available Scripts

```bash
pnpm dev                    # Start development server
pnpm build                  # Build for production
pnpm start                  # Start production server
pnpm lint                   # Run ESLint
pnpm type-check             # Run TypeScript compiler check
pnpm format                 # Format code with Prettier
pnpm format:check           # Check code formatting
pnpm validate               # Run all checks (lint, type-check, format)
pnpm create-admin           # Create admin user via CLI
pnpm update-project-dates   # Sync project dates from GitHub repos
pnpm update-metrics         # Update codebase metrics in src/data/site.tsx
pnpm update-tech-versions   # Sync displayed tech versions from package.json
pnpm update-youtube         # Fetch YouTube videos (requires YOUTUBE_* env vars)
pnpm update-all             # Run update-metrics, update-tech-versions, and update-youtube
```

See [scripts/README.md](scripts/README.md) for detailed script documentation.

## Configuration

### Site Configuration

Edit `src/config.ts` to customize site metadata:

- Personal information
- SEO settings
- Social media links
- Theme colors
- Location data

Environment variables are validated at runtime via `src/env.ts`. Copy `.env.example` to `.env.local` and fill in required values before running locally.

### Content Management

- **Projects:** Edit `src/data/projects.ts`
- **Experience:** Edit `src/data/experience.ts`
- **Skills/Stack:** Edit `src/data/stack.tsx`
- **Timeline:** Edit `src/data/timeline.ts`
- **About:** Edit `src/data/about.ts`
- **Links:** Edit `src/data/links.ts`
- **YouTube Videos:** Edit `src/data/youtube.ts` or run `pnpm update-youtube`
- **Changelog:** Edit `src/data/changelog.ts`
- **BTech Courses:** Edit `src/data/btech-courses.ts`
- **Site Metadata:** Edit `src/data/site.tsx` (metrics updated via `pnpm update-metrics`)

## Performance Optimization

- Next.js Image optimization with AVIF/WebP formats
- Static page generation where possible
- Code splitting and lazy loading
- Optimized font loading
- CDN-based image delivery via Cloudinary
- Minimal bundle size with tree shaking
- Smooth scrolling via Lenis

## SEO Features

- Dynamic meta tags generation
- Open Graph protocol support
- Twitter Card metadata
- JSON-LD structured data
- XML sitemap
- Robots.txt configuration
- Canonical URLs
- Breadcrumb navigation
- Per-route Open Graph image generation

## Security

- JWT-based authentication
- HTTP-only cookies for session management
- Environment variable protection and runtime validation
- Input validation with Zod
- CORS configuration

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement approach

## Contributing

This is a personal portfolio project and is **not open for direct code contributions**. However, the repository is public for educational purposes and transparency.

Feel free to:

- View and learn from the code
- Fork for your own personal use (respecting the MIT License)
- Use as reference for your own projects
- **Open issues** for bugs, questions, or suggestions

Please note:

- Pull requests will not be accepted
- Issues are welcome - I'll review and fix them myself
- Feature requests may be closed if not aligned with my vision

If you find a bug or have a suggestion, feel free to open an issue and I'll address it!

## License

MIT License - See LICENSE file for details

**Note:** While this project is licensed under MIT (allowing you to fork and modify for personal use), this repository itself does not accept external contributions.

## Author

**Chahat Kesharwani**

- Website: [chahatkesh.me](https://chahatkesh.me)
- GitHub: [@chahatkesh](https://github.com/chahatkesh)
- LinkedIn: [chahatkesharwani](https://www.linkedin.com/in/chahatkesharwani/)
- Email: ckesharwani4@gmail.com

## Acknowledgments

Built with modern web technologies and best practices in mind. Special thanks to the open-source community for the excellent tools and libraries that made this project possible.
