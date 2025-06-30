import type { User } from "types/table.ts/table"


export const generateMockUsers = (count: number): User[] => {
  const firstNames = ["John", "Jane", "Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry"]
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
  ]
  const companies = ["TechCorp", "DataSys", "CloudCo", "DevStudio", "CodeFactory", "ByteWorks", "PixelPush", "LogicLab"]
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    email: `user${i + 1}@example.com`,
    phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    age: Math.floor(Math.random() * 50) + 20,
    company: { name: companies[Math.floor(Math.random() * companies.length)] },
    address: { city: cities[Math.floor(Math.random() * cities.length)] },
  }))
}
