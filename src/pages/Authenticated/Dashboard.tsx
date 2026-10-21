import * as React from "react"
import { useAuth } from "@/contexts/AuthContext"
import { StatCard } from "@/components/ui/StatCard"
import { Badge } from "@/components/ui/Badge"
import { Key, Users, Activity, CreditCard } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const mockUsageData = [
  { date: "2023-01-01", requests: 400 },
  { date: "2023-01-02", requests: 300 },
  { date: "2023-01-03", requests: 200 },
  { date: "2023-01-04", requests: 278 },
  { date: "2023-01-05", requests: 189 },
  { date: "2023-01-06", requests: 239 },
  { date: "2023-01-07", requests: 349 },
]

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Key className="h-5 w-5" />}
          value={12}
          label="Active API Keys"
          trend={{ value: "+2", direction: "up" }}
        />
        <StatCard
          icon={<CreditCard className="h-5 w-5" />}
          value={user?.plan || "Basic"}
          label="Current Plan"
        />
        <StatCard
          icon={<Activity className="h-5 w-5" />}
          value={1245}
          label="Last 30 Days Requests"
          trend={{ value: "+12%", direction: "up" }}
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          value={87}
          label="Team Members"
        />
      </div>

      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-h4 font-semibold text-on-surface">Usage Overview</h2>
          <Badge variant="neutral">Last 7 days</Badge>
        </div>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="requests" stroke="var(--color-primary)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export { Dashboard }