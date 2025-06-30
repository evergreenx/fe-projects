

import { useState, useMemo, useCallback } from "react"
import type { SortConfig, User } from "types/table.ts/table"


export const useTableState = (initialData: User[]) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())

  // Filter and search logic
  const filteredData = useMemo(() => {
    if (!searchTerm) return initialData

    return initialData.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.city.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [initialData, searchTerm])

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData

    return [...filteredData].sort((a, b) => {
      let aValue: any, bValue: any

      if (sortConfig.key === "company.name") {
        aValue = a.company.name
        bValue = b.company.name
      } else if (sortConfig.key === "address.city") {
        aValue = a.address.city
        bValue = b.address.city
      } else {
        aValue = a[sortConfig.key as keyof User]
        bValue = b[sortConfig.key as keyof User]
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })
  }, [filteredData, sortConfig])

  // Pagination logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return sortedData.slice(startIndex, startIndex + pageSize)
  }, [sortedData, currentPage, pageSize])

  const totalPages = Math.ceil(sortedData.length / pageSize)

  // Handlers
  const handleSort = useCallback((key: SortConfig["key"]) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }))
  }, [])

  const handleSelectRow = useCallback((id: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }, [])

  const handleSelectAll = useCallback(() => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(paginatedData.map((user) => user.id)))
    }
  }, [selectedRows.size, paginatedData])

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1)
  }, [])

  return {
    // State
    searchTerm,
    sortConfig,
    currentPage,
    pageSize,
    selectedRows,

    // Computed values
    filteredData,
    sortedData,
    paginatedData,
    totalPages,

    // Handlers
    setSearchTerm,
    handleSort,
    setCurrentPage,
    handlePageSizeChange,
    handleSelectRow,
    handleSelectAll,
    setSelectedRows,
  }
}
