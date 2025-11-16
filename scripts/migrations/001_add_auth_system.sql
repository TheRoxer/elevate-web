-- ============================================================================
-- Migration: Add User Authentication System with Role-Based Access Control
-- Description: Creates profiles table, RLS policies, and auth triggers
-- Date: 2025-11-16
-- ============================================================================

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Create profiles table to extend auth.users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index for faster role lookups
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_email ON public.profiles(email);

-- Function to check if current user is admin (prevents infinite recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can read their own profile OR if they're admin, read all
CREATE POLICY "users_can_read_profiles" ON public.profiles
  FOR SELECT
  USING (
    auth.uid() = id OR public.is_admin()
  );

-- RLS Policy: Users can update their own profile (except role)
CREATE POLICY "users_can_update_own_profile" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    (role = (SELECT role FROM public.profiles WHERE id = auth.uid()) OR public.is_admin())
  );

-- RLS Policy: Admins can update any profile including roles
CREATE POLICY "admins_can_update_all_profiles" ON public.profiles
  FOR UPDATE
  USING (public.is_admin());

-- RLS Policy: Admins can delete profiles
CREATE POLICY "admins_can_delete_profiles" ON public.profiles
  FOR DELETE
  USING (public.is_admin());

-- Function: Auto-create profile when new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'user')
  );
  RETURN NEW;
END;
$$;

-- Trigger: Execute handle_new_user on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function: Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Trigger: Update updated_at on profile changes
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- Update existing tables with user-based RLS policies
-- ============================================================================

-- Enable RLS on orders table if not already enabled
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "users_can_read_own_orders" ON public.orders;
DROP POLICY IF EXISTS "users_can_create_own_orders" ON public.orders;
DROP POLICY IF EXISTS "users_can_update_own_orders" ON public.orders;
DROP POLICY IF EXISTS "users_can_delete_own_orders" ON public.orders;
DROP POLICY IF EXISTS "admins_can_manage_all_orders" ON public.orders;

-- RLS Policy: Users can read their own orders, admins can read all
CREATE POLICY "users_can_read_own_orders" ON public.orders
  FOR SELECT
  USING (
    user_id = auth.uid() OR public.is_admin()
  );

-- RLS Policy: Users can create orders for themselves
CREATE POLICY "users_can_create_own_orders" ON public.orders
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- RLS Policy: Users can update their own orders, admins can update all
CREATE POLICY "users_can_update_own_orders" ON public.orders
  FOR UPDATE
  USING (
    user_id = auth.uid() OR public.is_admin()
  );

-- RLS Policy: Users can delete their own orders, admins can delete all
CREATE POLICY "users_can_delete_own_orders" ON public.orders
  FOR DELETE
  USING (
    user_id = auth.uid() OR public.is_admin()
  );

-- ============================================================================
-- Update tasks table with RLS
-- ============================================================================

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users_can_read_own_tasks" ON public.tasks;
DROP POLICY IF EXISTS "users_can_create_own_tasks" ON public.tasks;
DROP POLICY IF EXISTS "users_can_update_own_tasks" ON public.tasks;
DROP POLICY IF EXISTS "users_can_delete_own_tasks" ON public.tasks;

-- Tasks inherit permissions from their parent order
CREATE POLICY "users_can_read_own_tasks" ON public.tasks
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = tasks.order_id
      AND (orders.user_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "users_can_create_own_tasks" ON public.tasks
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = tasks.order_id
      AND (orders.user_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "users_can_update_own_tasks" ON public.tasks
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = tasks.order_id
      AND (orders.user_id = auth.uid() OR public.is_admin())
    )
  );

CREATE POLICY "users_can_delete_own_tasks" ON public.tasks
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = tasks.order_id
      AND (orders.user_id = auth.uid() OR public.is_admin())
    )
  );

-- ============================================================================
-- Update chart_data table with RLS
-- ============================================================================

ALTER TABLE public.chart_data ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users_can_read_own_chart_data" ON public.chart_data;
DROP POLICY IF EXISTS "users_can_create_own_chart_data" ON public.chart_data;
DROP POLICY IF EXISTS "users_can_update_own_chart_data" ON public.chart_data;

CREATE POLICY "users_can_read_own_chart_data" ON public.chart_data
  FOR SELECT
  USING (
    user_id = auth.uid() OR public.is_admin()
  );

CREATE POLICY "users_can_create_own_chart_data" ON public.chart_data
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_can_update_own_chart_data" ON public.chart_data
  FOR UPDATE
  USING (
    user_id = auth.uid() OR public.is_admin()
  );

-- ============================================================================
-- Grant necessary permissions
-- ============================================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant permissions on profiles table
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;

-- ============================================================================
-- Create first admin user (optional - uncomment and update email)
-- ============================================================================

-- After running this migration, manually create an admin user by:
-- 1. Sign up a user through the app
-- 2. Run: UPDATE public.profiles SET role = 'admin' WHERE email = 'your-admin@example.com';
-- OR create a function to do this:

CREATE OR REPLACE FUNCTION public.make_user_admin(user_email TEXT)
RETURNS VOID
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.profiles
  SET role = 'admin'
  WHERE email = user_email;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User with email % not found', user_email;
  END IF;
END;
$$;

-- Usage: SELECT public.make_user_admin('admin@example.com');

-- ============================================================================
-- Migration Complete
-- ============================================================================
