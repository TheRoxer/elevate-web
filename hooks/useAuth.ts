/**
 * useAuth Hook
 *
 * Provides authentication state and methods throughout the application.
 * Listens to Supabase auth state changes and maintains user profile data.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { authService } from "@/services/authService";
import type { Profile } from "@/types/auth";
import type { User } from "@supabase/supabase-js";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadProfile = async () => {
    try {
      const userProfile = await authService.getCurrentProfile();
      setProfile(userProfile);
    } catch (error) {
      logger.error("Error loading profile", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { session } = await authService.getSession();
        if (!mounted) return;

        setUser(session?.user ?? null);

        if (session?.user) {
          await loadProfile();
        } else {
          setLoading(false);
        }
      } catch (error) {
        logger.error("Error initializing auth", error);
        if (mounted) setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      // Only log and act on meaningful events
      if (event !== "INITIAL_SESSION") {
        logger.auth("Auth state changed", session?.user?.id, { event });
      }

      setUser(session?.user ?? null);

      if (event === "SIGNED_IN" && session?.user) {
        setLoading(true);
        await loadProfile();
      } else if (event === "SIGNED_OUT") {
        setProfile(null);
        setLoading(false);
      } else if (event === "TOKEN_REFRESHED") {
        // Silent token refresh - no need to reload profile
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      setProfile(null);
      router.push("/");
    } catch (error) {
      logger.error("Error signing out", error);
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
