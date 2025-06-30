

import { memo } from "react"

interface PageSizeSelectorProps {
  pageSize: number
  onPageSizeChange: (size: number) => void
  options?: number[]
}

export const PageSizeSelector = memo<PageSizeSelectorProps>(
  ({ pageSize, onPageSizeChange, options = [5, 10, 25, 50] }) => {
    return (
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        aria-label="Items per page"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option} per page
          </option>
        ))}
      </select>
    )
  },
)

PageSizeSelector.displayName = "PageSizeSelector"
