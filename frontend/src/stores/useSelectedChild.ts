import { create } from "zustand";

interface Child {
  childId: number;
  childName: string;
  mascotId: number;
}

interface SelectedChildStore {
  selectedChild: Child | null;
  setSelectedChild: (child: Child) => void;
}

export const useSelectedChild = create<SelectedChildStore>((set) => ({
  selectedChild: null,
  setSelectedChild: (child) => set({ selectedChild: child }),
}));
