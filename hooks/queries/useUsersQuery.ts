/**
 * useUsersQuery Hook
 *
 * React Query hook for fetching and managing user data (admin only).
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "@/services/usersService";
import type { UpdateUserRoleData } from "@/types/auth";

export const USERS_QUERY_KEY = "users";

/**
 * Fetch all users
 */
export const useUsersQuery = () => {
  return useQuery({
    queryKey: [USERS_QUERY_KEY],
    queryFn: () => usersService.getAllUsers(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Fetch user by ID
 */
export const useUserQuery = (userId: string) => {
  return useQuery({
    queryKey: [USERS_QUERY_KEY, userId],
    queryFn: () => usersService.getUserById(userId),
    enabled: !!userId,
  });
};

/**
 * Fetch user statistics
 */
export const useUserStatsQuery = () => {
  return useQuery({
    queryKey: [USERS_QUERY_KEY, "stats"],
    queryFn: () => usersService.getUserStats(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Update user role mutation
 */
export const useUpdateUserRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserRoleData) => usersService.updateUserRole(data),
    onSuccess: () => {
      // Invalidate users query to refetch data
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
};

/**
 * Delete user mutation
 */
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => usersService.deleteUserProfile(userId),
    onSuccess: () => {
      // Invalidate users query to refetch data
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  });
};

/**
 * Search users
 */
export const useSearchUsersQuery = (query: string) => {
  return useQuery({
    queryKey: [USERS_QUERY_KEY, "search", query],
    queryFn: () => usersService.searchUsers(query),
    enabled: query.length > 0,
  });
};
