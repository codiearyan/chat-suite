"use client";

import { Attachment, ChatRequestOptions, CreateMessage, Message } from "ai";
import cx from "classnames";
import { motion } from "framer-motion";
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { sanitizeUIMessages } from "@/lib/ai/chat";
import {
  AI_MODEL_DISPLAY,
  availableModels,
  AIModelDisplayInfo,
} from "@/lib/ai/models";
import { getCookie, setCookie } from "@/lib/utils/cookies";
import { Paperclip } from "lucide-react";
import { PreviewAttachment } from "./preview-attachment";
import { Button } from "../ui/button";
import { ArrowUpIcon, StopIcon } from "./icons";
import { Globe, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatFileSize } from "@/lib/utils";

const suggestedActions = [
  {
    title: "Research with Web Search",
    label: "What are the latest developments in AI in 2024?",
    action:
      "Using web search, tell me about the most significant AI developments and breakthroughs in 2024. Include specific examples and their impact.",
    icon: "🔍",
    enableWebSearch: true,
  },
  {
    title: "Canvas",
    label: "Create, edit, and collaborate on AI-powered documents seamlessly",
    action: "Create a project document for a Task Management app",
    icon: "🖌️",
    enableWebSearch: false,
  },
];

interface ExtendedAttachment extends Attachment {
  size?: number;
  id?: string;
}

interface MultimodalInputProps {
  chatId: string;
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  stop: () => void;
  attachments: Array<ExtendedAttachment>;
  setAttachments: Dispatch<SetStateAction<Array<ExtendedAttachment>>>;
  containsImages: boolean;
  messages: Array<Message>;
  setMessages: Dispatch<SetStateAction<Array<Message>>>;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions & {
      selectedModelId?: string;
      isBrowseEnabled?: boolean;
    }
  ) => void;
  className?: string;
  selectedModelId: string;
  onModelChange?: (modelId: string) => void;
  onBrowseToggle?: (enabled: boolean) => void;
  isBrowseEnabled: boolean;
  isAuthenticated: boolean;
}

