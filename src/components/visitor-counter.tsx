"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  // Use _error variable to avoid linting issue while still tracking errors
  const [_error, setError] = useState(false);

  useEffect(() => {
    // Function to increment visitor count
    const incrementVisitorCount = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch('/api/visitors/increment', { 
          signal: controller.signal,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        } else {
          console.error('Failed to increment visitor count');
          setError(true);
          // Fallback to just getting the count without incrementing
          fetchVisitorCount();
        }
      } catch (error) {
        console.error('Error incrementing visitor count:', error);
        setError(true);
        // Fallback to just getting the count without incrementing
        fetchVisitorCount();
      } finally {
        setLoading(false);
      }
    };
    
    // Fallback function to just get the visitor count without incrementing
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitors');
        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching visitor count:', error);
      } finally {
        setLoading(false);
      }
    };

    incrementVisitorCount();
  }, []);

  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      <Users className="h-4 w-4" aria-hidden="true" />
      <span>Visitor #{loading ? "..." : count?.toLocaleString() || 0}</span>
    </div>
  );
};

export default VisitorCounter;
