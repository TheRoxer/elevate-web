/**
 * Authentication Types and Validation Schemas
 *
 * This module defines all authentication-related types with Zod validation.
 * Used for type-safe auth operations throughout the application.
 */

import { z } from "zod";

/**
 * User Role Enum
 * Defines the two types of users in the system
 */
export const UserRoleSchema = z.enum(["user", "admin"]);
export type UserRole = z.infer<typeof UserRoleSchema>;

/**
 * User Profile Schema
 * Represents a user's profile data from the profiles table
 */
export const ProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  full_name: z.string().nullable(),
  avatar_url: z.string().url().nullable().or(z.literal("")),
  role: UserRoleSchema,
  created_at: z.string(),
  updated_at: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;

/**
 * Authenticated User
 * Combines Supabase auth user with profile data
 */
export interface AuthUser {
  id: string;
  email: string;
  profile: Profile;
}

/**
 * Sign Up Form Data Schema
 * Validates user registration data
 */
export const SignUpDataSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password must be less than 72 characters"),
    confirmPassword: z.string(),
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be less than 100 characters"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpData = z.infer<typeof SignUpDataSchema>;

/**
 * Sign In Form Data Schema
 * Validates user login data
 */
export const SignInDataSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInData = z.infer<typeof SignInDataSchema>;

/**
 * Password Reset Request Schema
 */
export const PasswordResetSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type PasswordResetData = z.infer<typeof PasswordResetSchema>;

/**
 * Update Profile Schema
 * For updating user profile information
 */
export const UpdateProfileSchema = z.object({
  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  avatar_url: z.string().url("Invalid URL").nullable().optional(),
});

export type UpdateProfileData = z.infer<typeof UpdateProfileSchema>;

/**
 * Update User Role Schema (Admin only)
 */
export const UpdateUserRoleSchema = z.object({
  userId: z.string().uuid(),
  role: UserRoleSchema,
});

export type UpdateUserRoleData = z.infer<typeof UpdateUserRoleSchema>;

/**
 * Auth Error Types
 * Custom error types for authentication operations
 */
export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "AuthError";
  }
}

export class UnauthorizedError extends AuthError {
  constructor(message = "Unauthorized access") {
    super(message, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AuthError {
  constructor(message = "Forbidden: Insufficient permissions") {
    super(message, "FORBIDDEN");
    this.name = "ForbiddenError";
  }
}

/**
 * Session State
 * Represents the current authentication session state
 */
export interface SessionState {
  user: AuthUser | null;
  loading: boolean;
  error: Error | null;
}
