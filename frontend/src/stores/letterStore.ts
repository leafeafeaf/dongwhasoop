import { create } from 'zustand';
import { Book } from '../types/letter';

interface LetterState {
  selectedBookId: number | null;
  setSelectedBook: (bookId: number | null) => void;
}

export const useLetterStore = create<LetterState>((set) => ({
  selectedBookId: null,
  setSelectedBook: (bookId) => set({ selectedBookId: bookId }),
}));

