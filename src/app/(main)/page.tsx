import { Metadata } from "next";
import AboutSection from "~/components/about-section";
import { ProjectList, projects } from "~/components/project";
import Skills from "~/components/skills";
import ContactUs from "../../components/contact-us";
import GitHubContributions from "~/components/github-contributions";
import ProfessionalExperience from "~/components/professional-experience";
import { getSEOTags, renderBreadcrumbSchema } from "~/lib/seo";
import config from "~/config";
import { HomeJsonLd } from "~/components/home-jsonld";

export const metadata: Metadata = getSEOTags({
  title: "Home",
  description: `${config.appName} - ${config.appDesignation}. Explore my portfolio featuring projects, skills, and professional experience.`,
  openGraph: {
    title: `${config.appName} - ${config.appDesignation}`,
    description: `Welcome to ${config.appName}'s portfolio. Discover my projects, skills, and professional experience as a ${config.appDesignation}.`,
  },
});

const HomePage = () => {
  return (
    <>
      <HomeJsonLd />
      {renderBreadcrumbSchema([
        { name: "Home", url: "/" },
      ])}
      <div className="!mt-8 space-y-14">
        <AboutSection />
        <GitHubContributions />
        <Skills />
        <ProjectList 
          projects={projects.filter(project => project.isFeatured).slice(0, 4)} 
          metadata 
          showFeatured={true}
        />
        <ProfessionalExperience />
        <ContactUs />
      </div>
    </>
  );
};

export default HomePage;
