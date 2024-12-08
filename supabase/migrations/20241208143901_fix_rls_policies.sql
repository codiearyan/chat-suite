-- Drop existing policies for embeddings table
DROP POLICY IF EXISTS "Users can insert their own embeddings" ON embeddings;
DROP POLICY IF EXISTS "Users can select their own embeddings" ON embeddings;
DROP POLICY IF EXISTS "Users can update their own embeddings" ON embeddings;
DROP POLICY IF EXISTS "Users can delete their own embeddings" ON embeddings;

-- Add chat_id to embeddings table if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'embeddings' AND column_name = 'chat_id'
  ) THEN
    ALTER TABLE embeddings ADD COLUMN chat_id uuid REFERENCES chats(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Create new policies for embeddings table
CREATE POLICY "Users can insert their own embeddings"
ON embeddings
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM pdf_documents pd
    JOIN chats c ON pd.chat_id = c.id
    WHERE pd.id = embeddings.document_id
    AND c.user_id = auth.uid()
  )
);

CREATE POLICY "Users can select their own embeddings"
ON embeddings
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM pdf_documents pd
    JOIN chats c ON pd.chat_id = c.id
    WHERE pd.id = embeddings.document_id
    AND c.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own embeddings"
ON embeddings
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM pdf_documents pd
    JOIN chats c ON pd.chat_id = c.id
    WHERE pd.id = embeddings.document_id
    AND c.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete their own embeddings"
ON embeddings
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM pdf_documents pd
    JOIN chats c ON pd.chat_id = c.id
    WHERE pd.id = embeddings.document_id
    AND c.user_id = auth.uid()
  )
);

-- Create index for the new chat_id column
CREATE INDEX IF NOT EXISTS idx_embeddings_chat_id ON embeddings(chat_id); 