-- Migration: Add avatar_url column to profiles table
-- Description: Adds support for user profile pictures stored in Supabase Storage

-- Add avatar_url column to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Create a storage bucket for avatars if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for avatars bucket
-- Allow users to upload their own avatar
CREATE POLICY "Users can upload their own avatar"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (auth.uid()::text = (storage.foldername(name))[1])
);

-- Allow users to update their own avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (auth.uid()::text = (storage.foldername(name))[1])
);

-- Allow users to delete their own avatar
CREATE POLICY "Users can delete their own avatar"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (auth.uid()::text = (storage.foldername(name))[1])
);

-- Allow public read access to avatars
CREATE POLICY "Public can view avatars"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- Add comment to column
COMMENT ON COLUMN public.profiles.avatar_url IS 'URL to user profile picture in Supabase Storage';
