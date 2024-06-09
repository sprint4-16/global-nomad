import { useQuery, useMutation } from '@tanstack/react-query';
import { axiosInstanceToken } from '../axiosInstance';
import { END_POINT } from '@/constants/';
import useGetCookie from '@/hooks/useCookies';

// 1. 내 체험 리스트 조회
interface UseGetMyReservationListParams {
  offset: number;
  limit: number;
}

export function UseGetMyReservationList(params?: UseGetMyReservationListParams) {
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');
  const { offset, limit } = params || {};

  return useQuery({
    queryKey: ['reservation', { offset, limit }],
    queryFn: async () => {
      if (!accessToken) throw new Error('Access token is not available');
      const { data } = await axiosInstanceToken(accessToken).get(`${END_POINT.MY_ACTIVITIES}`, {
        params: { offset, limit },
      });
      return data;
    },
  });
}

// 2. 내 체험 월별 예약 현황 조회
interface UseGetDashboardParams {
  activityId: number;
  year: string;
  month: string;
}

export function UseGetDashboard({ activityId, year, month }: UseGetDashboardParams) {
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');

  return useQuery({
    queryKey: ['reservation', { activityId, year, month }],
    queryFn: async () => {
      if (!accessToken) throw new Error('Access token is not available');
      const { data } = await axiosInstanceToken(accessToken).get(
        `${END_POINT.MY_ACTIVITIES}/${activityId}/reservation-dashboard`,
        {
          params: { year, month },
        },
      );
      return data;
    },
  });
}

// 3. 내 체험 날짜별 예약 정보(신청, 승인, 거절)이 있는 스케줄 조회
interface UseGetScheduleParams {
  activityId: number;
  date: string;
}

export function UseGetSchedule({ activityId, date }: UseGetScheduleParams) {
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');

  return useQuery({
    queryKey: ['reservation', { activityId, date }],
    queryFn: async () => {
      if (!accessToken) throw new Error('Access token is not available');
      const { data } = await axiosInstanceToken(accessToken).get(
        `${END_POINT.MY_ACTIVITIES}/${activityId}/reserved-schedule`,
        {
          params: { date },
        },
      );
      return data;
    },
  });
}

// 4. 내 체험 예약 시간대별 예약 내역 조회
interface UseGetScheduleHistoryParams {
  activityId: number;
  status: 'pending' | 'confirmed' | 'completed';
  scheduleId: number;
}

export function UseGetScheduleHistory({ activityId, status, scheduleId }: UseGetScheduleHistoryParams) {
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');

  return useQuery({
    queryKey: ['reservation', { activityId, status, scheduleId }],
    queryFn: async () => {
      if (!accessToken) throw new Error('Access token is not available');
      const { data } = await axiosInstanceToken(accessToken).get(
        `${END_POINT.MY_ACTIVITIES}/${activityId}/reservations`,
        {
          params: { status, scheduleId },
        },
      );
      return data;
    },
  });
}

// 5. 내 체험 예약 상태(승인, 거절) 업데이트
interface UsePatchScheduleStatusParams {
  activityId: number;
  reservationId: number;
}

export function UsePatchScheduleStatus({ activityId, reservationId }: UsePatchScheduleStatusParams) {
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');

  return useMutation({
    mutationFn: async () => {
      if (!accessToken) throw new Error('Access token is not available');
      const { data } = await axiosInstanceToken(accessToken).get(
        `${END_POINT.MY_ACTIVITIES}/${activityId}/reservations/${reservationId}`,
        {
          params: { reservationId },
        },
      );
      return data;
    },
  });
}

// 6. 내 체험 삭제
interface UseDeleteScheduleParams {
  activityId: number;
}

export function UseDeleteSchedule({ activityId }: UseDeleteScheduleParams) {
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');

  return useMutation({
    mutationFn: async () => {
      if (!accessToken) throw new Error('Access token is not available');
      const { data } = await axiosInstanceToken(accessToken).get(`${END_POINT.MY_ACTIVITIES}/${activityId}`);
      return data;
    },
  });
}

// 7. 내 체험 수정
interface UseUpdateScheduleParams {
  activityId: number;
}

export function UseUpdateSchedule({ activityId }: UseUpdateScheduleParams) {
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');

  return useMutation({
    mutationFn: async () => {
      if (!accessToken) throw new Error('Access token is not available');
      const { data } = await axiosInstanceToken(accessToken).get(`${END_POINT.MY_ACTIVITIES}/${activityId}`);
      return data;
    },
  });
}
