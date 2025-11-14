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
import { ArrowRight } from "lucide-react";
import { type Order } from "@/data/orders";
import { OrderActionsDropdown } from "./OrderActionsDropdown";

interface OrdersTableProps {
  data: Order[];
}

export function OrdersTable({ data }: OrdersTableProps) {
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

  const handleStatusChange = (orderId: string, newStatus: string) => {
    console.log(`Changing order ${orderId} status to ${newStatus}`);
    // TODO: Implement status update logic
  };

  const handleViewDetails = (orderId: string) => {
    router.push(`/dashboard/orders/${orderId}`);
  };

  const handleEdit = (orderId: string) => {
    console.log(`Editing order ${orderId}`);
    // TODO: Implement edit logic
  };

  const handleDelete = (orderId: string) => {
    console.log(`Deleting order ${orderId}`);
    // TODO: Implement delete logic
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
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
      header: "Project Type",
      cell: ({ row }) => <div>{row.getValue("projectType")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
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
          <div
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusColors[status as keyof typeof statusColors]
            }`}
          >
            {status}
          </div>
        );
      },
    },
    {
      accessorKey: "deadline",
      header: "Deadline",
      cell: ({ row }) => {
        const date = new Date(row.getValue("deadline"));
        const formatted = new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(date);
        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-left">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-left font-medium">{formatted}</div>;
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
              onDelete={handleDelete}
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
  ];

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
    <div className="space-y-4">
      <div className="rounded-md border">
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

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
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
  );
}
