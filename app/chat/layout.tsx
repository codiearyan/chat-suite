import {
  defaultTitle,
  defaultDescription,
  companyConfig,
  defaultOgImage,
  favicon,
  defaultKeywords,
} from "@/config";
import { ClientLayout } from "@/app/chat/client-layout";
import { getSession } from "@/lib/db/cached-queries";
export const metadata = {
  title: defaultTitle,
  description: defaultDescription,
  keywords: defaultKeywords,
  openGraph: {
    images: [defaultOgImage],
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
