import * as React from "react"
import { useState, useMemo, useCallback } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import { Input } from "@/components/ui/Input"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { Pagination } from "@/components/ui/Pagination"
import { SearchInput } from "@/components/ui/SearchInput"
import { UserPlus, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import type { AdminUserRow } from "@/types"

const generateMockUsers = (): AdminUserRow[] => {
  const roles: ("user" | "admin" | "moderator")[] = ["user", "admin", "moderator"]
  const statuses: ("active" | "suspended" | "deleted")[] = ["active", "suspended", "deleted"]
  const plans: ("Free" | "Basic" | "Pro")[] = ["Free", "Basic", "Pro"]
  const users: AdminUserRow[] = []
  for (let i = 1; i <= 60; i++) {
    users.push({
      id: `user-${i}`,
      email: `user${i}@example.com`,
      role: roles[i % 3],
      status: statuses[i % 3],
      createdAt: `2024-0${(i % 8) + 1}-${String((i % 28) + 1).padStart(2, "0")}`,
      plan: plans[i % 3],
    })
  }
  return users
}

const ALL_USERS = generateMockUsers()
const PAGE_SIZE = 10

function AdminUsers() {
  const [users, setUsers] = useState<AdminUserRow[]>(ALL_USERS)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<"user" | "admin" | "moderator" | "all">("all")
  const [statusFilter, setStatusFilter] = useState<"active" | "suspended" | "deleted" | "all">("all")
  const [page, setPage] = useState(1)
  const [detailOpen, setDetailOpen] = useState<AdminUserRow | null>(null)

  React.useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    return ALL_USERS.filter((u) => {
      const matchesSearch = u.email.toLowerCase().includes(search.toLowerCase())
      const matchesRole = roleFilter === "all" || u.role === roleFilter
      const matchesStatus = statusFilter === "all" || u.status === statusFilter
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [search, roleFilter, statusFilter])

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h3 font-semibold text-on-surface">Users</h1>
          <p className="text-sm text-secondary">Manage user accounts and permissions</p>
        </div>
        <Button variant="outline"><UserPlus className="h-4 w-4" /> Add user</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput
          placeholder="Search by email..."
          value={search}
          onChange={setSearch}
        />
        <Select
          value={roleFilter}
          onValueChange={setRoleFilter}
          options={[
            { value: "all", label: "All roles" },
            { value: "user", label: "User" },
            { value: "admin", label: "Admin" },
            { value: "moderator", label: "Moderator" },
          ]}
        />
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
          options={[
            { value: "all", label: "All statuses" },
            { value: "active", label: "Active" },
            { value: "suspended", label: "Suspended" },
            { value: "deleted", label: "Deleted" },
          ]}
        />
      </div>

      {!filtered.length ? (
        <EmptyState
          icon={<UserPlus className="h-10 w-10" />}
          title="No users found"
          description="Adjust your filters or search terms to find matching users."
        />
      ) : (
        <>
          <div className="rounded-lg border border-outline-variant bg-surface-container-lowest overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.email}</TableCell>
                    <TableCell><Badge variant="neutral">{u.role}</Badge></TableCell>
                    <TableCell>
                      <Badge variant={u.status === "active" ? "active" : u.status === "suspended" ? "suspended" : "revoked"}>
                        {u.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{u.plan}</TableCell>
                    <TableCell>{u.createdAt}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => setDetailOpen(u)}>View</Button>
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

      <Modal
        isOpen={!!detailOpen}
        onClose={() => setDetailOpen(null)}
        title={detailOpen?.email || "User details"}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><p className="text-sm text-secondary">Email</p><p className="font-medium">{detailOpen?.email}</p></div>
            <div><p className="text-sm text-secondary">Role</p><p className="font-medium"><Badge variant="neutral">{detailOpen?.role}</Badge></p></div>
            <div><p className="text-sm text-secondary">Status</p><p className="font-medium"><Badge variant={detailOpen?.status === "active" ? "active" : "suspended"}>{detailOpen?.status}</Badge></p></div>
            <div><p className="text-sm text-secondary">Plan</p><p className="font-medium">{detailOpen?.plan}</p></div>
            <div><p className="text-sm text-secondary">Created</p><p className="font-medium">{detailOpen?.createdAt}</p></div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDetailOpen(null)}>Close</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export { AdminUsers }