// Add an interface for upload queue items
interface UploadQueueItem {
  id: string;
  name: string;
  file: File;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

// Extend the Message type to include attachments
interface ExtendedMessage extends Message {
  attachments?: ExtendedAttachment[];
  experimental_attachments?: ExtendedAttachment[];
}

export function MultimodalInput({
  chatId,
  input,
  setInput,
  isLoading,
  stop,
  attachments,
  setAttachments,
  containsImages,
  messages,
  setMessages,
  append,
  handleSubmit,
  className,
  selectedModelId: initialSelectedModelId,
  onModelChange,
  onBrowseToggle,
  isBrowseEnabled,
  isAuthenticated,
}: MultimodalInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { width } = useWindowSize();
  const router = useRouter();
  const { toast } = useToast();

  const [selectedModel, setSelectedModel] = useState<AIModelDisplayInfo>(
    () =>
      availableModels.find((model) => model.id === initialSelectedModelId) ||
      availableModels[0]
  );
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [localStorageInput, setLocalStorageInput] = useLocalStorage(
    "input",
    ""
  );
  const [uploadQueue, setUploadQueue] = useState<UploadQueueItem[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const [previewAttachments, setPreviewAttachments] = useState<
    ExtendedAttachment[]
  >([]);

  const submitForm = useCallback(() => {
    window.history.replaceState({}, "", `/chat/${chatId}`);

    handleSubmit(undefined, {
      experimental_attachments: attachments,
      selectedModelId: selectedModel.id,
      isBrowseEnabled,
    });

    setAttachments([]);
    setLocalStorageInput("");

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [
    attachments,
    handleSubmit,
    setAttachments,
    setLocalStorageInput,
    width,
    chatId,
    selectedModel.id,
    isBrowseEnabled,
  ]);

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 2
      }px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      const domValue = textareaRef.current.value;
      // Prefer DOM value over localStorage to handle hydration
      const finalValue = domValue || localStorageInput || "";
      setInput(finalValue);
      adjustHeight();
    }
    // Only run once after hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLocalStorageInput(input);
  }, [input, setLocalStorageInput]);

  useEffect(() => {
    const processUploadQueue = async () => {
      if (uploadQueue.length > 0) {
        const [currentUpload, ...remainingQueue] = uploadQueue;

        // Add file to uploading set
        setUploadingFiles((prev) => new Set(prev).add(currentUpload.id));

        try {
          const formData = new FormData();
          formData.append("file", currentUpload.file);
          formData.append("chatId", chatId);

          const response = await fetch(`/api/files/upload`, {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            setAttachments((prev) => [
              ...prev,
              {
                url: data.url,
                name: currentUpload.name,
                contentType: currentUpload.file.type,
                size: currentUpload.file.size,
                id: currentUpload.id,
              },
            ]);
          } else {
            const { error } = await response.json();
            toast({
              title: "Upload error",
              description: error,
            });
          }
        } catch (error) {
          console.error("Upload failed:", error);
          toast({
            title: "Upload failed",
            description: "Failed to upload file, please try again!",
          });
        } finally {
          // Remove file from uploading set
          setUploadingFiles((prev) => {
            const next = new Set(prev);
            next.delete(currentUpload.id);
            return next;
          });
          setUploadQueue(remainingQueue);
        }
      }
    };

    processUploadQueue();
  }, [uploadQueue, chatId]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      if (file.size === 0) {
        toast({
          title: "Empty file",
          description: `${file.name} is empty and cannot be uploaded`,
        });
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than ${formatFileSize(
            MAX_FILE_SIZE
          )}`,
        });
        return false;
      }
      // if (
      //   file.type !== "image/*" &&
      //   file.type !== "application/pdf" &&
      //   file.type !== "text/plain" &&
      //   file.type !== ".docx" &&
      //   file.type !== ".xlsx" &&
      //   file.type !== ".csv" &&
      //   file.type !== ".txt"
      // ) {
      //   toast({
      //     title: "Invalid file type",
      //     description: `${file.name} is not a valid file type`,
      //   });
      //   return false;
      // }
      return true;
    });

    if (validFiles.length >= 3) {
      toast({
        title: "Too many files",
        description: "You can only upload up to 3 files at a time",
      });
      return;
    }

    // Add files to upload queue with unique IDs
    setUploadQueue((prev) => [
      ...prev,
      ...validFiles.map((file) => ({
        id: crypto.randomUUID(),
        name: file.name,
        file,
      })),
    ]);

    // Reset input
    e.target.value = "";
  }, []);

  useEffect(() => {
    // Load both cookies on mount
    const modelIdFromCookie = getCookie("model-id");
    const browseEnabledFromCookie = getCookie("browse-enabled");

    if (modelIdFromCookie) {
      const model = availableModels.find((m) => m.id === modelIdFromCookie);
      if (model) {
        setSelectedModel(model);
      }
    }

    if (browseEnabledFromCookie === "true" && onBrowseToggle) {
      onBrowseToggle(true);
    }
  }, [onBrowseToggle]);

  const handleModelSelect = (model: AIModelDisplayInfo) => {
    setSelectedModel(model);
    setCookie("model-id", model.id);
    setIsModelDropdownOpen(false);
    onModelChange?.(model.id);
  };

  const handleBrowseClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const newValue = !isBrowseEnabled;
      onBrowseToggle?.(newValue);
      setCookie("browse-enabled", newValue.toString());
    },
    [isBrowseEnabled, onBrowseToggle]
  );

  const handleUnauthenticatedInteraction = () => {
    router.push("/auth"); // Redirect to auth page
  };

  const handleDeleteAttachment = (urlToDelete: string) => {
    setAttachments((current) =>
      current.filter((att) => att.url !== urlToDelete)
    );
  };

  const handleSuggestedAction = async (
    suggestedAction: (typeof suggestedActions)[0]
  ) => {
    window.history.replaceState({}, "", `/chat/${chatId}`);

    // Enable web search if the action requires it
    if (suggestedAction.enableWebSearch && onBrowseToggle) {
      onBrowseToggle(true);
      setCookie("browse-enabled", "true");
    }

    await append({
      role: "user",
      content: suggestedAction.action,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full" onClick={handleUnauthenticatedInteraction}>
        <div className="cursor-pointer p-4 text-center border border-dashed rounded-lg">
          Sign in to send messages
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-1 justify-center items-center">
      <div className="relative w-full flex flex-col gap-4 border-none">
        {input === "" &&
          attachments.length === 0 &&
          uploadQueue.length === 0 &&
          messages.length === 0 && (
            <div className="w-full px-1">
              <div className="text-sm text-muted-foreground/60 mb-1 font-medium">
                Get started with
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedActions.map((suggestedAction, index) => (
                  <motion.button
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ delay: 0.1 * index }}
                    key={index}
                    onClick={() => handleSuggestedAction(suggestedAction)}
                    className="group flex items-center gap-3 p-3.5 
                    bg-background/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 rounded-lg
                    border border-border/30 hover:border-blue-500/30
                    transition-all duration-200
                    hover:shadow-[0_0_1px_rgba(59,130,246,0.2)]
                    dark:hover:shadow-[0_0_1px_rgba(59,130,246,0.4)]"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                      {suggestedAction.icon}
                    </span>
                    <div className="flex flex-col items-start gap-0.5 text-left">
                      <span className="text-sm font-medium text-foreground/90">
                        {suggestedAction.title}
                      </span>
                      <span className="text-[11px] text-muted-foreground/70 line-clamp-1 group-hover:text-muted-foreground/90">
                        {suggestedAction.label}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        {(attachments.length > 0 || uploadQueue.length > 0) && (
          <div className="flex flex-row gap-2 overflow-x-scroll items-end">
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 pb-2">
                {attachments.map((attachment: any) => (
                  <div key={attachment.url} className="relative group">
                    <PreviewAttachment
                      attachment={attachment}
                      isUploading={uploadingFiles.has(attachment.id)}
                      showFileName={false}
                      size="small"
                    />
                    <button
                      onClick={() => handleDeleteAttachment(attachment.url)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {uploadQueue.map((queueItem) => (
              <PreviewAttachment
                key={queueItem.id}
                attachment={{
                  url: "",
                  name: queueItem.name,
                  contentType: "",
                }}
                isUploading={uploadingFiles.has(queueItem.id)}
              />
            ))}
          </div>
        )}

        <textarea
          ref={textareaRef}
          placeholder="Ask ChatSuite Anything..."
          value={input}
          onChange={handleInput}
          className={cn(
            "min-h-[72px] w-full max-h-[calc(100dvh)]",
            "overflow-hidden resize-none px-4 pb-10 pt-4 rounded-2xl",
            "outline-none focus:outline-none focus:ring-0",
            // Base glassmorphism
            "bg-white/5 dark:bg-zinc-900/30",
            "backdrop-blur-[12px] backdrop-saturate-150",
            "border border-white/10 dark:border-zinc-800/50",
            "shadow-[0_8px_16px_rgba(0,0,0,0.08)]",
            "dark:shadow-[0_8px_16px_rgba(0,0,0,0.2)]",
            // Shining effect
            "relative isolate",
            "before:absolute before:inset-0 before:-z-10",
            "before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.1),transparent)]",
            "before:bg-[length:200%_100%]",
            "before:animate-[shine_8s_linear_infinite]",
            // Hover and focus states
            "hover:bg-white/10 dark:hover:bg-zinc-900/40",
            "hover:border-white/20 dark:hover:border-zinc-700/50",
            "focus:bg-white/15 dark:focus:bg-zinc-900/50",
            "focus:border-white/30 dark:focus:border-zinc-700/80",
            "transition-all duration-200 ease-in-out",
            className
          )}
          rows={3}
          autoFocus
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              if (isLoading) {
                toast({
                  title: "Please wait for the model to finish its response!",
                });
              } else {
                submitForm();
              }
            }
          }}
        />
        {isLoading ? (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 border dark:border-zinc-600"
                  onClick={(event) => {
                    event.preventDefault();
                    stop();
                    setMessages((messages) => sanitizeUIMessages(messages));
                  }}
                >
                  <StopIcon size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Stop generating response</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className={cn(
                    "rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5",
                    "border border-border/50",
                    "bg-black hover:bg-black/90",
                    "dark:bg-white dark:hover:bg-white/90"
                  )}
                  onClick={(event) => {
                    event.preventDefault();
                    submitForm();
                  }}
                  disabled={input.length === 0 || uploadQueue.length > 0}
                >
                  <ArrowUpIcon
                    className="text-white dark:text-black"
                    size={16}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <div className="absolute bottom-2.5 left-2 flex gap-2 items-center">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className={cn(
                    "p-2 rounded-full transition-colors inline-flex items-center gap-2",
                    isBrowseEnabled
                      ? "bg-blue-500/10 text-blue-500 px-3" // Added more padding for text
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Globe className="h-4 w-4" />
                  {isBrowseEnabled && (
                    <span className="text-xs font-medium">Search</span>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isBrowseEnabled ? "Disable" : "Enable"} web browsing</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {AI_MODEL_DISPLAY[selectedModel.id].vision && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <label className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <Paperclip className="h-4 w-4" />
                    Attach Files
                    <input
                      type="file"
                      accept="image/*, application/pdf, .pptx, .ppt, text/plain, .docx, .csv, .txt"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileChange(e)}
                    />
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload files (max 5MB per file)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <div className="relative">
            <button
              type="button"
              className="cursor-pointer text-xs inline-flex items-center justify-center  font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-muted-foreground hover:text-primary/80 h-7 rounded-md px-2 py-1"
              onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            >
              <Image
                src={selectedModel.logo}
                alt={selectedModel.name}
                width={16}
                height={16}
                className="mr-1 rounded-sm"
              />
              {selectedModel.name}
              <svg
                className={`ml-1 h-4 w-4 transform transition-transform ${
                  isModelDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isModelDropdownOpen && (
              <ul className="absolute bottom-full mb-2 z-10 w-40 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-lg">
                {availableModels.map((model) => {
                  const modelInfo = AI_MODEL_DISPLAY[model.id];
                  const isDisabled =
                    modelInfo.isComingSoon ||
                    ((attachments.length > 0 || containsImages) &&
                      !modelInfo.vision);

                  return (
                    <li
                      key={model.id}
                      className={cn(
                        "flex flex-col items-start px-3 py-2 text-xs",
                        isDisabled
                          ? "cursor-not-allowed opacity-50 bg-zinc-100 dark:bg-zinc-700"
                          : "cursor-pointer text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                      )}
                      onClick={() => !isDisabled && handleModelSelect(model)}
                      title={
                        modelInfo.isComingSoon
                          ? "Coming Soon"
                          : isDisabled
                          ? "This model doesn't support image analysis"
                          : undefined
                      }
                    >
                      <div className="flex items-center">
                        <Image
                          src={model.logo}
                          alt={model.name}
                          width={16}
                          height={16}
                          className="mr-2 rounded-sm"
                        />
                        <span className="flex-1">{model.name}</span>
                      </div>
                      {modelInfo.isComingSoon && (
                        <span className="text-[10px] font-medium text-blue-500 mt-1">
                          Coming Soon.
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-center text-muted-foreground/60">
        ChatSuite provides AI-generated responses. Please verify information
        independently.
      </p>
    </div>
  );
}
