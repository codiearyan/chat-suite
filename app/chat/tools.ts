import { z } from "zod";
import { generateText, StreamData, streamText, generateObject } from "ai";
import { generateUUID } from "@/lib/ai/chat";
import { saveDocument } from "@/lib/db/mutations";
import { getDocumentById } from "@/lib/db/cached-queries";
import { customModel } from "@/lib/ai/ai-utils";
import { apps as demoApps } from "@/lib/ai/apps";

/**
 * Available AI Tools
 * These tools can be used by the AI to perform specific actions:
 * - createDocument: Creates new documents
 * - updateDocument: Updates existing documents
 * - browseInternet: Searches the internet for information
 *
 *
 * Generative UI Implementation Example:
 * The suggestApps tool shows how to create dynamic UI components in chat:
 *
 * 1. Components Structure:
 *    - chat/widgets/app-cards.tsx: Main visual component
 *    - chat/message.tsx: Handles tool results display
 *    - chat/agent-actions.tsx: Loading states and actions
 *    - prompt.ts: Instructions for the AI on when/how to use the tool
 *
 * 2. Implementation Steps:
 *    a. Create your visual component (see app-cards.tsx)
 *    b. Add tool type in agent-actions.tsx
 *    c. Handle results in message.tsx
 *    d. Define tool logic here in tools.ts
 *    e. Add AI instructions in prompt.ts (see appSuggestionsPrompt)
 *
 * Internet Browsing Implementation:
 * The browseInternet tool enables web search and content scraping:
 *
 * 1. Search Flow:
 *    a. Query Google via Serper API
 *    b. Scrape content using Jina AI
 *    c. Process and clean retrieved content
 *    d. Return structured data for AI analysis
 *
 */

type AllowedTools =
  | "createDocument"
  | "updateDocument"
  | "browseInternet";

// Group tools by functionality for better organization and potential feature flags
export const canvasTools: AllowedTools[] = ["createDocument", "updateDocument"];
export const internetTools: AllowedTools[] = ["browseInternet"];
export const allTools: AllowedTools[] = [
  ...canvasTools,
  ...internetTools
];

// Add schema for Serper response
const SerperJSONSchema = z.object({
  organic: z.array(z.object({ title: z.string(), link: z.string() })),
});

// Define the tool types
type BaseTools = {
  createDocument: {
    description: string;
    parameters: z.ZodObject<any>;
    execute: (params: { title: string }) => Promise<any>;
  };
  updateDocument: {
    description: string;
    parameters: z.ZodObject<any>;
    execute: (params: { id: string; description: string }) => Promise<any>;
  };
};

type BrowseTools = {
  browseInternet: {
    description: string;
    parameters: z.ZodObject<any>;
    execute: (params: { query: string }) => Promise<any>;
  };
};

// Define return type for createTools
type ToolsReturn = BaseTools & Partial<BrowseTools>;

// Define the analysis schema with clearer intent
const AppAnalysisSchema = z.object({
  matches: z.array(
    z.object({
      id: z.string(),
      relevanceScore: z.number().min(0).max(1),
      reasoning: z.string(),
      isStandaloneMatch: z.boolean(),
      requiredCapabilities: z.array(z.string()),
    })
  ),
  needsCombination: z.boolean(),
  summary: z.string(),
  recommendedWorkflow: z.string().optional(),
});

/**
 * Creates and returns an object containing all available AI tools
 * @param streamingData - For real-time UI updates
 * @param userId - For document operations
 */
