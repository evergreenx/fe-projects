export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  company: { name: string }
  address: { city: string }
}

export type SortConfig = {
  key: keyof User | "company.name" | "address.city" | null
  direction: "asc" | "desc"
}

export interface Column {
  key: string
  label: string
  sortable?: boolean
  accessor?: (item: User) => any
}
