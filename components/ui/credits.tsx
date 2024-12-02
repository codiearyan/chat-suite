"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";

interface CreditsProps {
  user: User | null;
  className?: string;
}

export function Credits({ user, className }: CreditsProps) {
  const [credits, setCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const checkCredits = async () => {
    if (user) {
      try {
        const baseUrl = window.location.origin;
        const response = await fetch(`${baseUrl}/api/user/credits`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCredits(data.credits || 0);
      } catch (error) {
        console.error("Error fetching credits:", error);
        setCredits(0);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      checkCredits();
    } else {
      setCredits(0);
      setIsLoading(false);
    }
  }, [user]);

  if (!user || isLoading) return null;

  const getStatusColor = (credits: number) => {
    if (credits <= 10) return "bg-red-500";
    if (credits <= 25) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getTextColor = (credits: number) => {
    if (credits <= 10) return "text-red-500";
    if (credits <= 25) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border/50",
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full animate-pulse",
          getStatusColor(credits)
        )}
      />
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          getTextColor(credits)
        )}
      >
        {credits.toLocaleString()} credits
      </span>
    </div>
  );
}
