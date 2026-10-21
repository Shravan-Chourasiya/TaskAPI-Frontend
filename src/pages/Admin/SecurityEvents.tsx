import * as React from "react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { Pagination } from "@/components/ui/Pagination"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { AlertTriangle, Search } from "lucide-react"
import type { SecurityEventRow } from "@/types"

const generateSecurityEvents = (): SecurityEventRow[] => {
  const types: ("login_failure" | "token_leak" | "permission_escalation" | "suspicious_ip" | "brute_force")[] = [
    "login_failure", "token_leak", "permission_escalation", "suspicious_ip", "brute_force"
  ]
  const severities: ("low" | "medium" | "high" | "critical")[] = ["low", "medium", "high", "critical"]
  const events: SecurityEventRow[] = []
  for (let i = 1; i <= 40; i++) {
    events.push({
      id: `event-${i}`,
      timestamp: `2024-08-${String((i % 30) + 1).padStart(2, "0")}T${String((i % 24)).padStart(2, "0")}:${String((i % 60)).padStart(2, "0")}:${String((i % 60)).padStart(2, "0")}Z`,
      type: types[i % 5],
      severity: severities[i % 4],
      targetEmail: `user${i}@example.com`,
      detail: `Event ${i} details about ${types[i % 5]}`,
    })
  }
  return events
}

const ALL_EVENTS = generateSecurityEvents()
const PAGE_SIZE = 10

const AdminSecurityEvents = () => {
  const [loading, setLoading] = useState(true)
  const [severityFilter, setSeverityFilter] = useState<"all" | "low" | "medium" | "high" | "critical">("all")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  React.useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    return ALL_EVENTS.filter((e) => {
      const matchesSeverity = severityFilter === "all" || e.severity === severityFilter
      const matchesSearch = e.targetEmail.toLowerCase().includes(search.toLowerCase()) ||
        e.type.toLowerCase().includes(search.toLowerCase())
      return matchesSeverity && matchesSearch
    })
  }, [severityFilter, search])

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
        <h1 className="text-h3 font-semibold text-on-surface">Security events</h1>
        <p className="text-sm text-secondary">Monitor security-relevant events</p>
      </div>

      <div className="flex gap-4">
        <Select
          value={severityFilter}
          onValueChange={setSeverityFilter}
          options={[
            { value: "all", label: "All severities" },
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
            { value: "critical", label: "Critical" },
          ]}
        />
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search by user or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-outline bg-surface-container text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      </div>

      {!filtered.length ? (
        <EmptyState
          icon={<AlertTriangle className="h-10 w-10" />}
          title="No security events found"
          description="Adjust your filters to see matching security events."
        />
      ) : (
        <>
          <div className="rounded-lg border border-outline-variant bg-surface-container-lowest overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="text-sm">{new Date(e.timestamp).toLocaleString()}</TableCell>
                    <TableCell><code className="text-sm">{e.type}</code></TableCell>
                    <TableCell>
                      <Badge variant={e.severity === "low" ? "neutral" : e.severity === "medium" ? "warning" : e.severity === "high" ? "info" : "destructive"}>
                        {e.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>{e.targetEmail}</TableCell>
                    <TableCell className="text-sm">{e.detail}</TableCell>
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

export { AdminSecurityEvents }