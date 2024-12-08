/**
 * Chat API Route Handler
 * This file manages the chat functionality, including message processing, document creation,
 * web information retrieval, and credit system management.
 *
 * Main Features:
 * 1. Process chat messages between user and AI
 * 2. Create and update documents based on chat interactions
 * 3. Browse the internet for information
 * 4. Save chat history and manage chat sessions
 * 5. Credit System Management:
 *    - Track and manage user credits
 *    - Handle premium vs free model access
 *    - Control access to premium features
 *    - Automatic credit deduction
 *
 * Credit System Flow:
 * 1. Check user's available credits
 * 2. Validate feature access based on credits
 * 3. Calculate costs for:
 *    - Premium AI models
 *    - Web browsing feature
 * 4. Deduct credits for premium usage
 * 5. Return credit status in response
 *
 * Available Endpoints:
 * - POST /api/chat: Process new messages, generate AI responses, handle credits
 * - DELETE /api/chat?id={chatId}: Delete an entire chat session
 */

import {
  convertToCoreMessages,
  CoreMessage,
  Message,
  StreamData,
  streamText,
  CoreUserMessage,
  generateText,
} from "ai";
import { createClient } from "@/lib/utils/supabase/server";
import { getChatById } from "@/lib/db/cached-queries";
import {
  saveChat,
  saveMessages,
  deleteChatById,
  reduceUserCredits,
} from "@/lib/db/mutations";
import { MessageRole } from "@/lib/types/supabase";
import {
  generateUUID,
  getMostRecentUserMessage,
  sanitizeResponseMessages,
} from "@/lib/ai/chat";
import { createSystemPrompt } from "@/app/chat/prompt";
import { createTools, allTools } from "@/app/chat/tools";
import { customModel } from "@/lib/ai/ai-utils";
import { getUserCreditsQuery } from "@/lib/db/queries/general";
import {
  canUseConfiguration,
} from "@/app/chat/usage-limits";
import { AIModel } from "@/lib/ai/models";

/**
 * Configuration Settings
 * - maxDuration: Maximum time (in seconds) allowed for API response
 * - customMiddleware: Custom settings for the AI model behavior
 */
export const maxDuration = 60;

/**
 * Generates a title for a new chat based on the user's first message
 * @param message - The first message from the user
 * @returns A generated title (max 80 characters)
 */
async function generateTitleFromUserMessage({
  message,
  modelId = "gpt-4o-mini",
}: {
  message: CoreUserMessage;
  modelId?: string;
}) {
  console.log("Generating title using model:", modelId);
  const { text: title } = await generateText({
    model: customModel(modelId),
    system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
    prompt: JSON.stringify(message),
  });

  return title;
}

/**
 * Gets the current authenticated user
 * @throws Error if user is not authenticated
 */
async function getUser() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized");
  }

  return user;
}

/**
 * Formats message content for database storage based on message type
 * Handles different message formats:
 * - User messages: Stored as plain text
 * - Tool messages: Stored as formatted tool results
 * - Assistant messages: Stored as text and tool calls
 */
function formatMessageContent(message: CoreMessage): string {
  // For user messages, store as plain text
  if (message.role === "user") {
    return typeof message.content === "string"
      ? message.content
      : JSON.stringify(message.content);
  }

  // For tool messages, format as array of tool results
  if (message.role === "tool") {
    return JSON.stringify(
      message.content.map((content) => ({
        type: content.type || "tool-result",
        toolCallId: content.toolCallId,
        toolName: content.toolName,
        result: content.result,
      }))
    );
  }

  // For assistant messages, format as array of text and tool calls
  if (message.role === "assistant") {
    if (typeof message.content === "string") {
      return JSON.stringify([{ type: "text", text: message.content }]);
    }

    return JSON.stringify(
      message.content.map((content) => {
        if (content.type === "text") {
          return {
            type: "text",
            text: content.text,
          };
        }
        return {
          type: "tool-call",
          toolCallId: content.toolCallId,
          toolName: content.toolName,
          args: content.args,
        };
      })
    );
  }

  return "";
}

// Add this helper function to debug message format
function debugMessageFormat(messages: Array<Message>) {
  console.log("Debug: Message format check");
  messages.forEach((msg, index) => {
    console.log(`Message ${index}:`, {
      role: msg.role,
      contentType: typeof msg.content,
      content: msg.content,
      hasToolCalls: !!msg.tool_calls,
      hasName: !!msg.name,
      hasFunctionCall: !!msg.function_call
    });
  });
}

// Add this helper function to normalize message content
function normalizeMessage(message: Message) {
  return {
    role: message.role,
    content: typeof message.content === 'object' ? JSON.stringify(message.content) : message.content,
    name: message.name,
    function_call: message.function_call,
    tool_calls: message.tool_calls,
    tool_call_id: message.tool_call_id,
  };
}

