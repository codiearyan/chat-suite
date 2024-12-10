import { toolConfig } from "./toolConfig";
import { ClientLayout } from "@/app/chat/client-layout";
import { getSession } from "@/lib/db/cached-queries";

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

  return <ClientLayout user={user}>{children}</ClientLayout>;
}
