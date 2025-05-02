import { useQuery } from '@tanstack/react-query';
import { getBookList } from '../api/book';
import { GetBookListApiResponse } from '../types/book';

export const useGetBookList = () => {
  return useQuery<GetBookListApiResponse['data']>({
    queryKey: ['bookList'], //캐싱 및 refetch 기준이 되는 고유 키
    queryFn: getBookList, //실제 데이터를 가져오는 함수
  });
};
