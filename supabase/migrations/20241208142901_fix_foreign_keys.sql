-- First, remove existing foreign key constraints
ALTER TABLE public.file_uploads 
DROP CONSTRAINT IF EXISTS file_uploads_chat_id_fkey;

ALTER TABLE public.pdf_documents 
DROP CONSTRAINT IF EXISTS pdf_documents_conversation_fkey;

-- Add new foreign key constraints
ALTER TABLE public.file_uploads 
ADD CONSTRAINT file_uploads_chat_id_fkey 
FOREIGN KEY (chat_id) REFERENCES public.chats(id) ON DELETE CASCADE;

ALTER TABLE public.pdf_documents 
ADD CONSTRAINT pdf_documents_chat_id_fkey 
FOREIGN KEY (conversation_id) REFERENCES public.chats(id) ON DELETE CASCADE;

-- Rename conversation_id column to chat_id for consistency
ALTER TABLE public.pdf_documents 
RENAME COLUMN conversation_id TO chat_id;