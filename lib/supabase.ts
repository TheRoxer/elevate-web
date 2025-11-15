/**
 * Supabase Client Configuration
 *
 * This module provides Supabase clients for both browser and server environments.
 * - Use createClient() for client-side operations
 * - Use createServerClient() for server-side operations (Server Components, API routes)
 */

import { createBrowserClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Load environment variables for Node.js scripts
if (typeof window === "undefined") {
  const { config } = require("dotenv");
  const { resolve } = require("path");
  config({ path: resolve(process.cwd(), ".env.local") });
}

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file.\n" +
      "Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

/**
 * Client-side Supabase client for use in Client Components and client-side code
 * This client automatically handles session management and authentication
 */
export const createClient = () => {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
};

/**
 * Singleton instance for client-side operations
 * Use this in client components for convenience
 */
export const supabase = createSupabaseClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

/**
 * Server-side client for use in Server Components, Route Handlers, and Server Actions
 * Note: For production use, implement proper cookie handling with next/headers
 */
export const createServerSupabaseClient = () => {
  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
