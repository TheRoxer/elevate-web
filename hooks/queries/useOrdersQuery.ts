/**
 * React Query Hooks for Orders
 *
 * This file contains all React Query hooks for order-related operations.
 * Includes queries for fetching data and mutations for CRUD operations with optimistic updates.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersService } from "@/services/ordersService";
import { queryKeys } from "@/lib/queryKeys";
import type {
  CreateOrderInput,
  UpdateOrderInput,
  OrderStatus,
  Order,
  OrderDetail,
} from "@/types/schemas";
import { useToast } from "@/components/ui/use-toast";

// ============================================================================
// QUERIES (Read Operations)
// ============================================================================

/**
 * Fetch orders list with optional filters
 */
export const useOrdersQuery = (filters?: {
  status?: OrderStatus;
  searchQuery?: string;
}) => {
  return useQuery({
    queryKey: queryKeys.orders.list(filters),
    queryFn: () => ordersService.fetchOrders(filters),
    staleTime: 30 * 1000, // 30 seconds
  });
};

/**
 * Fetch single order detail by ID
 */
export const useOrderDetailQuery = (orderId: string) => {
  return useQuery({
    queryKey: queryKeys.orders.detail(orderId),
    queryFn: () => ordersService.fetchOrderById(orderId),
    enabled: !!orderId,
  });
};

/**
 * Fetch recent orders
 */
export const useRecentOrdersQuery = (limit: number = 5) => {
  return useQuery({
    queryKey: queryKeys.orders.recent(limit),
    queryFn: () => ordersService.fetchRecentOrders(limit),
  });
};

/**
 * Fetch order statistics
 */
export const useOrderStatsQuery = () => {
  return useQuery({
    queryKey: queryKeys.orders.stats(),
    queryFn: () => ordersService.fetchOrderStats(),
    staleTime: 60 * 1000, // 1 minute
  });
};

// ============================================================================
// MUTATIONS (Write Operations)
// ============================================================================

/**
 * Create a new order
 */
export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (input: CreateOrderInput) => ordersService.createOrder(input),
    onSuccess: () => {
      // Invalidate all order-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });

      toast({
        title: "Order Created",
        description: "New order has been created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create order",
        variant: "destructive",
      });
    },
  });
};

/**
 * Update an existing order with optimistic updates
 */
export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (input: UpdateOrderInput) => ordersService.updateOrder(input),

    // Optimistic update
    onMutate: async (updatedOrder) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.orders.detail(updatedOrder.id),
      });

      // Snapshot previous value
      const previousOrder = queryClient.getQueryData<OrderDetail>(
        queryKeys.orders.detail(updatedOrder.id)
      );

      // Optimistically update
      if (previousOrder) {
        queryClient.setQueryData<OrderDetail>(
          queryKeys.orders.detail(updatedOrder.id),
          {
            ...previousOrder,
            ...updatedOrder,
          }
        );
      }

      return { previousOrder };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });

      toast({
        title: "Order Updated",
        description: "Order has been updated successfully",
      });
    },

    // Rollback on error
    onError: (error, updatedOrder, context) => {
      if (context?.previousOrder) {
        queryClient.setQueryData(
          queryKeys.orders.detail(updatedOrder.id),
          context.previousOrder
        );
      }

      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update order",
        variant: "destructive",
      });
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.detail(variables.id),
      });
    },
  });
};

/**
 * Delete an order with optimistic updates
 */
export const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (orderId: string) => ordersService.deleteOrder(orderId),

    onMutate: async (orderId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.orders.lists() });

      const previousQueries = queryClient.getQueriesData({
        queryKey: queryKeys.orders.lists(),
      });

      // Optimistically remove from all list caches
      queryClient.setQueriesData<Order[]>(
        { queryKey: queryKeys.orders.lists() },
        (old) => old?.filter((order) => order.id !== orderId)
      );

      return { previousQueries };
    },

    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });

      toast({
        title: "Order Deleted",
        description: `Order ${orderId} has been deleted successfully`,
      });
    },

    onError: (error, orderId, context) => {
      // Restore all previous queries
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete order",
        variant: "destructive",
      });
    },
  });
};

/**
 * Update order status with optimistic updates
 */
export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: OrderStatus;
    }) => ordersService.updateOrderStatus(orderId, status),

    onMutate: async ({ orderId, status }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.orders.detail(orderId),
      });

      const previousOrder = queryClient.getQueryData<OrderDetail>(
        queryKeys.orders.detail(orderId)
      );

      // Optimistically update detail
      if (previousOrder) {
        queryClient.setQueryData<OrderDetail>(
          queryKeys.orders.detail(orderId),
          {
            ...previousOrder,
            status,
          }
        );
      }

      // Optimistically update in lists
      queryClient.setQueriesData<Order[]>(
        { queryKey: queryKeys.orders.lists() },
        (old) =>
          old?.map((order) =>
            order.id === orderId ? { ...order, status } : order
          )
      );

      return { previousOrder };
    },

    onSuccess: (_, { orderId, status }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });

      toast({
        title: "Status Updated",
        description: `Order status changed to ${status}`,
      });
    },

    onError: (error, { orderId }, context) => {
      if (context?.previousOrder) {
        queryClient.setQueryData(
          queryKeys.orders.detail(orderId),
          context.previousOrder
        );
      }

      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update status",
        variant: "destructive",
      });
    },
  });
};
