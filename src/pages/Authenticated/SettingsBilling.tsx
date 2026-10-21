import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/ui/StatCard"
import { Modal } from "@/components/ui/Modal"
import { CreditCard, Check } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { PRICING_PLANS, SUBSCRIPTION_PLANS, type PlanName } from "@/constants"
import { usePlanStore } from "@/lib/zustandStore"

const SettingsBilling = () => {
  const [isCompareOpen, setIsCompareOpen] = React.useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()
  const setSelectedPlan = usePlanStore((state) => state.setSelectedPlan)

  const currentPlan = (user?.subscriptionType ?? "Free") as PlanName
  const planConfig = SUBSCRIPTION_PLANS[currentPlan]
  const expiryDate = user?.subscriptionExpiryDate
    ? new Date(user.subscriptionExpiryDate).toLocaleDateString()
    : "—"

  const handleUpgrade = (planName: PlanName) => {
    const plan = PRICING_PLANS.find((p) => p.title === planName)
    if (!plan) return
    setSelectedPlan({ name: plan.title, price: plan.price, features: plan.features })
    navigate("/checkout")
  }

  const canUpgrade = currentPlan !== "Pro"

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-h3 font-semibold text-on-surface">Billing</h1>
        <p className="text-sm text-secondary">Manage your subscription plan</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 space-y-4">
          <h3 className="font-semibold text-on-surface">Current plan</h3>
          <StatCard
            icon={<CreditCard className="h-5 w-5" />}
            value={planConfig.price === 0 ? "Free" : `₹${planConfig.price}/yr`}
            label={`${currentPlan} Plan`}
          />
          <p className="text-xs text-secondary">Expires: {expiryDate}</p>
          <Button variant="outline" onClick={() => setIsCompareOpen(true)}>
            Compare plans
          </Button>
        </div>

        {canUpgrade && (
          <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6 space-y-4">
            <h3 className="font-semibold text-on-surface">Upgrade</h3>
            <p className="text-sm text-secondary">
              {currentPlan === "Free"
                ? "Switch to Basic or Pro for higher limits and priority support."
                : "Switch to Pro for advanced analytics and higher limits."}
            </p>
            <div className="flex gap-2 flex-wrap">
              {currentPlan === "Free" && (
                <Button onClick={() => handleUpgrade("Basic")}>Buy Basic</Button>
              )}
              <Button onClick={() => handleUpgrade("Pro")}>Buy Pro</Button>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        title="Compare plans"
        size="lg"
      >
        <div className="grid grid-cols-3 gap-4">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.title}
              className={`border rounded-md p-4 space-y-3 ${
                plan.title === currentPlan
                  ? "border-primary bg-primary/5"
                  : "border-outline-variant"
              }`}
            >
              <div className="text-center">
                <h4 className="font-semibold">{plan.title}</h4>
                <p className="text-xl font-bold">
                  {plan.price === 0 ? "Free" : `₹${plan.price}/yr`}
                </p>
                {plan.title === currentPlan && (
                  <span className="text-xs text-primary font-medium">Current</span>
                )}
              </div>
              <ul className="space-y-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-secondary">
                    <Check className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              {plan.title !== currentPlan && plan.title !== "Free" && (
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setIsCompareOpen(false)
                    handleUpgrade(plan.title)
                  }}
                >
                  Upgrade
                </Button>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}

export { SettingsBilling }
