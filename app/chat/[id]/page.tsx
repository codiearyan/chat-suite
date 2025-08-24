import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { Chat as PreviewChat } from "@/components/chat/chat";
import {
  getChatById,
  getMessagesByChatId,
  getSession,
} from "@/lib/db/cached-queries";
import { convertToUIMessages } from "@/lib/ai/chat";
import { availableModels } from "@/lib/ai/models";
import { toolConfig } from "../toolConfig";

export default async function Page(props: { params: Promise<any> }) {
  const user = await getSession();

  const params = await props.params;
  const { id } = params;

  const chat = await getChatById(id);
  if (!chat) {
    notFound();
  }

  if (user && user.id !== chat.user_id) {
    notFound();
  }

  const messagesFromDb = await getMessagesByChatId(id);

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("model-id")?.value;
  const browseEnabledFromCookie =
    cookieStore.get("browse-enabled")?.value === "true";

  const selectedModelId =
    availableModels.find((model) => model.id === modelIdFromCookie)?.id ||
    toolConfig.aiModel;

  if (!user) {
    redirect("/auth");
    return;
  }
  return (
    <PreviewChat
      id={chat.id}
      initialMessages={convertToUIMessages(messagesFromDb)}
      selectedModelId={selectedModelId}
      initialBrowseEnabled={browseEnabledFromCookie}
      isAuthenticated={!!user}
      userEmail={user?.email || ""}
    />
  );
}
