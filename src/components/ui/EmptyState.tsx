import * as React from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}

const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-outline-variant bg-surface-container-low p-12 text-center">
      <div className="rounded-full bg-surface-container p-4 text-secondary">
        {icon}
      </div>
      <h3 className="mt-4 text-h5 font-semibold text-on-surface">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-secondary">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export { EmptyState }
