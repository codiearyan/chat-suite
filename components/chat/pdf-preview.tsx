"use client";

import { FileIcon } from "lucide-react";
import { formatFileSize } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PDFPreviewProps {
  url: string;
  fileName: string;
  fileSize: number;
  className?: string;
  onClick?: () => void;
}

export function PDFPreview({ url, fileName, fileSize, className, onClick }: PDFPreviewProps) {
  // Extract the actual filename from the URL
  const actualFileName = decodeURIComponent(fileName.split('/').pop() || fileName);
  
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
        <div className="mb-3">
          <FileIcon className="h-8 w-8 text-primary" />
        </div>
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
            Click to open PDF
          </span>
        </div>
      </div>
    </div>
  );
}
