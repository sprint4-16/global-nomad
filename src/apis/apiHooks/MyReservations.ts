import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { axiosInstance, axiosInstanceToken } from '../axiosInstance';
import { END_POINT } from '@/constants/';
import useGetCookie from '@/hooks/useCookies';

// 1. 내 예약 리스트 조회
export function useGetReservation(status?: string) {
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');

  return useInfiniteQuery({
    queryKey: ['reservation', accessToken, status],
    queryFn: async ({ pageParam }) => {
      if (!accessToken) throw new Error('Access token is not available');
      const { data } = await axiosInstanceToken(accessToken).get(`${END_POINT.MY_RESERVATIONS}`, {
        params: { status, cursorId: pageParam },
      });
      return data;
    },
    select: (data) => {
      return {
        pages: data.pages,
        pageParams: data.pageParams,
      };
    },
    getNextPageParam: (pages) => pages.cursorId,
    initialPageParam: undefined,
  });
}

// 2. 내 예약 수정 (취소)
export function usePatchReservationCancel(status?: string) {
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');
  const reservationId = getCookie('reservationId');
  const bodyData = {
    status: 'canceled',
  };
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!accessToken) throw new Error('Access token is not available');
      if (!reservationId) throw new Error('reservationId is not available');
      const { data } = await axiosInstanceToken(accessToken).patch(
        `${END_POINT.MY_RESERVATIONS}/${reservationId}`,
        bodyData,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reservation', status],
      });
    },
  });
}

// 3. 내 예약 리뷰 작성
export interface usePostReservationReviewParams {
  rating: number;
  content: string;
}
export function usePostReservationReview() {
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');
  const reservationId = getCookie('reservationId');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bodyData: usePostReservationReviewParams) => {
      if (!accessToken) throw new Error('Access token is not available');
      if (!reservationId) throw new Error('reservationId is not available');
      const { data } = await axiosInstanceToken(accessToken).post(
        `${END_POINT.MY_RESERVATIONS}/${reservationId}/reviews`,
        bodyData,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reservation'],
      });
    },
  });
}

// 4. 내 체험 불러오기
export function useGetMyActivities() {
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');

  return useQuery({
    queryKey: ['myActivities', accessToken],
    queryFn: async () => {
      if (!accessToken) throw new Error('Access token is not available');
      const { data } = await axiosInstanceToken(accessToken).get(`my-activities?size=20`);
      return data;
    },
  });
}

// 5. 체험 인기순 불러오기
export function useGetPopularActivities() {
  return useQuery({
    queryKey: ['popularActivities'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('activities?method=offset&sort=most_reviewed&page=1&size=20');
      return data;
    },
  });
}
