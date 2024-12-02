import { cookies } from "next/headers";
import { Chat } from "@/components/chat/chat";
import { generateUUID } from "@/lib/ai/chat";
import { availableModels } from "@/lib/ai/models";
import { getSession, getUserCredits } from "@/lib/db/cached-queries";
import PaymentModal from "@/components/paywall/Payment";

export default async function Page() {
  const user = await getSession();
  let credits;

  // Generate new chat ID
  const id = generateUUID();

  // Get user preferences from cookies
  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("model-id")?.value;

  // Use model from cookie if valid, otherwise fallback to GPT-4o
  const selectedModelId =
    availableModels.find((model) => model.id === modelIdFromCookie)?.id ||
    "gpt-4o";

  if (user) {
    credits = await getUserCredits(user.id);

    // Show paywall if credits are 0
    if (credits <= 0) {
      return <PaymentModal userEmail={user?.email || ""} />;
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
