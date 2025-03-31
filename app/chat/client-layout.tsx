"use client";

import { UnifiedSidebar } from "@/components/dashboard/UnifiedSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface ClientLayoutProps {
  children: React.ReactNode;
  user: User | null;
}

export function ClientLayout({ children, user }: ClientLayoutProps) {
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <SidebarProvider className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col bg-muted/50 transition-all duration-300">
        {isSidebarCollapsed && (
          <div
            className={twMerge(
              "absolute top-4 z-50 flex items-center gap-2 transition-all duration-300",
              isSidebarCollapsed ? "left-[70px]" : "left-[270px]",
              "lg:block hidden" // Hide on mobile since sidebar already has new chat button
            )}
          >
            <button
              onClick={() => router.push("/chat")}
              className={twMerge(
                "w-full group relative flex items-center justify-start gap-2 rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-[0.90rem] font-medium text-foreground shadow-sm transition-all hover:bg-primary/5 hover:shadow-md",
                pathname.includes("/chat") &&
                  "bg-primary/10 border-primary/20 shadow-md shadow-primary/10 text-primary hover:bg-primary/15"
              )}
              title="New Chat"
            >
              <Plus className="h-4 w-4" />
              <p className="text-white">New Chat</p>
            </button>
          </div>
        )}

        <SidebarInset className="flex-1 bg-background relative">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
