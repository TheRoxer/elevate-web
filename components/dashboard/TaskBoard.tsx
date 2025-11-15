"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, GripVertical, X, AlertCircle, Loader2 } from "lucide-react";
import {
  useTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "@/hooks/queries/useTasksQuery";
import type { TaskStatus as DbTaskStatus } from "@/types/schemas";

type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
  id: number | string;
  text: string;
  status: TaskStatus;
}

interface TaskBoardProps {
  orderId: string; // Required - always uses Supabase
  title?: string;
  description?: string;
}

export function TaskBoard({
  orderId,
  title = "Tasks",
  description = "Manage your project tasks",
}: TaskBoardProps) {
  // React Query hooks
  const { data: tasks = [], isLoading, error } = useTasksQuery(orderId);
  const createTaskMutation = useCreateTaskMutation(orderId);
  const updateTaskMutation = useUpdateTaskMutation(orderId);
  const deleteTaskMutation = useDeleteTaskMutation(orderId);

  const [newTaskPending, setNewTaskPending] = React.useState("");
  const [newTaskInProgress, setNewTaskInProgress] = React.useState("");
  const [newTaskCompleted, setNewTaskCompleted] = React.useState("");
  const [draggedTask, setDraggedTask] = React.useState<Task | null>(null);
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);
  const [editedText, setEditedText] = React.useState("");

  const addTask = (
    status: TaskStatus,
    text: string,
    setter: (val: string) => void
  ) => {
    if (!text.trim()) return;

    createTaskMutation.mutate(
      {
        orderId,
        text: text.trim(),
        status: status as DbTaskStatus,
      },
      {
        onSuccess: () => setter(""),
      }
    );
  };

  const deleteTask = (id: number | string) => {
    deleteTaskMutation.mutate(id);
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setEditedText(task.text);
  };

  const closeEditDialog = () => {
    setEditingTask(null);
    setEditedText("");
  };

  const saveEditedTask = () => {
    if (!editingTask || !editedText.trim()) return;

    updateTaskMutation.mutate(
      {
        id: editingTask.id,
        text: editedText.trim(),
      },
      {
        onSuccess: closeEditDialog,
      }
    );
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: TaskStatus) => {
    if (!draggedTask) return;

    updateTaskMutation.mutate(
      {
        id: draggedTask.id,
        status: status as DbTaskStatus,
      },
      {
        onSuccess: () => setDraggedTask(null),
      }
    );
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  const renderColumn = (
    status: TaskStatus,
    label: string,
    color: string,
    newTaskValue: string,
    setNewTaskValue: (val: string) => void
  ) => (
    <div
      className="flex-1 min-w-[200px] flex flex-col min-h-0"
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(status)}
    >
      <div className="flex items-center justify-between mb-3 px-2 flex-shrink-0">
        <h3 className={`text-sm font-semibold ${color}`}>{label}</h3>
        <Badge variant="secondary" className="text-xs">
          {getTasksByStatus(status).length}
        </Badge>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto min-h-0">
        {getTasksByStatus(status).map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={() => handleDragStart(task)}
            onClick={() => openEditDialog(task)}
            className="group p-3 rounded-lg bg-[#1b1b2c] hover:bg-[#2a2a42] transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm flex-1 break-words">{task.text}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 flex-shrink-0 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2 flex-shrink-0">
        <Input
          placeholder="Add task..."
          value={newTaskValue}
          onChange={(e) => setNewTaskValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              addTask(status, newTaskValue, setNewTaskValue);
          }}
          className="text-sm"
        />
        <Button
          onClick={() => addTask(status, newTaskValue, setNewTaskValue)}
          size="icon"
          className="flex-shrink-0"
          disabled={createTaskMutation.isPending}
        >
          {createTaskMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Card className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col overflow-hidden min-h-0">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error instanceof Error ? error.message : "Error loading tasks"}
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="flex-1 flex gap-3 overflow-hidden min-h-0">
              {renderColumn(
                "pending",
                "Pending",
                "text-yellow-500",
                newTaskPending,
                setNewTaskPending
              )}

              <Separator orientation="vertical" className="h-auto" />

              {renderColumn(
                "in-progress",
                "In Progress",
                "text-blue-500",
                newTaskInProgress,
                setNewTaskInProgress
              )}

              <Separator orientation="vertical" className="h-auto" />

              {renderColumn(
                "completed",
                "Completed",
                "text-green-500",
                newTaskCompleted,
                setNewTaskCompleted
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!editingTask} onOpenChange={closeEditDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Make changes to your task here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="task-text">Task Description</Label>
              <Textarea
                id="task-text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                placeholder="Enter task description..."
                className="min-h-[100px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.ctrlKey) {
                    saveEditedTask();
                  }
                }}
              />
            </div>
            {editingTask && (
              <div className="flex items-center gap-2">
                <Label>Status:</Label>
                <Badge
                  variant="secondary"
                  className={
                    editingTask.status === "pending"
                      ? "text-yellow-500"
                      : editingTask.status === "in-progress"
                      ? "text-blue-500"
                      : "text-green-500"
                  }
                >
                  {editingTask.status === "pending"
                    ? "Pending"
                    : editingTask.status === "in-progress"
                    ? "In Progress"
                    : "Completed"}
                </Badge>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={closeEditDialog}
              disabled={updateTaskMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={saveEditedTask}
              disabled={!editedText.trim() || updateTaskMutation.isPending}
            >
              {updateTaskMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