// Add this type for better type safety
interface WebSearchResult {
  toolCallId: string;
  sources: Array<{
    title: string;
    url: string;
  }>;
  content: Array<{
    title: string;
    content: string;
  }>;
  status: 'success' | 'error';
  error?: string;
}

// Update the formatWebSearchResponse function
function formatWebSearchResponse(
  sources: any[], 
  scrapedContent: any[]
): Omit<WebSearchResult, 'toolCallId' | 'status'> {
  // Format sources into a clean list
  const formattedSources = sources.slice(0, 5).map(source => ({
    title: source.title,
    url: source.url
  }));

  // Format scraped content, limiting length to prevent streaming issues
  const formattedContent = scrapedContent.map(item => ({
    title: item.title,
    content: typeof item.content === 'string' 
      ? item.content.substring(0, 2000) // Limit content length
      : JSON.stringify(item.content).substring(0, 2000)
  }));

  return {
    sources: formattedSources,
    content: formattedContent
  };
}

// Add this helper function at the top with other helpers
function validateAndCleanMessages(messages: Message[]): Message[] {
  return messages.filter(message => {
    // Ensure message has content
    if (!message.content) return false;
    
    // If content is string, check it's not empty after trimming
    if (typeof message.content === 'string') {
      return message.content.trim().length > 0;
    }
    
    // If content is an array, ensure it has non-empty items
    if (Array.isArray(message.content)) {
      return message.content.some(item => {
        if (item.type === 'text') return item.text.trim().length > 0;
        if (item.type === 'tool-call') return true; // Tool calls are valid
        return false;
      });
    }
    
    return false;
  });
}

/**
 * Main POST Handler
 * Processes incoming chat messages and generates AI responses
 *
 * Flow:
 * 1. Validates user authentication
 * 2. Creates or retrieves chat session
 * 3. Checks credit balance and feature access
 * 4. Processes message with AI
 * 5. Handles tool interactions (documents, internet)
 * 6. Manages credit deductions for premium features
 * 7. Saves chat history
 *
 * Credit Headers:
 * Returns 'x-credit-usage' with:
 * - cost: Credits used
 * - remaining: Available balance
 * - features: Premium features accessed
 *
 * @param request Contains chat ID, messages, and feature settings
 */
