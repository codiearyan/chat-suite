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
import { IconChevronLeft, IconLayoutSidebar } from "@tabler/icons-react";
import { Credits } from "@/components/ui/credits";

interface UnifiedSidebarProps {
  user: User | null;
  showChatHistory?: boolean;
}

export function UnifiedSidebar({
  user,
  showChatHistory = false,
}: UnifiedSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [open, setOpen] = useState(!isMobile());
  const [isChatExpanded, setIsChatExpanded] = useState(true);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <div
        className={twMerge(
          "transition-all duration-300 ease-in-out fixed lg:relative",
          open ? "block" : "hidden",
          isCollapsed ? "w-[60px]" : "w-[260px]",
          "h-screen bg-background z-40"
        )}
      >
        <div
          className={twMerge(
            "h-full flex flex-col lg:rounded-tl-xl",
            isCollapsed ? "w-[60px]" : "w-[260px] border-r border-border/50"
          )}
        >
          <div className="hidden lg:block">
            <button
              className="absolute top-4 left-4 h-8 w-8 border border-border/50 rounded-full backdrop-blur-sm flex items-center justify-center z-50 bg-background/80"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <IconLayoutSidebar
                className={twMerge(
                  "h-4 w-4 text-foreground transition-transform",
                  isCollapsed ? "rotate-180" : ""
                )}
              />
            </button>
          </div>

          {!isCollapsed && (
            <>
              <div className="flex-1 overflow-auto no-scrollbar mt-14 px-3">
                <div className="flex flex-col space-y-1 relative z-40">
                  <div className="flex flex-col">
                    {showChatHistory && (
                      <>
                        <button
                          onClick={() => {
                            router.push("/chat");
                            router.refresh();
                          }}
                          className={twMerge(
                            "w-full group relative flex items-center justify-start gap-2 rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-[0.90rem] font-medium text-foreground shadow-sm transition-all hover:bg-primary/5 hover:shadow-md",
                            pathname.includes("/chat") &&
                              "bg-primary/10 border-primary/20 shadow-md shadow-primary/10 text-primary hover:bg-primary/15"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <PlusIcon className="h-4 w-4" />
                            <span>New Chat</span>
                          </div>
                        </button>
                        <Heading
                          as="p"
                          className="text-sm mt-2 md:text-md lg:text-md px-2 pt-2 text-foreground"
                        >
                          Previous Chats
                        </Heading>
                        <div>
                          {isChatExpanded && (
                            <div className="">
                              <SidebarHistory
                                user={user ?? undefined}
                                limit={6}
                                showAllHistory={showAllHistory}
                                setShowAllHistory={setShowAllHistory}
                              />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-3 pb-4 mt-auto border-t border-border/50">
                <Credits user={user} />
                <button
                  onClick={() => router.push("/pricing")}
                  className="w-full text-sm text-muted-foreground/70 hover:text-primary mt-1 transition-colors"
                >
                  Need more credits?
                </button>
                <Button
                  variant="ghost"
                  className="w-full mt-2 flex items-center gap-2 text-muted-foreground/70 hover:text-muted-foreground hover:bg-muted/50 transition-colors"
                  onClick={() => {
                    router.push("/");
                    router.refresh();
                  }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Home</span>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <button
        className="fixed lg:hidden top-4 left-4 h-8 w-8 border border-border/50 rounded-full backdrop-blur-sm flex items-center justify-center z-50 bg-background/80"
        onClick={() => setOpen(!open)}
      >
        <IconChevronLeft
          className={twMerge(
            "h-4 w-4 text-foreground transition-transform",
            open ? "rotate-180" : ""
          )}
        />
      </button>
    </>
  );
}
