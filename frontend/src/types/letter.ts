export interface Book {
    book_id: number;
    title: string;
  }

export interface GetBookListResponse {
    status: number;
    success: boolean;
    message: string;
    data: {
      book: Book[];
    };
    timeStamp: string;
  }