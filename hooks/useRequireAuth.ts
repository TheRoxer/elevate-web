/**
 * useRequireAuth Hook
 *
 * Ensures user is authenticated before accessing a page.
 * Optionally requires admin role.
 * Redirects to sign-in if not authenticated or to dashboard if not admin.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

export const useRequireAuth = (requireAdmin = false) => {
  const { user, profile, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not authenticated - redirect to sign in
        router.push("/auth/signin");
      } else if (requireAdmin && !isAdmin) {
        // Authenticated but not admin - redirect to dashboard
        router.push("/dashboard/panel");
      }
    }
  }, [user, loading, isAdmin, requireAdmin, router]);

  return { user, profile, loading, isAdmin };
};
