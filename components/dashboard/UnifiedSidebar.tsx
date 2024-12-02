"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState, useCallback, useEffect } from "react";
import { Badge } from "@/components/dashboard/Badge";
import { User } from "@supabase/supabase-js";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusIcon } from "lucide-react";
import { isMobile } from "@/lib/utils";
import { SidebarHistory } from "@/components/chat/sidebar/sidebar-history";
import { Heading } from "./Heading";
import { IconChevronLeft } from "@tabler/icons-react";
import { Credits } from "@/components/ui/credits";

interface UnifiedSidebarProps {
  user: User | null;
}

export function UnifiedSidebar({ user }: UnifiedSidebarProps) {
  const [open, setOpen] = useState(!isMobile());
  const [isChatExpanded, setIsChatExpanded] = useState(true);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <div className={`lg:block ${open ? "block" : "hidden"}`}>
        <div className="px-3 z-40 pb-4 bg-background/80 w-[220px] fixed lg:relative h-screen left-0 flex flex-col justify-between border-r border-border/50 lg:rounded-tl-xl">
          <div className="flex-1 overflow-auto no-scrollbar">
            <header className="flex sticky top-0 py-3 items-center justify-between px-3 border-b border-border/50 bg-background/80 backdrop-blur-sm lg:rounded-tl-xl">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                  onClick={() => {
                    router.push("/");
                    router.refresh();
                  }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-lg font-semibold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Back to Home
                </h1>
              </div>
            </header>
            <div className="flex justify-between flex-col h-[90%]">
              <div className="flex flex-col space-y-1 relative z-40">
                <div className="flex flex-col">
                  <Heading
                    as="p"
                    className="text-sm md:text-sm lg:text-sm px-2 pt-2 mb-2"
                  >
                    Previous Chats
                  </Heading>
                  <div className="mb-1">
                    <button
                      onClick={() => {
                        router.push("/chat");
                        router.refresh();
                      }}
                      className={twMerge(
                        "w-full text-primary hover:text-primary/50 transition duration-200 flex items-center justify-between py-2 px-4 rounded-md text-sm",
                        pathname.includes("/chat") &&
                          "bg-white shadow-lg text-primary"
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        <PlusIcon className="h-4 w-4" />
                        <span>New Chat</span>
                      </div>
                    </button>

                    {isChatExpanded && (
                      <div className="ml-4">
                        <SidebarHistory
                          user={user ?? undefined}
                          limit={6}
                          showAllHistory={showAllHistory}
                          setShowAllHistory={setShowAllHistory}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Credits user={user} />
            </div>
          </div>
        </div>
      </div>

      <button
        className="fixed lg:hidden bottom-4 left-4 h-8 w-8 border border-border/50 rounded-full backdrop-blur-sm flex items-center justify-center z-40 bg-background/80"
        onClick={() => setOpen(!open)}
      >
        <IconChevronLeft className="h-4 w-4 text-foreground" />
      </button>
    </>
  );
}
