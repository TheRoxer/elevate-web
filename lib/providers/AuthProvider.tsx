/**
 * AuthProvider
 *
 * Global authentication context provider.
 * Wraps the application and provides auth state to all components.
 */

"use client";

import { createContext, useContext, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
