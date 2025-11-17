/**
 * OAuth Callback Route Handler
 *
 * Handles the OAuth callback from providers like Google.
 * Exchanges the code for a session and redirects to the dashboard.
 */

import { createClient } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        logger.error("Error exchanging code for session", error);
        // Redirect to sign in with error
        return NextResponse.redirect(
          `${origin}/auth/signin?error=authentication_failed`
        );
      }

      // Successfully authenticated - check user role and redirect accordingly
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        // Ensure TypeScript knows the shape of the profile object
        const role = (profile as { role?: string } | null)?.role;

        const redirectPath =
          role === "admin"
            ? `${origin}/dashboard/panel`
            : `${origin}/dashboard/chat`;

        logger.info("OAuth callback redirect", {
          role,
          path: redirectPath,
        });
        return NextResponse.redirect(redirectPath);
      }

      // Fallback to chat if no user found
      return NextResponse.redirect(`${origin}/dashboard/chat`);
    } catch (err) {
      logger.error("Unexpected error in OAuth callback", err);
      return NextResponse.redirect(
        `${origin}/auth/signin?error=unexpected_error`
      );
    }
  }

  // No code provided - redirect to sign in
  return NextResponse.redirect(`${origin}/auth/signin`);
}
