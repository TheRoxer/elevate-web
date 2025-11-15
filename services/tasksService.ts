import { supabase } from "@/lib/supabase";
import {
  TaskSchema,
  CreateTaskSchema,
  UpdateTaskSchema,
  validateData,
  type Task,
  type CreateTaskInput,
  type UpdateTaskInput,
} from "@/types/schemas";
import type { Database } from "@/types/database";

type DbTask = Database["public"]["Tables"]["tasks"]["Row"];

export class TaskServiceError extends Error {
  constructor(message: string, public code?: string, public details?: unknown) {
    super(message);
    this.name = "TaskServiceError";
  }
}

const transformDbToTask = (dbTask: DbTask): Task => {
  return {
    id: dbTask.id,
    text: dbTask.text,
    status: dbTask.status,
    orderId: dbTask.order_id,
    createdAt: dbTask.created_at,
    updatedAt: dbTask.updated_at,
  };
};

export class TasksService {
  static async fetchTasksByOrderId(orderId: string): Promise<Task[]> {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("order_id", orderId)
        .order("created_at", { ascending: true });

      if (error) {
        throw new TaskServiceError(
          "Failed to fetch tasks",
          error.code,
          error.message
        );
      }

      if (!data) {
        return [];
      }

      return data.map((dbTask) => {
        const task = transformDbToTask(dbTask);
        return validateData(TaskSchema, task, "task");
      });
    } catch (error) {
      if (error instanceof TaskServiceError) {
        throw error;
      }
      throw new TaskServiceError(
        "Unexpected error fetching tasks",
        "UNKNOWN_ERROR",
        error
      );
    }
  }

  static async createTask(input: CreateTaskInput): Promise<Task> {
    try {
      const validatedInput = validateData(
        CreateTaskSchema,
        input,
        "create task input"
      );

      const dbInsert = {
        order_id: validatedInput.orderId,
        text: validatedInput.text,
        status: validatedInput.status,
      };

      const { data, error } = await (supabase.from("tasks") as any)
        .insert(dbInsert)
        .select()
        .single();

      if (error) {
        throw new TaskServiceError(
          "Failed to create task",
          error.code,
          error.message
        );
      }

      const task = transformDbToTask(data);
      return validateData(TaskSchema, task, "created task");
    } catch (error) {
      if (error instanceof TaskServiceError) {
        throw error;
      }
      throw new TaskServiceError(
        "Unexpected error creating task",
        "UNKNOWN_ERROR",
        error
      );
    }
  }

  static async updateTask(input: UpdateTaskInput): Promise<Task> {
    try {
      const validatedInput = validateData(
        UpdateTaskSchema,
        input,
        "update task input"
      );

      const dbUpdate: any = {};

      if (validatedInput.text !== undefined) {
        dbUpdate.text = validatedInput.text;
      }
      if (validatedInput.status !== undefined) {
        dbUpdate.status = validatedInput.status;
      }

      const { data, error } = await (supabase.from("tasks") as any)
        .update(dbUpdate)
        .eq("id", Number(validatedInput.id))
        .select()
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          throw new TaskServiceError(
            `Task with ID ${validatedInput.id} not found`,
            "NOT_FOUND"
          );
        }
        throw new TaskServiceError(
          "Failed to update task",
          error.code,
          error.message
        );
      }

      const task = transformDbToTask(data);
      return validateData(TaskSchema, task, "updated task");
    } catch (error) {
      if (error instanceof TaskServiceError) {
        throw error;
      }
      throw new TaskServiceError(
        "Unexpected error updating task",
        "UNKNOWN_ERROR",
        error
      );
    }
  }

  static async deleteTask(taskId: number | string): Promise<void> {
    try {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", Number(taskId));

      if (error) {
        throw new TaskServiceError(
          "Failed to delete task",
          error.code,
          error.message
        );
      }
    } catch (error) {
      if (error instanceof TaskServiceError) {
        throw error;
      }
      throw new TaskServiceError(
        "Unexpected error deleting task",
        "UNKNOWN_ERROR",
        error
      );
    }
  }

  static async bulkUpdateTasks(tasks: UpdateTaskInput[]): Promise<Task[]> {
    try {
      const updatePromises = tasks.map((task) => this.updateTask(task));
      return await Promise.all(updatePromises);
    } catch (error) {
      if (error instanceof TaskServiceError) {
        throw error;
      }
      throw new TaskServiceError(
        "Unexpected error bulk updating tasks",
        "UNKNOWN_ERROR",
        error
      );
    }
  }
}

export const tasksService = TasksService;
