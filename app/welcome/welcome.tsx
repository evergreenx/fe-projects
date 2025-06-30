import { FormInput, PenTool, Table } from 'lucide-react'
import React from 'react'

export default function Welcome() {
  const tasks = [
    {
      id: 1,
      title: "Data Table",
      description: "Feature-rich table with sorting, filtering, and pagination",
      href: "/data-table",
      icon: Table,
    },
    {
      id: 2,
      title: "Form Builder",
      description: "Dynamic form generation with Zod validation",
      href: "/form-builder",
      icon: FormInput,
    },
    {
      id: 3,
      title: "Blog App",
      description: "Mini blog with CRUD operations and routing",
      href: "/mini-blog",
      icon: PenTool,
    },
  ]

  return (
    <div className='container px-4'>
      {tasks.map((task) => (
        <div key={task.id} className="mb-4">
          <a href={task.href} className="flex items-center space-x-3 text-black hover:underline">
     
            <div>
              <h3 className="text-base font-medium">{task.title}</h3>
              <p className="text-sm">{task.description}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  )
}
