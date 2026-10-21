import * as React from "react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("If that email exists, check your inbox for reset instructions.")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-h2 font-semibold text-primary">Reset password</h1>
          <p className="mt-2 text-secondary">Enter your email to receive reset instructions</p>
        </div>

        <div className="rounded-3xl bg-surface-container-low p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
            <Button type="submit" className="w-full">Send reset link</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export { ForgotPassword }