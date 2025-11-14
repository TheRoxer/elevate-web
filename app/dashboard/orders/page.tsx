"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/dashbard/Header";
import DashboardLayoutClient from "@/components/dashbard/DashboardLayoutClient";
import { OrdersTable } from "@/components/dashbard/OrdersTable";
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
import { Search, Plus } from "lucide-react";
import { orders as data } from "@/data/orders";

export default function OrdersPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const filteredData = React.useMemo(() => {
    let filtered = data;

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (order) => order.status.toLowerCase().replace(" ", "-") === statusFilter
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.projectType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [statusFilter, searchQuery]);

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
                  onClick={() => router.push("/dashboard/order/new")}
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
              <OrdersTable data={filteredData} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayoutClient>
  );
}
