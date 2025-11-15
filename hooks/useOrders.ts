"use client";

import { useState, useEffect, useCallback } from "react";
import { ordersService, OrderServiceError } from "@/services/ordersService";
import type {
  Order,
  OrderDetail,
  CreateOrderInput,
  UpdateOrderInput,
  OrderStatus,
} from "@/types/schemas";

interface UseOrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

interface UseOrdersReturn extends UseOrdersState {
  refetch: () => Promise<void>;
  createOrder: (input: CreateOrderInput) => Promise<OrderDetail | null>;
  updateOrder: (input: UpdateOrderInput) => Promise<OrderDetail | null>;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus
  ) => Promise<OrderDetail | null>;
  deleteOrder: (orderId: string) => Promise<boolean>;
}

export const useOrders = (filters?: {
  status?: OrderStatus;
  searchQuery?: string;
}): UseOrdersReturn => {
  const [state, setState] = useState<UseOrdersState>({
    orders: [],
    loading: true,
    error: null,
  });

  const fetchOrders = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const orders = await ordersService.fetchOrders(filters);
      setState({ orders, loading: false, error: null });
    } catch (error) {
      const errorMessage =
        error instanceof OrderServiceError
          ? error.message
          : "Failed to fetch orders";
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
      console.error("Error fetching orders:", error);
    }
  }, [filters]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const createOrder = useCallback(
    async (input: CreateOrderInput): Promise<OrderDetail | null> => {
      try {
        const newOrder = await ordersService.createOrder(input);

        setState((prev) => ({
          ...prev,
          orders: [
            {
              id: newOrder.id,
              clientName: newOrder.clientName,
              projectType: newOrder.projectType,
              status: newOrder.status,
              deadline: newOrder.deadline,
              amount: newOrder.amount,
            },
            ...prev.orders,
          ],
        }));

        return newOrder;
      } catch (error) {
        const errorMessage =
          error instanceof OrderServiceError
            ? error.message
            : "Failed to create order";
        setState((prev) => ({ ...prev, error: errorMessage }));
        console.error("Error creating order:", error);
        return null;
      }
    },
    []
  );

  const updateOrder = useCallback(
    async (input: UpdateOrderInput): Promise<OrderDetail | null> => {
      try {
        const updatedOrder = await ordersService.updateOrder(input);

        setState((prev) => ({
          ...prev,
          orders: prev.orders.map((order) =>
            order.id === updatedOrder.id
              ? {
                  id: updatedOrder.id,
                  clientName: updatedOrder.clientName,
                  projectType: updatedOrder.projectType,
                  status: updatedOrder.status,
                  deadline: updatedOrder.deadline,
                  amount: updatedOrder.amount,
                }
              : order
          ),
        }));

        return updatedOrder;
      } catch (error) {
        const errorMessage =
          error instanceof OrderServiceError
            ? error.message
            : "Failed to update order";
        setState((prev) => ({ ...prev, error: errorMessage }));
        console.error("Error updating order:", error);
        return null;
      }
    },
    []
  );

  const updateOrderStatus = useCallback(
    async (
      orderId: string,
      status: OrderStatus
    ): Promise<OrderDetail | null> => {
      return updateOrder({ id: orderId, status });
    },
    [updateOrder]
  );

  const deleteOrder = useCallback(async (orderId: string): Promise<boolean> => {
    try {
      await ordersService.deleteOrder(orderId);

      setState((prev) => ({
        ...prev,
        orders: prev.orders.filter((order) => order.id !== orderId),
      }));

      return true;
    } catch (error) {
      const errorMessage =
        error instanceof OrderServiceError
          ? error.message
          : "Failed to delete order";
      setState((prev) => ({ ...prev, error: errorMessage }));
      console.error("Error deleting order:", error);
      return false;
    }
  }, []);

  return {
    ...state,
    refetch: fetchOrders,
    createOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
  };
};

interface UseOrderDetailState {
  order: OrderDetail | null;
  loading: boolean;
  error: string | null;
}

interface UseOrderDetailReturn extends UseOrderDetailState {
  refetch: () => Promise<void>;
  updateOrder: (input: UpdateOrderInput) => Promise<OrderDetail | null>;
}

export const useOrderDetail = (orderId: string): UseOrderDetailReturn => {
  const [state, setState] = useState<UseOrderDetailState>({
    order: null,
    loading: true,
    error: null,
  });

  const fetchOrder = useCallback(async () => {
    if (!orderId) {
      setState({ order: null, loading: false, error: "Order ID is required" });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const order = await ordersService.fetchOrderById(orderId);
      setState({ order, loading: false, error: null });
    } catch (error) {
      const errorMessage =
        error instanceof OrderServiceError
          ? error.message
          : "Failed to fetch order";
      setState({ order: null, loading: false, error: errorMessage });
      console.error("Error fetching order:", error);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const updateOrder = useCallback(
    async (input: UpdateOrderInput): Promise<OrderDetail | null> => {
      try {
        const updatedOrder = await ordersService.updateOrder(input);
        setState((prev) => ({ ...prev, order: updatedOrder }));
        return updatedOrder;
      } catch (error) {
        const errorMessage =
          error instanceof OrderServiceError
            ? error.message
            : "Failed to update order";
        setState((prev) => ({ ...prev, error: errorMessage }));
        console.error("Error updating order:", error);
        return null;
      }
    },
    []
  );

  return {
    ...state,
    refetch: fetchOrder,
    updateOrder,
  };
};

export const useRecentOrders = (limit: number = 5) => {
  const [state, setState] = useState<UseOrdersState>({
    orders: [],
    loading: true,
    error: null,
  });

  const fetchRecentOrders = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const orders = await ordersService.fetchRecentOrders(limit);
      setState({ orders, loading: false, error: null });
    } catch (error) {
      const errorMessage =
        error instanceof OrderServiceError
          ? error.message
          : "Failed to fetch recent orders";
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
      console.error("Error fetching recent orders:", error);
    }
  }, [limit]);

  useEffect(() => {
    fetchRecentOrders();
  }, [fetchRecentOrders]);

  return {
    ...state,
    refetch: fetchRecentOrders,
  };
};

export const useOrderStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedStats = await ordersService.fetchOrderStats();
      setStats(fetchedStats);
      setLoading(false);
    } catch (error) {
      const errorMessage =
        error instanceof OrderServiceError
          ? error.message
          : "Failed to fetch order statistics";
      setError(errorMessage);
      setLoading(false);
      console.error("Error fetching order stats:", error);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};
