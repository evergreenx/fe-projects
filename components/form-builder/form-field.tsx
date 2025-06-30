

import React from "react"
import type { FormFieldConfig } from "types/form/form-builder"


interface FormFieldProps {
  config: FormFieldConfig
  value: any
  error?: string
  onChange: (value: any) => void
}

export const FormField = React.memo<FormFieldProps>(({ config, value, error, onChange }) => {
  const { type, name, label, placeholder, required, disabled, options, className = "", description } = config

  const baseInputClasses = `
    w-full px-4 py-3 rounded-lg border transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 hover:border-gray-400"}
  `

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            rows={4}
            className={`${baseInputClasses} resize-vertical`}
            aria-describedby={description ? `${name}-description` : undefined}
            aria-invalid={!!error}
          />
        )

      case "select":
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={baseInputClasses}
            aria-describedby={description ? `${name}-description` : undefined}
            aria-invalid={!!error}
          >
            <option value="">{placeholder || `Select ${label}`}</option>
            {options?.map((option) => {
              const optionValue = typeof option === "string" ? option : option.value
              const optionLabel = typeof option === "string" ? option : option.label
              return (
                <option key={optionValue} value={optionValue}>
                  {optionLabel}
                </option>
              )
            })}
          </select>
        )

      case "checkbox":
        return (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
              disabled={disabled}
              className="
                w-5 h-5 text-blue-600 border-gray-300 rounded 
                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
              "
              aria-describedby={description ? `${name}-description` : undefined}
              aria-invalid={!!error}
            />
            <label htmlFor={name} className="text-sm font-medium text-gray-700 cursor-pointer">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        )

      case "radio":
        return (
          <div className="space-y-3">
            {options?.map((option) => {
              const optionValue = typeof option === "string" ? option : option.value
              const optionLabel = typeof option === "string" ? option : option.label
              return (
                <div key={optionValue} className="flex items-center gap-3">
                  <input
                    type="radio"
                    id={`${name}-${optionValue}`}
                    name={name}
                    value={optionValue}
                    checked={value === optionValue}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    className="
                      w-5 h-5 text-blue-600 border-gray-300 
                      focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                    aria-describedby={description ? `${name}-description` : undefined}
                    aria-invalid={!!error}
                  />
                  <label
                    htmlFor={`${name}-${optionValue}`}
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {optionLabel}
                  </label>
                </div>
              )
            })}
          </div>
        )

      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={baseInputClasses}
            aria-describedby={description ? `${name}-description` : undefined}
            aria-invalid={!!error}
          />
        )
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {type !== "checkbox" && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {renderInput()}

      {description && (
        <p id={`${name}-description`} className="text-sm text-gray-600">
          {description}
        </p>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}
    </div>
  )
})

FormField.displayName = "FormField"
