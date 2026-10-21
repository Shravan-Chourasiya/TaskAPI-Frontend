import * as React from "react"
import { useState, useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Select } from "@/components/ui/Select"
import { Skeleton } from "@/components/ui/Skeleton"
import { Users, Activity, Key, CreditCard } from "lucide-react"
import type { AdminMetric } from "@/types"

const generateMetrics = (): AdminMetric[] => {
  const metrics: AdminMetric[] = []
  const start = new Date("2024-01-01")
  const end = new Date("2024-08-16")
  const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

  // User growth
  const userGrowth: { date: string; value: number }[] = []
  for (let i = 0; i < days; i++) {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    userGrowth.push({
      date: date.toISOString().slice(0, 10),
      value: Math.round(100 + i * 2 + Math.sin(i / 7) * 20),
    })
  }
  metrics.push({ label: "User growth", points: userGrowth })

  // Engagement
  const engagement: { date: string; value: number }[] = []
  for (let i = 0; i < days; i++) {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    engagement.push({
      date: date.toISOString().slice(0, 10),
      value: Math.round(500 + i * 5 + Math.sin(i / 3) * 100),
    })
  }
  metrics.push({ label: "Engagement", points: engagement })

  // Feature usage
  const featureUsage: { date: string; value: number }[] = []
  for (let i = 0; i < days; i++) {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    featureUsage.push({
      date: date.toISOString().slice(0, 10),
      value: Math.round(200 + i * 3 + Math.sin(i / 5) * 50),
    })
  }
  metrics.push({ label: "Feature usage", points: featureUsage })

  return metrics
}

const ALL_METRICS = generateMetrics()

const AdminMetrics = () => {
  const [loading, setLoading] = useState(true)
  const [metric, setMetric] = useState<string>(ALL_METRICS[0].label)

  React.useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [metric])

  const selected = useMemo(() => ALL_METRICS.find((m) => m.label === metric) || ALL_METRICS[0], [metric])

  const Icon = useMemo(() => {
    switch (metric) {
      case "User growth": return Users
      case "Engagement": return Activity
      case "Feature usage": return Key
      default: return CreditCard
    }
  }, [metric])

  if (loading) {
    return <Skeleton className="h-72 w-full" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h3 font-semibold text-on-surface">Metrics</h1>
        <p className="text-sm text-secondary">Platform-wide performance and usage</p>
      </div>

      <div className="flex gap-4">
        <Select
          value={metric}
          onValueChange={setMetric}
          options={ALL_METRICS.map((m) => ({ value: m.label, label: m.label }))}
        />
      </div>

      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          <h2 className="text-h4 font-semibold text-on-surface">{metric}</h2>
        </div>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={selected.points}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export { AdminMetrics }