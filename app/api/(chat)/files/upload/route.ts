import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/lib/middleware/authMiddleware";
import { uploadFile } from "@/lib/hooks/useFileUpload";
import { createClient } from "@/lib/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";
import { saveChat } from "@/lib/db/mutations";
import { processDocument } from "@/lib/services/document-processor";
import { OpenAIEmbeddings } from "@langchain/openai";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 5MB in bytes
const SUPPORTED_TYPES = [
  "application/pdf",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

function logSupabaseError(error: any) {
  console.error("Supabase Error Details:", {
    code: error?.code,
    message: error?.message,
    details: error?.details,
    hint: error?.hint,
    status: error?.status
  });
}

/**
 * API Route: Handles file uploads for the Chat app.
 *
 * This route handles file uploads and stores metadata in Supabase while
 * uploading the actual file to Cloudflare Storage.
 *
 * **Process:**
 * 1. Authenticates the user
 * 2. Validates the uploaded file and chatId
 * 3. Generates a unique file name using UUID
 * 4. Uploads file to Cloudflare Storage
 * 5. Stores file metadata in Supabase
 * 6. Returns the public URL and path
 *
 * @param {NextRequest} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response containing the uploaded file URL and path
 */
export async function POST(request: NextRequest) {
  console.log("Starting file upload process...");
  
  // Authenticate user
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
    if (!SUPPORTED_TYPES.includes(file.type)) {
      console.log("Unsupported file type:", file.type);
      throw new Error(`Unsupported file type: ${file.type}`);
    }

    // Check file size before processing
    if (file.size > MAX_FILE_SIZE) {
      console.log("File too large:", file.size);
      return NextResponse.json(
        {
          error: "File size exceeds maximum limit of 5MB",
          code: "FILE_TOO_LARGE",
        },
        { status: 413 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    if (!user) {
      console.log("User not authenticated");
      throw new Error("User not authenticated");
    }

    console.log("User authenticated:", user.id);

    // Check if chat exists
    const { data: existingChat } = await supabase
      .from("chats")
      .select("id")
      .eq("id", chatId)
      .single();

    console.log("Existing chat check:", { exists: !!existingChat });

    if (!existingChat) {
      console.log("Creating new chat...");
      await saveChat({
        id: chatId,
        userId: user.id,
        title: "New Chat",
      });
    }

    // Generate unique filename and path
    const uuid = uuidv4();
    const sanitizedOriginalName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .toLowerCase();
    const fileName = `${uuid}-${sanitizedOriginalName}`;
    const uploadPath = `chat/files/${uuid}`;

    console.log("Processing file...", { fileName, uploadPath });

    try {
      const buffer = await file.arrayBuffer();
      const fileBuffer = Buffer.from(buffer);

      // Process document
      console.log("Starting document processing...");
      const processedDocs = await processDocument(fileBuffer, file.name, file.type);
      console.log("Document processed successfully:", {
        chunks: processedDocs.length
      });

      // Upload file to storage
      console.log("Uploading file to storage...");
      const { url: publicUrl, path: filePath } = await uploadFile({
        file,
        fileName,
        uploadPath,
        skipMetadata: true,
      });
      console.log("File uploaded successfully:", { publicUrl, filePath });

      // Store file metadata
      console.log("Storing file metadata...");
      const { data: fileData, error: fileError } = await supabase
        .from("file_uploads")
        .insert({
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
          },
        })
        .select()
        .single();

      if (fileError) {
        console.error("File metadata storage error:", fileError);
        throw fileError;
      }
      console.log("File metadata stored successfully:", fileData.id);

      // Store extracted content
      console.log("Storing extracted content...", {
        fileId: fileData.id,
        docsCount: processedDocs.length,
        firstDocPreview: processedDocs[0]?.content?.substring(0, 100)
      });

      const contentInsertData = processedDocs.map((doc) => ({
        file_id: fileData.id,
        content: doc.content,
        metadata: doc.metadata,
      }));

      console.log("Content insert data:", {
        count: contentInsertData.length,
        sample: contentInsertData[0]
      });

      const { error: contentError } = await supabase
        .from("document_content")
        .insert(contentInsertData);

      if (contentError) {
        logSupabaseError(contentError);
        throw new Error(`Content storage failed: ${contentError.message}`);
      }
      console.log("Content stored successfully");

      // Generate and store embeddings
      console.log("Generating embeddings...");
      const embeddings = new OpenAIEmbeddings();
      const vectors = await embeddings.embedDocuments(
        processedDocs.map((doc) => doc.content)
      );
      console.log("Embeddings generated successfully");

      console.log("Storing embeddings...");
      const { error: embeddingError } = await supabase
        .from("embeddings")
        .insert(
          vectors.map((vector, index) => ({
            file_id: fileData.id,
            content: processedDocs[index].content,
            embedding: vector,
            metadata: processedDocs[index].metadata,
          }))
        );

      if (embeddingError) {
        console.error("Embedding storage error:", embeddingError);
        throw embeddingError;
      }
      console.log("Embeddings stored successfully");

      return NextResponse.json(
        { url: publicUrl, path: filePath },
        { status: 200 }
      );
    } catch (processingError: any) {
      console.error("Error during file processing:", {
        error: processingError,
        message: processingError.message,
        stack: processingError.stack,
        name: processingError.name,
        code: processingError.code,
        details: processingError.details
      });
      throw processingError;
    }
  } catch (error: any) {
    console.error("Error in file upload:", {
      error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      message: error.message,
      stack: error.stack,
      type: error.constructor.name,
      code: error.code,
      details: error.details
    });
    
    return NextResponse.json(
      {
        error: error.message || "File upload failed",
        details: process.env.NODE_ENV === 'development' ? {
          stack: error.stack,
          code: error.code,
          details: error.details
        } : undefined
      },
      { status: 500 }
    );
  }
}
