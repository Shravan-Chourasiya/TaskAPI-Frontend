import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { OTPInput } from "@/components/ui/OTPInput"
import { Button } from "@/components/ui/button"

const TwoFA = () => {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length !== 6) {
      toast.error("Enter the 6-digit code")
      return
    }
    setLoading(true)
    setTimeout(() => {
      toast.success("Authenticated")
      navigate("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-h2 font-semibold text-primary">Two-factor authentication</h1>
          <p className="mt-2 text-secondary">
            Enter the 6-digit code from your authenticator app
         </p>
       </div>

        <div className="rounded-3xl bg-surface-container-low p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <OTPInput value={code} onChange={setCode} length={6} />
           </div>

            <Button type="submit" disabled={loading || code.length !== 6} className="w-full">
              {loading ? "Verifying..." : "Verify"}
           </Button>

            <p className="text-center text-sm text-secondary">
              Lost access? <a href="#" className="text-primary hover:underline">Use a backup code</a>
           </p>
         </form>
       </div>
     </div>
   </div>
  )
}

export default TwoFA