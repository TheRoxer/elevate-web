/**
 * User Management Page
 *
 * Admin-only page for managing user accounts.
 * Displays all users, allows role changes, and user deletion.
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAdminOnly } from "@/hooks/useAdminOnly";
import {
  useUsersQuery,
  useUserStatsQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} from "@/hooks/queries/useUsersQuery";
import { toast } from "sonner";
import { format } from "date-fns";
import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";
import Header from "@/components/dashboard/Header";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { UserCog, Users, Shield, Trash2 } from "lucide-react";
import type { Profile, UserRole } from "@/types/auth";

export default function UsersManagementPage() {
  const { loading: authLoading } = useAdminOnly();
  const { data: users, isLoading, error } = useUsersQuery();
  const { data: stats } = useUserStatsQuery();
  const updateRoleMutation = useUpdateUserRoleMutation();
  const deleteUserMutation = useDeleteUserMutation();

  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  //   if (authLoading) {
  //     return (
  //       <DashboardLayoutClient>
  //         <div className="flex items-center justify-center min-h-screen">
  //           <div className="text-center">
  //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
  //             <p className="text-muted-foreground">Loading...</p>
  //           </div>
  //         </div>
  //       </DashboardLayoutClient>
  //     );
  //   }

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setUpdatingUserId(userId);
    try {
      const { error } = await updateRoleMutation.mutateAsync({
        userId,
        role: newRole,
      });

      if (error) {
        toast.error(error.message || "Failed to update user role");
      } else {
        toast.success("User role updated successfully");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    setDeletingUserId(userId);
    try {
      const { error } = await deleteUserMutation.mutateAsync(userId);

      if (error) {
        toast.error(error.message || "Failed to delete user");
      } else {
        toast.success(`User ${userEmail} deleted successfully`);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <DashboardLayoutClient>
      <Header />
      <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              User Management
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage user accounts and permissions
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid gap-2 sm:gap-4 grid-cols-3 sm:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl font-bold">
                  {stats?.total ?? 0}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Admins
                </CardTitle>
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl font-bold">
                  {stats?.admins ?? 0}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Users
                </CardTitle>
                <UserCog className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl font-bold">
                  {stats?.users ?? 0}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                View and manage all registered users in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading users...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-500">Failed to load users</p>
                </div>
              ) : !users || users.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No users found</p>
                </div>
              ) : (
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Full Name
                        </TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Created
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user: Profile) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium text-sm">
                            <span className="sm:hidden">
                              {user.full_name || user.email}
                            </span>
                            <span className="hidden sm:inline">
                              {user.email}
                            </span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm">
                            {user.full_name || "—"}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                              <Badge
                                variant="outline"
                                className={`text-xs hidden sm:inline-flex ${
                                  user.role === "admin"
                                    ? "bg-[#6d28d9] text-white border-[#6d28d9]"
                                    : ""
                                }`}
                              >
                                {user.role}
                              </Badge>
                              <Select
                                value={user.role}
                                onValueChange={(value: UserRole) =>
                                  handleRoleChange(user.id, value)
                                }
                                disabled={updatingUserId === user.id}
                              >
                                <SelectTrigger className="w-[100px] sm:w-[120px] h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="user">User</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-sm">
                            {format(new Date(user.created_at), "MMM dd, yyyy")}
                          </TableCell>
                          <TableCell className="text-right">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  disabled={deletingUserId === user.id}
                                >
                                  <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete User
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete {user.email}
                                    ? This action cannot be undone and will
                                    remove all associated data.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteUser(user.id, user.email)
                                    }
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayoutClient>
  );
}
