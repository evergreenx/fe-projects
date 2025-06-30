

import { useFormBuilder } from "hooks/use-form-builder"
import type React from "react"
import { useCallback, useMemo } from "react"
import type { FormFieldConfig } from "types/form/form-builder"
import { FormField } from "./form-field"


interface FormBuilderProps {
  config: FormFieldConfig[]
  onSubmit: (data: FormData) => void | Promise<void>
  className?: string
  submitButtonText?: string
  resetOnSubmit?: boolean
  showValidationSummary?: boolean
}

export function FormBuilder({
  config,
  onSubmit,
  className = "",
  submitButtonText = "Submit Form",
  resetOnSubmit = false,
  showValidationSummary = false,
}: FormBuilderProps) {
  const {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleFieldChange,
    validateForm,
    resetForm,
    hasErrors,
    getTypedFormData,
  } = useFormBuilder(config)

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)

      try {
        if (validateForm()) {
          const typedData = getTypedFormData()
          if (typedData) {
            await onSubmit(typedData)
            if (resetOnSubmit) {
              resetForm()
            }
          }
        }
      } catch (error) {
        console.error("Form submission error:", error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [validateForm, getTypedFormData, onSubmit, resetOnSubmit, resetForm, setIsSubmitting],
  )

  // Filter visible fields based on conditional logic
  const visibleFields = useMemo(() => {
    return config.filter((field) => {
      if (field.conditional) {
        const { field: condField, value: condValue, operator = "equals" } = field.conditional
        const fieldValue = formData[condField]

        switch (operator) {
          case "equals":
            return fieldValue === condValue
          case "not-equals":
            return fieldValue !== condValue
          case "contains":
            return Array.isArray(fieldValue) ? fieldValue.includes(condValue) : false
          default:
            return true
        }
      }
      return true
    })
  }, [config, formData])

  const memoizedFields = useMemo(
    () =>
      visibleFields.map((field) => (
        <FormField
          key={field.name}
          config={field}
          value={formData[field.name] || (field.type === "checkbox" ? false : "")}
          error={errors[field.name]}
          onChange={(value) => handleFieldChange(field.name, value)}
        />
      )),
    [visibleFields, formData, errors, handleFieldChange],
  )

  const errorCount = Object.keys(errors).length

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Validation Summary */}
        {showValidationSummary && hasErrors && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-sm font-medium text-red-800">
                Please fix {errorCount} error{errorCount !== 1 ? "s" : ""} before submitting:
              </h3>
            </div>
            <ul className="text-sm text-red-700 space-y-1">
              {Object.entries(errors).map(([field, error]) => {
                const fieldConfig = config.find((f) => f.name === field)
                return (
                  <li key={field}>
                    • {fieldConfig?.label || field}: {error}
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {memoizedFields}

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              flex-1 px-6 py-3 rounded-lg font-medium text-white transition-all duration-200
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black  focus:bg-blue-700 active:bg-blue-800"
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              submitButtonText
            )}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="
              px-6 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 
              hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-300
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
              transition-all duration-200
            "
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
