import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';
import { END_POINT } from '@/constants';
import { Reviews } from '@/types/review.types';

interface useGetReviewsProps {
  activityId: string | undefined;
  page: number;
  size: number;
}

export function useGetReviews({ activityId, page, size }: useGetReviewsProps) {
  return useQuery<Reviews>({
    queryKey: ['review', activityId, page, size],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `${END_POINT.ACTIVITIES}/${activityId}/reviews?page=${page}&size=${size}`,
      );
      return data;
    },
    enabled: !!activityId,
  });
}
