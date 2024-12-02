import { AIModel } from "@/lib/ai/models";

// Remove FREE_MODELS since all models now require credits
export function canUseConfiguration(
  credits: number,
  config: {
    modelId?: AIModel;
  }
) {
  // Each message costs 1 credit
  const requiredCredits = 1;

  if (credits < requiredCredits) {
    return {
      canUse: false,
      reason: `You've run out of credits. Each message costs 1 credit. Purchase more credits to continue chatting!`,
      requiredCredits,
    };
  }

  return { canUse: true, requiredCredits };
}
