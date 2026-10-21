import * as React from "react"
import { m, AnimatePresence } from "motion/react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { MODAL_BACKDROP, MODAL_PANEL } from "@/lib/motion"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  footer?: React.ReactNode
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
}

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  footer,
}: ModalProps) => {
  React.useEffect(() => {
    if (!isOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEsc)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <m.div
            className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
            {...MODAL_BACKDROP}
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            role="dialog"
            aria-modal="true"
            className={cn(
              "relative z-10 w-full rounded-lg border border-outline-variant bg-surface-container-lowest p-6 shadow-lg",
              sizeClasses[size]
            )}
            {...MODAL_PANEL}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>
            {title && (
              <h2 className="text-h4 font-semibold text-on-surface">{title}</h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-secondary">{description}</p>
            )}
            <div className="mt-4">{children}</div>
            {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
          </m.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export { Modal }