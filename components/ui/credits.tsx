"use client";

import { useEffect, useState, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

interface CreditsProps {
  user: User | null;
  className?: string;
}

const CREDIT_UPDATE_EVENT = "CREDIT_UPDATE";

// Helper function to determine credit status
function getCreditStatus(credits: number) {
  if (credits <= 3) return "danger";
  if (credits <= 5) return "warning";
  return "success";
}

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

  const creditStatus = getCreditStatus(credits);

  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/75 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm",
          className
        )}
      >
        <span
          className={cn("w-1.5 h-1.5 rounded-full animate-pulse", {
            "bg-red-600 dark:bg-red-400": creditStatus === "danger",
            "bg-yellow-600 dark:bg-yellow-400": creditStatus === "warning",
            "bg-green-600 dark:bg-green-400": creditStatus === "success",
          })}
        />
        <span
          className={cn("text-sm font-medium", {
            "text-red-700 dark:text-red-400": creditStatus === "danger",
            "text-yellow-700 dark:text-yellow-400": creditStatus === "warning",
            "text-gray-700 dark:text-gray-300": creditStatus === "success",
          })}
        >
          {credits.toLocaleString()} credits
        </span>
      </div>
      <p className="text-xs text-center text-muted-foreground/70">
        1 Message = 1 Credit
      </p>
    </div>
  );
}

export { CREDIT_UPDATE_EVENT };
