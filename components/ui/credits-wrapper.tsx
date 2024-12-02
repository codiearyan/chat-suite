"use client";

import { useEffect, useState } from "react";
import { Credits } from "./credits";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface CreditsWrapperProps {
  user: User | null;
  className?: string;
}

export function CreditsWrapper({ user, className }: CreditsWrapperProps) {
  const router = useRouter();

  useEffect(() => {
    // Listen for credit updates from chat responses
    const handleCreditUpdate = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "credits") {
          // Force a server revalidation to get fresh credits
          router.refresh();
        }
      } catch (error) {
        console.error("Error parsing credit update:", error);
      }
    };

    const events = new EventSource("/api/chat/sse");
    events.onmessage = handleCreditUpdate;

    return () => {
      events.close();
    };
  }, [router]);

  return <Credits user={user} className={className} />;
}
