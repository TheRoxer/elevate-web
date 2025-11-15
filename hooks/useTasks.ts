"use client";

import { useState, useEffect, useCallback } from "react";
import { tasksService, TaskServiceError } from "@/services/tasksService";
import type { Task, CreateTaskInput, UpdateTaskInput } from "@/types/schemas";

interface UseTasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

interface UseTasksReturn extends UseTasksState {
  refetch: () => Promise<void>;
  createTask: (input: CreateTaskInput) => Promise<Task | null>;
  updateTask: (input: UpdateTaskInput) => Promise<Task | null>;
  deleteTask: (taskId: number | string) => Promise<boolean>;
  bulkUpdateTasks: (tasks: UpdateTaskInput[]) => Promise<Task[] | null>;
}

export const useTasks = (orderId: string): UseTasksReturn => {
  const [state, setState] = useState<UseTasksState>({
    tasks: [],
    loading: true,
    error: null,
  });

  const fetchTasks = useCallback(async () => {
    if (!orderId) {
      setState({ tasks: [], loading: false, error: "Order ID is required" });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const tasks = await tasksService.fetchTasksByOrderId(orderId);
      setState({ tasks, loading: false, error: null });
    } catch (error) {
      const errorMessage =
        error instanceof TaskServiceError
          ? error.message
          : "Failed to fetch tasks";
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
      console.error("Error fetching tasks:", error);
    }
  }, [orderId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(
    async (input: CreateTaskInput): Promise<Task | null> => {
      try {
        const newTask = await tasksService.createTask(input);

        // Optimistically add to list
        setState((prev) => ({
          ...prev,
          tasks: [...prev.tasks, newTask],
        }));

        return newTask;
      } catch (error) {
        const errorMessage =
          error instanceof TaskServiceError
            ? error.message
            : "Failed to create task";
        setState((prev) => ({ ...prev, error: errorMessage }));
        console.error("Error creating task:", error);
        return null;
      }
    },
    []
  );

  const updateTask = useCallback(
    async (input: UpdateTaskInput): Promise<Task | null> => {
      try {
        const updatedTask = await tasksService.updateTask(input);

        // Optimistically update in list
        setState((prev) => ({
          ...prev,
          tasks: prev.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        }));

        return updatedTask;
      } catch (error) {
        const errorMessage =
          error instanceof TaskServiceError
            ? error.message
            : "Failed to update task";
        setState((prev) => ({ ...prev, error: errorMessage }));
        console.error("Error updating task:", error);
        return null;
      }
    },
    []
  );

  const deleteTask = useCallback(
    async (taskId: number | string): Promise<boolean> => {
      try {
        await tasksService.deleteTask(taskId);

        // Optimistically remove from list
        setState((prev) => ({
          ...prev,
          tasks: prev.tasks.filter((task) => task.id !== taskId),
        }));

        return true;
      } catch (error) {
        const errorMessage =
          error instanceof TaskServiceError
            ? error.message
            : "Failed to delete task";
        setState((prev) => ({ ...prev, error: errorMessage }));
        console.error("Error deleting task:", error);
        return false;
      }
    },
    []
  );

  const bulkUpdateTasks = useCallback(
    async (tasksToUpdate: UpdateTaskInput[]): Promise<Task[] | null> => {
      try {
        const updatedTasks = await tasksService.bulkUpdateTasks(tasksToUpdate);

        // Optimistically update all tasks in list
        setState((prev) => {
          const updatedMap = new Map(updatedTasks.map((t) => [t.id, t]));
          return {
            ...prev,
            tasks: prev.tasks.map((task) => updatedMap.get(task.id) || task),
          };
        });

        return updatedTasks;
      } catch (error) {
        const errorMessage =
          error instanceof TaskServiceError
            ? error.message
            : "Failed to bulk update tasks";
        setState((prev) => ({ ...prev, error: errorMessage }));
        console.error("Error bulk updating tasks:", error);
        return null;
      }
    },
    []
  );

  return {
    ...state,
    refetch: fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    bulkUpdateTasks,
  };
};
