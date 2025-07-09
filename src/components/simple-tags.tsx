"use client";

import React from "react";

interface TagsProps {
  tags: string[];
}

const SimpleTags: React.FC<TagsProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;
  
  return (
    <ul className="flex flex-wrap gap-1">
      {tags.map((tag, index) => (
        <li 
          key={index}
          className="inline-block rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default SimpleTags;
