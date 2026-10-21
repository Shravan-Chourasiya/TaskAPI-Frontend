import * as React from "react"
import { Search } from "lucide-react"
import { useDebounce } from "@/hooks/useDebounce"
import { cn } from "@/lib/utils"

interface SearchInputProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  debounceMs?: number
  className?: string
}

const SearchInput = ({
  placeholder = "Search...",
  value,
  onChange,
  debounceMs = 300,
  className,
}: SearchInputProps) => {
  const [localValue, setLocalValue] = React.useState(value)
  const debounced = useDebounce(localValue, debounceMs)

  React.useEffect(() => {
    if (debounced !== value) {
      onChange(debounced)
    }
  }, [debounced, value, onChange])

  return (
    <div className={cn("relative flex-1", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
      <input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-md border border-outline bg-surface-container text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      />
    </div>
  )
}

export { SearchInput }