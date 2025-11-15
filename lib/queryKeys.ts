/**
 * Centralized Query Keys for React Query
 *
 * This file defines all query keys used throughout the application.
 * Using a centralized approach ensures consistency and makes invalidation easier.
 */

export const queryKeys = {
  orders: {
    all: ["orders"] as const,
    lists: () => [...queryKeys.orders.all, "list"] as const,
    list: (filters?: { status?: string; searchQuery?: string }) =>
      [...queryKeys.orders.lists(), filters] as const,
    details: () => [...queryKeys.orders.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.orders.details(), id] as const,
    stats: () => [...queryKeys.orders.all, "stats"] as const,
    recent: (limit: number) =>
      [...queryKeys.orders.all, "recent", limit] as const,
  },
  tasks: {
    all: ["tasks"] as const,
    byOrder: (orderId: string) => [...queryKeys.tasks.all, orderId] as const,
  },
  chartData: {
    all: ["chartData"] as const,
  },
} as const;
