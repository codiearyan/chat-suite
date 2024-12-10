import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/lib/middleware/authMiddleware";
import { uploadFile } from "@/lib/hooks/useFileUpload";
import { createClient } from "@/lib/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";
import { saveChat } from "@/lib/db/mutations";
import { processDocument } from "@/lib/services/document-processor";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB in bytes
const SUPPORTED_DOCUMENT_TYPES = [
  "application/pdf",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp"
];

export async function POST(request: NextRequest) {
  console.log("Starting file upload process...");
  
  const authResponse = await authMiddleware(request);
  if (authResponse.status === 401) {
    console.log("Authentication failed");
    return authResponse;
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const chatId = formData.get("chatId") as string;

    console.log("Received file:", {
      name: file?.name,
      type: file?.type,
      size: file?.size,
      chatId
    });

    if (!file) throw new Error("No file provided");
    if (!chatId) throw new Error("No chatId provided");

    // Validate file type
    if (!SUPPORTED_DOCUMENT_TYPES.includes(file.type) && 
        !SUPPORTED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "File size exceeds maximum limit of 4MB",
          code: "FILE_TOO_LARGE",
        },
        { status: 413 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    // Check/create chat
    const { data: existingChat } = await supabase
      .from("chats")
      .select("id")
      .eq("id", chatId)
      .single();

    if (!existingChat) {
      await saveChat({
        id: chatId,
        userId: user.id,
        title: "New Chat",
      });
    }

    // Generate unique filename and path
    const fileId = uuidv4();
    const sanitizedOriginalName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .toLowerCase();
    const fileName = `${fileId}-${sanitizedOriginalName}`;
    const uploadPath = `chat/files/${fileId}`;

    // Upload file to storage
    const { url: publicUrl, path: filePath } = await uploadFile({
      file,
      fileName,
      uploadPath,
      skipMetadata: true,
    });

    // Store file metadata in Supabase
    const { error: dbError } = await supabase
      .from("file_uploads")
      .insert({
        id: fileId,
        user_id: user.id,
        chat_id: chatId,
        context: "chat",
        filename: fileName,
        original_name: file.name,
        content_type: file.type,
        size: file.size,
        url: publicUrl,
        metadata: {
          uploadPath,
          contentType: file.type,
          isImage: SUPPORTED_IMAGE_TYPES.includes(file.type)
        },
      });

    if (dbError) throw dbError;

    // Only process documents, not images
    if (SUPPORTED_DOCUMENT_TYPES.includes(file.type)) {
      console.log("Processing document...");
      const buffer = await file.arrayBuffer();
      const processedDocs = await processDocument(
        Buffer.from(buffer), 
        file.name, 
        file.type
      );

      // Store document content
      const { error: contentError } = await supabase
        .from("document_content")
        .insert(
          processedDocs.map(doc => ({
            file_id: fileId,
            content: doc.content,
            metadata: doc.metadata,
          }))
        );

      if (contentError) throw contentError;
    }

    return NextResponse.json(
      { url: publicUrl, path: filePath },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in file upload:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "File upload failed",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}
