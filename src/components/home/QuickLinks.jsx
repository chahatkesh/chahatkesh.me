import React from "react";
import { Link } from "react-router-dom";
import { Bookmark, File, Calendar, MessageSquare } from "lucide-react";

const quickLinksData = [
  {
    to: "/about",
    icon: <File />,
    title: "About",
    description: "Learn more about my skills and education",
  },
  {
    to: "/blog",
    icon: <Calendar />,
    title: "Blog",
    description: "Insights on development, AI, and tech innovation",
  },
  {
    to: "/contact",
    icon: <MessageSquare />,
    title: "Contact",
    description: "Get in touch for work inquiries or collaborations",
  },
];

export default function QuickLinks() {
  return (
    <section className="pt-6 pb-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
      <div className="border-t border-[#EBEAEA] pt-10">
        <h3 className="text-sm font-medium text-[#787774] mb-6 tracking-wide flex items-center">
          <Bookmark size={14} className="mr-2 text-[#9B9A97]" /> Quick Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {quickLinksData.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="p-3 border-1 border-gray-200 rounded-md hover:bg-[#f1f1ef] transition-all duration-200 group relative">
              <div className="flex items-center mb-1.5">
                <div className="text-gray-600 mr-2 p-1 bg-[#f7f6f3] rounded group-hover:bg-white group-hover:text-[#37352f] transition-colors">
                  {React.cloneElement(link.icon, {
                    size: 14,
                    strokeWidth: 2.3,
                  })}
                </div>
                <h4 className="font-medium text-sm text-[#37352F] group-hover:text-black">
                  {link.title}
                </h4>
              </div>
              <p className="text-xs text-[#787774] group-hover:text-[#37352F] ml-7 transition-colors">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
