"use client";

import { Post } from "~/data/blog";
import Image from "next/image";
import BackButton from "~/components/back-btn";
import { PostMetadata, TableOfContent } from "~/components/post";
import { cn } from "~/lib/utils";

interface BlogDetailClientProps {
  post: Post;
}

export default function BlogDetailClient({ post }: BlogDetailClientProps) {
  return (
    <article className="w-full">
      <div className="flex items-center justify-between">
        <BackButton>Back to Posts</BackButton>
      </div>
      <div className="mb-6 mt-2 space-y-6">
        <PostMetadata
          isDetailPage
          title={post.title}
          metadata={post.metadata}
          date={post.date}
          slug={post.slugAsParams}
        />

        <TableOfContent toc={post.toc} />

        <div className="relative aspect-video">
          <Image
            src={post.cover || "/images/blog/default.jpg"}
            alt={post.title}
            placeholder="blur"
            priority
            fill
            quality={95}
            className="size-full rounded-md object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <main id="main-content" className="max-w-none">
        <div className="whitespace-pre-wrap text-base leading-relaxed">
          {post.body || "Content coming soon..."}
        </div>
      </main>

      <div className="my-4">
        <hr className="!mb-4" />
      </div>
    </article>
  );
}
