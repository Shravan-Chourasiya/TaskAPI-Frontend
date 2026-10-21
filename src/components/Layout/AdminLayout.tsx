import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { Shield, Users, Key, CreditCard, Activity, FileText, AlertTriangle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/Toggle"

const NAV_ITEMS = [
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Keys", href: "/admin/keys", icon: Key },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { label: "Metrics", href: "/admin/metrics", icon: Activity },
  { label: "Audit logs", href: "/admin/audit-logs", icon: FileText },
  { label: "Security events", href: "/admin/security-events", icon: AlertTriangle },
]

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const { user, switchRole } = useAuth()

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="w-64 border-r border-outline-variant bg-surface-container-lowest">
        <div className="p-4">
          <Link to="/admin" className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-h5 font-semibold text-on-surface">Admin</span>
          </Link>
        </div>

        <nav className="space-y-1 px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "text-secondary hover:bg-surface-container hover:text-on-surface"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
                <ChevronRight className="h-4 w-4 ml-auto opacity-50" />
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto border-t border-outline-variant p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary">Role switcher</span>
          </div>
          <div className="mt-2 flex gap-2">
            {(["user", "admin"] as const).map((r) => (
              <Button
                key={r}
                size="sm"
                variant={user?.role === r ? "default" : "outline"}
                onClick={() => switchRole(r)}
              >
                {r}
              </Button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}

export { AdminLayout }