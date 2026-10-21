import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge"
import { StatCard } from "@/components/ui/StatCard"
import { CodeDisplay } from "@/components/ui/CodeDisplay"
import { ConfirmDialog } from "@/components/ui/ConfirmDialog"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Eye, Ban, ArrowLeft } from "lucide-react"
import type { ApiKey } from "@/types"
import { useState } from "react"

const MOCK_KEY: ApiKey = {
  id: "key-1",
  name: "Production",
  maskedKey: "tk_live_492x82abc123def456",
  createdAt: "2024-01-15",
  lastUsedAt: "2024-08-16",
  scopes: ["keys.read", "keys.write", "usage.read"],
  status: "active",
  environment: "live",
}

const MOCK_USAGE = [
  { date: "2024-08-10", requests: 120 },
  { date: "2024-08-11", requests: 89 },
  { date: "2024-08-12", requests: 200 },
  { date: "2024-08-13", requests: 178 },
  { date: "2024-08-14", requests: 149 },
  { date: "2024-08-15", requests: 239 },
  { date: "2024-08-16", requests: 349 },
]

const ALL_SCOPES = ["keys.read", "keys.write", "usage.read", "usage.write", "admin.read", "admin.write"]

const KeyDetail = () => {
  const { keyId } = useParams<{ keyId: string }>()
  const navigate = useNavigate()
  const [scopes, setScopes] = useState<string[]>(MOCK_KEY.scopes)
  const [revokeOpen, setRevokeOpen] = useState(false)

  const toggleScope = (scope: string) => {
    setScopes((prev) => prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope])
  }

  const handleRevoke = () => {
    setRevokeOpen(false)
    toast.success("API key revoked")
    navigate("/keys")
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" onClick={() => navigate("/keys")}>
        <ArrowLeft className="h-4 w-4" /> Back to keys
      </Button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h3 font-semibold text-on-surface">{MOCK_KEY.name}</h1>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant={MOCK_KEY.status === "active" ? "active" : "revoked"}>{MOCK_KEY.status}</Badge>
            <Badge variant="neutral">{MOCK_KEY.environment}</Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={<Eye className="h-5 w-5" />} value={349} label="Requests (7d)" />
        <StatCard icon={<Eye className="h-5 w-5" />} value={MOCK_KEY.createdAt} label="Created" />
        <StatCard icon={<Eye className="h-5 w-5" />} value={MOCK_KEY.lastUsedAt} label="Last used" />
      </div>

      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
        <h2 className="text-h4 font-semibold text-on-surface">Usage (last 7 days)</h2>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_USAGE}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="requests" stroke="var(--color-primary)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
        <h2 className="text-h4 font-semibold text-on-surface">Key</h2>
        <div className="mt-4">
          <CodeDisplay value={MOCK_KEY.maskedKey} />
        </div>
      </div>

      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
        <h2 className="text-h4 font-semibold text-on-surface">Scopes</h2>
        <p className="mt-1 text-sm text-secondary">Control what this key can access</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {ALL_SCOPES.map((scope) => (
            <label key={scope} className="flex items-center gap-2 rounded-md border border-outline-variant p-3">
              <input
                type="checkbox"
                checked={scopes.includes(scope)}
                onChange={() => toggleScope(scope)}
                className="rounded border-outline"
              />
              <code className="text-sm text-on-surface">{scope}</code>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-destructive/30 bg-destructive-container/30 p-6">
        <h2 className="text-h4 font-semibold text-destructive">Danger zone</h2>
        <p className="mt-1 text-sm text-secondary">Revoking a key immediately breaks services using it.</p>
        <div className="mt-4">
          <Button variant="destructive" onClick={() => setRevokeOpen(true)}>
            <Ban className="h-4 w-4" /> Revoke key
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={revokeOpen}
        onClose={() => setRevokeOpen(false)}
        title="Revoke this API key?"
        description="Requests signed with this key will be rejected immediately. This cannot be undone."
        confirmText="Revoke key"
        onConfirm={handleRevoke}
      />
    </div>
  )
}

export { KeyDetail }