

import { useState, useCallback, useMemo } from "react"
import { createFieldSchema, type FormFieldConfig } from "types/form/form-builder"
import { z } from "zod"



export function useFormBuilder(config: FormFieldConfig[]) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Create Zod schema from config
  const zodSchema = useMemo(() => {
    const schemaObject: Record<string, z.ZodTypeAny> = {}

    config.forEach((field) => {
      schemaObject[field.name] = createFieldSchema(field)
    })

    return z.object(schemaObject)
  }, [config])

  const handleFieldChange = useCallback(
    (name: string, value: any) => {
      setFormData((prev) => ({ ...prev, [name]: value }))

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }))
      }

      // Real-time validation for the specific field
      try {
        const fieldConfig = config.find((f) => f.name === name)
        if (fieldConfig) {
          const fieldSchema = createFieldSchema(fieldConfig)
          fieldSchema.parse(value)

          // Clear error if validation passes
          setErrors((prev) => {
            const newErrors = { ...prev }
            delete newErrors[name]
            return newErrors
          })
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.errors[0]
          if (fieldError && value !== "" && value !== undefined) {
            setErrors((prev) => ({ ...prev, [name]: fieldError.message }))
          }
        }
      }
    },
    [errors, config],
  )

  const validateForm = useCallback(() => {
    try {
      // Filter out conditional fields that shouldn't be validated
      const filteredData: Record<string, any> = {}
      const visibleFields = config.filter((field) => {
        if (field.conditional) {
          const { field: condField, value: condValue, operator = "equals" } = field.conditional
          const fieldValue = formData[condField]

          let shouldShow = false
          switch (operator) {
            case "equals":
              shouldShow = fieldValue === condValue
              break
            case "not-equals":
              shouldShow = fieldValue !== condValue
              break
            case "contains":
              shouldShow = Array.isArray(fieldValue) ? fieldValue.includes(condValue) : false
              break
          }

          return shouldShow
        }
        return true
      })

      // Only validate visible fields
      visibleFields.forEach((field) => {
        filteredData[field.name] = formData[field.name]
      })

      // Create schema for only visible fields
      const visibleSchemaObject: Record<string, z.ZodTypeAny> = {}
      visibleFields.forEach((field) => {
        visibleSchemaObject[field.name] = createFieldSchema(field)
      })
      const visibleSchema = z.object(visibleSchemaObject)

      visibleSchema.parse(filteredData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            newErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }, [config, formData, zodSchema])

  const resetForm = useCallback(() => {
    setFormData({})
    setErrors({})
    setIsSubmitting(false)
  }, [])

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors])

  // Get typed form data
  const getTypedFormData = useCallback(() => {
    try {
      return zodSchema.parse(formData)
    } catch {
      return null
    }
  }, [zodSchema, formData])

  return {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleFieldChange,
    validateForm,
    resetForm,
    hasErrors,
    getTypedFormData,
    zodSchema,
  }
}
