import { useQuery, useMutation } from '@tanstack/react-query';
import { axiosInstanceToken } from '../axiosInstance';
import { END_POINT } from '@/constants/';
import useGetCookie from '@/hooks/useCookies';

// 1. 내 예약 리스트 조회
export function useGetReservation(status?: string) {
  const { getCookie } = useGetCookie();
  const accessToken = getCookie('accessToken');

  return useQuery({
    queryKey: ['reservation', status],
    queryFn: async () => {
      if (!accessToken) throw new Error('Access token is not available');
      const { data } = await axiosInstanceToken(accessToken).get(`${END_POINT.MY_RESERVATIONS}`, {
        params: { status },
      });
      return data;
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
  });
}
