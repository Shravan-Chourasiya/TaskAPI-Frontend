import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    setLoading(true)
    // Mock signup
    await new Promise((r) => setTimeout(r, 1000))
    toast.success("Account created. Check your email for verification.")
    navigate("/verify-email")
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <span className="inline-block px-3 py-1 bg-primary-container text-on-primary text-xs font-medium rounded-full">
            Authrix
          </span>
          <h1 className="mt-5 text-h3 font-semibold text-on-surface text-center">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-secondary">Start authenticating your APIs</p>
        </div>

        <div className="rounded-3xl bg-surface-container-low p-8 shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-destructive-container text-sm text-destructive rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              type="text"
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              required
            />

            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
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

            <Input
              type="password"
              label="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-secondary">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup