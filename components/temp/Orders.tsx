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

const data: ProgrammingOrder[] = [
  {
    id: "ORD-001",
    clientName: "Acme Corp",
    projectType: "Web Application",
    status: "In Progress",
    deadline: "2025-11-20",
    amount: 5500,
  },
  {
    id: "ORD-002",
    clientName: "TechStart Inc",
    projectType: "Mobile App",
    status: "Completed",
    deadline: "2025-11-15",
    amount: 8200,
  },
  {
    id: "ORD-003",
    clientName: "Digital Solutions",
    projectType: "API Development",
    status: "In Progress",
    deadline: "2025-11-25",
    amount: 3400,
  },
  {
    id: "ORD-004",
    clientName: "Global Systems",
    projectType: "Database Design",
    status: "Pending",
    deadline: "2025-11-18",
    amount: 2800,
  },
  {
    id: "ORD-005",
    clientName: "Innovation Labs",
    projectType: "E-commerce Site",
    status: "In Progress",
    deadline: "2025-12-01",
    amount: 12000,
  },
];

export type ProgrammingOrder = {
  id: string;
  clientName: string;
  projectType: string;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  deadline: string;
  amount: number;
};

export const columns: ColumnDef<ProgrammingOrder>[] = [
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
              // Handle view details action
              console.log("View details for:", row.original.id);
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
              <TableRow key={headerGroup.id}>
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
