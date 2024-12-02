import { toolConfig } from "./toolConfig";
import { UnifiedSidebar } from "@/components/dashboard/UnifiedSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/lib/db/cached-queries";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export const metadata = {
  title: toolConfig.metadata.title,
  description: toolConfig.metadata.description,
  openGraph: {
    images: [toolConfig.metadata.og_image],
  },
  alternates: {
    canonical: toolConfig.metadata.canonical,
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  return (
    <SidebarProvider className="flex items-center bg-background">
      <UnifiedSidebar user={user} showChatHistory={true} />
      <div className="lg:pl-2 lg:pt-2 flex-1 overflow-y-auto bg-muted/50">
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <SidebarInset className="flex-1 lg:rounded-tl-xl border border-border overflow-y-auto bg-background">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
