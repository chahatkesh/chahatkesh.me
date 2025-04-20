import React from "react";
import { ChevronRight, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

import { getFeaturedProjects } from "../data/projects";

import Hero from "../components/home/Hero";
import LetsTalk from "../components/common/LetsTalk";
import ProjectCard from "../components/projects/ProjectCard";
import QuickLinks from "../components/home/QuickLinks";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#37352f] flex flex-col font-sans">
      {/* Main Content */}
      <main className="flex-1 bg-[#ffffff]">
        {/* Hero Section - Minimalist Design with Notes */}
        <Hero />

        {/* Featured Work - With Cover Images */}
        <section className="py-12 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 tracking-tight text-[#37352f] flex items-center">
            <Briefcase size={22} className="mr-2" /> Featured Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/portfolio"
              className="inline-flex items-center text-[#37352f] hover:bg-[#f7f6f3] px-4 py-2 rounded transition-colors">
              View all work <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </section>

        {/* Add Let's Talk component before Quick Links */}
        <div className="py-8 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          <LetsTalk />
        </div>

        {/* Quick Links Component */}
        <QuickLinks />
      </main>
    </div>
  );
}
