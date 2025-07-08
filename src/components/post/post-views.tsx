"use client";
import { Eye } from "lucide-react";
import React from "react";

const PostViews = ({ slug }: { slug: string }) => {
  // Static view count since we removed the database functionality
  return (
    <dl>
      <dt className="sr-only">Blog Post views</dt>
      <dd className="flex items-center gap-1 text-sm text-muted-foreground">
        <Eye className="size-4" aria-hidden="true" />
        <span>0 Views</span>
      </dd>
    </dl>
  );
};

export default PostViews;
