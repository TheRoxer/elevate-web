/**
 * useAuth Hook
 *
 * Provides authentication state and methods throughout the application.
 * Listens to Supabase auth state changes and maintains user profile data.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { authService } from "@/services/authService";
import type { Profile } from "@/types/auth";
import type { User } from "@supabase/supabase-js";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { session } = await authService.getSession();
        setUser(session?.user ?? null);

        if (session?.user) {
          await loadProfile();
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      setUser(session?.user ?? null);

      if (session?.user) {
        await loadProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadProfile = async () => {
    try {
      const userProfile = await authService.getCurrentProfile();
      setProfile(userProfile);
    } catch (error) {
      console.error("Error loading profile:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setProfile(null);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const isAdmin = profile?.role === "admin";
  const isAuthenticated = !!user;

  return {
    user,
    profile,
    isAdmin,
    isAuthenticated,
    loading,
    signOut,
    refreshProfile: loadProfile,
  };
};
