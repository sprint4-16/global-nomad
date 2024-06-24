import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance, axiosInstanceToken } from '../axiosInstance';
import { END_POINT } from '@/constants';
import { ActivityType, AvailableScheduleType } from '@/types/activities.types';
import useGetCookie from '@/hooks/useCookies';

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
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');
  if (!accessToken) throw new Error('Access token is not available');

  return useMutation({
    mutationFn: async (bodyData: { scheduleId: number; headCount: number }) => {
      const response = await axiosInstanceToken(accessToken).post(
        `${END_POINT.ACTIVITIES}/${activityId}/reservations`,
        bodyData,
      );
      return {
        success: response.status === 200,
        error: response.status === 401 || 409,
        reservationId: response.data?.id,
      };
    },
  });
}
