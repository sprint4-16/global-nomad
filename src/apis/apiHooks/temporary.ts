import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';
import { END_POINT } from '@/constants';
import { ActivityType, AvailableScheduleType } from '@/types/activities.types';

// 체험 상세 조회
export function useGetActivity({ activityId }: { activityId: string }) {
  return useQuery<ActivityType>({
    queryKey: ['activity-detail', activityId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`${END_POINT.ACTIVITIES}/${activityId}`);
      return data;
    },
  });
}

export function useGetAvailableSchedule({
  activityId,
  year,
  month,
}: {
  activityId: string;
  year: string;
  month: string;
}) {
  return useQuery<AvailableScheduleType>({
    queryKey: ['available-schedule', year, month],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `${END_POINT.ACTIVITIES}/${activityId}/available-schedule?year=${year}&month=${month}`,
      );
      return data;
    },
  });
}

export function useBookReservations({ activityId }: { activityId: string }) {
  return useMutation({
    mutationFn: async (bodyData: { scheduleId: number; headCount: number }) => {
      return axiosInstance.post(`${END_POINT.ACTIVITIES}/${activityId}/reservations`, bodyData);
    },
  });
}
