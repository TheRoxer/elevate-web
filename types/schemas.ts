/**
 * Zod Validation Schemas
 *
 * Runtime validation schemas matching your current data structure.
 * These ensure type safety at runtime and provide validation at data boundaries.
 */

import { z } from "zod";

// ============================================================================
// ORDER SCHEMAS
// ============================================================================

/**
 * Order Status enum with validation
 */
export const OrderStatusSchema = z.enum([
  "Pending",
  "In Progress",
  "Completed",
  "Cancelled",
]);

export type OrderStatus = z.infer<typeof OrderStatusSchema>;

/**
 * Base Order schema matching your current Order interface
 */
export const OrderSchema = z.object({
  id: z.string().min(1, "Order ID is required"),
  clientName: z.string().min(1, "Client name is required"),
  projectType: z.string().min(1, "Project type is required"),
  status: OrderStatusSchema,
  deadline: z.string(), // Accept any date string format
  amount: z.number().positive("Amount must be positive"),
});

export type Order = z.infer<typeof OrderSchema>;

/**
 * Extended Order Detail schema with additional fields
 */
export const OrderDetailSchema = OrderSchema.extend({
  clientEmail: z.string().email("Invalid email address"),
  description: z.string(),
  createdAt: z.string(), // Accept any ISO date/datetime string
  updatedAt: z.string().optional(), // Optional updated timestamp
  notes: z.string(),
});

export type OrderDetail = z.infer<typeof OrderDetailSchema>;

/**
 * Schema for creating a new order (without auto-generated fields)
 */
export const CreateOrderSchema = OrderSchema.omit({ id: true }).extend({
  clientEmail: z.string().email("Invalid email address"),
  description: z.string().min(1, "Description is required"),
  notes: z.string().optional().default(""),
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;

/**
 * Schema for updating an existing order (all fields optional except id)
 */
export const UpdateOrderSchema = z.object({
  id: z.string().min(1),
  clientName: z.string().min(1).optional(),
  clientEmail: z.string().email().optional(),
  projectType: z.string().min(1).optional(),
  status: OrderStatusSchema.optional(),
  deadline: z.string().optional(), // Accept any date string format
  amount: z.number().positive().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
});

export type UpdateOrderInput = z.infer<typeof UpdateOrderSchema>;

// ============================================================================
// TASK SCHEMAS
// ============================================================================

/**
 * Task Status enum
 */
export const TaskStatusSchema = z.enum(["pending", "in-progress", "completed"]);

export type TaskStatus = z.infer<typeof TaskStatusSchema>;

/**
 * Task schema for order tasks
 */
export const TaskSchema = z.object({
  id: z.number().or(z.string()),
  text: z.string().min(1, "Task text is required"),
  status: TaskStatusSchema,
  orderId: z.string().optional(), // Foreign key to orders
  createdAt: z.string().optional(), // Accept any ISO string
  updatedAt: z.string().optional(), // Accept any ISO string
});

export type Task = z.infer<typeof TaskSchema>;

/**
 * Schema for creating a new task
 */
export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  orderId: z.string().min(1, "Order ID is required"),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;

/**
 * Schema for updating a task
 */
export const UpdateTaskSchema = z.object({
  id: z.number().or(z.string()),
  text: z.string().min(1).optional(),
  status: TaskStatusSchema.optional(),
});

export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;

// ============================================================================
// CHART DATA SCHEMAS
// ============================================================================

/**
 * Chart data point schema
 */
export const ChartDataPointSchema = z.object({
  name: z.string(),
  average: z.number(),
  today: z.number(),
});

export type ChartDataPoint = z.infer<typeof ChartDataPointSchema>;

export const ChartDataSchema = z.array(ChartDataPointSchema);

// ============================================================================
// API RESPONSE SCHEMAS
// ============================================================================

/**
 * Standard API error response
 */
export const ApiErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

/**
 * Paginated response wrapper
 */
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(
  itemSchema: T
) =>
  z.object({
    data: z.array(itemSchema),
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
    hasMore: z.boolean(),
  });

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Safe parse with detailed error messages
 */
export const validateData = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context?: string
): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      throw new Error(
        `Validation failed${context ? ` for ${context}` : ""}: ${messages.join(
          ", "
        )}`
      );
    }
    throw error;
  }
};

/**
 * Safe parse that returns result object instead of throwing
 */
export const safeValidateData = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } => {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.errors.map(
    (err) => `${err.path.join(".")}: ${err.message}`
  );

  return { success: false, errors };
};
