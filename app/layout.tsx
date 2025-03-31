import { Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Providers from "./providers";
import "./globals.css";
import {
  defaultTitle,
  defaultDescription,
  companyConfig,
  defaultOgImage,
  favicon,
  defaultKeywords,
} from "@/config";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { UnifiedSidebar } from "@/components/dashboard/UnifiedSidebar";
import { createClient } from "@/lib/utils/supabase/server";
import { ClientSideLayout } from "./components/ClientSideLayout";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

/* The commented out code block you provided is defining an object named `metadata` with various
properties related to metadata for a web page. Here is a breakdown of what each property represents: */
export const metadata = {
  title: `${defaultTitle}`,
  description: defaultDescription,
  keywords: defaultKeywords,
  icons: [{ rel: "icon", url: `${companyConfig.company.homeUrl}${favicon}` }],
  openGraph: {
    url: companyConfig.company.homeUrl,
    title: `${defaultTitle} | ${companyConfig.company.name}`,
    description: defaultDescription,
    images: [
      {
        url: `${companyConfig.company.homeUrl}${defaultOgImage}`,
        width: 800,
        height: 600,
        alt: `${companyConfig.company.name} logo`,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <ClientSideLayout user={user}>{children}</ClientSideLayout>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
