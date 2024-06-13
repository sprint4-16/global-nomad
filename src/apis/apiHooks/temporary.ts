import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';
import { END_POINT } from '@/constants';
import { ActivityType } from '@/types/activities.types';

// 체험 상세 조회
export function useGetActivity({ activityId }: { activityId: string }) {
  return useQuery<ActivityType>({
    queryKey: ['activity-detail'],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`${END_POINT.ACTIVITIES}/${activityId}`);
      return data;
    },
  });
}
