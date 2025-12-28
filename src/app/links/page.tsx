import { Metadata } from "next";
import Image from "next/image";
import { Linkedin, Mail, FileText, FolderGit2, Home, ChevronRight } from "lucide-react";
import { FaInstagram, FaYoutube, FaXTwitter, FaGithub } from "react-icons/fa6";
import { SiBuymeacoffee } from "react-icons/si";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import { cn } from "~/lib/utils";
import { MotionDiv } from "~/components/motion-wrapper";
import chahat from "~/assets/images/chahat.jpeg";
import { Card } from "~/components/ui/card";
import LinkStats from "~/components/link-stats";

export const metadata: Metadata = getSEOTags({
  title: "Links",
  description: `Connect with ${config.appName} - All my important links in one place. Find my social profiles, projects, and ways to get in touch.`,
  openGraph: {
    title: `Links - ${config.appName}`,
    description: `All important links to connect with ${config.appName}. Social profiles, portfolio, and contact information.`,
  },
  canonicalUrlRelative: "/links",
});

interface LinkItem {
  id: number;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  type: "primary" | "social" | "support";
  gradient?: string;
  hoverColor?: string;
}

const links: LinkItem[] = [
  // Primary Links
  {
    id: 1,
    title: "Resume",
    description: "Download my CV / Resume",
    href: "/resume",
    icon: <FileText className="size-6" />,
    type: "primary",
    hoverColor: "hover:border-emerald-500/50 hover:bg-emerald-500/5",
  },
  {
    id: 2,
    title: "Projects",
    description: "Explore my work & case studies",
    href: "/projects",
    icon: <FolderGit2 className="size-6" />,
    type: "primary",
    hoverColor: "hover:border-blue-500/50 hover:bg-blue-500/5",
  },
  {
    id: 3,
    title: "Portfolio",
    description: "Check out my work & projects",
    href: "/",
    icon: <Home className="size-6" />,
    type: "primary",
    hoverColor: "hover:border-purple-500/50 hover:bg-purple-500/5",
  },
  {
    id: 4,
    title: "GitHub",
    description: "Explore my open source contributions",
    href: config.social.github,
    icon: <FaGithub className="size-6" />,
    type: "primary",
    hoverColor: "hover:border-gray-400/50 hover:bg-gray-400/5",
  },
  {
    id: 5,
    title: "LinkedIn",
    description: "Let's connect professionally",
    href: config.social.linkedin,
    icon: <Linkedin className="size-6" />,
    type: "primary",
    hoverColor: "hover:border-blue-500/50 hover:bg-blue-500/5",
  },
  
  // Social Links
  {
    id: 6,
    title: "Instagram",
    description: "Follow my journey",
    href: config.social.instagram,
    icon: <FaInstagram className="size-5" />,
    type: "social",
    hoverColor: "hover:border-pink-500/50 hover:bg-pink-500/5",
  },
  {
    id: 7,
    title: "Twitter / X",
    description: "Thoughts & updates",
    href: config.social.twitter,
    icon: <FaXTwitter className="size-5" />,
    type: "social",
    hoverColor: "hover:border-sky-500/50 hover:bg-sky-500/5",
  },
  {
    id: 8,
    title: "YouTube",
    description: "Watch my content",
    href: config.social.youtube,
    icon: <FaYoutube className="size-5" />,
    type: "social",
    hoverColor: "hover:border-red-500/50 hover:bg-red-500/5",
  },
  
  // Contact
  {
    id: 9,
    title: "Email Me",
    description: config.social.email,
    href: `mailto:${config.social.email}`,
    icon: <Mail className="size-5" />,
    type: "social",
    hoverColor: "hover:border-emerald-500/50 hover:bg-emerald-500/5",
  },
  
  // Support
  {
    id: 10,
    title: "Buy Me a Coffee",
    description: "Support my work ☕",
    href: config.social.buymeacoffee,
    icon: <SiBuymeacoffee className="size-5" />,
    type: "support",
    hoverColor: "hover:border-yellow-500/50 hover:bg-yellow-500/5",
  },
];

// LinkCard Component - Mobile-optimized with large touch targets
const LinkCard = ({ link, index }: { link: LinkItem; index: number }) => {
  const isPrimary = link.type === "primary";
  const isSupport = link.type === "support";
  
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
          "group block",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
        )}
      >
        <Card
          className={cn(
            "transition-all duration-300 border-2",
            "active:scale-[0.98]",
            link.hoverColor,
            isPrimary && "min-h-[72px] p-5",
            !isPrimary && "min-h-[64px] p-4",
            isSupport && "border-yellow-500/30 bg-yellow-500/5"
          )}
        >
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div
              className={cn(
                "flex-shrink-0 flex items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110",
                isPrimary && "size-12 bg-primary/10",
                !isPrimary && "size-10 bg-primary/5"
              )}
            >
              <div className={cn(
                link.gradient && `bg-gradient-to-r ${link.gradient} bg-clip-text text-transparent`
              )}>
                {link.icon}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  "font-semibold tracking-tight transition-colors",
                  isPrimary && "text-lg",
                  !isPrimary && "text-base"
                )}
              >
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
        </Card>
      </a>
    </MotionDiv>
  );
};

const LinksPage = () => {
  const primaryLinks = links.filter(link => link.type === "primary");
  const socialLinks = links.filter(link => link.type === "social");
  const supportLinks = links.filter(link => link.type === "support");

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {primaryLinks.map((link, index) => (
            <LinkCard key={link.id} link={link} index={index} />
          ))}
        </div>

        {/* Social Links */}
        <div className="mb-6">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              Social
            </h2>
          </MotionDiv>
          <div className="space-y-3">
            {socialLinks.map((link, index) => (
              <LinkCard key={link.id} link={link} index={index + primaryLinks.length} />
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="mb-8">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
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
                index={index + primaryLinks.length + socialLinks.length} 
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LinksPage;
