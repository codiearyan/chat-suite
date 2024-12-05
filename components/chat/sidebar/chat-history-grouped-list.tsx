"use client";

import { isToday, isYesterday, subMonths, subWeeks } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TrashIcon, Check, X, Search } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Chat } from "@/lib/types/supabase";
import { twMerge } from "tailwind-merge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

type GroupedChats = {
  today: Chat[];
  yesterday: Chat[];
  lastWeek: Chat[];
  lastMonth: Chat[];
  older: Chat[];
};

// Memoized group header with optional show all button
const GroupHeader = memo(function GroupHeader({
  title,
  showAllButton,
}: {
  title: string;
  showAllButton?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between py-1.5">
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
        {title}
      </span>
      {showAllButton}
    </div>
  );
});

// Memoized chat item
const ChatItem = memo(function ChatItem({
  chat,
  isActive,
  onDelete,
  setOpenMobile,
}: {
  chat: Chat;
  isActive: boolean;
  onDelete: (chatId: string) => void;
  setOpenMobile: (open: boolean) => void;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="group flex items-center justify-between py-1 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-md">
        <Link
          href={`/chat/${chat.id}`}
          onClick={() => setOpenMobile(false)}
          className={twMerge(
            "flex-1 text-sm text-gray-700 dark:text-gray-300 truncate",
            isActive && "text-blue-600 dark:text-blue-400 font-medium"
          )}
        >
          {chat.title?.slice(0, 28) || "New Chat"}
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowDeleteDialog(true);
          }}
          className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity p-1"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chat</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this chat? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(chat.id);
                setShowDeleteDialog(false);
              }}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

// Group chats by date
function groupChatsByDate(chats: Chat[]): GroupedChats {
  const now = new Date();
  const oneWeekAgo = subWeeks(now, 1);
  const oneMonthAgo = subMonths(now, 1);

  return chats.reduce(
    (groups, chat) => {
      const chatDate = new Date(chat.created_at);

      if (isToday(chatDate)) {
        groups.today.push(chat);
      } else if (isYesterday(chatDate)) {
        groups.yesterday.push(chat);
      } else if (chatDate > oneWeekAgo) {
        groups.lastWeek.push(chat);
      } else if (chatDate > oneMonthAgo) {
        groups.lastMonth.push(chat);
      } else {
        groups.older.push(chat);
      }

      return groups;
    },
    {
      today: [],
      yesterday: [],
      lastWeek: [],
      lastMonth: [],
      older: [],
    } as GroupedChats
  );
}

export function GroupedChatList({
  chats,
  currentChatId,
  setOpenMobile,
  limit,
  showAllHistory,
  setShowAllHistory,
}: {
  chats: Chat[];
  currentChatId: string;
  setOpenMobile: (open: boolean) => void;
  limit?: number;
  showAllHistory?: boolean;
  setShowAllHistory?: (show: boolean) => void;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter chats based on search query
  const filteredChats = chats.filter((chat) =>
    chat.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply limit here
  const displayedChats = showAllHistory
    ? filteredChats
    : filteredChats.slice(0, limit);
  const groupedChats = groupChatsByDate(displayedChats);

  // Create the show all button if we have more chats than the limit
  const showAllButton = chats.length > (limit || 0) && setShowAllHistory && (
    <button
      onClick={() => {
        if (setShowAllHistory) {
          setShowAllHistory(!showAllHistory);
        }
      }}
      className="text-[10px] text-neutral-500 hover:text-primary transition-colors"
    >
      {showAllHistory ? "Show less" : "Show all"}
    </button>
  );

  // Find the first non-empty group
  const firstGroup =
    groupedChats.today.length > 0
      ? "today"
      : groupedChats.yesterday.length > 0
      ? "yesterday"
      : groupedChats.lastWeek.length > 0
      ? "lastWeek"
      : groupedChats.lastMonth.length > 0
      ? "lastMonth"
      : groupedChats.older.length > 0
      ? "older"
      : null;

  const handleDelete = async (chatId: string) => {
    try {
      const response = await fetch(`/api/chat?id=${chatId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete chat");

      toast({
        description: (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-teal-500/20 dark:bg-teal-500/10 flex items-center justify-center">
                <Check className="h-5 w-5 text-teal-500" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-foreground">
                  Chat deleted successfully
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The chat and its messages have been removed
                </p>
              </div>
            </div>
          </div>
        ),
        duration: 4000,
        className:
          "bg-background border-teal-200 dark:border-teal-900 rounded-xl",
      });

      if (chatId === currentChatId) {
        router.push("/chat");
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
      toast({
        variant: "destructive",
        description: (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-red-500/20 dark:bg-red-500/10 flex items-center justify-center">
                <X className="h-5 w-5 text-red-500" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-foreground">
                  Failed to delete chat
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Please try again or contact support if the issue persists
                </p>
              </div>
            </div>
          </div>
        ),
        duration: 4000,
        className:
          "bg-background border-red-200 dark:border-red-900 rounded-xl",
      });
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <div className="pb-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9 text-sm bg-background"
            />
          </div>
        </div>
        <SidebarMenu className="space-y-2">
          {groupedChats.today.length > 0 && (
            <div className="space-y-0.5">
              <GroupHeader
                title="Today"
                showAllButton={
                  firstGroup === "today" ? showAllButton : undefined
                }
              />
              {groupedChats.today.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === currentChatId}
                  onDelete={handleDelete}
                  setOpenMobile={setOpenMobile}
                />
              ))}
            </div>
          )}

          {groupedChats.yesterday.length > 0 && (
            <div className="space-y-0.5">
              <GroupHeader
                title="Yesterday"
                showAllButton={
                  firstGroup === "yesterday" ? showAllButton : undefined
                }
              />
              {groupedChats.yesterday.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === currentChatId}
                  onDelete={handleDelete}
                  setOpenMobile={setOpenMobile}
                />
              ))}
            </div>
          )}

          {groupedChats.lastWeek.length > 0 && (
            <div className="space-y-0.5">
              <GroupHeader title="Last 7 days" />
              {groupedChats.lastWeek.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === currentChatId}
                  onDelete={handleDelete}
                  setOpenMobile={setOpenMobile}
                />
              ))}
            </div>
          )}

          {groupedChats.lastMonth.length > 0 && (
            <div className="space-y-0.5">
              <GroupHeader title="Last 30 days" />
              {groupedChats.lastMonth.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === currentChatId}
                  onDelete={handleDelete}
                  setOpenMobile={setOpenMobile}
                />
              ))}
            </div>
          )}

          {groupedChats.older.length > 0 && (
            <div className="space-y-0.5">
              <GroupHeader title="Older" />
              {groupedChats.older.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isActive={chat.id === currentChatId}
                  onDelete={handleDelete}
                  setOpenMobile={setOpenMobile}
                />
              ))}
            </div>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
