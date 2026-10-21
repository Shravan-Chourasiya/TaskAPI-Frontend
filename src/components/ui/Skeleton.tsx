import * as React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular"
}

const Skeleton = ({ className, variant = "rectangular", ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-surface-container",
        variant === "circular" && "rounded-full",
        variant === "text" && "h-4 rounded",
        variant === "rectangular" && "rounded-md",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
