import { create } from 'zustand';
import { Book, GetBookListResponse } from '../types/letter';

interface LetterState {
  selectedBookId: number | null;
  setSelectedBook: (bookId: number | null) => void;

  totalLetterBooks: Book[] | null;
  setTotalLetterBooks: (books: Book[]) => void;
}

export const useLetterStore = create<LetterState>((set) => ({
  selectedBookId: null,
  setSelectedBook: (bookId) => set({ selectedBookId: bookId }),
  
  totalLetterBooks: null,
  setTotalLetterBooks: (books) => set({ totalLetterBooks: books }),
}));

