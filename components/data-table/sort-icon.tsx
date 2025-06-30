import { memo } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import type { SortConfig } from "types/table.ts/table"


interface SortIconProps {
  column: string
  sortConfig: SortConfig
}

export const SortIcon = memo<SortIconProps>(({ column, sortConfig }) => {
  if (sortConfig.key !== column) {
    return <div className="w-4 h-4" aria-hidden="true" />
  }

  const Icon = sortConfig.direction === "asc" ? ChevronUp : ChevronDown
  const ariaLabel = `Sorted ${sortConfig.direction === "asc" ? "ascending" : "descending"}`

  return <Icon className="w-4 h-4" aria-label={ariaLabel} />
})

SortIcon.displayName = "SortIcon"
