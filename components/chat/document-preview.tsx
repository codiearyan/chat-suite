"use client";

import {
  FileIcon,
  FileTextIcon,
  FileSpreadsheetIcon,
  Presentation,
} from "lucide-react";
import { formatFileSize } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface DocumentPreviewProps {
  url: string;
  fileName: string;
  fileSize: number;
  contentType: string;
  className?: string;
  onClick?: () => void;
}

function getFileIcon(contentType: string) {
  switch (contentType) {
    case "application/pdf":
      return <FileIcon className="h-8 w-8 text-red-500" />;
    case "text/csv":
      return <FileSpreadsheetIcon className="h-8 w-8 text-green-500" />;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "text/plain":
      return <FileTextIcon className="h-8 w-8 text-blue-500" />;
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    case "application/vnd.ms-powerpoint":
      return <Presentation className="h-8 w-8 text-orange-500" />;
    default:
      return <FileIcon className="h-8 w-8 text-primary" />;
  }
}

function getFileTypeLabel(contentType: string) {
  switch (contentType) {
    case "application/pdf":
      return "PDF Document";
    case "text/csv":
      return "CSV Spreadsheet";
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "Word Document";
    case "text/plain":
      return "Text Document";
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    case "application/vnd.ms-powerpoint":
      return "Presentation";
    default:
      return "Document";
  }
}

export function DocumentPreview({
  url,
  fileName,
  fileSize,
  contentType,
  className,
  onClick,
}: DocumentPreviewProps) {
  const actualFileName = decodeURIComponent(
    fileName.split("/").pop() || fileName
  );

  return (
    <div
      className={cn(
        "relative group cursor-pointer rounded-lg overflow-hidden bg-background border border-border hover:border-primary/50 transition-colors",
        className
      )}
      onClick={() => {
        if (onClick) onClick();
        else window.open(url, "_blank");
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center p-4 aspect-square">
        <div className="mb-3">{getFileIcon(contentType)}</div>
        <div className="text-center w-full">
          <p className="text-sm font-medium truncate max-w-[180px] mx-auto text-foreground">
            {actualFileName}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatFileSize(fileSize || 0)}
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-2 bg-muted/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity text-center">
          <span className="text-xs text-primary font-medium">
            Click to open {getFileTypeLabel(contentType)}
          </span>
        </div>
      </div>
    </div>
  );
}
