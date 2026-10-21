import * as React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/Badge"
import { StatCard } from "@/components/ui/StatCard"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { Eye, ArrowLeft, Users, CreditCard, Ban, AlertTriangle } from "lucide-react"
import type { AdminUserRow, ApiKey, SubscriptionRow } from "@/types"

// Mock data for this user
const mockUser: AdminUserRow = {
  id: "user-1",
  email: "dev@example.com",
  role: "admin",
  status: "active",
  createdAt: "2024-01-15",
  plan: "Pro",
}

const mockKeys: ApiKey[] = [
  { id: "key-1", name: "Production", maskedKey: "tk_live_492x82...a1b2c3", createdAt: "2024-02-01", lastUsedAt: "2024-08-16", scopes: ["keys.read", "keys.write"], status: "active", environment: "live" },
  { id: "key-2", name: "Staging", maskedKey: "tk_test_9f2k11...d4e5f6", createdAt: "2024-03-10", lastUsedAt: "2024-08-14", scopes: ["keys.read"], status: "active", environment: "test" },
]

const mockSubscriptions: SubscriptionRow[] = [
  { id: "sub-1", userEmail: "dev@example.com", plan: "Pro", status: "active", renewsAt: "2024-09-15", amount: 15 },
]

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()

  const toggleKeyStatus = (id: string) => {
    toast.success(`Key ${id} status updated`)
  }

  const handleSuspend = () => {
    toast.success("User suspended")
  }

  const handleRestore = () => {
    toast.success("User restored")
  }

  const handleDelete = () => {
    toast.success("User deleted")
    navigate("/admin/users")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate("/admin/users")}>
          <ArrowLeft className="h-4 w-4" /> Back to users
        </Button>
        <h1 className="text-h3 font-semibold text-on-surface">User details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <StatCard icon={<Users className="h-5 w-5" />} value={mockUser.email} label="Email" />
        <StatCard icon={<AlertTriangle className="h-5 w-5" />} value={mockUser.status} label="Status" />
        <StatCard icon={<CreditCard className="h-5 w-5" />} value={mockUser.plan} label="Plan" />
        <StatCard icon={<Eye className="h-5 w-5" />} value={mockUser.createdAt} label="Created" />
      </div>

      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
        <h2 className="text-h4 font-semibold text-on-surface">API Keys</h2>
        {mockKeys.length === 0 ? (
          <p className="text-sm text-secondary">No API keys</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockKeys.map((k) => (
                <TableRow key={k.id}>
                  <TableCell>{k.name}</TableCell>
                  <TableCell><code className="key-display text-code">{k.maskedKey}</code></TableCell>
                  <TableCell>{k.environment}</TableCell>
                  <TableCell><Badge variant={k.status === "active" ? "active" : k.status === "revoked" ? "revoked" : "suspended"}>{k.status}</Badge></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => toggleKeyStatus(k.id)}>
                      {k.status === "active" ? "Suspend" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
        <h2 className="text-h4 font-semibold text-on-surface">Subscription</h2>
        {mockSubscriptions.length === 0 ? (
          <p className="text-sm text-secondary">No active subscription</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Renews at</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSubscriptions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.plan}</TableCell>
                  <TableCell><Badge variant={s.status === "active" ? "active" : "suspended"}>{s.status}</Badge></TableCell>
                  <TableCell>{s.renewsAt}</TableCell>
                  <TableCell>${s.amount}/mo</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="flex justify-end gap-2">
        {mockUser.status === "suspended" && (
          <Button variant="outline" onClick={handleRestore}>Restore</Button>
        )}
        {!mockUser.status === "suspended" && (
          <Button variant="outline" onClick={handleSuspend}>Suspend</Button>
        )}
        <Button variant="destructive" onClick={handleDelete}>Delete user</Button>
      </div>
    </div>
  )
}

export { UserDetail }