import * as React from "react"
import { cn } from "@/lib/utils"

interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-3",
}

const Spinner = ({ size = "md", text }: SpinnerProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "animate-spin rounded-full border-primary border-t-transparent",
          sizeMap[size]
        )}
      />
      {text && <p className="text-sm text-secondary">{text}</p>}
    </div>
  )
}

export { Spinner }
