"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAdminOnly } from "@/hooks/useAdminOnly";
import Header from "@/components/dashboard/Header";
import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { OrderCreateDialog } from "@/components/dashboard/OrderCreateDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Plus, Loader2 } from "lucide-react";
import { useOrdersQuery } from "@/hooks/queries/useOrdersQuery";
import type { OrderStatus } from "@/types/schemas";

export default function OrdersPage() {
  const router = useRouter();
  const { loading: authLoading } = useAdminOnly();
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

  // Use the useOrders hook with filters
  const filters = React.useMemo(() => {
    const result: { status?: OrderStatus; searchQuery?: string } = {};

    if (statusFilter !== "all") {
      // Map lowercase filter values to proper OrderStatus values
      const statusMap: Record<string, OrderStatus> = {
        pending: "Pending",
        "in-progress": "In Progress",
        completed: "Completed",
        cancelled: "Cancelled",
      };
      result.status = statusMap[statusFilter];
    }

    if (searchQuery) {
      result.searchQuery = searchQuery;
    }

    return result;
  }, [statusFilter, searchQuery]);

  const {
    data: orders = [],
    isLoading,
    error,
    refetch,
  } = useOrdersQuery(filters);

  const filteredData = React.useMemo(() => {
    // Client-side search filter (if not handled by backend)
    if (!searchQuery) return orders;

    return orders.filter(
      (order) =>
        order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.projectType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [orders, searchQuery]);

  const handleRefetch = React.useCallback(() => {
    refetch();
  }, [refetch]);

  const handleCreateDialogChange = React.useCallback((open: boolean) => {
    setCreateDialogOpen(open);
  }, []);

  // if (authLoading) {
  //   return (
  //     <DashboardLayoutClient>
  //       <div className="flex items-center justify-center min-h-screen">
  //         <div className="text-center">
  //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
  //           <p className="text-muted-foreground">Loading...</p>
  //         </div>
  //       </div>
  //     </DashboardLayoutClient>
  //   );
  // }

  return (
    <DashboardLayoutClient>
      <Header />
      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="h-full"
        >
          <Card className="h-full flex flex-col">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                  <p className="text-muted-foreground">
                    Manage and track all your project orders
                  </p>
                </div>
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setCreateDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Order
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by client, order ID, or project type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-2">
                    <p className="text-red-500 font-medium">
                      Error loading orders
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {error instanceof Error ? error.message : "Unknown error"}
                    </p>
                    <Button onClick={handleRefetch} variant="outline">
                      Try Again
                    </Button>
                  </div>
                </div>
              ) : (
                <OrdersTable
                  data={filteredData}
                  onOrderUpdate={handleRefetch}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <OrderCreateDialog
        open={createDialogOpen}
        onOpenChange={handleCreateDialogChange}
        onSuccess={handleRefetch}
      />
    </DashboardLayoutClient>
  );
}
