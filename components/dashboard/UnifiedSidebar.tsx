"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState, useCallback, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { twMerge } from "tailwind-merge";
import { PlusIcon, Plus } from "lucide-react";
import { isMobile } from "@/lib/utils";
import { SidebarHistory } from "@/components/chat/sidebar/sidebar-history";
import { Heading } from "./Heading";
import { IconChevronLeft, IconLayoutSidebar } from "@tabler/icons-react";
import { Credits } from "@/components/ui/credits";
import AuthButton from "@/components/auth/AuthButton";
import Image from "next/image";

interface UnifiedSidebarProps {
  user: User | null;
  showChatHistory?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function UnifiedSidebar({
  user,
  showChatHistory = false,
  onCollapsedChange,
}: UnifiedSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [open, setOpen] = useState(!isMobile());
  const [isChatExpanded, setIsChatExpanded] = useState(true);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    onCollapsedChange?.(isCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  return (
    <>
      <aside
        className={twMerge(
          "transition-all duration-300 ease-in-out fixed lg:relative",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isCollapsed ? "w-[60px] bg-background" : "w-[260px]  bg-muted/50",
          "h-screen"
        )}
      >
        <div
          className={twMerge(
            "absolute inset-0 flex flex-col lg:rounded-tl-xl",
            isCollapsed ? "" : "border-r border-border/80"
          )}
        >
          <div className="flex items-center justify-between px-4 py-2 my-2">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <Image
                  src="/chatsuite_nobg.png"
                  alt="ChatSuite Logo"
                  width={30}
                  height={30}
                />
                <h1 className="text-2xl font-bold font-inter-medium xs:text-3xl">
                  CHATSUITE
                </h1>
              </div>
            )}
            <div className="flex items-center gap-2">
              <button
                className={twMerge(
                  "h-8 w-8 border border-border/50 rounded-full backdrop-blur-sm flex items-center justify-center z-50 bg-background/80",
                  isCollapsed && "mx-auto"
                )}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <IconLayoutSidebar
                  className={twMerge(
                    "h-4 w-4 text-foreground transition-transform duration-300",
                    isCollapsed ? "rotate-180" : ""
                  )}
                />
              </button>
            </div>
          </div>

          {!isCollapsed && (
            <>
              <div className="flex-1 overflow-auto no-scrollbar px-3">
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
                                limit={12}
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
                <div className="flex justify-center w-full mt-2">
                  <AuthButton
                    user={user}
                    classProps={{
                      container: "w-full",
                      showEmail: false,
                      button:
                        "w-full flex items-center gap-2 text-muted-foreground hover:text-foreground border border-white/10 rounded-md px-3 py-2 hover:border-white/20 hover:bg-white/5 transition-all duration-200",
                      emailText: "text-center px-2",
                      variant: "ghost",
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </aside>

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
