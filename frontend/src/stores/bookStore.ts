import { create } from "zustand";

interface BookStoreState {
  selectedBookId: number | null;
  setSelectedBookId: (id: number) => void;
}

const useBookStore = create<BookStoreState>((set) => ({
  selectedBookId: null,
  setSelectedBookId: (id: number) => set({ selectedBookId: id }),
}));

export default useBookStore;
