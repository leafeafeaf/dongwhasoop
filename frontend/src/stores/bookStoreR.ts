import { create } from 'zustand';
import { GetBookListApiResponse } from '../types/book';

interface BookStoreState {
  selectedBookId: number | null; // 사용자가 선택한 동화
  setSelectedBookId: (id: number | null) => void;

  currentPage: number; // 현재 페이지 (페이지네이션)
  setCurrentPage: (page: number) => void;

  // (선택) 동화 리스트를 store에 저장하고 싶을 때
  bookList: GetBookListApiResponse['data']['content'] | null;
  setBookList: (list: GetBookListApiResponse['data']['content']) => void;
}

export const useBookStore = create<BookStoreState>((set) => ({
  selectedBookId: null,
  setSelectedBookId: (id) => set({ selectedBookId: id }),

  currentPage: 0,
  setCurrentPage: (page) => set({ currentPage: page }),

  bookList: null,
  setBookList: (list) => set({ bookList: list }),
}));

//노래는 url 바로 보여주는 거라 필요할까?