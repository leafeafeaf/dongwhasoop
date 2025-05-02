// stores/useAppStore.ts
import { create } from "zustand";

interface AppState {
  selectedChildId: number | null;
  setSelectedChildId: (id: number) => void;

  userProfile: any;
  setUserProfile: (profile: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedChildId: null,
  setSelectedChildId: (id) => set({ selectedChildId: id }),

  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
}));
