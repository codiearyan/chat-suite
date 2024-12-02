"use client";

import { Toaster } from "@/components/ui/toaster";
import { PHProvider } from "@/lib/services/posthog/provider";

declare global {
  interface Window {
    fbq: any;
    ttq: any;
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider>
      <Toaster />
      {children}
    </PHProvider>
  );
}
