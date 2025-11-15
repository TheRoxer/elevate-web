"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { DatePicker } from "@/components/ui/date-picker";
import { ordersService } from "@/services/ordersService";
import { format, parse } from "date-fns";
import type { OrderDetail, OrderStatus } from "@/types/schemas";

interface OrderEditDialogProps {
  order: OrderDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function OrderEditDialog({
  order,
  open,
  onOpenChange,
  onSuccess,
}: OrderEditDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    clientName: "",
    clientEmail: "",
    projectType: "",
    status: "Pending" as OrderStatus,
    amount: "",
    description: "",
    notes: "",
  });
  const [deadline, setDeadline] = React.useState<Date>();

  // Update form data when order changes
  React.useEffect(() => {
    if (order) {
      setFormData({
        clientName: order.clientName,
        clientEmail: order.clientEmail,
        projectType: order.projectType,
        status: order.status,
        amount: order.amount.toString(),
        description: order.description,
        notes: order.notes || "",
      });
      // Parse deadline string to Date object
      try {
        const parsedDate = parse(order.deadline, "yyyy-MM-dd", new Date());
        setDeadline(parsedDate);
      } catch {
        setDeadline(undefined);
      }
    }
  }, [order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    setIsLoading(true);

    try {
      if (!deadline) {
        toast({
          title: "Validation Error",
          description: "Please select a deadline",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      await ordersService.updateOrder({
        id: order.id,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        projectType: formData.projectType,
        status: formData.status,
        deadline: format(deadline, "yyyy-MM-dd"),
        amount: parseFloat(formData.amount),
        description: formData.description,
        notes: formData.notes,
      });

      toast({
        title: "Order Updated",
        description: `Order ${order.id} has been updated successfully`,
      });

      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update order: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    field: keyof typeof formData,
    value: string | OrderStatus
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
          <DialogDescription>
            Update the order details below. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => handleChange("clientName", e.target.value)}
                placeholder="Enter client name"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={(e) => handleChange("clientEmail", e.target.value)}
                placeholder="client@example.com"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectType">Project Type</Label>
              <Input
                id="projectType"
                value={formData.projectType}
                onChange={(e) => handleChange("projectType", e.target.value)}
                placeholder="e.g., Web Application"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  handleChange("status", value as OrderStatus)
                }
                disabled={isLoading}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <DatePicker
                date={deadline}
                onDateChange={setDeadline}
                placeholder="Select deadline"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                placeholder="0.00"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter project description"
              rows={3}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Additional notes (optional)"
              rows={2}
              disabled={isLoading}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
