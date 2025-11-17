"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowRight } from "lucide-react";
import { type Order } from "@/data/orders";
import { type OrderStatus, type OrderDetail } from "@/types/schemas";
import { OrderActionsDropdown } from "./OrderActionsDropdown";
import { OrderEditDialog } from "./OrderEditDialog";
import {
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
  useOrderDetailQuery,
} from "@/hooks/queries/useOrdersQuery";

interface OrdersTableProps {
  data: Order[];
  onOrderUpdate?: () => void;
}

export function OrdersTable({ data, onOrderUpdate }: OrdersTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "id", desc: false },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [orderToDelete, setOrderToDelete] = React.useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [orderToEdit, setOrderToEdit] = React.useState<OrderDetail | null>(
    null
  );
  const [orderIdToFetch, setOrderIdToFetch] = React.useState<string>("");

  // React Query mutations
  const deleteOrderMutation = useDeleteOrderMutation();
  const updateStatusMutation = useUpdateOrderStatusMutation();

  // Fetch order detail for editing
  const { data: fetchedOrderDetail } = useOrderDetailQuery(orderIdToFetch);

  // Update orderToEdit when data is fetched
  React.useEffect(() => {
    if (fetchedOrderDetail) {
      setOrderToEdit(fetchedOrderDetail);
      setEditDialogOpen(true);
      setOrderIdToFetch("");
    }
  }, [fetchedOrderDetail]);

  const handleStatusChange = React.useCallback(
    (orderId: string, newStatus: OrderStatus) => {
      updateStatusMutation.mutate({ orderId, status: newStatus });
      onOrderUpdate?.();
    },
    [updateStatusMutation, onOrderUpdate]
  );

  const handleViewDetails = React.useCallback(
    (orderId: string) => {
      router.push(`/dashboard/orders/${orderId}`);
    },
    [router]
  );

  const handleEdit = React.useCallback((orderId: string) => {
    setOrderIdToFetch(orderId);
  }, []);

  const handleDeleteClick = React.useCallback((orderId: string) => {
    setOrderToDelete(orderId);
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = React.useCallback(() => {
    if (!orderToDelete) return;

    deleteOrderMutation.mutate(orderToDelete, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setOrderToDelete(null);
        onOrderUpdate?.();
      },
    });
  }, [deleteOrderMutation, orderToDelete, onOrderUpdate]);

  const columns: ColumnDef<Order>[] = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: () => <div className="hidden sm:table-cell">Order ID</div>,
        cell: ({ row }) => (
          <div className="font-medium hidden sm:table-cell">
            {row.getValue("id")}
          </div>
        ),
      },
      {
        accessorKey: "clientName",
        header: "Client",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("clientName")}</div>
        ),
      },
      {
        accessorKey: "projectType",
        header: () => <div className="hidden md:table-cell">Project Type</div>,
        cell: ({ row }) => (
          <div className="hidden md:table-cell">
            {row.getValue("projectType")}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          const statusDotColors = {
            Pending: "bg-yellow-500",
            "In Progress": "bg-blue-500",
            Completed: "bg-green-500",
            Cancelled: "bg-red-500",
          };
          const statusColors = {
            Pending:
              "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
            "In Progress":
              "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            Completed:
              "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            Cancelled:
              "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
          };
          return (
            <>
              {/* Colored dot for mobile */}
              <div className="sm:hidden flex items-center justify-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    statusDotColors[status as keyof typeof statusDotColors]
                  }`}
                  title={status}
                />
              </div>
              {/* Full badge for larger screens */}
              <div
                className={`hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  statusColors[status as keyof typeof statusColors]
                }`}
              >
                {status}
              </div>
            </>
          );
        },
      },
      {
        accessorKey: "deadline",
        header: () => <div className="hidden lg:table-cell">Deadline</div>,
        cell: ({ row }) => {
          const date = new Date(row.getValue("deadline"));
          const formatted = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(date);
          return <div className="hidden lg:table-cell">{formatted}</div>;
        },
      },
      {
        accessorKey: "amount",
        header: () => (
          <div className="text-left hidden md:table-cell">Amount</div>
        ),
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"));
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount);
          return (
            <div className="text-left font-medium hidden md:table-cell">
              {formatted}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: () => <div className="text-right mr-4">Actions</div>,
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-end gap-1">
              <OrderActionsDropdown
                orderId={row.original.id}
                onStatusChange={handleStatusChange}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-[#2a2a42] transition-colors"
                onClick={() => handleViewDetails(row.original.id)}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    [handleStatusChange, handleEdit, handleDeleteClick, handleViewDetails]
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="space-y-4">
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-[#1b1b2c]">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-[#1b1b2c] transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-[#1b1b2c]">
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-muted-foreground">
            Showing {table.getRowModel().rows.length} of {data.length} order(s)
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete order{" "}
              {orderToDelete} and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteOrderMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteOrderMutation.isPending}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleteOrderMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <OrderEditDialog
        order={orderToEdit}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSuccess={onOrderUpdate}
      />
    </>
  );
}
