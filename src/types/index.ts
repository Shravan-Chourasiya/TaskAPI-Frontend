export type Role = "user" | "admin" | "moderator"
export type Plan = "Free" | "Basic" | "Pro"
export type AccountStatus = "active" | "suspended" | "scheduled_for_deletion"

export interface AuthUser {
  name: string
  email: string
  username: string
  role: Role
  plan: Plan
  status: AccountStatus
}

export interface ApiKey {
  id: string
  name: string
  maskedKey: string
  createdAt: string
  lastUsedAt: string | null
  scopes: string[]
  status: "active" | "revoked" | "suspended"
  environment: "live" | "test"
}

export interface UsagePoint {
  date: string
  requestCount: number
}

export interface AdminUserRow {
  id: string
  email: string
  role: Role
  status: "active" | "suspended" | "deleted"
  createdAt: string
  plan: Plan
}

export interface AdminKeyRow {
  id: string
  name: string
  maskedKey: string
  ownerEmail: string
  status: "active" | "revoked" | "suspended"
  createdAt: string
  lastUsedAt: string | null
}

export interface SubscriptionRow {
  id: string
  userEmail: string
  plan: Plan
  status: "active" | "canceled" | "past_due"
  renewsAt: string
  amount: number
}

export interface AdminMetric {
  label: string
  points: { date: string; value: number }[]
}

export interface AuditLogRow {
  id: string
  timestamp: string
  adminEmail: string
  action: string
  targetId: string
  result: "success" | "failure"
}

export interface SecurityEventRow {
  id: string
  timestamp: string
  type: "login_failure" | "token_leak" | "permission_escalation" | "suspicious_ip" | "brute_force"
  severity: "low" | "medium" | "high" | "critical"
  targetEmail: string
  detail: string
}
