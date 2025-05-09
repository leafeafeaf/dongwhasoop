import { useQuery } from '@tanstack/react-query';
import { getLetterList } from '../api/letter';
import { GetLetterListResponse } from '../types/letter';
import { useSelectedChild } from '../stores/useSelectedChild';

export const useGetLetterList = (bookId: number) => {
    return useQuery<GetLetterListResponse['data']>({
      queryKey: ['LetterList', bookId],
      queryFn: () => getLetterList(bookId),
      enabled: !!useSelectedChild && !!bookId, // 자녀가 설정되고 bookId가 있을 때만 실행
    });
};