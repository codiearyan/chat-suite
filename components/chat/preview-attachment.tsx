import { Attachment } from "ai";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PDFPreview } from "./pdf-preview";

// Extend the Attachment type to include size and id
interface ExtendedAttachment extends Attachment {
  size?: number;
  id?: string;
}

export const PreviewAttachment = ({
  attachment,
  isUploading = false,
  showFileName = false,
  size = "small",
}: {
  attachment: ExtendedAttachment;
  isUploading?: boolean;
  showFileName?: boolean;
  size?: "small" | "normal" | "large";
}) => {
  const { name, url, contentType } = attachment;

  const sizeClasses = {
    small: "w-[120px]",
    normal: "w-[240px]",
    large: "w-[360px]",
  };

  // Ensure URL is defined before passing to PDFPreview
  if (!url && !isUploading) {
    return (
      <div className={cn(sizeClasses[size], "shrink-0")}>
        <div className="relative rounded-lg overflow-hidden bg-muted border border-border aspect-square w-full flex items-center justify-center">
          <span className="text-sm text-muted-foreground">No preview</span>
        </div>
        {showFileName && name && (
          <p className="mt-1 text-sm text-muted-foreground truncate text-center">
            {name}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={cn(sizeClasses[size], "shrink-0")}>
      <div className="relative rounded-lg overflow-hidden bg-muted w-full">
        {isUploading ? (
          <div className="aspect-square w-full flex flex-col items-center justify-center gap-2 border border-border rounded-lg">
            <LoaderIcon className="w-6 h-6 animate-spin text-primary" />
            <span className="text-xs text-muted-foreground">Uploading...</span>
          </div>
        ) : contentType?.startsWith("application/pdf") && url ? (
          <PDFPreview
            url={url}
            fileName={name ?? "Untitled PDF"}
            fileSize={attachment.size ?? 0}
            className="w-full h-full"
          />
        ) : contentType?.startsWith("image") && url ? (
          <div className="relative aspect-square">
            <img
              src={url}
              alt={name ?? "Uploaded image"}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-square w-full flex items-center justify-center">
            <span className="text-sm text-muted-foreground">No preview</span>
          </div>
        )}
      </div>
      {showFileName && name && (
        <p className="mt-1 text-sm text-muted-foreground truncate text-center">
          {name}
        </p>
      )}
    </div>
  );
};
