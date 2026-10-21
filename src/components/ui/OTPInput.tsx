import * as React from "react"
import { cn } from "@/lib/utils"

interface OTPInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const OTPInput = ({ length = 6, value, onChange, disabled }: OTPInputProps) => {
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const char = e.target.value.slice(-1)
    if (!/^\d?$/.test(char)) return

    const nextValue = value.split("")
    nextValue[index] = char
    const updated = nextValue.join("").slice(0, length)
    onChange(updated)

    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
    onChange(pasted)
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus()
  }

  return (
    <div className="flex gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          disabled={disabled}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className={cn(
            "h-12 w-12 rounded-md border border-outline bg-surface-container text-center text-h4 font-semibold text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          aria-label={`Digit ${i + 1} of ${length}`}
        />
      ))}
    </div>
  )
}

export { OTPInput }