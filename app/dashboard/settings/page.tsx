"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "@/lib/providers/AuthProvider";
import { authService } from "@/services/authService";
import Header from "@/components/dashboard/Header";
import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Loader2,
  User,
  Mail,
  Lock,
  Shield,
  Camera,
  Upload,
} from "lucide-react";
import { z } from "zod";

// Validation schemas
const ProfileUpdateSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
});

const PasswordUpdateSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SettingsPage() {
  const { profile, refreshProfile } = useAuthContext();
  const [isUpdatingProfile, setIsUpdatingProfile] = React.useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = React.useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Profile form state
  const [fullName, setFullName] = React.useState(profile?.full_name || "");
  const [email, setEmail] = React.useState(profile?.email || "");

  // Password form state
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // Update local state when profile changes
  React.useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return profile?.email?.slice(0, 2).toUpperCase() || "U";
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    try {
      // Validate input
      const validatedData = ProfileUpdateSchema.parse({
        full_name: fullName,
        email: email,
      });

      // Check if anything changed
      if (
        validatedData.full_name === profile?.full_name &&
        validatedData.email === profile?.email
      ) {
        toast.info("No changes to save");
        setIsUpdatingProfile(false);
        return;
      }

      // Update profile
      const { error } = await authService.updateProfile(validatedData);

      if (error) {
        toast.error(error.message || "Failed to update profile");
        return;
      }

      // Refresh profile data
      await refreshProfile();
      toast.success("Profile updated successfully");
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      } else {
        toast.error("Failed to update profile");
      }
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingPassword(true);

    try {
      // Validate input
      const validatedData = PasswordUpdateSchema.parse({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      // Update password
      const { error } = await authService.updatePassword(
        validatedData.newPassword
      );

      if (error) {
        toast.error(error.message || "Failed to update password");
        return;
      }

      // Clear form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated successfully");
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      } else {
        toast.error("Failed to update password");
      }
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    setIsUploadingAvatar(true);

    try {
      // Delete old avatar if exists
      if (profile.avatar_url) {
        await authService.deleteAvatar(profile.avatar_url);
      }

      // Upload new avatar
      const { url, error } = await authService.uploadAvatar(file, profile.id);

      if (error) {
        toast.error(error.message || "Failed to upload avatar");
        return;
      }

      if (!url) {
        toast.error("Failed to get avatar URL");
        return;
      }

      // Update profile with new avatar URL
      const { error: updateError } = await authService.updateProfile({
        avatar_url: url,
      });

      if (updateError) {
        toast.error(updateError.message || "Failed to update profile");
        return;
      }

      // Refresh profile data
      await refreshProfile();
      toast.success("Profile picture updated successfully");
    } catch (err) {
      toast.error("Failed to upload profile picture");
    } finally {
      setIsUploadingAvatar(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <DashboardLayoutClient>
      <Header />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </div>

            {/* Profile Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={profile?.avatar_url || undefined}
                        alt={profile?.full_name || "User"}
                      />
                      <AvatarFallback className="text-2xl">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <button
                      type="button"
                      onClick={handleAvatarClick}
                      disabled={isUploadingAvatar}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isUploadingAvatar ? (
                        <Loader2 className="h-6 w-6 text-white animate-spin" />
                      ) : (
                        <Camera className="h-6 w-6 text-white" />
                      )}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </div>
                  <div className="flex-1">
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal information and email address
                    </CardDescription>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAvatarClick}
                      disabled={isUploadingAvatar}
                      className="mt-2"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {isUploadingAvatar ? "Uploading..." : "Upload Photo"}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      Max 5MB. Supported: JPG, PNG, GIF, WebP
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      <User className="inline h-4 w-4 mr-2" />
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      disabled={isUpdatingProfile}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="inline h-4 w-4 mr-2" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      disabled={isUpdatingProfile}
                    />
                    <p className="text-xs text-muted-foreground">
                      Changing your email will require verification
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Role:{" "}
                      <span className="font-medium capitalize">
                        {profile?.role}
                      </span>
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="w-full sm:w-auto"
                  >
                    {isUpdatingProfile ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Password Section */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <Lock className="inline h-5 w-5 mr-2" />
                  Change Password
                </CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      disabled={isUpdatingPassword}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      disabled={isUpdatingPassword}
                    />
                    <p className="text-xs text-muted-foreground">
                      Must be at least 8 characters long
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      disabled={isUpdatingPassword}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="w-full sm:w-auto"
                    variant="secondary"
                  >
                    {isUpdatingPassword ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>View your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between py-2">
                  <span className="text-sm text-muted-foreground">
                    Account ID
                  </span>
                  <span className="text-sm font-mono">
                    {profile?.id.slice(0, 8)}...
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between py-2">
                  <span className="text-sm text-muted-foreground">
                    Member Since
                  </span>
                  <span className="text-sm">
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between py-2">
                  <span className="text-sm text-muted-foreground">
                    Last Updated
                  </span>
                  <span className="text-sm">
                    {profile?.updated_at
                      ? new Date(profile.updated_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayoutClient>
  );
}
