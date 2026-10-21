import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { LayoutDashboard, Key, Activity, Settings, LogOut, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Keys", href: "/keys", icon: Key },
  { label: "Usage", href: "/usage", icon: Activity },
  { label: "Settings", href: "/settings/account", icon: Settings },
]

const SETTINGS_NAV = [
  { label: "Account", href: "/settings/account" },
  { label: "Security", href: "/settings/security" },
  { label: "Billing", href: "/settings/billing" },
  { label: "Danger", href: "/settings/danger" },
]

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const { user, logout } = useAuth()
  const isSettingsRoute = location.pathname.startsWith("/settings/")

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="w-64 border-r border-outline-variant bg-surface-container-lowest flex flex-col">
        <div className="p-4">
          <Link to="/" className="text-h4 font-bold text-primary">Authrix</Link>
       </div>

        <nav className="space-y-1 px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = !isSettingsRoute && location.pathname.startsWith(item.href)
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

          {isSettingsRoute && (
            <div className="mt-4 space-y-1">
              <p className="px-3 text-xs font-medium uppercase tracking-wide text-secondary">Settings</p>
              {SETTINGS_NAV.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive ? "bg-primary/10 text-primary" : "text-secondary hover:bg-surface-container hover:text-on-surface"
                    )}
                  >
                    {item.label}
                 </Link>
                )
              })}
           </div>
          )}
       </nav>

        <div className="mt-auto border-t border-outline-variant p-4 space-y-2">
          <div className="text-sm">
            <p className="font-medium text-on-surface">{user?.name || "Guest"}</p>
            <p className="text-secondary truncate">{user?.email}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-secondary">Role: {user?.role}</p>
         </div>
          <Button variant="ghost" size="sm" onClick={logout} className="w-full justify-start">
            <LogOut className="h-4 w-4" /> Sign out
         </Button>
       </div>
     </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
     </main>
   </div>
  )
}

export { AuthenticatedLayout }