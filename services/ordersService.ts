import { supabase } from "@/lib/supabase";
import {
  OrderSchema,
  OrderDetailSchema,
  CreateOrderSchema,
  UpdateOrderSchema,
  validateData,
  type Order,
  type OrderDetail,
  type CreateOrderInput,
  type UpdateOrderInput,
  type OrderStatus,
} from "@/types/schemas";
import type { Database } from "@/types/database";

type DbOrder = Database["public"]["Tables"]["orders"]["Row"];
type DbOrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
type DbOrderUpdate = Database["public"]["Tables"]["orders"]["Update"];

export class OrderServiceError extends Error {
  constructor(message: string, public code?: string, public details?: unknown) {
    super(message);
    this.name = "OrderServiceError";
  }
}

const transformDbToOrder = (dbOrder: DbOrder): Order => {
  return {
    id: dbOrder.id,
    clientName: dbOrder.client_name,
    projectType: dbOrder.project_type,
    status: dbOrder.status as OrderStatus,
    deadline: dbOrder.deadline,
    amount: Number(dbOrder.amount),
  };
};

const transformDbToOrderDetail = (dbOrder: DbOrder): OrderDetail => {
  return {
    id: dbOrder.id,
    clientName: dbOrder.client_name,
    clientEmail: dbOrder.client_email,
    projectType: dbOrder.project_type,
    status: dbOrder.status as OrderStatus,
    deadline: dbOrder.deadline,
    amount: Number(dbOrder.amount),
    description: dbOrder.description,
    createdAt: dbOrder.created_at,
    updatedAt: dbOrder.updated_at,
    notes: dbOrder.notes || "",
  };
};

