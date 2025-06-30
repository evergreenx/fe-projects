

import { memo } from "react"
import { SortIcon } from "./sort-icon"
import type { Column, SortConfig } from "types/table.ts/table"




interface TableHeaderProps {
  columns: Column[]
  sortConfig: SortConfig
  onSort: (key: SortConfig["key"]) => void
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
}

export const TableHeader = memo<TableHeaderProps>(
  ({ columns, sortConfig, onSort, selectedCount, totalCount, onSelectAll }) => {
    const isAllSelected = selectedCount === totalCount && totalCount > 0
    const isIndeterminate = selectedCount > 0 && selectedCount < totalCount

    return (
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left" scope="col">
            <input
              type="checkbox"
              checked={isAllSelected}
              ref={(input) => {
                if (input) input.indeterminate = isIndeterminate
              }}
              onChange={onSelectAll}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              aria-label={isAllSelected ? "Deselect all" : "Select all"}
            />
          </th>
          {columns.map(({ key, label, sortable = true }) => (
            <th
              key={key}
              className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                sortable ? "cursor-pointer hover:bg-gray-100 transition-colors" : ""
              }`}
              onClick={sortable ? () => onSort(key as SortConfig["key"]) : undefined}
              scope="col"
              aria-sort={
                sortConfig.key === key ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"
              }
            >
              <div className="flex items-center gap-2">
                {label}
                {sortable && <SortIcon column={key} sortConfig={sortConfig} />}
              </div>
            </th>
          ))}
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">
            Actions
          </th>
        </tr>
      </thead>
    )
  },
)

TableHeader.displayName = "TableHeader"
