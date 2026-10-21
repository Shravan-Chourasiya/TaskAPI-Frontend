import * as React from "react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  icon: React.ReactNode
  value: string | number
  label: string
  trend?: {
    value: string
    direction: "up" | "down" | "neutral"
  }
  loading?: boolean
}

const StatCard = ({ icon, value, label, trend, loading }: StatCardProps) => {
  return (
    <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="rounded-md bg-surface-container p-2 text-primary">
          {icon}
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium",
              trend.direction === "up" ? "text-success" : trend.direction === "down" ? "text-destructive" : "text-secondary"
            )}
          >
            {trend.value}
          </span>
        )}
      </div>
      <div className="mt-3">
        {loading ? (
          <div className="h-8 w-16 animate-pulse rounded bg-surface-container" />
        ) : (
          <h3 className="text-h3 font-bold text-on-surface">{value}</h3>
        )}
        <p className="text-sm text-secondary">{label}</p>
      </div>
    </div>
  )
}

export { StatCard }
