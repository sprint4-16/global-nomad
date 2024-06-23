import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';
import { END_POINT } from '@/constants/';

// 1. 체험 리스트 조회
interface getActivitiesProps {
  method: 'offset' | 'cursor';
  category?: string;
  keyword?: string;
  sort?: string;
  page?: number;
  size?: number;
}

export function UseGetActivities({ method, category, keyword, sort, page, size }: getActivitiesProps) {
  return useQuery({
    queryKey: ['Activities', { method, category, keyword, sort, page, size }],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`${END_POINT.ACTIVITIES}`, {
        params: { method, category, keyword, sort, page, size },
      });
      return data;
    },
  });
}

// 2. 체험 상세 조회
interface getActivityProps {
  activityId: number;
}

export function UseGetActivity({ activityId }: getActivityProps) {
  return useQuery({
    queryKey: ['Activity', activityId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`${END_POINT.ACTIVITIES}/${activityId}`);
      return data;
    },
  });
}
