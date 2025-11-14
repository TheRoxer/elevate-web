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
import { Plus, GripVertical, X } from "lucide-react";

type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
  id: number;
  text: string;
  status: TaskStatus;
}

interface TaskBoardProps {
  initialTasks?: Task[];
  onTasksChange?: (tasks: Task[]) => void;
  title?: string;
  description?: string;
}

export function TaskBoard({
  initialTasks = [],
  onTasksChange,
  title = "Tasks",
  description = "Manage your project tasks",
}: TaskBoardProps) {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
  const [newTaskPending, setNewTaskPending] = React.useState("");
  const [newTaskInProgress, setNewTaskInProgress] = React.useState("");
  const [newTaskCompleted, setNewTaskCompleted] = React.useState("");
  const [draggedTask, setDraggedTask] = React.useState<Task | null>(null);

  // Notify parent of task changes
  React.useEffect(() => {
    onTasksChange?.(tasks);
  }, [tasks, onTasksChange]);

  const addTask = (
    status: TaskStatus,
    text: string,
    setter: (val: string) => void
  ) => {
    if (text.trim()) {
      setTasks([...tasks, { id: Date.now(), text: text.trim(), status }]);
      setter("");
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: TaskStatus) => {
    if (draggedTask) {
      setTasks(
        tasks.map((task) =>
          task.id === draggedTask.id ? { ...task, status } : task
        )
      );
      setDraggedTask(null);
    }
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
            className="group p-3 rounded-lg bg-[#1b1b2c] hover:bg-[#2a2a42] transition-colors cursor-move"
          >
            <div className="flex items-start gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm flex-1 break-words">{task.text}</p>
              <button
                onClick={() => deleteTask(task.id)}
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
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden min-h-0">
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
      </CardContent>
    </Card>
  );
}
