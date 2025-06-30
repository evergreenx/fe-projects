

import { memo } from "react"
import { MoreHorizontal } from "lucide-react"
import type { User } from "types/table.ts/table"


interface TableRowProps {
  user: User
  isSelected: boolean
  onSelect: (id: number) => void
}

export const TableRow = memo<TableRowProps>(({ user, isSelected, onSelect }) => {
  return (
    <tr className={`hover:bg-gray-50 transition-colors ${isSelected ? "bg-blue-50" : ""}`}>
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(user.id)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          aria-label={`Select ${user.firstName} ${user.lastName}`}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {user.firstName} {user.lastName}
        </div>
        <div className="text-sm text-gray-500">{user.phone}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.company.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.address.city}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.age}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <button
          className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          aria-label={`More actions for ${user.firstName} ${user.lastName}`}
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </td>
    </tr>
  )
})

TableRow.displayName = "TableRow"
