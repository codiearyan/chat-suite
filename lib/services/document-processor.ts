import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";


interface ProcessedDocument {
  content: string;
  metadata: Record<string, any>;
}

export async function processDocument(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<ProcessedDocument[]> {
  console.log("Starting document processing:", { 
    fileName, 
    contentType,
    fileSize: file.length 
  });
  
  let loader;
  try {
    const blob = new Blob([file], { type: contentType });
    console.log("Created blob:", { 
      size: blob.size, 
      type: blob.type,
      isBlob: blob instanceof Blob 
    });

    switch (contentType) {
      case "application/pdf":
        console.log("Using PDF loader");
        loader = new PDFLoader(blob);
        break;
      case "text/csv":
        console.log("Using CSV loader");
        loader = new CSVLoader(blob);
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        console.log("Using DOCX loader");
        loader = new DocxLoader(blob);
        break;
      case "text/plain":
        console.log("Using Text loader");
        loader = new TextLoader(blob);
        break;
      default:
        throw new Error(`Unsupported file type: ${contentType}`);
    }

    console.log("Loading document...");
    const docs = await loader.load();
    console.log("Document loaded successfully:", { 
      pageCount: docs.length,
      firstPagePreview: docs[0]?.pageContent?.substring(0, 100)
    });

    // Split documents into smaller chunks
    console.log("Splitting document into chunks...");
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await textSplitter.splitDocuments(docs);
    console.log("Document split successfully:", { 
      chunkCount: splitDocs.length 
    });

    const processedDocs = splitDocs.map((doc) => ({
      content: doc.pageContent,
      metadata: {
        ...doc.metadata,
        fileName,
        contentType,
      },
    }));

    console.log("Document processing completed:", {
      chunks: processedDocs.length,
      firstChunkPreview: processedDocs[0]?.content?.substring(0, 100),
      metadata: processedDocs[0]?.metadata
    });

    // Validate processed docs before returning
    if (!processedDocs.length) {
      throw new Error("No content was extracted from the document");
    }

    // Validate content and metadata
    processedDocs.forEach((doc, index) => {
      if (!doc.content) {
        throw new Error(`Empty content in chunk ${index}`);
      }
      if (!doc.metadata) {
        throw new Error(`Missing metadata in chunk ${index}`);
      }
    });

    return processedDocs;
  } catch (error: any) {
    console.error("Error in document processing:", {
      error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
      details: error.details,
      fileName,
      contentType
    });
    throw error;
  }
} 