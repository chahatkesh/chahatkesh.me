# Chahat Kesharwani - Portfolio Website

A modern, full-stack personal portfolio website built with Next.js 16, featuring advanced SEO optimization, real-time integrations, admin dashboard, and comprehensive content management capabilities.

## Overview

This portfolio website serves as a professional showcase for projects, skills, and experience. It combines cutting-edge web technologies with performance optimization, featuring dynamic content management, real-time Spotify integration, GitHub contributions visualization, and an admin panel for gallery management.

**Live Site:** [chahatkesh.me](https://chahatkesh.me)

## Technical Stack

### Core Technologies

- **Framework:** Next.js 16.1.1 (App Router)
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 3.4.1
- **Database:** MongoDB (with Mongoose 9.0.2)
- **Authentication:** JWT (Jose 6.1.3)
- **Image Management:** Cloudinary, Next-Cloudinary 6.17.5
- **Animation:** Framer Motion 12.23.26

### Key Dependencies

- **UI Components:** Radix UI primitives
- **Data Fetching:** Axios 1.13.2, SWR 2.3.8, TanStack React Query 5.90.13
- **Analytics:** Vercel Analytics, Microsoft Clarity, Google Analytics
- **Utilities:** Zod 4.2.1, class-variance-authority, clsx, tailwind-merge

## Features

### Public Features

- **Responsive Design:** Mobile-first, fully responsive interface
- **Project Showcase:** Detailed project pages with metadata, tech stack, and contributions
- **Professional Experience:** Timeline-based experience display with company details
- **Skills Visualization:** Interactive tech stack showcase with categorization
- **GitHub Integration:** Real-time GitHub contributions calendar
- **Spotify Integration:** Live now-playing widget displaying current music
- **Image Gallery:** Curated photo gallery with optimized image delivery
- **Contact Form:** Direct communication channel
- **Blog/Journey Sections:** Personal and professional journey documentation
- **SEO Optimization:** Comprehensive meta tags, JSON-LD structured data, sitemap, robots.txt
- **Performance:** Optimized images, code splitting, lazy loading

### Admin Features

- **Protected Admin Panel:** JWT-based authentication system
- **Gallery Management:** Upload, organize, and manage gallery images via Cloudinary
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
│   ├── (main)/            # Public pages (home, about, projects, gallery)
│   ├── admin/             # Protected admin panel
│   ├── api/               # API routes (auth, gallery, spotify, visitors)
│   └── links/             # Social links redirect page
├── components/
│   ├── admin/             # Admin-specific components
│   ├── analytics/         # Analytics integrations
│   ├── features/          # Feature components (GitHub, Spotify, etc.)
│   ├── layout/            # Layout components (nav, footer)
│   ├── sections/          # Homepage sections
│   ├── seo/               # SEO components and JSON-LD
│   ├── shared/            # Reusable components
│   └── ui/                # UI components (buttons, cards, inputs)
├── data/                  # Static data (experience, projects, stack, timeline)
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities (auth, MongoDB, SEO, Spotify, etc.)
├── models/                # MongoDB models (admin, gallery, visitor)
├── providers/             # React context providers
├── styles/                # Global styles
└── types/                 # TypeScript type definitions
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
pnpm update-project-dates   # Update project modification dates
```

## Configuration

### Site Configuration

Edit `src/config.ts` to customize site metadata:

- Personal information
- SEO settings
- Social media links
- Theme colors
- Location data

### Content Management

- **Projects:** Edit `src/data/projects.ts`
- **Experience:** Edit `src/data/experience.ts`
- **Skills/Stack:** Edit `src/data/stack.tsx`
- **Timeline:** Edit `src/data/timeline.ts`

## Performance Optimization

- Next.js Image optimization with AVIF/WebP formats
- Static page generation where possible
- Code splitting and lazy loading
- Optimized font loading
- CDN-based image delivery via Cloudinary
- Minimal bundle size with tree shaking

## SEO Features

- Dynamic meta tags generation
- Open Graph protocol support
- Twitter Card metadata
- JSON-LD structured data
- XML sitemap
- Robots.txt configuration
- Canonical URLs
- Breadcrumb navigation

## Security

- JWT-based authentication
- HTTP-only cookies for session management
- Environment variable protection
- Input validation with Zod
- CORS configuration
- Rate limiting considerations

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement approach

## Contributing

This is a personal portfolio project and is **not open for direct code contributions**. However, the repository is public for educational purposes and transparency.

Feel free to:

- ✅ View and learn from the code
- ✅ Fork for your own personal use (respecting the MIT License)
- ✅ Use as reference for your own projects
- ✅ **Open issues** for bugs, questions, or suggestions

Please note:

- ❌ Pull requests will not be accepted
- ✅ Issues are welcome - I'll review and fix them myself
- ❌ Feature requests may be closed if not aligned with my vision

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