export function createTools(
  streamingData: StreamData,
  userId: string,
  modelId: string = "gpt-4o-mini",
  isBrowseEnabled: boolean = false
): ToolsReturn {
  console.log("Creating tools:", {
    userId,
    modelId,
    isBrowseEnabled,
  });

  const baseTools: BaseTools = {
    /**
     * Document Creation Tool
     * Creates a new document with AI-generated content
     *
     * Flow:
     * 1. Generates unique document ID
     * 2. Streams UI updates for immediate feedback
     * 3. Generates content using AI model
     * 4. Saves document to database
     *
     * UI Updates:
     * - 'id': Document identifier
     * - 'title': Document title
     * - 'clear': Clear previous content
     * - 'text-delta': Real-time content updates
     * - 'finish': Completion indicator
     */
    createDocument: {
      description: "Create a document for a writing activity",
      parameters: z.object({
        title: z.string(),
      }),
      execute: async ({ title }: { title: string }) => {
        console.log("Creating document using model:", modelId);
        const id = generateUUID();
        const toolCallId = generateUUID();
        let draftText: string = "";

        streamingData.append({ type: "id", content: id });
        streamingData.append({ type: "title", content: title });
        streamingData.append({ type: "clear", content: "" });

        const { fullStream } = await streamText({
          model: customModel(modelId),
          system:
            "Write about the given topic. Markdown is supported. Use headings wherever appropriate.",
          prompt: title,
        });

        for await (const delta of fullStream) {
          if (delta.type === "text-delta") {
            draftText += delta.textDelta;
            streamingData.append({
              type: "text-delta",
              content: delta.textDelta,
            });
          }
        }

        streamingData.append({ type: "finish", content: "" });

        await saveDocument({
          id,
          title,
          content: draftText,
          userId,
        });

        return {
          toolCallId,
          id,
          title,
          content: `A document was created and is now visible to the user.`,
        };
      },
    },

    /**
     * Document Update Tool
     * Updates existing document content based on user description
     *
     * Flow:
     * 1. Fetches existing document
     * 2. Generates new content based on update description
     * 3. Streams updates to UI in real-time
     * 4. Saves updated content
     *
     * Error Handling:
     * - Checks document existence
     * - Validates user ownership (via userId)
     *
     * UI Updates:
     * - 'clear': Prepares for new content
     * - 'text-delta': Real-time content updates
     * - 'finish': Completion indicator
     */
    updateDocument: {
      description: "Update a document with the given description",
      parameters: z.object({
        id: z.string().describe("The ID of the document to update"),
        description: z
          .string()
          .describe("The description of changes that need to be made"),
      }),
      execute: async ({
        id,
        description,
      }: {
        id: string;
        description: string;
      }) => {
        console.log("Updating document using model:", modelId);
        const document = await getDocumentById(id);

        if (!document) {
          return { error: "Document not found" };
        }

        const { content: currentContent } = document;

        if (!currentContent) {
          return { error: "Document content is empty" };
        }

        let draftText: string = "";

        streamingData.append({
          type: "clear",
          content: document.title,
        });

        const { fullStream } = await streamText({
          model: customModel(modelId),
          system:
            "You are a helpful writing assistant. Based on the description, please update the piece of writing.",
          experimental_providerMetadata: {
            openai: {
              prediction: {
                type: "content",
                content: currentContent,
              },
            },
          },
          messages: [
            { role: "user", content: description },
            { role: "user", content: currentContent },
          ],
        });

        for await (const delta of fullStream) {
          if (delta.type === "text-delta") {
            draftText += delta.textDelta;
            streamingData.append({
              type: "text-delta",
              content: delta.textDelta,
            });
          }
        }

        streamingData.append({ type: "finish", content: "" });

        await saveDocument({
          id,
          title: document.title || "Untitled Document",
          content: draftText,
          userId,
        });

        return {
          id,
          title: document.title,
          content: "The document has been updated successfully.",
        };
      },
    },
  };

  if (!isBrowseEnabled) {
    return baseTools;
  }

  return {
    ...baseTools,
    browseInternet: {
      description: "Search the internet for information about a topic",
      parameters: z.object({
        query: z.string().describe("The search query to look up"),
      }),
      execute: async ({ query }: { query: string }) => {
        try {
          const toolCallId = generateUUID();

          // 1. Search using Serper
          streamingData.append({
            type: "status",
            content: "Searching the web...",
          });
          const sources = await searchSerper(query);

          // 2. Scrape with r.jina.ai
          const scrapedContent = [];
          streamingData.append({
            type: "status",
            content: "Found relevant sources",
          });

          for (let i = 0; i < sources.length; i++) {
            streamingData.append({
              type: "status",
              content: "Analyzing sources",
            });

            const content = await scrapeWithJina(sources[i].url);
            if (content) {
              scrapedContent.push({ ...sources[i], content });
            }
          }

          // Return raw data for the AI to process
          return {
            toolCallId,
            sources: sources.map((source) => ({
              title: source.title,
              url: source.url,
            })),
            scrapedContent: scrapedContent.map((item) => ({
              title: item.title,
              content: item.content,
            })),
          };
        } catch (error) {
          console.error("Error in browseInternet tool:", error);
          return {
            toolCallId: generateUUID(),
            error: `Failed to complete internet search: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
          };
        }
      },
    },
  };
}

// Helper functions
async function searchSerper(query: string, num: number = 5) {
  const SERPER_API_KEY = process.env.SERPER_API_KEY;
  if (!SERPER_API_KEY) {
    throw new Error("SERPER_API_KEY is required");
  }

  const response = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: {
      "X-API-KEY": SERPER_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: query,
      num: num,
    }),
  });

  const rawJSON = await response.json();
  const data = SerperJSONSchema.parse(rawJSON);

  return data.organic.map((result) => ({
    title: result.title,
    url: result.link,
  }));
}

async function scrapeWithJina(url: string) {
  try {
    const jinaUrl = `https://r.jina.ai/${url}`;
    const scrapeResponse = await fetch(jinaUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!scrapeResponse.ok) {
      throw new Error(`Jina AI scraping failed: ${scrapeResponse.statusText}`);
    }

    const scrapedContent = await scrapeResponse.json();
    if (!scrapedContent || Object.keys(scrapedContent).length === 0) {
      throw new Error("No content scraped from the website");
    }

    return cleanedText(JSON.stringify(scrapedContent));
  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error);
    return "";
  }
}

function cleanedText(text: string) {
  return text
    .trim()
    .replace(/(\n){4,}/g, "\n\n\n")
    .replace(/\n\n/g, " ")
    .replace(/ {3,}/g, "  ")
    .replace(/\t/g, "")
    .replace(/\n+(\s*\n)*/g, "\n")
    .substring(0, 20000);
}
