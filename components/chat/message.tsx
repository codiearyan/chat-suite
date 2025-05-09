"use client";

import { Message, Attachment } from "ai";
import cx from "classnames";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Globe } from "lucide-react";
import { UIBlock } from "./canvas/canvas";
import { DocumentToolCall, DocumentToolResult } from "./agent-actions";
import { Markdown } from "./markdown";
import { MessageActions } from "./message-actions";
import { PreviewAttachment } from "./preview-attachment";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type ToolState = "running" | "result" | "partial-call";

interface ToolStatus {
  content: string;
  progress?: {
    found: number;
    scraped: number;
  };
}

interface ToolInvocation {
  toolName: string;
  toolCallId: string;
  state: ToolState;
  args: any;
  result?: any;
  status?: ToolStatus;
}

interface ToolInvocationWithResult extends ToolInvocation {
  result?: any;
  status?: ToolStatus;
}

interface InternetSearchResultProps {
  result?: {
    sources: Array<{ title: string; url: string }>;
    summary: string;
  };
  isLoading: boolean;
  status?: string;
}

interface ExtendedMessage extends Message {
  attachments?: Attachment[];
  experimental_attachments?: Attachment[];
}

interface PreviewMessageProps {
  message: ExtendedMessage;
  block: UIBlock;
  setBlock: Dispatch<SetStateAction<UIBlock>>;
  isLoading?: boolean;
  className?: string;
  userEmail?: string;
}

function getUserInitial(email?: string): string {
  if (!email) return "U";
  return email.charAt(0).toUpperCase();
}

