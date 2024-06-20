import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';
import { END_POINT } from '@/constants';
import { Reviews } from '@/types/review.types';

export function useGetReviews({ activityId, page, size }: { activityId: string; page: number; size: number }) {
  return useQuery<Reviews>({
    queryKey: ['review'],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `${END_POINT.ACTIVITIES}/${activityId}/reviews?page=${page}&size=${size}`,
      );
      return data;
    },
  });
}
