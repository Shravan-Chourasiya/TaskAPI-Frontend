import * as React from "react"
import { cn } from "@/lib/utils"

interface DateRange {
  from: string
  to: string
}

interface DateRangePickerProps {
  value: DateRange
  onChange: (range: DateRange) => void
}

const toInputValue = (iso: string) => (iso ? iso.slice(0, 10) : "")

const DateRangePicker = ({ value, onChange }: DateRangePickerProps) => {
  const handleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, from: e.target.value })
  }
  const handleTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, to: e.target.value })
  }

  return (
    <div className={cn("flex items-center gap-2 rounded-md border border-outline bg-surface-container px-3 py-2")}>
      <input
        type="date"
        aria-label="From"
        value={toInputValue(value.from)}
        onChange={handleFrom}
        className="bg-transparent text-sm focus:outline-none"
      />
      <span className="text-secondary">→</span>
      <input
        type="date"
        aria-label="To"
        value={toInputValue(value.to)}
        onChange={handleTo}
        className="bg-transparent text-sm focus:outline-none"
      />
   </div>
  )
}

export { DateRangePicker }
export type { DateRange }
