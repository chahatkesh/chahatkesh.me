import { type Metadata } from "next";
import Image from "next/image";
import {
  Linkedin,
  Mail,
  FileText,
  FolderGit2,
  Home,
  ChevronRight,
  Calendar,
  Briefcase,
} from "lucide-react";
import { FaInstagram, FaYoutube, FaXTwitter, FaGithub } from "react-icons/fa6";
import { GiJourney } from "react-icons/gi";
import { SiBuymeacoffee } from "react-icons/si";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import { cn } from "~/lib/utils";
import { MotionDiv } from "~/components/shared";
import chahat from "~/assets/images/chahat.jpeg";
import { Card } from "~/components/ui";
import { LinkStats } from "~/components/features";
import { links, type LinkItem } from "~/data/links";
import { LinksFeaturedGallery } from "~/components/features/gallery";
import { experiences } from "~/data/experience";
import { currentProjects } from "~/data/about";

export const metadata: Metadata = getSEOTags({
  title: "Links",
  description: `Connect with ${config.appName} - All my important links in one place. Find my social profiles, projects, and ways to get in touch.`,
  openGraph: {
    title: `Links - ${config.appName}`,
    description: `All important links to connect with ${config.appName}. Social profiles, portfolio, and contact information.`,
  },
  canonicalUrlRelative: "/links",
});

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="size-6" />,
  FolderGit2: <FolderGit2 className="size-6" />,
  Home: <Home className="size-6" />,
  FaGithub: <FaGithub className="size-6" />,
  Linkedin: <Linkedin className="size-6" />,
  FaInstagram: <FaInstagram className="size-5" />,
  FaXTwitter: <FaXTwitter className="size-5" />,
  FaYoutube: <FaYoutube className="size-5" />,
  Mail: <Mail className="size-5" />,
  SiBuymeacoffee: <SiBuymeacoffee className="size-5" />,
  Journey: <GiJourney className="size-6" />,
  Calendar: <Calendar className="size-6" />,
  Briefcase: <Briefcase className="size-6" />,
};

// LinkCard Component - Mobile-optimized with large touch targets
const LinkCard = ({ link, index }: { link: LinkItem; index: number }) => {
  const isPrimary = link.type === "primary";
  const isSupport = link.type === "support";
  const icon = iconMap[link.icon];

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <a
        href={link.href}
        target={link.href.startsWith("/") ? "_self" : "_blank"}
        rel={link.href.startsWith("/") ? undefined : "noopener noreferrer"}
        className={cn(
          "group block h-full",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl",
        )}
      >
        <Card
          className={cn(
            "h-full transition-all duration-300 border border-neutral-800 hover:border-neutral-700",
            "active:scale-[0.98]",
            link.hoverColor,
            isPrimary && "p-4 md:p-5",
            !isPrimary && "min-h-[64px] p-4",
            isSupport &&
              "border-yellow-500/30 bg-yellow-500/5 hover:border-yellow-500/50",
          )}
        >
          {/* Primary Links - Vertical layout on mobile, horizontal on desktop */}
          {isPrimary ? (
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 h-full">
              {/* Icon */}
              <div
                className={cn(
                  "flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
                  "size-12 md:size-12 bg-primary/10 group-hover:bg-primary/15",
                  "self-center md:self-auto",
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center",
                    link.gradient &&
                      `bg-gradient-to-r ${link.gradient} bg-clip-text text-transparent`,
                  )}
                >
                  {icon}
                </div>
              </div>

              {/* Content - Centered on mobile, left-aligned on desktop */}
              <div className="flex-1 min-w-0 text-center md:text-left">
                <h3
                  className={cn(
                    "font-semibold tracking-tight transition-colors",
                    "text-sm md:text-lg mb-0.5 md:mb-0",
                  )}
                >
                  {link.title}
                </h3>
                <p className="hidden md:block text-xs md:text-sm text-muted-foreground line-clamp-2 md:truncate">
                  {link.description}
                </p>
              </div>

              {/* Arrow indicator - Hidden on mobile, shown on desktop */}
              <div className="hidden md:flex flex-shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1">
                <ChevronRight className="size-5" />
              </div>
            </div>
          ) : (
            /* Non-Primary Links - Keep horizontal layout */
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div
                className={cn(
                  "flex-shrink-0 flex items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110",
                  "size-10 bg-primary/5",
                )}
              >
                <div
                  className={cn(
                    link.gradient &&
                      `bg-gradient-to-r ${link.gradient} bg-clip-text text-transparent`,
                  )}
                >
                  {icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold tracking-tight transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {link.description}
                </p>
              </div>

              {/* Arrow indicator */}
              <div className="flex-shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1">
                <ChevronRight className="size-5" />
              </div>
            </div>
          )}
        </Card>
      </a>
    </MotionDiv>
  );
};

