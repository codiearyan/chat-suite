"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { UnifiedSidebar } from "@/components/dashboard/UnifiedSidebar";
import { supabase } from "@/lib/utils/supabase/service";
import { User } from "@supabase/supabase-js";

interface ClientSideLayoutProps {
  children: React.ReactNode;
  user: User | null;
}

export const ClientSideLayout = ({
  children,
  user
}: ClientSideLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  return (
    <SidebarProvider className="flex h-screen bg-background">
      <UnifiedSidebar
        user={user}
        showChatHistory={true}
        onCollapsedChange={setIsSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col bg-muted/50 transition-all duration-300">
        <SidebarInset className="flex-1 bg-background relative">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}; 