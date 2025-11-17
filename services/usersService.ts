/**
 * Users Service
 *
 * Handles user management operations (admin only).
 * Provides methods for listing users, updating roles, and deleting users.
 */

import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { Profile, ProfileSchema, UpdateUserRoleData } from "@/types/auth";
import type { Database } from "@/types/database";

export class UsersService {
  /**
   * Get all user profiles (admin only)
   */
  async getAllUsers(): Promise<Profile[]> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      }

      if (!data) return [];

      // Validate and parse all profiles
      return data.map((profile) => ProfileSchema.parse(profile));
    } catch (err) {
      logger.error("Error fetching users", err);
      throw err;
    }
  }

  /**
   * Get user profile by ID
   */
  async getUserById(userId: string): Promise<Profile | null> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw new Error(`Failed to fetch user: ${error.message}`);
      }

      if (!data) return null;

      return ProfileSchema.parse(data);
    } catch (err) {
      logger.error("Error fetching user", err);
      return null;
    }
  }

  /**
   * Update user role (admin only)
   */
  async updateUserRole(
    updates: UpdateUserRoleData
  ): Promise<{ error: Error | null }> {
    try {
      const updateData: Database["public"]["Tables"]["profiles"]["Update"] = {
        role: updates.role,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("profiles")
        // @ts-ignore - Supabase generated types have an issue with updates
        .update(updateData)
        .eq("id", updates.userId);

      if (error) {
        return { error: new Error(error.message) };
      }

      return { error: null };
    } catch (err) {
      return {
        error: new Error(
          err instanceof Error ? err.message : "Failed to update user role"
        ),
      };
    }
  }

  /**
   * Delete user profile (admin only)
   * Note: This only deletes the profile. To fully delete the user,
   * you need to delete from auth.users which requires service role key.
   */
  async deleteUserProfile(userId: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userId);

      if (error) {
        return { error: new Error(error.message) };
      }

      return { error: null };
    } catch (err) {
      return {
        error: new Error(
          err instanceof Error ? err.message : "Failed to delete user"
        ),
      };
    }
  }

  /**
   * Search users by email or name
   */
  async searchUsers(query: string): Promise<Profile[]> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .or(`email.ilike.%${query}%,full_name.ilike.%${query}%`)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to search users: ${error.message}`);
      }

      if (!data) return [];

      return data.map((profile) => ProfileSchema.parse(profile));
    } catch (err) {
      logger.error("Error searching users", err);
      throw err;
    }
  }

  /**
   * Get users by role
   */
  async getUsersByRole(role: "user" | "admin"): Promise<Profile[]> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", role)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch users by role: ${error.message}`);
      }

      if (!data) return [];

      return data.map((profile) => ProfileSchema.parse(profile));
    } catch (err) {
      logger.error("Error fetching users by role", err);
      throw err;
    }
  }

  /**
   * Get user statistics
   */
  async getUserStats(): Promise<{
    total: number;
    admins: number;
    users: number;
  }> {
    try {
      const { data, error } = await supabase.from("profiles").select("role");

      if (error) {
        throw new Error(`Failed to fetch user stats: ${error.message}`);
      }

      if (!data) return { total: 0, admins: 0, users: 0 };

      const stats = {
        total: data.length,
        admins: data.filter((p: any) => p.role === "admin").length,
        users: data.filter((p: any) => p.role === "user").length,
      };

      return stats;
    } catch (err) {
      logger.error("Error fetching user stats", err);
      return { total: 0, admins: 0, users: 0 };
    }
  }
}

// Export singleton instance
export const usersService = new UsersService();
