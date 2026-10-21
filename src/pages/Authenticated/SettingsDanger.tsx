import * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"

const SettingsDanger = () => {
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-h3 font-semibold text-destructive">Danger zone</h1>
        <p className="text-sm text-secondary">Irreversible actions for your account</p>
      </div>

      <div className="rounded-lg border border-destructive/30 bg-destructive-container/30 p-6 space-y-4">
        <h3 className="font-semibold text-on-surface">Delete account</h3>
        <p className="text-sm text-secondary">This will permanently delete your account, keys, and data. This cannot be undone.</p>
        <Button variant="destructive" onClick={() => setDeleteOpen(true)}>Delete account</Button>
      </div>

      <ConfirmDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete account?"
        description="Are you sure you want to delete your account? This action is permanent."
        onConfirm={() => toast.success("Account scheduled for deletion")}
        variant="danger"
        confirmText="Delete account"
      />
    </div>
  )
}

export { SettingsDanger }