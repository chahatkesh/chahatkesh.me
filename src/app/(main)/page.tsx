import AboutSection from "~/components/about-section";
import { ProjectList, projects } from "~/components/project";
import Skills from "~/components/skills";
import ContactUs from "../../components/contact-us";
import GitHubContributions from "~/components/github-contributions";
import ProfessionalExperience from "~/components/professional-experience";

const HomePage = () => {
  return (
    <div className="!mt-8 space-y-14">
      <AboutSection />
      <GitHubContributions />
      <Skills />
      <ProjectList projects={projects.slice(0, 4)} metadata />
      <ProfessionalExperience />
      <ContactUs />
    </div>
  );
};

export default HomePage;
