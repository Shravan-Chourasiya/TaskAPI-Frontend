import * as React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="sticky top-0 z-30 border-b border-outline-variant bg-surface-container-lowest">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link to="/" className="text-h4 font-bold text-primary">
            Authrix
          </Link>
          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm text-on-surface hover:text-primary">
                  Dashboard
                </Link>
                <Link to="/keys" className="text-sm text-on-surface hover:text-primary">
                  Keys
                </Link>
                <span className="text-sm text-secondary">{user?.name}</span>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-on-surface hover:text-primary">
                  Sign in
                </Link>
                <Link to="/signup">
                  <Button size="sm">Create account</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-outline-variant bg-surface-container-lowest">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-secondary">
          <p>Authrix — the API layer for modern authentication.</p>
        </div>
      </footer>
    </div>
  )
}
