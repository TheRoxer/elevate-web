"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "@/services/authService";
import { SignUpDataSchema, type SignUpData } from "@/types/auth";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignUpData>({
    resolver: zodResolver(SignUpDataSchema),
    defaultValues: {
      agreeToTerms: false,
    },
  });

  const agreeToTerms = watch("agreeToTerms");

  const onSubmit = async (data: SignUpData) => {
    setLoading(true);
    try {
      const { userId, error } = await authService.signUp(data);

      if (error) {
        toast.error(error.message || "Failed to sign up");
      } else if (userId) {
        toast.success(
          "Account created successfully! Please check your email to verify your account."
        );
        router.push("/auth/signin");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await authService.signInWithGoogle();

      if (error) {
        toast.error(error.message || "Failed to sign in with Google");
        setGoogleLoading(false);
      }
      // Don't set loading to false as we're redirecting to Google
    } catch (err) {
      toast.error("An unexpected error occurred");
      setGoogleLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                {...register("fullName")}
                disabled={loading}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Minimum 8 characters"
                {...register("password")}
                disabled={loading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                {...register("confirmPassword")}
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={agreeToTerms}
                onCheckedChange={(checked) =>
                  setValue("agreeToTerms", checked === true)
                }
                disabled={loading}
              />
              <Label
                htmlFor="agreeToTerms"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link href="/terms" className="underline">
                  terms and conditions
                </Link>
              </Label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-500">
                {errors.agreeToTerms.message}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create an account"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
            >
              {googleLoading ? "Redirecting..." : "Sign up with Google"}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
