import * as React from "react"
import { Modal } from "./Modal"
import { Button } from "./button"

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  variant?: "danger" | "warning"
  children?: React.ReactNode
}

const ConfirmDialog = ({
  isOpen,
  onClose,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  variant = "danger",
  children,
}: ConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      footer={
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            variant={variant === "danger" ? "destructive" : "default"}
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      {children}
    </Modal>
  )
}

export { ConfirmDialog }