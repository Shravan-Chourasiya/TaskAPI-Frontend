import * as React from "react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { Pagination } from "@/components/ui/Pagination"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { CreditCard, Filter } from "lucide-react"
import type { SubscriptionRow } from "@/types"

const generateSubscriptions = (): SubscriptionRow[] => {
  const statuses: ("active" | "canceled" | "past_due")[] = ["active", "canceled", "past_due"]
  const plans: ("Free" | "Basic" | "Pro")[] = ["Free", "Basic", "Pro"]
  const subs: SubscriptionRow[] = []
  for (let i = 1; i <= 30; i++) {
    subs.push({
      id: `sub-${i}`,
      userEmail: `user${i}@example.com`,
      plan: plans[i % 3],
      status: statuses[i % 3],
      renewsAt: `2024-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
      amount: plans[i % 3] === "Free" ? 0 : plans[i % 3] === "Basic" ? 5 : 15,
    })
  }
  return subs
}

const ALL_SUBS = generateSubscriptions()
const PAGE_SIZE = 10

const AdminSubscriptions = () => {
  const [loading, setLoading] = useState(true)
  const [planFilter, setPlanFilter] = useState<"all" | "Free" | "Basic" | "Pro">("all")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "canceled" | "past_due">("all")
  const [page, setPage] = useState(1)

  React.useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    return ALL_SUBS.filter((s) => {
      const matchesPlan = planFilter === "all" || s.plan === planFilter
      const matchesStatus = statusFilter === "all" || s.status === statusFilter
      return matchesPlan && matchesStatus
    })
  }, [planFilter, statusFilter])

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
        <h1 className="text-h3 font-semibold text-on-surface">Subscriptions</h1>
        <p className="text-sm text-secondary">Manage user subscriptions and billing</p>
      </div>

      <div className="flex gap-4">
        <Select
          value={planFilter}
          onValueChange={setPlanFilter}
          options={[
            { value: "all", label: "All plans" },
            { value: "Free", label: "Free" },
            { value: "Basic", label: "Basic" },
            { value: "Pro", label: "Pro" },
          ]}
        />
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
          options={[
            { value: "all", label: "All statuses" },
            { value: "active", label: "Active" },
            { value: "canceled", label: "Canceled" },
            { value: "past_due", label: "Past due" },
          ]}
        />
      </div>

      {!filtered.length ? (
        <EmptyState
          icon={<CreditCard className="h-10 w-10" />}
          title="No subscriptions found"
          description="Adjust your filters to see matching subscriptions."
        />
      ) : (
        <>
          <div className="rounded-lg border border-outline-variant bg-surface-container-lowest overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Renews at</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.userEmail}</TableCell>
                    <TableCell>{s.plan}</TableCell>
                    <TableCell>
                      <Badge variant={s.status === "active" ? "active" : s.status === "canceled" ? "revoked" : "suspended"}>
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{s.renewsAt}</TableCell>
                    <TableCell>${s.amount}/mo</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Change plan</Button>
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

export { AdminSubscriptions }