import { cookies } from "next/headers";
import { Chat } from "@/components/chat/chat";
import { generateUUID } from "@/lib/ai/chat";
import { availableModels } from "@/lib/ai/models";
import { getSession, getUserCredits } from "@/lib/db/cached-queries";
import { toolConfig } from "./toolConfig";
import PaymentModal from "@/components/paywall/Payment";

export default async function Page() {
  // Get user session
  const user = await getSession();
  let credits;

  // No paywall check here, it's handled in the chat route + the chat component for more flexibility

  // Generate new chat ID
  const id = generateUUID();

  // Get user preferences from cookies
  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("model-id")?.value;

  // Use model from cookie if valid, otherwise fallback to toolConfig.aiModel
  const selectedModelId =
    availableModels.find((model) => model.id === modelIdFromCookie)?.id ||
    toolConfig.aiModel;

  if (user) {
    if (toolConfig.paywall) {
      credits = await getUserCredits(user.id);

      if (credits < toolConfig.credits) {
        return <PaymentModal userEmail={user?.email || ""} />;
      }
    }
  }

  return (
    <Chat
      key={id}
      id={id}
      initialMessages={[]}
      selectedModelId={selectedModelId}
      isAuthenticated={!!user}
    />
  );
}
