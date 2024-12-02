"use client";

import { useEffect, useState, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

interface CreditsProps {
  user: User | null;
  className?: string;
}

// Create a custom event name
const CREDIT_UPDATE_EVENT = "CREDIT_UPDATE";

export function Credits({ user, className }: CreditsProps) {
  const [credits, setCredits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCredits = useCallback(async () => {
    if (!user) return;
    try {
      const response = await fetch("/api/user/credits");
      const data = await response.json();
      setCredits(data.credits);
    } catch (error) {
      console.error("Failed to fetch credits:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // Handle credit updates
    const handleCreditUpdate = (event: CustomEvent<number>) => {
      setCredits(event.detail);
    };

    // Add event listener
    window.addEventListener(
      CREDIT_UPDATE_EVENT,
      handleCreditUpdate as EventListener
    );

    // Initial fetch
    fetchCredits();

    // Cleanup
    return () => {
      window.removeEventListener(
        CREDIT_UPDATE_EVENT,
        handleCreditUpdate as EventListener
      );
    };
  }, [fetchCredits]);

  if (!user || isLoading) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
      <span className="text-sm text-gray-600 dark:text-gray-300">
        {credits.toLocaleString()} credits
      </span>
    </div>
  );
}

// Export the event name for use in other components
export { CREDIT_UPDATE_EVENT };
