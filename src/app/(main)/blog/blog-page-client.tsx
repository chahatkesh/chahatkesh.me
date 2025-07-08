"use client";

import { Post } from "~/data/blog";
import { PostList } from "~/components/post";
import SearchInput from "~/components/search-input";
import { useMemo } from "react";

interface BlogPageClientProps {
  posts: Post[];
  searchTerm?: string;
}

export default function BlogPageClient({ posts, searchTerm }: BlogPageClientProps) {
  // Filter posts based on search term
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Apply search filter if search term exists
    if (searchTerm) {
      const decodedSearchTerm = decodeURIComponent(searchTerm).toLowerCase();
      filtered = filtered.filter((post) => post.title.toLowerCase().includes(decodedSearchTerm));
    }

    return filtered;
  }, [posts, searchTerm]);

  return (
    <div className="!mt-8">
      <div className="flex flex-col flex-wrap justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-left text-xl font-medium">All Publications</h1>
        <div className="flex items-center gap-4">
          <SearchInput />
        </div>
      </div>

      <PostList posts={filteredPosts} />
    </div>
  );
}
