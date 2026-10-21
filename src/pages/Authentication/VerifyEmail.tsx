import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { OTPInput } from "@/components/ui/OTPInput"
import { Button } from "@/components/ui/button"

const VerifyEmail = () => {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true)
      return
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length !== 6) {
      toast.error("Enter the 6-digit code")
      return
    }
    setLoading(true)
    setTimeout(() => {
      toast.success("Email verified")
      navigate("/dashboard")
    }, 1000)
  }

  const handleResend = () => {
    setCountdown(30)
    setCanResend(false)
    toast.success("Verification code resent")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-h2 font-semibold text-primary">Verify your email</h1>
          <p className="mt-2 text-secondary">
            Enter the 6-digit code we sent to your email
          </p>
        </div>

        <div className="rounded-3xl bg-surface-container-low p-8 shadow-sm">
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center">
              <OTPInput value={code} onChange={setCode} length={6} />
            </div>

            <Button type="submit" disabled={loading || code.length !== 6} className="w-full">
              {loading ? "Verifying..." : "Verify email"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            {!canResend ? (
              <p className="text-sm text-secondary">
                Resend code in{" "}
                <span className="font-medium text-on-surface">{countdown}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-sm font-medium text-primary hover:underline"
              >
                Resend code
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail