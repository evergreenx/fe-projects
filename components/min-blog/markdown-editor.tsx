
import { useState } from "react"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")

  const renderMarkdown = (markdown: string) => {
    // Simple markdown rendering - in a real app, you'd use a library like marked or remark
    return markdown
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      .replace(/\n\n/gim, '</p><p class="mb-4">')
      .replace(/\n/gim, "<br>")
      .replace(/^(.+)$/gim, '<p class="mb-4">$1</p>')
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex border-b border-gray-300">
        <button
          type="button"
          onClick={() => setActiveTab("write")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "write"
              ? "bg-blue-50 text-blue-700 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "preview"
              ? "bg-blue-50 text-blue-700 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Preview
        </button>
      </div>

      <div className="min-h-[200px]">
        {activeTab === "write" ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full min-h-[200px] p-4 border-none outline-none resize-none"
          />
        ) : (
          <div className="p-4 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }} />
        )}
      </div>
    </div>
  )
}
