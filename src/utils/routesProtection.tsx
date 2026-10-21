import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Spinner } from "@/components/ui/Spinner"

interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><Spinner /></div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && !user?.role.includes("admin")) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><Spinner /></div>
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

export { ProtectedRoute, PublicRoute }