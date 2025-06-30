;

import { FormBuilder } from "components/form-builder/form-builder";
import { useState } from "react";
import type { FormFieldConfig } from "types/form/form-builder";
import { z } from "zod";

// Basic form with Zod schemas
const basicFormConfig: FormFieldConfig[] = [
  {
    type: "text",
    label: "Full Name",
    name: "name",
    required: true,
    placeholder: "Enter your full name",
    zodSchema: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
  },
  {
    type: "email",
    label: "Email Address",
    name: "email",
    required: true,
    placeholder: "Enter your email address",
    zodSchema: z.string().email("Please enter a valid email address"),
  },
  {
    type: "select",
    label: "Gender",
    name: "gender",
    options: ["Male", "Female", "Other", "Prefer not to say"],
    required: true,
    zodSchema: z.enum(["Male", "Female", "Other", "Prefer not to say"], {
      errorMap: () => ({ message: "Please select a gender" }),
    }),
  },
];

// Advanced form with complex Zod validation
const advancedFormConfig: FormFieldConfig[] = [
  {
    type: "text",
    label: "Company Name",
    name: "company",
    required: true,
    placeholder: "Enter your company name",
    zodSchema: z.string().min(2, "Company name must be at least 2 characters"),
  },
  {
    type: "select",
    label: "Industry",
    name: "industry",
    options: [
      { label: "Technology", value: "tech" },
      { label: "Healthcare", value: "healthcare" },
      { label: "Finance", value: "finance" },
      { label: "Education", value: "education" },
      { label: "Other", value: "other" },
    ],
    required: true,
    zodSchema: z.enum(["tech", "healthcare", "finance", "education", "other"]),
  },
  {
    type: "textarea",
    label: "Project Description",
    name: "description",
    placeholder: "Describe your project requirements...",
    conditional: { field: "industry", value: "tech" },
    zodSchema: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description must be less than 500 characters"),
  },
  {
    type: "number",
    label: "Budget Range (USD)",
    name: "budget",
    placeholder: "Enter your budget in USD",
    zodSchema: z.coerce
      .number()
      .min(1000, "Budget must be at least $1,000")
      .max(1000000, "Budget must be less than $1,000,000"),
  },
  {
    type: "url",
    label: "Company Website",
    name: "website",
    placeholder: "https://example.com",
    zodSchema: z
      .string()
      .url("Please enter a valid URL")
      .optional()
      .or(z.literal("")),
  },
  {
    type: "tel",
    label: "Phone Number",
    name: "phone",
    placeholder: "+1234567890",
    zodSchema: z
      .string()
      .regex(/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
      .optional()
      .or(z.literal("")),
  },
  {
    type: "checkbox",
    label: "I agree to the terms and conditions",
    name: "terms",
    required: true,
    zodSchema: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must agree to the terms and conditions"
      ),
  },
  {
    type: "checkbox",
    label: "Subscribe to newsletter",
    name: "newsletter",
    zodSchema: z.boolean().optional(),
  },
];

export default function FormBuilderPage() {
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [activeForm, setActiveForm] = useState<"basic" | "advanced" | "custom">(
    "basic"
  );

  const handleSubmit = async (data: any) => {
    // Additional cross-field validation for custom form
    if (activeForm === "custom") {
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmittedData(data);
  };

  const getCurrentConfig = () => {
    switch (activeForm) {
      case "basic":
        return basicFormConfig;
      case "advanced":
        return advancedFormConfig;

      default:
        return basicFormConfig;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
         Form Builder
          </h1>
          <p className="text-gray-600">
            Schema-based validation with TypeScript safety
          </p>
        </div>

        {/* Form Type Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveForm("basic")}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                activeForm === "basic"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Basic Form
            </button>
            <button
              onClick={() => setActiveForm("advanced")}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                activeForm === "advanced"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Advanced Form
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold mb-6">
              {activeForm === "basic" && "Basic Contact Form"}
              {activeForm === "advanced" && "Advanced Project Form"}
            </h2>
            <FormBuilder
              config={getCurrentConfig()}
              onSubmit={handleSubmit}
              resetOnSubmit={false}
              showValidationSummary={true}
            />
          </div>

          {/* Schema & Output Display */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold mb-6">Zod Schema & Output</h2>

            {/* Schema Display */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Zod Validation Schema:
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg text-xs overflow-auto max-h-40">
                <pre>
                  {`z.object({
${getCurrentConfig()
  .map((field) => {
    const schemaStr =
      field.zodSchema?.toString() ||
      `z.string()${field.required ? "" : ".optional()"}`;
    return `  ${field.name}: ${schemaStr
      .replace("ZodString", "z.string()")
      .replace("ZodNumber", "z.number()")
      .replace("ZodBoolean", "z.boolean()")}`;
  })
  .join(",\n")}
})`}
                </pre>
              </div>
            </div>

            {/* Submitted Data */}
            {submittedData ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700">
                    Validated & Typed Data:
                  </h3>
                  <button
                    onClick={() => setSubmittedData(null)}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Clear
                  </button>
                </div>
                <pre className="bg-green-50 p-4 rounded-lg text-xs overflow-auto border border-green-200">
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>Submit the form to see validated data here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
