import * as React from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    toast.success("Password reset successfully")
    navigate("/login")
  }

  if (!token) {
    return <div className="p-8 text-center text-destructive">Invalid reset token</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-h2 font-semibold text-primary">New password</h1>
          <p className="mt-2 text-secondary">Set a new password for your account</p>
        </div>

        <div className="rounded-3xl bg-surface-container-low p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="password"
              id="password"
              label="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <Input
              type="password"
              id="confirmPassword"
              label="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <Button type="submit" className="w-full">Reset password</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export { ResetPassword }