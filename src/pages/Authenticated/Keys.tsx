import * as React from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useState, useEffect, useMemo, useCallback } from "react"
import { m, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import { Input } from "@/components/ui/Input"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { Pagination } from "@/components/ui/Pagination"
import { Key, Plus, Eye, Ban } from "lucide-react"
import type { ApiKey } from "@/types"
import { KeyTableRow } from "@/components/Authenticated/KeyTableRow"

const MOCK_KEYS: ApiKey[] = [
  { id: "key-1", name: "Production", maskedKey: "tk_live_492x82...a1b2c3", createdAt: "2024-01-15", lastUsedAt: "2024-08-16", scopes: ["keys.read", "keys.write"], status: "active", environment: "live" },
  { id: "key-2", name: "Staging", maskedKey: "tk_test_9f2k11...d4e5f6", createdAt: "2024-02-01", lastUsedAt: "2024-08-14", scopes: ["keys.read"], status: "active", environment: "test" },
  { id: "key-3", name: "Legacy", maskedKey: "tk_live_31a4b8...g7h8i9", createdAt: "2023-11-20", lastUsedAt: null, scopes: [], status: "revoked", environment: "live" },
]

function useApiKeys() {
  const [keys, setKeys] = useState<ApiKey[] | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setKeys(MOCK_KEYS)
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])
  const createKey = useCallback((name: string) => {
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name,
      maskedKey: "tk_live_9f2k11...new",
      createdAt: new Date().toISOString().slice(0, 10),
      lastUsedAt: null,
      scopes: ["keys.read"],
      status: "active",
      environment: "live",
    }
    setKeys((prev) => (prev ? [...prev, newKey] : prev))
    return newKey
  }, [])
  const revokeKey = useCallback((id: string) => {
    setKeys((prev) => (prev ? prev.map((k) => (k.id === id ? { ...k, status: "revoked" } : k)) : prev))
  }, [])
  return { keys, loading, createKey, revokeKey }
}

const Keys = () => {
  const { keys, loading, createKey, revokeKey } = useApiKeys()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [keyName, setKeyName] = useState("")
  const navigate = useNavigate()

  const handleView = useCallback((id: string) => navigate(`/keys/${id}`), [navigate])
  const handleRevoke = useCallback((id: string) => {
    revokeKey(id)
    toast.success("API key revoked")
  }, [revokeKey])

  const handleCreate = () => {
    if (!keyName.trim()) return
    createKey(keyName.trim())
    setKeyName("")
    setIsCreateOpen(false)
    toast.success("API key created")
  }

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h3 font-semibold text-on-surface">API Keys</h1>
          <p className="text-sm text-secondary">Manage the keys your services use to call Authrix</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4" /> Create key
        </Button>
      </div>

      {!keys || keys.length === 0 ? (
        <EmptyState
          icon={<Key className="h-10 w-10" />}
          title="Create your first API key"
          description="API keys let your services authenticate against Authrix. Create one to start integrating."
          action={<Button onClick={() => setIsCreateOpen(true)}><Plus className="h-4 w-4" /> Create key</Button>}
        />
      ) : (
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last used</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {keys.map((k) => (
                  <KeyTableRow
                    key={k.id}
                    apiKey={k}
                    onView={handleView}
                    onRevoke={handleRevoke}
                  />
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      )}

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create API key" description="A new key with read access will be created.">
        <div className="space-y-4">
          <Input
            label="Key name"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            placeholder="e.g. Production"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!keyName.trim()}>Create key</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Keys