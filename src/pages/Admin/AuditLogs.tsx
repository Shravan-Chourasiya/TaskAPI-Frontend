import * as React from "react"
import { useState, useMemo } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { Pagination } from "@/components/ui/Pagination"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { FileText, Search } from "lucide-react"
import type { AuditLogRow } from "@/types"

const generateAuditLogs = (): AuditLogRow[] => {
  const actions = ["user_created", "user_updated", "user_deleted", "key_created", "key_revoked", "subscription_updated"]
  const results: ("success" | "failure")[] = ["success", "failure"]
  const logs: AuditLogRow[] = []
  for (let i = 1; i <= 50; i++) {
    logs.push({
      id: `log-${i}`,
      timestamp: `2024-08-${String((i % 30) + 1).padStart(2, "0")}T${String((i % 24)).padStart(2, "0")}:${String((i % 60)).padStart(2, "0")}:${String((i % 60)).padStart(2, "0")}Z`,
      adminEmail: `admin${i % 5 + 1}@example.com`,
      action: actions[i % 6],
      targetId: `target-${i}`,
      result: results[i % 2],
    })
  }
  return logs
}

const ALL_LOGS = generateAuditLogs()
const PAGE_SIZE = 10

const AdminAuditLogs = () => {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  React.useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    return ALL_LOGS.filter((l) => {
      const matchesSearch = l.adminEmail.toLowerCase().includes(search.toLowerCase()) ||
        l.action.toLowerCase().includes(search.toLowerCase())
      return matchesSearch
    })
  }, [search])

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, page])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

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
        <h1 className="text-h3 font-semibold text-on-surface">Audit logs</h1>
        <p className="text-sm text-secondary">Track administrative actions</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search by admin or action..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-outline bg-surface-container text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      </div>

      {!filtered.length ? (
        <EmptyState
          icon={<FileText className="h-10 w-10" />}
          title="No logs found"
          description="Adjust your search terms to find matching audit logs."
        />
      ) : (
        <>
          <div className="rounded-lg border border-outline-variant bg-surface-container-lowest overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="text-sm">{new Date(l.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{l.adminEmail}</TableCell>
                    <TableCell><code className="text-sm">{l.action}</code></TableCell>
                    <TableCell>{l.targetId}</TableCell>
                    <TableCell>
                      <Badge variant={l.result === "success" ? "active" : "revoked"}>
                        {l.result}
                      </Badge>
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

export { AdminAuditLogs }