-- ============================================================================
-- Rollback Migration: Remove User Authentication System
-- Description: Reverses all changes made by 001_add_auth_system.sql
-- Date: 2025-11-16
-- WARNING: This will delete all user profiles and reset security policies
-- ============================================================================

-- ============================================================================
-- Drop RLS policies from chart_data
-- ============================================================================

DROP POLICY IF EXISTS "users_can_update_own_chart_data" ON public.chart_data;
DROP POLICY IF EXISTS "users_can_create_own_chart_data" ON public.chart_data;
DROP POLICY IF EXISTS "users_can_read_own_chart_data" ON public.chart_data;

-- Disable RLS on chart_data (optional - uncomment if you want to disable)
-- ALTER TABLE public.chart_data DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Drop RLS policies from tasks
-- ============================================================================

DROP POLICY IF EXISTS "users_can_delete_own_tasks" ON public.tasks;
DROP POLICY IF EXISTS "users_can_update_own_tasks" ON public.tasks;
DROP POLICY IF EXISTS "users_can_create_own_tasks" ON public.tasks;
DROP POLICY IF EXISTS "users_can_read_own_tasks" ON public.tasks;

-- Disable RLS on tasks (optional - uncomment if you want to disable)
-- ALTER TABLE public.tasks DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Drop RLS policies from orders
-- ============================================================================

DROP POLICY IF EXISTS "users_can_delete_own_orders" ON public.orders;
DROP POLICY IF EXISTS "users_can_update_own_orders" ON public.orders;
DROP POLICY IF EXISTS "users_can_create_own_orders" ON public.orders;
DROP POLICY IF EXISTS "users_can_read_own_orders" ON public.orders;
DROP POLICY IF EXISTS "admins_can_manage_all_orders" ON public.orders;

-- Disable RLS on orders (optional - uncomment if you want to disable)
-- ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Drop triggers and functions related to profiles
-- ============================================================================

-- Drop trigger for updating updated_at
DROP TRIGGER IF EXISTS on_profile_updated ON public.profiles;

-- Drop trigger for creating profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop function for making users admin
DROP FUNCTION IF EXISTS public.make_user_admin(TEXT);

-- Drop function for checking admin status
DROP FUNCTION IF EXISTS public.is_admin();

-- Drop function for handling updated_at
DROP FUNCTION IF EXISTS public.handle_updated_at();

-- Drop function for handling new user creation
DROP FUNCTION IF EXISTS public.handle_new_user();

-- ============================================================================
-- Drop RLS policies from profiles
-- ============================================================================

DROP POLICY IF EXISTS "admins_can_delete_profiles" ON public.profiles;
DROP POLICY IF EXISTS "admins_can_update_all_profiles" ON public.profiles;
DROP POLICY IF EXISTS "users_can_update_own_profile" ON public.profiles;
DROP POLICY IF EXISTS "admins_can_read_all_profiles" ON public.profiles;
DROP POLICY IF EXISTS "users_can_read_own_profile" ON public.profiles;

-- ============================================================================
-- Drop profiles table and related objects
-- ============================================================================

-- Drop indexes
DROP INDEX IF EXISTS public.idx_profiles_email;
DROP INDEX IF EXISTS public.idx_profiles_role;

-- Disable RLS before dropping table
ALTER TABLE IF EXISTS public.profiles DISABLE ROW LEVEL SECURITY;

-- Drop the profiles table
DROP TABLE IF EXISTS public.profiles CASCADE;

-- ============================================================================
-- Drop enum type
-- ============================================================================

DROP TYPE IF EXISTS user_role;

-- ============================================================================
-- Revoke permissions (optional)
-- ============================================================================

-- Note: Be careful with these as they might affect other parts of your app
-- REVOKE SELECT, INSERT, UPDATE ON public.profiles FROM authenticated;
-- REVOKE SELECT ON public.profiles FROM anon;

-- ============================================================================
-- Rollback Complete
-- ============================================================================

-- Note: This rollback script:
-- 1. Removes all RLS policies added by the migration
-- 2. Drops all triggers and functions
-- 3. Deletes the profiles table (ALL USER DATA WILL BE LOST)
-- 4. Removes the user_role enum type
-- 5. Does NOT delete users from auth.users table (Supabase Auth manages this)

-- To fully remove users, you need to delete them through Supabase Dashboard
-- or use: DELETE FROM auth.users WHERE email = 'user@example.com';
