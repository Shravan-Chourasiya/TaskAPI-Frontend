import * as React from "react"
import { Button } from "./button"
import { Copy, Check } from "lucide-react"

interface CodeDisplayProps {
  value: string
  masked?: boolean
  onCopy?: () => void
}

const CodeDisplay = ({ value, masked = false, onCopy }: CodeDisplayProps) => {
  const [copied, setCopied] = React.useState(false)
  const displayValue = masked
    ? value.slice(0, 8) + "••••" + value.slice(-4)
    : value

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    onCopy?.()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2">
      <code className="flex-1 key-display text-code bg-surface-container-high px-3 py-2 rounded-md">
        {displayValue}
      </code>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
      >
        {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

export { CodeDisplay }