export async function POST(request: Request) {
  const {
    id,
    messages,
    selectedModelId,
    isBrowseEnabled,
  }: {
    id: string;
    messages: Array<Message>;
    selectedModelId?: string;
    isBrowseEnabled: boolean;
  } = await request.json();

  // Add validation early in the function
  const cleanedMessages = validateAndCleanMessages(messages);
  
  if (cleanedMessages.length === 0) {
    return new Response(
      JSON.stringify({
        error: "Invalid messages",
        message: "No valid messages found in the request"
      }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  let modelToUse: string;

  // Add debug logging
  console.log("Received request:", {
    chatId: id,
    modelId: selectedModelId,
    isBrowseEnabled,
    messageCount: cleanedMessages.length
  });

  // Debug message format
  debugMessageFormat(cleanedMessages);

  const user = await getUser();

  if (!user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Get the most recent user message for title generation
  const coreMessages = convertToCoreMessages(cleanedMessages);
  const userMessage = getMostRecentUserMessage(coreMessages);

  if (!userMessage || userMessage.role !== "user") {
    return new Response(
      JSON.stringify({
        error: "Invalid request",
        message: "No valid user message found"
      }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  const supabase = createClient();
  const credits = await getUserCreditsQuery(supabase, user.id);

  try {
    // Chat title generation logic
    const chat = await getChatById(id);

    if (!chat) {
      const title = await generateTitleFromUserMessage({
        message: userMessage as CoreUserMessage,
        modelId: selectedModelId,
      });
      await saveChat({ id, userId: user.id, title });
    } else if (chat.user_id !== user.id) {
      return new Response("Unauthorized", { status: 401 });
    } else if (chat.title === "New Chat") {
      // Update the title if it's still the default
      const title = await generateTitleFromUserMessage({
        message: userMessage as CoreUserMessage,
        modelId: selectedModelId,
      });
      await supabase
        .from("chats")
        .update({ title })
        .eq("id", id)
        .eq("user_id", user.id);
    }

    await saveMessages({
      chatId: id,
      messages: [
        {
          id: generateUUID(),
          chat_id: id,
          role: userMessage.role as MessageRole,
          content: formatMessageContent(userMessage),
          created_at: new Date().toISOString(),
        },
      ],
    });

    const streamingData = new StreamData();
    modelToUse = selectedModelId || "gpt-4o";

    // Credit check and usage - simplified since all messages cost 1 credit
    const usageCheck = canUseConfiguration(credits, {
      modelId: selectedModelId as AIModel,
    });

    if (!usageCheck.canUse) {
      return new Response(
        JSON.stringify({
          error: "Insufficient credits",
          message: usageCheck.reason,
        }),
        { status: 402, headers: { "Content-Type": "application/json" } }
      );
    }

    // Normalize messages before converting to core messages
    const normalizedMessages = cleanedMessages.map(normalizeMessage);
    const coreMessages = convertToCoreMessages(normalizedMessages);
    
    // Debug core messages
    console.log("Core messages format:", 
      coreMessages.map(msg => ({
        role: msg.role,
        contentType: typeof msg.content,
        hasToolCalls: Array.isArray(msg.content) && msg.content.some(c => c.type === 'tool-call')
      }))
    );

    // Handle response
    const fileContext = await getRecentFileContext(user.id);
    console.log("File context retrieved:", fileContext);

    const systemMessage = createSystemPrompt(isBrowseEnabled, fileContext || undefined);

    console.log("System message preview:", {
      length: systemMessage.length,
      hasFileContext: !!fileContext,
      preview: systemMessage.substring(0, 200) + "..."
    });

    const result = await streamText({
      model: customModel(modelToUse),
      system: systemMessage,
      messages: normalizedMessages,
      maxSteps: 5,
      experimental_activeTools: allTools,
      tools: createTools(streamingData, user.id, modelToUse, isBrowseEnabled),
      onFinish: async ({ responseMessages }) => {
        // Add debug logging
        console.log("Response messages format:", 
          responseMessages.map(msg => ({
            role: msg.role,
            contentType: typeof msg.content
          }))
        );
        
        if (user && user.id) {
          try {
            const sanitizedMessages = responseMessages.map(msg => {
              if (msg.role === 'tool' && typeof msg.content === 'string') {
                return {
                  ...msg,
                  content: parseToolResponse(msg.content, msg.name || 'unknown')
                };
              }
              return msg;
            });

            await saveMessages({
              chatId: id,
              messages: sanitizedMessages.map(
                (message) => {
                  const messageId = generateUUID();

                  if (message.role === "assistant") {
                    streamingData.appendMessageAnnotation({
                      messageIdFromServer: messageId,
                    });
                  }

                  return {
                    id: messageId,
                    chat_id: id,
                    role: message.role as MessageRole,
                    content: formatMessageContent(message),
                    created_at: new Date().toISOString(),
                  };
                }
              ),
            });
          } catch (error) {
            console.error("Failed to save chat:", error);
          }
        }

        streamingData.close();
      },
      experimental_telemetry: {
        isEnabled: true,
        functionId: "stream-text",
      },
    });

    // Deduct credits and update headers
    await reduceUserCredits(user.email, usageCheck.requiredCredits);
    const updatedCredits = await getUserCreditsQuery(supabase, user.id);
    
    const headers: Record<string, string> = {
      "x-credit-usage": JSON.stringify({
        cost: usageCheck.requiredCredits,
        remaining: updatedCredits,
      }),
    };

    console.log("Credit update in headers:", {
      remaining: updatedCredits,
      cost: usageCheck.requiredCredits
    });

    return result.toDataStreamResponse({
      data: streamingData,
      headers,
    });
  } catch (error) {
    // Improve error logging
    console.error("Chat route error:", {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error,
      messageCount: cleanedMessages.length,
      messagesPreview: cleanedMessages.map(m => ({
        role: m.role,
        contentType: typeof m.content,
        contentLength: typeof m.content === 'string' ? m.content.length : 'n/a'
      }))
    });

    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request",
        details: process.env.NODE_ENV === 'development' ? {
          message: error instanceof Error ? error.message : 'Unknown error',
          type: error instanceof Error ? error.name : 'Unknown type'
        } : undefined
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * DELETE Handler
 * Removes an entire chat session and its messages
 *
 * Security:
 * - Verifies user ownership of chat
 * - Only allows deletion of user's own chats
 *
 * @param request Contains chat ID to delete
 */
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const user = await getUser();

  try {
    const chat = await getChatById(id);

    if (!chat) {
      return new Response("Chat not found", { status: 404 });
    }

    if (chat.user_id !== user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await deleteChatById(id, user.id);

    return new Response("Chat deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting chat:", error);
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}

async function getRecentFileContext(userId: string): Promise<string | null> {
  const supabase = createClient();
  
  const { data: recentFile, error } = await supabase
    .from('file_uploads')
    .select('id, original_name, content_type, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !recentFile) {
    console.error("Error fetching recent file:", error);
    return null;
  }

  console.log("Found recent file:", {
    id: recentFile.id,
    name: recentFile.original_name,
    type: recentFile.content_type,
    uploadedAt: recentFile.created_at
  });

  // Format the context to make the fileId very explicit
  return `Recently uploaded file:
- fileId: "${recentFile.id}"
- fileName: "${recentFile.original_name}"
- type: "${recentFile.content_type}"
- uploadTime: "${recentFile.created_at}"`;
}
