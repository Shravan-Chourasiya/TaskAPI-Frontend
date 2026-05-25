import { create } from 'zustand';

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

export const usePlanStore = create<PlanStore>((set) => ({
  selectedPlan: null,
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  clearSelectedPlan: () => set({ selectedPlan: null }),
}));
