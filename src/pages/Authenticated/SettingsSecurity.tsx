import * as React from "react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/Toggle"
import { CodeDisplay } from "@/components/ui/CodeDisplay"

const SettingsSecurity = () => {
  const [twoFA, setTwoFA] = useState(false)

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-h3 font-semibold text-on-surface">Security</h1>
        <p className="text-sm text-secondary">Manage your account security and 2FA</p>
      </div>

      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-on-surface">Two-Factor Authentication (2FA)</h3>
            <p className="text-sm text-secondary">Add an extra layer of security to your account</p>
          </div>
          <Toggle checked={twoFA} onCheckedChange={setTwoFA} />
        </div>

        {twoFA && (
          <div className="rounded-md border border-outline-variant bg-surface-container p-4 space-y-4">
            <p className="text-sm text-on-surface">Scan this QR code with your authenticator app</p>
            <div className="h-40 w-40 rounded-lg border border-outline-variant bg-white p-2" />
            <CodeDisplay value="MOCK-SECRET-KEY-123456" />
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={() => toast.success("Security settings updated")}>Save changes</Button>
        </div>
      </div>
    </div>
  )
}

export { SettingsSecurity }