const LinksPage = () => {
  const primaryLinks = links.filter((link) => link.type === "primary");
  const socialLinks = links.filter((link) => link.type === "social");
  const supportLinks = links.filter((link) => link.type === "support");
  const actionLinks = links.filter((link) => link.type === "action");

  // Dynamically create current work links from experiences with end_date as "present"
  const currentExperiences = experiences.filter(
    (exp) => exp.end_date.toLowerCase() === "present",
  );

  const currentLinks: LinkItem[] = currentExperiences.map((exp, index) => ({
    id: 1000 + index, // Use high IDs to avoid conflicts
    title: exp.role,
    description: `${exp.employer} • ${exp.type}`,
    href: `/about/experience/${exp.slug}`,
    icon: "Briefcase",
    iconSize: "md" as const,
    type: "current" as const,
    hoverColor: "hover:border-ring/50 hover:bg-ring/5",
  }));

  const currentProjectLinks: LinkItem[] = currentProjects
    .filter((project) => project.showInLinks)
    .map((project, index) => ({
      id: 2000 + index,
      title: project.title,
      description: project.description,
      href: project.url,
      icon: "FolderGit2",
      iconSize: "md" as const,
      type: "current" as const,
      hoverColor: "hover:border-ring/50 hover:bg-ring/5",
    }));

  return (
    <>
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Links", url: "/links" },
      ])}

      <div className="max-w-2xl mx-auto px-4 py-16 md:py-20">
        {/* Hero Section */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex items-start gap-4 md:gap-6">
            {/* Left - Profile Image */}
            <div className="relative flex-shrink-0">
              <Image
                src={chahat}
                alt={config.appName}
                width={120}
                height={120}
                className="rounded-2xl border-2 border-border shadow-lg md:w-40 md:h-40"
                priority
              />
            </div>

            {/* Right - Name & Tagline */}
            <div className="flex-1 min-w-0 space-y-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1.5">
                  {config.appName}
                </h1>
                <p className="block md:hidden text-sm md:text-base text-muted-foreground leading-relaxed">
                  {config.appDesignation}
                </p>
                <p className="hidden md:block text-sm md:text-base text-muted-foreground leading-relaxed">
                  {config.appDescription}
                </p>
              </div>

              {/* Stats */}
              <LinkStats />
            </div>
          </div>
        </MotionDiv>

        {/* Primary Links */}
        <div className="grid grid-cols-2 gap-2.5 md:gap-3 mb-6">
          {primaryLinks.map((link, index) => (
            <LinkCard key={link.id} link={link} index={index} />
          ))}
        </div>

        {/* Let's Connect - Book a Call */}
        <div className="mb-6">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              Let&apos;s Connect
            </h2>
          </MotionDiv>
          <div className="space-y-3">
            {actionLinks.map((link, index) => (
              <LinkCard
                key={link.id}
                link={link}
                index={index + primaryLinks.length}
              />
            ))}
          </div>
        </div>

        {/* Gallery Carousel - Moments */}
        <div className="mb-6">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              Moments
            </h2>
          </MotionDiv>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <LinksFeaturedGallery />
          </MotionDiv>
        </div>

        {/* Current Work */}
        {currentLinks.length > 0 && (
          <div className="mb-6">
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                Current Work
              </h2>
            </MotionDiv>
            <div className="space-y-3">
              {currentLinks.map((link, index) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  index={index + primaryLinks.length + actionLinks.length}
                />
              ))}
            </div>
          </div>
        )}

        {/* Beyond Coding */}
        {currentProjectLinks.length > 0 && (
          <div className="mb-6">
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.35 }}
            >
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                Beyond Coding
              </h2>
            </MotionDiv>
            <div className="space-y-3">
              {currentProjectLinks.map((link, index) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  index={
                    index +
                    primaryLinks.length +
                    actionLinks.length +
                    currentLinks.length
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        <div className="mb-6">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              Social
            </h2>
          </MotionDiv>
          <div className="space-y-3">
            {socialLinks.map((link, index) => (
              <LinkCard
                key={link.id}
                link={link}
                index={
                  index +
                  primaryLinks.length +
                  actionLinks.length +
                  currentProjectLinks.length +
                  currentLinks.length
                }
              />
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="mb-8">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              Support
            </h2>
          </MotionDiv>
          <div className="space-y-3">
            {supportLinks.map((link, index) => (
              <LinkCard
                key={link.id}
                link={link}
                index={
                  index +
                  primaryLinks.length +
                  actionLinks.length +
                  currentProjectLinks.length +
                  currentLinks.length +
                  socialLinks.length
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LinksPage;
