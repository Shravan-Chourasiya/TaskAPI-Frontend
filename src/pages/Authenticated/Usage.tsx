import * as React from "react"
import { useMemo, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Select } from "@/components/ui/Select"
import { StatCard } from "@/components/ui/StatCard"
import { Skeleton } from "@/components/ui/Skeleton"
import { Activity } from "lucide-react"
import type { UsagePoint } from "@/types"

// Static mock dataset spanning 90 days
const generateMockData = (): UsagePoint[] => {
  const data: UsagePoint[] = []
  const start = new Date("2024-06-01")
  for (let i = 0; i < 90; i++) {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    const base = 100 + Math.sin(i / 7) * 50 + i * 2
    data.push({
      date: date.toISOString().slice(0, 10),
      requestCount: Math.max(0, Math.round(base + Math.random() * 40)),
    })
  }
  return data
}

const ALL_DATA = generateMockData()

const RANGE_OPTIONS = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
]

const Usage = () => {
  const [range, setRange] = useState("30")
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [range])

  const filtered = useMemo(() => {
    const days = Number(range)
    return ALL_DATA.slice(-days)
  }, [range])

  const totalRequests = useMemo(
    () => filtered.reduce((sum, p) => sum + p.requestCount, 0),
    [filtered]
  )

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-72 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h3 font-semibold text-on-surface">Usage</h1>
          <p className="text-sm text-secondary">Aggregate request volume across all your keys</p>
        </div>
        <Select
          value={range}
          onValueChange={setRange}
          options={RANGE_OPTIONS}
          aria-label="Date range"
        />
      </div>

      <StatCard
        icon={<Activity className="h-5 w-5" />}
        value={totalRequests.toLocaleString()}
        label={`Requests (last ${range} days)`}
      />

      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
        <h2 className="text-h4 font-semibold text-on-surface">Requests over time</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filtered}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="requestCount" stroke="var(--color-primary)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6">
        <h2 className="text-h4 font-semibold text-on-surface">Daily breakdown</h2>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filtered}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="requestCount" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export { Usage }