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
    <SidebarProvider className="flex h-screen bg-background">
      <UnifiedSidebar user={user} showChatHistory={true} />
      <div className="flex-1 flex flex-col bg-muted/50 transition-all duration-300">
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <SidebarInset className="flex-1 bg-background relative">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
