"use client";

import "./page.css";
import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/dashboard/Header";
import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";
import { OrderActionsDropdown } from "@/components/dashboard/OrderActionsDropdown";
import { OrderEditDialog } from "@/components/dashboard/OrderEditDialog";
import { TaskBoard } from "@/components/dashboard/TaskBoard";
import { OrderInfoCard } from "@/components/dashboard/OrderInfoCard";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import {
  useOrderDetailQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} from "@/hooks/queries/useOrdersQuery";
import type { OrderStatus } from "@/types/schemas";

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useOrderDetailQuery(orderId);
  const updateStatusMutation = useUpdateOrderStatusMutation();
  const deleteOrderMutation = useDeleteOrderMutation();
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateStatusMutation.mutate({ orderId, status: newStatus });
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleDelete = (orderId: string) => {
    deleteOrderMutation.mutate(orderId, {
      onSuccess: () => {
        router.push("/dashboard/orders");
      },
    });
  };

  const statusColors = {
    Pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    "In Progress":
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Completed:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  if (isLoading) {
    return (
      <DashboardLayoutClient>
        <Header />
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-muted-foreground">Loading order details...</p>
          </div>
        </div>
      </DashboardLayoutClient>
    );
  }

  if (error || !order) {
    return (
      <DashboardLayoutClient>
        <Header />
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-2">
            <p className="text-red-500 font-medium">Error loading order</p>
            <p className="text-sm text-muted-foreground">
              {error instanceof Error ? error.message : "Order not found"}
            </p>
            <Button onClick={() => router.push("/dashboard/orders")}>
              Back to Orders
            </Button>
          </div>
        </div>
      </DashboardLayoutClient>
    );
  }

  return (
    <DashboardLayoutClient>
      <Header />
      <div className="w-full flex flex-col p-4 sm:p-6 lg:p-8 pb-8 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0"
        >
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard/orders")}
              className="hover:bg-[hsl(240,23%,14%)] shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                Order Details
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground truncate">
                Order ID: {order.id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Badge
              className={
                statusColors[order.status as keyof typeof statusColors]
              }
            >
              {order.status}
            </Badge>
            <OrderActionsDropdown
              orderId={order.id}
              onStatusChange={handleStatusChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:h-[calc(100vh-12rem)]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-full lg:w-2/3 flex flex-col min-h-[600px] lg:min-h-0 order-1"
          >
            <TaskBoard
              orderId={orderId}
              title="Tasks"
              description="Manage your project tasks"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="w-full lg:w-1/3 order-2 mb-6 lg:mb-0"
          >
            <OrderInfoCard order={order} />
          </motion.div>
        </div>

        <OrderEditDialog
          order={order}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSuccess={refetch}
        />
      </div>
    </DashboardLayoutClient>
  );
}