export class OrdersService {
  static async fetchOrders(filters?: {
    status?: OrderStatus;
    searchQuery?: string;
  }): Promise<Order[]> {
    try {
      let query = supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters?.status) {
        query = query.eq("status", filters.status);
      }

      if (filters?.searchQuery) {
        const searchTerm = `%${filters.searchQuery}%`;
        query = query.or(
          `client_name.ilike.${searchTerm},project_type.ilike.${searchTerm},id.ilike.${searchTerm}`
        );
      }

      const { data, error } = await query;

      if (error) {
        throw new OrderServiceError(
          "Failed to fetch orders",
          error.code,
          error.message
        );
      }

      if (!data) {
        return [];
      }

      return data.map((dbOrder) => {
        const order = transformDbToOrder(dbOrder);
        return validateData(OrderSchema, order, "order");
      });
    } catch (error) {
      if (error instanceof OrderServiceError) {
        throw error;
      }
      throw new OrderServiceError(
        "Unexpected error fetching orders",
        "UNKNOWN_ERROR",
        error
      );
    }
  }

  static async fetchOrderById(orderId: string): Promise<OrderDetail> {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          throw new OrderServiceError(
            `Order with ID ${orderId} not found`,
            "NOT_FOUND"
          );
        }
        throw new OrderServiceError(
          "Failed to fetch order",
          error.code,
          error.message
        );
      }

      const orderDetail = transformDbToOrderDetail(data);
      return validateData(OrderDetailSchema, orderDetail, "order detail");
    } catch (error) {
      if (error instanceof OrderServiceError) {
        throw error;
      }
      throw new OrderServiceError(
        "Unexpected error fetching order",
        "UNKNOWN_ERROR",
        error
      );
    }
  }

  static async createOrder(input: CreateOrderInput): Promise<OrderDetail> {
    try {
      const validatedInput = validateData(
        CreateOrderSchema,
        input,
        "create order input"
      );

      const dbInsert: DbOrderInsert = {
        client_name: validatedInput.clientName,
        client_email: validatedInput.clientEmail,
        project_type: validatedInput.projectType,
        status: validatedInput.status,
        deadline: validatedInput.deadline,
        amount: validatedInput.amount,
        description: validatedInput.description,
        notes: validatedInput.notes || "",
      };

      const { data, error } = await supabase
        .from("orders")
        .insert(dbInsert as never)
        .select()
        .single();

      if (error) {
        throw new OrderServiceError(
          "Failed to create order",
          error.code,
          error.message
        );
      }

      const orderDetail = transformDbToOrderDetail(data);
      return validateData(OrderDetailSchema, orderDetail, "created order");
    } catch (error) {
      if (error instanceof OrderServiceError) {
        throw error;
      }
      throw new OrderServiceError(
        "Unexpected error creating order",
        "UNKNOWN_ERROR",
        error
      );
    }
  }

  static async updateOrder(input: UpdateOrderInput): Promise<OrderDetail> {
    try {
      const validatedInput = validateData(
        UpdateOrderSchema,
        input,
        "update order input"
      );

      const dbUpdate: DbOrderUpdate = {};

      if (validatedInput.clientName !== undefined) {
        dbUpdate.client_name = validatedInput.clientName;
      }
      if (validatedInput.clientEmail !== undefined) {
        dbUpdate.client_email = validatedInput.clientEmail;
      }
      if (validatedInput.projectType !== undefined) {
        dbUpdate.project_type = validatedInput.projectType;
      }
      if (validatedInput.status !== undefined) {
        dbUpdate.status = validatedInput.status;
      }
      if (validatedInput.deadline !== undefined) {
        dbUpdate.deadline = validatedInput.deadline;
      }
      if (validatedInput.amount !== undefined) {
        dbUpdate.amount = validatedInput.amount;
      }
      if (validatedInput.description !== undefined) {
        dbUpdate.description = validatedInput.description;
      }
      if (validatedInput.notes !== undefined) {
        dbUpdate.notes = validatedInput.notes;
      }

      const { data, error } = await supabase
        .from("orders")
        .update(dbUpdate as never)
        .eq("id", validatedInput.id)
        .select()
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          throw new OrderServiceError(
            `Order with ID ${validatedInput.id} not found`,
            "NOT_FOUND"
          );
        }
        throw new OrderServiceError(
          "Failed to update order",
          error.code,
          error.message
        );
      }

      const orderDetail = transformDbToOrderDetail(data);
      return validateData(OrderDetailSchema, orderDetail, "updated order");
    } catch (error) {
      if (error instanceof OrderServiceError) {
        throw error;
      }
      throw new OrderServiceError(
        "Unexpected error updating order",
        "UNKNOWN_ERROR",
        error
      );
    }
  }

  static async updateOrderStatus(
    orderId: string,
    status: OrderStatus
  ): Promise<OrderDetail> {
    return this.updateOrder({ id: orderId, status });
  }

  static async deleteOrder(orderId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);

      if (error) {
        throw new OrderServiceError(
          "Failed to delete order",
          error.code,
          error.message
        );
      }
    } catch (error) {
      if (error instanceof OrderServiceError) {
        throw error;
      }
      throw new OrderServiceError(
        "Unexpected error deleting order",
        "UNKNOWN_ERROR",
        error
      );
    }
  }

  static async fetchRecentOrders(limit: number = 5): Promise<Order[]> {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("deadline", { ascending: true })
        .limit(limit);

      if (error) {
        throw new OrderServiceError(
          "Failed to fetch recent orders",
          error.code,
          error.message
        );
      }

      if (!data) {
        return [];
      }

      return data.map((dbOrder) => {
        const order = transformDbToOrder(dbOrder);
        return validateData(OrderSchema, order, "recent order");
      });
    } catch (error) {
      if (error instanceof OrderServiceError) {
        throw error;
      }
      throw new OrderServiceError(
        "Unexpected error fetching recent orders",
        "UNKNOWN_ERROR",
        error
      );
    }
  }

  static async fetchOrderStats(): Promise<{
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    cancelled: number;
    totalRevenue: number;
  }> {
    try {
      const { data, error } = await supabase.from("orders").select("*");

      if (error) {
        throw new OrderServiceError(
          "Failed to fetch order statistics",
          error.code,
          error.message
        );
      }

      if (!data) {
        return {
          total: 0,
          pending: 0,
          inProgress: 0,
          completed: 0,
          cancelled: 0,
          totalRevenue: 0,
        };
      }

      const typedData = data as DbOrder[];

      return {
        total: typedData.length,
        pending: typedData.filter((o) => o.status === "Pending").length,
        inProgress: typedData.filter((o) => o.status === "In Progress").length,
        completed: typedData.filter((o) => o.status === "Completed").length,
        cancelled: typedData.filter((o) => o.status === "Cancelled").length,
        totalRevenue: typedData.reduce((sum, o) => sum + Number(o.amount), 0),
      };
    } catch (error) {
      if (error instanceof OrderServiceError) {
        throw error;
      }
      throw new OrderServiceError(
        "Unexpected error fetching statistics",
        "UNKNOWN_ERROR",
        error
      );
    }
  }
}

export const ordersService = OrdersService;
