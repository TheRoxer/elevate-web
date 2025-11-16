/**
 * useAdminOnly Hook
 *
 * Ensures only admin users can access certain features.
 * Redirects non-admin users to the dashboard.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

export const useAdminOnly = () => {
  const { isAdmin, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Not logged in - redirect to sign in
        router.push("/auth/signin");
      } else if (!isAdmin) {
        // Logged in but not admin - redirect to chat
        router.push("/dashboard/chat");
      }
    }
  }, [isAdmin, loading, isAuthenticated, router]);

  return { isAdmin, loading };
};
