import * as React from "react"
import { m } from "motion/react"
import { CARD_HOVER } from "@/lib/motion"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/button"
import { TableRow, TableCell } from "@/components/ui/Table"
import { Eye, Ban } from "lucide-react"
import type { ApiKey } from "@/types"

interface KeyTableRowProps {
  apiKey: ApiKey
  onView: (id: string) => void
  onRevoke: (id: string) => void
}

const KeyTableRow = React.memo(function KeyTableRow({ apiKey, onView, onRevoke }: KeyTableRowProps) {
  return (
    <m.tr layout {...CARD_HOVER}>
      <TableCell className="font-medium">{apiKey.name}</TableCell>
      <TableCell>
        <code className="key-display text-code">{apiKey.maskedKey}</code>
      </TableCell>
      <TableCell>
        <Badge variant={apiKey.status === "active" ? "active" : apiKey.status === "revoked" ? "revoked" : "suspended"}>
          {apiKey.status}
        </Badge>
      </TableCell>
      <TableCell>{apiKey.createdAt}</TableCell>
      <TableCell>{apiKey.lastUsedAt ?? "Never"}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onView(apiKey.id)}>
            <Eye className="h-4 w-4" /> View
          </Button>
          {apiKey.status === "active" && (
            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => onRevoke(apiKey.id)}>
              <Ban className="h-4 w-4" /> Revoke
            </Button>
          )}
        </div>
      </TableCell>
    </m.tr>
  )
})

export { KeyTableRow }