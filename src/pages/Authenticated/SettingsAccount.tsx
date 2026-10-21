import * as React from "react"
import { useState, useMemo } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { Avatar } from "@/components/ui/Avatar"
import { AvatarUpload } from "@/components/ui/AvatarUpload"
import { useDebounce } from "@/hooks/useDebounce"
import { Check, X, Loader2 } from "lucide-react"

// Mock "taken" usernames list
const TAKEN_USERNAMES = new Set(["admin", "root", "authrix", "api", "devuser", "support", "billing"])

type UsernameStatus = "idle" | "checking" | "available" | "taken"

const SettingsAccount = () => {
  const [name, setName] = useState("Dev User")
  const [email, setEmail] = useState("dev@authrix.dev")
  const [username, setUsername] = useState("devuser")
  const [avatar, setAvatar] = useState<string | undefined>(undefined)

  const debouncedUsername = useDebounce(username, 300)
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>("idle")

  React.useEffect(() => {
    if (!debouncedUsername || debouncedUsername === "devuser") {
      setUsernameStatus("idle")
      return
    }
    setUsernameStatus("checking")
    const timer = setTimeout(() => {
      setUsernameStatus(TAKEN_USERNAMES.has(debouncedUsername) ? "taken" : "available")
    }, 500)
    return () => clearTimeout(timer)
  }, [debouncedUsername])

  const handleSave = () => {
    toast.success("Profile saved")
  }

  const statusIcon = useMemo(() => {
    switch (usernameStatus) {
      case "checking":
        return <Loader2 className="h-4 w-4 animate-spin text-secondary" />
      case "available":
        return <Check className="h-4 w-4 text-success" />
      case "taken":
        return <X className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }, [usernameStatus])

  const usernameError =
    usernameStatus === "taken" ? "That username is taken" : undefined

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-h3 font-semibold text-on-surface">Account</h1>
        <p className="text-sm text-secondary">Update your personal information</p>
      </div>

      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 space-y-4">
        <div className="flex items-center gap-4">
          <Avatar src={avatar} alt={name} size="lg" />
          <AvatarUpload value={avatar} onChange={(file) => {
            const reader = new FileReader()
            reader.onload = () => setAvatar(reader.result as string)
            reader.readAsDataURL(file)
          }} />
        </div>

        <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} />

        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <div>
          <div className="flex items-center gap-2">
            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError}
            />
            <div className="mt-7">{statusIcon}</div>
          </div>
          {usernameStatus === "available" && (
            <p className="mt-1 text-sm text-success">Username available</p>
          )}
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save changes</Button>
        </div>
      </div>
    </div>
  )
}

export { SettingsAccount }