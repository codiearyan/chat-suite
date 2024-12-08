-- Create table for storing extracted document content
CREATE TABLE public.document_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_id UUID NOT NULL REFERENCES public.file_uploads(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create embeddings table for vector search
CREATE TABLE public.embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_id UUID NOT NULL REFERENCES public.file_uploads(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding vector(1536),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Drop existing policies if they exist
DO $$ 
BEGIN
    -- Drop document_content policies if they exist
    BEGIN
        DROP POLICY IF EXISTS "Users can insert their own document content" ON "document_content";
        DROP POLICY IF EXISTS "Users can view their own document content" ON "document_content";
    EXCEPTION
        WHEN undefined_object THEN
            NULL;
    END;

    -- Drop embeddings policies if they exist
    BEGIN
        DROP POLICY IF EXISTS "Users can insert their own embeddings" ON "embeddings";
        DROP POLICY IF EXISTS "Users can view their own embeddings" ON "embeddings";
    EXCEPTION
        WHEN undefined_object THEN
            NULL;
    END;
END $$;

-- Enable RLS if not already enabled
ALTER TABLE IF EXISTS "document_content" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "embeddings" ENABLE ROW LEVEL SECURITY;

-- Recreate policies for document_content
CREATE POLICY "Users can insert their own document content"
    ON "document_content"
    FOR INSERT
    WITH CHECK (
        exists (
            select 1 from file_uploads
            where file_uploads.id = document_content.file_id
            and file_uploads.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view their own document content"
    ON "document_content"
    FOR SELECT
    USING (
        exists (
            select 1 from file_uploads
            where file_uploads.id = document_content.file_id
            and file_uploads.user_id = auth.uid()
        )
    );

-- Recreate policies for embeddings
CREATE POLICY "Users can insert their own embeddings"
    ON "embeddings"
    FOR INSERT
    WITH CHECK (
        exists (
            select 1 from file_uploads
            where file_uploads.id = embeddings.file_id
            and file_uploads.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view their own embeddings"
    ON "embeddings"
    FOR SELECT
    USING (
        exists (
            select 1 from file_uploads
            where file_uploads.id = embeddings.file_id
            and file_uploads.user_id = auth.uid()
        )
    );

-- Grant permissions if not already granted
GRANT ALL ON public.document_content TO authenticated;
GRANT ALL ON public.embeddings TO authenticated;

-- Indexes
CREATE INDEX document_content_file_id_idx ON public.document_content(file_id);
CREATE INDEX embeddings_file_id_idx ON public.embeddings(file_id);