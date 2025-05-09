import { useQuery } from '@tanstack/react-query';
import { getLetterBookList } from '../api/letter';
import { Book, GetBookListResponse } from '../types/letter';

export const useGetLetterBookList = () => {
  return useQuery<GetBookListResponse>({
    queryKey: ['LetterbookList'],
    queryFn: () => getLetterBookList(),
  });
};
