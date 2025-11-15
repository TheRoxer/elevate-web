"use client";

import * as React from "react";
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
import { useRouter } from "next/navigation";

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
import { orders, type Order } from "@/data/orders";

// Get 5 most recent orders (sorted by deadline, closest to today first)
const getRecentOrders = (): Order[] => {
  const today = new Date().getTime();
  return [...orders]
    .sort((a, b) => {
      const dateA = Math.abs(new Date(a.deadline).getTime() - today);
      const dateB = Math.abs(new Date(b.deadline).getTime() - today);
      return dateA - dateB;
    })
    .slice(0, 5);
};

export const getColumns = (
  router: ReturnType<typeof useRouter>
): ColumnDef<Order>[] => [
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
        Cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
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
    sortingFn: (rowA, rowB) => {
      const statusOrder = {
        Pending: 0,
        "In Progress": 1,
        Completed: 2,
        Cancelled: 3,
      };
      const statusA = rowA.getValue("status") as string;
      const statusB = rowB.getValue("status") as string;
      return (
        statusOrder[statusA as keyof typeof statusOrder] -
        statusOrder[statusB as keyof typeof statusOrder]
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
    header: () => <div className="text-right">Details</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            size="sm"
            className="text-white"
            onClick={() => {
              router.push(`/dashboard/orders/${row.original.id}`);
            }}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

export default function Orders() {
  const router = useRouter();
  const data = React.useMemo(() => getRecentOrders(), []);
  const columns = React.useMemo(() => getColumns(router), [router]);

  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "status", desc: false },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-[#1b1b2c] transition-colors"
              >
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
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
