"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to increment visitor count
    const incrementVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitors/increment');
        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        } else {
          console.error('Failed to increment visitor count');
        }
      } catch (error) {
        console.error('Error incrementing visitor count:', error);
      } finally {
        setLoading(false);
      }
    };

    incrementVisitorCount();
  }, []);

  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      <Users className="h-4 w-4" aria-hidden="true" />
      <span>{loading ? "..." : count?.toLocaleString() || 0} visitors</span>
    </div>
  );
};

export default VisitorCounter;
