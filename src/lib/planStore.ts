import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PlanFeatures {
	name: string;
	price: number;
	features: string[];
}

interface PlanStore {
	selectedPlan: PlanFeatures | null;
	setSelectedPlan: (plan: PlanFeatures) => void;
	clearSelectedPlan: () => void;
}

export const usePlanStore = create<PlanStore>()(
	persist(
		(set) => ({
			selectedPlan: null,
			setSelectedPlan: (plan) => set({ selectedPlan: plan }),
			clearSelectedPlan: () => set({ selectedPlan: null }),
		}),
		{
			name: "plan-storage",
			version: 2, // bump to clear stale persisted plan data with old string prices
			migrate: () => ({ selectedPlan: null }),
		},
	),
);
