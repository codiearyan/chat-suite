-- Drop existing policies for embeddings table
DROP POLICY IF EXISTS "Users can insert their own embeddings" ON embeddings;
DROP POLICY IF EXISTS "Users can select their own embeddings" ON embeddings;
DROP POLICY IF EXISTS "Users can update their own embeddings" ON embeddings;
DROP POLICY IF EXISTS "Users can delete their own embeddings" ON embeddings;

-- Create simpler policies that check through chat_id
CREATE POLICY "Users can insert their own embeddings"
ON embeddings
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM chats c
    WHERE c.id = embeddings.chat_id
    AND c.user_id = auth.uid()
  )
);

CREATE POLICY "Users can select their own embeddings"
ON embeddings
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM chats c
    WHERE c.id = embeddings.chat_id
    AND c.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own embeddings"
ON embeddings
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM chats c
    WHERE c.id = embeddings.chat_id
    AND c.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete their own embeddings"
ON embeddings
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM chats c
    WHERE c.id = embeddings.chat_id
    AND c.user_id = auth.uid()
  )
); 