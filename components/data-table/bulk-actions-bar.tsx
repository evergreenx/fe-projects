

import { memo } from "react"
import { motion } from "motion/react"
import { Trash2, X } from "lucide-react"

interface BulkActionsBarProps {
  selectedCount: number
  onDelete: () => void
  onClear: () => void
}

export const BulkActionsBar = memo<BulkActionsBarProps>(({ selectedCount, onDelete, onClear }) => {
  return (
    <>
      {selectedCount > 0 && (
        <>

  

          {/* Bulk Actions Bar */}
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
              transition: {
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.3,
              },
            }}
            exit={{
              y: 100,
              opacity: 0,
              scale: 0.95,
              transition: {
                duration: 0.2,
              },
            }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 px-6 py-4 flex items-center gap-4 min-w-[300px]">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {selectedCount} selected
              </motion.div>

              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 500 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg"
                aria-label={`Delete ${selectedCount} selected items`}
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
                Delete
              </motion.button>

              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClear}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-lg"
                aria-label="Clear selection"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </>
  )
})

BulkActionsBar.displayName = "BulkActionsBar"
