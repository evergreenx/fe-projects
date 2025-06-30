import { z } from "zod"

export interface FormFieldConfig {
  type: "text" | "email" | "password" | "number" | "tel" | "url" | "select" | "textarea" | "checkbox" | "radio"
  name: string
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  options?: string[] | { label: string; value: string }[]
  conditional?: {
    field: string
    value: any
    operator?: "equals" | "not-equals" | "contains"
  }
  className?: string
  description?: string
  zodSchema?: z.ZodTypeAny
}

export type FormData = Record<string, any>

export interface ValidationError {
  field: string
  message: string
}

// Helper function to create Zod schemas for common field types
export const createFieldSchema = (field: FormFieldConfig): z.ZodTypeAny => {
  if (field.zodSchema) {
    return field.zodSchema
  }

  let schema: z.ZodTypeAny

  switch (field.type) {
    case "email":
      schema = z.string().email("Please enter a valid email address")
      break
    case "url":
      schema = z.string().url("Please enter a valid URL")
      break
    case "number":
      schema = z.coerce.number()
      break
    case "checkbox":
      schema = z.boolean()
      break
    case "tel":
      schema = z.string().regex(/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
      break
    default:
      schema = z.string()
  }

  // Apply required/optional
  if (!field.required) {
    schema = schema.optional()
  }

  // Add string-specific validations
  if (schema instanceof z.ZodString || (schema as any)._def?.innerType instanceof z.ZodString) {
    const stringSchema = schema as z.ZodString

    // Add min/max length if specified in field name or common patterns
    if (field.name.includes("password")) {
      schema = stringSchema.min(8, "Password must be at least 8 characters")
    }
    if (field.name.includes("name")) {
      schema = stringSchema.min(2, "Name must be at least 2 characters")
    }
  }

  return schema
}
