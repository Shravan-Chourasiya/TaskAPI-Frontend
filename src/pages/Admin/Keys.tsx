import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { Pagination } from "@/components/ui/Pagination"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { Key, Ban, Check } from "lucide-react"
import type { AdminKeyRow } from "@/types"

const generateAdminKeys = (): AdminKeyRow[] => {
  const statuses: ("active" | "revoked" | "suspended")[] = ["active", "revoked", "suspended"]
  const keys: AdminKeyRow[] = []
  for (let i = 1; i <= 40; i++) {
    keys.push({
      id: `admin-key-${i}`,
      name: `Key ${i}`,
      maskedKey: `tk_${i % 2 === 0 ? "live" : "test"}_...${String(i).padStart(4, "0")}`,
      ownerEmail: `user${i}@example.com`,
      status: statuses[i % 3],
      createdAt: `2024-0${(i % 8) + 1}-${String((i % 28) + 1).padStart(2, "0")}`,
      lastUsedAt: i % 3 === 0 ? null : `2024-08-${String((i % 30) + 1).padStart(2, "0")}`,
    })
  }
  return keys
}

const ALL_KEYS = generateAdminKeys()
const PAGE_SIZE = 10

const AdminKeys = () => {
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "active" | "revoked" | "suspended">("all")
  const [page, setPage] = useState(1)
  const [keys, setKeys] = useState<AdminKeyRow[]>(ALL_KEYS)

  React.useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    return filter === "all" ? keys : keys.filter((k) => k.status === filter)
  }, [keys, filter])

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, page])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

  const toggleStatus = useCallback((id: string) => {
    setKeys((prev) =>
      prev.map((k) => {
        if (k.id !== id) return k
        const next = k.status === "active" ? "suspended" : "active"
        return { ...k, status: next }
      })
    )
    toast.success("Key status updated")
  }, [])

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-48" />
        {[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h3 font-semibold text-on-surface">Keys</h1>
        <p className="text-sm text-secondary">Cross-user API key management</p>
      </div>

      <div className="flex gap-4">
        {(["all", "active", "suspended", "revoked"] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setFilter(f)
              setPage(1)
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      {!filtered.length ? (
        <EmptyState
          icon={<Key className="h-10 w-10" />}
          title="No keys found"
          description="Adjust the status filter to see more keys."
        />
      ) : (
        <>
          <div className="rounded-lg border border-outline-variant bg-surface-container-lowest overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Key</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((k) => (
                  <TableRow key={k.id}>
                    <TableCell className="font-medium">{k.name}</TableCell>
                    <TableCell><code className="key-display text-code">{k.maskedKey}</code></TableCell>
                    <TableCell>{k.ownerEmail}</TableCell>
                    <TableCell>
                      <Badge variant={k.status === "active" ? "active" : k.status === "revoked" ? "revoked" : "suspended"}>
                        {k.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{k.createdAt}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => toggleStatus(k.id)}>
                        {k.status === "active" ? <Ban className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                        {k.status === "active" ? "Suspend" : "Activate"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary">Showing {paginated.length} of {filtered.length}</span>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </>
      )}
    </div>
  )
}

export { AdminKeys }