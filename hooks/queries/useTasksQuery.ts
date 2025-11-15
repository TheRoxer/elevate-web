/**
 * React Query Hooks for Tasks
 *
 * This file contains all React Query hooks for task-related operations.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksService } from "@/services/tasksService";
import { queryKeys } from "@/lib/queryKeys";
import type { CreateTaskInput, UpdateTaskInput, Task } from "@/types/schemas";
import { useToast } from "@/components/ui/use-toast";

/**
 * Fetch tasks by order ID
 */
export const useTasksQuery = (orderId: string) => {
  return useQuery({
    queryKey: queryKeys.tasks.byOrder(orderId),
    queryFn: () => tasksService.fetchTasksByOrderId(orderId),
    enabled: !!orderId,
  });
};

/**
 * Create a new task
 */
export const useCreateTaskMutation = (orderId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (input: CreateTaskInput) => tasksService.createTask(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.byOrder(orderId),
      });

      toast({
        title: "Task Created",
        description: "New task has been created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create task",
        variant: "destructive",
      });
    },
  });
};

/**
 * Update a task with optimistic updates
 */
export const useUpdateTaskMutation = (orderId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (input: UpdateTaskInput) => tasksService.updateTask(input),
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.tasks.byOrder(orderId),
      });

      const previousTasks = queryClient.getQueryData<Task[]>(
        queryKeys.tasks.byOrder(orderId)
      );

      // Optimistically update
      if (previousTasks) {
        queryClient.setQueryData<Task[]>(
          queryKeys.tasks.byOrder(orderId),
          previousTasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...updatedTask } : task
          )
        );
      }

      return { previousTasks };
    },
    onError: (error, _, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          queryKeys.tasks.byOrder(orderId),
          context.previousTasks
        );
      }

      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update task",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.byOrder(orderId),
      });
    },
  });
};

/**
 * Delete a task
 */
export const useDeleteTaskMutation = (orderId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (taskId: string | number) => tasksService.deleteTask(taskId),
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.tasks.byOrder(orderId),
      });

      const previousTasks = queryClient.getQueryData<Task[]>(
        queryKeys.tasks.byOrder(orderId)
      );

      // Optimistically remove
      if (previousTasks) {
        queryClient.setQueryData<Task[]>(
          queryKeys.tasks.byOrder(orderId),
          previousTasks.filter((task) => task.id !== taskId)
        );
      }

      return { previousTasks };
    },
    onSuccess: () => {
      toast({
        title: "Task Deleted",
        description: "Task has been deleted successfully",
      });
    },
    onError: (error, _, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          queryKeys.tasks.byOrder(orderId),
          context.previousTasks
        );
      }

      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete task",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.byOrder(orderId),
      });
    },
  });
};
