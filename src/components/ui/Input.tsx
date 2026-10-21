import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  hint?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, hint, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-on-surface">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {icon}
            </div>
          )}
          <input
            className={cn(
              "flex h-11 w-full rounded-md border border-outline bg-surface-container px-3 py-2 text-sm ring-offset-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-10",
              error && "border-destructive",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        {hint && (
          <p className="text-sm text-secondary">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
