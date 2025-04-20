import React, { useState } from "react";
import { FileText, ExternalLink, Search, Tag } from "lucide-react";
import LetsTalk from "../components/common/LetsTalk";
import blogPosts from "../data/blogData";

const Blog = () => {
  const [activeTag, setActiveTag] = useState("All");

  // Get unique tags from blog posts
  const allTags = ["All", ...new Set(blogPosts.flatMap((post) => post.tags))];

  // Filter posts based on selected tag
  const filteredPosts =
    activeTag === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.tags.includes(activeTag));

  return (
    <div className="min-h-screen bg-white text-[#37352f] flex flex-col">
      <main className="flex-1">
        <section className="py-16 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          <h1 className="text-3xl font-medium mb-6">Blog</h1>

          <div className="mb-10 p-6 bg-[#f7f6f3] rounded-lg border border-[#e6e6e6]">
            <p className="text-gray-700">
              A collection of my thoughts, learnings, and guides on web
              development, AI, and design. These articles are originally
              published on Medium.
            </p>
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1 text-sm border rounded-md transition-colors ${
                  activeTag === tag
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-200 text-gray-700 hover:border-gray-400"
                }`}>
                {tag}
              </button>
            ))}
          </div>

          {/* Blog posts */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <a
                key={post.id}
                href={post.mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200 bg-white">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-800 mb-1 flex items-center">
                    {post.title}
                  </h3>
                  <ExternalLink size={14} className="text-gray-500" />
                </div>
                <div className="flex gap-2 text-sm text-gray-500 mb-3">
                  <span>{post.publishDate}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-100 flex items-center">
                      <Tag size={10} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No blog posts found for this tag.
                </p>
              </div>
            )}
          </div>

          {/* Add LetsTalk component at bottom */}
          <div className="mt-16">
            <LetsTalk />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
