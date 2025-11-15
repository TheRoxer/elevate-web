"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { OrderDetail } from "@/data/orders";

interface OrderInfoCardProps {
  order: OrderDetail;
  title?: string;
  description?: string;
}

export const OrderInfoCard = React.memo(function OrderInfoCard({
  order,
  title = "Order Information",
  description = "Complete details about this order",
}: OrderInfoCardProps) {
  const formatDate = (dateString: string) => {
    if (dateString === "N/A") return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Order Details</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Client
                </p>
                <p className="text-sm font-semibold">{order.clientName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Email
                </p>
                <p className="text-sm">{order.clientEmail}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Project Type
                </p>
                <p className="text-sm font-semibold">{order.projectType}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Created
                </p>
                <p className="text-sm">{formatDate(order.createdAt)}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Deadline
                </p>
                <p className="text-sm font-semibold">
                  {formatDate(order.deadline)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Budget
                </p>
                <p className="text-lg font-bold text-green-600">
                  {formatCurrency(order.amount)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-3">Project Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {order.description}
          </p>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-3">Notes</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {order.notes}
          </p>
        </div>
      </CardContent>
    </Card>
  );
});