export function PreviewMessage({
  message,
  block,
  setBlock,
  isLoading,
  className,
  userEmail,
}: PreviewMessageProps) {
  // Parse tool results from message content if it's a tool message
  const toolResults = useMemo(() => {
    if (message.role === "tool" && typeof message.content === "string") {
      try {
        const parsed = JSON.parse(message.content);
        // Skip rendering if it's a fetch_document_content result
        if (parsed.toolName === "fetch_document_content") {
          return [];
        }
        return [parsed];
      } catch (e) {
        console.error("Failed to parse tool message content:", e);
        return [];
      }
    }
    return [];
  }, [message]);

  // Filter out fetch_document_content from toolInvocations
  const allToolInvocations = useMemo(() => {
    const combined = [...(message.toolInvocations || []), ...toolResults];
    return combined.filter(
      (invocation) => invocation.toolName !== "fetch_document_content"
    );
  }, [message.toolInvocations, toolResults]);

  // Only render content if it's not a tool message or if it's a meaningful message
  const shouldRenderContent =
    message.role !== "tool" ||
    (message.role === "tool" &&
      !message.content.includes("fetch_document_content"));

  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={message.role}
    >
      {message.role === "user" && (
        <div className="flex justify-end items-center gap-2">
          <div className="flex-1" /> {/* Spacer */}
          <div
            className={cx(
              "bg-primary py-2 px-3 rounded-2xl w-fit max-w-2xl text-white",
              className
            )}
          >
            {(message.experimental_attachments ?? []).length > 0 && (
              <div className="flex flex-wrap gap-1">
                {message.experimental_attachments?.map((attachment) => (
                  <div key={attachment.url} className="flex-shrink-0">
                    <PreviewAttachment
                      attachment={attachment}
                      showFileName={false}
                      size="normal"
                    />
                  </div>
                ))}
              </div>
            )}
            {shouldRenderContent && (
              <div className="prose dark:prose-invert [&_*]:text-white">
                <Markdown>{message.content}</Markdown>
              </div>
            )}
            {allToolInvocations.length > 0 && (
              <div className="flex flex-col gap-4">
                {allToolInvocations.map(
                  (toolInvocation: ToolInvocationWithResult) => {
                    const {
                      toolName,
                      toolCallId,
                      state,
                      args,
                      result,
                      status,
                    } = toolInvocation;

                    if (state === "result") {
                      return (
                        <div key={toolCallId}>
                          {toolName === "createDocument" ? (
                            <DocumentToolResult
                              type="create"
                              result={result}
                              block={block}
                              setBlock={setBlock}
                            />
                          ) : toolName === "updateDocument" ? (
                            <DocumentToolResult
                              type="update"
                              result={result}
                              block={block}
                              setBlock={setBlock}
                            />
                          ) : toolName === "browseInternet" ? (
                            <InternetSearchResult
                              isLoading={state !== "result"}
                              result={result}
                              status={status?.content}
                            />
                          ) : (
                            <pre>{JSON.stringify(result, null, 2)}</pre>
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={toolCallId}
                          className={cx({
                            skeleton: false,
                          })}
                        >
                          {toolName === "createDocument" ? (
                            <DocumentToolCall type="create" args={args} />
                          ) : toolName === "updateDocument" ? (
                            <DocumentToolCall type="update" args={args} />
                          ) : toolName === "browseInternet" ? (
                            <InternetSearchResult
                              isLoading={true}
                              status={status?.content}
                            />
                          ) : null}
                        </div>
                      );
                    }
                  }
                )}
              </div>
            )}
            <MessageActions message={message} isLoading={isLoading || false} />
          </div>
          <Avatar className="size-8 bg-white/20 shrink-0">
            <AvatarFallback className="text-white text-sm">
              {getUserInitial(userEmail)}
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      {message.role === "assistant" && (
        <div className="flex gap-3">
          <div className="size-8 flex bg-none  items-center rounded-full justify-center shrink-0">
            <Image
              src="/chatsuite_nobg.png"
              alt="Pivot with AI"
              className="rounded-full object-cover"
              width={24}
              height={24}
            />
          </div>
          <div className="w-full">
            {(message.experimental_attachments ?? []).length > 0 && (
              <div className="flex flex-wrap gap-1">
                {message.experimental_attachments?.map((attachment) => (
                  <div key={attachment.url} className="flex-shrink-0">
                    <PreviewAttachment
                      attachment={attachment}
                      showFileName={false}
                      size="normal"
                    />
                  </div>
                ))}
              </div>
            )}
            {shouldRenderContent && (
              <div className="prose dark:prose-invert">
                <Markdown>{message.content}</Markdown>
              </div>
            )}
            {allToolInvocations.length > 0 && (
              <div className="flex flex-col gap-4">
                {allToolInvocations.map(
                  (toolInvocation: ToolInvocationWithResult) => {
                    const {
                      toolName,
                      toolCallId,
                      state,
                      args,
                      result,
                      status,
                    } = toolInvocation;

                    if (state === "result") {
                      return (
                        <div key={toolCallId}>
                          {toolName === "createDocument" ? (
                            <DocumentToolResult
                              type="create"
                              result={result}
                              block={block}
                              setBlock={setBlock}
                            />
                          ) : toolName === "updateDocument" ? (
                            <DocumentToolResult
                              type="update"
                              result={result}
                              block={block}
                              setBlock={setBlock}
                            />
                          ) : toolName === "browseInternet" ? (
                            <InternetSearchResult
                              isLoading={state !== "result"}
                              result={result}
                              status={status?.content}
                            />
                          ) : (
                            <pre>{JSON.stringify(result, null, 2)}</pre>
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={toolCallId}
                          className={cx({
                            skeleton: false,
                          })}
                        >
                          {toolName === "createDocument" ? (
                            <DocumentToolCall type="create" args={args} />
                          ) : toolName === "updateDocument" ? (
                            <DocumentToolCall type="update" args={args} />
                          ) : toolName === "browseInternet" ? (
                            <InternetSearchResult
                              isLoading={true}
                              status={status?.content}
                            />
                          ) : null}
                        </div>
                      );
                    }
                  }
                )}
              </div>
            )}
            <MessageActions message={message} isLoading={isLoading || false} />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export const ThinkingMessage = () => {
  const role = "assistant";

  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      data-role={role}
    >
      <div
        className={cx(
          "flex gap-4 items-center group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl",
          {
            "group-data-[role=user]/message:bg-muted": true,
          }
        )}
      >
        <div className="size-8 bg-none flex items-center dark:bg-none rounded-full justify-center shrink-0">
          <Image
            src="/chatsuite_nobg.png"
            alt="Pivot with AI"
            width={24}
            height={24}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-4 text-muted-foreground">
            Thinking...
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InternetSearchResult = ({
  result,
  isLoading,
  status,
}: InternetSearchResultProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="w-fit bg-background/50 border-[0.5px] border-border/40 py-2.5 px-3.5 rounded-lg flex flex-row items-center gap-3 shadow-[0_1px_3px_0_rgb(0,0,0,0.02)] backdrop-blur-[2px]">
        <div className="text-muted-foreground/70 flex items-center">
          <Globe className="h-[15px] w-[15px] animate-pulse" />
        </div>
        <div className="text-[13px] leading-[15px] text-muted-foreground/90">
          <span className="opacity-60 font-normal">
            {status || "Searching the web..."}
          </span>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="w-fit bg-background/50 border-[0.5px] border-border/40 rounded-lg shadow-[0_1px_3px_0_rgb(0,0,0,0.02)] backdrop-blur-[2px] overflow-hidden">
      <div className="py-2.5 px-3.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground/70 flex items-center">
            <Globe className="h-[15px] w-[15px]" />
          </div>
          <div className="text-[13px] leading-[15px] text-foreground/90">
            <span className="opacity-90 font-medium">
              {result.sources.length} sources found
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          className="h-7 w-7 p-0 hover:bg-muted/50"
        >
          {isOpen ? (
            <ChevronUp className="h-[15px] w-[15px] text-muted-foreground/70" />
          ) : (
            <ChevronDown className="h-[15px] w-[15px] text-muted-foreground/70" />
          )}
        </Button>
      </div>

      {isOpen && (
        <>
          <div className="px-3.5 pb-3.5 prose dark:prose-invert max-w-none text-[13px] leading-relaxed text-muted-foreground/90">
            <Markdown>{result.summary}</Markdown>
          </div>

          <div className="border-t border-border/40 divide-y divide-border/40">
            {result.sources.map((source, i) => (
              <a
                key={i}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3.5 py-2 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-center h-5 w-5 bg-background/80 rounded-md ring-[0.5px] ring-border/40">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${source.url}&sz=32`}
                    alt=""
                    className="h-3.5 w-3.5"
                  />
                </div>
                <span className="flex-1 text-[13px] leading-[15px] text-muted-foreground/90 line-clamp-1">
                  {source.title}
                </span>
                <ChevronDown className="h-[15px] w-[15px] rotate-[-90deg] text-muted-foreground/50" />
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
