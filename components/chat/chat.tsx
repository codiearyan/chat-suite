"use client";

import { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { AnimatePresence } from "framer-motion";
import { useState, useCallback, useMemo } from "react";
import { useSWRConfig } from "swr";
import { useWindowSize } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { PreviewMessage, ThinkingMessage } from "@/components/chat/message";
import { useScrollToBottom } from "@/components/chat/use-scroll-to-bottom";
import { Block, UIBlock } from "./canvas/canvas";
import { BlockStreamHandler } from "./canvas/canvas-stream-handler";
import { MultimodalInput } from "./multimodal-input";
import { AppInfo } from "@/app/chat/info";
import { setCookie } from "@/lib/utils/cookies";
import { useToast } from "@/components/ui/use-toast";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Credits, CREDIT_UPDATE_EVENT } from "@/components/ui/credits";

interface ExtendedMessage extends Message {
  attachments?: Attachment[];
  experimental_attachments?: Attachment[];
}

function hasImagesInConversation(messages: ExtendedMessage[]): boolean {
  return messages.some(
    (message) =>
      message.attachments?.some((attachment) =>
        attachment.contentType?.startsWith("image/")
      ) ||
      message.experimental_attachments?.some((attachment) =>
        attachment.contentType?.startsWith("image/")
      )
  );
}

export function Chat({
  id,
  initialMessages,
  selectedModelId,
  initialBrowseEnabled = false,
  isAuthenticated = false,
}: {
  id: string;
  initialMessages: Array<ExtendedMessage>;
  selectedModelId: string;
  initialBrowseEnabled?: boolean;
  isAuthenticated?: boolean;
}) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [currentModelId, setCurrentModelId] = useState(selectedModelId);
  const [isBrowseEnabled, setIsBrowseEnabled] = useState(initialBrowseEnabled);
  const { toast } = useToast();

  const handleBrowseToggle = useCallback((enabled: boolean) => {
    setIsBrowseEnabled(enabled);
    setCookie("browse-enabled", enabled.toString());
  }, []);

  const handleModelChange = useCallback((modelId: string) => {
    setCurrentModelId(modelId);
    setCookie("model-id", modelId);
  }, []);

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    data: streamingData,
  } = useChat({
    id,
    api: "/api/chat",
    body: {
      id,
      selectedModelId: currentModelId,
      isBrowseEnabled,
    },
    initialMessages,
    onError: (error) => {
      if (error?.message?.includes("Insufficient credits")) {
        toast({
          variant: "destructive",
          title: "Out of Credits",
          description: (
            <div className="flex flex-col gap-2">
              <p className="font-medium text-foreground">
                {error.message
                  .replace('{"error":"Insufficient credits","message":"', "")
                  .replace('"}', "")}
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Each message costs 1 credit when using our AI models.</p>
                <p>Purchase more credits to continue your conversation.</p>
              </div>
              <a
                href="/"
                className="text-primary hover:underline font-medium inline-flex items-center gap-1 mt-1"
              >
                Get more credits <span aria-hidden="true">→</span>
              </a>
            </div>
          ),
          duration: 7000,
          className: "bg-background border-border",
        });
      }
    },
    onResponse: (response) => {
      const creditUsageHeader = response.headers.get("x-credit-usage");

      if (creditUsageHeader) {
        try {
          const usage = JSON.parse(creditUsageHeader);

          // Dispatch credit update event
          window.dispatchEvent(
            new CustomEvent(CREDIT_UPDATE_EVENT, {
              detail: usage.remaining,
            })
          );

          if (usage.remaining <= 5) {
            toast({
              description: (
                <div className="flex flex-col gap-4 p-1">
                  <div className="flex items-start gap-3">
                    <InfoCircledIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                    <div className="space-y-1">
                      <p className="font-medium text-[15px] text-foreground">
                        -{usage.cost} credit used for this message
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {usage.remaining} credits remaining
                      </p>
                    </div>
                  </div>

                  <div className="ml-8 space-y-4">
                    <p className="text-[15px] font-medium text-blue-600 dark:text-blue-400">
                      You're running low on credits
                    </p>

                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2.5">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-1.5" />
                        <p className="text-[14px] text-muted-foreground">
                          Each message costs 1 credit
                        </p>
                      </div>

                      <a
                        href="/"
                        className="text-[14px] text-green-600 dark:text-green-400 leading-normal pl-1 font-medium hover:underline"
                      >
                        Purchase more credits to continue chatting →
                      </a>
                    </div>
                  </div>
                </div>
              ),
              duration: 5000,
              className: "bg-background border-border",
            });
          }
        } catch (error) {
          console.error("[Frontend] Error parsing credit usage:", error);
        }
      }
    },
    onFinish: () => {
      mutate("/api/history");
    },
  });

  const { width: windowWidth = 1920, height: windowHeight = 1080 } =
    useWindowSize();

  const [block, setBlock] = useState<UIBlock>({
    documentId: "init",
    content: "",
    title: "",
    status: "idle",
    isVisible: false,
    boundingBox: {
      top: windowHeight / 4,
      left: windowWidth / 4,
      width: 250,
      height: 50,
    },
  });

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  const containsImages = useMemo(
    () => hasImagesInConversation(messages),
    [messages]
  );

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div
            ref={messagesContainerRef}
            className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll custom-scrollbar pt-4 px-4"
          >
            {messages.length === 0 && <AppInfo />}

            {messages.map((message, index) => (
              <PreviewMessage
                key={message.id}
                message={message}
                block={block}
                setBlock={setBlock}
                isLoading={isLoading && messages.length - 1 === index}
              />
            ))}

            {isLoading &&
              messages.length > 0 &&
              messages[messages.length - 1].role === "user" && (
                <ThinkingMessage />
              )}

            <div
              ref={messagesEndRef}
              className="shrink-0 min-w-[24px] min-h-[24px]"
            />
          </div>
        </div>
        <div className=" bg-background/50 backdrop-blur-sm">
          <form className="flex mx-auto px-4 pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
            <MultimodalInput
              chatId={id}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              stop={stop}
              messages={messages}
              attachments={attachments}
              setAttachments={setAttachments}
              containsImages={containsImages}
              setMessages={setMessages}
              append={append}
              selectedModelId={currentModelId}
              onModelChange={handleModelChange}
              isBrowseEnabled={isBrowseEnabled}
              onBrowseToggle={handleBrowseToggle}
              className="bg-background/50 dark:bg-background/30"
              isAuthenticated={isAuthenticated}
            />
          </form>
        </div>
      </div>

      <AnimatePresence>
        {block && block.isVisible && (
          <Block
            chatId={id}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            attachments={attachments}
            setAttachments={setAttachments}
            append={append}
            block={block}
            setBlock={setBlock}
            messages={messages}
            setMessages={setMessages}
            selectedModelId={currentModelId}
            isBrowseEnabled={isBrowseEnabled}
            onBrowseToggle={handleBrowseToggle}
            onModelChange={handleModelChange}
          />
        )}
      </AnimatePresence>

      <BlockStreamHandler streamingData={streamingData} setBlock={setBlock} />
    </>
  );
}
