import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [requires2FA, setRequires2FA] = useState(false)
  const { isLoading, login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      toast.success("Signed in")
      if (requires2FA) {
        navigate("/2fa")
      } else {
        navigate("/dashboard")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-h2 font-semibold text-primary">Welcome back</h1>
          <p className="mt-2 text-secondary">Sign in to access your dashboard</p>
        </div>

        <div className="rounded-3xl bg-surface-container-low p-8 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />

            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={requires2FA}
                  onChange={(e) => setRequires2FA(e.target.checked)}
                  className="rounded border-outline"
                />
                <span className="text-sm text-on-surface">Require 2FA (mock)</span>
              </label>
              <a href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            {error && (
              <div className="p-2 bg-destructive-container text-sm text-destructive rounded">
                {error}
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-secondary">
            Don't have an account?{" "}
            <a href="/signup" className="font-medium text-primary hover:underline">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login