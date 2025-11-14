"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, FileEdit, Trash2, ListChecks } from "lucide-react";

interface OrderActionsDropdownProps {
  orderId: string;
  onStatusChange: (orderId: string, newStatus: string) => void;
  onEdit: (orderId: string) => void;
  onDelete: (orderId: string) => void;
}

export function OrderActionsDropdown({
  orderId,
  onStatusChange,
  onEdit,
  onDelete,
}: OrderActionsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-[#2a2a42] transition-colors"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ListChecks className="h-4 w-4 mr-2" />
            Set Status
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              onClick={() => onStatusChange(orderId, "pending")}
            >
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onStatusChange(orderId, "in-progress")}
            >
              In Progress
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onStatusChange(orderId, "completed")}
            >
              Completed
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onStatusChange(orderId, "cancelled")}
            >
              Cancelled
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={() => onEdit(orderId)}>
          <FileEdit className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onDelete(orderId)}
          className="text-red-500 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
