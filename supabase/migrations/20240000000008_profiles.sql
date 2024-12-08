-- Update the default value for credits column
ALTER TABLE public.profiles 
ALTER COLUMN credits SET DEFAULT 10;