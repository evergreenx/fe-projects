import type React from "react";
import { useState, useCallback } from "react";

import { SearchBar } from "./search-bar";
import { BulkActionsBar } from "./bulk-actions-bar";
import { TableHeader } from "./table-header";
import { TableRow } from "./table-row";
import { Pagination } from "./pagination";
import { PageSizeSelector } from "./page-size-selector";

import { useTableState } from "hooks/use-table-state";
import { generateMockUsers } from "utils/mock-data";
import type { Column, User } from "types/table.ts/table";

interface DataTableProps {
  data: User[];
  columns: Column[];
}

export const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  const [tableData] = useState<User[]>(data);

  const {
    searchTerm,
    sortConfig,
    currentPage,
    pageSize,
    selectedRows,
    sortedData,
    paginatedData,
    totalPages,
    setSearchTerm,
    handleSort,
    setCurrentPage,
    handlePageSizeChange,
    handleSelectRow,
    handleSelectAll,
    setSelectedRows,
  } = useTableState(tableData);

  const handleBulkDelete = useCallback(() => {
    if (selectedRows.size > 0) {
      // In a real app, this would make an API call
      console.log("Deleting users:", Array.from(selectedRows));
      setSelectedRows(new Set());
    }
  }, [selectedRows, setSelectedRows]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
      Data Table
        </h1>

        {/* Search and Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search users..."
          />

          <BulkActionsBar
            selectedCount={selectedRows.size}
            onDelete={handleBulkDelete}
            onClear={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>

        {/* Results info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>
            Showing {paginatedData.length} of {sortedData.length} users
          </span>
          <PageSizeSelector
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200" role="table">
          <TableHeader
            columns={columns}
            sortConfig={sortConfig}
            onSort={handleSort}
            selectedCount={selectedRows.size}
            totalCount={paginatedData.length}
            onSelectAll={handleSelectAll}
          />
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((user) => (
              <TableRow
                key={user.id}
                user={user}
                isSelected={selectedRows.has(user.id)}
                onSelect={handleSelectRow}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default DataTable;
