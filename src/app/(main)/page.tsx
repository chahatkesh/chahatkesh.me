import { posts } from "~/data/blog";
import AboutSection from "~/components/about-section";
import { ProjectList, projects } from "~/components/project";
import Skills from "~/components/skills";
import { sortPosts } from "~/lib/utils";
import ContactUs from "../../components/contact-us";
import GitHubContributions from "~/components/github-contributions";

const HomePage = () => {
  // Filter to show only published posts on homepage
  const publishedPosts = posts.filter((post) => post.published);
  const sortedPosts = sortPosts(publishedPosts);

  return (
    <div className="!mt-8 space-y-14">
      <AboutSection />
      <Skills />
      <GitHubContributions />
      <ProjectList projects={projects.slice(0, 4)} metadata />
      <ContactUs />
    </div>
  );
};

export default HomePage;
