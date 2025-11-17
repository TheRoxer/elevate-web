/**
 * Authentication Service
 *
 * Handles all authentication operations with Supabase Auth.
 * Provides methods for sign up, sign in, sign out, and profile management.
 */

import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import {
  SignUpData,
  SignInData,
  Profile,
  ProfileSchema,
  UpdateProfileData,
  AuthError,
} from "@/types/auth";
import type { AuthError as SupabaseAuthError } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

export class AuthService {
  /**
   * Sign up a new user with email and password
   * Creates auth.users entry and automatically triggers profile creation
   */
  async signUp(data: SignUpData): Promise<{
    userId: string | null;
    error: SupabaseAuthError | null;
  }> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            role: "user", // Default role
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        return { userId: null, error };
      }

      return { userId: authData.user?.id ?? null, error: null };
    } catch (err) {
      throw new AuthError("Failed to sign up user");
    }
  }

  /**
   * Sign in existing user with email and password
   */
  async signIn(data: SignInData): Promise<{
    error: SupabaseAuthError | null;
  }> {
    try {
      logger.info("Attempting sign in", { email: data.email });

      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (!error && authData.session) {
        logger.info("User signed in successfully", {
          userId: authData.user?.id,
          hasSession: !!authData.session,
          hasUser: !!authData.user,
        });
      } else if (error) {
        logger.warn("Sign in failed", { error: error.message });
      }

      return { error };
    } catch (err) {
      logger.error("Sign in error", err);
      throw new AuthError("Failed to sign in");
    }
  }

  /**
   * Sign in with Google OAuth
   */
  async signInWithGoogle(): Promise<{
    error: SupabaseAuthError | null;
  }> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      return { error };
    } catch (err) {
      throw new AuthError("Failed to sign in with Google");
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<{ error: SupabaseAuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (err) {
      throw new AuthError("Failed to sign out");
    }
  }

  /**
   * Get current user session
   */
  async getSession() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      return { session, error };
    } catch (err) {
      throw new AuthError("Failed to get session");
    }
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      return { user, error };
    } catch (err) {
      throw new AuthError("Failed to get current user");
    }
  }

  /**
   * Get current user's profile with role information
   */
  async getCurrentProfile(): Promise<Profile | null> {
    try {
      const { user } = await this.getCurrentUser();

      if (!user) {
        return null;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // Profile doesn't exist - create it
          logger.warn("Profile not found, creating new profile", {
            userId: user.id,
          });

          const newProfile = {
            id: user.id,
            email: user.email!,
            full_name: user.user_metadata?.full_name || "",
            role: "user" as const,
          };

          const { data: createdProfile, error: createError } = await supabase
            .from("profiles")
            .insert(newProfile)
            .select()
            .single();

          if (createError) {
            logger.error("Failed to create profile", createError);
            return null;
          }

          logger.info("Profile created successfully", {
            userId: createdProfile.id,
          });
          return ProfileSchema.parse(createdProfile);
        }

        logger.error("Failed to fetch profile", error);
        return null;
      }

      if (!data) {
        return null;
      }

      // Validate and parse the profile data
      return ProfileSchema.parse(data);
    } catch (err) {
      logger.error("Error getting current profile", err);
      return null;
    }
  }

  /**
   * Check if current user is an admin
   */
  async isAdmin(): Promise<boolean> {
    try {
      const profile = await this.getCurrentProfile();
      return profile?.role === "admin";
    } catch (err) {
      return false;
    }
  }

  /**
   * Update current user's profile
   */
  async updateProfile(
    updates: UpdateProfileData
  ): Promise<{ error: Error | null }> {
    try {
      const { user } = await this.getCurrentUser();

      if (!user) {
        return { error: new AuthError("No user logged in") };
      }

      const updateData: Database["public"]["Tables"]["profiles"]["Update"] = {
        updated_at: new Date().toISOString(),
      };

      if (updates.full_name !== undefined) {
        updateData.full_name = updates.full_name;
      }

      if (updates.avatar_url !== undefined) {
        updateData.avatar_url = updates.avatar_url;
      }

      const { error } = await supabase
        .from("profiles")
        // @ts-ignore - Supabase generated types have an issue with updates
        .update(updateData)
        .eq("id", user.id);

      if (error) {
        return { error: new AuthError(error.message) };
      }

      // If email is being updated, update auth.users as well
      if (updates.email && updates.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: updates.email,
        });

        if (emailError) {
          return { error: new AuthError(emailError.message) };
        }
      }

      return { error: null };
    } catch (err) {
      return {
        error: new AuthError(
          err instanceof Error ? err.message : "Failed to update profile"
        ),
      };
    }
  }

  /**
   * Upload user avatar to Supabase Storage
   */
  async uploadAvatar(
    file: File,
    userId: string
  ): Promise<{ url: string | null; error: Error | null }> {
    try {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        return {
          url: null,
          error: new AuthError(
            "Invalid file type. Please upload an image file."
          ),
        };
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        return {
          url: null,
          error: new AuthError("File size too large. Maximum size is 5MB."),
        };
      }

      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        return { url: null, error: new AuthError(error.message) };
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(data.path);

      return { url: publicUrl, error: null };
    } catch (err) {
      return {
        url: null,
        error: new AuthError(
          err instanceof Error ? err.message : "Failed to upload avatar"
        ),
      };
    }
  }

  /**
   * Delete user avatar from Supabase Storage
   */
  async deleteAvatar(avatarUrl: string): Promise<{ error: Error | null }> {
    try {
      // Extract file path from URL
      const urlParts = avatarUrl.split("/avatars/");
      if (urlParts.length < 2) {
        return { error: new AuthError("Invalid avatar URL") };
      }

      const filePath = urlParts[1];

      // Delete from storage
      const { error } = await supabase.storage
        .from("avatars")
        .remove([filePath]);

      if (error) {
        return { error: new AuthError(error.message) };
      }

      return { error: null };
    } catch (err) {
      return {
        error: new AuthError(
          err instanceof Error ? err.message : "Failed to delete avatar"
        ),
      };
    }
  }

  /**
   * Request password reset email
   */
  async resetPassword(email: string): Promise<{
    error: SupabaseAuthError | null;
  }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      return { error };
    } catch (err) {
      throw new AuthError("Failed to send password reset email");
    }
  }

  /**
   * Update user password (must be authenticated)
   */
  async updatePassword(newPassword: string): Promise<{
    error: SupabaseAuthError | null;
  }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      return { error };
    } catch (err) {
      throw new AuthError("Failed to update password");
    }
  }

  /**
   * Refresh the current session
   */
  async refreshSession() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.refreshSession();
      return { session, error };
    } catch (err) {
      throw new AuthError("Failed to refresh session");
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
