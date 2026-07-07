"use client";

import React from "react";
import tabledata from "../../tabledata.json";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function CustomDataTable() {
  const PAGE_SIZE = 10;
  const numberOfPages = Math.ceil(tabledata.length / PAGE_SIZE);

  const [currentPage, setCurrentPage] = React.useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(startIndex + PAGE_SIZE, tabledata.length);

  const currentTableData = tabledata.slice(startIndex, endIndex);

  return (
    <div className="mt-8">
      <h2 className="mb-4 px-4 text-xl font-bold text-foreground">
        Recent Orders
      </h2>

      <div className="p-8">
        <div className="relative overflow-x-auto rounded-lg border border-border shadow-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted hover:bg-muted">
                <TableHead className="w-12 p-4">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="size-4 rounded border-border text-primary focus-visible:ring-ring"
                  />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTableData.map((data, i) => (
                <TableRow key={i} className="hover:bg-muted/50">
                  <TableCell className="w-12 p-4">
                    <input
                      id={`checkbox-table-search-${i}`}
                      type="checkbox"
                      className="size-4 rounded border-border text-primary focus-visible:ring-ring"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{data.id}</TableCell>
                  <TableCell className="font-medium">{data.first_name}</TableCell>
                  <TableCell>{data.last_name}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.gender}</TableCell>
                  <TableCell>
                    <a
                      href="#"
                      className="font-medium text-primary hover:underline"
                    >
                      Edit
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <nav
            className="flex flex-col flex-wrap items-center justify-between gap-4 border-t border-border p-4 md:flex-row"
            aria-label="Table navigation"
          >
            <span className="block w-full text-sm text-muted-foreground md:inline md:w-auto">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {itemStartIndex}-{itemEndIndex}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {tabledata.length}
              </span>
            </span>
            <ul className="inline-flex h-8 text-sm">
              <li>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-e-none"
                >
                  Previous
                </Button>
              </li>
              {Array.from({ length: numberOfPages }, (_, index) => (
                <li key={index}>
                  <Button
                    variant={currentPage === index + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(index + 1)}
                    className={cn(
                      "rounded-none",
                      index === numberOfPages - 1 && "rounded-e-md",
                    )}
                  >
                    {index + 1}
                  </Button>
                </li>
              ))}
              <li>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === numberOfPages}
                  className="rounded-s-none"
                >
                  Next
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default CustomDataTable;
