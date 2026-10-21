import * as React from "react"
import { Avatar } from "./Avatar"

interface AvatarUploadProps {
  value?: string
  onChange: (file: File) => void
  maxSizeMb?: number
  acceptedFormats?: string[]
}

const AvatarUpload = ({
  value,
  onChange,
  maxSizeMb = 5,
  acceptedFormats = ['image/png', 'image/jpeg', 'image/gif'],
}: AvatarUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!acceptedFormats.includes(file.type)) {
        window.alert("Invalid file type. Only PNG, JPEG, and GIF are allowed.")
        return
      }
      if (file.size > maxSizeMb * 1024 * 1024) {
        window.alert(`File size exceeds ${maxSizeMb}MB limit`)
        return
      }
      onChange(file)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Avatar src={value} alt="Avatar" size="md" />
      <input
        type="file"
        id="avatar-upload"
        accept={acceptedFormats.join(",")}
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        htmlFor="avatar-upload"
        className="cursor-pointer text-sm font-medium text-primary hover:underline"
      >
        {value ? "Change avatar" : "Upload avatar"}
      </label>
    </div>
  )
}

export { AvatarUpload }
