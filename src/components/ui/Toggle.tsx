import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { Button } from "./button"

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        asChild
        variant={checked ? "default" : "outline"}
        size="md"
        className={cn(
          "relative flex h-5 w-9 items-center justify-between rounded-full bg-surface-container-low",
          className
        )}
      >
        <Button
          asChild
          className={cn("relative flex h-4 w-4 rounded-full bg-white", className)}
          onClick={() => {
            onCheckedChange(!checked)
          }}
        >
          <Check className="absolute inset-0 h-4 w-4 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
        </Button>
      </Button>
    )
  }
)

Toggle.displayName = "Toggle"

export { Toggle }