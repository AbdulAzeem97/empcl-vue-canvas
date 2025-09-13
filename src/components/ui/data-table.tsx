import React, { useState } from "react";
import { ChevronUp, ChevronDown, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onEdit,
  onDelete,
  searchable = true,
  searchPlaceholder = "Search...",
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const getValue = (row: T, column: Column<T>) => {
    if (typeof column.key === "string" && column.key.includes(".")) {
      const keys = column.key.split(".");
      return keys.reduce((obj, key) => obj?.[key], row);
    }
    return row[column.key as keyof T];
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      {searchable && (
        <div className="flex justify-between items-center">
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <div className="text-sm text-muted-foreground">
            Showing {paginatedData.length} of {filteredData.length} entries
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card-enterprise overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-enterprise">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className={column.sortable ? "cursor-pointer select-none" : ""}
                    onClick={() => column.sortable && handleSort(String(column.key))}
                  >
                    <div className="flex items-center gap-2">
                      {column.header}
                      {column.sortable && (
                        <div className="flex flex-col">
                          <ChevronUp
                            size={14}
                            className={
                              sortColumn === String(column.key) && sortDirection === "asc"
                                ? "text-primary"
                                : "text-muted-foreground"
                            }
                          />
                          <ChevronDown
                            size={14}
                            className={
                              sortColumn === String(column.key) && sortDirection === "desc"
                                ? "text-primary"
                                : "text-muted-foreground"
                            }
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
                {(onEdit || onDelete) && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={String(column.key)}>
                      {column.render
                        ? column.render(getValue(row, column), row)
                        : String(getValue(row, column) || "")}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td>
                      <div className="flex gap-2">
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(row)}
                          >
                            <Edit size={16} />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(row)}
                          >
                            <Trash2 size={16} className="text-destructive" />
                          </Button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}