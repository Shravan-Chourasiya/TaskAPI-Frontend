import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps {
  src?: string
  alt?: string
  size?: "sm" | "md" | "lg"
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
}

const Avatar = ({ src, alt = "", size = "md" }: AvatarProps) => {
  const fallback = alt.slice(0, 2).toUpperCase() || "?"

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-full bg-surface-container border border-outline-variant text-on-surface font-medium",
        sizeMap[size]
      )}
      aria-label={alt}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          width={40}
          height={40}
        />
      ) : (
        <span className="text-xs">{fallback}</span>
      )}
    </div>
  )
}

export { Avatar }
