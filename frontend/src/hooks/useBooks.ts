import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Book {
  id: number;
  title: string;
  cover: string;
}

interface BookState {
  books: Book[];
  setBooks: (books: Book[]) => void;
}

const useBookStore = create<BookState>()(
  persist(
    (set) => ({
      books: [],
      setBooks: (books) => set({ books }),
    }),
    {
      name: "book-storage",
    }
  )
);

export default useBookStore;
