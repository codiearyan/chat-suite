import { experimental_wrapLanguageModel as wrapLanguageModel } from "ai";
import { openai, createOpenAI } from "@ai-sdk/openai";
import { anthropic, createAnthropic } from "@ai-sdk/anthropic";
import { groq } from "@ai-sdk/groq";
import { xai } from "@ai-sdk/xai";
import { Experimental_LanguageModelV1Middleware } from "ai";
import { google, createGoogleGenerativeAI } from "@ai-sdk/google";
import { ApiKeys } from "../utils";

export const customMiddleware: Experimental_LanguageModelV1Middleware = {};

type ModelProvider = "openai" | "anthropic" | "groq" | "xai" | "google";

// Helper to determine provider from model ID
function getProviderFromModelId(modelId: string): ModelProvider {
  if (modelId.startsWith("gpt")) return "openai";
  if (modelId.startsWith("claude")) return "anthropic";
  if (modelId.startsWith("llama")) return "groq";
  if (modelId.startsWith("grok")) return "xai";
  if (modelId.startsWith("gemini")) return "google";
  return "openai"; // fallback
}

/**
 * Get model instance based on provider and model name with API keys
 */
function getModelInstance(provider: ModelProvider, modelName: string, apiKeys?: ApiKeys) {
  switch (provider) {
    case "openai":
      if (apiKeys?.openai) {
        const customOpenAI = createOpenAI({
          apiKey: apiKeys.openai,
        });
        return customOpenAI(modelName);
      }
      return openai(modelName);
    case "anthropic":
      if (apiKeys?.claude) {
        const customAnthropic = createAnthropic({
          apiKey: apiKeys.claude,
        });
        return customAnthropic(modelName);
      }
      return anthropic(modelName);
    case "groq":
      return groq(modelName);
    case "xai":
      return xai(modelName);
    case "google":
      if (apiKeys?.google) {
        const customGoogle = createGoogleGenerativeAI({
          apiKey: apiKeys.google,
        });
        return customGoogle(modelName);
      }
      return google(modelName);
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}

/**
 * Creates a customized AI model instance with specific settings
 */
export function customModel(modelId: string, apiKeys?: ApiKeys) {
  const provider = getProviderFromModelId(modelId);
  console.log(
    `Creating model instance for ${modelId} using ${provider} provider`
  );

  return wrapLanguageModel({
    model: getModelInstance(provider, modelId, apiKeys),
    middleware: customMiddleware,
  });
}
