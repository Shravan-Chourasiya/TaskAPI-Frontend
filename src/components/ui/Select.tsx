import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
  onValueChange?: (value: string) => void
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      options,
      placeholder,
      onValueChange,
      defaultValue,
      value,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onValueChange?.(e.target.value)
      props.onChange?.(e)
    }

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-on-surface">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "flex h-11 w-full appearance-none rounded-md border border-outline bg-surface-container px-3 py-2 pr-10 text-sm ring-offset-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive",
              className
            )}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  }
)

Select.displayName = "Select"

export { Select }
export type { SelectOption }
