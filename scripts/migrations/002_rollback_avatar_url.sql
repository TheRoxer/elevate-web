-- Rollback: Remove avatar_url column from profiles table

-- Drop storage policies
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Public can view avatars" ON storage.objects;

-- Remove avatar_url column from profiles table
ALTER TABLE public.profiles
DROP COLUMN IF EXISTS avatar_url;

-- Optionally delete the avatars bucket (commented out for safety)
-- DELETE FROM storage.buckets WHERE id = 'avatars';
